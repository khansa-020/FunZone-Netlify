import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Card } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useNavigate } from "react-router-dom";
import { deleteNote, updateNote } from "../../actions/NoteAction";
import ErrorMessage from "../../components/notes/ErrorMessage";
import Loading from "../../components/notes/Loading";
import MainScreen from "../../components/notes/MainScreen";
import { useParams } from "react-router-dom";
import TopBar from "../../components/topBar/TopBar";
import LeftSideSup from "../../components/left/LeftSideSup";
import LeftSide from ".././../components/left/LeftSide";
const UpdateSingleNote = () => {
  // Get ID from URL
  const params = useParams();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [date, setDate] = useState("");
  const [modal2Open, setModal2Open] = useState(false);
  const [recordId, setRecordId] = useState(null);

  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.authReducer.authData);
  const noteUpdate = useSelector((state) => state.noteReducer);
  const { loading, error } = noteUpdate;
  const { user } = useSelector((state) => state.authReducer.authData);
  const navigate = useNavigate();
  const noteDelete = useSelector((state) => state.noteReducer);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = noteDelete;

  const deleteHandler = (id) => {
    dispatch(deleteNote(id));

    navigate("/notes");
  };
  const handleClick = (id) => {
    deleteHandler(id);
    setModal2Open(false);
  };
  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/notes/${params.id}/specificnote`
      );

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    };

    fetching();
  }, [params.id, date]);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateNote(params.id, title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    navigate("/notes");
  };

  return (
    <>
      <TopBar />
      <main>
        <div className="Container">
          {user.isSupervisor ? <LeftSideSup /> : <LeftSide />}
          <div className="middle">
            <MainScreen title="Edit Note">
              <Card className="note">
                <Card.Header>Edit your Note</Card.Header>
                <Card.Body>
                  <Form onSubmit={updateHandler}>
                    {loadingDelete && <Loading />}
                    {errorDelete && (
                      <ErrorMessage variant="danger">
                        {errorDelete}
                      </ErrorMessage>
                    )}
                    {error && (
                      <ErrorMessage variant="danger">{error}</ErrorMessage>
                    )}
                    <Form.Group controlId="title">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="title"
                        placeholder="Enter the title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="content">
                      <Form.Label>Content</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Enter the content"
                        rows={4}
                        value={content}
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
                        placeholder="Enter the Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      />
                    </Form.Group>
                    {loading && <Loading size={50} />}
                    <Button className="my-4" variant="primary" type="submit">
                      Update Note
                    </Button>
                    <Button
                      className="mx-2 my-4"
                      variant="danger"
                      onClick={() => {
                        setRecordId(params.id);
                        setModal2Open(true);
                      }}
                    >
                      Delete Note
                    </Button>
                  </Form>
                </Card.Body>

                <Card.Footer className="text-muted">
                  Updated on - {date.substring(0, 10)}
                </Card.Footer>
              </Card>
            </MainScreen>
          </div>
          {/* <RightSide /> */}
          {/* <AddStudent /> */}
        </div>
      </main>

      <Modal
        title="Confirmation"
        okText="Delete"
        okType="danger"
        centered
        open={modal2Open}
        onOk={() => handleClick(recordId)}
        onCancel={() => {
          setModal2Open(false);
          setRecordId(null);
        }}
      >
        <p>Are you sure, you want to delete this Note permanently?</p>
      </Modal>
    </>
  );
};

export default UpdateSingleNote;
