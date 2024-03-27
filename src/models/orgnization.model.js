import mongoose, { Schema } from "mongoose";

const organizationSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    siteName: {
        type: String,
        required: true,
    },

    orgAdmin: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
    {
        timestamps: { createdAt: "createdAT", updatedAt: "updatedAt" }
    })



const organizationModel = mongoose.model('Organization',organizationSchema );

export default organizationModel;