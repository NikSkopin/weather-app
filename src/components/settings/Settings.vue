<template>
  <el-card class="settings">
    <el-row class="settings-header">
      <strong>Settings</strong>
    </el-row>
    <el-row class="settings-input">
      <el-input
        v-model="cityInput"
        placeholder="City"
        @keyup.enter="addCity"
      />
      <el-alert v-if="error" :title="error" type="error" />
    </el-row>
    <el-row v-for="(city, i) in cities" :key="i" class="settings-card">
      <settings-card :city="city" v-bind="$attrs"/>
    </el-row>
  </el-card>

</template>

<script lang="ts">
import {
  defineComponent, PropType, ref, inject,
} from "vue";
import SettingsCard from "@/components/settings/SettingsCard.vue"

export default defineComponent({
  components: { SettingsCard },
  props: {
    cities: Array as PropType<string[]>,
  },
  setup(props, { emit }) {
    const error = inject('error')
    const cityInput = ref('')

    const addCity = () => emit('cityAdd', cityInput.value)
    return {
      error,
      cityInput,
      addCity,
    }
  },
})

</script>
<style lang="scss">
.settings {
  &-header {
    margin-bottom: 24px;
  }
  &-input {
    margin-bottom: 24px;
  }
}
</style>
