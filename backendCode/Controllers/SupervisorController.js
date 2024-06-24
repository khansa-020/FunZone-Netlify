import MeetingModel from "../Models/MeetingModel.js";
import SupervisorModel from "../Models/supervisorModel.js";
import UserModel from "../Models/userModel.js";

export const getSupervisor = async (req, res) => {
  try {
    const supervisor = await SupervisorModel.findOne({
      userId: req.body.userId,
    });
    res.status(200).send({
      success: true,
      message: "Supervisor data fetched Successfully!",
      data: supervisor,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while fetching Supervisor Info",
      error,
    });
  }
};

// Update profile

export const updateSupervisor = async (req, res) => {
  try {
    const supervisor = await SupervisorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "Supervisor Profile updated Successfully!",
      data: supervisor,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while updating Supervisor Info",
      error,
    });
  }
};

export const getSupById = async (req, res) => {
  try {
    const supervisor = await SupervisorModel.findOne({
      _id: req.body.supervisorId,
    });
    res.status(200).send({
      success: true,
      message: "Supervisor Info fetched Successfully!",
      data: supervisor,
    });
    // console.log(supervisor);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while fetching Supervisor Info",
      error,
    });
  }
};

export const supervisorAppointments = async (req, res) => {
  try {
    const supervisor = await SupervisorModel.findOne({
      userId: req.body.userId,
    });
    const appointments = await MeetingModel.find({
      supervisorId: supervisor._id,
    });
    res.status(200).send({
      success: true,
      message: "Supervisor Meeting Appointments fetched Successfully!",
      data: appointments,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while fetching Supervisor Appointments",
      error,
    });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await MeetingModel.findByIdAndUpdate(appointmentsId, {
      status,
    });
    const user = await UserModel.findOne({ _id: appointments.userId });
    const notification = user.notification;
    notification.push({
      type: "Status-updated",
      message: `Meeting Appointment has been ${status}`,
      onClickPath: "/supervisorappointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Meeting Appointments status Updated Successfully!",
      // data: appointments,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while updatating  Appointment's Status!",
      error,
    });
  }
};

export const deleteAppointement = async (req, res) => {
  try {
    const deletedProject = await MeetingModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Appointment deleted successfully!",
      project: deletedProject,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while Deleting Appointment!",
      error,
    });
  }
};
