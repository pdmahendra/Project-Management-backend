import User from '../models/user.model.js'
// import { ApiError } from '../utils/ApiError.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const users = User;

const userRegistration = async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    try {
        // Validation - email required
        if (!(firstName && lastName && email && password)) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: `User with email ${email} already exists` });
        }

        // Hashing password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creating user
        const createUser = await users.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
        });

        if (!createUser) {
            throw new Error("Something went wrong while user registration");
        }

        return res.status(201).json({ message: "User registered successfully", createUser });
    } catch (error) {
        // Log the error to a file or a logging service
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!(email && password)) {
            return res.status(400).json({ message: 'All fields required' });
        }

        const user = await users.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist or the email provided is incorrect' });
        }

        const checkPass = await bcrypt.compare(password, user.password);
        if (!checkPass) {
            return res.status(401).json({ message: 'Invalid user credentials' });
        }

        const token = jwt.sign(
            {
                _id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        );

        return res.status(200).json({ message: 'User logged in', user, token });
    } catch (error) {
        // Log the error to a file or a logging service
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};






// const getAllUsers = async (req, res) => {
//     const allUsers = await users.find()
//     if (allUsers) {
//         res.json({ allUser: allUsers })
//     }
//     //    else{
//     //     res.json({message:"you have no access, Please register yourself first"})
//     //    }

// };
export { userRegistration, loginUser }

