/* eslint-disable */

import { HiX } from "react-icons/hi";
import Links from "./Links";
import SchoolLogo from "../../assests/byspoly-logo-new.png";

import { privateRoutes as routes } from "../../routes/privateRoutes";

/**
 * Renders the Admin Sidebar component.
 *
 * @param {Object} open - A boolean indicating whether the sidebar is open.
 * @param {Function} onClose - A callback function to close the sidebar.
 * @return {JSX.Element} The rendered Admin Sidebar component.
 */
const AdminSidebar = ({ open, onClose }) => {
    return (
        <div
            className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${open ? "translate-x-0" : "-translate-x-96"
                }`}
        >
            <span
                className="absolute top-4 right-4 block cursor-pointer xl:hidden"
                onClick={onClose}
            >
                <HiX />
            </span>

            <div className={`mx-[36px] mt-[50px] flex items-center`}>

                <img
                src={SchoolLogo}
                alt="logo"
                className="object-contain"
                width={200}
                fill="true"
                height={100}

                />


            </div>
            <div className="mt-[28px] mb-7 h-px bg-gray-300 dark:bg-white/30" />
            {/* Nav item */}

            <ul className="mb-auto pt-1">
                <Links routes={routes} />
            </ul>




            {/* Nav item end */}
        </div>
    );
};

export default AdminSidebar;