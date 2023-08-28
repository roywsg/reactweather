import { AppContext } from "@/context/appContext.ts";
import { Constants } from "@/lib/constants.ts";
import { getLocalHistories } from "@/lib/helpers.ts";
import {
  HistoryRecord,
  OpenWeatherQuery,
  WeatherDataType,
} from "@/lib/types.ts";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function AppProvider({ children }: Props) {
  const [histories, setHistories] = useState<HistoryRecord[] | null>(
    getLocalHistories(),
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<OpenWeatherQuery | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherDataType | null>(null);

  function _setHistories(histories: HistoryRecord[] | null) {
    setHistories(histories);
    window.localStorage.setItem(
      Constants.History.storageKey,
      JSON.stringify(histories),
    );
  }

  const defaultContext = {
    histories,
    setHistories: _setHistories,
    isLoading,
    setIsLoading,
    query,
    setQuery,
    weatherData,
    setWeatherData,
  };

  return (
    <AppContext.Provider value={defaultContext}>{children}</AppContext.Provider>
  );
}
