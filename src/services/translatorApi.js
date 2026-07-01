import axios from "axios";

const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const API_HOST = import.meta.env.VITE_RAPIDAPI_HOST;

export const translateText = async (text, language) => {
  try {
    const response = await axios.request({
      method: "POST",
      url: "https://google-translate113.p.rapidapi.com/api/v1/translator/text",
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": API_HOST,
        "Content-Type": "application/json",
      },
      data: {
        from: "auto",
        to: language,
        text: text,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Translation Error:", error);
    return null;
  }
};