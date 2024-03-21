import Epic from '../models/epic.model.js';
import Project from '../models/project.model.js';
// import User from '../models/user.model.js'
import Organization from '../models/orgnization.model.js'
import { ApiError } from '../utils/ApiError.js';



// siteName/projects/projectid/createEpic
const createEpic = async (req, res) => {
    const { siteName, id } = req.params
    const { project, epicName, summary, priority, assignee, reporter, description, status } = req.body;

    // console.log(siteName)
    // console.log(id)
    try {
        const organization = await Organization.findOne({ siteName });
        if (!organization) {
            return res.status(404).json("Organization not found")
        }
        const findProject = await Project.findOne({ _id: id });
        if (!findProject) {
            return res.status(404).json("Project not found")
        }

        //initialuser is org admin.
        if (String(req.user._id) !== String(organization.initialUser) || String(findProject.organizationId) !== String(organization._id)) {
            throw new ApiError(401, "Unauthorized Accesss")
        }

        const existingEpic = await Epic.findOne({ epicName, project: findProject._id });
        if (existingEpic) {
            throw new ApiError(400, "Epic with this name already exists in your project")
        }

        const createEpic = await Epic.create({
            project: findProject._id,
            epicName,
            summary,
            priority,
            assignee,
            reporter: req.user._id,
            description
        })

        await findProject.updateOne({
            $push: { epics: { epic: createEpic._id } }
        }, { new: true })

        return res.status(201).json({ message: `epic created by ${req.user._id} under ${organization._id} in ${findProject._id}`, createEpic });
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

// siteName/projectid/epic/epicId
const getEpicById = async (req, res) => {
    const { siteName, id, epicId } = req.params

    // console.log(siteName)
    // console.log(id)
    // console.log(epicId)
    try {
        const organization = await Organization.findOne({ siteName });
        if (!organization) {
            return res.status(404).json("Organization not found")
        }
        const findProject = await Project.findOne({ _id: id });
        if (!findProject) {
            return res.status(404).json("Project not found")
        }

        const epic = await Epic.findOne({ _id: epicId });
        if (!epic) {
            throw new ApiError(400, "Epic with this id not exists in your project")
        }

        //initialuser is org admin.
        if (String(req.user._id) !== String(organization.initialUser) || String(findProject.organizationId) !== String(organization._id)) {
            throw new ApiError(401, "Unauthorized Accesss")
        }

        return res.status(200).json({ message: "Successfully retrieved Epic", epic })
    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ message: error.message });
        } else {
            console.error(error)
            return res.status(500).json({ message: "Internal server error. Please try again later." })
        }
    }
};

// siteName/projectid/epic/updateEpic/epicId
const updateEpic = async (req, res) => {
    const { siteName, id, epicId } = req.params
    const { epicName, summary, priority, assignee, reporter, description } = req.body;

    try {
        const organization = await Organization.findOne({ siteName });
        if (!organization) {
            return res.status(404).json("Organization not found")
        }
        const findProject = await Project.findOne({ _id: id });
        if (!findProject) {
            return res.status(404).json("Project not found")
        }

        const epic = await Epic.findOne({ _id: epicId });
        if (!epic) {
            throw new ApiError(400, "Epic with this id not exists in your project")
        }

        if (String(req.user._id) !== String(organization.initialUser) || String(findProject.organizationId) !== String(organization._id)) {
            throw new ApiError(401, "Unauthorized Accesss")
        }

        const updateEpic = await Epic.findByIdAndUpdate(epicId, {
            epicName,
            summary,
            priority,
            assignee,
            reporter,
            description
        }, { new: true })

        return res.status(200).json({ message: "Successfully updated Epic", updatedepic: updateEpic });
    } catch (error) {
        if (condition) {
            return res.status(error.statusCode).json({ message: error.message })
        } else {
            console.error(error)
            return res.status(500).json({ message: "Internal server error. Please try again later." })
        }
    }
}

const deleteEpic = async (req, res) => {
    const { siteName, id, epicId } = req.params;
    const organization = await Organization.findOne({ siteName });
    try {
        if (!organization) {
            return res.status(404).json("Organization not found")
        }
        const findProject = await Project.findOne({ _id: id });
        if (!findProject) {
            return res.status(404).json("Project not found")
        }

        if (String(req.user._id) !== String(organization.initialUser) || String(findProject.organizationId) !== String(organization._id)) {
            throw new ApiError(401, "Unauthorized Accesss")
        }

        const epic = await Epic.findByIdAndDelete({ _id: epicId });
        if (!epic) {
            throw new ApiError(400, "Epic with this id not exists in your project")
        }

        await Project.updateOne(findProject, {
            $pull: { epics: { epic: epic._id } }
        }, { new: true })

        return res.json({ message: "Epic deleted successfully", epic })
    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ message: error.message })
        } else {
            console.error(error);
            return res.status(500).json({ message: "Internal server error. Please try again later." })
        }
    }
}


export { createEpic, getEpicById, updateEpic, deleteEpic }