import { useState } from "react";
import classes from "./InputForm.module.scss";
import { useTranslation, Trans } from "react-i18next";

interface IInputForm {
  onSubmit: (customName: string | undefined) => void;
  onChange: (customName: string | undefined) => void;
}

const InputForm = ({ onSubmit, onChange }: IInputForm) => {
  const [customName, setCustomName] = useState<string | undefined>();
  const { t } = useTranslation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(customName);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setCustomName(name);
    onChange(name)
  };

  return (
    <form
      className={classes.formControl}
      onSubmit={handleSubmit}
      noValidate={true}
    >
      <input
        onChange={handleNameChange}
        required={true}
        className={classes.nameInput}
        aria-label="nameInput"
        id="ImpersonateInput"
      />
      <label className={classes.inputLabel} htmlFor="ImpersonateInput">
        {t("inputField")}
      </label>

      <button
        className={`btn btn--primary ${classes["btn--joke"]}`}
        disabled={false}
        aria-label="drawJoke"
        type="submit"
      >
        <Trans i18nKey="button.draw">
          Draw a random {customName ? customName : "Chuck Norris"} Joke
        </Trans>
      </button>
    </form>
  );
};

export default InputForm;
