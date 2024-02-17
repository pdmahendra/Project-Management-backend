import User from '../models/user.model.js'
import { ApiError } from '../utils/ApiError.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const users = User;
const userRegistration = async (req, res) => {
    const { fname, lname, email, password } = req.body;
    //validation - email required 
    if (!email) {
        res.json('email required')
        throw new ApiError(400, "All fields are required")
    }
    //check user already exist
    const existedUser = await users.findOne({ email })
    if (existedUser) {
        // res.json(`user with ${email} already exist`)
        throw new ApiError(409, "User with email already exists")
    }
    //hashing password
    const hashPassword = await bcrypt.hash(password, 10)
    //creating user
    const createUser = await users.create({
        fname,
        lname,
        email,
        password: hashPassword
        // password
    })

    return res.status(201).json({ message: "user registered successfully", createUser })
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await users.findOne({ email })
    if (!user) {
        throw new ApiError(400, 'user does not exist or wrong email')
    }
    //check pass
    const checkPass = await bcrypt.compare(password, user.password)

    if (!checkPass) {
        throw new ApiError(401, 'invalind user credentials')
    }

    const token = jwt.sign(
        {
            _id: user._id,
            email: user.email,
            fname: user.fname,
            lname: user.lname
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

