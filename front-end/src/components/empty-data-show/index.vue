<template>
    <div :class="prefixCls">
        <div class="innter-empty-show">
            <div class="empty-icon"></div>
            <div class="empty-text">暂无数据</div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
/*空数据状态展示*/
export default {
  name: 'index',
  data() {
    return {
      prefixCls: 'components-emptyDataShow-index'
    }
  }
}
</script>

<style lang="scss" scoped>
    /*空数据状态展示*/
    $prefixCls: 'components-emptyDataShow-index';

    .#{$prefixCls} {
        z-index: 9;
        text-align: center;
        width: 473px;
        overflow: hidden;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        .innter-empty-show {
            .empty-icon {
                width: 473px;
                height: 138px;
                background-image: url(~@/assets/images/empty-data.png);
            }

            .empty-text {
                text-align: center;
                font-size: 16px;
                color: #A9B2BC;
                margin-top: 40px;
            }
        }
    }
</style>
