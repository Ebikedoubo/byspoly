import { privateRoutes } from "./privateRoutes";
import { authRoutes } from "./authRoutes";

export const PrivateAdminRoute = ({ children }) => {
	//check for authentication/permission before return
  return <>{children}</>;
};

export const routes = {
  authRoutes,
  privateRoutes,
};
