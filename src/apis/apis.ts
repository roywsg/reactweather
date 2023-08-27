import axios from "axios";
// @ts-ignore
import countries from "countrycitystatejson";
import { OpenWeatherQuery } from "@/lib/types.ts";

export function useApis() {
  const _axios = axios.create({
    baseURL: "VITE_OPENWEATHER_BASEURL",
    timeout: 60000, // 60s
  });

  async function getOpenWeather({ city, country }: OpenWeatherQuery) {
    const params = {
      q: `${city},${country}`,
      appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
    };
    const rs = await _axios.get("/", { params });
    return rs.data;
  }

  return {
    getOpenWeather,
  };
}
