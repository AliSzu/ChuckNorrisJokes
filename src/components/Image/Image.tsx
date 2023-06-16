import { useEffect, useState } from "react";
import chuckImg from "../../assets/img/chuck.png";
import unkownImg from '../../assets/img/unknown.png'
import classes from "./Image.module.scss";

interface IImage {
  customName: boolean;
}

const Image = ({ customName }: IImage) => {
  const [image, setImage] = useState(chuckImg)
  const imgClass = customName ? 'imageUnknown' : 'imageChuck'

  useEffect(() => {
    setImage(customName ? unkownImg : chuckImg)
  }, [image])

  return (
    <>
      <img
        src={customName ? unkownImg : chuckImg}
        alt="chuck"
        className={`${classes.image} ${classes[imgClass]}`}
      />
    </>
  );
};

export default Image;
