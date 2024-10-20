import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Chip,
  Box,
  Grid2,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import UpdateModal from "./../UpdateModal/index";
import { Dayjs } from "dayjs";

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  status: string;
  duo: Dayjs | null;
  onStatusChange: (newStatus: string) => void;
  onDelete: () => void;
  onUpdate: (updatedTask: {
    title: string;
    status: string;
    description: string;
    duo: Dayjs | null;
  }) => void; // Prop for updating
}

export default function TaskCard({
  id,
  title,
  description,
  status,
  duo,
  onStatusChange,
  onDelete,
  onUpdate,
}: TaskCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleMarkAsDone = () => {
    onStatusChange("Completed");
  };

  return (
    <Grid2 size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
      <Card
        sx={{
          // maxWidth: 400,
          mx: "auto",
          p: 2,
          position: "relative",
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>

          <Chip
            label={status}
            color={
              status === "completed"
                ? "success"
                : status === "pending"
                ? "default"
                : "primary"
            }
            size="small"
            sx={{ mb: 2 }}
          />

          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
            {status !== "completed" && (
              <Button
                variant="contained"
                color="success"
                startIcon={<CheckIcon />}
                sx={{ textTransform: "none" }}
                onClick={handleMarkAsDone}
              >
                Mark As Done
              </Button>
            )}
            <div>
              <IconButton aria-label="delete" color="error" onClick={onDelete}>
                <DeleteIcon />
              </IconButton>
              <IconButton
                aria-label="edit"
                color="primary"
                onClick={() => setModalOpen(true)}
              >
                <EditIcon />
              </IconButton>
              <UpdateModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                task={{ id, title, status, description, duo }}
                onUpdate={(updatedTask) => {
                  onUpdate(updatedTask);
                  setModalOpen(false);
                }}
              />
            </div>
          </Box>
        </CardContent>
      </Card>
    </Grid2>
  );
}
