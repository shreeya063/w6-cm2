const User = require("../models/userModel")

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Unable to retrieve users" });
    }
};

const createUser = async (req, res) => {

    try {
        const newUser = await User.create({ ...req.body });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: "Unable to create user", error: error.message });
    }
};

const getUserById = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch {
        res.status(500).json({ message: "Unable to retrieve user", error: error.message });
    }
};

const updateUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const updateUser = await User.findOneAndUpdate(
            { _id: userId },
            { ...req.body },
            { new: true },
        );
        if (updateUser) {
            res.status(200).json(updateUser);
        } else {
            res.status(404).json({ message: "User not found" })
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to update user" })

    }

};

const deleteUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const deletedUser = await User.findOneAndDelete({ _id: userId });
        if (deletedUser) {
            res.status(200).json({ message: "User deleted successfully" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to delete user" });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};