import { AxiosResponse } from "axios";
import { ChuckJoke } from "../types/ChuckJoke";
import { jokesClient } from "./httpClient";
import { PATHS } from "../constants/ApiPaths";

export const jokesApi = {
  fetchRandomJokes: async (
    category?: string,
    name?: string
  ): Promise<AxiosResponse<ChuckJoke>> => {
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
  },
  fetchCategories: async (): Promise<AxiosResponse> => {
    const categories = await jokesClient.get(PATHS.CATEGORIES_PATH);
    return categories;
  },

  fetchJokesToDownload: async (value: number, category?: string, name?: string ): Promise<AxiosResponse<ChuckJoke>[]> => {
    const promises = Array.from({ length: value }, () =>
      jokesApi.fetchRandomJokes(category, name)
    );
    const response = await Promise.all(promises)
    return response;
  },
};
