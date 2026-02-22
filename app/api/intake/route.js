// app/api/intake/route.js
//
// POST: Save a new intake form submission and create the client record
// GET:  Fetch an intake form by ID

import { createServiceClient } from '../../../lib/supabase'
import { Resend } from 'resend'
import { intakeConfirmationEmail } from '../../../lib/emails'
import { v4 as uuidv4 } from 'uuid'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  const supabase = createServiceClient()
  const body = await request.json()

  try {
    // Generate unique portal token for this client
    const portalToken = uuidv4().replace(/-/g, '')

    // 1. Create the client record
    const { data: client, error: clientError } = await supabase
      .from('clients')
      .insert({
        name: body.company_name,
        status: 'active',
        industry: body.industry,
        company_size: body.company_size,
        contact_name: body.contact_name,
        contact_title: body.contact_title,
        contact_email: body.contact_email,
        contact_phone: body.contact_phone,
        selected_products: body.selected_products || [],
        selected_addons: body.selected_addons || [],
        notes: body.notes,
        portal_token: portalToken,
        portal_enabled: true,
      })
      .select()
      .single()

    if (clientError) throw clientError

    // 2. Save the full intake form linked to the client
    const { error: intakeError } = await supabase
      .from('intake_forms')
      .insert({
        client_id: client.id,
        company_name: body.company_name,
        industry: body.industry,
        company_size: body.company_size,
        website: body.website,
        address: body.address,
        biggest_challenge: body.biggest_challenge,
        previous_agency: body.previous_agency,
        previous_agency_exp: body.previous_agency_exp,
        timeline_urgency: body.timeline_urgency,
        culture_description: body.culture_description,
        management_style: body.management_style,
        team_structure: body.team_structure,
        roles_to_fill: body.roles_to_fill || [],
        selected_products: body.selected_products || [],
        selected_addons: body.selected_addons || [],
        filled_by: body.filled_by || 'recruiter',
        status: 'submitted',
      })

    if (intakeError) throw intakeError

    // 3. Create initial job records if roles were included in intake
    if (body.roles_to_fill && body.roles_to_fill.length > 0) {
      const jobs = body.roles_to_fill.map(role => ({
        client_id: client.id,
        title: role.title,
        pay_rate: role.payRate,
        job_type: role.type,
      }))
      await supabase.from('jobs').insert(jobs)
    }

    // 4. Send confirmation email to client if contact email provided
    const portalUrl = `${process.env.NEXT_PUBLIC_APP_URL}/portal/${portalToken}`
    if (body.contact_email && body.send_portal_email) {
      const emailContent = intakeConfirmationEmail({
        clientName: body.company_name,
        contactName: body.contact_name,
        portalUrl,
      })
      await resend.emails.send({
        from: process.env.ALERT_FROM_EMAIL,
        to: body.contact_email,
        subject: emailContent.subject,
        html: emailContent.html,
      })
    }

    return Response.json({
      success: true,
      clientId: client.id,
      portalToken,
      portalUrl,
    })
  } catch (err) {
    console.error('Intake save failed:', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}

export async function GET(request) {
  const supabase = createServiceClient()
  const { searchParams } = new URL(request.url)
  const clientId = searchParams.get('clientId')

  if (!clientId) return Response.json({ error: 'clientId required' }, { status: 400 })

  const { data, error } = await supabase
    .from('intake_forms')
    .select('*')
    .eq('client_id', clientId)
    .single()

  if (error) return Response.json({ error: error.message }, { status: 404 })
  return Response.json(data)
}
