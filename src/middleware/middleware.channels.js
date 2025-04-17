function validateChannel(req, res, next) {
    const { channelName, isVerified, description } = req.body;

    if (!channelName || typeof isVerified !== "boolean" || !description) {
        return res.status(400).json({
            message: "Missing required fields - channelName, isVerified, description",
        });
    }

    next();
}

module.exports = validateChannel;
