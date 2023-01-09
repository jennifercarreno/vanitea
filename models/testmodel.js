import mongoose, { Schema, model, models } from 'mongoose';

const testSchema = new Schema({
  title: String,
  content: {
    type: String,
  
  },
  productId: String,
  productImage: String,
  productName: String,
  productBrand: String,
  userEmail: String,
  tags: []
});

const Test = mongoose.model('Test', testSchema) || model('Test', testSchema);

export default Test;
