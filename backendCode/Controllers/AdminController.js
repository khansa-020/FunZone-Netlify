import MeetingModel from "../Models/MeetingModel.js";
import ProjectModel from "../Models/projectModel.js";
import SupervisorModel from "../Models/supervisorModel.js";
import UserModel from "../Models/userModel.js";
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({
      isAdministrator: false,
      isSupervisor: false,
    });
    res.status(200).send({
      success: true,
      message: "Users data list",
      data: users,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while fetching Users data",
      error,
    });
  }
};

export const getAllSupervisors = async (req, res) => {
  try {
    const supervisors = await SupervisorModel.find({});
    res.status(200).send({
      success: true,
      message: "Supervisors data list",
      data: supervisors,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error while fetching Supervisors data!",
      error,
    });
  }
};
export const getAllStudents = async (req, res) => {
  try {
    const supervisors = await UserModel.find({
      isSupervisor: false,
      isAdministrator: false,
    });
    res.status(200).send({
      success: true,
      message: "Students data list",
      data: supervisors,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while fetching Students data!",
      error,
    });
  }
};
export const getAllSupervisedStudents = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    const addedUserIds = user.mystudents;
    const addedUsers = await UserModel.find({ _id: { $in: addedUserIds } });
    res.json(addedUsers);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getAllApprovedSupervisors = async (req, res) => {
  try {
    const supervisors = await SupervisorModel.find({ status: "approved" });
    res.status(200).send({
      success: true,
      message: "Supervisors data list",
      data: supervisors,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error while fetching Supervisors data!",
      error,
    });
  }
};
// Approve supervisor request
export const changeAccountStatus = async (req, res) => {
  try {
    const { supervisorId, status } = req.body;
    const supervisor = await SupervisorModel.findByIdAndUpdate(supervisorId, {
      status,
    });
    const user = await UserModel.findOne({ _id: supervisor.userId });
    const notification = user.notification;
    notification.push({
      type: "supervisor-account-request-updated",
      message: `Your Supervisor Account Request has been${status}`,
      onClickPath: "/notification",
    });
    user.isSupervisor = status === "approved" ? true : false;
    await user.save();
    res.status(201).send({
      success: true,
      message: "Account Status Updated!",
      data: supervisor,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Account Status",
      error,
    });
  }
};
// list of meeting appointments
export const userAppointmentsList = async (req, res) => {
  try {
    const appointments = await MeetingModel.find({
      userId: req.body.userId,
    });
    res.status(200).send({
      success: true,
      message: "User's Meeting Appointments fetched Successfully!",
      data: appointments,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Meeting Appointments!",
      error,
    });
  }
};

export const totalStudents = async (req, res) => {
  try {
    // Query the database for the number of records in the MyModel schema
    const count = await UserModel.countDocuments({
      isSupervisor: false,
      isAdministrator: false,
    });

    // Return the count as a response to the API request
    res.send({ count });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ error: "An error occurred while processing your request." });
  }
};
export const totalSupervisors = async (req, res) => {
  try {
    // Query the database for the number of records in the MyModel schema
    const count = await UserModel.countDocuments({
      isSupervisor: true,
      isAdministrator: false,
    });

    // Return the count as a response to the API request
    res.send({ count });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ error: "An error occurred while processing your request." });
  }
};
export const totalProjectsGaming = async (req, res) => {
  try {
    // Query the database for the number of records in the MyModel schema
    const count = await ProjectModel.countDocuments({
      category: "game development",
    });

    // Return the count as a response to the API request
    res.send({ count });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ error: "An error occurred while processing your request." });
  }
};
export const totalProjectsDigitalArts = async (req, res) => {
  try {
    // Query the database for the number of records in the MyModel schema
    const count = await ProjectModel.countDocuments({
      category: "digital arts",
    });

    // Return the count as a response to the API request
    res.send({ count });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ error: "An error occurred while processing your request." });
  }
};
export const getAllGamingProjects = async (req, res) => {
  try {
    const users = await ProjectModel.find({
      category: "game development",
    });
    res.status(200).send({
      success: true,
      message: "Game Development Projects list",
      data: users,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while fetching Game Development Projects data",
      error,
    });
  }
};
export const getAllDigitalArtsProjects = async (req, res) => {
  try {
    const users = await ProjectModel.find({
      category: "digital arts",
    });
    res.status(200).send({
      success: true,
      message: "Digital Arts Projects list",
      data: users,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while fetching Digital Arts Projects data",
      error,
    });
  }
};

