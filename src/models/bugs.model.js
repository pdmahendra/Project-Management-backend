
import mongoose, { Schema } from "mongoose";


const bugSchema = new Schema({

    status: {
        type: String,
        enum: ['To Do', 'In Progress', 'Done'],
        default: 'To Do'
    },
    summary: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    assignee: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reporter: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    // sprint: {
    //     type: Schema.Types.ObjectId,
    //     ref: Sprint
    // },
    storyPoint: {
        type: Number
    },
    linkedStories: {
        type: Schema.Types.ObjectId,
        ref: 'Story'
    },
    linkedTasks: {
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }
}, {
    timestamps: { createdAt: "createdAT", updatedAt: "updatedAt" }
})


const bugModel = mongoose.model('Bug', bugSchema);

export default storyModel;


