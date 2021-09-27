<template>
  <el-container class="weather-container">
    <el-container class="weather-container" v-if="preferencesOpened">
      <el-button
        @click="togglePreferences"
        type="primary" icon="el-icon-check" size="small" circle
        class="weather-service-button"
      />
      <el-main >
        <Settings :cities="weatherCards" @cityAdd="addCity"/>
      </el-main>
    </el-container>
    <el-container class="weather-container" v-else>
      <el-button
        type="primary" icon="el-icon-edit" size="small" circle
        @click="togglePreferences"
        class="weather-service-button"
      />
      <el-main>
        <el-row v-for="(city, i) in weatherCards" :key="i">
          <city-weather :cityName="city"/>
        </el-row>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import CityWeather from "@/components/CityWeather.vue";
import Settings from "@/components/settings/Settings.vue";

export default defineComponent({
  components: { CityWeather, Settings },
  setup() {
    const preferencesOpened = ref<boolean>(false)

    const weatherCards = ref<string[]>([])

    const togglePreferences = () : void => {
      preferencesOpened.value = !preferencesOpened.value
    }

    // при загрузке получить массив из лс. если его нет, по координатам получить позицию,
    // добавить в массив и сохранить в лс. рендерить карточки из массива, передавать этот массив
    // в сеттингс. при изменении массива в настройках, эмитить изменение и пересохранять массив

    const getFromLocalStorage = () : string[] | null => {
      const item = localStorage.getItem('weatherCards')
      const cities = item && JSON.parse(item)
      return cities
    }
    const saveToLocalStorage = (citiesArray : string) => {
      localStorage.setItem('weatherCards', citiesArray)
    }

    const addCity = (city : string) => {
      weatherCards.value.push(city)
      saveToLocalStorage(JSON.stringify(weatherCards.value))
    }

    // check for an array with cities in the localstorage
    onMounted(() => {
      let citiesArray = getFromLocalStorage()
      if (!citiesArray) {
        // get position and save city name into localstorage
        citiesArray = ["Moscow"]
        saveToLocalStorage(JSON.stringify(citiesArray))
      }
      weatherCards.value = citiesArray
    })

    return {
      preferencesOpened,
      togglePreferences,
      weatherCards,
      addCity,
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
