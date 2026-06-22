import StepLayout from './StepLayout'
import FileUpload from './FileUpload'
import './Step4Feedback.css'

export default function Step4Feedback({ currentStep, data, update, onBack, onNext }) {
  return (
    <StepLayout
      currentStep={currentStep}
      title="Travel Feedback & Invoice"
      subtitle="Upload your handwritten travel invoice and provide trip feedback."
      onBack={onBack}
      onNext={onNext}
      nextDisabled={!data.feedbackInvoice}
    >
      {/* What to upload guide */}
      <div className="feedback-guide">
        <div className="feedback-guide-title">
          <span>📋</span> What to include in your handwritten invoice
        </div>
        <div className="feedback-guide-grid">
          {[
            { icon: '✈️', text: 'Flight / train tickets summary' },
            { icon: '🏨', text: 'Hotel stay details' },
            { icon: '🚕', text: 'Local transport expenses' },
            { icon: '🍽️', text: 'Meal allowances (if applicable)' },
            { icon: '📱', text: 'Communication charges' },
            { icon: '📝', text: 'Any miscellaneous expenses' },
          ].map(item => (
            <div key={item.text} className="guide-item">
              <span className="guide-item-icon">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Upload */}
      <FileUpload
        label="Handwritten Travel Invoice (PDF Upload)"
        required
        file={data.feedbackInvoice}
        onChange={f => update({ feedbackInvoice: f })}
        hint="Scan or photograph your handwritten invoice and upload as PDF/JPG/PNG · up to 20MB"
      />

      {/* Trip experience */}
      <div className="form-group">
        <label className="form-label">Trip Purpose / Summary</label>
        <textarea
          className="form-textarea"
          placeholder="Briefly describe the purpose of this trip, key activities, and outcome..."
          value={data.tripSummary || ''}
          rows={3}
          onChange={e => update({ tripSummary: e.target.value })}
        />
      </div>

      {/* Rating */}
      <div className="form-group">
        <label className="form-label">Travel Experience Rating</label>
        <div className="rating-row">
          {[1, 2, 3, 4, 5].map(n => (
            <button
              key={n}
              className={`rating-btn ${(data.tripRating || 0) >= n ? 'active' : ''}`}
              onClick={() => update({ tripRating: n })}
            >
              ⭐
            </button>
          ))}
          {data.tripRating && (
            <span className="rating-label">
              {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][data.tripRating]}
            </span>
          )}
        </div>
      </div>

      {/* Additional comments */}
      <div className="form-group">
        <label className="form-label">Additional Comments or Issues</label>
        <textarea
          className="form-textarea"
          placeholder="Any issues faced during travel, suggestions for improvement, or other remarks..."
          value={data.tripComments || ''}
          rows={3}
          onChange={e => update({ tripComments: e.target.value })}
        />
      </div>

      <div className="upload-note">
        <span>⚠️</span>
        <span>The handwritten invoice is <strong>mandatory</strong>. All other fields are optional but help speed up approval.</span>
      </div>
    </StepLayout>
  )
}
