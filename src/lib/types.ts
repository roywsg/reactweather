export type OpenWeatherQuery = {
  city: string;
  country: string;
};

export type HistoryType = {
  id: string; // eg: "1", "2' ..
  query: string; // eg: Osaka, JP
  time: string; // eg: 03:14:50 PM
};

export type HistoryRecord = OpenWeatherQuery & HistoryType;

type WeatherType = {
  main: string;
  description: string;
};

type MainType = {
  temp: number;
  humidity: number;
};

export type OpenWeatherResult = {
  weather: WeatherType;
  main: MainType;
};
