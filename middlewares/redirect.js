// Export a middleware function that checks if the user is logged in
module.exports = (req, res, next) => {

    // Check if the user ID is stored in the session
    if (req.session.userId){

        // If the user ID is found in the session, continue to the next middleware
        next();
    }else{
        // If there is no user ID in the session, redirect to the login page
        res.redirect("/auth/login");
    }
};
