const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true},
        email: { type: String, required: true,unique: true },
        password: { type: String, requires: true },
        isDelete: { type: Boolean, default: false },
    },
    {
        timestamps: true
    }
)

const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel