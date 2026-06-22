import StepLayout from './StepLayout'
import FileUpload from './FileUpload'
import './Step2Settlement.css'

export default function Step2Settlement({ currentStep, data, update, onBack, onNext }) {
  const canProceed = data.travelDateFrom && data.travelDateTo && data.hotelBills && data.hotelAmount

  return (
    <StepLayout
      currentStep={currentStep}
      title="Travel Settlement"
      subtitle="Provide travel dates, hotel bills and expense details."
      onBack={onBack}
      onNext={onNext}
      nextDisabled={!canProceed}
    >
      {/* Travel Dates */}
      <div className="settlement-section">
        <div className="settlement-section-title">
          <span className="settlement-section-icon">📅</span> Travel Dates
        </div>
        <div className="date-grid">
          <div className="form-group">
            <label className="form-label">
              Departure Date <span className="required">*</span>
            </label>
            <input
              type="date"
              className="form-input"
              value={data.travelDateFrom}
              onChange={e => update({ travelDateFrom: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">
              Return Date <span className="required">*</span>
            </label>
            <input
              type="date"
              className="form-input"
              value={data.travelDateTo}
              min={data.travelDateFrom}
              onChange={e => update({ travelDateTo: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Hotel Bills */}
      <div className="settlement-section">
        <div className="settlement-section-title">
          <span className="settlement-section-icon">🏨</span> Hotel Bills
        </div>

        <div className="hotel-grid">
          <div style={{ flex: 1 }}>
            <FileUpload
              label="Hotel Bill / Invoice"
              required
              file={data.hotelBills}
              onChange={f => update({ hotelBills: f })}
              hint="Original hotel invoice / receipt · PDF up to 10MB"
            />
          </div>

          <div className="hotel-amount-col">
            <div className="form-group">
              <label className="form-label">
                Total Hotel Amount (₹) <span className="required">*</span>
              </label>
              <div className="amount-input-wrap">
                <span className="amount-prefix">₹</span>
                <input
                  type="number"
                  className="form-input amount-input"
                  placeholder="0.00"
                  value={data.hotelAmount}
                  min="0"
                  onChange={e => update({ hotelAmount: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Destination City</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Delhi, Singapore"
                value={data.destinationCity || ''}
                onChange={e => update({ destinationCity: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Hotel Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Taj Hotel"
                value={data.hotelName || ''}
                onChange={e => update({ hotelName: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Additional Docs */}
      <div className="settlement-section">
        <div className="settlement-section-title">
          <span className="settlement-section-icon">📎</span> Additional Proof Documents
        </div>
        <FileUpload
          label="Full Amount Proof (all receipts combined)"
          file={data.fullAmountProof}
          onChange={f => update({ fullAmountProof: f })}
          hint="Single PDF containing all bills/receipts · PDF up to 20MB"
        />
      </div>

      <div className="upload-note">
        <span>💡</span>
        <span>All amounts must match the supporting documents. Discrepancies will delay the approval process.</span>
      </div>
    </StepLayout>
  )
}
