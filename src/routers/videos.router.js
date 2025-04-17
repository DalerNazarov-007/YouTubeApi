const express = require("express")
const { getAllVideos, getOneById, addNewVideo, editVideo, deleteVideo } = require("../controllers/videos.controller")
const validateVideo = require("../middleware/middleware.videos")
const videosRouter = express.Router()

videosRouter.get("/", getAllVideos)
videosRouter.get("/:id", getOneById)
videosRouter.post("/", validateVideo, addNewVideo)
videosRouter.put("/", editVideo)
videosRouter.delete("/", deleteVideo)


module.exports = videosRouter


