import { useCallback, useEffect, useState } from "react";
import classes from "./MainScreen.module.scss";
import { ChuckJoke } from "../../types/ChuckJoke";
import { jokesApi } from "../../api/jokesApi";
import Image from "../Image/Image";
import CategorySelect from "../CategorySelect/CategorySelect";
import AlertSnackbar from "../AlertSnackbar/AlertSnackbar";
import { AxiosError, AxiosResponse } from "axios";
import InputForm from "../InputForm/InputForm";
import LanguagePicker from "../LanguagePicker/LanguagePicker";
import SaveJokes from "../SaveJokes/SaveJokes";
import { useTranslation } from "react-i18next";

const MainScreen = () => {
  const [joke, setJoke] = useState<ChuckJoke>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [category, setCategory] = useState("");
  const [isError, setIsError] = useState(false);
  const [customName, setCustomName] = useState<string | undefined>();
  const [isChuckImage, setIsChuckImage] = useState(true)

  const { t } = useTranslation();

  const fetchJokes = useCallback(async (name?: string) => {
    try {
      const axiosResponse = await jokesApi.fetchRandomJokes(category, name) as AxiosResponse<ChuckJoke>
      setIsError(false);
      setJoke(axiosResponse.data)
    } catch (error) {
      const errorResponse = error as AxiosError
      setIsError(true)
      setErrorMessage(errorResponse.message)
    }
  }, [category]);

  useEffect(() => {
    const getJokes = async () => {
        await fetchJokes();
    };
    getJokes();
  }, [fetchJokes]);

  const onCategorySelect = (category: string) => {
    setCategory(category);
  };

  const onSnackbarOpen = () => {
    setIsError(false);
  };

  const handleNameChange = (customName?: string) => {
    setCustomName(customName);
  }

  const onFormSubmit = async (customName?: string) => {
    setCustomName(customName);
    setIsChuckImage(!customName)
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
        <LanguagePicker />
        <Image chuckImage={isChuckImage} />
        <div className={classes.joke}>
          <p className={classes["joke-text"]}>
            {joke ? joke.value : t("error.title")}
          </p>
        </div>
        <CategorySelect onClick={onCategorySelect} />
        <InputForm onSubmit={onFormSubmit} onChange={handleNameChange} />
        <SaveJokes name={customName} category={category}/>
      </div>
    </>
  );
};

export default MainScreen;
