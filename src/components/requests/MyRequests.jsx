import './RequestList.css'

const REQUESTS = [
  { id: 'TRV-2024-045', type: 'Domestic', destination: 'Mumbai → Delhi', dateFrom: '2024-12-08', dateTo: '2024-12-10', amount: '₹18,500', status: 'approved', submitted: 'Dec 11, 2024' },
  { id: 'TRV-2024-044', type: 'International', destination: 'Mumbai → Singapore', dateFrom: '2024-11-25', dateTo: '2024-11-30', amount: '₹1,24,300', status: 'pending', submitted: 'Dec 01, 2024' },
  { id: 'TRV-2024-043', type: 'Domestic', destination: 'Mumbai → Bangalore', dateFrom: '2024-11-13', dateTo: '2024-11-15', amount: '₹12,200', status: 'rejected', submitted: 'Nov 16, 2024' },
  { id: 'TRV-2024-040', type: 'Domestic', destination: 'Mumbai → Pune', dateFrom: '2024-10-20', dateTo: '2024-10-21', amount: '₹4,800', status: 'approved', submitted: 'Oct 22, 2024' },
  { id: 'TRV-2024-038', type: 'International', destination: 'Mumbai → Dubai', dateFrom: '2024-10-05', dateTo: '2024-10-08', amount: '₹88,600', status: 'approved', submitted: 'Oct 10, 2024' },
]

const STATUS_MAP = {
  approved: { cls: 'badge-success', label: 'Approved' },
  pending:  { cls: 'badge-warning', label: 'Pending' },
  rejected: { cls: 'badge-danger',  label: 'Rejected' },
}

export default function MyRequests({ onBack }) {
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
            <h1>📂 My Requests</h1>
            <p>All your travel reimbursement submissions</p>
          </div>
          <div className="reqlist-count">{REQUESTS.length} total requests</div>
        </div>

        <div className="card reqlist-table-wrap">
          <table className="req-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Type</th>
                <th>Destination</th>
                <th>Travel Dates</th>
                <th>Submitted</th>
                <th>Amount</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {REQUESTS.map(r => (
                <tr key={r.id}>
                  <td><span className="req-id">{r.id}</span></td>
                  <td>
                    <span className={`badge ${r.type === 'Domestic' ? 'badge-blue' : 'badge-gray'}`}>
                      {r.type === 'Domestic' ? '🏠' : '🌍'} {r.type}
                    </span>
                  </td>
                  <td>{r.destination}</td>
                  <td className="req-dates">{r.dateFrom} → {r.dateTo}</td>
                  <td>{r.submitted}</td>
                  <td><strong>{r.amount}</strong></td>
                  <td>
                    <span className={`badge ${STATUS_MAP[r.status].cls}`}>
                      {STATUS_MAP[r.status].label}
                    </span>
                  </td>
                  <td><button className="req-view-btn">View →</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
