<template>
  <div class="navigation-form">
    <el-form ref="navigationForm" label-position="top" label-width="80px" :model="navigation">
      <!-- 下拉菜单选择一级分类 -->
      <el-form-item v-if="!(navigation.id > 0 && navigation.fixed)" label="上级导航">
        <el-select v-model="navigation.parent_id" :filterable="true" :clearable="true" placeholder="请选择上级导航">
          <el-option v-for="item in trees" :key="item.id" :label="item.title" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="title" :rules="[{ required: true, trigger: 'blur', message: '请输入名称' }]">
        <el-input v-model="navigation.title" placeholder="请输入名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="href">
        <el-input v-model="navigation.href" placeholder="请输入导航地址，如 https://mnt.ltd" clearable
          :disabled="navigation.fixed"></el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="排序(值越大越靠前)">
            <el-input-number v-model.number="navigation.sort" clearable :min="0" :step="1"
              placeholder="请输入排序值"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否启用">
            <el-switch v-model="navigation.enable" style="display: block" active-color="#13ce66"
              inactive-color="#ff4949" active-text="是" inactive-text="否">
            </el-switch> </el-form-item></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="颜色">
            <el-color-picker v-model="navigation.color" show-alpha clearable placeholder="请选择颜色"></el-color-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="打开方式">
            <!-- 即 target -->
            <el-select v-model="navigation.target" placeholder="请选择打开方式" clearable>
              <el-option v-for="item in [
                { label: '当前页', value: '_self' },
                { label: '新标签页', value: '_blank' },
              ]" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select> </el-form-item></el-col>
      </el-row>

      <el-form-item label="描述">
        <el-input v-model="navigation.description" type="textarea" rows="3" placeholder="请输入导航相关描述或备注"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="btn-block" icon="Check" :loading="loading"
          @click="onSubmit(navigationForm)">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { defineProps, reactive, ref, defineEmits, watch } from 'vue'

const $props = defineProps({
  initNavigation: {
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

const navigationForm = ref()
let navigation = reactive({
  username: '',
  password: '',
  email: '',
  group_id: [],
})

watch(() => $props.initNavigation, (newValue) => {
  navigation = reactive({ ...newValue })
}, { immediate: true })

const $emits = defineEmits(['success'])
const loading = ref(false)
const onSubmit = async (formRef) => {
  await formRef.validate((valid, fields) => {
    if (valid) {
      loading.value = true
      if (navigation.id && navigation.id > 0) {
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
