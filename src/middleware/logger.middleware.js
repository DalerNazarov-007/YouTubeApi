const logger = (req, res, next) => {
    console.log("Request proceeding on:", req.url, req.method);

    next()
}

module.exports = logger