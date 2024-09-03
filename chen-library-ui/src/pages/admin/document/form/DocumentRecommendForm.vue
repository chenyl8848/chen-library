<template>
  <div class="document-recommend-form">
    <el-form ref="documentRecommendForm" label-position="top" label-width="80px" :model="document">
      <el-form-item label="文档" prop="title">
        <el-input v-model="document.title" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="推荐状态" prop="recommend_at">
        <div v-if="document.recommend_at">
          <el-radio-group v-model="document.type">
            <el-radio-button :label="0">取消推荐</el-radio-button>
            <el-radio-button :label="1">推荐</el-radio-button>
            <el-radio-button :label="2">重新推荐</el-radio-button>
          </el-radio-group>
          <el-alert class="mgt-20px" title="重新推荐，可让文档的推荐排序重新变靠前" type="warning" :closable="false">
          </el-alert>
        </div>
        <el-switch v-else v-model="document.type" style="display: block" active-color="#13ce66" inactive-color="#ff4949"
          active-text="设为推荐" inactive-text="未推荐" :active-value="1" :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="btn-block" icon="Check" :loading="loading"
          @click="onSubmit(documentRecommendForm)">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { defineProps, ref, reactive, defineEmits, watch } from 'vue'

const $props = defineProps({
  initDocument: {
    type: Object,
    default: () => { }
  }
})

const loading = ref(false)
let document = reactive({
  type: 0
})

watch(() => $props.initDocument,(newVal) => {
  document = reactive({...newVal})
}, {immediate: true})

const $emits = defineEmits(['success'])
const onSubmit = async (formRef) => {
  loading.value = true
  await formRef.validate((valid) => {
    if (valid) {
      $emits('success')
    } else {
      console.log('error submit')
    }
  })
  loading.value = false
}

</script>
<style lang="scss"></style>
