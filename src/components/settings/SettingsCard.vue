<template>
    <el-row class="settingsCard">
      <el-col :span="4" class="settingsCard-hamburger">
        <span class="settingsCard-hamburger-item"></span>
        <span class="settingsCard-hamburger-item"></span>
        <span class="settingsCard-hamburger-item"></span>
      </el-col>
      <el-col :span="16" class="settingsCard-city">
        {{ city }}
      </el-col>
      <el-col :span="4" class="settingsCard-delete">
        <el-button icon="el-icon-delete" size="medium" circle
        class="settingsCard-delete__button"
        ></el-button>
      </el-col>
    </el-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    city: String,
  },
  setup() {
    return {
    }
  },
})

</script>
<style lang="scss">
.settingsCard {
  width: 100%;
  margin: 4px 0;
  align-items: center;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  height: 40px;
  border-radius: 4px;
  &-hamburger {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 4px;

    &-item {
      width: 20px;
      height: 2px;
      background-color: #2c3e50;
      margin: 2px 0;
    }
  }

  &-city {
    padding-left: 16px;
  }
  &-delete {
    &__button {
      border: none;
    }
  }
}
</style>
