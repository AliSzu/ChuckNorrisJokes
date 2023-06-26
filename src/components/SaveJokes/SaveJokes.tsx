import { useTranslation } from "react-i18next";
import classes from "./SaveJokes.module.scss";
import JokesAmountPicker from "../JokesAmountPicker/JokesAmountPicker";
import { useState } from "react";
import { useDownloadJokes } from "../../hooks/useDownloadJokes";
import AlertSnackbar from "../AlertSnackbar/AlertSnackbar";

interface ISaveJokes {
  category?: string,
  name?: string
}

const SaveJokes = ({category, name} : ISaveJokes) => {
  const [isJokesAmountValid, setIsJokesAmountValid] = useState(true);
  const [jokesAmount, setJokesAmount] = useState(0);

  const { t } = useTranslation();
  const { downloadJokes, isLoading, errorMessage, isError, setIsError } = useDownloadJokes();

  const onAmountChange = (jokesAmount: number, isValidAmount: boolean) => {
    setIsJokesAmountValid(isValidAmount);
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
        isAmountValid={isJokesAmountValid}
      />
      <button
        className={"btn btn--primary"}
        disabled={jokesAmount < 1 || !isJokesAmountValid || isLoading}
        onClick={() => downloadJokes(jokesAmount, category, name)}
      >
        {t("button.save")}
      </button>
    </div>
    {!isJokesAmountValid && (
        <p className={classes["errorMessage"]}>
          {t("error.input")}
        </p>
      )}
    </>
  );
};

export default SaveJokes;
