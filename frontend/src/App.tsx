import { useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Posts from './pages/Posts'
import NewPost from './pages/NewPost'
import PostDetail from './pages/PostDetail'
import { setToken } from './api'

export default function App() {
  const nav = useNavigate()
  const token = localStorage.getItem('token')
  useEffect(() => {
    setToken(token)
  }, [token])

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    nav('/login')
  }

  return (
    <div style={{
      maxWidth: 800,
      margin: '2rem auto',
      fontFamily: 'system-ui, sans-serif',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
      borderRadius: 16,
      boxShadow: '0 4px 24px 0 rgba(80, 80, 180, 0.10)',
      padding: 32,
      minHeight: '90vh',
    }}>
      <nav style={{
        display: 'flex',
        gap: 16,
        marginBottom: 24,
        background: 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)',
        borderRadius: 8,
        padding: '12px 24px',
        alignItems: 'center',
        boxShadow: '0 2px 8px 0 rgba(80, 80, 180, 0.08)'
      }}>
        <Link to="/" style={{ color: '#fff', fontWeight: 600, textDecoration: 'none' }}>Posts</Link>
        <Link to="/new" style={{ color: '#fff', fontWeight: 600, textDecoration: 'none' }}>New Post</Link>
        {!token && <Link to="/login" style={{ color: '#fff', fontWeight: 600, textDecoration: 'none' }}>Login</Link>}
        {!token && <Link to="/register" style={{ color: '#fff', fontWeight: 600, textDecoration: 'none' }}>Register</Link>}
        {token && <button onClick={logout} style={{
          marginLeft: 'auto',
          background: 'linear-gradient(90deg, #f43f5e 0%, #f59e42 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          padding: '8px 18px',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 1px 4px 0 rgba(244,63,94,0.10)'
        }}>Logout</button>}
      </nav>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/new" element={<NewPost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts/:id" element={<PostDetail />} />
      </Routes>
    </div>
  )
}
