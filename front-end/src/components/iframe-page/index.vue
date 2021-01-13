<template>
    <div :class="prefixCls">
        <iframe width="100%" name="iframe-pages" id="iframe-pages" :style="{height:iHeight + 'px'}" frameborder="0" allowtransparency="true" :src="sUrl"></iframe>
    </div>
</template>

<script>
export default {
  props:{
    sUrl:{type:String},
    sTitle:{type:String}
  },
  data(){
    return {
      prefixCls:'components-iframePage-index',
      iHeight:200
    }
  },

  mounted() {
    this.iHeight = document.documentElement.clientHeight - 58; //58为头部的高度
    window.addEventListener('resize', this.handlerResize);
  },

  beforeDestroy(){
    window.removeEventListener('resize', this.handlerResize);
  },

  methods:{
    handlerResize(){
      this.iHeight = document.documentElement.clientHeight - 58;
    }
  }
}
</script>

<style lang="scss" scoped>
    $prefixCls: 'components-iframePage-index';
    .#{$prefixCls}{
        background: $--color-white;
    }
</style>
