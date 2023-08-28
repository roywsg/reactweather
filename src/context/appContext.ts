import {
  HistoryRecord,
  OpenWeatherQuery,
  WeatherDataType,
} from "@/lib/types.ts";
import { createContext } from "react";

type AppContextType = {
  histories: HistoryRecord[] | null;
  setHistories: (histories: HistoryRecord[] | null) => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  query: OpenWeatherQuery | null;
  setQuery: React.Dispatch<React.SetStateAction<OpenWeatherQuery | null>>;
  weatherData: WeatherDataType | null;
  setWeatherData: React.Dispatch<React.SetStateAction<WeatherDataType | null>>;
};

export const AppContext = createContext<AppContextType | null>(null);
