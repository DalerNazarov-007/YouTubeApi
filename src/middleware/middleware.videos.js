function validateVideo(req, res, next) {
    const { title, author, description } = req.body;

    if (!title || !author || !description) {
        return res.status(400).send({ message: "Missing required fields - title, author, description" })
    }

    next();
}

module.exports = validateVideo;
