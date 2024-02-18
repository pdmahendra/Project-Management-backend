import mongoose, { Schema } from "mongoose";

const orgnizationSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    siteName: {
        type: String,
        required: true,
    },

    initialUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
    {
        timestamps: { createdAt: "createdAT", updatedAt: "updatedAt" }
    })



const orgnizationModel = mongoose.model('Orgnization',orgnizationSchema );

export default orgnizationModel;