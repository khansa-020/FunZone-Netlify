import React from "react";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  showLoading,
  hideLoading,
} from "../../store/Meetingfeatures/alertSlice";
import axios from "axios";
import moment from "moment";

const RightPlace = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        "http://localhost:5000/user/addsupervisor",
        {
          ...values,
          userId: user._id,
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
        },
        config
      );
      dispatch(hideLoading());
      if (res.data.success) {
        // message.success(res.data.success);
        message.success("Applied Successfully");
        navigate("/");
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };
  return (
    <>
      <div>
        <h1 className="text-center">Request for Supervisor's Account</h1>
        <Form layout="vertical" onFinish={handleFinish} className="m-3">
          <h3 className="text-muted">Personal Details :</h3>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Username"
                name="username"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Name" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                required
                rules={[{ required: true }]}
              >
                <Input type="email" placeholder="Email" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Contact"
                name="contact"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Contact" />
              </Form.Item>
              <Form.Item
                label="Designation"
                name="designation"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Designation" />
              </Form.Item>
            </Col>
          </Row>

          <h3 className="text-muted">Professional Details :</h3>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Department"
                name="department"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="department" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Timings"
                name="timings"
                required
                rules={[{ required: true }]}
              >
                <TimePicker.RangePicker format="HH:mm" />
              </Form.Item>
              <div className="d-flex justify-content-end">
                <button className="btn btn-primary" type="submit">
                  Add
                </button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default RightPlace;
