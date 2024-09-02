<template>
  <div class="attachment-form">
    <el-form ref="attachmentForm" label-position="top" label-width="80px" :model="attachment">
      <el-form-item label="名称" prop="name" :rules="[
        { required: true, trigger: 'blur', message: '请输入附件名称' },
      ]">
        <el-input v-model="attachment.name" placeholder="请输入附件名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="是否合法">
        <el-switch v-model="attachment.enable" style="display: block" active-color="#13ce66" inactive-color="#ff4949"
          active-text="是" inactive-text="否">
        </el-switch>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="attachment.description" type="textarea" rows="5" placeholder="请输入附件相关描述或备注"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="btn-block" icon="el-icon-check" :loading="loading"
          @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { defineProps, reactive, ref, defineEmits, watch } from 'vue'

const $props = defineProps({
  initAttachment: {
    type: Object,
    default: () => {
      return {
        id: 0,
        email: '',
        username: '',
        password: '',
        group_id: [],
      }
    }
  }
})

const attachmentForm = ref()
let attachment = reactive({
  username: '',
  password: '',
  email: '',
  group_id: [],
})

watch(() => $props.initAttachment, (newValue) => {
  attachment = reactive({ ...newValue })
}, { immediate: true })

const $emits = defineEmits(['success'])
const loading = ref(false)
const onSubmit = async (formRef) => {
  await formRef.validate((valid, fields) => {
    if (valid) {
      loading.value = true
      if (attachment.id && attachment.id > 0) {
        // 修改
        formRef.resetFields()
        $emits('success')
      } else {
        // 新增
        formRef.resetFields()
        $emits('success')
      }
      loading.value = false
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>
