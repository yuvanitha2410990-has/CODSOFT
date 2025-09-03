import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios'
import { useDispatch } from 'react-redux'
import { addItem } from '../features/cart/cartSlice'

export default function ProductDetail() {
  const { id } = useParams()
  const [p, setP] = useState(null)
  const dispatch = useDispatch()

  useEffect(()=> {
    api.get(`/products/${id}`).then(r=>setP(r.data)).catch(()=>{})
  }, [id])

  if (!p) return <div className="p-4">Loading...</div>
  return (
    <div className="max-w-4xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      <img src={p.image || '/placeholder.png'} alt={p.name} className="w-full h-96 object-cover rounded"/>
      <div>
        <h1 className="text-2xl font-bold">{p.name}</h1>
        <p className="mt-2 text-gray-700">{p.description}</p>
        <div className="mt-4 text-xl font-bold">₹{p.price}</div>
        <button onClick={()=>dispatch(addItem({ productId: p._id, name: p.name, price: p.price, quantity:1 }))} className="mt-4 px-4 py-2 bg-black text-white rounded">Add to cart</button>
      </div>
    </div>
  )
}
