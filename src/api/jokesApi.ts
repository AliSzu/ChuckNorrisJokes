import { AxiosError, AxiosResponse } from "axios";
import { ChuckJoke } from "../types/ChuckJoke";
import { jokesClient } from "./httpClient";
import { PATHS } from "../constants/ApiPaths";

export const jokesApi = {
  fetchRandomJokes: async (
    category?: string,
    name?: string
  ): Promise<AxiosResponse<ChuckJoke> | AxiosError> => {
    try {
      const response = await jokesClient.get<ChuckJoke>(
        PATHS.RANDOM_CHUCK_JOKE_PATH,
        {
          params: {
            ...(category && { category: category }),
            ...(name && { name: name }),
          },
        }
      );
      return response;
    } catch (error) {
      return error as AxiosError;
    }
  },
  fetchCategories: async (): Promise<AxiosResponse | AxiosError> => {
    try {
      const categories = await jokesClient.get(PATHS.CATEGORIES_PATH);
      return categories;
    } catch (error) {
      return error as AxiosError;
    }
  },

  fetchJokesToDownload: async (
    value: number
  ): Promise<AxiosResponse<ChuckJoke>[] | AxiosError> => {
    try {
      const promises = Array(value).fill(PATHS.RANDOM_CHUCK_JOKE_PATH);
      const response = await Promise.all(
        promises.map((url) => jokesClient.get(url).then((r) => r))
      );
      return response;
    } catch (error) {
      return error as AxiosError;
    }
  },
};
