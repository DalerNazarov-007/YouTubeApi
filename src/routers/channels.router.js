const express = require("express")
const { getAllChannels, getOneById, addNewChannel, editChannel, deleteChannel} = require("../controllers/channels.controller")
const authMiddleware = require("../middleware/auth.middleware")

const channelsRouter = express.Router()

channelsRouter.get("/", getAllChannels)
channelsRouter.get("/:id", getOneById)
channelsRouter.post("/", authMiddleware, addNewChannel)
channelsRouter.put("/:id",authMiddleware, editChannel)
channelsRouter.delete("/:id", authMiddleware, deleteChannel)

module.exports = channelsRouter


