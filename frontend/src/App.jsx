import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './features/auth/Login'
import Signup from './features/auth/Signup'
import ProtectedRoute from './features/auth/ProtectedRoute'
import Dashboard from './features/dashboard/Dashboard'

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
            <Dashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  )
}

export default App
