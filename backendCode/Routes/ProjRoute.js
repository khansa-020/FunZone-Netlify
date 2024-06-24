import express from "express";
import multer from "multer";
import path from "path";
import ProjectModel from "../Models/projectModel.js";

const router = express.Router();

// Storage engine for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/files/"); // Specify the directory to store the uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename
  },
});

// File filter for multer
const fileFilter = (req, file, cb) => {
  if (
    file.fieldname === "posterImg" &&
    (file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/gif")
  ) {
    // Allow only image file types for the "posterImg" field
    cb(null, true);
  } else if (file.fieldname === "video" && file.mimetype === "video/mp4") {
    // Allow only video file type (MP4) for the "video" field
    cb(null, true);
  } else if (
    file.fieldname === "file" &&
    (file.mimetype === "application/vnd.android.package-archive" ||
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/msword" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
  ) {
    // Allow only specific document file types for the "file" field
    cb(null, true);
  } else {
    // For unsupported file types, return an error
    cb(new Error("Invalid file/image type"), false);
  }
};

// Initialize multer upload
const upload = multer({
  storage,
  limits: { fileSize: 10000000000 }, // 10 GB
  fileFilter,
}).fields([
  { name: "posterImg", maxCount: 1 },
  { name: "file", maxCount: 1 },
  { name: "video", maxCount: 1 },
]);

// Add project
router.post("/:userId/addproject", async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    try {
      const { title, description, category, posterImg, file, video } = req.body;

      const project = new ProjectModel({
        title,
        description,
        category,
        user: req.params.userId,
        posterImg,
        file,
        video,
      });

      await project.save();
      res.status(201).send({ message: "Project added successfully!" });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  });
});
router.get("/download/:id", (req, res) => {
  const fileId = req.params.id;

  ProjectModel.findById(fileId, (err, file) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error downloading file" });
    }
    const filePath = `public/files/${file.filename}`;
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error downloading file" });
      }
      res.setHeader("Content-Type", "application/octet-stream");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${file.filename}`
      );
      res.send(data);
    });
  });
});

export default router;
