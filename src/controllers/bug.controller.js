import Bug from '../models/bugs.model.js'
import Story from '../models/story.model.js'
import User from '../models/user.model.js'
import Organization from '../models/orgnization.model.js'
import Project from '../models/project.model.js';
import Epic from '../models/epic.model.js';
import { ApiError } from '../utils/ApiError.js';



//org/project/epic/story/bug

const createBug = async (req, res) => {
    const { siteName, id, epicId, storyId } = req.params
    const { status, summary, description, assignee, reporter, storyPoint } = req.body;

    try {
        const organization = await Organization.findOne({ siteName });
        if (!organization) {
            throw new ApiError(404, "Organization not found")
        }

        const findProject = await Project.findOne({ _id: id, organizationId: organization._id });
        if (!findProject) {
            throw new ApiError(404, "Project not found")
        }

        //only admin can create bug rn.
        if (String(req.user._id) !== String(organization.orgAdmin)) {
            throw new ApiError(401, "Unauthorized Accesss")
        }

        const findEpic = await Epic.findOne({ _id: epicId, project: findProject._id });
        if (!findEpic) {
            throw new ApiError(404, "Epic not found")
        }


        const findStory = await Story.findOne({ _id: storyId, epic: findEpic._id })
        if (!findStory) {
            throw new ApiError(404, "Story not found")
        }

        if (assignee) {
            const assigneeUser = await User.findOne({ _id: assignee })
            if (!assigneeUser) {
                throw new ApiError(404, "assignee user is not registered")
            }
        }

        const createBug = await Bug.create({
            summary,
            assignee,
            reporter: req.user._id,
            description,
            status,
            storyPoint,
            linkedStories: findStory._id
        })

        await findStory.updateOne({
            $push: { bugs: { bug: createBug._id } }
        }, { new: true })

        return res.status(201).json({ message: `Bug created by ${req.user._id} in ${findStory._id} this epic`, createBug });
    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ message: error.message })
        } else {
            console.error(error)
            return res.status(500).json({ message: "Internal server error. Please try again later." });

        }
    }
};

export { createBug }