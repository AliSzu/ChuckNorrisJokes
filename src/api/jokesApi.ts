import { jokesClient } from "./httpClient";

export const jokesApi = {
  fetchRandomJokes: async () => {
    try {
      const response = await jokesClient.get("/random");
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return error.message
      }
    }
  },
  fetchCategories: async () => {
    try {
      const categories = await jokesClient.get("/categorie99");
      return categories.data;
    } catch (error) {
      if (error instanceof Error) {
        return error.message
      }
    }
  },
};
