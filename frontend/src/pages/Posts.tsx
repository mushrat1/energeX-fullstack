import { useEffect, useState } from 'react'
import { api } from '../api'
import { Link } from 'react-router-dom'

type Post = { id: number; title: string; content: string; user_id: number; created_at?: string; user?: { name: string; email: string } }

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    api.get('/api/posts')
      .then(r => setPosts(r.data))
      .catch(() => setPosts([]))
  }, [])

  return (
    <div style={{
      background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)',
      borderRadius: 12,
      boxShadow: '0 2px 12px 0 rgba(80, 80, 180, 0.10)',
      padding: 32,
      maxWidth: 700,
      margin: '2rem auto',
    }}>
      <h2 style={{ color: '#6366f1', marginBottom: 18 }}>Posts</h2>
      {posts.map(p => (
        <article key={p.id} style={{
          border: '1px solid #c7d2fe',
          background: '#fff',
          padding: 18,
          borderRadius: 10,
          margin: '12px 0',
          boxShadow: '0 1px 6px 0 rgba(80, 80, 180, 0.06)'
        }}>
          <h3 style={{ margin: 0 }}>
            <Link to={`/posts/${p.id}`} style={{ color: '#06b6d4', textDecoration: 'underline', cursor: 'pointer' }}>{p.title}</Link>
          </h3>
          <p style={{ margin: '8px 0 0 0' }}>{p.content}</p>
          <small style={{ color: '#64748b' }}>by {p.user?.name ?? p.user_id} {p.created_at ? ` on ${new Date(p.created_at).toLocaleString()}` : ''}</small>
        </article>
      ))}
    </div>
  )
}
