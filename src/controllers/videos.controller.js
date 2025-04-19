const { v4 } = require("uuid")
const IO = require("../utils/io")
const videos = new IO("database/videos.json")
const Model = require("../models/videos.models")
const authenticateToken = require("../middleware/auth.middleware")

async function getAllVideos(req, res) {
    const channelId = req.query.channelId;
    console.log(channelId);
    const data = await videos.read()
    if(channelId){
        const foundData = data.filter(video => video.channelId == channelId)
        if (foundData.length == 0) {
            res.status(404).send({message: "Videos not found on that channel!"})
        }
        return res.status(200).send(foundData)
    }
    res.status(200).send(data)
}

async function getOneById(req, res) {
    const data = await videos.read()
    const { videoId } = req.params
    console.log(req.params);

    const foundData = data.find(video => video.videoId == videoId)

    if (foundData) {
        res.status(200).send(foundData)
    }
    else {
        res.status(404).send({ message: "Video not found" })
    }
}

async function addNewVideo(req, res) {
    const data = await videos.read()
    const { title, thumbnailUrl, duration, uploadTime, views, author, description, subscriber, isLive, channelId } = req.body;

    if (!title || !author || !description) {
        return res.status(400).send({ message: "Missing required fields - title, author, description" })
    }

    const videoId = v4();
    const newVideo = new Model(videoId, title, thumbnailUrl, duration, uploadTime, views, author, description, subscriber, isLive, channelId)
    const totalData = data.length ? [...data, newVideo] : [newVideo];

    await videos.write(totalData)
    return res.status(201).send({ message: "Video added successfully!" })
}

async function editVideo(req, res) {
    const data = await videos.read()
    const { videoId } = req.params
    const { title, thumbnailUrl, duration, uploadTime, views, author, description, subscriber, isLive, channelId } = req.body

    const updatedData = data.map(video => video.videoId == videoId ? { ...video, videoId, title, thumbnailUrl, duration, uploadTime, views, author, description, subscriber, isLive, channelId } : video)

    await videos.write(updatedData)
    res.status(200).send({ message: "Video successfully edited!" })
}

async function deleteVideo(req, res) {
    const { videoId } = req.params
    const data = await videos.read()

    const filteredData = data.filter(video => video.videoId !== videoId)

    await videos.write(filteredData)
    res.status(200).send({ message: "Video successfully deleted!" })
}
module.exports = {
    getAllVideos, getOneById, addNewVideo, editVideo, deleteVideo
}