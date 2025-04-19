const express = require("express")
const { getAllComments, addNewComment, editComment, deleteComment, getCommentById } = require("../controllers/comments.controller")
const authMiddleware = require("../middleware/auth.middleware")

const commentsRouter = express.Router()

commentsRouter.get("/", getAllComments)
commentsRouter.get("/:id", getCommentById)
commentsRouter.post("/", authMiddleware, addNewComment)
commentsRouter.put("/:id", authMiddleware, editComment)
commentsRouter.delete("/:id", authMiddleware, deleteComment)

module.exports = commentsRouter


