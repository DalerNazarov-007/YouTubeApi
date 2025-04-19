const { v4 } = require("uuid")
const IO = require("../utils/io")
const comments = new IO("database/comments.json")
const model = require("../models/comments.model")

async function getAllComments(req, res) {
    const commentId = req.query.videoId;
    // console.log(commentId);
    const data = await comments.read()
    if(commentId){
        const foundData = data.filter(comment => comment.videoId == commentId)
        if (foundData.length == 0) {
            res.status(404).send({message: "Comments not found on that video!"})
        }
        return res.status(200).send(foundData)
    }
    res.status(200).send(data)
}

async function getCommentById(req, res) {
    const data = await comments.read()
    const { commentId } = req.params
    console.log(req.params);

    const foundData = data.find(comment => comment.id == commentId)

    if (foundData) {
        res.status(200).send(foundData)
    }
    else {
        res.status(404).send({ message: "Comment not found" })
    }
}

async function addNewComment(req, res) {
    const data = await comments.read()
    const { commentInsight, videoLiked, videoId } = req.body;
    if (!commentInsight || !videoLiked || !videoId) {
        return res.status(400).send({ message: "Missing required fields!" });
    }
    const commentId = v4();
    const newComment = new model(commentId, commentInsight, videoLiked, videoId)
    const totalData = data.length ? [...data, newComment] : [newComment];

    await comments.write(totalData)
    return res.status(201).send({ message: "Comment added successfully!" })
}

async function editComment(req, res) {
    const data = await comments.read()
    const { commentId } = req.params
    const { commentInsight, videoLiked, videoId } = req.body

    const updatedData = data.map(comment => comment.id == commentId ? { ...comment, commentId, commentInsight, videoLiked, videoId } : comment)

    await comments.write(updatedData)
    res.status(200).send({ message: "Comment successfully edited!" })
}

async function deleteComment(req, res) {
    const { commentId } = req.params
    const data = await comments.read()

    const filteredData = data.filter(comments => comments.id != commentId)

    await comments.write(filteredData)
    res.status(200).send({ message: "Comment successfully deleted!" })
}
module.exports = {
    getAllComments, getCommentById, addNewComment, editComment, deleteComment
}