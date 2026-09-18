import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './features/auth/Login'
import Signup from './features/auth/Signup'
import ProtectedRoute from './features/auth/ProtectedRoute'

function DashboardPlaceholder() {
  return (
    <div className="min-h-screen bg-[#0A0D12] text-white p-8">
      <h1 className="text-3xl font-['Sora'] text-[#00E5FF]">Dashboard (Phase 2)</h1>
      <p className="mt-4 font-['Plus_Jakarta_Sans']">You are successfully authenticated!</p>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login/*" element={<Login />} />
      <Route path="/signup/*" element={<Signup />} />
      
      {/* Protected Routes */}
      <Route 
        path="/dashboard/*" 
        element={
          <ProtectedRoute>
            <DashboardPlaceholder />
          </ProtectedRoute>
        } 
      />
    </Routes>
  )
}

export default App
