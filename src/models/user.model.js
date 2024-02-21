import mongoose, { Schema } from "mongoose";

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
    enum: ['User', 'admin', 'developer', 'tester', 'scrumMaster', 'projectOwner'],
    default: 'User' // Default role for new users
  },
  organizationId: {
    type: Schema.Types.ObjectId,
    ref: 'Orgnization'
  }


  // Verify your email address - youc can verify by otp or by sending a link on email to click to verify.
}, {
  timestamps: { createdAt: "createdAT", updatedAt: "updatedAt" }
})



const userModel = mongoose.model('User', userSchema);

export default userModel;


//objects to be added
// Choose a site name
// Verify your email address - youc can verify by otp or by sending a link on email to click to verify.






//site diya to instance create krdo.
// ek company ka site name hoga us project me agr kisiko add kiya jo us site name k ander hai to vo site name k through access kr skta hai user.