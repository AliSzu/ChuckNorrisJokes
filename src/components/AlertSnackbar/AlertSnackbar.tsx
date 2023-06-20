import classes from "./AlertSnackbar.module.scss";

interface IAlertSnackbar {
  message?: string 
  isOpen: boolean;
  onOpen: () =>  void;
}

const AlertSnackbar = ({ message, isOpen, onOpen }: IAlertSnackbar) => {

  const handleClose = () => {
    onOpen();
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
