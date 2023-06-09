const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;



// Define the new user schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    default: "",
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
UserSchema.add({
  Admin: {
    type: Boolean,
    default: false
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

// Create a new User model using the new schema
const User = mongoose.model("User", UserSchema);

// Export the User model to be used in other parts of the application
module.exports = User;
