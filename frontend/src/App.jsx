import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './features/auth/Login'
import Signup from './features/auth/Signup'
import ProtectedRoute from './features/auth/ProtectedRoute'
import Layout from './components/Layout'
import Dashboard from './features/dashboard/Dashboard'
import Marketplace from './features/marketplace/Marketplace'
import CreateListing from './features/cars/CreateListing'
import CarDetails from './features/cars/CarDetails'
import CheckoutSuccess from './features/payments/CheckoutSuccess'
import CheckoutCancel from './features/payments/CheckoutCancel'

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
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/marketplace/:id" element={<CarDetails />} />
        
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="/checkout/cancel" element={<CheckoutCancel />} />
      </Route>
    </Routes>
  )
}

export default App
