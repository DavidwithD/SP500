import axios from "axios";

const API_KEY = "3605fab32d534df4944d0c09b245ef3d";
const BASE_URL = "https://newsapi.org/v2/";

export const getHeadlinesByDate = async (date: string) => {
  try {
    const response = await axios.get(`${BASE_URL}everything`, {
      params: {
        q: "",
        from: date,
        to: date,
        sortBy: "popularity",
        apiKey: API_KEY,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};
