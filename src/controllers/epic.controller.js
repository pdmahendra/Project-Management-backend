import Epic from '../models/epic.model.js';
import Project from '../models/project.model.js';
// import User from '../models/user.model.js'
import Organization from '../models/orgnization.model.js'
import { ApiError } from '../utils/ApiError.js';



// siteName/projects/projectid/createEpic
const createEpic = async (req, res) => {
    const { siteName, id } = req.params
    const { project, epicName, summary, priority, assignee, reporter, description } = req.body;

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

export { createEpic }