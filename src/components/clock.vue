<template>
  <div class="clock">
    <canvas :id="cid" class="clock_canva" width="800" height="800"></canvas>
  </div>
</template>

<script>
import { onMounted, reactive, computed, watchEffect } from 'vue'
import easeInout from '../utils/easeinout'
var ctx = null
export default {
  props: {
    cid: String,
    msg: {
      default: '13'
    },
    bg: {
      default: true
    },
    ampm: {
      default: true
    }
  },
  setup (props) {
    const data = reactive({
      r: 64,
      fontSize: 660,
      flipping: false,
      tempVal: '08',
      tempAp: 'AM'
    })
    const getAp = () => {
      let res = ''
      if(props.ampm){
        let num = parseInt(props.msg)
        if(num<12){
          res =  'AM'
        }else if(num<24){
          res =  'PM'
        }
      }
      return res
    }
    const init = () => {
      const canvas = document.querySelector('#' + props.cid)
      if (!canvas.getContext) return
      ctx = canvas.getContext('2d')
      console.log('init')
      const r = 64
      const fontSize = 660
      ctx.translate(0, 400)
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = 'normal bold ' + fontSize + 'px Arial'
      let ap = getAp()
      drawPage(props.msg,ap,true)
      drawPage(props.msg,ap,false)
    }
    const clipArea = (up) => {
      let r = data.r
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(800, 0)
      if (up) {
        ctx.lineTo(800, r - 400)
        ctx.quadraticCurveTo(800, -400, 800 - r, -400)
        ctx.lineTo(r, -400)
        ctx.quadraticCurveTo(0, -400, 0, r - 400)
      } else {
        ctx.lineTo(800, 400 - r)
        ctx.quadraticCurveTo(800, 400, 800 - r, 400)
        ctx.lineTo(r, 400)
        ctx.quadraticCurveTo(0, 400, 0, 400 - r)
      }
      ctx.clip()
    }
    const gradient = (ctx, c1, c2) => {
      const lg = ctx.createLinearGradient(0, -400, 0, 400)
      lg.addColorStop(0, c1)
      lg.addColorStop(1, c2)
      return lg
    }
    const drawBg = () => {
      ctx.fillStyle = gradient(ctx, 'blue', 'yellow')
      ctx.fillRect(0, -400, 800, 800)
    }
    const drawAmpm = (ap) => {
      // console.log('ap', ap)
      let x = 100,y=264
      ctx.save()
      ctx.font = 'normal bold 80px Arial'
      if(ap==='AM'){
        ctx.fillStyle = '#bbbbbb'
        ctx.fillText(ap, x, -y)
      }else{
        ctx.fillStyle = '#b9b9b9'
        ctx.fillText(ap, x, y)
      }
      ctx.restore()
    }
    const drawText = (s) => {
      ctx.fillStyle = gradient(ctx, 'red', 'blue')
      ctx.fillText(s, 400, 0)
    }
    const blackLine = (w = 20) => {
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, -w / 2, 800, w)
    }
    const drawPage = (s,ap,up = true, sy = 1) => {
      ctx.save()
      ctx.scale(1, sy) // scale Y
      clipArea(up)
      if (props.bg) drawBg();
      if (props.ampm) drawAmpm(ap);
      drawText(s)
      blackLine()
      ctx.restore()
    }
    const drawFlip = () => {
      let timer = new Date().getTime()
      data.flipping = true
      let duration = 600
      let ap = getAp()
      const flipping = () => {
        let temp = new Date().getTime()
        let t=temp-timer
        if(t>duration){
          data.flipping = false
          // data.tempVal = props.msg
          // data.tempAp = ap
          drawPage(props.msg,ap,false)
          return
        }
        let drawUp = true // Page turning is done and draw it again
        let pi = Math.PI
        let sy = Math.sin(easeInout(t,-90,90,duration)*pi/180)
        if(t<duration>>1){
          drawPage(props.msg,ap)
          drawPage(data.tempVal,data.tempAp,true,-sy)
        }else{
          if(drawUp){
            drawUp = false
            drawPage(props.msg,ap)
          }
          drawPage(data.tempVal,data.tempAp,false)
          drawPage(props.msg,ap,false,sy)
        }
        requestAnimationFrame(flipping)
      }
      flipping()
    }
    onMounted(() => {
      init()
      // drawFlip()
    })
    const ttt = () => {
      console.log('tttx')
      let timer = new Date().getTime()
      const ttt2 = () => {
        console.log('ttt2')
        let temp = new Date().getTime()
        let t=temp-timer
        if(t>600) return;
        requestAnimationFrame(ttt2)
      }
      ttt2()
    }
    watchEffect(()=>{
      console.log('watchEffect',props.msg,props.ampm)
      if(ctx){
        console.log('ctx')
        // ttt()
        drawFlip()
      }
    })
  }
}
</script>

<style lang="less">
.clock{
  width: 240px;
  height: 240px;
  // background-color: #666;
}
.clock_canva{
  width: 100%;
  height: 100%;
}
</style>
