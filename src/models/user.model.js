import mongoose, { Schema } from "mongoose";
import bcrypt, { hash, compare } from 'bcrypt'

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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
  },
  role: {
    type: String,
    enum: ['User', 'admin'],
    default: 'User' // Default role for new users
  }
}, {
  timestamps: { createdAt: "createdAT", updatedAt: "updatedAt" }
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await hash(this.password, 10);
  next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
  return await compare(password, this.password)
}

const userModel = mongoose.model('User', userSchema);

export default userModel;

