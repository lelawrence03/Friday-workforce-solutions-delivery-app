// app/api/alerts/route.js
//
// Scans all active clients for overdue cards and emails the assigned recruiter.
//
// HOW TO TRIGGER:
//   Option A (manual): Visit /api/alerts in your browser
//   Option B (automatic): Vercel Cron runs this every weekday at 8am UTC
//     (configured in vercel.json)
//
// ALERT LOGIC:
//   - One alert per card per overdue window
//   - Sent to the recruiter assigned to the client
//   - Won't re-send until the card is updated and goes overdue again

import { createServiceClient } from '../../../lib/supabase'
import { buildClientPipeline } from '../../../lib/playbook'
import { overdueAlertEmail } from '../../../lib/emails'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function GET(request) {
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServiceClient()
  const appUrl = process.env.NEXT_PUBLIC_APP_URL
  const fromEmail = process.env.ALERT_FROM_EMAIL

  try {
    const { data: clients, error } = await supabase
      .from('clients')
      .select(`
        id, name, assigned_recruiter, selected_products, selected_addons, created_at,
        card_activity ( card_id, last_touched ),
        alert_log ( card_id, alert_type, sent_at )
      `)
      .eq('status', 'active')

    if (error) throw error

    const alertsSent = []

    for (const client of clients) {
      if (!client.assigned_recruiter) continue

      const pipeline = buildClientPipeline(
        client.selected_products || [],
        client.selected_addons || []
      )

      // Update this domain to match your actual email addresses
      const recruiterEmail = `${client.assigned_recruiter}@fridayservices.com`
      const recruiterName = client.assigned_recruiter

      for (const stage of pipeline) {
        for (const card of stage.cards) {
          if (!card.timerDays) continue

          const activity = client.card_activity?.find(a => a.card_id === card.id)
          const lastTouched = activity?.last_touched
            ? new Date(activity.last_touched)
            : new Date(client.created_at || Date.now())

          const daysSince = Math.floor(
            (Date.now() - lastTouched.getTime()) / (1000 * 60 * 60 * 24)
          )

          if (daysSince <= card.timerDays) continue

          // Was an alert already sent after the last time this card was touched?
          const existingAlert = client.alert_log?.find(a => {
            if (a.card_id !== card.id) return false
            return new Date(a.sent_at) > lastTouched
          })

          if (existingAlert) continue

          const clientUrl = `${appUrl}?client=${client.id}`

          const emailContent = overdueAlertEmail({
            recipientName: recruiterName,
            clientName: client.name,
            cardTitle: card.title,
            stageName: stage.label,
            daysSince,
            timerDays: card.timerDays,
            clientUrl,
          })

          await resend.emails.send({
            from: fromEmail,
            to: recruiterEmail,
            subject: emailContent.subject,
            html: emailContent.html,
          })

          await supabase.from('alert_log').insert({
            client_id: client.id,
            card_id: card.id,
            alert_type: 'overdue',
            recipient_email: recruiterEmail,
            recipient_role: 'recruiter',
          })

          alertsSent.push({ client: client.name, card: card.title, to: recruiterEmail, daysSince })
        }
      }
    }

    return Response.json({ success: true, alertsSent: alertsSent.length, details: alertsSent })

  } catch (err) {
    console.error('Alert job failed:', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}
