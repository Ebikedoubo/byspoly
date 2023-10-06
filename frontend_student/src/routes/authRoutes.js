import Login from "../pages/auth/Login";
import StudentEnrollmentPage from "../pages/studentEnrollmentPage/StudentEnrollmentPage";

export const authRoutes = [
  {
    path: "/",
    component: Login,
    exact: true,
  },
  {
<<<<<<< HEAD
    path: "/studentenrollment",
=======
    path: '/studentenrollment',
>>>>>>> df02a1f (wip)
    component: StudentEnrollmentPage,
    exact: true,
  },
];
