import React, { useState, useEffect } from "react";
import axios from "axios";
import TableComponent from "../../components/TableComponent";
import AppModal from "../../components/AppModal";
import TextInput from "../../components/TextInput";
import { CircularProgress } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function ExamType() {
  const [examType, setExamType] = useState([]);
  const [createStatus, setCreateStatus] = useState(1);
  const [examTypeName, setExamTypeName] = useState("");
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [createLoader, setCreateLoader] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [examTypeDetails, setExamTypeDetails] = useState({});
  const [updateData, setUpdateData] = useState({});

  const columns = ["Exam Type", "Actions"];
  const dataKeyAccessors = ["title", "CTA"];
  const [showSnac, setShowSnac] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "right",
    message: "",
    severity: "",
  });
  const { vertical, horizontal, open, message, severity } = showSnac;
  const token = localStorage.getItem("token");

  useEffect(() => {
    getExamType();
  }, [createStatus]);

  const shouldShowSnackBar = (newState) => {
    setShowSnac({ ...newState, open: true });
  };
  const handleCloseSnac = () => {
    setShowSnac({ ...showSnac, open: false });
    console.log("trying", showSnac);
  };
  const getExamType = () => {
    const token = localStorage.getItem("token");
    const url = `${process.env.REACT_APP_API_URL}/exam-type`;
    setLoader(true);
    let header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(url, header)
      .then((response) => {
        setExamType(response.data.data);
        setLoader(false);
        setCreateModal(false);
        setUpdateModal(false);
      })
      .catch((e) => {
        setLoader(false);
        console.log("something went wron");
        setCreateModal(false);
        setUpdateModal(false);
      });
  };

  const viewAction = (id) => {
    const url = `${process.env.REACT_APP_API_URL}/exam-type/view/${id}`;
    let header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(url, header)
      .then((response) => {
        if (response.data.status == "success") {
          setExamTypeDetails(response.data.data);
          setViewModal(true);
        } else {
          shouldShowSnackBar({
            vertical: "top",
            horizontal: "right",
            message: "Could not load exam type",
            severity: "error",
          });
        }
      })
      .catch((error) => {
        shouldShowSnackBar({
          vertical: "top",
          horizontal: "right",
          message: "Could not load exam type",
          severity: "error",
        });
      });
  };

  const editAction = (id) => {
    //load a modal for editing
    let data = examType.filter((value) => {
      return value.id == id;
    });
    setUpdateData(data[0]);
    setExamTypeName(data[0].title);
    setUpdateModal(true);
  };

  const createNewExamType = () => {
    const token = localStorage.getItem("token");
    setCreateLoader(true);
    const url = `${process.env.REACT_APP_API_URL}/exam-type/create`;
    let header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let data = {
      title: examTypeName.trim(),
    };
    if (examTypeName.trim() == "") {
      setError(true);
      setCreateLoader(false);
      return;
    } else {
      axios
        .post(url, data, header)
        .then((response) => {
          if (response.data.status == "success") {
            let newStatus = createStatus;
            newStatus += 1;
            setCreateStatus(newStatus);
            setCreateLoader(false);
          }
        })
        .catch((error) => {
          setCreateLoader(false);
        });
    }
  };
  const updateNewExamType = () => {
    const token = localStorage.getItem("token");
    setCreateLoader(true);
    const url = `${process.env.REACT_APP_API_URL}/exam-type/update/${updateData.id}`;
    let header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let data = {
      title: examTypeName.trim(),
    };
    if (examTypeName.trim() == "") {
      setError(true);
      setCreateLoader(false);
      return;
    } else {
      axios
        .put(url, data, header)
        .then((response) => {
          if (response.data.status == "success") {
            let newStatus = createStatus;
            newStatus += 1;
            setCreateStatus(newStatus);
            setCreateLoader(false);
          }
        })
        .catch((error) => {
          setCreateLoader(false);
        });
    }
  };

  const createExamtype = () => {
    setCreateModal(true);
  };

  const deleteExamtype = (id) => {
    const token = localStorage.getItem("token");
    const url = `${process.env.REACT_APP_API_URL}/exam-type/delete/${id}`;
    let header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    shouldShowSnackBar({
      vertical: "top",
      horizontal: "right",
      message: "Deleting Record",
      severity: "error",
    });

    axios
      .delete(url, header)
      .then((response) => {
        if (response.data.status == "success") {
          shouldShowSnackBar({
            vertical: "top",
            horizontal: "right",
            message: "Deleted Succesfully ",
            severity: "success",
          });
          let newStatus = createStatus;
          newStatus += 1;
          setCreateStatus(newStatus);
        }
      })
      .catch((error) => {
        shouldShowSnackBar({
          vertical: "top",
          horizontal: "right",
          message: "Something went wrong while deleting record ",
          severity: "error",
        });
      });
  };

  const setCreateModalClose = () => {
    setCreateModal(false);
  };

  const setViewModalClose = () => {
    setViewModal(false);
  };
  const setUpdateModalClose = () => {
    setUpdateModal(false);
  };
  const handleChangeExamName = (e) => {
    setError(false);
    setExamTypeName(e.target.value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Define months array to convert month number to month name
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Get date components
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();

    // Get time components
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    // Add leading zero if single digit
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // Construct the fancy date format
    const fancyDate = `${month} ${day}, ${year} ${hours}:${minutes}:${seconds}`;

    return fancyDate;
  };

  return (
    <div className="mt-12 flex flex-col">
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleCloseSnac}
        autoHideDuration={5000}
        key={vertical + horizontal}
      >
        <Alert
          onClose={handleCloseSnac}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>

      <AppModal
        setIsOpen={setCreateModalClose}
        modalIsOpen={createModal}
        title="Create New Exam Type"
      >
        <div className="h-[100px] w-[100%]">
          <div className="w-[100%]">
            <TextInput
              label="Exam Name"
              name="examname"
              type="text"
              onChange={handleChangeExamName}
              className="w-[100%]"
              error={error}
            />
          </div>
          <div className="mt-2 flex justify-end">
            {createLoader ? (
              <div className="border-2 rounded w-[200px] h-[48px] bg-[red] text-white flex items-center text-[15px] font-bold justify-center cursor-pointer">
                Create{" "}
                <CircularProgress style={{ width: "20px", height: "20px" }} />
              </div>
            ) : (
              <div
                onClick={createNewExamType}
                className="border-2 rounded w-[200px] h-[48px] bg-[#40A74E] text-white flex items-center text-[15px] font-bold justify-center cursor-pointer"
              >
                Create
              </div>
            )}
          </div>
        </div>
      </AppModal>

      <AppModal
        setIsOpen={setViewModalClose}
        modalIsOpen={viewModal}
        title="View Exam Type"
      >
        <div className="min-h-[100px] w-[100%]">
          {examTypeDetails.id ? (
            <table className="min-w-full divide-y divide-gray-200">
              <tr>
                <th>ID</th>
                <td>{examTypeDetails.id}</td>
              </tr>
              <tr>
                <th>Title</th>
                <td>{examTypeDetails.title}</td>
              </tr>
              <tr>
                <th>created Time</th>
                <td>{formatDate(examTypeDetails.created_at)}</td>
              </tr>
              <tr>
                <th>Last Updated</th>
                <td>{formatDate(examTypeDetails.updated_at)}</td>
              </tr>
            </table>
          ) : null}
        </div>
      </AppModal>

      <AppModal
        setIsOpen={setUpdateModalClose}
        modalIsOpen={updateModal}
        title="Update Exam Type"
      >
        <div className="h-[100px] w-[100%]">
          <div className="w-[100%]">
            <TextInput
              label="Exam Name"
              name="examname"
              type="text"
              value={examTypeName}
              onChange={handleChangeExamName}
              className="w-[100%]"
              error={error}
            />
          </div>
          <div className="mt-2 flex justify-end">
            {createLoader ? (
              <div className="border-2 rounded w-[200px] h-[48px] bg-[red] text-white flex items-center text-[15px] font-bold justify-center cursor-pointer">
                Update{" "}
                <CircularProgress style={{ width: "20px", height: "20px" }} />
              </div>
            ) : (
              <div
                onClick={updateNewExamType}
                className="border-2 rounded w-[200px] h-[48px] bg-[#40A74E] text-white flex items-center text-[15px] font-bold justify-center cursor-pointer"
              >
                Update
              </div>
            )}
          </div>
        </div>
      </AppModal>

      <TableComponent
        columns={columns}
        data={examType}
        actionText="Create Exam Type"
        action={createExamtype}
        dataKeyAccessors={dataKeyAccessors}
        deleteAction={deleteExamtype}
        loading={loader}
        viewAction={viewAction}
        editAction={editAction}
      />
    </div>
  );
}
