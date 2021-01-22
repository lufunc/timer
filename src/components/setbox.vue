<template>
  <div class="setbox">
    <div class="setting" @click="ttt">
      <div class="pic_set"></div>
      <div class="set_item">
        <div class="set_inner">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
@import '../assets/base';
.setbox{
  width: 200px;
  height: 200px;
  &:hover .setting{
    opacity: 1;
  }
}
.setting{
  position: relative;
  top: 110px;
  left: 110px;
  width: 36px;
  height: 36px;
  padding: 12px 0;
  opacity: 0;
  &:hover .set_item{
    display: block;
  }
}
.pic_set{
  width: 36px;
  height: 36px;
  background-image: url(@set_pic);
  transition: all 0.5s ease-in-out;
  &:hover{
    transform: rotateZ(120deg);
  }
}
.set_item{
  display: none;
  position: absolute;
  top: -318px;
  left: -366px;
  width: 430px;
  height: 310px;
}
.set_inner{
  position: relative;
  width: 100%;
  height: 100%;
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
</style>
