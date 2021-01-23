<template>
  <div class="slider" ref="mySlider" :style="{'height':barHeight}" @mousedown="sliderHandle">
    <div class="bar-line-right" :style="{'width':barHeight,'height':lineHeight}"></div>
    <div class="bar-line" :style="{'width': 'calc(100% - '+barHeight+')','height':lineHeight,'background-size':modelValue+'%'}">
      <div class="bar-handle" :style="{'width':barHeight,'height':barHeight,'left':modelValue+'%'}"></div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  props: {
    modelValue: Number,
    barHeight: {
      default: '20px'
    },
    lineHeight: {
      default: '4px'
    }
  },
  setup (props, { emit }) {
    const mySlider = ref(null)
    const sliderHandle = (event) => {
      let x = props.barHeight.match(/(\d+)/)[1]
      x = parseInt(x)
      const temp = mySlider.value
      const tl = temp.getBoundingClientRect().left
      const tw = temp.offsetWidth
      const numRange = (n) => {
        let res = n
        const max = tw - x
        if (n < 0) res = 0
        else if (n > max) res = max
        emit('update:modelValue', parseInt(res * 100 / max))
      }
      numRange(event.pageX - tl - x / 2)
      document.onmousemove = (e) => {
        numRange(e.pageX - tl - x / 2)
      }
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
    return {
      sliderHandle,
      mySlider
    }
  }
}
</script>

<style lang="less">
.slider{
  position: relative;
  width: 220px;
  // background-color: chocolate;
  cursor: pointer;
}
.bar-line{
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  background: -webkit-linear-gradient(#fff, #fff) no-repeat, rgba(255,255,255,0.25);
  background-size: 0% 100%;
}
.bar-line-right{
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  background-color: rgba(255,255,255,0.25);
}
.bar-handle{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  box-sizing: border-box;
  border: 4px solid #fff;
  background-color: #262729;
  border-radius: 50%;
  box-shadow: 0 0 0 4px #262729;
}
</style>
