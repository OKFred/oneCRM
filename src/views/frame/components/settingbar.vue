<template>
  <div>
    <a-avatar src="https://joeschmoe.io/api/v1/random" />
    <span style="padding-right: 40px;"></span>
    <img :src="svgURL" :style="svgStyle.str" alt="my-logo" />
    <span style="padding-right: 20px; padding-right: 20px;"></span>
  </div>
</template>

<script>
import { reactive, defineComponent } from 'vue';
import svgURL from '@/assets/setting.svg';
let svgStyle = reactive({
  deg: 0,
  str: `transform: rotate(360deg); translateZ(0px);`
});
setInterval(() => {
  svgStyle.deg = svgStyle.deg < 200 ? svgStyle.deg + 9 : svgStyle.deg < 300 ? svgStyle.deg + 6 : svgStyle.deg < 360 ? svgStyle.deg + 3 : 0;
  svgStyle.str = `transform: rotate(${svgStyle.deg}deg); translateZ(0px);`;
}, 50);
export default defineComponent({
  name: "svg-icon",
  setup() {
    return {
      svgURL,
      svgStyle
    };
  }
});
</script>