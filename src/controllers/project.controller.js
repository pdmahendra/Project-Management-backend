import Project from '../models/project.model.js';
import Orgnization from '../models/orgnization.model.js'

const projects = Project;
const organizations = Orgnization;

const createNewProject = async (req, res) => {
    const { name, description, lead, members } = req.body;
    const leadUser = req.user._id;
    const { siteName } = req.params;

    try {
        const organization = await organizations.findOne({ siteName });

        if (!organization) {
            return res.status(401).json({ message: 'Unauthorized Access' });
        }

        const existingProject = await projects.findOne({ name, organizationId: organization._id });

        if (existingProject) {
            return res.status(400).json({ message: 'Project with this name already exists in your instance' });
        }

        const project = await projects.create({
            name,
            description,
            lead: leadUser,
            members,
            organizationId: organization._id
        });

        return res.status(201).json({ message: `Project created by ${leadUser} under ${organization._id}`, project });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong while creating the project' });
    }
};

const getAllYourOrgProjectsBySiteName = async (req, res) => {
    const { siteName } = req.params;

    try {
        const organization = await organizations.findOne({ siteName });

        if (!organization) {
            return res.status(404).json({ message: 'Organization not found' });
        }

        const userOrgId = req.user.organizationId;

        if (String(userOrgId) !== String(organization._id)) {
            return res.status(401).json({ message: 'Unauthorized Access: You are not authorized to access this organization.' });
        }

        const allProjects = await projects.find({ organizationId: organization._id });

        return res.status(200).json({ message: 'Successfully retrieved all projects for your organization.', allProjects });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error. Please try again later.' });
    }
};


export { createNewProject, getAllYourOrgProjectsBySiteName }