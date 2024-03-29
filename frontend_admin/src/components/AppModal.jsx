import { height } from "@mui/system";
import React from "react";
import Modal from "react-modal";
import Card from "./card/Card";

/**
 * Represents the Default Modal Component
 * @function
 * @param {object} children - react props to render wrapped children component
 * @param {Function} setIsOpen - updates/sets the modal state
 * @param {boolean} modalIsOpen - holds the state of the modal
 * @param {string} title - stores the title of the modal
 * @Description - this component handles the Modal functionalities on the application
 * The setIsOpen and modalIsOpen should be created using a react usestate
 * implementation can be reference to modalComponent.test.js or dashboard component
 */

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    overflow: "auto",
    height: "700px",
    width: "866px"
  },
};
export default function AppModal({ children, setIsOpen, modalIsOpen, title }) {
  let subtitle;

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#000000";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="App Modal"
        ariaHideApp={false}
      >
        <div
          className=" max-h-[700px] z-50"
        >
          <div className="flex gap-80 lg:justify-between mb-10 mt-10">
            <h2 className="cursor-pointer md-max:ml-12" ref={(_subtitle) => (subtitle = _subtitle)}>
              <b>{title?.toUpperCase()}</b>
            </h2>
            <button onClick={closeModal}><b>Close</b></button>
          </div>
          <div className="h-[100%] items-center flex flex-col">
            <Card extra={"items-center flex-col w-full h-full p-[16px] bg-cover dark:!bg-white"}>
              {children}
            </Card>
          </div>

        </div>
      </Modal>
    </div>
  );
}
