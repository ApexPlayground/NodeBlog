// Require the necessary modules
const mongoose = require("mongoose"); // Mongoose for object modeling with MongoDB
const bcrypt = require("bcrypt"); // Bcrypt for password hashing
const Schema = mongoose.Schema;

// Define the user schema
const UserSchema = new Schema({
  Username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // Add an email validator using the Mongoose built-in validator with the 'match' option
    validate: {
      validator: function(v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: "Please enter a valid email address"
    }
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add a pre-save hook to hash the user's password before saving it to the database
UserSchema.pre("save", function(next){
    // Check if the password has been modified before hashing it
    if(!this.isModified("password")){
        return next();
    }
    // Hash the password using bcrypt with a salt of 10
    bcrypt.hash(this.password, 10, (err, passwordHash) => {
        if(err){
            return next(err);
        }
        // Set the user's password to the hashed password
        this.password = passwordHash;
        next();
    });
});

// Create a Mongoose model for the user schema
const User = mongoose.model("User", UserSchema);

// Export the User model to be used in other parts of the application
module.exports = User;
