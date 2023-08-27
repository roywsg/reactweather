import {
  HistoryRecord,
  OpenWeatherQuery,
  WeatherDataType,
} from "@/lib/types.ts";
import { createContext } from "react";

type AppContextType = {
  histories: HistoryRecord[] | null;
  setHistories: React.Dispatch<React.SetStateAction<HistoryRecord[] | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  query: OpenWeatherQuery;
  setQuery: React.Dispatch<React.SetStateAction<OpenWeatherQuery | null>>;
  weatherData: WeatherDataType;
  setWeatherData: React.Dispatch<React.SetStateAction<WeatherDataType | null>>;
};

export const AppContext = createContext<AppContextType | null>(null);
