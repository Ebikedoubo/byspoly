import React, { useState, useEffect } from "react";
import axios from "axios";
import TableComponent from "../../components/TableComponent";
import AppModal from "../../components/AppModal";
import TextInput from "../../components/TextInput";
import { CircularProgress } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Fee() {
  const [fee, setFee] = useState([]);
  const [feeRaw, setFeeRaw] = useState([]);
  const [ayncsFaculty, setAyncsFaculty] = useState(false);
  const [ayncsType, setAyncsType] = useState(false);
  const [ayncsSession, setAyncsSession] = useState(false);
  const [ayncsDepartment, setAyncsDepartment] = useState(false);
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [createStatus, setCreateStatus] = useState(1);
  const [error, setError] = useState({
    faculty: false,
    department: false,
    amount: false,
    session: false,
    type: false,
  });
  const [loader, setLoader] = useState(false);
  const [createLoader, setCreateLoader] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [feeDetails, setFeeDetails] = useState({});
  const [updateData, setUpdateData] = useState({});
  const [departmentOption, setDepartmentOption] = useState([]);
  const [facultyOption, setFacultyOption] = useState([]);
  const [sessionOption, setSessionOption] = useState([]);
  const [session, setSession] = useState("");
  const [typeOption, setTypeOption] = useState([]);
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");

  const columns = [
    "SN",
    "Amount",
    "Type",
    "Faculty",
    "Department",
    "Session",
    "Actions",
  ];
  const dataKeyAccessors = [
    "sn",
    "amount",
    "type",
    "faculty",
    "department",
    "session",
    "CTA",
  ];
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
    getFee();
  }, [createStatus]);

  useEffect(() => {
    bootstrap();
  }, []);

  const bootstrap = () => {
    getSession();
    getType();
    getFaculty();
  };

  const getSession = async () => {
    const token = localStorage.getItem("token");
    const url = `${process.env.REACT_APP_API_URL}/accademic-session`;
    let header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let reArrangeData = [];
    setAyncsSession(true);
    await axios
      .get(url, header)
      .then((response) => {
        response.data.data.map((data) => {
          reArrangeData.push({ label: data.session_title, value: data.id });
        });
        setSessionOption(reArrangeData);
        setAyncsSession(false);
      })
      .catch((error) => {
        console.log("could not fetch session");
        setAyncsSession(false);
      });
  };

  const getType = async () => {
    const token = localStorage.getItem("token");
    const url = `${process.env.REACT_APP_API_URL}/fee/type`;
    let header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let reArrangeData = [];
    setAyncsType(true);
    await axios
      .get(url, header)
      .then((response) => {
        response.data.data.map((data) => {
          reArrangeData.push({ label: data.title, value: data.id });
        });
        setTypeOption(reArrangeData);
        setAyncsType(false);
      })
      .catch((error) => {
        console.log("could not fetch type");
        setAyncsType(false);
      });
  };

  const getFaculty = async () => {
    const token = localStorage.getItem("token");
    const url = `${process.env.REACT_APP_API_URL}/faculty`;
    let header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let reArrangeData = [];
    setAyncsFaculty(true);
    await axios
      .get(url, header)
      .then((response) => {
        response.data.data.map((data) => {
          reArrangeData.push({ label: data.title, value: data.id });
        });
        setFacultyOption(reArrangeData);
        setAyncsFaculty(false);
      })
      .catch((error) => {
        console.log("could not fetch faculty");
        setAyncsFaculty(false);
      });
  };
  const getDepartment = async (id) => {
    const token = localStorage.getItem("token");
    const url = `${process.env.REACT_APP_API_URL}/faculty/faculty-departments/${id}`;
    let header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let reArrangeData = [];
    setAyncsDepartment(true);
    await axios
      .get(url, header)
      .then((response) => {
        response.data.data.map((data) => {
          reArrangeData.push({ label: data.title, value: data.id });
        });
        setDepartmentOption(reArrangeData);
        setAyncsDepartment(false);
      })
      .catch((error) => {
        console.log("could not fetch department ");
        setAyncsDepartment(false);
      });
  };

  const shouldShowSnackBar = (newState) => {
    setShowSnac({ ...newState, open: true });
  };

  const handleCloseSnac = () => {
    setShowSnac({ ...showSnac, open: false });
    console.log("trying", showSnac);
  };

  const getFee = () => {
    //setFee();
    const token = localStorage.getItem("token");
    const url = `${process.env.REACT_APP_API_URL}/fee`;
    setLoader(true);
    let header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(url, header)
      .then((response) => {
        // restructure the fee
        let newFee = [];
        let i = 1;
        setFeeRaw(response.data.data);
        response.data.data.map((data) => {
          let createObject = {
            sn: i++,
            id: data.id,
            amount: data.amount,
            type: data.fee.title,
            faculty: data.faculty ? data.faculty.title : "---",
            department: data.department ? data.department.title : "---",
            session: data.session ? data.session.session_title : "---",
          };
          newFee.push(createObject);
        });
        setFee(newFee);
        setLoader(false);
        setCreateModal(false);
        setUpdateModal(false);
      })
      .catch((e) => {
        setLoader(false);
        console.log("something went wrong", e);
        setCreateModal(false);
        setUpdateModal(false);
      });
  };

  const viewAction = (id) => {
    setViewModal(true);
    setCreateLoader(true);
    const url = `${process.env.REACT_APP_API_URL}/fee/view/${id}`;
    let header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(url, header)
      .then((response) => {
        setFeeDetails(response.data.data);
        setCreateLoader(false);
      })
      .catch((error) => {
        shouldShowSnackBar({
          vertical: "top",
          horizontal: "right",
          message: "Could not load fee",
          severity: "error",
        });
      });
  };

  const editAction = (id) => {
    //load a modal for editing
    let data = feeRaw.filter((value) => {
      return value.id == id;
    });
    setUpdateData(data[0]);
    setFaculty(data[0].faculty?.id);
    setDepartment(data[0].department?.id);
    setSession(data[0].session?.id);
    setAmount(data[0].amount);
    setType(data[0].fee?.id);
    if (data[0].faculty) {
      getDepartment(data[0].faculty?.id);
    }
    setUpdateModal(true);
  };

  const updateNewFee = () => {
    const token = localStorage.getItem("token");
    setCreateLoader(true);
    const url = `${process.env.REACT_APP_API_URL}/fee/update/${updateData.id}`;
    let header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let data = {
      amount: amount,
      type: type,
      faculty: faculty,
      department: department,
      session: session,
    };

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
  };

  const createNewFeeModal = () => {
    setCreateModal(true);
  };

  const deleteFee = (id) => {
    const token = localStorage.getItem("token");
    const url = `${process.env.REACT_APP_API_URL}/fee/delete/${id}`;
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

  const handleOnChange = (e, inputeName) => {
    switch (inputeName) {
      case "type":
        setType(e.target.value);
        setError((previous) => ({ ...previous, type: false }));
        break;
      case "session":
        setSession(e.target.value);
        setError((previous) => ({ ...previous, session: false }));
        break;
      case "faculty":
        setFaculty(e.target.value);
        setError((previous) => ({ ...previous, faculty: false }));
        getDepartment(e.target.value);
        break;
      case "department":
        setDepartment(e.target.value);
        setError((previous) => ({ ...previous, department: false }));
        break;
      case "amount":
        setAmount(e.target.value);
        setError((previous) => ({ ...previous, amount: false }));
        break;
    }
  };

  const createFee = () => {
    setCreateLoader(true);
    if (
      type.toString().trim().length < 1 ||
      session.toString().trim().length < 1 ||
      faculty.toString().trim().length < 1 ||
      department.toString().trim().length < 1 ||
      amount.trim().length < 1
    ) {
      if (type.toString().trim().length < 1) {
        setError((previous) => ({ ...previous, type: true }));
      }

      if (department.toString().trim().length < 1) {
        setError((previous) => ({ ...previous, department: true }));
      }

      if (faculty.toString().trim().length < 1) {
        // setError({ ...error, faculty: true });
        setError((previous) => ({ ...previous, faculty: true }));
      }

      if (session.toString().trim().length < 1) {
        setError((previous) => ({ ...previous, session: true }));
      }

      if (amount.trim().length < 1) {
        setError((previous) => ({ ...previous, amount: true }));
      }
      setCreateLoader(false);
    } else {
      // do the axios command here
      const token = localStorage.getItem("token");
      const url = `${process.env.REACT_APP_API_URL}/fee/create`;
      let header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      let data = {
        amount: amount,
        type: type,
        faculty: faculty,
        department: department,
        session: session,
      };
      axios
        .post(url, data, header)
        .then((response) => {
          if (response.data.status == "success") {
            setCreateModal(false);
            setCreateStatus((previous) => previous + 1);
            setCreateLoader(false);
          }
        })
        .catch((error) => {
          setCreateLoader(false);
          console.log("Something went wrong ");
        });
    }
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
        title="Create New Fee"
      >
        <div className="min-h-[100px] w-[100%]">
          <div className="w-[100%]">
            <div className="flex justify-between mb-4">
              <div className="w-[45%]">
                <TextInput
                  required
                  type="select"
                  name="session"
                  error={error["session"]}
                  label="Select Session"
                  value={session < 1 ? "" : session}
                  onChange={(e) => {
                    handleOnChange(e, "session");
                  }}
                  isSelect={true}
                  ayncs={ayncsSession}
                  options={sessionOption}
                />
              </div>
              <div className="w-[45%]">
                <TextInput
                  required
                  type="select"
                  name="type"
                  error={error["type"]}
                  label="Select Type"
                  value={type < 1 ? "" : type}
                  onChange={(e) => {
                    handleOnChange(e, "type");
                  }}
                  isSelect={true}
                  ayncs={ayncsType}
                  options={typeOption}
                />
              </div>
            </div>
            <div className="flex justify-between mb-4">
              <div className="w-[100%]">
                <TextInput
                  required
                  type="input"
                  name="amount"
                  error={error["amount"]}
                  label="Enter Amount "
                  value={amount < 1 ? "" : amount}
                  onChange={(e) => {
                    handleOnChange(e, "amount");
                  }}
                />
              </div>
            </div>

            <div className="flex justify-between mb-4">
              <div className="w-[45%]">
                <TextInput
                  required
                  type="select"
                  name="faculty"
                  error={error["faculty"]}
                  label="Select Faculty"
                  value={faculty < 1 ? "" : faculty}
                  onChange={(e) => {
                    handleOnChange(e, "faculty");
                  }}
                  isSelect={true}
                  ayncs={ayncsFaculty}
                  options={facultyOption}
                />
              </div>
              <div className="w-[45%]">
                <TextInput
                  required
                  type="select"
                  name="department"
                  error={error["department"]}
                  label="Select Department"
                  value={department < 1 ? "" : department}
                  onChange={(e) => {
                    handleOnChange(e, "department");
                  }}
                  ayncs={ayncsDepartment}
                  isSelect={true}
                  options={departmentOption}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            {createLoader ? (
              <div className="border-2 rounded w-[200px] h-[48px] bg-[red] text-white flex items-center text-[15px] font-bold justify-center cursor-pointer">
                Create{" "}
                <CircularProgress style={{ width: "20px", height: "20px" }} />
              </div>
            ) : (
              <div
                onClick={updateNewFee}
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
        title="View Fee "
      >
        <div className="min-h-[100px] w-[100%]">
          {!createLoader ? (
            feeDetails.id ? (
              <table className="min-w-full divide-y divide-gray-200">
                <tr>
                  <th>ID</th>
                  <td>{feeDetails.id}</td>
                </tr>
                <tr>
                  <th>Session</th>
                  <td>
                    {feeDetails.session
                      ? feeDetails.session.session_title
                      : "----"}
                  </td>
                </tr>
                <tr>
                  <th>Fee Type</th>
                  <td>{feeDetails.fee ? feeDetails.fee.title : "----"}</td>
                </tr>

                <tr>
                  <th>Amount</th>
                  <td>{feeDetails.amount ? feeDetails.amount : "----"}</td>
                </tr>

                <tr>
                  <th>Faculty</th>
                  <td>
                    {feeDetails.faculty ? feeDetails.faculty.title : "----"}
                  </td>
                </tr>

                <tr>
                  <th>Departmemt</th>
                  <td>
                    {feeDetails.department
                      ? feeDetails.department.title
                      : "----"}
                  </td>
                </tr>
              </table>
            ) : null
          ) : (
            <div className="w-[100%] flex justify-center item-center">
              <CircularProgress style={{ width: "50px", height: "50px" }} />
            </div>
          )}
        </div>
      </AppModal>

      <AppModal
        setIsOpen={setUpdateModalClose}
        modalIsOpen={updateModal}
        title="Update Fee"
      >
        <div className="min-h-[100px] w-[100%]">
          <div className="w-[100%]">
            <div className="flex justify-between mb-4">
              <div className="w-[45%]">
                <TextInput
                  required
                  type="select"
                  name="session"
                  error={error["session"]}
                  label="Select Session"
                  value={session < 1 ? "" : session}
                  onChange={(e) => {
                    handleOnChange(e, "session");
                  }}
                  isSelect={true}
                  ayncs={ayncsSession}
                  options={sessionOption}
                />
              </div>
              <div className="w-[45%]">
                <TextInput
                  required
                  type="select"
                  name="type"
                  error={error["type"]}
                  label="Select Type"
                  value={type < 1 ? "" : type}
                  onChange={(e) => {
                    handleOnChange(e, "type");
                  }}
                  isSelect={true}
                  ayncs={ayncsType}
                  options={typeOption}
                />
              </div>
            </div>
            <div className="flex justify-between mb-4">
              <div className="w-[100%]">
                <TextInput
                  required
                  type="input"
                  name="amount"
                  error={error["amount"]}
                  label="Enter Amount "
                  value={amount < 1 ? "" : amount}
                  onChange={(e) => {
                    handleOnChange(e, "amount");
                  }}
                />
              </div>
            </div>

            <div className="flex justify-between mb-4">
              <div className="w-[45%]">
                <TextInput
                  required
                  type="select"
                  name="faculty"
                  error={error["faculty"]}
                  label="Select Faculty"
                  value={faculty < 1 ? "" : faculty}
                  onChange={(e) => {
                    handleOnChange(e, "faculty");
                  }}
                  isSelect={true}
                  ayncs={ayncsFaculty}
                  options={facultyOption}
                />
              </div>
              <div className="w-[45%]">
                <TextInput
                  required
                  type="select"
                  name="department"
                  error={error["department"]}
                  label="Select Department"
                  value={department < 1 ? "" : department}
                  onChange={(e) => {
                    handleOnChange(e, "department");
                  }}
                  ayncs={ayncsDepartment}
                  isSelect={true}
                  options={departmentOption}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            {createLoader ? (
              <div className="border-2 rounded w-[200px] h-[48px] bg-[red] text-white flex items-center text-[15px] font-bold justify-center cursor-pointer">
                Update{" "}
                <CircularProgress style={{ width: "20px", height: "20px" }} />
              </div>
            ) : (
              <div
                onClick={createFee}
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
        data={fee}
        actionText="Create Fee"
        action={createNewFeeModal}
        dataKeyAccessors={dataKeyAccessors}
        deleteAction={deleteFee}
        loading={loader}
        viewAction={viewAction}
        editAction={editAction}
      />
    </div>
  );
}
