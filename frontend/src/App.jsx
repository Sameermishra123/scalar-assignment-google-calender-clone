import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Calendar from './components/Calendar/Calendar'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { useTheme } from './contexts/ThemeContext'
import './App.css'

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />
}

function AppRoutes() {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
      <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Calendar />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

function App() {
  const { theme } = useTheme();

  return (
    <div className={`${theme}`}>
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
