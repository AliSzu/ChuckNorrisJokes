import chuckImg from "../../assets/img/chuck.png";
import unknownImg from '../../assets/img/unknown.png'
import classes from "./Image.module.scss";
import { NameClassEnum } from "../../enums/NameClassEnum";

interface IImage {
  chuckImage?: boolean;
}

const Image = ({ chuckImage }: IImage) => {
  const imgClass = chuckImage ? NameClassEnum.Chuck : NameClassEnum.Unknown
  return (
    <>
      <img
        src={chuckImage ? chuckImg : unknownImg}
        alt="chuck"
        className={`${classes.image} ${classes[imgClass]}`}
      />
    </>
  );
};

export default Image;
