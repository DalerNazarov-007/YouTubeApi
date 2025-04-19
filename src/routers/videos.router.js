const express = require("express")
const { getAllVideos, getOneById, addNewVideo, editVideo, deleteVideo } = require("../controllers/videos.controller")
const authMiddleware = require("../middleware/auth.middleware")
const videosRouter = express.Router()


videosRouter.get("/",getAllVideos)
videosRouter.get("/:id", getOneById)
videosRouter.post("/", authMiddleware, addNewVideo)
videosRouter.put("/:id", authMiddleware, editVideo)
videosRouter.delete("/:id", authMiddleware, deleteVideo)


module.exports = videosRouter


