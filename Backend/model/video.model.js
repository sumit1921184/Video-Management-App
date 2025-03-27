const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: String,
    description: String,
    tags: [String],
    filePath: String,
    fileSize: Number,
    uploadDate: { type: Date, default: Date.now }
});

const VideoModel = mongoose.model("Video", VideoSchema);
module.exports = {
    VideoModel
}
