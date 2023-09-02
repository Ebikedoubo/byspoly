import React, { useState, useEffect } from "react";
import TableComponent from "../TableComponent";
import AppModal from "../AppModal";
import TextInput from "../TextInput";


function Staffs() {
  const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [paginatedStaffs, setPaginatedStaffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
  const [selectedStaffs, setSelectedStaffs] = useState(null);


  const sampleStaffs = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    staffName: `Staff ${index + 1}`,
    description: `Description for Staff ${index + 1}`,
  }));

  const options = [
    {
      value: "Manager",
      label: "Manager"
    },
    {
      value: "Staff",
      label: "Staff"
    },
    {
      value: "Admin",
      label: "Admin"
    }
  ]

  const [inputFields, setInputFields] = useState([
    {
      firstname: "",
      lastname: "",
      email: "",
      designation:""
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
    console.log(inputFields);
    setCreateModalIsOpen(false);
  };

  useEffect(() => {
    const startIndex = currentPage * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedData = sampleStaffs.slice(startIndex, endIndex);
    setPaginatedStaffs(paginatedData);
    setLoading(false);
  }, [currentPage]);



  const paginationChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const fetchMoreDataProps = () => {
    // Fetch more data logic
    // Update the paginated data state accordingly
  };

  const columns = ["ID", "Staff Name", "Staff Code", "Actions"];
  const dataKeyAccessors = ["id", "staffName", "staffCode", "CTA"];

  const viewAction = (staffId) => {
    const staff = sampleStaffs.find((f) => f.id === staffId);
    setSelectedStaffs(staff);
    setViewModalIsOpen(true); // Open the view modal
  };

  const createStaff = () => {
    setInputFields({
      firstname: "",
      lastname: "",
      email: "",
      designation: "",
    });
    setCreateModalIsOpen(true); // Open the create modal
  };

  const editAction = (staffId) => { };

  const deleteStaff = (staffId) => {
    console.log(`Delete Staff with ID: ${staffId}`);
  };

  return (
    <div className="mt-12 flex flex-col">
      <h2>Staff List</h2>
      <TableComponent
        columns={columns}
        data={paginatedStaffs}
        actionText="Create Staff"
        action={createStaff}
        dataKeyAccessors={dataKeyAccessors}
        deleteAction={deleteStaff}
        loading={loading}
        viewAction={viewAction}
        editAction={editAction}
        paginationChange={paginationChange}
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
                  label="Designation"
                />

              </div>
              <div className="flex items-center w-full justify-center">
                <button className="mt-4 bg-brand-700 text-white p-4 rounded-md px-8 hover:bg-brand-500" type="submit">Submit</button>
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
