import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Card } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteNote, updueDateNote } from "../../actions/NoteAction";
import ErrorMessage from "../../components/notes/ErrorMessage";
import Loading from "../../components/notes/Loading";
import MainScreen from "../../components/notes/MainScreen";
import { useParams } from "react-router-dom";
import { message } from "antd";
import TopBar from "../../components/topBar/TopBar";
import LeftSideSup from "../../components/left/LeftSideSup";
const AssignTask = () => {
  // Get ID from URL
  const params = useParams();
  const [title, setTitle] = useState();
  const [description, setdescription] = useState();
  const [dueDate, setdueDate] = useState("");
  const [tasks, setTasks] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const assignTask = async (e) => {
    e.preventDefault();
    try {
      // send a POST request to the '/api/tasks' endpoint
      const res = await axios.post(
        `http://localhost:5000/tasks/${params.id}/addtask`,
        {
          title,
          description,
          dueDate,
        }
      );

      // add the new task to the tasks array
      setTasks([...tasks, res.data]);

      // reset the form fields
      setTitle("");
      setdueDate("");
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (err) {
      console.error(err);
      message.error("Please fill all the fields!");
    }
    navigate("/supervisor/students");
  };

  return (
    <>
      <TopBar />
      <main>
        <div className="Container">
          <LeftSideSup />
          <div className="middle">
            <MainScreen title="ADD TASK">
              <Card className="note">
                <Card.Header>{"Assign a task"}</Card.Header>
                <Card.Body>
                  <Form onSubmit={assignTask}>
                    <Form.Group controlId="title">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="title"
                        placeholder="Enter the title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="description">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Enter the breif description"
                        rows={4}
                        value={description}
                        onChange={(e) => setdescription(e.target.value)}
                      />
                    </Form.Group>
                    {description && (
                      <Card className="note">
                        <Card.Header>Task Preview</Card.Header>
                        <Card.Body>
                          <ReactMarkdown>{description}</ReactMarkdown>
                        </Card.Body>
                      </Card>
                    )}

                    <Form.Group controlId="dueDate">
                      <Form.Label>DueDate</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Enter a dueDate"
                        value={dueDate}
                        onChange={(e) => setdueDate(e.target.value)}
                      />
                    </Form.Group>

                    <Button className="my-2" variant="success" type="submit">
                      Assign
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </MainScreen>
          </div>
          {/* <RightSide /> */}
          {/* <AddStudent /> */}
        </div>
      </main>
    </>
  );
};

export default AssignTask;
