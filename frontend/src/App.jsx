import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Register from './components/Register'
import Login from './components/Login'
import Admin_page from './components/Admin_page'
import Student_page from './components/Student_page'
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/admin" element={<ProtectedRoute role="admin"><Admin_page /></ProtectedRoute>} />
        <Route path="/student" element={<ProtectedRoute role="student"><Student_page /></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App
