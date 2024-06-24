import TaskModel from "../Models/TaskModal.js";
import UserModel from "../Models/userModel.js";
import nodemailer from "nodemailer";
export const notifyTask = async (username, email) => {
  console.log("inside", email, username);
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
      to: "roshnikhalid13@gmail.com",
      subject:
        "Task Assigned: Please Check Your FunZone Student Portal for Details",
      html: `<p>Dear ${username}, We hope this email finds you well. We wanted to inform you that your supervisor has assigned a new task to you. Kindly log in to your student portal to access and review the task details. <br>
      Best regards,<br>
      FunZone Site Administration</p>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("here");
      } else {
        console.log("Email has been sent:- ", info.response);
      }
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
export const addTask = async (req, res) => {
  const id = req.params.id; // logged in user

  try {
    const { title, description, dueDate } = req.body;

    // Fetch the user details from the UserModel
    const user = await UserModel.findById(id);

    // If the user is found, proceed to create the task
    if (user) {
      const task = new TaskModel({
        user: user._id,
        title,
        description,
        dueDate,
      });

      await task.save();

      res.status(200).send({
        success: true,
        message: "Task Added!",
        data: task,
      });
      await notifyTask(user.username, user.email);
      console.log("username", user.username);
    } else {
      res.status(404).send({
        success: false,
        message: "User not found!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while Adding a Task!",
      error,
    });
  }
};

export const getTasksById = async (req, res) => {
  const id = req.params.id; //logged in user
  try {
    const tasks = await TaskModel.find({ user: id });
    res.status(200).send({
      success: true,
      data: tasks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while Fetching Tasks!",
      error,
    });
  }
};
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params; // specific task
    const { completed } = req.body;
    const task = await TaskModel.findByIdAndUpdate(
      id,
      { completed, completedDate: Date.now() },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Task marked as Completed!",
      data: task,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while Updating a Task!",
      error,
    });
  }
};
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params; // specific task
    await TaskModel.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: "Task Deleed!",
      data: task,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while Deleting a Task!",
      error,
    });
  }
};
