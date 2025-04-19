const express = require("express")
const videosRouter = require("./routers/videos.router")
const channelsRouter = require("./routers/channels.router")
const logger = require("./middleware/logger.middleware")
const commentsRouter = require("./routers/comments.router")
const jwt = require("jsonwebtoken")

const app = express()
app.use(express.json())
app.use(logger)

app.use("/videos", videosRouter)
app.use("/channels", channelsRouter)
app.use("/comments", commentsRouter)

app.post("/login", (req, res) => {

    const originalAdmin = {
        username: "Daler",
        password: "ndaler07"
    }

    const body = req.body
    
    if (body.username == originalAdmin.username && body.password == originalAdmin.password) {
        var token = jwt.sign({ username: 'Daler' }, 'ndaler0717777');
        console.log(token);
        res.send({"Token": token})
    }
})



app.listen(6666, () => {
    console.log("Server running on port 6666!");
    
})
