require("./db")
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const userRoute=require("./Routes/UserRoute");
const chatRoute = require("./Routes/ChatRoute");
const messageRoute=require("./Routes/MessageRoute")

const app = express();
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 5000
app.use('/api/user', userRoute);
app.use('/api/chat', chatRoute);
app.use('/api/message', messageRoute);

app.listen(port, (req, res) => {
    console.log(`Server Running on Port : ${port}`);
})