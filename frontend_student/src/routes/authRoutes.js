import Login from "../pages/auth/Login";
import StudentEnrollment from "../components/StudentEnrollment";

export const authRoutes = [
  {
    path: '/',
    component: Login,
    exact: true,
  },
  {
    path: '/studentenrollment',
    component: StudentEnrollment,
    exact: true,
  },
];
