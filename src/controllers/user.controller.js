import User from '../models/user.model.js'
import { ApiError } from '../utils/ApiError.js';
import jwt from 'jsonwebtoken'


const users = User;

const userRegistration = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

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

        // Creating user
        const createUser = await users.create({
            firstName,
            lastName,
            email,
            password
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

        const checkPassword = await user.isPasswordCorrect(password)
        if (!checkPassword) {
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
        const options = {
            httpOnly: true,
            secure: true
        }

        return res.status(200).cookie("token", token, { options }).json({ message: 'User Successfully logged in', user, token });
    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ message: error.message, errors: error.errors });
        } else {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
};

const updateUserPassword = async (req, res) => {
    const { newPassword } = req.body;

    if (!newPassword) {
        throw new ApiError(400, "New password is required");
    }

    try {
        const user = await User.findById(req.user?._id)
        if (!user) {
            throw new ApiError(400, "User with this Email does not exist")
        }

        user.password = newPassword
        await user.save({validateBeforeSave: false})

        return res.status(200).json({ message: "Password has been updated" });
    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ message: error.message, errors: error.errors });
        } else {
            console.error(error);
            return res.status(500).json({ message: "Something went wrong" });
        }
    }
};

const updateUser = async (req, res) => {
    const { firstName, lastName, email } = req.body;

    try {
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            throw new ApiError(409, `User with email ${email} already exists`);
        }

        const updatedUser = await users.findByIdAndUpdate(req.user?._id,
            {
                firstName,
                lastName,
                email,
            }, { new: true });

        if (!updatedUser) {
            throw new ApiError(404, "User not found");
        }

        return res.status(200).json({ message: "User has been updated", updatedUser });
    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ message: error.message, errors: error.errors });
        } else {
            console.error(error);
            return res.status(500).json({ message: "Something went wrong" });
        }
    }
};

// const logoutUser = async (req, res) => {

//     // Clear the JWT token cookie
//     res.clearCookie('token');
//     req.headers.authorization = '';

//     // Update the user document or blacklist to indicate that the user is logged out
//     // For example, you could set req.user.isLoggedOut = true

//     return res.status(200).json({ message: 'User logged out' });
// };

const deleteUser = async (req, res) => {
    try {
        const user = await users.findByIdAndDelete(req.user?._id);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        return res.status(200).json({ message: "User successfully deleted", user });
    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ message: error.message, errors: error.errors });
        } else {
            console.error(error);
            return res.status(500).json({ message: "Something went wrong" });
        }
    }
};













export {
    userRegistration,
    loginUser,
    updateUserPassword,
    updateUser,
    deleteUser
}

