import mongoose, { Schema } from 'mongoose'

const projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    // key: {
    //     type: String,
    //     // required: true,
    //     // unique: true
    // },
    description: {
        type: String,
        default: ''
    },
    lead: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        role: {
            type: String,
            enum: ['Project Lead', 'Developer', 'Tester', 'Scrum Master', 'Product Owner', 'Viewer'],
            required: true
        }
    }],
    organizationId: {
        type: Schema.Types.ObjectId,
        ref: 'Orgnization'
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: Date.now
    },
});

const Project = mongoose.model('Project', projectSchema);

export default Project



