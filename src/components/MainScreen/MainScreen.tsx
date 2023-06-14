import { useEffect, useState } from "react";
import classes from "./MainScreen.module.scss";
import { ChuckJoke } from "../../types/ChuckJoke";
import { jokesApi } from "../../api/jokesApi";
import Image from "../Image/Image";
import CategorySelect from "../CategorySelect/CategorySelect";
import AlertSnackbar from "../AlertSnackbar/AlertSnackbar";
import { AxiosError } from "axios";

const MainScreen = () => {
  const [joke, setJoke] = useState<ChuckJoke>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [category, setCategory] = useState('')
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getJoke = async () => {
      const axiosResponse = await jokesApi.fetchRandomJokes();
      if(axiosResponse instanceof AxiosError){
        setIsError(true)
        setErrorMessage(axiosResponse.message)
      } else {
        setIsError(false)
        setJoke(axiosResponse.data)
      }
    };
    getJoke();
  }, []);

  const onCategorySelect = (category: string) => {
    setCategory(category)
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
        {/* TODO: input field */}
        <div>button</div>
        {/* TODO: button for drawing random jokes */}
        <div>save jokes</div>
        {/* TODO: Button for saving jokes */}
      </div>
    </>
  );
};

export default MainScreen;
