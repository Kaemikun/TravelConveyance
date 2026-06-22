import './RequestList.css'

const REJECTED = [
  { id: 'TRV-2024-043', type: 'Domestic', destination: 'Mumbai → Bangalore', dateFrom: '2024-11-13', dateTo: '2024-11-15', amount: '₹12,200', submitted: 'Nov 16, 2024', reason: 'Hotel bill exceeds policy limit. Maximum allowed ₹5,000/night for domestic travel.' },
  { id: 'TRV-2024-035', type: 'International', destination: 'Mumbai → London', dateFrom: '2024-09-20', dateTo: '2024-09-24', amount: '₹2,15,000', submitted: 'Sep 26, 2024', reason: 'Pre-approval document missing or invalid. Please resubmit with correct approvals.' },
]

export default function RejectedRequests({ onBack }) {
  return (
    <div className="reqlist-page">
      <div className="reqlist-nav">
        <button className="btn btn-secondary" onClick={onBack}>← Dashboard</button>
        <div className="reqlist-brand">
          <div className="reqlist-brand-icon">✈</div>
          <span>TravelDesk</span>
        </div>
      </div>

      <div className="reqlist-content">
        <div className="reqlist-header">
          <div>
            <h1>🚫 Rejected Requests</h1>
            <p>Claims that were not approved — review the reason and resubmit if applicable</p>
          </div>
          <div className="reqlist-count reqlist-count-danger">{REJECTED.length} rejected</div>
        </div>

        {REJECTED.length === 0 ? (
          <div className="card empty-state">
            <div className="empty-icon">🎉</div>
            <div className="empty-title">No rejected requests</div>
            <div className="empty-desc">All your claims have been approved!</div>
          </div>
        ) : (
          <div className="rejected-cards">
            {REJECTED.map(r => (
              <div key={r.id} className="card rejected-card">
                <div className="rejected-card-header">
                  <div>
                    <div className="rejected-id">{r.id}</div>
                    <div className="rejected-dest">{r.destination}</div>
                  </div>
                  <div className="rejected-badge-area">
                    <span className={`badge ${r.type === 'Domestic' ? 'badge-blue' : 'badge-gray'}`}>
                      {r.type === 'Domestic' ? '🏠' : '🌍'} {r.type}
                    </span>
                    <span className="badge badge-danger">Rejected</span>
                  </div>
                </div>

                <div className="rejected-meta">
                  <span>📅 {r.dateFrom} → {r.dateTo}</span>
                  <span>📝 Submitted: {r.submitted}</span>
                  <span>💰 <strong>{r.amount}</strong></span>
                </div>

                <div className="rejection-reason">
                  <div className="rejection-reason-title">❌ Reason for Rejection</div>
                  <p>{r.reason}</p>
                </div>

                <div className="rejected-actions">
                  <button className="btn btn-secondary">View Details</button>
                  <button className="btn btn-primary">🔄 Resubmit Claim</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
