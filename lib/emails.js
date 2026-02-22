// ─────────────────────────────────────────────────────────────────────────────
// EMAIL TEMPLATES — used by the overdue alert API route
// All emails sent via Resend (resend.com)
// ─────────────────────────────────────────────────────────────────────────────

export function overdueAlertEmail({ recipientName, clientName, cardTitle, stageName, daysSince, timerDays, clientUrl }) {
  return {
    subject: `⚠️ Overdue: ${cardTitle} — ${clientName}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Georgia, serif; background: #f4f4f4; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,.1); }
    .header { background: #1C1C1E; padding: 24px 32px; }
    .header .brand { color: #C41230; font-size: 22px; font-weight: 900; letter-spacing: 2px; }
    .header .sub { color: rgba(255,255,255,.5); font-size: 11px; letter-spacing: 3px; margin-top: 4px; }
    .alert-bar { background: #C41230; padding: 14px 32px; color: white; font-size: 14px; font-weight: 700; }
    .body { padding: 32px; }
    .card-box { background: #FEF2F2; border: 2px solid #C41230; border-radius: 8px; padding: 20px 24px; margin: 20px 0; }
    .card-box .label { font-size: 11px; color: #6B6B6B; font-weight: 700; letter-spacing: .5px; margin-bottom: 6px; }
    .card-box .value { font-size: 16px; color: #1C1C1E; font-weight: 700; }
    .stat-row { display: flex; gap: 24px; margin: 20px 0; }
    .stat { flex: 1; background: #F9F9F9; border-radius: 6px; padding: 14px 16px; text-align: center; }
    .stat .num { font-size: 28px; font-weight: 700; color: #C41230; }
    .stat .lbl { font-size: 11px; color: #6B6B6B; margin-top: 4px; }
    .cta { display: block; background: #C41230; color: white !important; text-decoration: none; text-align: center; padding: 14px 24px; border-radius: 6px; font-weight: 700; font-size: 14px; margin: 24px 0; }
    .footer { background: #F9F9F9; padding: 16px 32px; font-size: 11px; color: #999; border-top: 1px solid #EBEBEB; }
    p { color: #444; line-height: 1.7; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="brand">FRIDAY</div>
      <div class="sub">WORKFORCE SOLUTIONS</div>
    </div>
    <div class="alert-bar">⚠️ Delivery Card Overdue</div>
    <div class="body">
      <p>Hi ${recipientName},</p>
      <p>A delivery card for <strong>${clientName}</strong> has gone past its target completion window and needs your attention.</p>

      <div class="card-box">
        <div class="label">OVERDUE CARD</div>
        <div class="value">${cardTitle}</div>
        <div class="label" style="margin-top:10px;">STAGE</div>
        <div class="value" style="font-size:14px; font-weight:400;">${stageName}</div>
      </div>

      <table width="100%" style="border-collapse:collapse; margin: 20px 0;">
        <tr>
          <td style="background:#F9F9F9; border-radius:6px; padding:14px; text-align:center; width:50%;">
            <div style="font-size:28px; font-weight:700; color:#C41230;">${daysSince}</div>
            <div style="font-size:11px; color:#6B6B6B; margin-top:4px;">Days Since Last Update</div>
          </td>
          <td style="width:20px;"></td>
          <td style="background:#F9F9F9; border-radius:6px; padding:14px; text-align:center; width:50%;">
            <div style="font-size:28px; font-weight:700; color:#1D4ED8;">${timerDays}</div>
            <div style="font-size:11px; color:#6B6B6B; margin-top:4px;">Target Window (Days)</div>
          </td>
        </tr>
      </table>

      <p>Please open the card, update the checklist, and log any activity to clear this alert. Consistent delivery cadence is what keeps ${clientName} confident in Friday's service.</p>

      <a href="${clientUrl}" class="cta">Open ${clientName} → ${cardTitle}</a>

      <p style="font-size:12px; color:#999;">You are receiving this because you are assigned to this account. Reply to this email if you believe this alert was sent in error.</p>
    </div>
    <div class="footer">Friday Workforce Solutions · Delivery Management System · <a href="${clientUrl}" style="color:#C41230;">View Client</a></div>
  </div>
</body>
</html>
    `
  }
}

