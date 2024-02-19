import User from '../models/user.model.js'
// import { ApiError } from '../utils/ApiError.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const users = User;

const userRegistration = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    //validation - email required 
    if (!(firstName && lastName && email && password)) {
        res.status(400).json({message:"All fields are required"})
        // throw new ApiError(400, "All fields are required")
    }
  
    //check user already exist
    const existedUser = await users.findOne({ email })
    if (existedUser) {
        res.status(409).json(`user with ${email} already exist`)
        // throw new ApiError(409, "User with email already exists")
    }
    //hashing password
    const hashPassword = await bcrypt.hash(password, 10)


    //creating user
    const createUser = await users.create({
        firstName,
        lastName,
        email,
        password: hashPassword,
    })
    if (!createUser) {
        res.status(500).json({ message: "Something went wrong while user registeration" })
    }
    return res.status(201).json({ message: "user registered successfully", createUser })
}


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!(email && password)) {
        return res.status(400).json({message:'All fields required'})
        // throw new ApiError(400, "All fields are required")
    }

    const user = await users.findOne({ email })
    if (!user) {
        return res.status(400).json({message:"User does not exist or email provided by you is wrong"})
        // throw new ApiError(400, 'user does not exist or wrong email')
    }
    //check pass
    const checkPass = await bcrypt.compare(password, user.password)

    if (!checkPass) {
        return res.status(401).json({message:'invalid user credentials'})
        // throw new ApiError(401, 'invalind user credentials')
    }

    const token = jwt.sign(
        {
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        },
        process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })

    res.status(200).json({ message: 'user logged in', user, token })
}

const getAllUsers = async (req, res) => {
    const allUsers = await users.find()
    if (allUsers) {
        res.json({ allUser: allUsers })
    }
    //    else{
    //     res.json({message:"you have no access, Please register yourself first"})
    //    }

};
export { userRegistration, loginUser, getAllUsers }

