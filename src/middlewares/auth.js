// Require the User model
const User = require("../models/User")

// Define an async middleware function to authenticate the user
const authenticateUser = async (req, res, next) => {

    // Check if the user ID is stored in the session
    if (req.session.userId) {

        // If the user ID is found, try to find the user in the database
        const user = await User.findById(req.session.userId);

        // If a user is found, redirect to the home page
        if (user) {
            res.redirect("/")
        } else {
            // If the user is not found, continue to the next middleware
            next();
        }
    } else {
       // If there is no user ID in the session, continue to the next middleware
       next();
    }
};

// Export the authenticateUser middleware function
module.exports = { authenticateUser };
