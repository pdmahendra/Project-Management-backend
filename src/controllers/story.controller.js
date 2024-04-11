import Epic from '../models/epic.model.js';
import Project from '../models/project.model.js';
import User from '../models/user.model.js'
import Organization from '../models/orgnization.model.js'
import Story from '../models/story.model.js';
import { ApiError } from '../utils/ApiError.js';




const createStory = async (req, res) => {
    const { siteName, id, epicId } = req.params
    const { storyName, summary, priority, assignee, reporter, description, status } = req.body;

    try {
        if (!storyName) {
            return res.status(400).json({ message: "storyName is required" })
        }

        const organization = await Organization.findOne({ siteName });
        if (!organization) {
            return res.status(404).json("Organization not found")
        }

        const findProject = await Project.findOne({ _id: id, organizationId: organization._id });
        if (!findProject) {
            return res.status(404).json("Project not found")
        }

        const findEpic = await Epic.findOne({ _id: epicId, project: findProject._id });
        if (!findEpic) {
            return res.status(404).json("Epic not found")
        }


        //only admin can create epic rn.
        if (String(req.user._id) !== String(organization.orgAdmin)) {
            throw new ApiError(401, "Unauthorized Accesss")
        }

        const existingStory = await Story.findOne({ storyName, epic: findEpic._id });
        if (existingStory) {
            throw new ApiError(400, "Story with this name already exists in your project")
        }

        if (assignee) {
            const assigneeUser = await User.findOne({ _id: assignee })
            if (!assigneeUser) {
                throw new ApiError(404, "assignee user is not registered")
            }
        }
        const createStory = await Story.create({
            epic: findEpic._id,
            storyName,
            summary,
            priority,
            assignee,
            reporter: req.user._id,
            description,
            status
        })

        await findEpic.updateOne({
            $push: { stories: { story: createStory._id } }
        }, { new: true })

        return res.status(201).json({ message: `story created by ${req.user._id} under ${organization._id} in ${findProject._id} in ${findEpic._id} this epic`, createStory });
    }
    catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ message: error.message })
        } else {
            console.error(error)
            return res.status(500).json({ message: "Internal server error. Please try again later." });

        }
    }
};

const getStoryById = async (req, res) => {
    const { siteName, id, epicId, storyId } = req.params;
    try {
        const organization = await Organization.findOne({ siteName });
        if (!organization) {
            throw new ApiError(404, "Organization not found")
        }
        const findProject = await Project.findOne({ _id: id });
        if (!findProject) {
            throw new ApiError(404, "Project not found")
        }

        if (String(req.user._id) !== String(organization.orgAdmin) || String(findProject.organizationId) !== String(organization._id)) {
            throw new ApiError(401, "Unauthorized Accesss")
        }

        const epic = await Epic.findOne({ _id: epicId });
        if (!epic) {
            throw new ApiError(400, "Epic with this id does not exists in your project")
        }

        const story = await Story.findOne({ _id: storyId });
        if (!storyId) {
            throw new ApiError(400, "Story with this id does not exists in your project's epic")
        }

        return res.status(200).json({ message: "Successfully retrieved Story", story })
    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ message: error.message });
        } else {
            console.error(error)
            return res.status(500).json({ message: "Internal server error. Please try again later." })
        }
    }
}

export { createStory, getStoryById }