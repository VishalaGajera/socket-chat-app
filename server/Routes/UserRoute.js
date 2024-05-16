const express = require("express");
const userRoute = express.Router();
const { registerUser, loginUser, getUser, getAllUser, updateUser, deleteUser } = require("../Controllers/UserController")

userRoute.post("/register-user", registerUser);
userRoute.post("/login-user", loginUser)
userRoute.get("/get-user", getUser)
userRoute.get("/getAll-user", getAllUser)
userRoute.put("/update-user", updateUser)
userRoute.delete("/delete-user", deleteUser)
userRoute.put("/update-password", deleteUser)

module.exports = userRoute
