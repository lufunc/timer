<template>
  <div class="clock">
    <canvas :id="cid" class="clock_canva" width="800" height="800"></canvas>
  </div>
</template>

<script>
import { onMounted } from 'vue'
export default {
  props: {
    cid: String,
    bg: {
      default: true
    },
    msg: {
      default: '54'
    }
  },
  setup (props) {
    const init = () => {
      const canvas = document.querySelector('#' + props.cid)
      if (!canvas.getContext) return
      const ctx = canvas.getContext('2d')
      console.log('init')
      const r = 64
      const fontSize = 660
      ctx.translate(0, 400)
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = 'normal bold ' + fontSize + 'px Arial'
      drawPage(ctx, r, fontSize, props.msg, true)
      drawPage(ctx, r, fontSize, props.msg, false)
      // ctx.font = 'normal bold '+fontSize+'px sans-serif'
      // ctx.arc(r, r, r , pi, 3*pi/2)
      // ctx.arc(800-r, r, r , 3*pi/2, 2*pi)
      // ctx.arc(800-r, 800-r, r , 0, pi/2)
      // ctx.arc(r, 800-r, r , pi/2, pi)
      // ctx.clip()
      // ctx.font ='14px Arial'
      // ctx.textAlign = 'center'
      // ctx.textBaseline = 'middle'
      // ctx.save()
      //   ctx.arc(x, yyy, rrr, 0, 2 * Math.PI)
      //   ctx.clip()
      //   ctx.fillStyle = '#7275fe'
      //   ctx.fillRect(x-rrr, yyy-rrr, 2*rrr, 2*rrr)
      // ctx.fillText(s, x, y)
      //   ctx.restore()
      //   this.drawmsg(n[0], x, yyy, '40px sans-serif', '#fff')
      // ctx.createLinearGradient(x,y,x2,y2)/
      // context.rotate(angel)
      // ctx.clearRect(0, 0, 300, 300)
    }
    // const draw = () => {

    // }
    const clipArea = (ctx, r, up) => {
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
      const lg = ctx.createLinearGradient(0, 0, 0, 800)
      lg.addColorStop(0, c1)
      lg.addColorStop(1, c2)
      return lg
    }
    const drawBg = (ctx) => {
      ctx.fillStyle = gradient(ctx, 'blue', 'yellow')
      ctx.fillRect(0, -400, 800, 800)
    }
    const drawText = (ctx, s) => {
      console.log('s', s)
      ctx.fillStyle = gradient(ctx, 'red', 'blue')
      ctx.fillText(s, 400, 0)
    }
    const blackLine = (ctx, w = 20) => {
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, -w / 2, 800, w)
    }
    const drawPage = (ctx, r, fs, s, up = true, sy = 1) => {
      ctx.save()
      ctx.scale(1, sy)
      clipArea(ctx, r, up)
      if (props.bg) drawBg(ctx)
      drawText(ctx, s)
      blackLine(ctx)
      ctx.restore()
    }
    onMounted(() => {
      init()
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
