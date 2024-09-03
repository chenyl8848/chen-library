<template>
  <div class="page page-register" :style="settingStore.system.register_background
    ? 'background:url(' +
    settingStore.system.register_background +
    ') no-repeat center center'
    : ''
    ">
    <div>
      <el-card shadow="never">
        <template #header>
          <div class="clearfix">
            <span>用户注册</span>
          </div>
        </template>
        <RegisterForm :redirect="redirect"></RegisterForm>
        <router-link to="/findpassword" class="el-link el-link--default">找回密码</router-link>
        <router-link :to="{ path: 'login', query: { redirect } }"
          class="el-link el-link--default float-right">马上登录</router-link>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import RegisterForm from './form/RegisterForm.vue'
import useSettingStore from '@/store/module/setting'
const settingStore = useSettingStore()
const $route = useRoute()

const redirect = computed(() => {
 return $route.query.redirect || '/me'
})

</script>
<style lang="scss">
.page-register {
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
  }
}

@media screen and (max-width: $mobile-width) {
  .page-register {
    background: none !important;

    &>div {
      width: 100%;
      margin: 0;
    }

    .el-card {
      width: 100%;
      margin: 20px 0;
    }
  }
}
</style>
