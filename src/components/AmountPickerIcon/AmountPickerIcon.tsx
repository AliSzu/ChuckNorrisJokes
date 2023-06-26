import classes from "./AmountPickerIcon.module.scss";

interface IAmountPickerIcon {
  iconType: string;
}

const AmountPickerIcon = ({iconType} : IAmountPickerIcon) => {
  return (
    <div className={classes.icon}>{iconType}</div>
  )
};

export default AmountPickerIcon;
