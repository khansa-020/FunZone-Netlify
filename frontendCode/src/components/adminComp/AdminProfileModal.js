import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import "../../components/profileModal.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { updateUser, deleteUser } from "../../actions/UserAction";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../pages/Firebase";
import { message } from "antd";

const AdminProfileModal = ({ modalOpened, setModalOpened, data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const ImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      e.target.name === "profilePicture"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };
  const allowedImageTypes = ["jpg", "png", "jpeg"];

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    let UserData = formData;

    const validateImageType = (file) => {
      const fileType = file.name.split(".").pop().toLowerCase();
      return allowedImageTypes.includes(fileType);
    };

    const uploadImageToFirebase = async (image) => {
      const fileName = Date.now() + image.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);

      try {
        await uploadBytesResumable(storageRef, image);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
      } catch (error) {
        console.log("Error uploading image to Firebase:", error);
        message.error("Error! Please try later!");
        setLoading(false);
        throw error;
      }
    };

    try {
      if (profileImage) {
        if (validateImageType(profileImage)) {
          const profilePictureURL = await uploadImageToFirebase(profileImage);
          UserData.profilePicture = profilePictureURL;
        } else {
          message.error("Only png, jpg, jpeg formats are allowed!");
          setLoading(false);
          // Display error or show a message to the user
          return;
        }
      }

      if (coverImage) {
        if (validateImageType(coverImage)) {
          const coverPictureURL = await uploadImageToFirebase(coverImage);
          UserData.coverPicture = coverPictureURL;
        } else {
          console.log("Invalid image type for coverImage");
          message.error("Only png, jpg, jpeg formats are allowed!");
          setLoading(false);
          // Display error or show a message to the user
          return;
        }
      }

      await dispatch(updateUser(user._id, UserData));
      setModalOpened(false);
      setLoading(false);
      message.success("Profile updated Successfully!");
    } catch (error) {
      console.log("Error updating user:", error);
      message.error("Error in updating profile");
    }
  };
  const handleDelete = (e) => {
    e.preventDefault();

    dispatch(deleteUser(params.id));
    setModalOpened(false);
    navigate("/auth");
  };
  return (
    <div className="profMod">
      <Modal
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        size="55%"
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      >
        {/* Modal content */}
        <form className="infoForm">
          <h3>Your info</h3>
          <div>
            <input
              type="text"
              className="infoInput"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={formData.username}
            />
          </div>
          <div>
            <input
              type="email"
              className="infoInput"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
            />
          </div>

          <div>
            <input
              type="text"
              className="infoInput"
              name="worksAt"
              placeholder="Works At"
              onChange={handleChange}
              value={formData.worksAt}
            />
          </div>
          <div>
            <input
              type="text"
              className="infoInput"
              name="workStatus"
              placeholder="Work Status"
              onChange={handleChange}
              value={formData.workStatus}
            />
          </div>

          <div>
            Profile Image
            <input type="file" name="profilePicture" onChange={ImageChange} />
          </div>
          {/* <button className="butn info-butn" onClick={handleSubmit}>
            Update
          </button> */}
          <input
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            value={loading ? "Updating..." : "Update"}
            className="butn info-butn"
          />

          {/* <button className="butn info-butn" onClick={handleDelete}>Delete</button> */}
        </form>
      </Modal>
    </div>
  );
};

export default AdminProfileModal;
