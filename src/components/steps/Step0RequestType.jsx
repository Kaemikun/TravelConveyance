import StepLayout from './StepLayout'
import './Step0RequestType.css'

export default function Step0RequestType({ currentStep, data, update, onBack, onNext }) {
  const types = [
    {
      value: 'domestic',
      icon: '🏠',
      label: 'Domestic Travel',
      desc: 'Travel within India',
      details: ['Pre-approval document required', 'Hotel & conveyance claims', 'Standard reimbursement policy'],
      color: '#1a56db',
      bg: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
    },
    {
      value: 'international',
      icon: '🌍',
      label: 'International Travel',
      desc: 'Travel outside India',
      details: ['Pre-approval form + passport required', 'Visa & travel insurance (if applicable)', 'Foreign exchange reimbursement'],
      color: '#7c3aed',
      bg: 'linear-gradient(135deg, #f5f3ff, #ede9fe)',
    },
  ]

  return (
    <StepLayout
      currentStep={currentStep}
      title="Select Request Type"
      subtitle="Choose the type of travel for your reimbursement claim."
      onBack={onBack}
      onNext={onNext}
      nextDisabled={!data.requestType}
      hidePrev={false}
    >
      <div className="type-grid">
        {types.map(t => (
          <button
            key={t.value}
            className={`type-card ${data.requestType === t.value ? 'selected' : ''}`}
            style={{ '--type-color': t.color, '--type-bg': t.bg }}
            onClick={() => update({ requestType: t.value })}
          >
            <div className="type-card-inner">
              <div className="type-icon">{t.icon}</div>
              <div className="type-info">
                <div className="type-label">{t.label}</div>
                <div className="type-desc">{t.desc}</div>
                <ul className="type-details">
                  {t.details.map(d => <li key={d}>{d}</li>)}
                </ul>
              </div>
            </div>
            {data.requestType === t.value && <div className="type-check">✓</div>}
          </button>
        ))}
      </div>
    </StepLayout>
  )
}
