<template>
  <div class="friendlink-form">
    <el-form ref="friendlinkForm" label-position="top" label-width="80px" :model="friendlink">
      <el-form-item label="名称" prop="title" :rules="[{ required: true, trigger: 'blur', message: '请输入名称' }]">
        <el-input v-model="friendlink.title" placeholder="请输入名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="link" :rules="[
        {
          required: true,
          trigger: 'blur',
          message: '请输入友链地址，如 https://mnt.ltd',
        },
      ]">
        <el-input v-model="friendlink.link" placeholder="请输入友链地址，如 https://mnt.ltd" clearable></el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="排序(值越大越靠前)">
            <el-input-number v-model.number="friendlink.sort" clearable :min="0" :step="1"
              placeholder="请输入排序值"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否启用">
            <el-switch v-model="friendlink.enable" style="display: block" active-color="#13ce66"
              inactive-color="#ff4949" active-text="是" inactive-text="否">
            </el-switch> </el-form-item></el-col>
      </el-row>

      <el-form-item label="描述">
        <el-input v-model="friendlink.description" type="textarea" rows="3" placeholder="请输入友链相关描述或备注"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="btn-block" icon="Check" :loading="loading"
          @click="onSubmit(friendlinkForm)">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { defineProps, reactive, ref, defineEmits, watch } from 'vue'

const $props = defineProps({
  initFriendlink: {
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

const friendlinkForm = ref()
let friendlink = reactive({
  username: '',
  password: '',
  email: '',
  group_id: [],
})

watch(() => $props.initFriendlink, (newValue) => {
  friendlink = reactive({ ...newValue })
}, { immediate: true })

const $emits = defineEmits(['success'])
const loading = ref(false)
const onSubmit = async (formRef) => {
  await formRef.validate((valid, fields) => {
    if (valid) {
      loading.value = true
      if (friendlink.id && friendlink.id > 0) {
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
