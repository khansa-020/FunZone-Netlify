import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);
// Routes
import AuthRoute from "./Routes/AuthRoute.js";
import UserRoute from "./Routes/UserRoute.js";
import PostRoute from "./Routes/PostRoute.js";
import UploadRoute from "./Routes/UploadRoute.js";
import FileRoute from "./Routes/FileRoute.js";
import ProjRoute from "./Routes/ProjRoute.js";
import VideoUploadRoute from "./Routes/VideoUploadRoute.js";
import ChatRoute from "./Routes/ChatRoute.js";
import MessageRoute from "./Routes/MessageRoute.js";
import NoteRoute from "./Routes/NoteRoute.js";
import AdminRoute from "./Routes/AdminRoute.js";
import SupervisorRoute from "./Routes/SupervisorRoute.js";
import GeneralRoute from "./Routes/GeneralRoute.js";
import MangementRoute from "./Routes/MangementRoute.js";
import ProjectRoute from "./Routes/ProjectRoute.js";
import TaskRoute from "./Routes/TaskRoute.js";
import morgan from "morgan";
// import pathk from "path";
import { VerifyMail } from "./Controllers/AuthController.js";
// dotenv.config({path:'./config.env'});
dotenv.config();
const app = express();
const mongoURI = process.env.DATABASE;

// access static files // deployment
// app.use(express.static(path.join(__dirname, './frontend/build')))
// app.get('*', function(req,res){
//   res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
// })
const port = process.env.PORT || 5001;
// Set the view engine to ejs
app.set("view engine", "ejs");
// to serve images for public
app.use(express.static("public"));
app.use("/images", express.static("images"));
app.use("/videos", express.static("videos"));
// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(morgan("common"));
app.use(cors());

mongoose.connect(mongoURI, () => {
  console.log("connection successful");
});
const server = app.listen(port, function () {
  console.log(`Server started on port ${port}!`);
});
const io = require("socket.io")(server, {
  pingTimeout: 60000, // if no msg snd in 60 secs then connection will close to save the bandwidth
  cors: {
    origin: "http://localhost:3000",
  },
});
io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });
  // when we click on any of the chat it will create room with that chat with a particular user

  socket.on("join chat", (room) => {
    socket.join(room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  // sending message in real time
  socket.on("newmessage", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
// usage of routes
app.get("/verify/:id", VerifyMail);
app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/post", PostRoute);
app.use("/upload", UploadRoute);
app.use("/projupload", ProjRoute);
app.use("/fileupload", FileRoute);
app.use("/vupload", VideoUploadRoute);
app.use("/chat", ChatRoute);
app.use("/message", MessageRoute);
app.use("/notes", NoteRoute);
app.use("/admin", AdminRoute);
app.use("/supervisor", SupervisorRoute);

// routes specifically for admin panel

app.use("/general", GeneralRoute);
app.use("/management", MangementRoute);
app.use("/projects", ProjectRoute);
app.use("/tasks", TaskRoute);
