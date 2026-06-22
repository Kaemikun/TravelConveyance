import './Dashboard.css'

const STATS = [
  { label: 'Total Submitted', value: '12', icon: '📋', color: '#dbeafe', iconBg: '#1a56db' },
  { label: 'Pending Approval', value: '3', icon: '⏳', color: '#fef3c7', iconBg: '#d97706' },
  { label: 'Approved & Paid', value: '8', icon: '✅', color: '#d1fae5', iconBg: '#059669' },
  { label: 'Rejected', value: '1', icon: '❌', color: '#fee2e2', iconBg: '#dc2626' },
]

const RECENT = [
  { id: 'TRV-2024-045', type: 'Domestic', destination: 'Mumbai → Delhi', date: 'Dec 10, 2024', amount: '₹18,500', status: 'approved' },
  { id: 'TRV-2024-044', type: 'International', destination: 'Mumbai → Singapore', date: 'Nov 28, 2024', amount: '₹1,24,300', status: 'pending' },
  { id: 'TRV-2024-043', type: 'Domestic', destination: 'Mumbai → Bangalore', date: 'Nov 15, 2024', amount: '₹12,200', status: 'rejected' },
]

const STATUS_BADGE = {
  approved: 'badge-success',
  pending: 'badge-warning',
  rejected: 'badge-danger',
}

const NAV_ITEMS = [
  { key: 'new-request', icon: '➕', label: 'New Request', desc: 'Submit a travel reimbursement', color: '#1a56db', bg: '#eff6ff' },
  { key: 'my-requests', icon: '📂', label: 'My Requests', desc: 'View all your submissions', color: '#7c3aed', bg: '#f5f3ff' },
  { key: 'pending-requests', icon: '⏳', label: 'Pending Requests', desc: 'Awaiting approval', color: '#d97706', bg: '#fffbeb' },
  { key: 'rejected-requests', icon: '🚫', label: 'Rejected Requests', desc: 'Review rejected claims', color: '#dc2626', bg: '#fff1f2' },
]

export default function Dashboard({ user, onNavigate, onLogout }) {
  return (
    <div className="dashboard-page">
      {/* Top nav */}
      <nav className="dash-nav">
        <div className="dash-nav-inner">
          <div className="dash-brand">
            <div className="dash-brand-icon">✈</div>
            <span className="dash-brand-name">TravelDesk</span>
          </div>
          <div className="dash-nav-right">
            <div className="dash-user">
              <div className="dash-user-avatar">{user.avatar}</div>
              <div className="dash-user-info">
                <div className="dash-user-name">{user.name}</div>
                <div className="dash-user-dept">{user.department} · {user.employeeId}</div>
              </div>
            </div>
            <button className="btn btn-secondary" onClick={onLogout}>Sign Out</button>
          </div>
        </div>
      </nav>

      <div className="dash-content">
        {/* Hero */}
        <div className="dash-hero">
          <div className="dash-hero-text">
            <p className="dash-greeting">Good day, {user.name.split(' ')[0]} 👋</p>
            <h1>Travel Reimbursement Portal</h1>
            <p className="dash-subtitle">Submit, track and manage all your travel expense claims in one place.</p>
          </div>
          <div className="dash-hero-illustration">
            <div className="hero-plane">✈️</div>
            <div className="hero-glow" />
          </div>
        </div>

        {/* Stats */}
        <div className="dash-stats">
          {STATS.map(s => (
            <div key={s.label} className="stat-card card" style={{ '--stat-bg': s.color }}>
              <div className="stat-icon" style={{ background: s.iconBg }}>{s.icon}</div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="dash-section">
          <h2 className="section-title">Quick Actions</h2>
          <div className="nav-grid">
            {NAV_ITEMS.map(item => (
              <button
                key={item.key}
                className="nav-card"
                onClick={() => onNavigate(item.key)}
                style={{ '--nav-color': item.color, '--nav-bg': item.bg }}
              >
                <div className="nav-card-icon">{item.icon}</div>
                <div className="nav-card-content">
                  <div className="nav-card-label">{item.label}</div>
                  <div className="nav-card-desc">{item.desc}</div>
                </div>
                <div className="nav-card-arrow">→</div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent requests */}
        <div className="dash-section">
          <div className="section-header">
            <h2 className="section-title">Recent Requests</h2>
            <button className="btn btn-secondary" onClick={() => onNavigate('my-requests')}>View all</button>
          </div>
          <div className="card">
            <table className="requests-table">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Type</th>
                  <th>Destination</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {RECENT.map(r => (
                  <tr key={r.id}>
                    <td><span className="request-id">{r.id}</span></td>
                    <td>
                      <span className={`badge ${r.type === 'Domestic' ? 'badge-blue' : 'badge-gray'}`}>
                        {r.type === 'Domestic' ? '🏠' : '🌍'} {r.type}
                      </span>
                    </td>
                    <td>{r.destination}</td>
                    <td>{r.date}</td>
                    <td><strong>{r.amount}</strong></td>
                    <td>
                      <span className={`badge ${STATUS_BADGE[r.status]}`}>
                        {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Policy notice */}
        <div className="policy-banner">
          <div className="policy-icon">📌</div>
          <div className="policy-text">
            <strong>Travel Policy Reminder:</strong> All claims must be submitted within <strong>30 days</strong> of travel completion.
            International claims require pre-approval. Contact HR for assistance.
          </div>
        </div>
      </div>
    </div>
  )
}
