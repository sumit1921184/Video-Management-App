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


  
VideoRouter.get("/",auth, async (req, res) => {
  try {
      const { search, date, page = 1, limit = 10 } = req.query;

     
      const userId = req.id; 

      if (!userId) {
          return res.status(401).json({ error: "Unauthorized: User not logged in" });
      }

      const query = { userId }; 

      if (search) {
          query.title = { $regex: search, $options: "i" };
      }

      if (date) {
          const startDate = new Date(date);
          startDate.setUTCHours(0, 0, 0, 0);

          const endDate = new Date(date);
          endDate.setUTCHours(23, 59, 59, 999);

          query.uploadDate = { $gte: startDate, $lte: endDate };
      }

      const totalVideos = await VideoModel.countDocuments(query);
      const totalPages = Math.ceil(totalVideos / limit);

      const videos = await VideoModel.find(query)
          .skip((page - 1) * limit)
          .limit(parseInt(limit));

      res.json({ videos, totalPages });
  } catch (error) {
      console.error("Error fetching user-specific videos:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

  

module.exports = {
    VideoRouter
};
