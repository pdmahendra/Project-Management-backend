import Orgnization from "../models/orgnization.model.js";
import User from '../models/user.model.js'

const organizations = Orgnization;

const createOrganization = async (req, res) => {
    const { name, siteName } = req.body;

    try {
        // Validate input
        if (!(name && siteName)){
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Generate siteLink
        const siteLink = `${siteName}.atlassian.net`;

        // Check if organization with the same name or siteName exists
        const existingOrganization = await organizations.findOne({ $or: [{ name }, { siteName: siteLink }] });
        if (existingOrganization) {
            return res.status(400).json({ message: 'Organization with the same name or siteName already exists' });
        }

        // Create organization
        const initialUser = req.user._id;
        const createOrg = await organizations.create({
            name,
            siteName: siteLink,
            initialUser
        });

        // Update initial user's role to admin and set organizationId
        await User.findByIdAndUpdate(initialUser, {
            role: 'admin',
            organizationId: createOrg._id
        });

        if (!createOrg) {
            return res.status(500).json({ message: 'Something went wrong while creating organization instance' });
        }

        return res.status(201).json({ message: `Organization Instance Created successfully by ${initialUser}`, createOrg });
    } catch (error) {
        console.error('Error creating organization:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const getYourOrgnization = async (req, res) => {
    try {
        const userOrgId = req.user.organizationId;
        const findOrg = await organizations.findOne({ _id: userOrgId });

        if (!findOrg) {
            return res.status(404).json({ message: 'Organization not found' });
        }

        if (String(userOrgId) === String(findOrg._id)) {
            return res.status(200).json({ organization: findOrg });
        } else {
            return res.status(401).json({ message: 'Unauthorized Access' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};





export { createOrganization, getYourOrgnization }