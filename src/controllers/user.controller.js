import User from '../models/user.model.js'
import { ApiError } from '../utils/ApiError.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const users = User;

const userRegistration = async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    try {
        // Validation - email required
        if (!(firstName && lastName && email && password)) {
            throw new ApiError(400, "All fields are required")
        }

        // Check if user already exists
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            throw new ApiError(409, `User with email ${email} already exists`)
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
            throw new ApiError(500, "User Registration failed");
        }

        return res.status(201).json({ message: "User registered successfully", createUser });
    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ message: error.message, errors: error.errors });
        } else {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!(email && password)) {
            throw new ApiError(400, "All fields required")
        }

        const user = await users.findOne({ email });
        if (!user) {
            throw new ApiError(400, "User with this Email does not exist")
        }

        const checkPass = await bcrypt.compare(password, user.password);
        if (!checkPass) {
            throw new ApiError(401, "Invalid user credentials")
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

        return res.status(200).json({ message: 'User Successfully logged in', user, token });
    } catch (error) {
      if(error instanceof ApiError){
        return res.status(error.statusCode).json({ message: error.message, errors: error.errors });
    } else {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
};




export { userRegistration, loginUser }

