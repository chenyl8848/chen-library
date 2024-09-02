<template>
  <div class="report-form">
    <el-form ref="reportForm" label-position="top" label-width="80px" :model="report">
      <el-form-item label="文档">
        <el-input v-model="report.document_title" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="举报原因">
        <el-radio-group v-model="report.reason" class="report-reason">
          <el-row>
            <el-col :span="8" v-for="item in reportOptions" :key="'rs' + item.value">
              <el-radio :label="item.value">{{ item.label }}</el-radio>
            </el-col>
          </el-row>
        </el-radio-group>
      </el-form-item>
      <template v-if="isAdmin">
        <el-form-item label="处理状态">
          <el-switch v-model="report.status" active-text="已处理" inactive-text="未处理">
          </el-switch>
        </el-form-item>
        <el-form-item label="处理备注">
          <el-input v-model="report.remark" placeholder="请输入文档处理相关备注" type="textarea" rows="3"></el-input>
        </el-form-item>
      </template>
      <el-form-item>
        <el-button type="primary" icon="Check" class="btn-block" @click="onSubmit(reportForm)">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { defineProps, reactive, ref, defineEmits, watch } from 'vue'

const $props = defineProps({
  isAdmin: {
    type: Boolean,
    default: false,
  },
  initReport: {
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

const reportForm = ref()
let report = reactive({
  username: '',
  password: '',
  email: '',
  group_id: [],
})

watch(() => $props.initReport, (newValue) => {
  report = reactive({ ...newValue })
}, { immediate: true })

const $emits = defineEmits(['success'])
const loading = ref(false)
const onSubmit = async (formRef) => {
  await formRef.validate((valid, fields) => {
    if (valid) {
      loading.value = true
      if (report.id && report.id > 0) {
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
<style lang="scss">
.report-form {
  .el-select {
    width: 100%;
  }

  .report-reason {
    width: 100%;

    .el-radio {
      margin-bottom: 10px;
    }
  }
}
</style>
