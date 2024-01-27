import React, { useState, useEffect } from "react";
import TableComponent from "../TableComponent";
import AppModal from "../AppModal";
import TextInput from "../TextInput";
import axios from "axios"
import { toast } from 'react-toastify';

function Staffs() {

  const [loading, setLoading] = useState(false);
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
  const [selectedStaffs, setSelectedStaffs] = useState(null);
  const [staffs, setStaffs] = useState([])
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);



  const [inputFields, setInputFields] = useState(
    {
      firstname: "",
      lastname: "",
      email: "",
      designation: ""
    },
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postStaffToServer()

  };


  const fetchMoreDataProps = async () => {
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/admin`;
      const token = localStorage.getItem('token');
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Make a GET request to the API endpoint with the authorization header
      const response = await axios.post(apiUrl, {}, axiosConfig);

      const newStaffData = response.data.data.map((data, index) => {
        return {
          ...data,
          id: index + 1
        };
      });
      console.log(newStaffData)

      setStaffs([...newStaffData]);
      console.log(staffs)

    } catch (error) {
      console.error('Error fetching more staff data:', error);
    }
  };

  useEffect(() => {
    fetchMoreDataProps()
  }, [])

  useEffect(() => {
    if (editingStaff) {
      console.log("firstname:", editingStaff.firstname)
      console.log("lastname:", editingStaff.lastname)
      console.log("email:", editingStaff.email)
      console.log("desination:", editingStaff.designation);
      setInputFields({
        firstname: editingStaff.firstname || "",
        lastname: editingStaff.lastname || "",
        email: editingStaff.email || "",
        designation: editingStaff.designation || ""
      });
    }
  }, [editingStaff]);

  const columns = ["ID", "Staff Name", "Email", "Actions"];
  const dataKeyAccessors = ["id", "name", "email", "CTA"];

  const viewAction = (staffId) => {

    const staff = staffs.find((f) => f.id === staffId);
    setSelectedStaffs(prevStaff => ({ ...prevStaff, ...staff }));

    setViewModalIsOpen(true); // Open the view modal
  };

  const postStaffToServer = async () => {
    const token = localStorage.getItem("token");
    const url = `${process.env.REACT_APP_API_URL}/admin/create`;

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

      console.log("Staff created successfully:", response.data);

      toast.success("Staff created successfully!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        closeOnClick: true,
      });
      // Clear the input fields
      setInputFields({
        firstname: "",
        lastname: "",
        email: "",
        designation: "",
      });

      // Close the create modal
      setCreateModalIsOpen(false);

    } catch (error) {
      console.error("Error creating staff:", error);
      toast.error("Error creating staff!", {
        position: toast.POSITION.TOP_LEFT
      });
    } finally {

      setLoading(false);
    }
  };

  const updateStaffToServer = async () => {
    const token = localStorage.getItem("token");
    const url = `${process.env.REACT_APP_API_URL}/admin/update/${editingStaff.id}`;

    try {
      setLoading(true);

      const response = await axios.put(
        url,
        {
          firstname: inputFields.firstname,
          lastname: inputFields.lastname,
          email: inputFields.email,
          designation: inputFields.designation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Staff updated successfully:", response.data);

      toast.success("Staff updated successfully!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        closeOnClick: true,
      });

      setEditModalIsOpen(false);
    } catch (error) {
      console.error("Error updating staff:", error);
      toast.error("Error updating staff!", {
        position: toast.POSITION.TOP_LEFT,
      });
    } finally {
      setLoading(false);
    }
  };


  const createStaff = () => {
    setCreateModalIsOpen(true)
  }

  const editAction = (staffId) => {
    const staff = staffs.find((f) => f.id === staffId);
    console.log("Found Staff:", staff);
    setEditingStaff(staff);

    setEditModalIsOpen(true);
  };

  const deleteStaff = (staffId) => {
    console.log(`Delete Staff with ID: ${staffId}`);
  };

  return (
    <div className="mt-12 flex flex-col">
      <h2>Staff List</h2>
      <TableComponent
        columns={columns}
        data={staffs}
        actionText="Create Staff"
        action={createStaff}
        dataKeyAccessors={dataKeyAccessors}
        deleteAction={deleteStaff}
        loading={loading}
        viewAction={viewAction}
        editAction={editAction}

        fetchMoreDataProps={fetchMoreDataProps}
      />

      <AppModal
        setIsOpen={editModalIsOpen ? setEditModalIsOpen : setCreateModalIsOpen}
        modalIsOpen={editModalIsOpen || createModalIsOpen}
        title="Create Staff"
      >
        <form onSubmit={editModalIsOpen ? updateStaffToServer : handleSubmit}>


          <div className="flex flex-col items-center">
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 mb-4">
              <TextInput
                label="First Name"
                name="firstname"
                type="text"
                value={inputFields.firstname}
                onChange={handleChange}
              />
              <TextInput
                label="Last Name"
                name="lastname"
                value={inputFields.lastname}
                onChange={handleChange}
              />


            </div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-12">


              <TextInput
                name="email"
                label="Email"
                type="email"
                value={inputFields.email}
                onChange={handleChange}
              />
              <TextInput
                name="designation"
                value={inputFields.designation}
                onChange={handleChange}
                label="Registrar/Staff/Admin"
              />

            </div>
            <div className="flex items-center w-full justify-center">
              <button className="my-6 bg-brand-700 text-white p-4 rounded-md px-8 hover:bg-brand-500" type="submit">{loading ? (editModalIsOpen ? "Updating" : "Submitting") : (editModalIsOpen ? "Update" : "Submit")}</button>
            </div>
          </div>

        </form>
      </AppModal>

      {viewModalIsOpen && (
        <AppModal
          setIsOpen={setViewModalIsOpen}
          modalIsOpen={viewModalIsOpen}
          title={`View Staffs: ${selectedStaffs?.name}`}
        >


          <div className=" flex flex-col gap-6">

            <span className="flex">
              <h3 className="font-semibold pr-8">Staff Name: </h3>
              <p>{selectedStaffs?.name}</p>
            </span>
            <span className="flex">
              <h3 className="font-semibold pr-8">Staff Email: </h3>
              <p>{selectedStaffs?.email}</p>
            </span>
          </div>

        </AppModal>
      )}
    </div>
  );
}

export default Staffs;
