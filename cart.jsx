import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeItem, updateQty } from '../features/cart/cartSlice'
import { Link, useNavigate } from 'react-router-dom'

export default function Cart() {
  const cart = useSelector(s => s.cart)
  const dispatch = useDispatch()
  const nav = useNavigate()
  const total = cart.items.reduce((a,c)=>a + c.price*c.quantity, 0)

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
      {cart.items.length===0 ? (
        <div>Your cart is empty. <Link to="/products" className="underline">Shop now</Link></div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.items.map(i => (
              <div key={i.productId} className="flex items-center justify-between border p-3 rounded">
                <div>
                  <div className="font-semibold">{i.name}</div>
                  <div className="text-sm text-gray-600">₹{i.price}</div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="number" min="1" value={i.quantity} onChange={(e)=>dispatch(updateQty({productId:i.productId, quantity: Number(e.target.value)}))} className="w-20 border px-2 py-1 rounded" />
                  <button onClick={()=>dispatch(removeItem(i.productId))} className="px-3 py-1 border rounded">Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="text-lg font-bold">Total: ₹{total}</div>
            <button onClick={()=>nav('/checkout')} className="px-4 py-2 bg-black text-white rounded">Checkout</button>
          </div>
        </>
      )}
    </div>
  )
}
