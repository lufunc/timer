<template>
  <div class="bg">
    <div class="timer" @click="ttt">
      <clock cid="clock_h"></clock>
      <clock cid="clock_m"></clock>
      <clock cid="clock_s"></clock>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import clock from './components/clock'
export default {
  components: { clock },
  setup () {
    const data = reactive({
      // clock content
      h: 0,
      m: 0,
      s: 0,
      // setting
      hourFormat: 0, // 12h 24h 024h
      scale: 1,
      brightness: 1,
      showBg: true,
      showSecond: true
    })
    const ttt = () => {
      console.log('ttt')
    }
    return {
      ...toRefs(data),
      ttt
    }
  }
}
</script>

<style lang="less">
body{
  margin: 0;
}
ul{
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.bg{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  // background-color: #000;
}
.timer{
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-evenly;
}
</style>
