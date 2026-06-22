import { useState } from 'react'
import StepLayout from './StepLayout'
import './Step5Review.css'

function DocChip({ label, file }) {
  return (
    <div className={`doc-chip ${file ? 'present' : 'missing'}`}>
      <span>{file ? '✅' : '⬜'}</span>
      <span>{label}</span>
      {file && <span className="doc-filename">{file.name}</span>}
    </div>
  )
}

function LegRow({ label, icon, value }) {
  if (!value?.enabled) return null
  return (
    <div className="leg-row">
      <span className="leg-row-icon">{icon}</span>
      <span className="leg-row-label">{label}</span>
      <span className="leg-row-amount">₹{value.amount || '—'}</span>
      <span className={`badge ${value.proof ? 'badge-success' : 'badge-warning'}`}>
        {value.proof ? 'Proof uploaded' : 'No proof'}
      </span>
    </div>
  )
}

export default function Step5Review({ currentStep, data, user, onBack, onSubmit }) {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 2000)
  }

  const totalConveyance = Object.values(data.conveyance)
    .filter(v => v.enabled && v.amount)
    .reduce((s, v) => s + parseFloat(v.amount || 0), 0)

  const totalAmount = (parseFloat(data.hotelAmount || 0) + totalConveyance + parseFloat(data.mobileRecharge || 0) + parseFloat(data.fuelAmount || 0)).toFixed(2)

  if (submitted) {
    return (
      <div className="success-page">
        <div className="success-card card">
          <div className="success-animation">
            <div className="success-circle">✓</div>
          </div>
          <h2>Request Submitted!</h2>
          <p>Your travel reimbursement request has been successfully submitted for approval.</p>
          <div className="success-id">
            Request ID: <strong>TRV-2024-0{Math.floor(Math.random() * 900 + 100)}</strong>
          </div>
          <div className="success-timeline">
            <div className="timeline-step done"><span>✓</span> Submission received</div>
            <div className="timeline-step pending"><span>1</span> Manager review (1–2 business days)</div>
            <div className="timeline-step pending"><span>2</span> Finance approval (2–3 business days)</div>
            <div className="timeline-step pending"><span>3</span> Payment processing (3–5 business days)</div>
          </div>
          <button className="btn btn-primary btn-lg" onClick={onSubmit} style={{ marginTop: 24 }}>
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <StepLayout
      currentStep={currentStep}
      title="Review & Submit"
      subtitle="Review all your information before submitting the reimbursement request."
      onBack={onBack}
      onNext={handleSubmit}
      nextLabel={submitting ? 'Submitting...' : 'Submit Request'}
      nextDisabled={submitting}
    >
      {/* Summary Header */}
      <div className="review-header">
        <div className="review-header-left">
          <div className="review-avatar">{user?.avatar}</div>
          <div>
            <div className="review-name">{user?.name}</div>
            <div className="review-meta">{user?.department} · {user?.employeeId}</div>
          </div>
        </div>
        <div className="review-type-badge">
          <span>{data.requestType === 'domestic' ? '🏠' : '🌍'}</span>
          <span>{data.requestType === 'domestic' ? 'Domestic' : 'International'} Travel</span>
        </div>
      </div>

      {/* Dates */}
      <div className="review-section">
        <div className="review-section-title">📅 Travel Dates</div>
        <div className="review-row">
          <span>Departure</span><strong>{data.travelDateFrom || '—'}</strong>
        </div>
        <div className="review-row">
          <span>Return</span><strong>{data.travelDateTo || '—'}</strong>
        </div>
        {data.destinationCity && (
          <div className="review-row">
            <span>Destination</span><strong>{data.destinationCity}</strong>
          </div>
        )}
      </div>

      {/* Documents */}
      <div className="review-section">
        <div className="review-section-title">📎 Uploaded Documents</div>
        <div className="docs-grid">
          <DocChip label="Pre-Approval Doc" file={data.preApprovalDoc} />
          {data.requestType === 'international' && (
            <>
              <DocChip label="Passport" file={data.passportDoc} />
              <DocChip label="Visa" file={data.visaDoc} />
              <DocChip label="Travel Insurance" file={data.travelInsuranceDoc} />
            </>
          )}
          <DocChip label="Hotel Bill" file={data.hotelBills} />
          <DocChip label="Full Amount Proof" file={data.fullAmountProof} />
          <DocChip label="Handwritten Invoice" file={data.feedbackInvoice} />
        </div>
      </div>

      {/* Conveyance */}
      <div className="review-section">
        <div className="review-section-title">🚕 Local Conveyance</div>
        <LegRow label="Home → Airport" icon="🏠" value={data.conveyance.homeToAirport} />
        <LegRow label="Airport → Venue" icon="✈️" value={data.conveyance.airportToVenue} />
        <LegRow label="Venue → Airport" icon="🏢" value={data.conveyance.venueToAirport} />
        <LegRow label="Airport → Home" icon="🏡" value={data.conveyance.airportToHome} />
        {!Object.values(data.conveyance).some(v => v.enabled) && (
          <p className="review-empty">No conveyance legs selected</p>
        )}
      </div>

      {/* Amount summary */}
      <div className="review-section amount-summary">
        <div className="review-section-title">💰 Amount Summary</div>
        <div className="amount-row"><span>Hotel Bills</span><span>₹{parseFloat(data.hotelAmount || 0).toFixed(2)}</span></div>
        <div className="amount-row"><span>Local Conveyance</span><span>₹{totalConveyance.toFixed(2)}</span></div>
        <div className="amount-row"><span>Mobile Recharge</span><span>₹{parseFloat(data.mobileRecharge || 0).toFixed(2)}</span></div>
        <div className="amount-row"><span>Fuel</span><span>₹{parseFloat(data.fuelAmount || 0).toFixed(2)}</span></div>
        <div className="amount-row total"><span>Total Claim Amount</span><span>₹{totalAmount}</span></div>
      </div>

      <div className="review-declaration">
        <span>🖊️</span>
        <span>By submitting, I confirm that all information provided is accurate and the documents uploaded are genuine. I understand that any misrepresentation may lead to disciplinary action.</span>
      </div>
    </StepLayout>
  )
}
