import FileModel from "../Models/FileModel.js";

import express from "express";
const router = express.Router();
import multer from "multer";
import fs from "fs";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/files/"); // Specify the directory to store the uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename
  },
});

const fileFilter = function (req, file, cb) {
  // Allowed file extensions
  const allowedTypes = ["apk", "pdf", "docx", "mp4", "gif"];

  // Check file extension
  const fileExtension = file.originalname.split(".").pop();
  if (allowedTypes.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error("Only apk, pdf, docx, mp4, and gif files are allowed"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post("/upload", upload.single("file"), (req, res) => {
  const { userId } = req.body;
  const { filename } = req.file;

  const newFile = new FileModel({
    filename,
    userId,
  });

  newFile.save((err, file) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error uploading file" });
    }
    res.status(200).json({ message: "File uploaded successfully" });
  });
});
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer error
    res.status(400).json({ message: err.message });
  } else {
    // Other error
    res.status(500).json({ message: err.message });
  }
});
router.get("/download/:id", (req, res) => {
  const fileId = req.params.id;

  FileModel.findById(fileId, (err, file) => {
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

router.get("/files/:userId", (req, res) => {
  const userId = req.params.userId;

  FileModel.find({ userId }, (err, files) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error getting files" });
    }
    // res.status(200).json({ files });
    res.status(200).send({
      success: true,
      message: "Record Fetched Successfully!",
      data: files,
    });
  });
});
router.delete("/:id", async (req, res) => {
  try {
    const file = await FileModel.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // Delete the file from the server
    // fs.unlinkSync(`public/files/${file.filename}`);

    // Delete the file from the database
    await FileModel.deleteOne({ _id: req.params.id });

    res.status(200).send({
      success: true,
      message: "File Deleted Successfully!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error while Deleting a file!",
    });
  }
});

export default router;
