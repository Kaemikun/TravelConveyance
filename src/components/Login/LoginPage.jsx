import { useState } from 'react'
import './LoginPage.css'

const MOCK_USERS = [
  { email: 'john.doe@company.com', name: 'John Doe', department: 'Engineering', employeeId: 'EMP-1042', avatar: 'JD' },
  { email: 'priya.sharma@company.com', name: 'Priya Sharma', department: 'Marketing', employeeId: 'EMP-2078', avatar: 'PS' },
]

export default function LoginPage({ onLogin }) {
  const [step, setStep] = useState('email')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [foundUser, setFoundUser] = useState(null)

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    setError('')
    const user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (!user) {
      setError('No account found with this email address.')
      return
    }
    setFoundUser(user)
    setStep('sso')
  }

  const handleSSOLogin = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onLogin(foundUser)
    }, 2000)
  }

  return (
    <div className="login-page">
      <div className="login-bg">
        <div className="login-orb login-orb-1" />
        <div className="login-orb login-orb-2" />
        <div className="login-orb login-orb-3" />
      </div>

      <div className="login-container fade-in">
        <div className="login-brand">
          <div className="brand-logo">
            <span>✈</span>
          </div>
          <div>
            <h1 className="brand-name">TravelDesk</h1>
            <p className="brand-tagline">Travel & Reimbursement Portal</p>
          </div>
        </div>

        {step === 'email' && (
          <div className="login-card card">
            <div className="login-card-header">
              <h2>Welcome back</h2>
              <p>Sign in with your corporate email to continue</p>
            </div>

            <form onSubmit={handleEmailSubmit}>
              <div className="form-group">
                <label className="form-label">Corporate Email</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="you@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoFocus
                />
                {error && <p className="form-error">{error}</p>}
              </div>
              <button type="submit" className="btn btn-primary btn-full">
                Continue →
              </button>
            </form>

            <div className="login-divider">
              <span>or</span>
            </div>

            <div className="demo-accounts">
              <p className="demo-label">Demo accounts:</p>
              {MOCK_USERS.map(u => (
                <button key={u.email} className="demo-user-btn" onClick={() => { setEmail(u.email); setFoundUser(u); setStep('sso'); }}>
                  <div className="demo-avatar">{u.avatar}</div>
                  <div>
                    <div className="demo-name">{u.name}</div>
                    <div className="demo-email">{u.email}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'sso' && (
          <div className="login-card card">
            <div className="login-card-header">
              <h2>SSO Authentication</h2>
              <p>Redirecting to your organization's identity provider</p>
            </div>

            <div className="sso-user-info">
              <div className="sso-avatar">{foundUser?.avatar}</div>
              <div>
                <div className="sso-name">{foundUser?.name}</div>
                <div className="sso-email">{foundUser?.email}</div>
              </div>
            </div>

            <div className="sso-provider">
              <div className="sso-provider-icon">🔐</div>
              <div className="sso-provider-info">
                <div className="sso-provider-name">Corporate SSO</div>
                <div className="sso-provider-desc">Secured by Microsoft Azure AD</div>
              </div>
            </div>

            {loading ? (
              <div className="sso-loading">
                <div className="sso-spinner" />
                <p>Authenticating with corporate SSO...</p>
              </div>
            ) : (
              <>
                <button className="btn btn-primary btn-full btn-lg" onClick={handleSSOLogin}>
                  <span>🔒</span> Sign in with SSO
                </button>
                <button className="btn btn-secondary btn-full" style={{ marginTop: 10 }} onClick={() => setStep('email')}>
                  ← Use different email
                </button>
              </>
            )}

            <div className="sso-note">
              <span>🛡️</span> Your session is protected with enterprise-grade security
            </div>
          </div>
        )}

        <div className="login-footer">
          <p>© 2024 TravelDesk · <a href="#">Privacy Policy</a> · <a href="#">Help</a></p>
        </div>
      </div>
    </div>
  )
}
