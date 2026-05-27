import mongoose from 'mongoose'

const sessionSchema = new mongoose.Schema({
 token: {
  type: String,
  required: true,
  unique: true
 },
 account: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
 },
 client_id: {
  type: String,
  unique: true
 },
 user_agent: {
  type: String,
  required: true
 },
 location: {
  country: {type: String},
  timezone: {type: String}
 },
 status: {
  type: String,
  enum: [ 'active', 'revoked'],
  default: 'active'
 }
}, {timestamps: true});

const Session = mongoose.model('Session', sessionSchema);

export default Session;
