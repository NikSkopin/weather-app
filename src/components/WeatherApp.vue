<template>
  <el-container v-if="!isLoading" class="weather-container">
    <el-container v-if="preferencesOpened" class="weather-container">
      <el-button
        circle
        class="weather-service-button" icon="el-icon-check" size="small"
        @click="togglePreferences"
      />
      <el-main>
        <Settings :cities="Object.keys(weather)" @cityAdd="addCity" @deleteCity="deleteCity"/>
      </el-main>
    </el-container>
    <el-container class="weather-container" v-else>
      <el-button
        icon="el-icon-edit" size="small" circle
        @click="togglePreferences"
        class="weather-service-button"
      />
      <el-main>
        <el-row v-for="(city, i) in Object.keys(weather)" :key="i">
          <city-weather :weather="weather[city]"/>
        </el-row>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import {
  defineComponent, ref, onMounted, provide,
} from "vue";
import City from "@/models/city.model"
import CityWeather from "@/components/CityWeather.vue";
import Settings from "@/components/settings/Settings.vue";
import { key } from "@/services/weatherApiKeys";

export default defineComponent({
  components: { Settings, CityWeather },
  setup() {
    const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?'

    // some helpers
    const preferencesOpened = ref<boolean>(false)
    const isLoading = ref(true)
    const error = ref('')

    // vue 3 props sharing
    provide('error', error)

    const weather = ref<City>({})

    // local storage cities array
    const weatherCards = ref<string[]>([])

    const togglePreferences = (): void => {
      preferencesOpened.value = !preferencesOpened.value
    }

    const getFromLocalStorage = (): string[] | null => {
      const item = localStorage.getItem('weatherCards')
      const cities = item && JSON.parse(item)
      return cities
    }
    const saveToLocalStorage = (citiesArray: string) => {
      localStorage.setItem('weatherCards', citiesArray)
    }

    const fetchWeather = async (cityName: string) => {
      try {
        isLoading.value = true
        error.value = ''
        const response = await fetch(`${weatherUrl}q=${cityName}&appid=${key}&units=metric`)

        if (response.status === 200) {
          const weatherObject = await response.json()

          weather.value[`${cityName}`] = {
            name: weatherObject.name,
            icon: weatherObject.weather[0].icon,
            temp: weatherObject.main.temp,
            windSpeed: weatherObject.wind.speed,
            windDeg: weatherObject.wind.deg,
            humidity: weatherObject.main.humidity,
            pressure: weatherObject.main.pressure,
            visibility: weatherObject.visibility,
            feelsLike: weatherObject.main.feels_like,
            description: weatherObject.weather[0].description,
          }

          saveToLocalStorage(JSON.stringify(Object.keys(weather.value)))
        } else error.value = `City ${cityName} not found!`
      } catch (e) {
        console.log(e)
      } finally {
        isLoading.value = false
      }
    }

    const addCity = (city: string) => {
      fetchWeather(city)
    }

    const deleteCity = (city: string) => {
      delete weather.value[city]
      saveToLocalStorage(JSON.stringify(Object.keys(weather.value)))
    }

    // when mounted check for an array with cities in the localstorage
    onMounted(() => {
      let citiesArray = getFromLocalStorage()
      if (!citiesArray) {
        // get position and save city name into localstorage
        // we can use geolocation browser api, google api or whatever we want
        // hardcoded for purposes of simplification
        citiesArray = ["Moscow"]
        saveToLocalStorage(JSON.stringify(citiesArray))
      }
      if (citiesArray) {
        citiesArray.forEach((city) => {
          fetchWeather(city)
        })
      }
    })

    return {
      error,
      weather,
      preferencesOpened,
      togglePreferences,
      weatherCards,
      addCity,
      deleteCity,
      isLoading,
    }
  },
})

</script>
<style>
.el-container {
  width: 350px;
}

.weather-container {
  position: relative;
}

.weather-service-button {
  position: absolute;
  top: 35px;
  right: 35px;
  z-index: 10;
}
</style>
