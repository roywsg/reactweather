import { AppContext } from "@/context/appContext.ts";
import { Constants } from "@/lib/constants.ts";
import { HistoryRecord, OpenWeatherQuery } from "@/lib/types.ts";
import axios from "axios";
import { useQuery } from "react-query";
import { format } from "date-fns";
import { useState, useEffect, useContext } from "react";

const _axios = axios.create({
  baseURL: import.meta.env.VITE_OPENWEATHER_BASEURL,
  timeout: 60000, // 60s
});

export default function useApiRecorder() {
  const appContext = useContext(AppContext);

  const [query, setQuery] = useState<OpenWeatherQuery>({
    city: "",
    country: "",
  });
  const [run, setRun] = useState(0);
  const [error, setError] = useState<any>(null);

  const { isLoading, refetch: apiRun } = useQuery(
    "getOpenWeather",
    async function () {
      return await getOpenWeather(query);
    },
    {
      enabled: false,
      onSuccess: (res) => {
        const timenow = format(new Date(), "HH:mm:ss a");
        let id = appContext?.histories ? appContext.histories.length + 1 : "1";
        const record: HistoryRecord = {
          id: id.toString(),
          query: `${query.city}, ${query.country}`,
          time: timenow,
        };
        addHistory(record);
        appContext?.setWeatherData(res.data);
      },
      onError: (err: any) => {
        setError(err);
      },
    },
  );

  // trigger api
  useEffect(() => {
    if (
      appContext?.histories &&
      appContext.histories?.length >= Constants.History.maxCount
    ) {
      setError(`Reach max histories, ${Constants.History.maxCount}`);
      return;
    }

    if (query.city !== "" && query.country !== "") apiRun();
  }, [run]);

  return {
    run,
    setRun,
    isLoading,
    error,
    setError,
    setQuery,
  };

  async function getOpenWeather(query: OpenWeatherQuery) {
    return await _axios.get("/", {
      params: {
        q: encodeURI(`${query.city}, ${query.country}`),
        appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
      },
    });
  }

  function addHistory(record: HistoryRecord) {
    if (appContext?.histories) {
      if (appContext.histories.length >= Constants.History.maxCount) {
        setError(`Reach max histories, ${Constants.History.maxCount}`);
        return;
      }
      appContext.setHistories([...appContext.histories, record]);
    } else {
      appContext && appContext.setHistories([record]);
    }
  }
}
