<template>
  <div class="bg">
    <div class="timer" :style="{'transform': 'translateY(-50%) scale('+(scale/100)+')','filter': 'brightness('+brightness/100+')'}">
      <clock :class="[showSecond?'timer_hms':'timer_hm']" cid="clock_h" :msg="num_h" :ampm="hourFormat===0" :bg="showBg"></clock>
      <clock :class="[showSecond?'timer_hms':'timer_hm']" cid="clock_m" :msg="num_m" :bg="showBg"></clock>
      <clock v-if="showSecond" :class="[showSecond?'timer_hms':'timer_hm']" cid="clock_s" :msg="num_s" :bg="showBg"></clock>
      <div class="watchBtn" @click="startStop" v-show="timeMode>0">
        <div :style="{'color': watching?'red':'green'}">{{watching?'Stop':'Start'}}</div>
        <div style="color: #666;">click or space</div>
      </div>
    </div>
    <setbox class="set_box" ref="setRef" @closeSet="saveSet">
      <ul class="set_box_inner">
        <li>
          <div class="setName">Hour Format:</div>
          <ul class="pickItem">
            <li @click="hourFormat=0" :class="{'pick-active':hourFormat===0}">12h</li>
            <li @click="hourFormat=1" :class="{'pick-active':hourFormat===1}">24h</li>
            <li @click="hourFormat=2" :class="{'pick-active':hourFormat===2}">024h</li>
          </ul>
        </li>
        <li>
          <div class="setName">Scale:</div>
          <slider v-model="scale"></slider>
          <div style="width:32px;padding-left: 8px;">{{scale}}</div>
        </li>
        <li>
          <div class="setName">Brightness:</div>
          <slider v-model="brightness"></slider>
          <div style="width:32px;padding-left: 8px;">{{brightness}}</div>
        </li>
        <li>
          <div class="setName">Show:</div>
          <div @click="showBg=!showBg" style="margin-right: 12px;cursor: pointer;">
            <input type="checkbox" v-model="showBg" style="margin: 0;vertical-align: middle;width: 18px;height: 18px;cursor: pointer;">
            <span>Background</span>
          </div>
          <div @click="showSecond=!showSecond" style="cursor: pointer;">
            <input type="checkbox" v-model="showSecond" style="margin: 0;vertical-align: middle;width: 18px;height: 18px;cursor: pointer;">
            <span>Second</span>
          </div>
        </li>
        <li>
          <div class="setName">Stopwatch:</div>
          <button class="timerBtn startBtn" @click="stopWatch">Start</button>
          <button class="timerBtn startBtn" @click="cancelWatch">Cancel</button>
        </li>
        <li>
          <div class="setName">Timer:</div>
          <button class="timerBtn" @click="getTimer(5)">
            <span class="iconTime"></span>
            <span style="vertical-align: middle;">5m</span>
          </button>
          <button class="timerBtn" @click="getTimer(10)">
            <span class="iconTime"></span>
            <span style="vertical-align: middle;">10m</span>
          </button>
          <button class="timerBtn" @click="getTimer(25)">
            <span class="iconTomato"></span>
            <span style="vertical-align: middle;">25m</span>
          </button>
          <button class="timerBtn" @click="cancelTimer" style="margin-right: 0px;">
            <span class="iconCancel"></span>
            <span style="vertical-align: middle;">Off</span>
          </button>
        </li>
        <li>
          <div class="setName">My Timer:</div>
          <timePicker :numRange="24" v-model="my_h"></timePicker>
          <timePicker :numRange="60" v-model="my_m"></timePicker>
          <timePicker :numRange="60" v-model="my_s"></timePicker>
          <button class="timerBtn" @click="getTimer(0)" style="margin-left: 4px;">Start</button>
          <!-- <span style="font-size: 8px;">{{my_h+' '+my_m+' '+my_s}}</span> -->
        </li>
      </ul>
      <footer style="position: relative;margin: -2px 20px 0px;">
        <a href="http://baidu.com" target="_blank" style="color: #666;">1.0.0 @lufunc 2021</a>
        <span style="position: absolute;right: 0;color: #fff;">F11 - Full Screen</span>
      </footer>
    </setbox>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import clock from './components/clock'
