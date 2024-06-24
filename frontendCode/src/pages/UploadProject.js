import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { message } from "antd";
import TopBar from "../components/topBar/TopBar";
import LeftSide from "../components/left/LeftSide";
import "./uploadProj.css";
import ProjInfo from "../components/ProjInfo";
import app from "../pages/Firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const UploadProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [posterImg, setPosterImg] = useState(null);
  const [file, setFile] = useState(null);
  const [video, setVideo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.authReducer.authData);

  const allowedFileTypes = ["apk", "pdf", "docx", "mp4", "gif"];
  const allowedImageTypes = ["png", "jpg", "jpeg"];
  const allowedVideoTypes = ["mp4"];

  const handlePosterImgChange = (event) => {
    setPosterImg(event.target.files[0]);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleVideoChange = (event) => {
    setVideo(event.target.files[0]);
  };
  const reset = () => {
    setFile(null);
    setVideo(null);
    setPosterImg(null);
    setCategory("");
    setDescription("");
    setTitle("");
  };

  const handleFileSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    try {
      // Step 1: Upload poster image to Firebase Storage (if it exists and is of allowed type)
      let posterDownloadURL = null;
      if (
        posterImg &&
        allowedImageTypes.includes(
          posterImg?.name.split(".").pop().toLowerCase()
        )
      ) {
        const posterFileName = new Date().getTime() + posterImg?.name;
        const posterStorage = getStorage(app);
        const posterRef = ref(posterStorage, posterFileName);
        const posterUploadTask = uploadBytesResumable(posterRef, posterImg);

        // Show loading state while uploading
        setLoading(true);

        // Wait for the upload to complete and get the download URL
        await posterUploadTask;
        posterDownloadURL = await getDownloadURL(posterRef);

        console.log("Poster Download URL:", posterDownloadURL);

        formData.append("posterImg", posterDownloadURL);
      } else if (posterImg) {
        // Invalid file type for poster image
        throw new Error("Invalid file type for poster image");
      }

      // Step 2: Upload video to Firebase Storage (if it exists and is of allowed type)
      let videoDownloadURL = null;
      if (
        video &&
        allowedVideoTypes.includes(video?.name.split(".").pop().toLowerCase())
      ) {
        const videoFileName = new Date().getTime() + video?.name;
        const videoStorage = getStorage(app);
        const videoRef = ref(videoStorage, videoFileName);
        const videoUploadTask = uploadBytesResumable(videoRef, video);

        // Show loading state while uploading
        setLoading(true);

        // Wait for the upload to complete and get the download URL
        await videoUploadTask;
        videoDownloadURL = await getDownloadURL(videoRef);

        console.log("Video Download URL:", videoDownloadURL);

        formData.append("video", videoDownloadURL);
      } else if (video) {
        // Invalid file type for video
        throw new Error("Invalid file type for video");
      }

      // Step 3: Upload file to Firebase Storage (if it exists and is of allowed type)
      let fileDownloadURL = null;
      if (
        file &&
        allowedFileTypes.includes(file?.name.split(".").pop().toLowerCase())
      ) {
        const fileFileName = new Date().getTime() + file?.name;
        const fileStorage = getStorage(app);
        const fileRef = ref(fileStorage, fileFileName);
        const fileUploadTask = uploadBytesResumable(fileRef, file);

        // Show loading state while uploading
        setLoading(true);

        // Wait for the upload to complete and get the download URL
        await fileUploadTask;
        fileDownloadURL = await getDownloadURL(fileRef);

        console.log("File Download URL:", fileDownloadURL);

        formData.append("file", fileDownloadURL);
      } else if (file) {
        // Invalid file type for file
        throw new Error("Invalid file type for file");
      }

      // Step 4: Save the project in MongoDB with the appropriate fields based on file types
      setLoading(true);
      // reset();
      await axios.post(
        `http://localhost:5000/projupload/${user._id}/addproject`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      reset();
      setLoading(false);
      message.success("Project uploaded successfully!");
      console.log("Project");
    } catch (error) {
      if (error.message) {
        setError(error.message);
        message.error(error.message);
      } else {
        setError("Error uploading file!");
      }
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  // ...

  // ...

  return (
    <>
      <TopBar />
      <main>
        <div className="Container">
          <LeftSide />
          <div className="middle">
            <form
              className="projForm"
              onSubmit={handleFileSubmit}
              encType="multipart/form-data"
            >
              <label className="projLabel">
                Title:
                <input
                  className="projInput"
                  type="text"
                  value={title}
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </label>
              <br />
              <label className="projLabel">
                Description:
                <input
                  className="projInput"
                  value={description}
                  name="description"
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </label>
              <br />
              <label className="projLabel">
                Category:
                <select
                  className="projInput"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">-- Select Category --</option>
                  <option value="game development">Game Development</option>
                  <option value="digital arts">Digital Arts</option>
                </select>
              </label>
              <br />
              <label className="projLabel">
                Poster Image:
                <input
                  className="projInput"
                  type="file"
                  name="posterImg"
                  onChange={handlePosterImgChange}
                />
              </label>
              <br />
              <label className="projLabel">
                File:
                <input
                  className="projInput"
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                />
              </label>
              <br />
              <label className="projLabel">
                Video:
                <input
                  className="projInput"
                  type="file"
                  name="video"
                  onChange={handleVideoChange}
                />
              </label>
              <br />

              <input
                type="submit"
                disabled={loading}
                value={loading ? "Uploading..." : "Upload"}
                className="butn butn-primary projbtn"
              ></input>
            </form>
          </div>
          {/* <RightSide /> */}
          <ProjInfo />
        </div>
      </main>
    </>
  );
};

export default UploadProject;
