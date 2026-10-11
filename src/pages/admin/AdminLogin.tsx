import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginAdmin } from '../../lib/api'
import './admin.css'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('alparslanbuyukkinaci@gmail.com')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await loginAdmin(email.trim(), password)
      navigate('/admin')
    } catch {
      setError('Giriş başarısız. E-posta veya şifre hatalı.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-shell admin-shell--login">
      <form className="admin-card" onSubmit={onSubmit}>
        <img src="/images/logo.png" alt="Labirynt Club" width={72} height={72} />
        <h1>Admin Panel</h1>
        <p>Labirynt Club menü yönetimi</p>
        <label>
          E-posta
          <input
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Şifre
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error ? <p className="admin-error">{error}</p> : null}
        <button type="submit" disabled={loading}>
          {loading ? 'Giriş...' : 'Giriş yap'}
        </button>
        <Link to="/" className="admin-back">
          ← Siteye dön
        </Link>
      </form>
    </div>
  )
}