import setbox from './components/setbox'
import slider from './components/slider'
import timePicker from './components/timePicker'
import { getClock, zeroNum } from './utils/getnum'
export default {
  components: { clock, setbox, slider, timePicker },
  setup () {
    const data = reactive({
      setRef: null,
      // clock content
      num_h: '你',
      num_m: '好',
      num_s: '!',
      // setting
      hourFormat: 0, // 12h 24h 024h
      scale: 100,
      brightness: 100,
      showBg: true,
      showSecond: true,
      timeMode: 0, // clock timer stopWatch
      tempTime: 0,
      stopTime: 0,
      watching: true,
      my_h: 0,
      my_m: 0,
      my_s: 0,
      setShow: null
    })
    const formatNum = (n) => {
      if (data.hourFormat < 2) {
        return n
      } else {
        return zeroNum(n)
      }
    }
    const getTimer = (n) => {
      data.watching = true
      let t = 0
      if (n === 0) {
        t = (data.my_h * 3600 + data.my_m * 60 + data.my_s) * 1000
        console.log('t', t)
      } else {
        t = 1000 * 60 * n
      }
      const temp = new Date().getTime()
      data.tempTime = temp + t
      data.timeMode = 1
      data.setRef.hidesetF()
    }
    const _getTimer = () => {
      if (data.watching) {
        const temp = new Date().getTime()
        let t = data.tempTime - temp
        if (t <= 0) return { h: 'ok', m: 'ok', s: 'ok' }
        t = parseInt(t / 1000)
        const h = parseInt(t / 3600)
        const m = parseInt(t / 60) % 60
        const s = t % 60
        return { h, m, s }
      } else {
        return {
          h: data.num_h,
          m: data.num_m,
          s: data.num_s
        }
      }
    }
    const cancelTimer = () => {
      data.timeMode = 0
      data.setRef.hidesetF()
    }
    const stopWatch = () => {
      data.tempTime = new Date().getTime()
      data.watching = true
      data.timeMode = 2
      data.setRef.hidesetF()
    }
    const _stopWatch = () => {
      if (data.watching) {
        const temp = new Date().getTime()
        let t = temp - data.tempTime
        t = parseInt(t / 1000)
        const h = parseInt(t / 3600)
        const m = parseInt(t / 60) % 60
        const s = t % 60
        return { h, m, s }
      } else {
        return {
          h: data.num_h,
          m: data.num_m,
          s: data.num_s
        }
      }
    }
    const cancelWatch = () => {
      data.timeMode = 0
      data.setRef.hidesetF()
    }
    const startStop = () => {
      const t = document.getElementsByClassName('pic_set')[0]
      t.style.opacity = 1
      if (data.setShow) clearTimeout(data.setShow)
      data.setShow = setTimeout(() => {
        t.style.opacity = ''
      }, 400)
      if (data.watching) {
        data.watching = false
        data.stopTime = new Date().getTime()
      } else {
        data.watching = true
        const temp = new Date().getTime()
        data.tempTime = data.tempTime + temp - data.stopTime
      }
    }
    setInterval(() => {
      let res = {}
      const m = data.timeMode
      if (m === 0) {
        res = getClock()
      } else if (m === 1) {
        res = _getTimer()
      } else if (m === 2) {
        res = _stopWatch()
      }
      data.num_h = formatNum(res.h)
      data.num_m = zeroNum(res.m)
      data.num_s = zeroNum(res.s)
    }, 200)
    const saveSet = () => {
      const arr = ['hourFormat', 'scale', 'brightness', 'showBg', 'showSecond', 'my_h', 'my_m', 'my_s']
      const info = {}
      for (const k of arr) {
        info[k] = data[k]
      }
      const t = JSON.stringify(info)
      localStorage.info = t
    }
    const readSet = () => {
      if (localStorage.info) {
        const info = JSON.parse(localStorage.info)
        for (const k in info) {
          data[k] = info[k]
        }
      }
    }
    readSet()
    onMounted(() => {
      document.onkeydown = (e) => {
        // console.log('e.keyCode', e.keyCode)
        if (e.keyCode === 32 || e.keyCode === 13) {
          startStop()
        }
      }
    })
    const ttt = () => {
      console.log('ttt')
    }
    return {
      ...toRefs(data),
      getTimer,
      cancelTimer,
      stopWatch,
      startStop,
      cancelWatch,
      saveSet,
      ttt
    }
  }
}
</script>

<style lang="less">
@import './assets/base';
@import './assets/images';
.bg{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
}
.timer{
  position: absolute;
  top: 50%;
  width: 100%;
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
.watchBtn{
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  text-align: center;
  opacity: 0;
  transition: all 0.3s;
  cursor: pointer;
  &:hover{
    opacity: 1;
  }
  &:active{
    background-color: rgba(255, 255, 255, 0);
  }
  &>div{
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  &>div:first-child{
    font-size: 180px;
    top: 46%;
  }
  &>div:last-child{
    top: 90%;
  }
}
.set_box{
  position: fixed;
  bottom: 0;
  right: 0;
}
.set_box_inner{
  padding: 20px;
  padding-bottom: 0px;
  color: #fff;
  font-size: 18px;
  &>li{
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }
}
.setName{
  width: 116px;
  margin-right: 12px;
  text-align: right;
}
.pickItem{
  display: flex;
  text-align: center;
  border-radius: 6px;
  cursor: pointer;
  &>li{
    box-sizing: border-box;
    width: 60px;
    height: 24px;
    line-height: 22px;
    border: 1px solid #666;
    border-right: 0;
    &:first-child{
      border-top-left-radius: inherit;
      border-bottom-left-radius: inherit;
    }
    &:last-child{
      border-right: 1px solid #666;
      border-top-right-radius: inherit;
      border-bottom-right-radius: inherit;
    }
  }
}
.pick-active{
  color: #333;
  background-color: #fff;
}
.timerBtn{
  box-sizing: border-box;
  width: 60px;
  height: 24px;
  border-radius: 4px;
  margin-right: 6px;
  background-color: #fff;
  color: #1c1c1c;
  font-size: 16px;
  // font-size: 18px;
  cursor: pointer;
  &:active{
    background-color: #ddd;
  }
}
.startBtn{
  background-color: #666;
  color: #fff;
  &:active{
    background-color: #555;
  }
}
.iconTime,.iconTomato,.iconCancel{
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: middle;
  background-size: contain;
}
.iconTime{
  background-image: url(@timer);
}
.iconTomato{
  margin-top: -3px;
  background-image: url(@tomato);
}
.iconCancel{
  background-image: url(@cancel);
}
</style>
