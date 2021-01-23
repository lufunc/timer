<template>
  <div class="setbox">
    <div class="set-warp" @mouseleave="hideSet">
      <div class="setting" @mouseenter="isShow=true">
        <div class="pic_set"></div>
      </div>
    </div>
    <div class="set_item setLoad" ref="setDom" @mouseleave="hideSet" v-show="isShow">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
export default {
  setup (props, { emit }) {
    const isShow = ref(false)
    const setDom = ref(null)
    const hidesetF = () => {
      isShow.value = false
      emit('closeSet')
    }
    const hideSet = (e) => {
      if (e.toElement && setDom.value !== e.toElement) {
        hidesetF()
      }
    }
    onMounted(() => {
      setDom.value.classList.remove('setLoad')
    })
    return {
      isShow,
      setDom,
      hideSet,
      hidesetF
    }
  }
}
</script>

<style lang="less">
@import '../assets/images';
.setbox{
  width: 200px;
  height: 200px;
  &:hover .pic_set{
    opacity: 1;
  }
}
.set-warp{
  display: inline-block;
  padding: 20px 20px 12px 24px;
  margin-top: 94px;
  margin-left: 78px;
  // background-color: #fff;
}
.setting{
  width: 36px;
  height: 36px;
  padding: 8px;
  &:hover>div{
    transform: rotateZ(120deg);
  }
}
.pic_set{
  width: 36px;
  height: 36px;
  background-image: url(@set_pic);
  transition: all 0.5s ease-in-out;
  opacity: 0;
}
.set_item{
  position: absolute;
  top: -208px;
  left: -256px;
  width: 432px;
  height: 312px;
  box-sizing: border-box;
  background-color: #262729;
  border-radius: 20px;
  border: 1px solid #666;
  &::before{
    content: '';
    position: absolute;
    bottom: 0;
    right: 36px;
    width: 20px;
    height: 20px;
    background-color: #262729;
    border: 1px solid #666;
    border-top-color: transparent;
    border-left-color: transparent;
    transform: translateY(50%) rotateZ(45deg);
  }
}
.setLoad{
  display: block !important;
  visibility: hidden;
}
</style>
