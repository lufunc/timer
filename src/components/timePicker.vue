<template>
  <div class="time-panel-box">
    <div class="time-panel">
      <div class="scroll-box" ref="sb" @scroll="comfirmNum">
        <ul class="panel-item">
          <li v-for="(item,index) in temp" :key="index">{{item}}</li>
        </ul>
      </div>
      <div class="panel-up" @click="changeNum(-1)">︿</div>
      <div class="panel-down" @click="changeNum(1)">﹀</div>
    </div>
  </div>
  
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
export default {
  props: {
    modelValue: Number,
    numRange: {
      default: 12
    }
  },
  setup(props, { emit }){
    const data = reactive({
      val: 0,
      temp: [],
      sb: null,
      timeout: null
    })
    // console.log('props.numRange', props.numRange)
    const init = () => {
      for(let i=0;i<props.numRange;i++){
        let x = i>9? i : '0'+i
        data.temp.push(x)
      }
    }
    init()
    const throttle = (fn, wait=300) => {
      data.timeout = null
      return function(){
        clearTimeout(data.timeout)
        data.timeout = setTimeout(() => {
          fn.apply(this,arguments)
        }, wait);
      }
    }
    const changeNum = (n) => {
      if(data.timeout) clearTimeout(data.timeout);
      let e = data.sb
      let t = e.scrollTop
      let h = 24
      let tl = data.temp.length
      for(let i=tl-1;i>=0;i--){
        if(t > h*i-h/2){
          // console.log('i', i)
          let x = i +n
          if(x<0) x=0;
          if(x>tl-1) x=tl-1;
          // console.log('x', x)
          e.scrollTop = h*x
          emit('update:modelValue',x)
          break
        }
      }
    }
    const comfirmNum = throttle(()=>{
      changeNum(0)
    })
    onMounted(()=>{
      data.sb.scrollTop = props.modelValue*24
      console.log(data.sb.scrollHeight,data.sb.scrollTop)
    })
    return {
      ...toRefs(data),
      changeNum,
      comfirmNum
    }
  }
}
</script>

<style lang="less">
.time-panel-box{
  height: 24px;
  padding: 16px 0;
  margin-right: 4px;
  &:hover .time-panel{
    overflow: visible;
  }
}
.time-panel{
  position: relative;
  background-color: #666;
  width: 48px;
  height: 24px;
  border-radius: 4px;
  line-height: 24px;
  text-align: center;
  overflow: hidden;
}
.panel-up,.panel-down{
  position: absolute;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
  font-weight: 900;
  cursor: pointer;
  &:hover{
    display: block;
  }
}
.panel-up{
  top: -100%;
  background-image: linear-gradient(0deg, rgba(38, 39, 41,0), rgb(38, 39, 41) 100%);
}
.panel-down{
  bottom: -100%;
  background-image: linear-gradient(to bottom, rgba(38, 39, 41,0), rgb(38, 39, 41) 100%);
}
.scroll-box{
  position: relative;
  top: -16px;
  height: 56px;
  overflow-y: scroll;
  color: #fff;
  // &::-::-webkit-scrollbar
  &::-webkit-scrollbar{
    display: none;
  }
}
.panel-item{
  &::before{
    content: "";
    display: block;
    height: 16px;
  }
  &::after{
    content: "";
    display: block;
    height: 16px;
  }
}
</style>