const UserService = require("../Services/UserService")
const userService = new UserService();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const validator = require("validator")

const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY
    return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" })
}

exports.registerUser = async (req, res) => {
    console.log(req.body);
    try {
        let user = await userService.getUser({ email: req.body.email });
        if (user) {
            return res.status(400).json({ message: "User is Alerady Registered...👍🏻" })
        }
        if(!req.body.name && !req.body.email && !req.body.password){
            return res.status(400).json({ message: "All Field Are Must Be a Required" })
        }
        if (!req.body.name) {
            return res.status(400).json({ message: "Name Must Be a Required" })
        }
        if (!validator.isEmail(req.body.email)) {
            return res.status(400).json({ message: "Email Must Be a Valid Email..." })
        }
        if (!validator.isStrongPassword(req.body.password)) {
            return res.status(400).json({ message: "Password Must Be a Stronge Password..." })
        }
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        console.log("hashPassword : ", hashPassword);
        user = await userService.addNewUser({ ...req.body, password: hashPassword })
        return res.status(200).json({ user: user, message: "New User Is Added Successfully...👍🏻" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Internal Server Error...${console.error()}` })
    }
}

exports.loginUser = async (req, res) => {
console.log(" -- body :-- " , req.body);
    try {
        let user = await userService.getUser({ email: req.body.email, isDelete: false })
        console.log(user);
        if (!user) {
            return res.status(400).json({ message: `Email Not Found... Please Check Your Email Address` })
        }
        if(!req.body.email && !req.body.password){
            return res.status(400).json({ message: "All Field Are Must Be a Required" })
        }
        let checkPassword = await bcrypt.compare(req.body.password, user.password)
        if (!checkPassword) {
            return res.status(401).json({ message: `Password is Not Match Please Enter Correct Password` })
        }
        const token = createToken(user._id);
        console.log("token : ", token);
        return res.status(200).json({ token, user: user, message: `Login Successfully...👍🏻` })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Internal Server Error...${console.error()}` })
    }
}

exports.getUser = async (req, res) => {
    try {
        let user = await userService.getUserById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: `User Not Found...Please Try Again` })
        }
        console.log(user);
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Internal Server Error...${console.error()}` })
    }
}

exports.getAllUser = async (req, res) => {
    try {
        let users = await userService.getAllUser({ isDelete: false })
        if (!users) {
            return res.status(404).json({ message: `Users Data Not Found...Please Try Again` })
        }
        console.log(users);
        return res.status(200).json(users)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Internal Server Error...${console.error()}` })
    }
}

exports.updateUser = async (req, res) => {
    try {
        let user = await userService.getUserById(req.query.userId)
        if (!user) {
            return res.status(404).json({ message: `User Not Found...Please Try Again` })
        }
        console.log(user);
        user = await userService.updateUser(user._id, { ...req.body })
        return res.status(200).json({ user: user, message: `User Detail Update Successfully... 👍🏻` })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Internal Server Error...${console.error()}` })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        let user = await userService.getUserById(req.query.userId)
        if (!user) {
            return res.status(404).json({ message: `User Not Found...Please Try Again` })
        }
        console.log(user);
        user = await userService.updateUser(user._id, { isDelete: true })
        return res.status(200).json({ message: `User Delete Successfully...👍🏻` })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Internal Server Error...${console.error()}` })
    }
}

exports.updatePassword = async (req, res) => {
    try {
        let user = await userService.getUserById(req.query.userId)
        if (!user) {
            return res.status(404).json({ message: `User Not Found...Please Try Again` })
        }
        console.log(user);
        let comparePassword = await bcrypt.compare(req.body.oldPassword, req.user.password)
        let oldPassword = req.body.oldPassword;
        if (!oldPassword) {
            return res.json({ message: `oldPassword is Not Found... Please Try Again` })
        }
        if (!comparePassword) {
            return res.json({ message: `oldPassword is Not Match... Please Try Again` })
        }
        let newPassword = req.body.newPassword;
        if (!newPassword) {
            return res.json({ message: `newPassword is Not Found... Please Try Again` })
        }
        if (oldPassword == newPassword) {
            return res.json({ message: `oldPassword And newPassword Are Same... Please Enter Different Password..` })
        }
        let confirmPassword = req.body.confirmPassword
        if (!confirmPassword) {
            return res.json({ message: `confirmPassword is Not Found... Please Try Again` })
        }
        if (newPassword !== confirmPassword) {
            return res.json({ message: `newPassword And confirmPassword is Not Same.. Please Try Again` })
        }
        let hashPassword = await bcrypt.hash(newPassword, 10)
        user = await userService.updateUser(req.user._id, { password: hashPassword })
        return res.status(200).json({ user: user, message: `Password Changed Successfully...👍🏻` })
    } catch (error) {
        return res.status(500).jsona({ message: `Internal Server Error...${console.error()}` })
    }
}