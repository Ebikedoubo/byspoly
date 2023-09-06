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

  const sampleStaffs = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    staffName: `Staff ${index + 1}`,
    description: `Description for Staff ${index + 1}`,
  }));


  const [inputFields, setInputFields] = useState([
    {
      firstname: "",
      lastname: "",
      email: "",
      designation: ""
    },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputFields({
      ...inputFields,
      [name]: value,
    });
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
      const response = await axios.get(apiUrl, axiosConfig);


      const newStaffData = response.data;


      setStaffs(newStaffData);

    } catch (error) {
      console.error('Error fetching more staff data:', error);
    }
  };

  useEffect(() => {
    fetchMoreDataProps()
  }, [])

  const columns = ["ID", "Staff Name", "Staff Code", "Actions"];
  const dataKeyAccessors = ["id", "staffName", "staffCode", "CTA"];

  const viewAction = (staffId) => {
    const staff = sampleStaffs.find((f) => f.id === staffId);
    setSelectedStaffs(staff);
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

  const createStaff = () => {
    setCreateModalIsOpen(true)
  }

  const editAction = (staffId) => { };

  const deleteStaff = (staffId) => {
    console.log(`Delete Staff with ID: ${staffId}`);
  };

  return (
    <div className="mt-12 flex flex-col">
      <h2>Staff List</h2>
      <TableComponent
        columns={columns}
        data={sampleStaffs}
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
        setIsOpen={setCreateModalIsOpen}
        modalIsOpen={createModalIsOpen}
        title="Create Staff"
      >
        <form onSubmit={handleSubmit}>


          <div className="flex flex-col items-center">
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 mb-4">
              <TextInput label="First Name"
                name="firstname"
                value={inputFields.firstname}
                onChange={handleChange}
              />
              <TextInput label="Last Name"
                name="lastname"
                value={inputFields.lastname}
                onChange={handleChange}
              />


            </div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-12">


              <TextInput name="email" label="Email" type="email"
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
              <button className="mt-4 bg-brand-700 text-white p-4 rounded-md px-8 hover:bg-brand-500" type="submit">{loading ? 'Submitting' : 'Submit'}</button>
            </div>
          </div>

        </form>
      </AppModal>

      {selectedStaffs && (
        <AppModal
          setIsOpen={setViewModalIsOpen}
          modalIsOpen={viewModalIsOpen}
          title={`View Staffs: ${selectedStaffs?.staffName}`}
        >
          <h3>{selectedStaffs?.staffName}</h3>
          <p>{selectedStaffs?.description}</p>
        </AppModal>
      )}
    </div>
  );
}

export default Staffs;
