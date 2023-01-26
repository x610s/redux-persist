import React, { useState } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from '@mui/material/Snackbar';
import { SnackbarMessage } from "../models/snackbar.model";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SnackBarMessage = ({
  snackData,
  setSnackData
}: {
    snackData: SnackbarMessage,
    setSnackData: React.Dispatch<React.SetStateAction<SnackbarMessage | null>>
}) => {
  const [open, setOpen] = useState<boolean>(snackData.mostrar);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
         <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={snackData.success ? "info" : "error"}
        sx={{ width: "100%" }}
      >
        {snackData.msg}
      </Alert>
    </Snackbar>
  );
};
