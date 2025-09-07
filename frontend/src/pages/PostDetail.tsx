import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';

type Post = {
  id: number;
  title: string;
  content: string;
  user_id: number;
  created_at?: string;
  user?: { name: string; email: string };
};

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get(`/api/posts/${id}`)
      .then(r => setPost(r.data))
      .catch(() => setError('Post not found'));
  }, [id]);

  if (error) return <div style={{ color: '#f43f5e', textAlign: 'center', marginTop: 40 }}>{error}</div>;
  if (!post) return <div style={{ textAlign: 'center', marginTop: 40 }}>Loading...</div>;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
      borderRadius: 12,
      boxShadow: '0 2px 12px 0 rgba(80, 80, 180, 0.10)',
      padding: 32,
      maxWidth: 600,
      margin: '2rem auto',
    }}>
      <h2 style={{ color: '#06b6d4', marginBottom: 8 }}>{post.title}</h2>
      <p style={{ fontSize: 18 }}>{post.content}</p>
      <div style={{ color: '#64748b', marginTop: 16 }}>
        by {post.user?.name ?? post.user_id}
        {post.created_at ? ` on ${new Date(post.created_at).toLocaleString()}` : ''}
      </div>
      <div style={{ marginTop: 24 }}>
        <Link to="/" style={{ color: '#6366f1', textDecoration: 'underline' }}>← Back to Posts</Link>
      </div>
    </div>
  );
}
