import './RequestList.css'

const PENDING = [
  { id: 'TRV-2024-044', type: 'International', destination: 'Mumbai → Singapore', dateFrom: '2024-11-25', dateTo: '2024-11-30', amount: '₹1,24,300', submitted: 'Dec 01, 2024', stage: 'Manager Review' },
  { id: 'TRV-2024-046', type: 'Domestic', destination: 'Mumbai → Chennai', dateFrom: '2024-12-15', dateTo: '2024-12-16', amount: '₹9,400', submitted: 'Dec 17, 2024', stage: 'Finance Approval' },
  { id: 'TRV-2024-047', type: 'Domestic', destination: 'Delhi → Hyderabad', dateFrom: '2024-12-18', dateTo: '2024-12-19', amount: '₹7,200', submitted: 'Dec 20, 2024', stage: 'Document Review' },
]

const STAGE_MAP = {
  'Manager Review':   { cls: 'badge-warning', icon: '👤' },
  'Finance Approval': { cls: 'badge-blue',    icon: '💼' },
  'Document Review':  { cls: 'badge-gray',    icon: '📋' },
}

export default function PendingRequests({ onBack }) {
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
            <h1>⏳ Pending Requests</h1>
            <p>Claims awaiting approval from managers or finance</p>
          </div>
          <div className="reqlist-count">{PENDING.length} pending</div>
        </div>

        <div className="pending-cards">
          {PENDING.map(r => {
            const stage = STAGE_MAP[r.stage]
            return (
              <div key={r.id} className="card pending-card">
                <div className="pending-card-top">
                  <div>
                    <div className="pending-id">{r.id}</div>
                    <div className="pending-dest">{r.destination}</div>
                  </div>
                  <div>
                    <span className={`badge ${r.type === 'Domestic' ? 'badge-blue' : 'badge-gray'}`}>
                      {r.type === 'Domestic' ? '🏠' : '🌍'} {r.type}
                    </span>
                  </div>
                </div>
                <div className="pending-card-body">
                  <div className="pending-meta-row">
                    <span>📅 {r.dateFrom} → {r.dateTo}</span>
                    <span>📝 Submitted: {r.submitted}</span>
                    <span><strong>{r.amount}</strong></span>
                  </div>
                  <div className="pending-stage-row">
                    <span className="pending-stage-label">Current Stage:</span>
                    <span className={`badge ${stage.cls}`}>{stage.icon} {r.stage}</span>
                    <div className="pending-progress">
                      <div className={`progress-step ${r.stage === 'Document Review' || r.stage === 'Manager Review' || r.stage === 'Finance Approval' ? 'done' : ''}`}>Submitted</div>
                      <div className={`progress-arrow`}>→</div>
                      <div className={`progress-step ${r.stage === 'Manager Review' || r.stage === 'Finance Approval' ? 'active' : ''}`}>Manager</div>
                      <div className={`progress-arrow`}>→</div>
                      <div className={`progress-step ${r.stage === 'Finance Approval' ? 'active' : ''}`}>Finance</div>
                      <div className={`progress-arrow`}>→</div>
                      <div className="progress-step">Payment</div>
                    </div>
                  </div>
                </div>
                <div className="pending-card-actions">
                  <button className="btn btn-secondary">View Details</button>
                  <button className="btn btn-secondary">📎 Upload Missing Docs</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
