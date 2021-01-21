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
  background-image: url(data:image/png;base64,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);
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
