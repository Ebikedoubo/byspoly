// AcademicSession.js

import React, { useEffect, useState } from "react";



import axios from "axios";
import { toast } from 'react-toastify';
import TableComponent from "../../components/TableComponent";
import AppModal from "../../components/AppModal";
import TextInput from "../../components/TextInput";

const AcademicSession = () => {
  const [academicSessions, setAcademicSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
  const [editingSession, setEditingSession] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);

  const [inputFields, setInputFields] = useState({
    title: "",
    code: "",
    start_date: "",
    end_date: "",
  });

  const columns = ["ID", "Title", "Code", "Start Date", "End Date", "Actions"]
  const dataKeyAccessors = ["id", "session_title", "session_code", "session_start_date", "session_end_date", "CTA"]
  const fetchAcademicSessions = async () => {
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/accademic-session`;
      const token = localStorage.getItem('token');
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(apiUrl, axiosConfig);

      setAcademicSessions(response.data.data);
    } catch (error) {
      console.error('Error fetching academic sessions:', error);
    }
  };

  useEffect(() => {
    fetchAcademicSessions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    postSessionToServer();

  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateSessionToServer();
  }

  const createAcademicSession = () => setCreateModalIsOpen(true)

  const postSessionToServer = async () => {
    const token = localStorage.getItem("token");
    const url = `${process.env.REACT_APP_API_URL}/accademic-session/create`;

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

      console.log("Academic session created successfully:", response.data);

      toast.success("Academic session created successfully!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        closeOnClick: true,
      });

      setInputFields({
        title: "",
        code: "",
        start_date: "",
        end_date: "",
      });

      setCreateModalIsOpen(false);
      fetchAcademicSessions(); // Refresh academic sessions after creating
    } catch (error) {
      console.error("Error creating academic session:", error);
      toast.error("Error creating academic session!", {
        position: toast.POSITION.TOP_LEFT
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSessionToServer = async () => {
    const token = localStorage.getItem("token");
    const url = `${process.env.REACT_APP_API_URL}/accademic-session/update/${editingSession.id}`;

    try {
      setLoading(true);

      const response = await axios.put(
        url,
        {
          title: inputFields.title,
          code: inputFields.code,
          start_date: inputFields.start_date,
          end_date: inputFields.end_date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Academic session updated successfully:", response.data);

      toast.success("Academic session updated successfully!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        closeOnClick: true,
      });

      setInputFields({
        title: "",
        code: "",
        start_date: "",
        end_date: "",
      });

      setEditModalIsOpen(false);
      fetchAcademicSessions(); // Refresh academic sessions after updating
    } catch (error) {
      console.error("Error updating academic session:", error);
      toast.error("Error updating academic session!", {
        position: toast.POSITION.TOP_LEFT,
      });
    } finally {
      setLoading(false);
    }
  };

  const editAction = (id) => {
    const session = academicSessions.find((s) => s.id === id);

    setEditingSession(session);
    setInputFields({
      title: session.session_title || "",
      code: session.session_code || "",
      start_date: session.session_start_date || "",
      end_date: session.session_end_date || "",
    });
    setEditModalIsOpen(true);
  }

  const viewAction = async (id) => {
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/accademic-session/view/${id}`;
      const token = localStorage.getItem('token');
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(apiUrl, axiosConfig);
      const session = response.data.data
      setSelectedSession(session);
      setViewModalIsOpen(true);


    } catch (error) {
      console.error('Error fetching academic sessions:', error);
    }

  }

  const deleteAction = async (sessionId) => {
    console.log(sessionId)
    const token = localStorage.getItem("token");
    const url = `${process.env.REACT_APP_API_URL}/accademic-session/delete/${sessionId}`;

    try {
      setLoading(true);

      const response = await axios.delete(
        url,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Academic session deleted successfully:", response.data);

      toast.success("Academic session deleted successfully!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        closeOnClick: true,
      });

      fetchAcademicSessions(); // Refresh academic sessions after deleting
    } catch (error) {
      console.error("Error deleting academic session:", error);
      toast.error("Error deleting academic session!", {
        position: toast.POSITION.TOP_LEFT,
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className='mt-12 flex flex-col'>
      <h2>Academic Sessions</h2>
      <TableComponent
        columns={columns}
        data={academicSessions}
        actionText="Create Academic Session"
        action={createAcademicSession}
        dataKeyAccessors={dataKeyAccessors}
        deleteAction={deleteAction}
        loading={loading}
        editAction={editAction}
        viewAction={viewAction}
      />

      <AppModal
        setIsOpen={
          setCreateModalIsOpen
        }
        modalIsOpen={createModalIsOpen}
        title="Create Academic Session"
      >
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center">

            <div className="flex flex-col md:flex-row gap-6 md:gap-12 mb-4">
              <TextInput
                label="Title"
                name="title"
                type="text"
                value={inputFields.title}
                onChange={handleChange}
              />
              <TextInput
                label="Code"
                name="code"
                type="text"
                value={inputFields.code}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-12">

              <TextInput
                label="Start Date"
                name="start_date"
                type="text"
                value={inputFields.start_date}
                onChange={handleChange}
              />
              <TextInput
                label="End Date"
                name="end_date"
                type="text"
                value={inputFields.end_date}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center w-full justify-center">
              <button className="my-6 bg-brand-700 text-white p-4 rounded-md px-8 hover:bg-brand-500" type="submit">{loading ? "Submitting" : "Submit"}</button>
            </div>
          </div>
        </form>
      </AppModal>

      <AppModal
        setIsOpen={() => {
          setEditingSession(null);
          setEditModalIsOpen(false);
        }}
        modalIsOpen={editModalIsOpen}
        title="Edit Academic Session"
      >
        <form onSubmit={handleUpdate}>
          <div className="flex flex-col items-center">

            <div className="flex flex-col md:flex-row gap-6 md:gap-12 mb-4">
              <TextInput
                label="Title"
                name="title"
                type="text"
                value={inputFields.title}
                onChange={handleChange}
              />
              <TextInput
                label="Code"
                name="code"
                type="text"
                value={inputFields.code}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-12">

              <TextInput
                label="Start Date"
                name="start_date"
                type="text"
                value={inputFields.start_date}
                onChange={handleChange}
              />
              <TextInput
                label="End Date"
                name="end_date"
                type="text"
                value={inputFields.end_date}
                onChange={handleChange}
              />

            </div>

            <div className="flex items-center w-full justify-center">
              <button className="my-6 bg-brand-700 text-white p-4 rounded-md px-8 hover:bg-brand-500" type="submit">{loading ? "Updating" : "Update"}</button>
            </div>
          </div>
        </form>
      </AppModal>

      <AppModal
        setIsOpen={() => setViewModalIsOpen(false)}
        modalIsOpen={viewModalIsOpen}
        title={`View Academic Session: ${selectedSession?.session_title}`}
      >
        <div className="flex flex-col gap-6">
          <span className="flex">
            <h3 className="font-semibold pr-8">Title: </h3>
            <p>{selectedSession?.session_title}</p>
          </span>
          <span className="flex">
            <h3 className="font-semibold pr-8">Code: </h3>
            <p>{selectedSession?.session_code}</p>
          </span>
          <span className="flex">
            <h3 className="font-semibold pr-8">Start Date: </h3>
            <p>{selectedSession?.session_start_date}</p>
          </span>
          <span className="flex">
            <h3 className="font-semibold pr-8">End Date: </h3>
            <p>{selectedSession?.session_end_date}</p>
          </span>
        </div>
      </AppModal>
    </div>
  );
}

export default AcademicSession;
