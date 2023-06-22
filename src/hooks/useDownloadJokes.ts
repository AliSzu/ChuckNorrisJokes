import { useState } from "react";
import { FILE_NAME } from "../constants/ApiPaths";
import { prettifyJokesJSON } from "../utils/JokesUtils";
import { jokesApi } from "../api/jokesApi";
import { AxiosError } from "axios";

export const useDownloadJokes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const createLink = (jokes: string[]) => {
    const jokesJSON = prettifyJokesJSON(jokes);
    const blob = new Blob([jokesJSON], {
      type: "text/plain",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = FILE_NAME;
    link.href = url;
    link.click();
  };

  const downloadJokes = async (value: number) => {
    setIsLoading(true);
    const jokes: string[] = [];
    const axiosResponse = await jokesApi.fetchJokesToDownload(value);
    if (axiosResponse instanceof AxiosError) {
      setIsError(true);
      setErrorMessage(axiosResponse.message);
    } else {
      setIsError(false);
      axiosResponse.map((response) => jokes.push(response.data.value));
      createLink(jokes);
    }
    setIsLoading(false);
  };

  return { downloadJokes, isLoading, errorMessage, isError, setIsError };
};
