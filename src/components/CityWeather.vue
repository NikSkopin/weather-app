<template>
  <el-card>
    <el-row><strong>{{ weather.name }}</strong></el-row>
    <el-row class="weather-header">
      <el-col :span="12">
        <img
          :src="getImageUrl(weather.icon, '4x')"
          class="weatherImage"
        />
      </el-col>
      <el-col :span="12">
        <p class="weatherCurrentTemp">{{ weather.temp }}</p>
      </el-col>
    </el-row>
    <el-row class="weather-feelsLike">
      <p>
        <strong>{{ descriptionText }}</strong>
      </p>
    </el-row>
    <el-row class="weather-otherData">
      <p class="weather-otherData-item">Wind: {{ `${weather.speed} m/s ${windDirection}`}}</p>
      <p class="weather-otherData-item">Pressure: {{ `${weather.pressure} hPa`}}</p>
      <p class="weather-otherData-item">Humidity: {{ `${weather.humidity} %`}}</p>
      <p class="weather-otherData-item">Visibility: {{ `${weather.visibility/1000} km`}}</p>
    </el-row>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue";
import { Weather } from "@/models/city.model"

export default defineComponent({
  props: {
    weather: Object as PropType<Weather>,
  },
  setup(props) {
    const getImageUrl = (iconName: string, size: '2x' | '4x') => `http://openweathermap.org/img/wn/${iconName}@${size || '1x'}.png`

    const capitalizeWord = (string: string | undefined) => string && string.charAt(0).toUpperCase() + string.slice(1)

    // COMPUTED values
    const descriptionText = computed(() : string => {
      const capitalized = capitalizeWord(props.weather?.description)
      return `Feels like ${props.weather?.feelsLike}°C. ${capitalized}.`
    })

    const windDirection = computed(() : string => {
      const deg = props.weather?.windDeg
      let direction = "";
      if (deg) {
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
      }
      return direction
    })

    return {
      getImageUrl,
      descriptionText,
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
