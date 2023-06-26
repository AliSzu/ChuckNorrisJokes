
import AmountPickerIcon from "../AmountPickerIcon/AmountPickerIcon";
import classes from "./JokesAmountPicker.module.scss";

const MAX_DOWNLOADS_VALUE = 100;
const MIN_DOWNLOADS_VALUE = 1;

interface IJokesAmountPicker {
  onChange: (jokesAmount: number, isValid: boolean) => void;
  jokesAmount: number;
  isAmountValid: boolean;
}

const JokesAmountPicker = ({ onChange, jokesAmount, isAmountValid }: IJokesAmountPicker) => {

  const errorClass = !isAmountValid && classes.error;

  const handleJokesAmountChange = (amount: number) => {
    const isValid = !(
      amount > MAX_DOWNLOADS_VALUE || amount < MIN_DOWNLOADS_VALUE
    );
    onChange(amount, isValid);
  };

  return (
    <div className={`${classes.inputContainer} ${errorClass}`}>
      <button
        className={`btn ${classes.btnAmount} ${classes.btnAmountDecrement}`}
        onClick={() => handleJokesAmountChange(jokesAmount - 1)}
      >
        <AmountPickerIcon iconType="&#8722;"/>
      </button>
      <input
        type="number"
        aria-label="jokesAmount-input"
        value={jokesAmount}
        onChange={(e) => handleJokesAmountChange(+e.target.value)}
        className={`${classes.saveInput}`}
      />
      <button
        className={`btn ${classes.btnAmount} ${classes.btnAmountIncrement}`}
        onClick={() => handleJokesAmountChange(jokesAmount + 1)}
      >
        <AmountPickerIcon iconType="+"/>
      </button>
    </div>
    
  );
};

export default JokesAmountPicker;
