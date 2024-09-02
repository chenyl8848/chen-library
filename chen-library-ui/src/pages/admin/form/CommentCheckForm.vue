<template>
  <div class="comment-check-form">
    <el-form ref="commentCheckForm" :model="icomment" label-position="top">
      <el-form-item prop="content" label="评论内容">
        <el-input v-model="icomment.content" type="textarea" :placeholder="placeholder"
          :autosize="{ minRows: 4, maxRows: 6 }" disabled />
      </el-form-item>
      <el-form-item label="审核状态">
        <el-radio-group v-model="icomment.status">
          <el-radio :label="0">待审核</el-radio>
          <el-radio :label="1">审核通过</el-radio>
          <el-radio :label="2">审核拒绝</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="btn-block" icon="Check" @click="onSubmit()">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { defineProps, reactive, ref, defineEmits, watch } from 'vue'

const $props = defineProps({
  initComment: {
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
  },
  trees: {
    type: Array,
    default: () => {
      return []
    },
  },
})

const commentCheckForm = ref()
let icomment = reactive({
  username: '',
  password: '',
  email: '',
  group_id: [],
})

watch(() => $props.initComment, (newValue) => {
  icomment = reactive({ ...newValue })
}, { immediate: true })

const $emits = defineEmits(['success'])
const loading = ref(false)
const onSubmit = async (formRef) => {
  await formRef.validate((valid, fields) => {
    if (valid) {
      loading.value = true
      if (icomment.id && icomment.id > 0) {
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
