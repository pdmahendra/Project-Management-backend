import Project from '../models/project.model.js';
import Organization from '../models/orgnization.model.js'
import User from '../models/user.model.js'
import { ApiError } from '../utils/ApiError.js';

const projects = Project;
const organizations = Organization;

const createNewProject = async (req, res) => {
    const { name, description, members } = req.body; //name must,  Other details can be added later (functionality is pending).
    const { siteName } = req.params;
    const leadUser = req.user._id; //leadUser is the admin right now as he is creating project. this functionality is temporary.

    try {
        if (!name) {
            throw new ApiError(400, "Project name is required");
        }

        const organization = await organizations.findOne({ siteName });
        if (!organization) {
            throw new ApiError(404, "Organization not found")
        }

        if (String(req.user._id) !== String(organization.orgAdmin)) {
            throw new ApiError(401, "Unauthorized Access")
        }

        const existingProject = await projects.findOne({ name, organizationId: organization._id });
        if (existingProject) {
            throw new ApiError(400, "Project with this name already exists in your organization")
        }

        //only orgAdmin can make project.
        const project = await projects.create({
            name,
            description,
            lead: leadUser,
            members,
            organizationId: organization._id
        });

        return res.status(201).json({ message: `Project created by ${leadUser} under ${organization._id}`, project });

    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ message: error.message, errors: error.error })
        } else {
            console.error(error);
            return res.status(500).json({ message: "Internal server error. Please try again later." });
        }
    }
};

const getAllYourOrgProjectsBySiteName = async (req, res) => {
    const { siteName } = req.params;

    try {
        const organization = await organizations.findOne({ siteName });
        if (!organization) {
            throw new ApiError(404, "Organization not found")
        }

        if (String(req.user._id) !== String(organization.orgAdmin)) {
            throw new ApiError(401, "Unauthorized Access.")
        }

        const allProjects = await projects.find({ organizationId: organization._id }).select("-epics");

        return res.status(200).json({ message: "Successfully retrieved all projects for your organization.", allProjects });
    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ message: error.message, errors: error.errors })
        } else {
            console.error(error);
            return res.status(500).json({ message: "Internal server error. Please try again later." });
        }
    }
};

const getSingleProject = async (req, res) => {
    const { siteName, id } = req.params;

    try {
        const organization = await organizations.findOne({ siteName });
        if (!organization) {
            throw new ApiError(404, "Organization not found")
        }

        const project = await projects.findById(id).select("-epics")
        if (!project) {
            throw new ApiError(404, "Project not found")
        }

        //member can access Single project
        const members = project.members
        let isMember = false;
        for (let member of members) {
            if (String(member.user) === String(req.user._id)) {
                // console.log("member user and req user id matches")
                isMember = true;
                break;
            }
        }

        if (!isMember && String(req.user._id) !== String(organization.orgAdmin) || String(project.organizationId) !== String(organization._id)) {
            throw new ApiError(401, "Unauthorized Access. checking here")
        }

        return res.status(200).json({ message: "Successfully retrieved project", project })
    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ message: error.message, errors: error.errors })
        } else {
            console.error(error)
            return res.status(500).json({ message: "Internal server error. Please try again later." });
        }
    }
};

const updateProject = async (req, res) => {
    const { name, description, lead, members } = req.body;
    const { siteName, id } = req.params;

    try {
        const organization = await organizations.findOne({ siteName });
        if (!organization) {
            throw new ApiError(404, "Organization not found");
        }

        if (String(req.user._id) !== String(organization.orgAdmin)) {
            throw new ApiError(401, "Unauthorized Access.");
        }

        const findProject = await projects.findOne({ _id: id, organizationId: organization._id });
        if (!findProject) {
            throw new ApiError(404, "Project not found");
        }

        if (lead) {
            const leadUserExists = await User.findById(lead)
            if (!leadUserExists) {
                throw new ApiError(404, "Lead user not found"); //tell them to register first.
            }
        }

        if (members) {
            for (let member of members) {
                let findUser = await User.findById(member.user);
                if (!findUser) {
                    throw new ApiError(404, "member not found"); //tell them to register first.
                }
                // role validation is pending.
            }
        }

        const updatedProject = await projects.updateOne({ _id: findProject },
            {
                $set: { name, description, lead, members }
            },
            { new: true }
        ).select("-epics");

        if (!updatedProject) {
            throw new ApiError(404, "Project not found");
        }

        return res.status(200).json({ message: "Successfully updated project", project: updatedProject });
    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ message: error.message, errors: error.errors })
        } else {
            console.error(error)
            return res.status(500).json({ message: "Internal server error. Please try again later." });
        }
    }

};


// epics related to project should be delete after deleting project
const deleteProject = async (req, res) => {
    const { siteName, id } = req.params;

    const organization = await organizations.findOne({ siteName })
    if (!organization) {
        return res.json({ message: "organization not found" })
    }

    if (String(req.user._id) !== String(organization.orgAdmin)) {
        return res.status(401).json({ message: "Unauthorized Access" });
    }

    const project = await projects.findOneAndDelete({ _id: id, organizationId: organization._id });
    if (!project) {
        return res.status(404).json({ message: "Project not found" });
    }

    return res.json({ message: "project deleted successfully", project })
}

export {
    createNewProject,
    getAllYourOrgProjectsBySiteName,
    getSingleProject,
    updateProject,
    deleteProject
}