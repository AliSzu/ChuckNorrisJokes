import { useState } from "react";
import classes from "./AlertSnackbar.module.scss";

interface IAlertSnackbar {
  message: string;
}

const AlertSnackbar = ({ message }: IAlertSnackbar) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className={classes.snackbar} onClick={handleClose}>
          <div className={classes.label}>{message}</div>
          <div className={classes.dismiss}>&times;</div>
        </div>
      )}
    </>
  );
};

export default AlertSnackbar;
