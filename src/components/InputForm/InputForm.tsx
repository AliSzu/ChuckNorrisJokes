import { useState } from "react";
import classes from "./InputForm.module.scss";

interface IInputForm {
    onSubmit: (customName: string | undefined) => void
}

const InputForm = ({onSubmit} : IInputForm) => {
  const [customName, setCustomName] = useState<string | undefined>();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(customName)
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value
    setCustomName(name);
    
  };
  return (
    <form className={classes.formControl} onSubmit={handleSubmit} noValidate={true}>
      <input
        onChange={handleNameChange}
        required={true}
        className={classes.nameInput}
        id="ImpersonateInput"
      />
      <label className={classes.inputLabel} htmlFor="ImpersonateInput">
        Impersonate Chuck Norris
      </label>

        <button
          className={`btn btn--primary ${classes["btn--joke"]}`}
          disabled={false}
          aria-label="Draw Joke"
          type="submit"
        >
          Draw a random {customName ? customName : "Chuck Norris"} Joke
          {/* TODO: I18 FOR TEXT AND TRANSLATIONS */}
        </button>
    </form>
  );
};

export default InputForm;
