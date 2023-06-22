import { useTranslation } from "react-i18next";
import classes from "./SaveJokes.module.scss";
import JokesAmountPicker from "../JokesAmountPicker/JokesAmountPicker";
import { useState } from "react";
import { useDownloadJokes } from "../../hooks/useDownloadJokes";
import AlertSnackbar from "../AlertSnackbar/AlertSnackbar";

const SaveJokes = () => {
  const [isValid, setIsValid] = useState(true);
  const [jokesAmount, setJokesAmount] = useState(0);

  const { t } = useTranslation();
  const { downloadJokes, isLoading, errorMessage, isError, setIsError } = useDownloadJokes();

  const onAmountChange = (jokesAmount: number, isValidAmount: boolean) => {
    setIsValid(isValidAmount);
    setJokesAmount(jokesAmount);
  };

  const onSnackbarOpen = () => {
    setIsError(false);
  };

  return (
    <>
    <AlertSnackbar
        message={errorMessage}
        isOpen={isError}
        onOpen={onSnackbarOpen}
      />
    <div className={classes.saveContainer}>
      <JokesAmountPicker
        onChange={onAmountChange}
        jokesAmount={jokesAmount}
        isValidAmount={isValid}
      />
      <button
        className={"btn btn--primary"}
        disabled={jokesAmount < 1 || !isValid || isLoading}
        onClick={() => downloadJokes(jokesAmount)}
      >
        {t("button.save")}
      </button>
    </div>
    {!isValid && (
        <p className={classes["errorMessage"]}>
          You can pick a number from 1 to 100
        </p>
      )}
    </>
  );
};

export default SaveJokes;
