import React, { useEffect, useState } from 'react'
import api from '../api/axios'

export default function Orders() {
  const [orders, setOrders] = useState([])
  useEffect(()=> {
    api.get('/orders/mine').then(r=>setOrders(r.data)).catch(()=>{})
  },[])
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">My Orders</h2>
      {orders.length===0 ? <div>No orders yet.</div> : (
        <div className="space-y-4">
          {orders.map(o=>(
            <div key={o._id} className="border p-3 rounded">
              <div className="flex justify-between">
                <div>Order: {o._id}</div>
                <div>{new Date(o.createdAt).toLocaleString()}</div>
              </div>
              <div className="mt-2">Total: ₹{o.totalPrice ?? o.total}</div>
              <div className="mt-2 text-sm text-gray-600">Status: {o.paymentStatus ?? (o.isPaid ? 'Paid' : 'Pending')}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
