import userModel from "../models/user.model.js";
const users = userModel
const registerUser = async () => {
    const { fname, lname, email, password } = req.body

    const createUser = {
        fname,
        lname,
        email,
        password
    }
    return createUser
    // console.log(createUser)
} 

export {registerUser};