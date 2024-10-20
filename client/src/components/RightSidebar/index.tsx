import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import React from "react";
import { Button, Container, Grid2, Stack, Typography } from "@mui/material";
import avatar from "../../assets/1.png";
import { useTasksContext } from "../../pages/Store/TasksContext";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default function RightSidebar({ userData }: any) {
  const { setDate } = useTasksContext();
  return (
    <Grid2
      size={{ sm: 3, md: 2 }}
      offset={0.8}
      my={2}
      pb={2}
      sx={{
        background: "#FFFFFF",
        display: { xs: "none", md: "flex" },
        borderRadius: "24px",
      }}
    >
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <Stack sx={{ alignItems: "center", width: "100%" }} mt={12}>
          <Avatar
            alt={userData?.username || "User Name"}
            src={userData?.avatar || avatar}
            sx={{
              borderRadius: "10px",
              width: "90px",
              marginBottom: "9px",
              height: "90px",
            }}
          />
          <Typography variant="h6" color="#101C56">
            {userData?.username || "User Name"}
          </Typography>
          <Typography variant="body2" color="#666666">
            {userData?.email || "Useremail@gmail.com"}
          </Typography>
          <Button
            variant="contained"
            sx={{
              background: "#3754DB",
              borderRadius: "12px",
              paddingX: "15px",
              paddingY: "8px",
              marginTop: "8px",
              marginBottom: "50px",
            }}
          >
            My Profile
          </Button>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              sx={{ background: "#F6F8FD", width: "100%" }}
              onChange={(value) => {
                setDate(value);
              }}
            />
          </LocalizationProvider>
        </Stack>
      </Container>
    </Grid2>
  );
}
