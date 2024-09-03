<template>
  <div class="update-documents-category-form">
    {{ categoryTrees }}
    <el-form ref="updateDocumentsCategoryForm" label-position="top" label-width="80px" :model="form">
      <el-form-item label="新文档分类" prop="category_id" :rules="[
        { required: true, trigger: 'blur', message: '请选择新的文档分类' },
      ]">
        <el-cascader v-model="form.categoryId" :options="categoryTrees" :filterable="true" :props="{
          checkStrictly: true,
          expandTrigger: 'hover',
          label: 'title',
          value: 'id',
        }" clearable placeholder="请选择新的文档分类"></el-cascader>
      </el-form-item>
      <el-form-item label="文档列表" class="document-list">
        <DocumentSimpleList :target="'_blank'" :documents="documents" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="btn-block" icon="Check" @click="onSubmit(updateDocumentsCategoryForm)">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import DocumentSimpleList from '@/components/DocumentSimpleList.vue'
import { defineProps, ref, defineEmits, reactive } from 'vue'

defineProps({
  // 文档分类
  categoryTrees: {
    type: Array,
    default: () => {
      return []
    },
  },
  documents: {
    type: Array,
    default: () => []
  }
})

const updateDocumentsCategoryForm = ref()
const form = reactive({
  categoryId: 0,
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
.update-documents-category-form {
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
