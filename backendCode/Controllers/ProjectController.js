import asyncHndler from "express-async-handler";
// import NoteModel from "../Models/noteModel.js";
import ProjectModel from "../Models/projectModel.js";
import mongoose from "mongoose";
import multer from "multer";
import asyncHandler from "express-async-handler";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let destination = "";
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpg"
    ) {
      destination = "./public/images/";
    } else if (
      file.mimetype === "application/vnd.android.package-archive" ||
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/msword" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.mimetype === "application/zip"
    ) {
      destination = "./public/files/";
    }
    cb(null, destination);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB
  },
});

// const ProjectModel = mongoose.model("Project", projectSchema);

import mime from "mime-types";

export const addProject = asyncHndler(async (req, res) => {
  const id = req.params.id; //logged in user
  const { title, description, category } = req.body;
  console.log("fileye", title);
  const { posterImg, file } = req.file;
  // const file = req.file;
  // if (!title || !description || !category) {
  //     res.status(400);
  //     throw new Error("Please fill all the required fields!");
  //   } else {
  // Check that the file format for posterImg is valid
  const posterImgMime = req.file.mimetype;
  if (
    !(
      posterImgMime === "image/jpeg" ||
      posterImgMime === "image/png" ||
      posterImgMime === "image/jpg" ||
      posterImgMime === "image/gif"
    )
  ) {
    res.status(400);
    throw new Error(
      "Invalid file format for posterImg. Only JPEG, PNG, JPG, and GIF formats are allowed."
    );
  }

  // Check that the file format for file is valid
  const fileMime = req.file.mimetype;
  if (
    !(
      fileMime === "application/pdf" ||
      fileMime ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      fileMime === "application/vnd.android.package-archive" ||
      fileMime === "application/zip"
    )
  ) {
    res.status(400);
    throw new Error(
      "Invalid file format for file. Only PDF, DOCX, APK, and ZIP formats are allowed."
    );
  }

  const project = new ProjectModel({
    user: id,
    title,
    description,
    category,
    posterImg: posterImg.buffer.toString("base64"), // store the posterImg as a base64 encoded string
    file: file.buffer.toString("base64"), // store the file as a base64 encoded string
  });
  const createdProject = await project.save();

  res.status(201).json(createdProject);
  // }
});

// export const getNotes = asyncHndler(async (req, res) => {
//   const id = req.params.id; //logged in user
//   const projects = await ProjectModel.find({ user: id });
//   res.json(projects);
// });

// export const addProject = asyncHndler(async (req, res) => {
//   const id = req.params.id; //logged in user
//   const { title, description, category, posterImg, file } = req.body;
//   if (!title || !description || !category) {
//     res.status(400);
//     throw new Error("Please fill all the required fields!");
//   } else {
//     const project = new ProjectModel({
//       user: id,
//       title,
//       description,
//       category,
//       posterImg,
//       file,
//     });
//     const createdProject = await project.save();

//     res.status(201).json(createdProject);
//   }
// });

export const getspecificProject = async (req, res) => {
  try {
    const specificProject = await ProjectModel.findOne({
      _id: req.params.id,
    });
    res.status(200).send({
      success: true,
      message: "Project Details",
      data: specificProject,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while fetching project details!",
      error,
    });
  }
};
export const getProjectByUserId = async (req, res) => {
  try {
    const projects = await ProjectModel.find({ user: req.params.id });
    res.status(200).send({
      success: true,
      message: "Project Details",
      data: projects,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while fetching project details!",
      error,
    });
  }
};