export const getProjectsCretedPerMonth = async (req, res) => {
  try {
    // Use aggregation pipeline to group projects by month and count them
    const projectCounts = await ProjectModel.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    res.json(projectCounts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export const getProjectsByCategories = async (req, res) => {
  try {
    // Use the $group operator to group projects by category and count them
    // const results = await ProjectModel.aggregate([
    //   { $group: { _id: "$category", count: { $sum: 1 } } },
    // ]);
    // res.json(results);
    const gameDevCount = await ProjectModel.countDocuments({
      category: "game development",
    });
    const digitalArtsCount = await ProjectModel.countDocuments({
      category: "digital arts",
    });
    const totalCount = gameDevCount + digitalArtsCount;
    res.json({ gameDevCount, digitalArtsCount, totalCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const getProjectsByCategoriesPieChart = async (req, res) => {
  try {
    const gameDevProjects = await ProjectModel.find({
      category: "game development",
    }).countDocuments();
    const digitalArtProjects = await ProjectModel.find({
      category: "digital arts",
    }).countDocuments();
    const totalProjects = gameDevProjects + digitalArtProjects;
    const gameDevPercentage = ((gameDevProjects / totalProjects) * 100).toFixed(
      2
    );
    const digitalArtPercentage = (
      (digitalArtProjects / totalProjects) *
      100
    ).toFixed(2);
    const data = [
      { category: "Game Development", percentage: gameDevPercentage },
      { category: "Digital Arts", percentage: digitalArtPercentage },
    ];
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const users = await ProjectModel.find({});
    res.status(200).send({
      success: true,
      message: "Projects list",
      data: users,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Projects data",
      error,
    });
  }
};
export const deleteProject = async (req, res) => {
  try {
    const deletedProject = await ProjectModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Project deleted successfully!",
      project: deletedProject,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while Deleting Project!",
      error,
    });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Record Deleted Successfully!",
      project: deletedUser,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while Deleting Record!",
      error,
    });
  }
};
export const deleteSupervisor = async (req, res) => {
  try {
    // Find the supervisor by _id
    const deletedSupervisor = await SupervisorModel.findByIdAndDelete(
      req.params.id
    );

    // If the supervisor exists, delete the user by _id
    if (deletedSupervisor) {
      const deletedUser = await UserModel.findByIdAndDelete(
        deletedSupervisor.userId
      );
      res.status(200).send({
        success: true,
        message: "Record Deleted Successfully!",
        user: deletedUser,
        supervisor: deletedSupervisor,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Supervisor not found!",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while Deleting Record!",
      error,
    });
  }
};

export const deleteSupervisorRequest = async (req, res) => {
  try {
    const deletedProject = await SupervisorModel.findByIdAndDelete(
      req.params.id
    );
    res.status(200).send({
      success: true,
      message: "Request Deleted Successfully!",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while Deleting Request!",
      error,
    });
  }
};

export const approveProjectForShowcase = async (req, res) => {
  try {
    const project = await ProjectModel.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: `${project.status}!`,
      status: project.status,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while Approving Project!",
      error,
    });
  }
};

// get all the approved projects to showcase

export const getAllApprovedProjects = async (req, res) => {
  try {
    const users = await ProjectModel.find({ status: "approved" });
    res.status(200).send({
      success: true,
      message: "Projects list",
      data: users,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Projects data",
      error,
    });
  }
};
