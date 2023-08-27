export type OpenWeatherQuery = {
  city: string;
  country: string;
};

export type HistoryRecord = {
  id: string; // eg: "1", "2' ..
  query: string; // eg: Osaka, JP
  time: string; // eg: 03:14:50 PM
};

type WeatherType = {
  main: string;
  description: string;
};

type MainType = {
  temp: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
};

type SysType = {
  country: string; // JP
};

export type WeatherDataType = {
  sys: SysType;
  name: string; // Osaka
  weather: WeatherType[];
  main: MainType;
};
