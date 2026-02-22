// app/api/portal/[token]/route.js
//
// Returns read-only client data for the client-facing portal.
// No authentication required — access is controlled by the unique token.
// The token is generated when a client is created and never changes.

import { createServiceClient } from '../../../../lib/supabase'
import { buildClientPipeline, computeStageCompletion } from '../../../../lib/playbook'

export async function GET(request, { params }) {
  const { token } = params
  if (!token) return Response.json({ error: 'No token' }, { status: 400 })

  const supabase = createServiceClient()

  // Look up client by portal token
  const { data: client, error } = await supabase
    .from('clients')
    .select(`
      id, name, status, industry,
      contact_name, contact_title,
      selected_products, selected_addons,
      card_data, portal_enabled,
      jobs ( id, title, pay_rate, job_type, filled, filled_date, success_fee, created_at ),
      documents ( id, name, public_url, storage_path, doc_type, visible_to_client, created_at ),
      activity_log ( id, type, note, log_date, hours )
    `)
    .eq('portal_token', token)
    .eq('portal_enabled', true)
    .single()

  if (error || !client) {
    return Response.json({ error: 'Portal not found or disabled' }, { status: 404 })
  }

  // Build pipeline and compute progress
  const pipeline = buildClientPipeline(
    client.selected_products || [],
    client.selected_addons || []
  )

  const stageCompletion = computeStageCompletion(pipeline, client.card_data || {})

  // Only return documents marked visible to client
  const visibleDocs = (client.documents || []).filter(d => d.visible_to_client)

  // Return sanitized data — no internal notes, no financials
  return Response.json({
    client: {
      name: client.name,
      status: client.status,
      industry: client.industry,
    },
    pipeline: pipeline.map(stage => ({
      id: stage.id,
      label: stage.label,
      color: stage.color,
      completion: stageCompletion[stage.id] || 0,
    })),
    overallProgress: Math.round(
      Object.values(stageCompletion).reduce((a, b) => a + b, 0) / pipeline.length
    ),
    jobs: (client.jobs || []).map(j => ({
      id: j.id,
      title: j.title,
      type: j.job_type,
      filled: j.filled,
      filledDate: j.filled_date,
    })),
    documents: visibleDocs.map(d => ({
      id: d.id,
      name: d.name,
      url: d.public_url || d.storage_path,
      date: d.created_at,
    })),
    recentActivity: (client.activity_log || [])
      .sort((a, b) => new Date(b.log_date) - new Date(a.log_date))
      .slice(0, 10)
      .map(a => ({
        type: a.type,
        note: a.note,
        date: a.log_date,
      })),
  })
}
