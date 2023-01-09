import mongoose, { Schema, model, models } from 'mongoose';

const wishlist = new Schema({
  userEmail: String,
  products: []
});

const Wishlist = mongoose.model('Wishlist', wishlist) || model('Wishlist', wishlist);

export default Wishlist;
