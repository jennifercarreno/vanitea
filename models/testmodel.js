import mongoose, { Schema, model, models } from 'mongoose';

const testSchema = new Schema({
  title: String,
  content: {
    type: String,
  
  },
  productId: String,
  userEmail: String
});

const Test = mongoose.model('Test', testSchema) || model('Test', testSchema);

export default Test;
