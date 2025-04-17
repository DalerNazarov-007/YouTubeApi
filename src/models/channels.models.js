class Channel{
    constructor(channelId, channelName, profileImage, subscribers, isVerified, description){
        this.channelId = channelId;
        this.channelName = channelName;
        this.profileImage = profileImage;
        this.subscribers = subscribers;
        this.isVerified = isVerified;
        this.description = description
    }
}

module.exports = Channel