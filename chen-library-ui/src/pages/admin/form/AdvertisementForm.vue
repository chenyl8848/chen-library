<template>
  <div class="advertisement-form">
    <el-form ref="advertisementForm" label-position="top" label-width="80px" :model="advertisement">
      <!-- 广告位下拉菜单 -->
      <el-form-item label="广告位" prop="position" :rules="[{ required: true, trigger: 'blur', message: '请选择广告位' }]">
        <el-select v-model="advertisement.position" filterable placeholder="请选择广告投放位置">
          <el-option-group v-for="item in advertisementPositionEnum" :key="item.value" :label="item.label">
            <el-option v-for="child in item.children" :key="child.value" :label="child.label" :value="child.value">
            </el-option>
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="18">
          <el-form-item label="名称" prop="title" :rules="[{ required: true, trigger: 'blur', message: '请输入广告名称' }]">
            <el-input v-model="advertisement.title" placeholder="请输入广告名称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否启用">
            <el-switch v-model="advertisement.enable" style="display: block" active-color="#13ce66"
              inactive-color="#ff4949" active-text="是" inactive-text="否">
            </el-switch> </el-form-item>
        </el-col>
      </el-row>
      <!-- 起止时间 -->
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="开始时间">
            <el-date-picker v-model="advertisement.start_time" type="datetime" placeholder="请选择开始时间"
              clearable></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结束时间">
            <el-date-picker v-model="advertisement.end_time" type="datetime" placeholder="请选择结束时间"
              clearable></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 广告内容代码 -->
      <el-form-item label="广告代码" prop="content" :rules="[{ required: true, trigger: 'blur', message: '请输入广告内容代码' }]">
        <el-input v-model="advertisement.content" type="textarea" rows="5" placeholder="请输入广告内容代码"></el-input>
      </el-form-item>
      <el-form-item label="广告备注">
        <el-input v-model="advertisement.remark" type="textarea" rows="3" placeholder="请输入广告相关描述或备注"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="btn-block" icon="el-icon-check" :loading="loading"
          @click="onSubmit(advertisementForm)">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { defineProps, reactive, ref, defineEmits, watch } from 'vue'
import { advertisementPositionEnum } from '@/utils/enum'

const $props = defineProps({
  initAdvertisement: {
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

const advertisementForm = ref()
let advertisement = reactive({
  username: '',
  password: '',
  email: '',
  group_id: [],
})

watch(() => $props.initAdvertisement, (newValue) => {
  advertisement = reactive({ ...newValue })
}, { immediate: true })

const $emits = defineEmits(['success'])
const loading = ref(false)
const onSubmit = async (formRef) => {
  await formRef.validate((valid, fields) => {
    if (valid) {
      loading.value = true
      if (advertisement.id && advertisement.id > 0) {
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
