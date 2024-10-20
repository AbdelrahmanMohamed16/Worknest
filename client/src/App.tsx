import "./App.css";
import Home from "./pages/Home";
import React from "react";
import { SignUp } from "./pages/SignUp";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { useUserContext } from "./pages/Store/UserContext";
import Overview from "./pages/Overview";
import ViewTasks from "./pages/ViewTasks";
import Workspace from "./pages/Workspace";
import { NotFound } from "./pages/NotFound";
import Settings from "./pages/Settings";

const App: React.FC = () => {
  const { userData } = useUserContext();

  const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    console.log(userData);
    return userData ? (
      <>{children}</>
    ) : userData === "loading" ? (
      <p>Loading....</p>
    ) : (
      <Navigate to={"/login"} />
    );
  };

  return (
    <Routes>
      <Route
        path="signUp"
        element={userData ? <Navigate to={"/"} /> : <SignUp />}
      />
      <Route
        path="login"
        element={userData ? <Navigate to={"/"} /> : <Login />}
      />
      <Route path="createworkspace" element={<Workspace />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      >
        <Route index element={<Overview />} />
        <Route path="overview" element={<Overview />} />
        <Route path="tasks" element={<ViewTasks />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route
        path="*"
        element={
          <ProtectedRoute>
            <NotFound />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
