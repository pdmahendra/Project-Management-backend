import mongoose, { Schema } from 'mongoose'

const epicSchema = new Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    epicName: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ['Highest', 'High', 'Medium', 'Low', 'Lowest'],
        default: roles.client
    },
    assignee: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reporter: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    description: {
        type: String,
        required: true
    }
    // attachment,sprint
}, {
    timestamps: { createdAt: "createdAT", updatedAt: "updatedAt" }
})

const epicModel = mongoose.model('Epic', epicSchema);

export default epicModel;

