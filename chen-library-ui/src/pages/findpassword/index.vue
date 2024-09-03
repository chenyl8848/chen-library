<template>
  <div class="page page-findpassword">
    <el-card shadow="never">
      <template #header>找回密码</template>
      <find-password-step-two-form v-if="token" />
      <find-password-step-one-form v-else />
    </el-card>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import FindPasswordStepOneForm from './form/FindPasswordStepOneForm.vue'
import FindPasswordStepTwoForm from './form/FindPasswordStepTwoForm.vue'
import { useRoute } from 'vue-router'

const $route = useRoute()
const token = computed(() => {
  return $route.query.token
}) 
</script>
<style lang="scss">
.page-findpassword {
  .el-card {
    width: 520px;
    margin: 100px auto;
  }

  .el-card__body {
    padding-bottom: 0;
    margin-bottom: -20px;
  }
}

@media screen and (max-width: 768px) {
  .page-findpassword {
    .el-card {
      margin: 10px auto;
      width: 100%;
    }
  }
}
</style>
