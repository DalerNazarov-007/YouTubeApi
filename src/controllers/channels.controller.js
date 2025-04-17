const { v4 } = require("uuid")
const IO = require("../utils/io")
const Channels = new IO("database/channels.json")
const Model = require("../models/channels.models")

async function getAllChannels(req, res) {
    const data = await Channels.read()
    res.status(200).send(data)
}

async function getOneById(req, res) {
    const data = await Channels.read()
    const { id } = req.params

    const foundData = data.find(channel => channel.channelId === id)
    
    if (foundData) {
        res.status(200).send(foundData)
    }else{
        res.status(404).send({message: "Channel not found!"})
    }
}

async function addNewChannel(req, res) {
    const data = await Channels.read()
    const { channelName, profileImage, subscribers, isVerified, description } = req.body

    const channelId = v4()
    const newChannel = new Model(channelId, channelName, profileImage, subscribers, isVerified, description)
    const finalData = data.length ? [...data, newChannel] : [newChannel]
    await Channels.write(finalData)
    res.status(201).send({message: "New Channel Created Successfully!"})
}

async function editChannel(req, res) {
    const data = await Channels.read()
    const {id} = req.params
    const {channelName, profileImage, subscribers, isVerified, description} = req.body

    const updatedData = data.map(channel => channel.channelId == id ? {... channel, channelName, profileImage, subscribers, isVerified, description}: channel)

    await Channels.write(updatedData)
    res.status(200).send({message: "Channel successfully edited!"})
}

async function deleteChannel(req, res) {
    const data = await Channels.read()
    const {id} = req.params

    const filteredData = data.filter(channel => channel.channelId !== id)
    await Channels.write(filteredData)

    res.status(200).send({message: "Channel successfully deleted!"})
}
module.exports = {
    getAllChannels, getOneById , addNewChannel, editChannel, deleteChannel
}