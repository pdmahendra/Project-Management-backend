import Project from '../models/project.model.js';
import Orgnization from '../models/orgnization.model.js'

const projects = Project;
const organizations = Orgnization;

const createNewProject = async (req, res) => {
    const { name, description, lead, members, organizationId } = req.body;
    const leadUser = req.user._id;
    const { siteName } = req.params;
    console.log(siteName)
    const findOrg = await organizations.findOne({ siteName })
    console.log(findOrg)

    const userOrgId = req.user.organizationId;
    if (String(userOrgId) == String(findOrg._id)) {
        const project = await projects.create({
            name,
            description,
            lead: leadUser,
            members,
            organizationId: findOrg._id

        })
        return res.status(201).json({ message: `project created by ${leadUser} under ${findOrg._id}`, project: project })
    } else {
        return res.json({ message: `Unauthorized Access` })
    }
    // res.json({ message: `project created by ${leadUser} under ${findOrg._id}`, project: Project })

}

const getAllYourOrgProjectsBySiteName = async (req, res) => {
    const { siteName } = req.params;
    console.log(siteName)

    // Find the organization by siteName
    const findOrg = await organizations.findOne({ siteName });
    console.log(findOrg)

    if (!findOrg) {
        return res.status(404).json({ message: 'Organization not found' });
    }

    const userOrgId = req.user.organizationId;

    if (String(userOrgId) == String(findOrg._id)) {
        // Find all projects with the organizationId
        const allprojects = await projects.find({ organizationId: findOrg._id });

        return res.json({ allourprojects: allprojects });
    } else {
        return res.json({ message: `Unauthorized Access` })
    }
};

export { createNewProject, getAllYourOrgProjectsBySiteName }