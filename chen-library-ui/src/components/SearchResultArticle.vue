<template>
  <div class="search-result-article">
    <ul>
      <li v-if="articles.length === 0">
        <el-empty description="很遗憾，未能检索到相关结果"></el-empty>
      </li>
      <li v-for="article in articles" :key="`article-${article.id}`">
        <h3 class="article-title">
          <router-link target="_blank" :to="`/article/${article.identifier || article.id}`"
            class="el-link el-link--primary">
            {{ article.title }}
          </router-link>
        </h3>
        <div class="article-desc">{{ article.description }}</div>
        <div class="article-info">
          <span class="hidden-xs-only">
            <el-icon>
              <Timer />
            </el-icon>
            {{ formatRelativeTime(article.created_at) }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { defineProps } from 'vue'
import { formatRelativeTime } from '@/utils/utils'

defineProps({
  articles: {
    type: Array,
    default: () => [],
  },
})
</script>
<style lang="scss" scoped>
.search-result {

  ul,
  li {
    list-style: none;
    padding: 0;
  }

  li {
    padding-top: 20px;

    &:first-of-type {
      padding-top: 0;
    }
  }

  .noresult {
    text-align: center;
    font-size: 14px;
    line-height: 200px;
    color: #999;
  }
}

h3 {
  margin-bottom: 10px;

  :deep(.el-link) {
    font-size: 18px;
    font-weight: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    max-width: 100%;

    img {
      height: 18px;
      position: relative;
      top: 2px;
    }
  }
}

.article-desc {
  font-size: 14px;
  color: #6b7a88;
  line-height: 180%;
  word-break: break-all;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  max-height: 81px;
  overflow: hidden;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}

.article-info {
  color: #bdc3c7;
  font-size: 13px;
}
</style>
