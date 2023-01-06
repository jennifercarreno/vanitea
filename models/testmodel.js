import { Schema, model, models } from 'mongoose';

const testSchema = new Schema({
  title: String,
  content: {
    type: String,
  
  },
  productId: String
});

const Test = models.Test || model('Test', testSchema);

export default Test;
