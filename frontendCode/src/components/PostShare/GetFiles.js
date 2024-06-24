import { message, Table, Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LeftSide from "../left/LeftSide";
import TopBar from "../topBar/TopBar";

const GetFiles = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [modal2Open, setModal2Open] = useState(false);
  const [recordId, setRecordId] = useState(null);
  const handleGetFiles = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/fileupload/files/${user._id}`
      );
      if (res.data.success) {
        setFiles(res.data.data);
      }
    } catch (error) {
      console.log(error);
      setError("Error getting files");
    }
  };
  const handleFileDownload = (fileId, fileName) => {
    axios({
      url: `http://localhost:5000/fileupload/download/${fileId}`,
      method: "GET",
      responseType: "blob", // important
      params: {
        fileId: fileId, // the ID of the file you want to download
      },
    })
      .then((response) => {
        const filename = fileName;
        //   response.headers["content-disposition"] &&
        //   response.headers["content-disposition"].split("filename=")[1];
        // check if the header is present before accessing its value
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
      })
      .then((response) => {
        // create a URL object from the blob
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // create a link element and set its href attribute to the URL
        const link = document.createElement("a");
        link.href = url;

        // set the download attribute to the file name
        link.setAttribute(
          "download",
          response.headers["content-disposition"].split("filename=")[1]
        );

        // simulate a click on the link to trigger the download
        link.click();
      })
      .catch((error) => {
        console.error(error);
        setError("Error downloading file");
      });
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/fileupload/${id}`
      );

      if (response.data.success) {
        message.success(response.data.message);
      }
      // Filter out the deleted user from the users array
      const updatedFiles = files.filter((file) => file._id !== id);
      // Update the users state with the filtered array
      setFiles(updatedFiles);
    } catch (error) {
      console.error(error);
      message.error("Error deleting File!");
    }
  };
  const handleClick = (id) => {
    handleDelete(id);
    setModal2Open(false);
  };
  useEffect(() => {
    handleGetFiles();
  }, []);
  // antd table col

  const columns = [
    {
      title: "FileName",
      dataIndex: "filename",
      render: (text, record) => <span>{record.filename}</span>,
    },
    // {
    //   title: "Format",
    //   dataIndex: "format",
    //   render: (text, record) => <span>{record.format}</span>,
    // },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button
            // href={`/task/${record._id}`}
            className="btn btn-success  m-2"
            onClick={() => handleFileDownload(record._id, record.filename)}
          >
            Download
          </button>
          <button
            // href={`/task/${record._id}`}
            className="btn btn-danger m-2"
            onClick={() => {
              setRecordId(record._id);
              setModal2Open(true);
            }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];
  return (
    <>
      <TopBar />
      <main>
        <div className="Container">
          <LeftSide />
          <div className="middle">
            <h1
              className="text-center m-2"
              style={{ padding: "2% 0", fontWeight: "600" }}
            >
              My Files
            </h1>
            <br />
            {error && <div>{error}</div>}

            <Table
              style={{ margin: "0 1%" }}
              columns={columns}
              dataSource={files}
            />
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
        <p>Are you sure, you want to delete this File permanently?</p>
      </Modal>
    </>
  );
};

export default GetFiles;
