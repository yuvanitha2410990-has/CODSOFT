import Order from "../models/Order.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createOrder = async (req, res) => {
  try {
    const { products, total, token } = req.body;

    const payment = await stripe.paymentIntents.create({
      amount: total * 100,
      currency: "usd",
      payment_method: token.id,
      confirm: true,
    });

    const order = new Order({
      userId: req.userId,
      products,
      total,
      paymentStatus: "Paid",
    });
    await order.save();

    res.json({ message: "Order placed successfully", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
