import chuckImg from "../../assets/img/chuck.png";
import classes from "./Image.module.scss";

interface IImage {
  customName: boolean;
}

const Image = ({ customName }: IImage) => {
  return (
    <>
      <img
        src={chuckImg}
        alt="chuck"
        className={`${classes.image} ${classes.imageChuck} `}
      />
    </>
  );
};

export default Image;
