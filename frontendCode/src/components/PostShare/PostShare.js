import React, { useState, useRef } from "react";
import profile from "../../images/defaultProfile.png";
import { message } from "antd";
import "../PostShare/postShare.css";
import {
  UilScenery,
  UilPlayCircle,
  UilAndroidAlt,
  UilSchedule,
  UilTimes,
} from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadImage,
  uploadPost,
  uploadVideo,
} from "../../actions/UploadActions";
import app from "../../pages/Firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import axios from "axios";
import { Modal } from "react-bootstrap";
const PostShare = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [file, setFile] = useState(null);
  // const [userId, setUserId] = useState("");
  const [success, setSuccess] = useState(false);
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const { user } = useSelector((state) => state.authReducer.authData);
  const imageRef = useRef();
  const videoRef = useRef();
  // const fileRef = useRef();
  const dispatch = useDispatch();
  const desc = useRef();
  const [progressVideoUpload, setProgressVideoUpload] = useState(false);
  const [progressImageUpload, setProgressImageUpload] = useState(false);
  const [uploadInProgress, setUploadInProgress] = useState(false);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const allowedFileTypes = ["apk", "pdf", "docx", "mp4", "gif"];

  const handleFileSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", user._id);

    try {
      // Upload file to Firebase Storage (if it exists and is of allowed type)
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
        setUploadInProgress(true);

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
      setUploadInProgress(true);
      // reset();
      await axios.post("http://localhost:5000/fileupload/upload", formData);
      reset();
      setUploadInProgress(false);
      setSuccess("Project uploaded successfully!");
      console.log("Project");
    } catch (error) {
      if (error.message) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Error uploading file!");
      }
    } finally {
      setUploadInProgress(false); // Hide loading state
    }
  };

  // ...

  // Render a loading indicator while upload is in progress
  {
    uploadInProgress && <div>Loading...</div>;
  }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };
  const onVideoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let vid = event.target.files[0];
      setVideo(vid);
    }
  };
  const reset = () => {
    setImage(null);
    setVideo(null);
    desc.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      posterBy: user.username,
      desc: desc.current.value,
    };
    if (image) {
      if (!image.type.startsWith("image/")) {
        // Display error message for invalid image format
        message.error("Invalid format.");
        return;
      }
      const fileName = new Date().getTime() + image.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgressImageUpload(true);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              console.log("Failed to upload");
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        async () => {
          // Handle successful uploads on complete
          try {
            const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("Image available at", imageUrl);
            newPost.image = imageUrl;
            console.log(newPost.image);
            setProgressImageUpload(false);
            dispatch(uploadPost(newPost));
            reset();
            alert("Post uploaded successfully");
            window.location.reload(true);
          } catch (error) {
            console.log("Error getting image URL:", error);
          }
        }
      );
    }

    if (video) {
      if (!video.type.startsWith("video/")) {
        // Display error message for invalid video format
        message.error("Invalid format.");
        return;
      }
      const fileName = new Date().getTime() + video?.name;
      const storage = getStorage(app);
      const StorageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(StorageRef, video);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgressVideoUpload(true);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              console.log("failed to upload");
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              console.log("File available at", downloadURL);
              // const data=new FormData();
              // data.append("name", fileName);
              // data.append("file", video);
              newPost.video = downloadURL;
              console.log(newPost.video);
              console.log(`this is url ${downloadURL}`);
              setProgressVideoUpload(false);
            })
            .then((data) => {
              dispatch(uploadPost(newPost));
              reset();
              alert("Post uploaded successfully");
              window.location.reload(true);
            });
        }
      );
    }
    if (!image && !video) {
      dispatch(uploadPost(newPost));
      reset();
    }
  };

  return (
    <>
      <div className="postShare">
        {/* <div className="profile-picture"> */}
        <img
          src={user.profilePicture ? `${user.profilePicture}` : profile}
          alt="profileImg"
        />
        {/* </div> */}
        <div>
          <input
            ref={desc}
            required
            type="text"
            placeholder="What's on your mind?"
          />
          <div className="postOptions">
            <div
              className="option"
              style={{ color: "#51ed51" }}
              onClick={() => imageRef.current.click()}
            >
              <UilScenery />
              Photo
            </div>
            <div
              className="option"
              style={{ color: "orange" }}
              onClick={() => videoRef.current.click()}
            >
              <UilPlayCircle />
              Video
            </div>
            <div
              className="option"
              style={{ color: "#bd4ff5" }}
              onClick={handleShow}
            >
              <UilAndroidAlt />
              Apk
            </div>
            <div
              className="option"
              style={{ color: "#5c5cf3" }}
              // onClick={() => fileRef.current.click()}
              onClick={handleShow}
            >
              <UilSchedule />
              Docs
            </div>
            {/* <button className='butn butn-primary' onClick={handleSubmit} disabled={loading}>{loading?"Uploading...":"Share"}</button> */}
            <input
              type="submit"
              onClick={handleSubmit}
              disabled={loading || progressVideoUpload || progressImageUpload}
              value={
                loading || progressVideoUpload || progressImageUpload
                  ? "Uploading..."
                  : "Share"
              }
              className="butn butn-primary"
            ></input>
            <div style={{ display: "none" }}>
              <input
                type="file"
                name="myImage"
                ref={imageRef}
                onChange={onImageChange}
              />
              <input
                type="file"
                name="myVideo"
                ref={videoRef}
                onChange={(e) => [setVideo(e.target.files[0])]}
              />
            </div>
          </div>
          {image && (
            <div className="previewImage">
              <UilTimes onClick={() => setImage(null)} />
              <img src={URL.createObjectURL(image)} alt="" />
            </div>
          )}
          {video && (
            <div className="previewImage">
              <UilTimes onClick={() => setVideo(null)} />
              <img src={URL.createObjectURL(video)} alt="" />
            </div>
          )}
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {success && (
              <p className="text-success">File uploaded successfully</p>
            )}
            {errorMessage && <div className="text-danger">{errorMessage}</div>}
            <form onSubmit={handleFileSubmit}>
              <div className="form-group">
                <label htmlFor="fileInput">Choose a file:</label>
                <input
                  type="file"
                  className="form-control-file"
                  id="fileInput"
                  onChange={handleFileChange}
                />
              </div>
              <br />

              <input
                type="submit"
                disabled={uploadInProgress}
                value={uploadInProgress ? "Uploading..." : "Upload"}
                className="btn btn-primary"
              ></input>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
        Close
    </Button>
    <Button variant="primary" onClick={handleClose}>
        Save Changes
    </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PostShare;
