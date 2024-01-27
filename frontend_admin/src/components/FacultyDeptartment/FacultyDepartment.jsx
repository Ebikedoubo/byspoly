import React, { useState, useEffect } from "react";
import TableComponent from "../TableComponent";
import AppModal from "../AppModal";
import TextInput from "../TextInput";
import { RiAddLine } from "react-icons/ri";
import { AiOutlineMinus } from "react-icons/ai";
import axios from "axios"
import { toast } from 'react-toastify';
function FacultyDepartment() {
  const [loading, setLoading] = useState(false);
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [faculty, setFaculty] = useState([])

  const sampleFaculties = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    facultyName: `Faculty ${index + 1}`,
    description: `Description for Faculty ${index + 1}`,
  }));

  const [inputFields, setInputFields] = useState([
    {
      facultyName: "",
      facultyCode: "",
      departments: [{ departmentName: "", departmentCode: "" }],
    },
  ]);

  const handleChangeFacultyInput = (index, field, event) => {
    const updatedFields = [...inputFields];
    updatedFields[index][field] = event.target.value;
    setInputFields(updatedFields);
  };

  const handleChangeDepartmentInput = (facultyIndex, deptIndex, field, event) => {
    const updatedFields = [...inputFields];
    updatedFields[facultyIndex].departments[deptIndex][field] = event.target.value;
    setInputFields(updatedFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputFields);
    postFacultyToServer()
    setCreateModalIsOpen(false);
  };

  const handleAddFields = () => {
    const updatedFields = [...inputFields];
    updatedFields[0].departments.push({
      facultyCode: "",
      departmentName: "",
      departmentCode: "",
    });
    setInputFields(updatedFields);
  };


  const handleRemoveDepartment = (facultyIndex, deptIndex) => {
    const updatedFields = [...inputFields];
    updatedFields[facultyIndex].departments.splice(deptIndex, 1);
    setInputFields(updatedFields);
  };

  const postFacultyToServer = async () => {
    const token = localStorage.getItem("token");
    const url = `${process.env.REACT_APP_API_URL}/faculty/create`;

    try {

      setLoading(true);

      const response = await axios.post(
        url,
        inputFields,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Faculty created successfully:", response.data);

      toast.success("Faculty created successfully!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        closeOnClick: true,
      });
      // Clear the input fields
      setInputFields([
    {
      facultyName: "",
      facultyCode: "",
      departments: [{ departmentName: "", departmentCode: "" }],
    },
  ]);

      // Close the create modal
      setCreateModalIsOpen(false);

    } catch (error) {
      console.error("Error creating faculty:", error);
      toast.error("Error creating faculty!", {
        position: toast.POSITION.TOP_LEFT
      });
    } finally {

      setLoading(false);
    }
  };


  const fetchMoreDataProps = async () => {
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/faculty`;
      const token = localStorage.getItem('token');
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Make a GET request to the API endpoint with the authorization header
      const response = await axios.get(apiUrl, axiosConfig);

      const newFacultyData = response.data.data.map((data, index) => {
        return {
          ...data,
          id: index + 1
        };
      });
      console.log(newFacultyData)

      setFaculty([...newFacultyData]);
      console.log('faculty',faculty)

    } catch (error) {
      console.error('Error fetching more faculty data:', error);
    }
  };

  useEffect(() => {
    fetchMoreDataProps()
  }, [])

  const columns = ["ID", "Faculty Name", "Faculty Code", "Actions"];
  const dataKeyAccessors = ["id", "title", "faculty_code", "CTA"];

  const viewAction = (facultyId) => {
    const faculty = sampleFaculties.find((f) => f.id === facultyId);
    setSelectedFaculty(faculty);
    setViewModalIsOpen(true); // Open the view modal
  };

  const createFaculty = () => {
    setInputFields([
      {
        facultyName: "",
        facultyCode: "",
        departments: [{ departmentName: "", departmentCode: "" }],
      },
    ]);
    setCreateModalIsOpen(true); // Open the create modal
  };

  const editAction = (facultyId) => { };

  const deleteFaculty = (facultyId) => {
    console.log(`Delete Faculty with ID: ${facultyId}`);
  };

  return (
    <div className="mt-12 flex flex-col">
      <h2>Faculty List</h2>
      <TableComponent
        columns={columns}
        data={faculty}
        actionText="Create Faculty"
        action={createFaculty}
        dataKeyAccessors={dataKeyAccessors}
        deleteAction={deleteFaculty}
        loading={loading}
        viewAction={viewAction}
        editAction={editAction}

        fetchMoreDataProps={fetchMoreDataProps}
      />

      <AppModal
        setIsOpen={setCreateModalIsOpen}
        modalIsOpen={createModalIsOpen}
        title="Create Faculty"
      >
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center">
            {inputFields.map((field, facultyIndex) => (
              <div key={facultyIndex}>
                <div className="flex-col gap-8 flex md:flex-row">

                  <TextInput
                    label="Faculty Name"
                    value={field.facultyName}
                    onChange={(e) =>
                      handleChangeFacultyInput(facultyIndex, "facultyName", e)
                    }
                  />
                  <TextInput
                    label="Faculty Code"
                    value={field.facultyCode}
                    onChange={(e) =>
                      handleChangeFacultyInput(facultyIndex, "facultyCode", e)
                    }
                  />
                </div>

                <h2 className="font-semibold text-center mt-8 mb-4 uppercase tracking-wide">
                  Add a Department
                </h2>
                <div>
                  {field.departments.map((dept, deptIndex) => (
                    <div className="flex gap-12 items-center mb-8" key={deptIndex}>
                      <div className="flex flex-col md:flex-row gap-4 md:gap-8">


                        <TextInput
                          name="departmentName"
                          label="Department"
                          value={dept.departmentName}
                          onChange={(e) =>
                            handleChangeDepartmentInput(
                              facultyIndex,
                              deptIndex,
                              "departmentName",
                              e
                            )
                          }
                        />
                        <TextInput
                          name="departmentCode"
                          label="Department Code"
                          value={dept.departmentCode}
                          onChange={(e) =>
                            handleChangeDepartmentInput(
                              facultyIndex,
                              deptIndex,
                              "departmentCode",
                              e
                            )
                          }
                        />
                      </div>
                      <span className="hover:bg-brand-700 hover:text-white rounded-full p-2 hover:cursor-pointer">

                        <AiOutlineMinus
                          className="w-8 h-8"
                          size={24}
                          onClick={() =>
                            handleRemoveDepartment(
                              facultyIndex,
                              deptIndex
                            )
                          }
                        />
                      </span>
                      <span className=" hover:bg-brand-700 hover:text-white rounded-full p-2 hover:cursor-pointer">

                        <RiAddLine
                          onClick={handleAddFields}
                          className="hover:bg-brand-700 hover:text-white rounded-full w-8 h-8"
                          size={24}
                        />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center w-full justify-center">

            <button className="mt-4 bg-brand-700 text-white p-4 rounded-md px-8 hover:bg-brand-500" type="submit">Submit</button>
          </div>
        </form>
      </AppModal>

      {selectedFaculty && (
        <AppModal
          setIsOpen={setViewModalIsOpen}
          modalIsOpen={viewModalIsOpen}
          title={`View Faculty: ${selectedFaculty?.facultyName}`}
        >
          <h3>{selectedFaculty?.facultyName}</h3>
          <p>{selectedFaculty?.description}</p>
        </AppModal>
      )}
    </div>
  );
}

export default FacultyDepartment;
