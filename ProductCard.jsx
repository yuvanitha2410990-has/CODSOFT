import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({ p, onAdd }) {
  return (
    <div className="border rounded-2xl p-4 flex flex-col">
      <img src={p.image || '/placeholder.png'} alt={p.name} className="h-40 w-full object-cover rounded-xl" />
      <h3 className="mt-2 font-semibold">{p.name}</h3>
      <p className="text-sm text-gray-600 line-clamp-2">{p.description}</p>
      <div className="mt-auto flex items-center justify-between pt-3">
        <div className="font-bold">₹{p.price}</div>
        <div className="flex gap-2">
          <button onClick={() => onAdd(p)} className="px-3 py-1.5 rounded-full bg-black text-white">Add</button>
          <Link to={`/product/${p._id}`} className="px-2 py-1 border rounded">View</Link>
        </div>
      </div>
    </div>
  )
}
