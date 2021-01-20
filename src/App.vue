<template>
  <div class="bg">
    <div class="timer">
      <clock cid="clock_h" :msg="num_h"></clock>
      <!-- <clock cid="clock_m"></clock>
      <clock cid="clock_s" :msg="num_h"></clock> -->
    </div>
    <button @click="ttt">ttt{{num_h}}</button>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import clock from './components/clock'
import easeInout from './utils/easeinout'
export default {
  components: { clock },
  setup () {
    const data = reactive({
      // clock content
      num_h: 9,
      num_m: 0,
      num_s: 0,
      // setting
      hourFormat: 0, // 12h 24h 024h
      scale: 1,
      brightness: 1,
      showBg: true,
      showSecond: true
    })
    const ttt = () => {
      console.log('ttt')
      data.num_h++
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
  // top: 50%;
  // transform: translateY(-50%);
  display: flex;
  justify-content: space-evenly;
}
</style>
