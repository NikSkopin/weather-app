<template>
  <div id="app">
    <weather-app />
  </div>
</template>

<script>
import WeatherApp from "@/components/WeatherApp.vue";

export default {
  components: { WeatherApp },
}

</script>
<style>
body {
  font-family: Roboto, Arial, sans-serif;
}
</style>
