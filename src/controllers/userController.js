import User from '../models/userModel.js';



// Update user profile
export const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (user) {
            user.username = req.body.username ?? user.username;
            user.avatar = req.body.avatar;
            user.bio = req.body.bio ?? user.bio;
            await user.save();
            res.status(200).json({ message: 'User profile updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Retrieve user profile
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (user) {
            res.status(200).json({ user });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Change user password
export const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    try {
        const user = await User.findById(req.user.userId);
        if (user && await user.comparePassword(currentPassword)) {
            user.password = newPassword;
            await user.save();
            res.status(200).json({ message: 'Password changed successfully' });
        } else {
            res.status(401).json({ message: 'Invalid current password' });
        }            
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}