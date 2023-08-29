import React, { useState, useEffect } from "react";
import TableComponent from "../TableComponent";
import AppModal from "../AppModal";

function FacultyDepartment() {
  const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [paginatedFaculties, setPaginatedFaculties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  const sampleFaculties = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    facultyName: `Faculty ${index + 1}`,
    description: `Description for Faculty ${index + 1}`,
  }));

  useEffect(() => {
    const startIndex = currentPage * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedData = sampleFaculties.slice(startIndex, endIndex);
    setPaginatedFaculties(paginatedData);
    setLoading(false);
  }, [currentPage]);

  const paginationChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const fetchMoreDataProps = () => {
    // Fetch more data logic
    // Update the paginated data state accordingly
  };

  const columns = ["ID", "Faculty Name", "Description", "Actions"];
  const dataKeyAccessors = ["id", "facultyName", "facultyCode", "CTA"];

  const viewAction = (facultyId) => {
    const faculty = sampleFaculties.find((f) => f.id === facultyId);
    setSelectedFaculty(faculty);
    setModalIsOpen(true);
  };

  const editAction = (facultyId) => {
    
  }

  const deleteFaculty = (facultyId) => {
    console.log(`Delete Faculty with ID: ${facultyId}`);
  };

  return (
    <div className="mt-12 flex flex-col">
      <h2>Faculty List</h2>
      <TableComponent
        columns={columns}
        data={paginatedFaculties}
        actionText="Create Faculty"
        action={() => setModalIsOpen(true)}
        dataKeyAccessors={dataKeyAccessors}
        deleteAction={deleteFaculty}
        loading={loading}
        viewAction={viewAction}
      editAction={editAction}
        paginationChange={paginationChange}
        fetchMoreDataProps={fetchMoreDataProps} // Pass the fetchMoreDataProps function
        // hasMore={sampleFaculties.length > (currentPage + 1) * rowsPerPage}
        // hasCustom={true}
        // hasCustomIcon={<button>View</button>}
        // hasCustomAction={viewFaculty}
      />

      {/* Use AppModal for creating faculty */}
      <AppModal
        setIsOpen={setModalIsOpen}
        modalIsOpen={modalIsOpen}
        title="Create Faculty"
      >
        {/* Content of the AppModal */}
        {/* You can add your form or other content here */}
      </AppModal>

      {selectedFaculty && (
        <AppModal
          setIsOpen={setModalIsOpen}
          modalIsOpen={modalIsOpen}
          title={`View Faculty: ${selectedFaculty.facultyName}`}
        >
          {/* Content to display faculty details */}
          <h3>{selectedFaculty.facultyName}</h3>
          <p>{selectedFaculty.description}</p>
          {/* Add more details if needed */}
        </AppModal>
      )}
    </div>
  );
}

export default FacultyDepartment;
