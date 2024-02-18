import Orgnization from "../models/orgnization.model.js";

const organizations = Orgnization;

const createOrganization = async (req, res) => {
    const { name, siteName } = req.body;
    // console.log(siteName)

    const initialUser = req.user._id
    // console.log(initialUser)

    // const existingOrganization = await Organization.findOne({ siteLink: siteName });
    // if (existingOrganization) {
    //     return res.status(400).json({ message: 'Organization with the same site link already exists' });
    // }

    const siteLink = `localhost:3000/${siteName}.atlassian.net`;

    const createOrg = await organizations.create({
        name,
        siteName : siteLink,
        initialUser
    })
    return res.status(201).json({ message: `Orgnization Instance Created successfully by ${initialUser}`, createOrg })


    // const initialUse)r = req.user._id;

    // const siteLink = `localhost:3000/${siteName}.atlassian.net`;
    // // Check if an organization with the same siteLink already exists
    // // const existingOrganization = await Organization.findOne({ siteLink: siteName });
    // // if (existingOrganization) {
    // //     return res.status(400).json({ message: 'Organization with the same site link already exists' });
    // // }

    // // const siteLink = `localhost:3000/${siteName}.${process.env.ATLASIAN_DOMAIN}`

    // const createOrg = await organizations.create({
    //     name,
    //     siteLink,
    //     initialUser
    // })
    // return res.status(201).json({ message: `Orgnization Instance Created successfully by ${initialUser}`, createOrg })

};




export { createOrganization }