import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";

interface IAlertSnackbar {
  message: string;
}

const AlertSnackbar = ({ message }: IAlertSnackbar) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = ( event?: React.SyntheticEvent | Event, reason?: string ) => {
    if (reason === "clickaway") {
      return;
    }
    setIsOpen(false);
  };

  return (
    <Snackbar open={isOpen} autoHideDuration={5000} onClose={handleClose}>
      <Alert severity="error" sx={{ width: "100%" }} onClose={handleClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertSnackbar;
