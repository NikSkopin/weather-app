import { ref } from "vue";
import { key } from '@/weather/weatherApiKeys';
import { OneWeatherFetch } from '../models/oneWeatherFetch.model';

// const coordsWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?';
const nameWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?'

// let vue know about weather so it can rerender when it fetched
const weather = ref<OneWeatherFetch>();

async function fetchWeather(cityName : string) : Promise<void> {
  if (cityName) {
    const response = await fetch(`${nameWeatherUrl}q=${cityName}&appid=${key}`);
    weather.value = await response.json();
  }
  // else {
  //   const browserCoords : Coords = {
  //     latitude: 59.921541299999994,
  //     longitude: 30.358425200000003,
  //   }
  //   const { latitude, longitude } = browserCoords
  // const response = await fetch(`${coordsWeatherUrl}lat=${latitude}
  // &lon=${longitude}&appid=${key}&units=imperial`);
  //   weather.value = await response.json();
  // }
}

export default function weatherUse() {
  return {
    weather,
    fetchWeather,
    // getWeatherImageUrl,
    // formatTemperature,
  }
}
