<template>
  <el-card v-if="!isLoading">
    <el-row><strong>{{ weather.name }}</strong></el-row>
    <el-row class="weather-header">
      <el-col :span="12">
        <img
          :src="getImageUrl(weather.weather[0].icon, '4x')"
          class="weatherImage"
        />
      </el-col>
      <el-col :span="12">
        <p class="weatherCurrentTemp">{{ weather.main.temp }}</p>
      </el-col>
    </el-row>
    <el-row class="weather-feelsLike">
      <p>
        <strong>{{ feelsLike }}</strong>
      </p>
    </el-row>
    <el-row class="weather-otherData">
      <p class="weather-otherData-item">Wind: {{ `${weather.wind.speed} m/s ${windDirection}`}}</p>
      <p class="weather-otherData-item">Pressure: {{ `${weather.main.pressure} hPa`}}</p>
      <p class="weather-otherData-item">Humidity: {{ `${weather.main.humidity} %`}}</p>
      <p class="weather-otherData-item">Visibility: {{ `${weather.visibility/1000} km`}}</p>
    </el-row>
  </el-card>
</template>

<script lang="ts">
import {
  defineComponent, ref, onMounted, computed,
} from "vue";
import { key } from "@/weather/weatherApiKeys";

export default defineComponent({
  props: {
    cityName: String,
  },
  setup(props) {
    const isLoading = ref(true)
    const nameWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?'

    const weather = ref()

    const fetchWeather = async (cityName : string) => {
      try {
        const response = await fetch(`${nameWeatherUrl}q=${cityName}&appid=${key}&units=metric`)
        weather.value = await response.json()
      } catch (e) {
        console.log(e)
      } finally {
        isLoading.value = false
      }
    }

    const getImageUrl = (iconName: string, size: '2x' | '4x') => `http://openweathermap.org/img/wn/${iconName}@${size || '1x'}.png`

    const capitalizeWord = (string : string) => string.charAt(0).toUpperCase() + string.slice(1)

    // COMPUTED values
    const feelsLike = computed(() => `Feels like ${weather.value.main.feels_like}°C. ${capitalizeWord(weather.value.weather[0].description)}.`)

    const windDirection = computed(() => {
      const { deg } = weather.value.wind
      let direction;
      switch (true) {
        case deg >= 0 && deg <= 21:
          direction = "N"
          break
        case deg >= 22 && deg <= 44:
          direction = "NNE"
          break
        case deg >= 45 && deg <= 66:
          direction = "NE"
          break
        case deg >= 67 && deg <= 89:
          direction = "ENE"
          break
        case deg >= 90 && deg <= 111:
          direction = "E"
          break
        case deg >= 112 && deg <= 134:
          direction = "ESE"
          break
        case deg >= 135 && deg <= 156:
          direction = "SE"
          break
        case deg >= 157 && deg <= 179:
          direction = "SSE"
          break
        case deg >= 180 && deg <= 201:
          direction = "S"
          break
        case deg >= 202 && deg <= 224:
          direction = "SSW"
          break
        case deg >= 225 && deg <= 246:
          direction = "SW"
          break
        case deg >= 247 && deg <= 269:
          direction = "WSW"
          break
        case deg >= 270 && deg <= 291:
          direction = "W"
          break
        case deg >= 292 && deg <= 314:
          direction = "WNW"
          break
        case deg >= 315 && deg <= 336:
          direction = "NW"
          break
        case deg >= 337 && deg <= 359:
          direction = "NNW"
          break
        default:
          direction = ""
      }
      return direction
    })

    // can't destruct props this way cause it will lose it's reactivity
    // const { cityName } = props

    onMounted(() => {
      if (props.cityName) fetchWeather(props.cityName)
    })

    return {
      isLoading,
      weather,
      getImageUrl,
      feelsLike,
      windDirection,
    }
  },
})

</script>
<style>
.weatherImage {
  width: 100%;
}
.weatherCurrentTemp {
  font-size: 42px;
  font-weight: 700;
  margin: 0;
  padding: 0;
}
.weather-header {
  align-items: center;
  text-align: center;
}
.weather-otherData {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.weather-otherData-item {
  margin: 8px 16px 8px 0;
}
</style>
