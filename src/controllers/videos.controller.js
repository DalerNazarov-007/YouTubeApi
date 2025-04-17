const { v4 } = require("uuid")
const IO = require("../utils/io")
const videos = new IO("database/videos.json")
const Model = require("../models/videos.models")

async function getAllVideos(req, res) {
    const data = await videos.read()
    res.status(200).send(data)
}

async function getOneById(req, res) {
    const data = await videos.read()
    const {id} = req.params
    console.log(req.params);
    
    const foundData = data.find(video => video.id == id)

    if (foundData) {
        res.status(200).send(foundData)
    }
    else{
        res.status(404).send({message: "Video not found"})
    }
}

async function addNewVideo(req, res) {
    const data = await videos.read()
    const { title, thumbnailUrl, duration, uploadTime, views, author, description, subscriber, isLive } = req.body;

    const id = v4();
    const newVideo = new Model(id, title, thumbnailUrl, duration, uploadTime, views, author, description, subscriber, isLive)
    const totalData = data.length ? [...data, newVideo] : [newVideo];

    await videos.write(totalData)
    return res.status(201).send({ message: "Video added successfully!" })
}

async function editVideo(req, res) {
    const data = await videos.read()
    const {id, title, thumbnailUrl, duration, uploadTime, views, author, description, subscriber, isLive} = req.body

    const updatedData = data.map(video => video.id == id ? {...video, id, title, thumbnailUrl, duration, uploadTime, views, author, description, subscriber, isLive}: video)

    await videos.write(updatedData)
    res.status(200).send({message: "Video successfully edited!"})
}

async function deleteVideo(req, res) {
    const {id} = req.body
    const data = await videos.read()

    const filteredData = data.filter(video => video.id !== id)

    await videos.write(filteredData)
    res.status(200).send({message: "Video successfully deleted!"})
}
module.exports = {
    getAllVideos, getOneById, addNewVideo, editVideo, deleteVideo
}