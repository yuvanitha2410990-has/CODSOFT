import React, { useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import api from '../api/axios'
import { clearCart } from '../features/cart/cartSlice'
import { useNavigate } from 'react-router-dom'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

function CheckoutForm() {
  const cart = useSelector(s => s.cart)
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const nav = useNavigate()

  const total = cart.items.reduce((a,c)=>a + c.price*c.quantity, 0)

  async function handlePay(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    if (!stripe || !elements) return

    // create payment method
    const card = elements.getElement(CardElement)
    const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    })
    if (pmError) {
      setError(pmError.message)
      setLoading(false)
      return
    }

    // send to backend to create payment intent and order
    try {
      const payload = {
        products: cart.items.map(i=>({ productId: i.productId, quantity: i.quantity })),
        total,
        token: paymentMethod,
      }
      const res = await api.post('/orders', payload) // backend: /api/orders
      // success
      dispatch(clearCart())
      nav('/orders')
    } catch (err) {
      setError(err.response?.data?.error || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handlePay} className="max-w-2xl mx-auto p-4 border rounded space-y-4">
      <h2 className="text-xl font-bold">Payment</h2>
      <div className="p-3 border rounded">
        <CardElement options={{ hidePostalCode: true }} />
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex justify-between items-center">
        <div className="font-bold">Amount: ₹{total}</div>
        <button disabled={!stripe || loading} className="px-4 py-2 bg-black text-white rounded">
          {loading ? 'Processing...' : 'Pay now'}
        </button>
      </div>
    </form>
  )
}

export default function Checkout() {
  const options = useMemo(()=>({}),[])
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  )
}
