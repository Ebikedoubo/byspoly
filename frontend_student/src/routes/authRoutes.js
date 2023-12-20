import Login from "../pages/auth/Login";
import StudentEnrollmentPage from "../pages/studentEnrollmentPage/StudentEnrollmentPage";

export const authRoutes = [
  {
    path: "/",
    component: Login,
    exact: true,
  },
  {
    path: "/studentenrollment",
    component: StudentEnrollmentPage,
    exact: true,
  },
];
