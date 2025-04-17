const express = require("express")
const videosRouter = require("./routers/videos.router")
const channelsRouter = require("./routers/channels.router")

const app = express()
app.use(express.json())

app.use("/videos", videosRouter)
app.use("/channels", channelsRouter)

app.listen(6666, () => {
    console.log("Server running on port 6666!");
    
})
