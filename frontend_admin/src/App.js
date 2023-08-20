

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes, PrivateAdminRoute } from "./routes";



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
      </BrowserRouter>
    </div>
  );
}

export default App;
