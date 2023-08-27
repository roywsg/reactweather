import { useApis } from "@/apis/apis.ts";
import { HistoryType, OpenWeatherQuery } from "@/lib/types.ts";
import { useEffect, useState } from "react";
import { tryParseJson } from "@/lib/helpers.ts";
import { Constants } from "@/lib/constants.ts";

export default function useApiRecorder() {
  const apis = useApis();

  const [histories, setHistories] = useState<HistoryType[] | null>(null);

  useEffect(function () {
    let h = window.localStorage.getItem(Constants.History.storageKey);
    setHistories(tryParseJson(h));
  }, []);

  async function getOpenWeather({ city, country }: OpenWeatherQuery) {
    const now = new Intl.DateTimeFormat("en-SG").format(new Date());

    try {
      const rs = await apis.getOpenWeather({ city, country });
      const record: HistoryType = {
        id: "1",
        query: `${city}, ${country}`,
        time: now,
      };
      addHistory(record);
      console.log(rs);
    } catch (e) {
      // handle error here
      console.error(e);
    }
  }

  function addHistory(record: HistoryType) {
    if (histories) {
      setHistories([...histories, record]);
    } else {
      setHistories([record]);
    }
  }

  return {
    getOpenWeather,
    histories,
  };
}
