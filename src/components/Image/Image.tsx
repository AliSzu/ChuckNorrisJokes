import chuckImg from "../../assets/img/chuck.png";
import unknownImg from '../../assets/img/unknown.png'
import classes from "./Image.module.scss";
import { NameClassEnum } from "../../enums/NameClassEnum";

interface IImage {
  name?: string;
}

const Image = ({ name }: IImage) => {
  const imgClass = name ? NameClassEnum.Unknown : NameClassEnum.Chuck
  return (
    <>
      <img
        src={name ? unknownImg : chuckImg}
        alt="chuck"
        className={`${classes.image} ${classes[imgClass]}`}
      />
    </>
  );
};

export default Image;
