import mongoose, { Schema } from "mongoose";

const storySchema = new Schema({

        epic: {
            type: Schema.Types.ObjectId,
            ref: 'Epic',
            required: true
        },
        storyName: {
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
            default: 'Highest'
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
        },
        status: {
            type: String,
            enum:['To Do', 'In Progress', 'Done'],
            default: 'To Do'
        }
        // attachment,sprint
    }, {
        timestamps: { createdAt: "createdAT", updatedAt: "updatedAt" }
    })

    const storyModel = mongoose.model('Story', storySchema);

    export default storyModel;