'use client'
import { useState } from 'react'
import { PRODUCTS, ADDONS } from '../../lib/playbook'

const R = '#C41230'
const DK = '#1C1C1E'
const MD = '#6B6B6B'
const LT = '#F4F4F5'
const WH = '#FFFFFF'
const GR = '#1A7A3A'

export default function IntakeForm({ onComplete, onCancel }) {
  const [step, setStep] = useState(1) // 1=company, 2=contact, 3=roles, 4=products, 5=context
  const [saving, setSaving] = useState(false)
  const [savedPortalUrl, setSavedPortalUrl] = useState(null)

  const [form, setForm] = useState({
    // Company
    company_name: '', industry: '', company_size: '', website: '', address: '',
    // Contact
    contact_name: '', contact_title: '', contact_email: '', contact_phone: '',
    // Roles
    roles_to_fill: [{ title: '', payRate: '', type: 'direct-hire', count: 1 }],
    // Products & add-ons
    selected_products: [],
    selected_addons: [],
    // Context
    biggest_challenge: '', previous_agency: null, previous_agency_exp: '',
    timeline_urgency: '', culture_description: '', management_style: '', team_structure: '',
    notes: '',
    // Options
    send_portal_email: true,
    filled_by: 'recruiter',
  })

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const toggleProduct = (id) => {
    set('selected_products',
      form.selected_products.includes(id)
        ? form.selected_products.filter(p => p !== id)
        : [...form.selected_products, id]
    )
  }

  const toggleAddon = (id) => {
    set('selected_addons',
      form.selected_addons.includes(id)
        ? form.selected_addons.filter(a => a !== id)
        : [...form.selected_addons, id]
    )
  }

  const addRole = () => set('roles_to_fill', [...form.roles_to_fill, { title: '', payRate: '', type: 'direct-hire', count: 1 }])
  const updateRole = (i, key, val) => {
    const roles = [...form.roles_to_fill]
    roles[i] = { ...roles[i], [key]: val }
    set('roles_to_fill', roles)
  }
  const removeRole = (i) => set('roles_to_fill', form.roles_to_fill.filter((_, idx) => idx !== i))

  const handleSubmit = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setSavedPortalUrl(data.portalUrl)
        if (onComplete) onComplete(data)
      } else {
        alert('Error saving intake: ' + data.error)
      }
    } catch (err) {
      alert('Failed to save: ' + err.message)
    }
    setSaving(false)
  }

  const inputStyle = {
    width: '100%', border: '1px solid #E0E0E0', borderRadius: 6,
    padding: '10px 12px', fontSize: 13, color: DK, background: WH,
    fontFamily: 'Georgia, serif', outline: 'none',
  }
  const labelStyle = { fontSize: 11, fontWeight: 700, color: MD, marginBottom: 5, display: 'block', letterSpacing: .3 }
  const fieldWrap = { marginBottom: 16 }

  if (savedPortalUrl) {
    return (
      <div style={{ padding: 40, textAlign: 'center', maxWidth: 560, margin: '0 auto' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
        <div style={{ fontWeight: 700, fontSize: 22, color: DK, marginBottom: 8 }}>Client Created!</div>
        <div style={{ color: MD, fontSize: 14, marginBottom: 24 }}>
          {form.company_name} has been added to the system. Their pipeline is ready to go.
        </div>
        <div style={{ background: DK, borderRadius: 10, padding: 20, marginBottom: 24 }}>
          <div style={{ color: 'rgba(255,255,255,.5)', fontSize: 11, letterSpacing: 2, marginBottom: 8 }}>CLIENT PORTAL LINK</div>
          <div style={{ color: R, fontSize: 13, wordBreak: 'break-all', marginBottom: 12 }}>{savedPortalUrl}</div>
          <button onClick={() => navigator.clipboard.writeText(savedPortalUrl)}
            style={{ background: R, color: WH, border: 'none', borderRadius: 5, padding: '8px 18px', cursor: 'pointer', fontWeight: 700, fontSize: 12 }}>
            Copy Link
          </button>
        </div>
        <button onClick={() => onComplete && onComplete({})}
          style={{ background: GR, color: WH, border: 'none', borderRadius: 6, padding: '12px 28px', cursor: 'pointer', fontWeight: 700, fontSize: 14 }}>
          Open Client Pipeline →
        </button>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '24px 24px 40px' }}>

      {/* Progress bar */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          {['Company', 'Contact', 'Roles', 'Services', 'Context'].map((s, i) => (
            <div key={s} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', margin: '0 auto 4px',
                background: step > i + 1 ? GR : step === i + 1 ? R : '#E0E0E0',
                color: step >= i + 1 ? WH : MD, fontSize: 12, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <div style={{ fontSize: 10, color: step === i + 1 ? R : MD, fontWeight: step === i + 1 ? 700 : 400 }}>{s}</div>
            </div>
          ))}
        </div>
        <div style={{ height: 3, background: '#E0E0E0', borderRadius: 2 }}>
          <div style={{ height: '100%', width: `${((step - 1) / 4) * 100}%`, background: R, borderRadius: 2, transition: 'width .3s' }} />
        </div>
      </div>

      {/* ── STEP 1: COMPANY ── */}
      {step === 1 && (
        <div>
          <div style={{ fontWeight: 700, fontSize: 18, color: DK, marginBottom: 4 }}>Company Information</div>
          <div style={{ color: MD, fontSize: 13, marginBottom: 24 }}>Basic details about the client company</div>

          <div style={fieldWrap}>
            <label style={labelStyle}>COMPANY NAME *</label>
            <input style={inputStyle} value={form.company_name} onChange={e => set('company_name', e.target.value)} placeholder="Tevet Industrial" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div style={fieldWrap}>
              <label style={labelStyle}>INDUSTRY</label>
              <select style={inputStyle} value={form.industry} onChange={e => set('industry', e.target.value)}>
                <option value="">Select...</option>
                <option>Manufacturing</option>
                <option>Warehouse & Logistics</option>
                <option>Healthcare</option>
                <option>Construction</option>
                <option>Professional Services</option>
                <option>Technology</option>
                <option>Retail</option>
                <option>Food & Beverage</option>
                <option>Other</option>
              </select>
            </div>
            <div style={fieldWrap}>
              <label style={labelStyle}>COMPANY SIZE</label>
              <select style={inputStyle} value={form.company_size} onChange={e => set('company_size', e.target.value)}>
                <option value="">Select...</option>
                <option>1-25 employees</option>
                <option>26-100 employees</option>
                <option>101-500 employees</option>
                <option>500+ employees</option>
              </select>
            </div>
          </div>
          <div style={fieldWrap}>
            <label style={labelStyle}>WEBSITE</label>
            <input style={inputStyle} value={form.website} onChange={e => set('website', e.target.value)} placeholder="https://www.company.com" />
          </div>
          <div style={fieldWrap}>
            <label style={labelStyle}>ADDRESS / LOCATION</label>
            <input style={inputStyle} value={form.address} onChange={e => set('address', e.target.value)} placeholder="123 Main St, Asheville, NC 28801" />
          </div>
        </div>
      )}

      {/* ── STEP 2: CONTACT ── */}
      {step === 2 && (
        <div>
          <div style={{ fontWeight: 700, fontSize: 18, color: DK, marginBottom: 4 }}>Point of Contact</div>
          <div style={{ color: MD, fontSize: 13, marginBottom: 24 }}>The person we communicate with day-to-day</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div style={fieldWrap}>
              <label style={labelStyle}>FULL NAME *</label>
              <input style={inputStyle} value={form.contact_name} onChange={e => set('contact_name', e.target.value)} placeholder="Sarah Hensley" />
            </div>
            <div style={fieldWrap}>
              <label style={labelStyle}>TITLE</label>
              <input style={inputStyle} value={form.contact_title} onChange={e => set('contact_title', e.target.value)} placeholder="HR Director" />
            </div>
          </div>
          <div style={fieldWrap}>
            <label style={labelStyle}>EMAIL ADDRESS *</label>
            <input style={inputStyle} type="email" value={form.contact_email} onChange={e => set('contact_email', e.target.value)} placeholder="sarah@company.com" />
          </div>
          <div style={fieldWrap}>
            <label style={labelStyle}>PHONE NUMBER</label>
            <input style={inputStyle} value={form.contact_phone} onChange={e => set('contact_phone', e.target.value)} placeholder="(828) 555-0100" />
          </div>

          <div style={{ background: LT, borderRadius: 8, padding: '14px 16px', marginTop: 8 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
              <input type="checkbox" checked={form.send_portal_email} onChange={e => set('send_portal_email', e.target.checked)}
                style={{ width: 16, height: 16, accentColor: R }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: DK }}>Send client their portal link by email</div>
                <div style={{ fontSize: 11, color: MD, marginTop: 2 }}>Sends a welcome email with their read-only progress portal link</div>
              </div>
            </label>
          </div>
        </div>
      )}

      {/* ── STEP 3: ROLES ── */}
      {step === 3 && (
        <div>
          <div style={{ fontWeight: 700, fontSize: 18, color: DK, marginBottom: 4 }}>Roles to Fill</div>
          <div style={{ color: MD, fontSize: 13, marginBottom: 24 }}>Add all positions the client needs to hire for</div>

          {form.roles_to_fill.map((role, i) => (
            <div key={i} style={{ background: LT, borderRadius: 10, padding: '16px 18px', marginBottom: 12, position: 'relative' }}>
              <div style={{ fontWeight: 700, fontSize: 12, color: R, marginBottom: 12 }}>ROLE {i + 1}</div>
              {form.roles_to_fill.length > 1 && (
                <button onClick={() => removeRole(i)}
                  style={{ position: 'absolute', top: 14, right: 14, background: 'none', border: 'none', color: MD, cursor: 'pointer', fontSize: 16 }}>✕</button>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 10, marginBottom: 10 }}>
                <div>
                  <label style={labelStyle}>JOB TITLE *</label>
                  <input style={inputStyle} value={role.title} onChange={e => updateRole(i, 'title', e.target.value)} placeholder="Production Supervisor" />
                </div>
                <div>
                  <label style={labelStyle}>PAY RATE</label>
                  <input style={inputStyle} value={role.payRate} onChange={e => updateRole(i, 'payRate', e.target.value)} placeholder="$28/hr" />
                </div>
                <div>
                  <label style={labelStyle}># NEEDED</label>
                  <input style={inputStyle} type="number" min="1" value={role.count} onChange={e => updateRole(i, 'count', e.target.value)} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>HIRE TYPE</label>
                <select style={inputStyle} value={role.type} onChange={e => updateRole(i, 'type', e.target.value)}>
                  <option value="direct-hire">Direct Hire</option>
                  <option value="contract-to-hire">Contract-to-Hire</option>
                  <option value="contract">Contract / Temp</option>
                  <option value="rpo">RPO (Ongoing)</option>
                </select>
              </div>
            </div>
          ))}

          <button onClick={addRole}
            style={{ background: 'none', border: `2px dashed ${R}`, borderRadius: 8, padding: '12px 20px', width: '100%', color: R, cursor: 'pointer', fontWeight: 700, fontSize: 13, fontFamily: 'Georgia, serif' }}>
            + Add Another Role
          </button>
        </div>
      )}

      {/* ── STEP 4: PRODUCTS & ADD-ONS ── */}
      {step === 4 && (
        <div>
          <div style={{ fontWeight: 700, fontSize: 18, color: DK, marginBottom: 4 }}>Services Selected</div>
          <div style={{ color: MD, fontSize: 13, marginBottom: 20 }}>Check only the products and add-ons this client is purchasing. Only selected services will appear in their pipeline.</div>

          <div style={{ fontWeight: 700, fontSize: 12, color: MD, letterSpacing: .5, marginBottom: 12 }}>PRODUCTS</div>
          {PRODUCTS.map(p => (
            <label key={p.id} onClick={() => toggleProduct(p.id)}
              style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer', padding: '12px 14px',
                background: form.selected_products.includes(p.id) ? `${p.color}12` : WH,
                border: `1px solid ${form.selected_products.includes(p.id) ? p.color : '#E0E0E0'}`,
                borderRadius: 8, marginBottom: 8, transition: 'all .15s' }}>
              <input type="checkbox" checked={form.selected_products.includes(p.id)} readOnly
                style={{ width: 16, height: 16, marginTop: 2, accentColor: p.color }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: DK }}>{p.label}</div>
                <div style={{ fontSize: 11, color: MD, marginTop: 2 }}>{p.description}</div>
              </div>
            </label>
          ))}

          <div style={{ fontWeight: 700, fontSize: 12, color: MD, letterSpacing: .5, marginTop: 20, marginBottom: 12 }}>ADD-ONS</div>
          {ADDONS.map(a => (
            <label key={a.id} onClick={() => toggleAddon(a.id)}
              style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer', padding: '10px 14px',
                background: form.selected_addons.includes(a.id) ? `${a.color}12` : WH,
                border: `1px solid ${form.selected_addons.includes(a.id) ? a.color : '#E0E0E0'}`,
                borderRadius: 8, marginBottom: 8, transition: 'all .15s' }}>
              <input type="checkbox" checked={form.selected_addons.includes(a.id)} readOnly
                style={{ width: 16, height: 16, marginTop: 2, accentColor: a.color }} />
              <div style={{ fontSize: 13, fontWeight: 600, color: DK }}>{a.label}</div>
            </label>
          ))}

          {form.selected_products.length === 0 && (
            <div style={{ background: '#FEF9C3', border: '1px solid #FDE68A', borderRadius: 8, padding: '12px 16px', marginTop: 14, fontSize: 12, color: '#92400E' }}>
              ⚠️ Please select at least one product before continuing.
            </div>
          )}
        </div>
      )}

      {/* ── STEP 5: CONTEXT ── */}
      {step === 5 && (
        <div>
          <div style={{ fontWeight: 700, fontSize: 18, color: DK, marginBottom: 4 }}>Discovery Context</div>
          <div style={{ color: MD, fontSize: 13, marginBottom: 24 }}>Notes from the discovery call — helps the recruiter deliver from day one</div>

          <div style={fieldWrap}>
            <label style={labelStyle}>BIGGEST HIRING CHALLENGE (their words if possible)</label>
            <textarea rows={3} style={{ ...inputStyle, resize: 'vertical' }} value={form.biggest_challenge}
              onChange={e => set('biggest_challenge', e.target.value)}
              placeholder="e.g. 'We can't keep people past 90 days' or 'We've tried three agencies and none of them understand our culture'" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div style={fieldWrap}>
              <label style={labelStyle}>PREVIOUSLY USED A STAFFING AGENCY?</label>
              <div style={{ display: 'flex', gap: 10 }}>
                {['Yes', 'No'].map(v => (
                  <button key={v} onClick={() => set('previous_agency', v === 'Yes')}
                    style={{ flex: 1, padding: '9px 0', borderRadius: 6, border: `1px solid ${form.previous_agency === (v === 'Yes') ? R : '#E0E0E0'}`,
                      background: form.previous_agency === (v === 'Yes') ? R : WH,
                      color: form.previous_agency === (v === 'Yes') ? WH : DK,
                      cursor: 'pointer', fontWeight: 700, fontSize: 13, fontFamily: 'Georgia, serif' }}>
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div style={fieldWrap}>
              <label style={labelStyle}>HIRING TIMELINE</label>
              <select style={inputStyle} value={form.timeline_urgency} onChange={e => set('timeline_urgency', e.target.value)}>
                <option value="">Select...</option>
                <option value="asap">ASAP — they needed someone yesterday</option>
                <option value="30days">Within 30 days</option>
                <option value="60days">Within 60 days</option>
                <option value="flexible">Flexible — no hard deadline</option>
              </select>
            </div>
          </div>

          {form.previous_agency && (
            <div style={fieldWrap}>
              <label style={labelStyle}>PREVIOUS AGENCY EXPERIENCE (what went wrong or right)</label>
              <textarea rows={2} style={{ ...inputStyle, resize: 'vertical' }} value={form.previous_agency_exp}
                onChange={e => set('previous_agency_exp', e.target.value)} placeholder="e.g. 'They sent resumes but never pre-screened anyone'" />
            </div>
          )}

          <div style={fieldWrap}>
            <label style={labelStyle}>CULTURE DESCRIPTION (how do they describe their company culture)</label>
            <textarea rows={2} style={{ ...inputStyle, resize: 'vertical' }} value={form.culture_description}
              onChange={e => set('culture_description', e.target.value)} placeholder="e.g. 'Fast-paced, family-owned, everyone wears multiple hats'" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div style={fieldWrap}>
              <label style={labelStyle}>MANAGEMENT STYLE</label>
              <input style={inputStyle} value={form.management_style} onChange={e => set('management_style', e.target.value)} placeholder="e.g. Hands-on, collaborative" />
            </div>
            <div style={fieldWrap}>
              <label style={labelStyle}>TEAM STRUCTURE</label>
              <input style={inputStyle} value={form.team_structure} onChange={e => set('team_structure', e.target.value)} placeholder="e.g. Reports to Plant Manager" />
            </div>
          </div>

          <div style={fieldWrap}>
            <label style={labelStyle}>ADDITIONAL NOTES</label>
            <textarea rows={3} style={{ ...inputStyle, resize: 'vertical' }} value={form.notes}
              onChange={e => set('notes', e.target.value)} placeholder="Anything else the recruiter should know going in..." />
          </div>
        </div>
      )}

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 28, paddingTop: 20, borderTop: '1px solid #EBEBEB' }}>
        <button onClick={step === 1 ? onCancel : () => setStep(s => s - 1)}
          style={{ background: 'none', border: '1px solid #E0E0E0', borderRadius: 6, padding: '10px 22px', cursor: 'pointer', color: MD, fontSize: 13, fontFamily: 'Georgia, serif' }}>
          {step === 1 ? 'Cancel' : '← Back'}
        </button>

        {step < 5 ? (
          <button onClick={() => setStep(s => s + 1)}
            disabled={step === 1 && !form.company_name || step === 2 && !form.contact_name || step === 4 && form.selected_products.length === 0}
            style={{ background: R, color: WH, border: 'none', borderRadius: 6, padding: '10px 28px', cursor: 'pointer', fontWeight: 700, fontSize: 13, fontFamily: 'Georgia, serif',
              opacity: (step === 1 && !form.company_name) || (step === 4 && form.selected_products.length === 0) ? .5 : 1 }}>
            Continue →
          </button>
        ) : (
          <button onClick={handleSubmit} disabled={saving}
            style={{ background: GR, color: WH, border: 'none', borderRadius: 6, padding: '10px 28px', cursor: saving ? 'wait' : 'pointer', fontWeight: 700, fontSize: 13, fontFamily: 'Georgia, serif' }}>
            {saving ? 'Creating Client...' : '✓ Create Client Account'}
          </button>
        )}
      </div>
    </div>
  )
}
