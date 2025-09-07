import { useState } from 'react'
import { api, setToken } from '../api'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const nav = useNavigate()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data } = await api.post('/api/login', { email, password })
      localStorage.setItem('token', data.token)
      setToken(data.token)
      nav('/')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed')
    }
  }

  return (
    <form onSubmit={submit} style={{
      background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)',
      borderRadius: 12,
      boxShadow: '0 2px 12px 0 rgba(80, 80, 180, 0.10)',
      padding: 32,
      maxWidth: 400,
      margin: '2rem auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }}>
      <h2 style={{ color: '#6366f1', marginBottom: 8 }}>Login</h2>
      {error && <p style={{ color: '#f43f5e', fontWeight: 500 }}>{error}</p>}
      <input placeholder="email" value={email} onChange={e => setEmail(e.target.value)} style={{ padding: 10, borderRadius: 6, border: '1px solid #c7d2fe', fontSize: 16 }} />
      <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} style={{ padding: 10, borderRadius: 6, border: '1px solid #c7d2fe', fontSize: 16 }} />
      <button type="submit" style={{
        background: 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)',
        color: '#fff',
        border: 'none',
        borderRadius: 6,
        padding: '10px 0',
        fontWeight: 600,
        fontSize: 16,
        cursor: 'pointer',
        marginTop: 8
      }}>Login</button>
    </form>
  )
}
