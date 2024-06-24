import { Col, Form, Input, message, Row, TimePicker, Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  hideLoading,
  showLoading,
} from "../../store/Meetingfeatures/alertSlice";

import moment from "moment";
import TopBar from "../../components/topBar/TopBar";
import LeftSideSup from "../../components/left/LeftSideSup";
const SupervisorProfile = () => {
  const { user } = useSelector((state) => state.authReducer.authData);

  const [supervisor, setSupervisor] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // update supervisor
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        "http://localhost:5000/supervisor/updatesupervisor",
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
        message.success(res.data.message);
        // message.success("Applied Successfully");
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
  // get supervisor details
  const getSupervisorInfo = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/supervisor/getsupervisor",
        { userId: params.id }
      );
      if (res.data.success) {
        // message.success(res.data.message);
        setSupervisor(res.data.data);
      }
    } catch (error) {
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    getSupervisorInfo();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <TopBar />
      <main>
        <div className="Container">
          <LeftSideSup />
          <div className="middle">
            <h1
              className="text-center m-2"
              style={{ padding: "2% 0", fontWeight: "600" }}
            >
              Edit Profile
            </h1>
            <br />

            {supervisor && (
              <Form
                layout="vertical"
                onFinish={handleFinish}
                className="m-3 custom-form" // Add a custom class for your form container
                initialValues={{
                  ...supervisor,
                  timings: [
                    moment(supervisor.timings[0], "HH:mm"),
                    moment(supervisor.timings[1], "HH:mm"),
                  ],
                }}
              >
                <h3 className="text-muted">Personal Details:</h3>
                <Row gutter={20}>
                  <Col xs={24} md={24} lg={12}>
                    {" "}
                    {/* Update the column span based on your preference */}
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
                  <Col xs={24} md={24} lg={12}>
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

                <h3 className="text-muted">Professional Details:</h3>
                <Row gutter={20}>
                  <Col xs={24} md={24} lg={12}>
                    <Form.Item
                      label="Department"
                      name="department"
                      required
                      rules={[{ required: true }]}
                    >
                      <Input type="text" placeholder="Department" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={24} lg={12}>
                    <Form.Item
                      label="Timings"
                      name="timings"
                      required
                      rules={[{ required: true }]}
                    >
                      <TimePicker.RangePicker format="HH:mm" />
                    </Form.Item>
                    <div className="d-flex justify-content-end">
                      <Button
                        className="btn btn-success"
                        type="primary"
                        htmlType="submit"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            )}
          </div>
          {/* <RightSide /> */}
          {/* <AddStudent /> */}
        </div>
      </main>
    </>
  );
};

export default SupervisorProfile;
