import { useState } from 'react'
import { api } from '../api'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const nav = useNavigate()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Register submit:', { name, email, password })
    try {
      const response = await api.post('/api/register', { name, email, password })
      console.log('Register success:', response.data)
      nav('/login')
    } catch (err: any) {
      console.error('Register error:', err)
      setError(err?.response?.data?.message || 'Register failed')
    }
  }

  return (
    <form onSubmit={submit} style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
      borderRadius: 12,
      boxShadow: '0 2px 12px 0 rgba(80, 80, 180, 0.10)',
      padding: 32,
      maxWidth: 400,
      margin: '2rem auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }}>
      <h2 style={{ color: '#06b6d4', marginBottom: 8 }}>Register</h2>
      {error && <p style={{ color: '#f43f5e', fontWeight: 500 }}>{error}</p>}
      <input
        placeholder="name"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        style={{ padding: 10, borderRadius: 6, border: '1px solid #c7d2fe', fontSize: 16 }}
      />
      <input
        placeholder="email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        style={{ padding: 10, borderRadius: 6, border: '1px solid #c7d2fe', fontSize: 16 }}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        style={{ padding: 10, borderRadius: 6, border: '1px solid #c7d2fe', fontSize: 16 }}
      />
      <button type="submit" style={{
        background: 'linear-gradient(90deg, #06b6d4 0%, #6366f1 100%)',
        color: '#fff',
        border: 'none',
        borderRadius: 6,
        padding: '10px 0',
        fontWeight: 600,
        fontSize: 16,
        cursor: 'pointer',
        marginTop: 8
      }}>Create account</button>
    </form>
  )
}
