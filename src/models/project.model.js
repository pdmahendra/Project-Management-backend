import mongoose, { Schema } from 'mongoose'

const projectSchema = new Schema({
    projectName: {
        type: String,
        required: true,
        unique: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps: { createdAt: "createdAT", updatedAt: "updatedAt" }
})


const projectModel = mongoose.model('Project', projectSchema);

export default projectModel;

