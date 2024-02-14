import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
}, {
  timestamps: { createdAt: "createdAT", updatedAt: "updatedAt" }
})

const userModel = mongoose.model('User', userSchema);

export default userModel;