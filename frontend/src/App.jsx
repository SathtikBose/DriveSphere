import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './features/auth/Login'
import Signup from './features/auth/Signup'
import ProtectedRoute from './features/auth/ProtectedRoute'
import Layout from './components/Layout'
import Dashboard from './features/dashboard/Dashboard'
import Marketplace from './features/marketplace/Marketplace'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login/*" element={<Login />} />
      <Route path="/signup/*" element={<Signup />} />
      
      {/* Protected Routes inside Layout */}
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/marketplace" element={<Marketplace />} />
        {/* Placeholder for Car Details */}
        <Route path="/marketplace/:id" element={<div className="p-8 text-white">Car Details (Phase 5)</div>} />
      </Route>
    </Routes>
  )
}

export default App
