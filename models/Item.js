import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  code: { type: String, default: "" },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  cost: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  minStock: { type: Number, default: 10 },
  unit: { type: String, default: "un" }
}, { 
  timestamps: true 
});

export default mongoose.model('Item', itemSchema);