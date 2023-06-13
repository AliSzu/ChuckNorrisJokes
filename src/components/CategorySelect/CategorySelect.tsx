import { useEffect, useState } from "react";
import classes from "./CategorySelect.module.scss";
import { jokesApi } from "../../api/jokesApi";
import AlertSnackbar from "../AlertSnackbar/AlertSnackbar";

interface ICategorySelect {
  onClick: (category: string) => void;
}

const CategorySelect = ({ onClick }: ICategorySelect) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("Categories");
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isError, setIsError] = useState(false)

  const selectClasses = category === "Categories" ? "inactive" : "active"; //move this up and try to use enum instead of string or use css modules

  useEffect(() => {
    const getCategories = async () => {
      const categoriesData = await jokesApi.fetchCategories();
      if (typeof categoriesData === "string") {
        setIsError(true)
        setErrorMessage(categoriesData)
      } else {
        setIsError(false)
        setCategories(categoriesData);
      }
    };
    getCategories();
  }, []);

  const handleSelect = (category: string) => {
    setCategory(category);
    setOpen(false);
    onClick(category);
  };

  return (
    <>
    {isError && <AlertSnackbar message={errorMessage!}/>}
    <div
      className={classes.dropdown}
      onBlur={() => setOpen(false)}
      onClick={() => setOpen(!open)}
      tabIndex={0}
    >
      <div className={`${classes.dropbtn} ${classes[selectClasses]}`}>
        {category}
      </div>
      {open && (
        <ul
          className={`${classes["dropdown-content"]}  ${classes[selectClasses]} `}
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
