import mongoose, { Schema, model, models } from 'mongoose';

const testSchema = new Schema({
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

const Test = models.Test || model('Test', testSchema);

export default Test;
