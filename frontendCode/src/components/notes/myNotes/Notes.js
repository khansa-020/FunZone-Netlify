import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { Badge } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Accordion } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteNote, listNotes } from "../../../actions/NoteAction";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";
// import notes from "../dummyNotes";
import MainScreen from "../MainScreen";
import LeftSideSup from "../../../components/left/LeftSideSup";
import "./notes.css";
import RightSide from "../../right/RightSide";
import LeftSide from "../../left/LeftSide";
const Notes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchNotes, setSearchNotes] = useState("");
  const [modal2Open, setModal2Open] = useState(false);
  const [recordId, setRecordId] = useState(null);
  const { user } = useSelector((state) => state.authReducer.authData);
  const noteList = useSelector((state) => state.noteReducer);
  const { loading, notes, error } = noteList;
  // const loading = useSelector((state) => state.noteReducer.loading);
  // const notes = useSelector((state) => state.noteReducer.notes);
  // const error = useSelector((state) => state.noteReducer.error);
  const noteCreate = useSelector((state) => state.noteReducer);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteReducer);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteReducer);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = noteDelete;

  const deleteHandler = (id) => {
    // if (window.confirm("Are you sure?")) {
    dispatch(deleteNote(id));
    // }
  };
  const handleClick = (id) => {
    deleteHandler(id);
    setModal2Open(false);
  };
  useEffect(() => {
    dispatch(listNotes(user._id));
    if (!user) {
      navigate("/home");
    }
  }, [dispatch, successCreate, navigate, user, successUpdate, successDelete]);

  return (
    <>
      <nav style={{ backgroundColor: "#fff", height: "9vh", padding: "1%" }}>
        <div className="Container">
          <h2 className="logo">FunZone</h2>
          <div className="search-bar">
            <i className="uil uil-search"></i>
            <input
              type="search"
              placeholder="Search Notes"
              onChange={(e) => setSearchNotes(e.target.value)}
            />
          </div>
          <div className="create">
            <Link to="/createnote" className="butn butn-primary">
              Create Note
            </Link>

            {/* <div className="profile-picture">
              <img
                src={
                  user.profilePicture
                    ? serverPublic + user.profilePicture
                    : serverPublic + "defaultProfile.png"
                }
                alt="profileImg"
              />
            </div> */}
          </div>
        </div>
      </nav>
      <main>
        <div className="Container">
          {user.isSupervisor ? <LeftSideSup /> : <LeftSide />}
          <div className="middle">
            <MainScreen title={"My Notes"}>
              <Link to="/createnote">
                <Button
                  style={{ marginLeft: "10px", marginBottom: "6px" }}
                  size="lg"
                >
                  Create New Note
                </Button>
              </Link>
              {errorDelete && (
                <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
              )}
              {loadingDelete && <Loading />}
              {error && (
                <ErrorMessage variant="danger">
                  {error} {/*children */}
                </ErrorMessage>
              )}
              {loading && <Loading />}
              {notes
                ?.reverse()
                .filter((filteredNote) =>
                  filteredNote.title
                    .toLowerCase()
                    .includes(searchNotes.toLowerCase())
                )
                .map((note) => (
                  <Accordion
                    defaultActiveKey="0"
                    flush
                    style={{ margin: "10px" }}
                  >
                    <Accordion.Item eventKey="0">
                      <Accordion.Header style={{ display: "flex" }}>
                        <span
                          style={{
                            color: "black",
                            fontWeight: "600",
                            textDecoration: "none",
                            flex: 1,
                            cursor: "pointer",
                            alignSelf: "center",
                            fontSize: "1.25rem",
                          }}
                        >
                          {note.title}
                        </span>

                        <div>
                          <Button href={`/note/${note._id}`} variant="success">
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            className="mx-2"
                            onClick={() => {
                              setRecordId(note._id);
                              setModal2Open(true);
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <Card className="note" style={{ margin: "10px" }}>
                          <Card.Body
                            style={{ backgroundColor: "rgb(239 233 253)" }}
                          >
                            <h3>
                              <Badge bg="success">
                                Category - {note.category}
                              </Badge>
                            </h3>
                            <blockquote className="blockquote mb-0">
                              <p>{note.content}</p>
                              <footer className="blockquote-footer">
                                Created On{" "}
                                <cite title="SourceTitle">
                                  {note.createdAt.substring(0, 10)}
                                </cite>
                              </footer>
                            </blockquote>
                          </Card.Body>
                        </Card>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                ))}

              {/*  children */}
            </MainScreen>
          </div>
          {/* <RightSide /> */}
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

export default Notes;
