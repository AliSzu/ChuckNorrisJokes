import classes from "./Icon.module.scss";

interface IIcon {
  iconType: string;
}

const Icon = ({iconType} : IIcon) => {
  return (
    <div className={classes.icon}>{iconType}</div>
  )
};

export default Icon;
