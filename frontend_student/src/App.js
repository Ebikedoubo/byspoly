import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes, PrivateAdminRoute } from "./routes";
import Sidebar from "./components/SideBar/SideBar";
import { useNavigate } from 'react-router-dom';
import { SideBarLinks } from "./sideBarLinks";
import StudentEnrollment from "./components/StudentEnrollment";


function App() {
  
  const privateRoutes = routes.privateRoutes.map(
    ({ path, title, component: Component, exact }) => (
      <Route
        key={path}
        exact={exact}
        path={path}
        element={
          <PrivateAdminRoute path={path} key={path} exact={exact} title={title}>
            <Component title={title} />
            <StudentEnrollment />
            <Sidebar SideBarLinks={SideBarLinks} />
          </PrivateAdminRoute>
        }
      />
    )
  );

  const authRoutes = routes.authRoutes.map(
    ({ path, component: Component, exact }) => (
      <Route path={path} key={path} exact={exact} element={<Component />} />
    )
  );

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {authRoutes}
          {privateRoutes}
        </Routes>
        {/* <StudentEnrollment /> */}
      </BrowserRouter>
      
    </div>
  );
}

export default App;
