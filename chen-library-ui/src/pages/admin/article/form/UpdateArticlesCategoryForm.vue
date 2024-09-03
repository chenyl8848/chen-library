<template>
  <div class="update-articles-category-form">
    <el-form ref="updateArticlesCategoryForm" label-position="top" label-width="80px" :model="form">
      <el-form-item label="新文章分类" prop="category_id" :rules="[
        { required: true, trigger: 'blur', message: '请选择新的文章分类' },
      ]">
        <el-cascader v-model="form.category_id" :options="categoryTrees" :filterable="true" :props="{
          checkStrictly: true,
          expandTrigger: 'hover',
          label: 'title',
          value: 'id',
        }" clearable placeholder="请选择新的文章分类"></el-cascader>
      </el-form-item>
      <el-form-item label="文章列表" class="document-list">
        <ArticleSimpleList :articles="articles" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="btn-block" icon="Check" @click="onSubmit(updateArticlesCategoryForm)">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import ArticleSimpleList from '@/components/ArticleSimpleList.vue'
import { defineProps, reactive, ref, defineEmits } from 'vue'

defineProps({
  // 文章分类
  categoryTrees: {
    type: Array,
    default: () => []
  },
  articles: {
    type: Array,
    default: () => []
  },
})

const updateArticlesCategoryForm = ref()
const form = reactive({
  category_id: [],
  article_id: [],
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
.update-articles-category-form {
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
