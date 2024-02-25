import Orgnization from "../models/orgnization.model.js";
import User from '../models/user.model.js'

const organizations = Orgnization;

const createOrganization = async (req, res) => {
    const { name, siteName } = req.body;
    // console.log(siteName)
    const initialUser = req.user._id
    // console.log(initialUser)

    //check all fields are not empty
    if (!name || !siteName) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    //generate link 
    const siteLink = `${siteName}.atlassian.net`;

    //check siteName already exist or not if exist throw error already exist.
    const existedLink = await organizations.findOne({ siteName: siteLink })
    const existedName = await organizations.findOne({ name })
    if (existedLink || existedName) {
        return res.status(400).json({ message: `Orgnization with same instance existed` })
    }

    //all well create org instance do every task of project of this org in its sitelink url.
    const createOrg = await organizations.create({
        name,
        siteName: siteLink,
        initialUser
    })


    // let userRole = req.user.role


    // await User.findByIdAndUpdate(initialUser, { role: 'admin', organizationSiteLink: siteLink });
    await User.findByIdAndUpdate(initialUser, {
        role: 'admin',
        // organizationSiteLink: siteLink
        organizationId: createOrg._id
    });
    // console.log(newRole)
    // console.log(req.user.role)
    // req.user.role = 'admin'
    // await User.findByIdAndUpdate(initialUser, { role: 'admin' });

    if (!createOrg) {
        res.status(500).json({ message: "Something went wrong while creating orgnization instance" })
    }
    return res.status(201).json({ message: `Orgnization Instance Created successfully by ${initialUser}`, createOrg })

};

const getOrgnizaitonBySiteLink = async(req, res) => {
// const {siteName} = req.body;
const { siteName } = req.params;
console.log(siteName)
const findOrg = await organizations.findOne({siteName})
console.log(findOrg)

if(findOrg){
    res.json({orgnization : findOrg})
}else{
    res.json("something went wrong")
}
}




export { createOrganization,getOrgnizaitonBySiteLink }