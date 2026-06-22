import './StepLayout.css'

const STEPS = ['Request Type', 'Pre-Approval', 'Settlement', 'Conveyance', 'Feedback', 'Review']

export default function StepLayout({ currentStep, title, subtitle, children, onBack, onNext, nextLabel = 'Continue', nextDisabled = false, hidePrev = false }) {
  return (
    <div className="step-layout">
      <div className="step-header-bar">
        <div className="step-header-inner">
          <div className="step-brand">
            <div className="step-brand-icon">✈</div>
            <span>TravelDesk</span>
          </div>
          <div className="step-indicator">
            {STEPS.map((s, i) => (
              <div key={s} className={`step ${i < currentStep ? 'completed' : ''} ${i === currentStep ? 'active' : ''}`}>
                <div className="step-circle">
                  {i < currentStep ? '✓' : i + 1}
                </div>
                <div className="step-label">{s}</div>
              </div>
            ))}
          </div>
          <div style={{ width: 120 }} />
        </div>
      </div>

      <div className="step-body">
        <div className="step-card">
          <div className="step-title-area">
            <h2>{title}</h2>
            {subtitle && <p className="step-subtitle">{subtitle}</p>}
          </div>

          <div className="step-content fade-in">
            {children}
          </div>

          <div className="step-actions">
            {!hidePrev && (
              <button className="btn btn-secondary" onClick={onBack}>
                ← Back
              </button>
            )}
            <div style={{ flex: 1 }} />
            {onNext && (
              <button className="btn btn-primary btn-lg" onClick={onNext} disabled={nextDisabled}>
                {nextLabel} →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
