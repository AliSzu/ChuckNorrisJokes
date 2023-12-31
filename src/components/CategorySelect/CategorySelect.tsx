import { useEffect, useState } from "react";
import classes from "./CategorySelect.module.scss";
import { jokesApi } from "../../api/jokesApi";
import AlertSnackbar from "../AlertSnackbar/AlertSnackbar";
import { AxiosError } from "axios";
import { CategoryEnum, CategoryStatusEnum } from "../../enums/CategoryEnum";

interface ICategorySelect {
  onClick: (category: string) => void;
}

const CategorySelect = ({ onClick }: ICategorySelect) => {
  const [categories, setCategories] = useState<CategoryEnum[]>([]);
  const [category, setCategory] = useState<CategoryEnum>(
    CategoryEnum.Categories
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isError, setIsError] = useState(false);

  const selectClasses =
    CategoryEnum.Categories === category
      ? CategoryStatusEnum.Inactive
      : CategoryStatusEnum.Active;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const axiosResponse = await jokesApi.fetchCategories();
        setIsError(false);
        setCategories(axiosResponse.data);
      } catch (error) {
        const errorResponse = error as AxiosError;
        setIsError(true);
        setErrorMessage(errorResponse.message);
      }
    };
    fetchCategories();
  }, []);

  const handleSelect = (category: CategoryEnum) => {
    setCategory(category);
    setIsDropdownOpen(false);
    onClick(category);
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
      <div
        className={classes.dropdown}
        onBlur={() => setIsDropdownOpen(false)}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        tabIndex={0}
      >
        <div className={`${classes.dropbtn} ${classes[selectClasses]}`}>
          {category}
        </div>
        {isDropdownOpen && (
          <ul
            className={`${classes.dropdownContent} ${classes[selectClasses]}`}
          >
            {categories.map((item) => (
              <li key={item} onClick={() => handleSelect(item)}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default CategorySelect;
