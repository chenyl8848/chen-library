<template>
  <div class="banner-form">
    <el-form ref="bannerForm" label-position="top" label-width="80px" :model="banner">
      <el-form-item label="图片" prop="path" :rules="[
        { required: true, message: '请上传轮播图图片', trigger: 'blur' },
      ]">
        <UploadImage :action="'/api/v1/upload/banner'" :image="banner.path" :error-image="'/static/images/banner.png'"
          @success="onSuccess" />
      </el-form-item>
      <el-form-item label="名称" prop="title">
        <el-input v-model="banner.title" clearable placeholder="请输入轮播图名称"></el-input>
      </el-form-item>
      <el-form-item label="链接" prop="url">
        <el-input v-model="banner.url" clearable placeholder="请输入链接地址，链接地址为空点击轮播图不会跳转"></el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="类型" prop="type">
            <el-select v-model="banner.type" clearable placeholder="请选择轮播图类型">
              <el-option v-for="opt in bannerTypeEnum" :key="'type-' + opt.value" :label="opt.label"
                :value="opt.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="排序(值越大越靠前)" prop="sort">
            <el-input-number v-model="banner.sort" :min="0" :step="1"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否启用" prop="enable">
            <el-switch v-model="banner.enable" style="display: block; margin-top: 8px" active-color="#13ce66"
              inactive-color="#ff4949" active-text="是" inactive-text="否">
            </el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="描述">
        <el-input v-model="banner.description" type="textarea" rows="5" placeholder="请输入附件相关描述或备注"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="btn-block" icon="el-icon-check" :loading="loading"
          @click="onSubmit(bannerForm)">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { defineProps, reactive, ref, defineEmits, watch } from 'vue'
import UploadImage from '@/components/UploadImage.vue'
import { bannerTypeEnum } from '@/utils/enum'

const $props = defineProps({
  initBanner: {
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

const bannerForm = ref()
let banner = reactive({
  username: '',
  password: '',
  email: '',
  group_id: [],
})

watch(() => $props.initBanner, (newValue) => {
  banner = reactive({ ...newValue })
}, { immediate: true })

const onSuccess = () => {}

const $emits = defineEmits(['success'])
const loading = ref(false)
const onSubmit = async (formRef) => {
  await formRef.validate((valid, fields) => {
    if (valid) {
      loading.value = true
      if (banner.id && banner.id > 0) {
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
