import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNote } from "../../actions/NoteAction";
import Loading from "../../components/notes/Loading";
import MainScreen from "../../components/notes/MainScreen";
import ErrorMessage from "../../components/notes/ErrorMessage";
import LeftSideSup from "../../components/left/LeftSideSup";
import LeftSide from ".././../components/left/LeftSide";
import ReactMarkdown from "react-markdown";
import TopBar from "../../components/topBar/TopBar";
const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const noteCreate = useSelector((state) => state.noteReducer);
  const { loading, note, error } = noteCreate;

  const navigate = useNavigate();
  console.log(note);
  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createNote(user._id, title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    navigate("/notes");
  };

  //   useEffect(() => {}, []);
  return (
    <>
      <TopBar />
      <main>
        <div className="Container">
          {user.isSupervisor ? <LeftSideSup /> : <LeftSide />}
          <div className="middle">
            <MainScreen title="Create a Note">
              <Card className="note">
                <Card.Header>Create a new Note</Card.Header>
                <Card.Body>
                  <Form onSubmit={submitHandler}>
                    {error && (
                      <ErrorMessage variant="danger">
                        Please Fill all the fields
                      </ErrorMessage>
                    )}
                    <Form.Group controlId="title">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        value={title}
                        placeholder="Enter the title"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="content">
                      <Form.Label>Content</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={content}
                        placeholder="Enter the content"
                        rows={4}
                        onChange={(e) => setContent(e.target.value)}
                      />
                    </Form.Group>
                    {content && (
                      <Card className="note">
                        <Card.Header>Note Preview</Card.Header>
                        <Card.Body>
                          <ReactMarkdown>{content}</ReactMarkdown>
                        </Card.Body>
                      </Card>
                    )}

                    <Form.Group controlId="content">
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        type="content"
                        value={category}
                        placeholder="Enter the Category"
                        onChange={(e) => setCategory(e.target.value)}
                      />
                    </Form.Group>
                    {loading && <Loading size={50} />}
                    <Button className="my-4" type="submit" variant="primary">
                      Save Note
                    </Button>
                    <Button
                      className="mx-2 my-4"
                      onClick={resetHandler}
                      variant="danger"
                    >
                      Reset Fields
                    </Button>
                  </Form>
                </Card.Body>

                <Card.Footer className="text-muted">
                  Creating on - {new Date().toLocaleDateString()}
                </Card.Footer>
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

export default CreateNote;
