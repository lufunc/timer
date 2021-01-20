<template>
  <div class="bg">
    <div class="timer">
      <clock :class="[showSecond?'timer_hms':'timer_hm']" cid="clock_h" :msg="num_h" :ampm="hourFormat===0" :bg="showBg"></clock>
      <clock :class="[showSecond?'timer_hms':'timer_hm']" cid="clock_m" :msg="num_m" :bg="showBg"></clock>
      <clock v-if="showSecond" :class="[showSecond?'timer_hms':'timer_hm']" cid="clock_s" :msg="num_s" :bg="showBg"></clock>
    </div>
    <div class="set_box">
      <div class="setting" @click="ttt"></div>
    </div>
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
      num_h: '你',
      num_m: '好',
      num_s: '!',
      // setting
      hourFormat: 0, // 12h 24h 024h
      scale: 1,
      brightness: 1,
      showBg: true,
      showSecond: true
    })
    const zeroNum = (n) => {
      return n<10 ? '0'+n : n
    }
    const formatNum = (n) => {
      if(data.hourFormat < 2){
        return n
      }else{
        return zeroNum(n)
      }
    }
    const gettimer = () => {
      let t = new Date()
      let h = t.getHours()
      let m = t.getMinutes()
      let s = t.getSeconds()
      return {h,m,s}
    }
    let timer = setInterval(() => {
      let res = gettimer()
      data.num_h = formatNum(res.h)
      data.num_m = zeroNum(res.m)
      data.num_s = zeroNum(res.s)
    }, 200);
    const ttt = () => {
      console.log('ttt')
      // data.showSecond = !data.showSecond
      // data.hourFormat++
      // if(data.hourFormat>2) data.hourFormat=0;
      data.showBg = !data.showBg
      console.log('data.showBg', data.showBg)
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
  background-color: #000;
}
.timer{
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-evenly;
}
.timer_hm{
  width: 47.5vw;
  height: 47.5vw;
}
.timer_hms{
  width: 30vw;
  height: 30vw;
}
.set_box{
  // display: none;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 200px;
  height: 200px;
  &:hover .setting{
    opacity: 1;
  }
}
.setting{
  position: absolute;
  bottom: 8vw;
  right: 8vw;
  width: 36px;
  height: 36px;
  opacity: 0;
  background-image: url(data:image/png;base64,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);
  transition: all 0.5s ease-in-out;
  &:hover{
    transform: rotateZ(120deg);
  }
}
</style>
