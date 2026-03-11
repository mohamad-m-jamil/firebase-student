import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Register from './components/Register'
import Login from './components/Login'
import Admin_page from './components/Admin_page'
import Student_page from './components/Student_page'
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-center" />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route path="/admin" element={<ProtectedRoute role="admin"><Admin_page /></ProtectedRoute>} />
          <Route path="/student" element={<ProtectedRoute role="student"><Student_page /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
