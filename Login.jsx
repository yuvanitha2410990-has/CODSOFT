import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email,setEmail] = useState(''), [password,setPassword] = useState('')
  const dispatch = useDispatch()
  const nav = useNavigate()

  async function submit(e) {
    e.preventDefault()
    try {
      await dispatch(login({ email, password })).unwrap()
      nav('/')
    } catch (err) {
      alert(err.message || 'Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full border px-3 py-2 rounded" />
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full border px-3 py-2 rounded" />
        <button className="px-4 py-2 bg-black text-white rounded">Login</button>
      </form>
    </div>
  )
}
