<template>
   <div class="page page-publish">
      <el-card shadow="never">
         <template #header>
            <div>
               发布文章
               <el-button style="float: right; margin-top: -10px" type="primary" link icon="Back" @click="back">返回</el-button>
            </div>
         </template>
         <article-form v-loading="loading" :init-article="article" :category-trees="trees" :can-i-publish="canIPublish"
            @success="success"></article-form>
      </el-card>
   </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import ArticleForm from '@/components/ArticleForm.vue'
import useUserStore from '@/store/module/user'
const userStore = useUserStore()
import useCategoryStore from '@/store/module/category'
import { useRouter } from 'vue-router';
const categoryStore = useCategoryStore()

const $router = useRouter()
const back = () => {
   $router.go(-1)
}
const loading = ref(false)
const article = reactive({})
const trees = categoryStore.categoryTree.filter((item) => item.type === 1)
const canIPublish = ref(false)
const success = () => {}

const canIPublishArticle = () => {
   if (!userStore.token) {
      return
   }

   loading.value = true
   setTimeout(() => {
      canIPublish.value = true
      getArticle()
      loading.value = false
   }, 2000);
}

const getArticle = () => {

}

onMounted(() => {
   canIPublishArticle()
})

</script>

<style lang="scss"></style>
