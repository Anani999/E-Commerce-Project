import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
 user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
 pincode: Number,
 state: String,
 district: String,
 area: String,
 house: String,
 phone: String,
});

addressSchema.index({ user: 1 });

const Address = mongoose.model('Address', addressSchema);

export default Address;
