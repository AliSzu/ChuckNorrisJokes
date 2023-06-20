import { useEffect, useState } from "react";
import classes from "./MainScreen.module.scss";
import { ChuckJoke } from "../../types/ChuckJoke";
import { jokesApi } from "../../api/jokesApi";
import Image from "../Image/Image";
import CategorySelect from "../CategorySelect/CategorySelect";
import AlertSnackbar from "../AlertSnackbar/AlertSnackbar";
import { AxiosError } from "axios";
import InputForm from "../InputForm/InputForm";

const MainScreen = () => {
  const [joke, setJoke] = useState<ChuckJoke>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [category, setCategory] = useState("");
  const [isError, setIsError] = useState(false);
  const [customName, setCustomName] = useState<string|undefined>();

  useEffect(() => {
    const getJokes = async () => {
      await fetchJokes();
    };
    getJokes();
  }, []);

  const fetchJokes = async (name?: string) => {
    const axiosResponse = await jokesApi.fetchRandomJokes(category,name);
    if (axiosResponse instanceof AxiosError) {
      setIsError(true);
      setErrorMessage(axiosResponse.message);
    } else {
      setIsError(false);
      setJoke(axiosResponse.data);
    }
  };

  const onCategorySelect = (category: string) => {
    setCategory(category);
  };

  const onSnackbarOpen = () => {
    setIsError(false);
  };

  const onFormSubmit = async (customName?: string ) => {
    setCustomName(customName)
    await fetchJokes(customName);
  };

  return (
    <>
      <AlertSnackbar
        message={errorMessage}
        isOpen={isError}
        onOpen={onSnackbarOpen}
      />
      <div className={classes.card}>
        <Image name={customName} />
        <div className={classes.joke}>
          <p className={classes["joke-text"]}>"{joke?.value}"</p>
        </div>
        <CategorySelect onClick={onCategorySelect} />
        <InputForm onSubmit={onFormSubmit} />
      </div>
    </>
  );
};

export default MainScreen;
