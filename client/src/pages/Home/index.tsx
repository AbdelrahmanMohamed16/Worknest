import { Grid2 } from "@mui/material";
import LeftSidebar from "../../components/LeftSidebar";
import Navbar from "../../components/Navbar";
import RightSidebar from "../../components/RightSidebar";
import React from "react";
import { useUserContext } from "../Store/UserContext";
import { Outlet } from "react-router-dom";
import { useTasksContext } from "../Store/TasksContext";

export default function Home() {
  const { userData } = useUserContext();
  const { workspace } = useTasksContext();
  return (
    <Grid2 container sx={{ width: "100%", background: "#F6F8FD" }}>
      <LeftSidebar workspace={workspace} />
      <Grid2
        size={{ xs: 12, sm: 10.9, md: 6.5 }}
        offset={{ xs: 1.1, md: 2.7 }}
        mt={3}
      >
        <Navbar />
        <Outlet />
      </Grid2>
      <RightSidebar userData={userData} />
    </Grid2>
  );
}
