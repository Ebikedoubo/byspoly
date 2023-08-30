import ComposeInternalLayouts from "../components/HOC/ComposeInternalLayout";
import Dashboard from "../components/Dashboard/Dashboard";

export const privateRoutes = [
  {
    title: "ENTER YOUR APPLICATION INFORMATION",
    path: "/dashboard",
    component: ComposeInternalLayouts(Dashboard),
    exact: true,
  },
];
