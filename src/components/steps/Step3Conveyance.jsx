import { useRef } from 'react'
import StepLayout from './StepLayout'
import './Step3Conveyance.css'

const CONVEYANCE_LEGS = [
  { key: 'homeToAirport',  label: 'Home → Airport',          icon: '🏠', desc: 'Taxi/cab from home to departure airport' },
  { key: 'airportToVenue', label: 'Airport → Company Venue',  icon: '✈️', desc: 'Transport from arrival airport to office/venue' },
  { key: 'venueToAirport', label: 'Company Venue → Airport',  icon: '🏢', desc: 'Transport from office/venue to departure airport' },
  { key: 'airportToHome',  label: 'Airport → Home',           icon: '🏡', desc: 'Taxi/cab from arrival airport to home' },
]

function LegCard({ leg, value, onChange }) {
  const inputRef = useRef()

  return (
    <div className={`leg-card ${value.enabled ? 'enabled' : ''}`}>
      <div className="leg-header">
        <div className="leg-header-left">
          <div className="leg-icon">{leg.icon}</div>
          <div>
            <div className="leg-label">{leg.label}</div>
            <div className="leg-desc">{leg.desc}</div>
          </div>
        </div>
        <label className="leg-toggle">
          <input
            type="checkbox"
            checked={value.enabled}
            onChange={e => onChange({ ...value, enabled: e.target.checked })}
          />
          <span className="toggle-slider" />
        </label>
      </div>

      {value.enabled && (
        <div className="leg-body fade-in">
          <div className="leg-fields">
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Amount (₹) <span className="required">*</span></label>
              <div className="amount-input-wrap">
                <span className="amount-prefix">₹</span>
                <input
                  type="number"
                  className="form-input amount-input"
                  placeholder="0.00"
                  value={value.amount}
                  min="0"
                  onChange={e => onChange({ ...value, amount: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Mode of Transport</label>
              <select
                className="form-select"
                value={value.mode || ''}
                onChange={e => onChange({ ...value, mode: e.target.value })}
              >
                <option value="">Select mode</option>
                <option value="cab">App Cab (Ola/Uber)</option>
                <option value="auto">Auto Rickshaw</option>
                <option value="taxi">Local Taxi</option>
                <option value="personal">Personal Vehicle</option>
                <option value="bus">Bus</option>
                <option value="train">Local Train / Metro</option>
              </select>
            </div>
          </div>

          {/* Proof Upload */}
          <div className="form-group">
            <label className="form-label">Proof Document (Receipt/Screenshot)</label>
            <div
              className={`upload-box compact ${value.proof ? 'has-file' : ''}`}
              onClick={() => inputRef.current.click()}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ display: 'none' }}
                onChange={e => onChange({ ...value, proof: e.target.files[0] || null })}
              />
              {value.proof ? (
                <span className="upload-label">✓ {value.proof.name}</span>
              ) : (
                <span>📎 <span className="upload-label">Upload receipt / cab bill</span></span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Step3Conveyance({ currentStep, data, update, onBack, onNext }) {
  const updateLeg = (key, val) => {
    update({ conveyance: { ...data.conveyance, [key]: val } })
  }

  return (
    <StepLayout
      currentStep={currentStep}
      title="Local Conveyance"
      subtitle="Select and fill in each applicable travel leg. Upload proof documents for all selected legs."
      onBack={onBack}
      onNext={onNext}
    >
      {/* Legs */}
      <div className="legs-grid">
        {CONVEYANCE_LEGS.map(leg => (
          <LegCard
            key={leg.key}
            leg={leg}
            value={data.conveyance[leg.key]}
            onChange={val => updateLeg(leg.key, val)}
          />
        ))}
      </div>

      {/* Fuel & Mobile */}
      <div className="extras-section">
        <div className="extras-title">
          <span>⚙️</span> Additional Allowances
          <span className="extras-note">(Fetched from policy — amounts shown for reference)</span>
        </div>

        <div className="extras-grid">
          <div className="extra-card">
            <div className="extra-card-header">
              <span className="extra-icon">📱</span>
              <div>
                <div className="extra-label">Mobile Recharge Allowance</div>
                <div className="extra-policy-note">🔗 Rates fetched from policy backend</div>
              </div>
            </div>
            <div className="amount-input-wrap">
              <span className="amount-prefix">₹</span>
              <input
                type="number"
                className="form-input amount-input"
                placeholder="Amount (will auto-fill from backend)"
                value={data.mobileRecharge}
                onChange={e => update({ mobileRecharge: e.target.value })}
              />
            </div>
            <div className="policy-fetch-badge">
              <span>⏳</span> Rates will be loaded from backend
            </div>
          </div>

          <div className="extra-card">
            <div className="extra-card-header">
              <span className="extra-icon">⛽</span>
              <div>
                <div className="extra-label">Fuel Reimbursement</div>
                <div className="extra-policy-note">🔗 Rates fetched from policy backend</div>
              </div>
            </div>
            <div className="amount-input-wrap">
              <span className="amount-prefix">₹</span>
              <input
                type="number"
                className="form-input amount-input"
                placeholder="Amount (will auto-fill from backend)"
                value={data.fuelAmount}
                onChange={e => update({ fuelAmount: e.target.value })}
              />
            </div>
            <div className="form-group" style={{ marginTop: 10, marginBottom: 0 }}>
              <label className="form-label">Fuel Type</label>
              <select
                className="form-select"
                value={data.fuelType || ''}
                onChange={e => update({ fuelType: e.target.value })}
              >
                <option value="">Select fuel type</option>
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="cng">CNG</option>
                <option value="ev">EV / Electric</option>
              </select>
            </div>
            <div className="policy-fetch-badge">
              <span>⏳</span> Rates will be loaded from backend
            </div>
          </div>
        </div>
      </div>

      <div className="upload-note">
        <span>💡</span>
        <span>At least one conveyance leg must be selected. All amounts must be backed by supporting receipts.</span>
      </div>
    </StepLayout>
  )
}
