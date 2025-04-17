const express = require("express")
const { getAllChannels, getOneById, addNewChannel, editChannel, deleteChannel} = require("../controllers/channels.controller")
const  validateChannel = require("../middleware/middleware.channels")
const channelsRouter = express.Router()

channelsRouter.get("/", getAllChannels)
channelsRouter.get("/:id", getOneById)
channelsRouter.post("/", validateChannel, addNewChannel)
channelsRouter.put("/", editChannel)
channelsRouter.delete("/", deleteChannel)

module.exports = channelsRouter


