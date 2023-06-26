import classes from "./LanguagePicker.module.scss";
import { useTranslation } from "react-i18next";
import { Language } from "../../types/Language";

const LanguagePicker = () => {
  const { i18n } = useTranslation();

  const languages: Language = {
    en: { nativeName: "en" },
    pl: { nativeName: "pl" },
  };

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language)
  };

  return (
    <div className={classes.languageContainer}>
      {Object.keys(languages).map((language) => (
        <div key={languages[language].nativeName}>
          <input
            type="radio"
            name="checkbox"
            onChange={() => handleLanguageChange(languages[language].nativeName)}
            checked={i18n.language === languages[language].nativeName}
          />
          {languages[language].nativeName.toUpperCase()}
        </div>
      ))}
    </div>
  );
};

export default LanguagePicker;
