<template>
  <div class="clock">
    <canvas :id="cid" class="clock_canva" width="800" height="800"></canvas>
  </div>
</template>

<script>
import { onMounted, reactive, watch } from 'vue'
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
      fontFamily: 'Arial',
      flipping: false,
      tempVal: '08',
      tempAp: 'AM',
      ctx: null
    })
    const getAp = () => {
      const res = {}
      res.ap = ''
      res.num = props.msg
      if (props.ampm) {
        const num = parseInt(props.msg)
        // let num = props.msg
        if (num < 12) {
          res.ap = 'AM'
        } else if (num < 24) {
          res.ap = 'PM'
          res.num = num - 12 > 0 ? num - 12 : 12
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
      ctx.translate(0, 400)
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = 'normal bold ' + data.fontSize + 'px ' + data.fontFamily
      const { ap, num } = getAp()
      data.tempAp = ap
      data.tempVal = num
      drawPage(num, ap, true)
      drawPage(num, ap, false)
    }
    const clipArea = (up) => {
      const ctx = data.ctx
      const r = data.r
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
      const ctx = data.ctx
      ctx.fillStyle = gradient(ctx, '#161616', '#0c0c0c')
      ctx.fillRect(0, -400, 800, 800)
    }
    const drawAmpm = (ap) => {
      const ctx = data.ctx
      // console.log('ap', ap)
      const x = 100; const y = 264
      ctx.save()
      ctx.font = 'normal bold 80px ' + data.fontFamily
      if (ap === 'AM') {
        ctx.fillStyle = '#bbbbbb'
        ctx.fillText(ap, x, -y)
      } else {
        ctx.fillStyle = '#b9b9b9'
        ctx.fillText(ap, x, y)
      }
      ctx.restore()
    }
    const drawText = (s) => {
      const ctx = data.ctx
      ctx.fillStyle = gradient(ctx, '#bcbcbc', '#b8b8b8')
      ctx.fillText(s, 400, 0)
    }
    const blackLine = (w = 12) => {
      const ctx = data.ctx
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, -w / 2, 800, w)
    }
    const drawPage = (s, ap, up = true, sy = 1) => {
      const ctx = data.ctx
      ctx.save()
      ctx.scale(1, sy) // scale Y
      clipArea(up)
      if (props.bg) drawBg()
      else ctx.clearRect(0, -400, 800, 800)
      if (props.ampm) drawAmpm(ap)
      drawText(s)
      blackLine()
      ctx.restore()
    }
    const drawFlip = () => {
      if (data.flipping) return
      data.flipping = true
      const timer = new Date().getTime()
      const duration = 600
      const { ap, num } = getAp()
      const flipping = () => {
        const temp = new Date().getTime()
        const t = temp - timer
        if (t > duration) {
          data.flipping = false
          data.tempVal = num
          data.tempAp = ap
          drawPage(num, ap)
          drawPage(num, ap, false)
          return
        }
        let drawUp = true // Page turning is done and draw it again
        const pi = Math.PI
        const sy = Math.sin(easeInout(t, -90, 90, duration) * pi / 180)
        if (t < duration / 2) {
          drawPage(num, ap)
          drawPage(data.tempVal, data.tempAp, true, -sy)
        } else {
          if (drawUp) {
            drawUp = false
            drawPage(num, ap)
          }
          drawPage(data.tempVal, data.tempAp, false)
          drawPage(num, ap, false, sy)
        }
        requestAnimationFrame(flipping)
      }
      flipping()
    }
    onMounted(() => {
      init()
      // drawFlip()
    })
    // const ttt = () => {
    //   console.log('tttx')
    //   const timer = new Date().getTime()
    //   const ttt2 = () => {
    //     console.log('ttt2')
    //     const temp = new Date().getTime()
    //     const t = temp - timer
    //     if (t > 600) return
    //     requestAnimationFrame(ttt2)
    //   }
    //   ttt2()
    // }
    watch([() => props.msg, () => props.ampm],
      () => {
        // console.log('watch', props.msg, props.ampm)
        drawFlip()
      })
    watch(() => props.bg, () => { drawFlip() })
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
}
.clock_canva{
  width: 100%;
  height: 100%;
}
</style>
