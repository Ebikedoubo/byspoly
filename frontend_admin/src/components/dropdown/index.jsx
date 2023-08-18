import React, { useEffect, useRef, useState } from "react";

/**
 * A function that sets up an event listener to detect clicks outside of a given
 * element and triggers a callback function to update a state value.
 *
 * @param {React.RefObject} ref - A reference to the element to be monitored for
 * clicks outside.
 * @param {function} setX - A callback function to update a state value when a
 * click outside of the element occurs.
 * @return {void} This function does not return a value.
 */
function useOutsideAlerter(ref, setX) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setX(false);
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, setX]);
}

const Dropdown = (props) => {
    const { button, children, classNames, animation } = props;
    const wrapperRef = useRef(null);
    const [openWrapper, setOpenWrapper] = useState(false);
    useOutsideAlerter(wrapperRef, setOpenWrapper);

    return (
        <div ref={wrapperRef} className="relative flex">
            <div className="flex" onMouseDown={() => setOpenWrapper(!openWrapper)}>
                {button}
            </div>
            <div
                className={`${classNames} absolute z-10 ${animation
                        ? animation
                        : "origin-top-right transition-all duration-300 ease-in-out"
                    } ${openWrapper ? "scale-100" : "scale-0"}`}
            >
                {children}
            </div>
        </div>
    );
};

export default Dropdown;