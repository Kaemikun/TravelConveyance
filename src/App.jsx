import { useState } from 'react'
import LoginPage from './components/Login/LoginPage'
import Dashboard from './components/Dashboard/Dashboard'
import NewRequestFlow from './components/requests/NewRequestFlow'
import MyRequests from './components/requests/MyRequests'
import PendingRequests from './components/requests/PendingRequests'
import RejectedRequests from './components/requests/RejectedRequests'
import './App.css'

export default function App() {
  const [user, setUser] = useState(null)
  const [currentPage, setCurrentPage] = useState('dashboard')

  if (!user) {
    return <LoginPage onLogin={setUser} />
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'new-request':
        return <NewRequestFlow onBack={() => setCurrentPage('dashboard')} user={user} />
      case 'my-requests':
        return <MyRequests onBack={() => setCurrentPage('dashboard')} />
      case 'pending-requests':
        return <PendingRequests onBack={() => setCurrentPage('dashboard')} />
      case 'rejected-requests':
        return <RejectedRequests onBack={() => setCurrentPage('dashboard')} />
      default:
        return <Dashboard user={user} onNavigate={setCurrentPage} onLogout={() => setUser(null)} />
    }
  }

  return renderPage()
}
