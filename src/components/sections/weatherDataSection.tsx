import { AppContext } from "@/context/appContext.ts";
import { format } from "date-fns";
import { useContext } from "react";

export default function WeatherDataSection() {
  const appContext = useContext(AppContext);

  const wd = appContext?.weatherData;

  return (
    <>
      {wd && (
        <div className={"my-4 ring-gray-200 ring-2 rounded-lg p-3"}>
          <span className={"text-sm"}>
            {wd.name}, {wd.sys.country}
          </span>
          <h2 className={"text-4xl font-extrabold"}>{wd.weather[0].main}</h2>
          <ul className={"max-w-sm"}>
            <li className={"flex justify-between"}>
              <span className="label">Description:</span>
              <span className="description">{wd.weather[0].description}</span>
            </li>
            <li className={"flex justify-between"}>
              <span className="label">Temperature:</span>
              <span className="description">
                {wd.main.temp_min} ~ {wd.main.temp_max}
              </span>
            </li>
            <li className={"flex justify-between"}>
              <span className="label">Humidity:</span>
              <span className="description">{wd.main.humidity}%</span>
            </li>
            <li className={"flex justify-between"}>
              <span className="label">Time</span>
              <span className="description">
                {format(new Date(), "yyyy-mm-dd HH:mm:ss a")}
              </span>
            </li>
          </ul>
        </div>
      )}

      {!wd && <p>Perform a search to see the weather</p>}
    </>
  );
}
