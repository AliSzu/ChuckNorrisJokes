import { useEffect, useState } from "react";
import classes from "./MainScreen.module.scss";
import { ChuckJoke } from "../../types/ChuckJoke";
import { jokesApi } from "../../api/jokesApi";
import Image from "../Image/Image";
import CategorySelect from "../CategorySelect/CategorySelect";
import AlertSnackbar from "../AlertSnackbar/AlertSnackbar";

const MainScreen = () => {
  const [joke, setJoke] = useState<ChuckJoke>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getJoke = async () => {
      const chuckData = await jokesApi.fetchRandomJokes();
      if (typeof chuckData === "string") {
        setIsError(true);
        setErrorMessage(chuckData);
      } else {
        setIsError(false);
        setJoke(chuckData);
      }
    };
    getJoke();
  }, []);

  const onCategorySelect = (category: string) => {
    console.log(category);
  };

  return (
    <>
      {isError && <AlertSnackbar message={errorMessage!} />}
      <div className={classes.card}>
        <Image customName={true} />
        <div className={classes.joke}>
          <p className={classes["joke-text"]}>"{joke?.value}"</p>
        </div>
        <CategorySelect onClick={onCategorySelect} />
        <div>input</div>
        <div>button</div>
        <div>save jokes</div>
      </div>
    </>
  );
};

export default MainScreen;
