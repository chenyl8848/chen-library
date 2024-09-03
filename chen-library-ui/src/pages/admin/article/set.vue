<template>
  <div>
    <el-card shadow="never">
      <template #header>
        <div class="clearfix">
          <el-row>
            <el-col :span="4">
              <el-button icon="Back" @click="onCancel">返回</el-button>
            </el-col>
            <el-col :span="20" class="text-center">
              <div class="header-title">
                <span v-if="article.id > 0">编辑文章</span>
                <span v-else>新增文章</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </template>
      <ArticleForm :init-article="article" :category-trees="trees" :is-admin="true" :can-i-publish="true"></ArticleForm>
    </el-card>
  </div>
</template>

<script setup>
import ArticleForm from '@/components/ArticleForm.vue'
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const $router = useRouter()
const $route = useRoute()

const onCancel = () => {
  $router.push('/admin/article/list')
}

const article = reactive({
  title: '',
  identifier: '',
  keywords: '',
  description: '',
  content: '',
  id: 0,
  category_id: [],
})

const trees = ref([])

const getArticle = () => {
  const articleId = $route.query.articleId
  if (articleId) {
    console.log(articleId, "articleIddddddddddd")
    // article = reactive
    
  }
}
const getCategory = () => { }

onMounted(() => {
  getArticle(),
    getCategory()
})

</script>

<style>
.tox-promotion {
  display: none !important;
}
</style>
<style lang="scss" scoped>
.header-title {
  height: 40px;
  line-height: 40px;
  font-size: 20px;
}
</style>