export function secondOverdueAlertEmail({ adminName, recruiterName, clientName, cardTitle, stageName, daysSince, clientUrl }) {
  return {
    subject: `🚨 SECOND ALERT: ${cardTitle} — ${clientName} (${daysSince} days overdue)`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Georgia, serif; background: #f4f4f4; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,.1); }
    .header { background: #1C1C1E; padding: 24px 32px; }
    .brand { color: #C41230; font-size: 22px; font-weight: 900; letter-spacing: 2px; }
    .alert-bar { background: #7F1D1D; padding: 14px 32px; color: white; font-size: 14px; font-weight: 700; }
    .body { padding: 32px; }
    .card-box { background: #FEF2F2; border: 2px solid #7F1D1D; border-radius: 8px; padding: 20px 24px; margin: 20px 0; }
    .cta { display: block; background: #C41230; color: white !important; text-decoration: none; text-align: center; padding: 14px 24px; border-radius: 6px; font-weight: 700; font-size: 14px; margin: 24px 0; }
    .footer { background: #F9F9F9; padding: 16px 32px; font-size: 11px; color: #999; border-top: 1px solid #EBEBEB; }
    p { color: #444; line-height: 1.7; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header"><div class="brand">FRIDAY</div></div>
    <div class="alert-bar">🚨 Second Overdue Alert — Admin Notification</div>
    <div class="body">
      <p>Hi ${adminName},</p>
      <p>This is a second alert. The card below for <strong>${clientName}</strong> was flagged as overdue and has still not been updated. This has been escalated to you for follow-up with <strong>${recruiterName}</strong>.</p>

      <div class="card-box">
        <div style="font-size:11px; color:#999; font-weight:700; margin-bottom:6px;">OVERDUE CARD</div>
        <div style="font-size:16px; font-weight:700; color:#1C1C1E;">${cardTitle}</div>
        <div style="font-size:11px; color:#999; margin-top:8px;">Stage: ${stageName} · ${daysSince} days since last update · Assigned to: ${recruiterName}</div>
      </div>

      <p>Please check in with ${recruiterName} and confirm the status of this card. If the client relationship is at risk, this is a good time to get ahead of it.</p>
      <a href="${clientUrl}" class="cta">Open ${clientName} in the App</a>
    </div>
    <div class="footer">Friday Workforce Solutions · Admin Alert System</div>
  </div>
</body>
</html>
    `
  }
}

export function intakeConfirmationEmail({ clientName, contactName, portalUrl }) {
  return {
    subject: `Welcome to Friday Workforce Solutions — Your delivery is underway`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Georgia, serif; background: #f4f4f4; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; }
    .header { background: #1C1C1E; padding: 32px; text-align: center; }
    .brand { color: #C41230; font-size: 28px; font-weight: 900; letter-spacing: 3px; }
    .sub { color: rgba(255,255,255,.4); font-size: 10px; letter-spacing: 4px; margin-top: 6px; }
    .body { padding: 40px 32px; }
    .portal-box { background: #1C1C1E; border-radius: 8px; padding: 24px; margin: 24px 0; text-align: center; }
    .portal-url { color: #C41230; font-size: 13px; word-break: break-all; margin: 8px 0; }
    .cta { display: block; background: #C41230; color: white !important; text-decoration: none; text-align: center; padding: 16px 24px; border-radius: 6px; font-weight: 700; font-size: 15px; margin: 24px 0; }
    p { color: #444; line-height: 1.8; font-size: 14px; }
    .footer { background: #F9F9F9; padding: 16px 32px; font-size: 11px; color: #999; text-align: center; border-top: 1px solid #EBEBEB; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="brand">FRIDAY</div>
      <div class="sub">WORKFORCE SOLUTIONS</div>
    </div>
    <div class="body">
      <p>Hi ${contactName},</p>
      <p>Welcome to Friday Workforce Solutions. Your account for <strong>${clientName}</strong> has been set up and your delivery team is already working.</p>
      <p>We've created a live progress portal so you can see exactly where things stand at any time — no need to email us for an update.</p>

      <div class="portal-box">
        <div style="color:rgba(255,255,255,.5); font-size:11px; letter-spacing:2px; margin-bottom:8px;">YOUR PROGRESS PORTAL</div>
        <div class="portal-url">${portalUrl}</div>
        <div style="color:rgba(255,255,255,.4); font-size:11px; margin-top:8px;">Bookmark this link — no login required</div>
      </div>

      <p>From your portal you can see:</p>
      <ul style="color:#444; line-height:2; font-size:14px;">
        <li>Your delivery pipeline and what stage we're in</li>
        <li>Active job orders and candidate pipeline status</li>
        <li>Documents we've shared with you</li>
        <li>Weekly activity summaries</li>
      </ul>

      <a href="${portalUrl}" class="cta">View Your Progress Portal →</a>

      <p>Your recruiter will be in touch shortly to schedule your onboarding call. In the meantime, feel free to reach out with any questions.</p>
      <p>— The Friday Workforce Solutions Team</p>
    </div>
    <div class="footer">Friday Workforce Solutions · © ${new Date().getFullYear()}</div>
  </div>
</body>
</html>
    `
  }
}
