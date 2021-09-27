export interface Weather {
  name: string;
  icon: string;
  temp: number;
  windSpeed: number;
  windDeg: number;
  pressure: number;
  humidity: number;
  visibility: number;
  feelsLike: number;
  description: string;
}

export default interface City {
  [key: string]: Weather;
}
