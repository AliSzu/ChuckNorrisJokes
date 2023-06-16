import { AxiosError, AxiosResponse } from "axios";
import { ChuckJoke } from "../types/ChuckJoke";
import { jokesClient } from "./httpClient";
import { PATHS } from "../constans/ApiPaths";

export const jokesApi = {
  fetchRandomJokes: async (): Promise<AxiosResponse<ChuckJoke>|AxiosError> => { 
    try { 
      const response = await jokesClient.get<ChuckJoke>(PATHS.RANDOM_CHUCK_JOKE_PATH);
      return response
    } catch (error) {
      return error as AxiosError
    }
  },

  fetchCategories: async (): Promise<AxiosResponse|AxiosError> => {
    try {
      const categories = await jokesClient.get(PATHS.CATEGORIES_PATH);
      return categories
    } catch (error) {
      return error as AxiosError
    }
  },
};
