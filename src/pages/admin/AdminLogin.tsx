import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginAdmin } from '../../lib/api'
import './admin.css'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
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
      setError('E-posta veya şifre hatalı.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login">
      <form className="login-box" onSubmit={onSubmit}>
        <img src="/images/logo.png" alt="Labirynt Club" width={56} height={56} />
        <h1>Admin</h1>
        <p>Labirynt Club</p>

        <label className="field">
          E-posta
          <input
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="field">
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

        <button type="submit" className="btn-save" disabled={loading}>
          {loading ? 'Giriş...' : 'Giriş yap'}
        </button>
        <Link to="/" className="login-back">
          Siteye dön
        </Link>
      </form>
    </div>
  )
}
