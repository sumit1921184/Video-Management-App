const express = require("express");
const multer = require("multer");
const { VideoModel } = require("../model/video.model");
const { auth } = require("../middlewares/auth.middleware");

const VideoRouter = express.Router();

const storage = multer.diskStorage({
    destination: "uploads/",  // Folder where videos are stored
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 * 1024 }, // 5GB Limit
});

VideoRouter.post("/upload", auth, upload.single("video"), async (req, res) => {
    try {
        const { title, description, tags } = req.body;

        const filePath = req.file.path.replace(/\\/g, "/");  

        const newVideo = new VideoModel({
            userId: req.id,
            title,
            description,
            tags: tags.split(","),
            filePath: filePath.replace("uploads/", ""),  
            fileSize: req.file.size
        });

        await newVideo.save();
        res.status(201).json({ message: "Video uploaded successfully", video: newVideo });
    } catch (error) {
        res.status(500).json({ error: "Error uploading video" });
    }
});

// Get user-specific videos with filtering & pagination
// VideoRouter.get("/",auth, async (req, res) => {
//     const  userId  = req.id;
//     const { page = 1, limit = 5, search = "" } = req.query;

//     try {
//         const videos = await VideoModel.find({
//             userId,
//             title: { $regex: search, $options: "i" }
//         })
//         .limit(limit * 1)
//         .skip((page - 1) * limit);

//         res.json(videos);
//     } catch (error) {
//         res.status(500).json({ error: "Error fetching videos" });
//     }
// });

VideoRouter.get("/", async (req, res) => {
    try {
      const { search, date, page = 1, limit = 10 } = req.query;
      const query = {};
  
      if (search) {
        query.title = { $regex: search, $options: "i" };
      }
  
      if (date) {
        // Convert date to proper format (start and end of the day)
        const startDate = new Date(date);
        startDate.setUTCHours(0, 0, 0, 0); // Start of the day
  
        const endDate = new Date(date);
        endDate.setUTCHours(23, 59, 59, 999); // End of the day
  
        query.uploadDate = { $gte: startDate, $lte: endDate };
      }
  
      const totalVideos = await VideoModel.countDocuments(query);
      const totalPages = Math.ceil(totalVideos / limit);
      const videos = await VideoModel.find(query)
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
  
      res.json({ videos, totalPages });
    } catch (error) {
      console.error("Error fetching videos:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  

module.exports = {
    VideoRouter
};
