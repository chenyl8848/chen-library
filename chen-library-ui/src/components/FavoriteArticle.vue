<template>
  <div class="favorite-article">
    <el-table v-loading="loading" :data="favorites" style="width: 100%">
      <el-table-column prop="title" label="文章" min-width="200">
        <template #default="scope">
          <router-link target="_blank" :to="{
            path: '/article',
            query: { articleId: scope.row.document_uuid || scope.row.document_id },
          }" class="el-link el-link--default doc-title">
            {{ scope.row.title }}
          </router-link>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="score" label="评分" width="110">
        <template #default="scope">
          <el-rate
            :value="scope.row.score || 0.0"
            disabled
            score-template="{value}"
          ></el-rate>
        </template>
      </el-table-column>
      <el-table-column prop="page" label="页数" width="70">
        <template #default="scope">{{ scope.row.pages || '-' }}</template>
      </el-table-column>
      <el-table-column prop="size" label="大小" width="100">
        <template #default="scope">{{
          formatBytes(scope.row.size)
        }}</template>
      </el-table-column> -->
      <el-table-column prop="created_at" label="收藏时间" width="160">
        <template #default="scope">
          <el-tooltip :content="formatDateTime(scope.row.created_at)" placement="top">
            <span>{{ formatRelativeTime(scope.row.created_at) }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="90" fixed="right">
        <template #default="scope">
          <el-tooltip content="移除收藏" placement="top">
            <el-button link type="primary" icon="Delete" @click="removeFavorite(scope.row)">移除</el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-if="total > 0" :current-page="query.currentPage" :page-size="query.pageSize" :layout="isMobile
      ? 'total, prev, pager, next'
      : 'total, prev, pager, next, jumper'
      " :pager-count="isMobile ? 5 : 7" :small="isMobile" :total="total" class="mgt-20px" @current-change="pageChange">
    </el-pagination>
  </div>
</template>

<script setup>
import { defineProps, reactive, ref, onMounted } from 'vue'
import { relatedArticleList } from '../../mock/data'
import { formatDateTime, formatRelativeTime } from '@/utils/utils'
import hooks from '@/hooks'
const { isMobile } = hooks()
defineProps({
  userId: {
    type: Number,
    default: 0
  }
})

const query = reactive({
  currentPage: 1,
  pageSize: 10
})
const loading = ref(false)
const favorites = ref([])
const total = ref(0)

const getFavoriteArticles = () => {
  loading.value = true
  setTimeout(() => {
    favorites.value = relatedArticleList
    total.value = 41
    loading.value = false
  }, 2000);
}

const pageChange = (page) => {
  query.currentPage = page
  getFavoriteArticles()
}

onMounted(() => {
  getFavoriteArticles()
})
</script>

<style lang="scss">
.favorite-article {
  .doc-title {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 180%;

    img {
      height: 18px;
      position: relative;
      top: 3px;
    }
  }
}
</style>