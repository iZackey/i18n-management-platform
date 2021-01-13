<template>
    <div :class="prefixCls">
        <div class="content">
            <img src="@/assets/images/404.png" />
            <p>加载失败，请重新加载</p>
            <router-link to="/">
                <el-button type="primary" class="back-home">回到首页</el-button>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
  name: 'page404',
  data() {
    return {
      prefixCls: 'not-found'
    }
  }
}
</script>

<style lang="scss" scoped>
    $prefixCls:"not-found";

    .#{$prefixCls} {
        width: 100%;
        height: calc(100vh - 75px);
        display: flex;
        align-items: center;
        justify-content: center;

        .content {
            text-align: center;

            img {
                width: 623px;
            }

            p {
                font-size: 32px;
                margin-top: 60px;
            }

            .back-home {
                margin-top: 60px;
                width: 204px;
                height: 39px;
            }
        }
    }
</style>
