<template>
  <div class="page page-login" :style="settingStore.system.login_background
      ? 'background:url(' +
      settingStore.system.login_background +
      ') no-repeat center center'
      : ''
    ">
    <div>
      <el-card shadow="never" :class="settingStore.security.is_close ? 'close-box' : ''">
        <template #header>
          <div class="clearfix">
            <span v-if="userStore.user.id > 0 && settingStore.security.is_close">网站关闭</span>
            <span v-else>用户登录</span>
          </div>
        </template>
        <div v-if="settingStore.security.is_close" class="close-tips">
          <div v-html="settingStore.security.close_statement"></div>
        </div>
        <LoginForm v-if="!(userStore.user.id > 0 && settingStore.security.is_close)" :redirect="redirect"></LoginForm>
        <div>
          <router-link to="/findpassword" title="找回密码" class="el-link el-link--default">找回密码</router-link>
          <router-link :to="{ path: 'register', query: { redirect } }" title="注册账户"
            class="el-link el-link--default float-right">注册账户</router-link>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import LoginForm from './form/LoginForm.vue'
import useSettingStore from '@/store/module/setting'
const settingStore = useSettingStore()
import useUserStore from '@/store/module/user'
const userStore = useUserStore()
const $route = useRoute()

const redirect = computed(() => {
 return $route.query.redirect || '/me'
})

</script>
<style lang="scss">
.page-login {
  width: 100%;
  margin-top: -20px;
  margin-bottom: -20px;
  background-size: cover !important;

  &>div {
    width: $default-width;
    margin: 0 auto;
  }

  .el-card {
    width: 520px;
    max-width: 100%;
    margin: 100px auto;
    margin-right: 0;

    &.close-box {
      margin-right: auto;
      width: 520px;

      .close-tips {
        margin-bottom: 20px;
        border: 1px dashed #f60;
        padding: 20px;
        border-radius: 4px;
        line-height: 180%;
        font-size: 15px;
      }
    }
  }
}

@media screen and (max-width: $mobile-width) {
  .page-login {
    background: none !important;

    &>div {
      width: 100%;
      margin: 0 auto;
    }

    .el-card {
      width: 100%;
      margin: 20px auto;
    }
  }
}
</style>
