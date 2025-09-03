import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'

export default function Navbar() {
  const cart = useSelector(s => s.cart)
  const auth = useSelector(s => s.auth)
  const dispatch = useDispatch()
  const count = cart.items.reduce((a,c)=>a+c.quantity,0)
  return (
    <nav className="bg-white shadow sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">MERN Shop</Link>
        <div className="flex items-center gap-4">
          <Link to="/products">Products</Link>
          <Link to="/cart" className="relative">
            Cart
            {count>0 && <span className="ml-2 px-2 py-0.5 bg-black text-white rounded-full text-xs">{count}</span>}
          </Link>
          {auth.user ? (
            <>
              <span className="text-sm">Hi, {auth.user.name || auth.user.email}</span>
              <button onClick={() => dispatch(logout())} className="text-sm underline">Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  )
}
