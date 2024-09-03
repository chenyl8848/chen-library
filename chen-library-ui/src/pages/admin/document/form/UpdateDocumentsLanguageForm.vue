<template>
  <div class="update-documents-language-form">
    <el-form ref="updateDocumentsLanguageForm" label-position="top" label-width="80px" :model="form">
      <el-form-item label="文档语言" prop="language" :rules="[
        { required: true, trigger: 'blur', message: '请选择新的文档语言' },
      ]">
        <el-select v-model="form.language" filterable placeholder="请选择新的文档语言">
          <el-option v-for="item in settingStore.language" :key="item.code" :label="item.language"
            :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文档列表" class="document-list">
        <DocumentSimpleList :target="'_blank'" :documents="documents" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="btn-block" icon="Check"
          @click="onSubmit(updateDocumentsLanguageForm)">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import DocumentSimpleList from '@/components/DocumentSimpleList.vue'
import { defineProps, reactive, ref, defineEmits } from 'vue'
import useSettingStore from '@/store/module/setting'
const settingStore = useSettingStore()

defineProps({
  documents: {
    type: Array,
    default: () => []
  }
})

const updateDocumentsLanguageForm = ref()
const form = reactive({
  language: ''
})
const $emits = defineEmits(['success'])

const onSubmit = async (formRef) => {
  await formRef.validate((valid) => {
    if (valid) {
      $emits('success')
    } else {
      console.log('error submit')
    }
  })
}
</script>
<style lang="scss">
.update-documents-language-form {
  .document-list {

    ul,
    li {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    ul {
      max-height: 300px;
      overflow: auto;
    }

    li {
      line-height: 30px;
      color: #777;
    }
  }
}
</style>
