const { v4 } = require("uuid")
const IO = require("../utils/io")
const channels = new IO("database/channels.json")
const Model = require("../models/channels.models")

async function getAllChannels(req, res) {
    const data = await channels.read()
    res.status(200).send(data)
}

async function getOneById(req, res) {
    const data = await channels.read()
    const { id } = req.params

    const foundData = data.find(channel => channel.channelId === id)
    
    if (foundData) {
        res.status(200).send(foundData)
    }else{
        res.status(404).send({message: "Channel not found!"})
    }
}

async function addNewChannel(req, res) {
    const data = await channels.read()
    const { channelName, profileImage, subscribers, isVerified, description } = req.body

    if (!channelName || typeof isVerified !== "boolean" || !description) {
        return res.status(400).json({
            message: "Missing required fields - channelName, isVerified, description",
        });
    }
    
    const channelId = v4()
    const newChannel = new Model(channelId, channelName, profileImage, subscribers, isVerified, description)
    const finalData = data.length ? [...data, newChannel] : [newChannel]
    await channels.write(finalData)
    res.status(201).send({message: "New Channel Created Successfully!"})
}

async function editChannel(req, res) {
    const data = await channels.read()
    const {id} = req.params
    const {channelName, profileImage, subscribers, isVerified, description} = req.body

    const updatedData = data.map(channel => channel.channelId == id ? {... channel, channelName, profileImage, subscribers, isVerified, description}: channel)

    await channels.write(updatedData)
    res.status(200).send({message: "Channel successfully edited!"})
}

async function deleteChannel(req, res) {
    const data = await channels.read()
    const {id} = req.params

    const filteredData = data.filter(channel => channel.channelId !== id)
    await channels.write(filteredData)

    res.status(200).send({message: "Channel successfully deleted!"})
}
module.exports = {
    getAllChannels, getOneById , addNewChannel, editChannel, deleteChannel
}