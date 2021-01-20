<template>
  <div class="clock">
    <canvas :id="cid" class="clock_canva" width="800" height="800"></canvas>
  </div>
</template>

<script>
import { onMounted, reactive, computed, watchEffect, watch } from 'vue'
import easeInout from '../utils/easeinout'
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
      default: false
    }
  },
  setup (props) {
    const data = reactive({
      r: 64,
      fontSize: 660,
      flipping: false,
      tempVal: '08',
      tempAp: 'AM',
      ctx: null
    })
    const getAp = () => {
      let res = {}
      res.ap = ''
      res.num = props.msg
      if(props.ampm){
        let num = parseInt(props.msg)
        // let num = props.msg
        if(num<12){
          res.ap =  'AM'
        }else if(num<24){
          res.ap =  'PM'
          res.num = num-12
        }
      }
      return res
    }
    const init = () => {
      const canvas = document.querySelector('#' + props.cid)
      if (!canvas.getContext) return
      const ctx = canvas.getContext('2d')
      data.ctx = ctx
      console.log('init')
      const r = 64
      const fontSize = 660
      ctx.translate(0, 400)
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = 'normal bold ' + fontSize + 'px Arial'
      let {ap,num} = getAp()
      data.tempAp = ap
      data.tempVal = num
      drawPage(num,ap,true)
      drawPage(num,ap,false)
    }
    const clipArea = (up) => {
      let ctx = data.ctx
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
      let ctx = data.ctx
      ctx.fillStyle = gradient(ctx, 'blue', 'yellow')
      ctx.fillRect(0, -400, 800, 800)
    }
    const drawAmpm = (ap) => {
      let ctx = data.ctx
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
      let ctx = data.ctx
      ctx.fillStyle = gradient(ctx, 'red', 'blue')
      ctx.fillText(s, 400, 0)
    }
    const blackLine = (w = 20) => {
      let ctx = data.ctx
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, -w / 2, 800, w)
    }
    const drawPage = (s,ap,up = true, sy = 1) => {
      let ctx = data.ctx
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
      if(data.flipping) return;
      data.flipping = true
      let timer = new Date().getTime()
      let duration = 600
      let {ap,num} = getAp()
      const flipping = () => {
        let temp = new Date().getTime()
        let t=temp-timer
        if(t>duration){
          data.flipping = false
          data.tempVal = num
          data.tempAp = ap
          drawPage(num,ap,false)
          return
        }
        let drawUp = true // Page turning is done and draw it again
        let pi = Math.PI
        let sy = Math.sin(easeInout(t,-90,90,duration)*pi/180)
        if(t<duration>>1){
          drawPage(num,ap)
          drawPage(data.tempVal,data.tempAp,true,-sy)
        }else{
          if(drawUp){
            drawUp = false
            drawPage(num,ap)
          }
          drawPage(data.tempVal,data.tempAp,false)
          drawPage(num,ap,false,sy)
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
    watch([()=>props.msg,()=>props.ampm],
      ()=>{
        console.log('watch',props.msg,props.ampm)
        drawFlip()
    })
    // watchEffect(()=>{
    //   console.log('watchEffect',props.msg,props.ampm)
    //   if(data.ctx){
    //     console.log('ctx')
    //     // ttt()
    //     drawFlip()
    //   }
    // })
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
