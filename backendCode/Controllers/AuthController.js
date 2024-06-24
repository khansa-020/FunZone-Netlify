import express from "express";
import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import VerificationModel from "../Models/VerificationModel.js";
import nodemailer from "nodemailer";

// Registeration

// export const registerUser = async (req, res) => {
//   // const {username, email, password}=req.body;

//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(req.body.password, salt);
//   req.body.password = hashedPassword;
//   const newUser = new UserModel(req.body);
//   const { email } = req.body;
//   try {
//     const userExists = await UserModel.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: "Email is already registered!" });
//       // return window.alert('Invalid Credentials');
//     }
//     const user = await newUser.save();
//     const token = jwt.sign(
//       {
//         email: user.email,
//         id: user._id,
//       },
//       process.env.JWT_KEY,
//       { expiresIn: "1h" }
//     );
//     res.status(200).json({ user, token });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// for sending mail

export const sendVerifyMail = async (username, email, userId) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "noorulainnoor2001@gmail.com",
        pass: "wkphemntormojhdu",
      },
    });
    const mailOptions = {
      from: "noorulainnoor2001@gmail.com",
      to: email,
      subject: "FunZone Account Verification",
      html: `<p> Hi ${username}, Please click <a href="http://localhost:5000/verify/${userId}">here</a> to verify your email address.</p>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email has been sent:- ", info.response);
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const VerifyMail = async (req, res) => {
  try {
    const verify = await VerificationModel.updateOne(
      { _id: req.params.id },
      { $set: { isVerified: true } }
    );
    return res.status(200).json("Verification Completed!");

    // console.log(verify);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//smtp check
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate username
  // if (/^\d/.test(username)) {
  //if (/\d$/.test(username)) { check if the username ends with a digit.
  //   return res
  //     .status(400)
  //     .json({ message: "Username cannot start with a number!" });
  // }
  if (/^\d/.test(username)) {
    return res
      .status(400)
      .json({ message: "Username cannot start with a number!" });
  }

  if (/[.,]/.test(username)) {
    return res
      .status(400)
      .json({ message: "Username cannot contain periods or commas!" });
  }

  // Validate password
  if (password.length < 8 || !/[!@#$%^&*]/.test(password)) {
    return res.status(400).json({
      message:
        "Password should be at least 8 characters long and contain a symbol or special character!",
    });
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format!" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new VerificationModel(req.body);

    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email is already registered!" });
    }

    const user = await newUser.save();
    sendVerifyMail(username, email, newUser._id);

    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    if (newUser.isVerified) {
      const newUserData = {
        username,
        email,
        password: hashedPassword,
        isVerified: true,
      };
      const newUserModel = new UserModel(newUserData);
      await newUserModel.save();
      console.log("UserModel record saved!");
    }

    VerificationModel.watch().on("change", async () => {
      const updatedVerification = await VerificationModel.findById(newUser._id);
      if (updatedVerification && updatedVerification.isVerified) {
        const updatedUser = new UserModel({
          username,
          email,
          password: hashedPassword,
          isVerified: true,
        });
        await updatedUser.save();
        // console.log(`UserModel record saved: ${updatedUser}`);
        await VerificationModel.findByIdAndDelete(newUser._id);
        console.log("VerificationModel record deleted!");
      }
    });

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// login user

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      if (user.status === "deactivate") {
        // Check user status
        res.status(403).json("Your account is currently deactivated by admin");
      } else {
        const verify = await bcrypt.compare(password, user.password);
        if (!verify) {
          res.status(400).json("Invalid credentials");
        } else {
          const token = jwt.sign(
            {
              email: user.email,
              id: user._id,
            },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
          );
          res.status(200).json({ user, token });
        }
      }
    } else {
      res.status(404).json("User does not exist");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await UserModel.findOne({ email: email });
//     if (user) {
//       const verify = await bcrypt.compare(password, user.password);
//       if (!verify) {
//         res.status(400).json("Invalid credentials");
//         window.alert("Invalid Credentials");
//       } else {
//         const token = jwt.sign(
//           {
//             email: user.email,
//             id: user._id,
//           },
//           process.env.JWT_KEY,
//           { expiresIn: "1h" }
//         );
//         if (user.isSupervisor) {
//           res.redirect("/http://localhost:3000/home");
//         } else if (user.isAdministrator) {
//           // res.redirect("http://localhost:3000/admin");
//           window.location.replace("http://localhost:3000/admin");
//         } else {
//           res.redirect("http://localhost:3000/stDashboard");
//         }
//       }
//     } else {
//       res.status(404).json("User does not exist");
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const changeAccountStatusDeactivate = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: `${user.status}!`,
      status: user.status,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while dectivating user",
      error,
    });
  }
};
