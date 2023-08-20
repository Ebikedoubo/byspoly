import ComposeInternalLayouts from "../components/HOC/ComposeInternalLayout";
import Dashboard from "../components/Dashboard/Dashboard";
import { MdHome, MdPeople } from "react-icons/md";
import { BsBuildingsFill } from "react-icons/bs";
import { SiGooglescholar } from "react-icons/si";
import { IoBookSharp } from "react-icons/io5";
import FacultyDepartment from "../components/FacultyDeptartment/FacultyDepartment";
import Students from "../components/Students/Students";
import Staffs from "../components/Staffs/Staffs";
import Courses from "../components/Courses/Courses";
export const privateRoutes = [
  {
    title: "Dashboard",
    icon: <MdHome className="h-6 w-6" />,
    path: "/dashboard",
    component: ComposeInternalLayouts(Dashboard),
    exact: true,
  },
  {
    title: "Staffs",
    icon: <MdPeople className="h-6 w-6" />,
    path: "/staffs",
    component: ComposeInternalLayouts(Staffs),
    exact: true,
    secondary: true,
  },
  {
    title: "Faculty / Department",
    icon: <BsBuildingsFill className="h-6 w-6" />,
    path: "/faculty-dept",
    component: ComposeInternalLayouts(FacultyDepartment),
    exact: true,
  },
  {
    title: "Students",
    icon: <SiGooglescholar className="h-6 w-6" />,
    path: "/students",
    component: ComposeInternalLayouts(Students),
    exact: true,
  },
  {
    title: "Courses",
    icon: <IoBookSharp className="h-6 w-6" />,
    path: "/courses",
    component: ComposeInternalLayouts(Courses),
    exact: true,
  },
];
