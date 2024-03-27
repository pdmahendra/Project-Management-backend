import Organization from "../models/orgnization.model.js";
import User from '../models/user.model.js'
import { ApiError } from "../utils/ApiError.js";

const organizations = Organization;

const createOrganization = async (req, res) => {
    const { name, siteName } = req.body;

    try {
        if (!(name && siteName)) {
            throw new ApiError(400, "All fields are required")
        }

        // Generate siteLink
        const siteLink = `${siteName}.atlassian.net`;

        const existingOrganization = await organizations.findOne({ name: name, siteName: siteLink });
        if (existingOrganization) {
            throw new ApiError(400,
                "An organization with the same name or siteName already exists. Please choose a different name or siteName."
            )
        }

        const createOrg = await organizations.create({
            name,
            siteName: siteLink,
            orgAdmin: req.user._id
        });

        await User.findByIdAndUpdate(req.user?._id, {
            role: 'admin',
        });

        if (!createOrg) {
            throw new ApiError(500, "An error occurred while creating the organization instance.")
        }

        return res.status(201).json({ message: `Organization Instance Created successfully by ${req.user._id}`, createOrg });
    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ message: error.message, errors: error.errors })
        } else {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
};

const getYourOrganizationById = async (req, res) => {
    const { id } = req.params
    try {
        const organization = await organizations.findOne({ _id: id });

        if (!organization) {
            throw new ApiError(404, "Organization not found")
        }

        if (String(req.user?._id) !== String(organization.orgAdmin)) {
            throw new ApiError(401, "Unauthorized Access")
        }
        return res.status(200).json({ organization: organization });

    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ message: error.message, error: error.errors })
        } else {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
};


export { createOrganization, getYourOrganizationById }