import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: String,
  products: [
    {
      productId: String,
      quantity: Number,
    },
  ],
  total: Number,
  paymentStatus: String,
});

export default mongoose.model("Order", orderSchema);
