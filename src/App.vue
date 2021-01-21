<template>
  <div class="bg">
    <div class="timer">
      <clock :class="[showSecond?'timer_hms':'timer_hm']" cid="clock_h" :msg="num_h" :ampm="hourFormat===0" :bg="showBg"></clock>
      <clock :class="[showSecond?'timer_hms':'timer_hm']" cid="clock_m" :msg="num_m" :bg="showBg"></clock>
      <clock v-if="showSecond" :class="[showSecond?'timer_hms':'timer_hm']" cid="clock_s" :msg="num_s" :bg="showBg"></clock>
    </div>
    <setbox class="set_box">
      <div @click="ttt">ttt</div>
    </setbox>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import clock from './components/clock'
import setbox from './components/setbox'
export default {
  components: { clock,setbox },
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
      showSecond: true,
      timeMode: 0, // clock timer stopWatch
      tempTime: 1611197322577
    })
    const zeroNum = (n) => {
      return n < 10 ? '0' + n : n
    }
    const formatNum = (n) => {
      if (data.hourFormat < 2) {
        return n
      } else {
        return zeroNum(n)
      }
    }
    const getClock = () => {
      const t = new Date()
      const h = t.getHours()
      const m = t.getMinutes()
      const s = t.getSeconds()
      return { h, m, s }
    }
    const getTimer = () => {
      let temp = new Date().getTime()
      let t = data.tempTime - temp
      if(t<0) return {h:0,m:0,s:0};
      t = parseInt(t/1000)
      let h = parseInt(t/3600)
      let m = parseInt(t/60) % 60
      let s = t%60
      return {h,m,s}
    }
    const stopWatch = () => {
      let temp = new Date().getTime()
      let t = temp - data.tempTime
      t = parseInt(t/1000)
      let h = parseInt(t/3600)
      let m = parseInt(t/60) % 60
      let s = t%60
      return {h,m,s}
    }
    setInterval(() => {
      let res = null
      let m = data.timeMode
      if(m === 0){
        res = getClock()
      }else if(m === 1){
        res = getTimer()
      }else if(m === 2){
        res = stopWatch()
      }else{
        res = getClock()
      }
      data.num_h = formatNum(res.h)
      data.num_m = zeroNum(res.m)
      data.num_s = zeroNum(res.s)
    }, 200)
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
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>
