import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../features/products/productsSlice'
import ProductCard from '../components/ProductCard'
import { addItem } from '../features/cart/cartSlice'

export default function ProductList() {
  const dispatch = useDispatch()
  const { items, status } = useSelector(s => s.products)
  const [q, setQ] = useState('')

  useEffect(() => {
    dispatch(fetchProducts(q ? `?search=${q}` : ''))
  }, [dispatch, q])

  function onAdd(p) {
    dispatch(addItem({ productId: p._id, name: p.name, price: p.price, quantity: 1 }))
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center gap-2 mb-4">
        <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search..." className="border px-3 py-2 rounded w-full"/>
      </div>
      {status === 'loading' && <div>Loading...</div>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map(p => <ProductCard key={p._id} p={p} onAdd={onAdd} />)}
      </div>
    </div>
  )
}
