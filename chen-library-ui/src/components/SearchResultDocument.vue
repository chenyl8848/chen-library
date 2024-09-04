<template>
  <div class="search-result-document">
    <ul>
      <li v-if="documents.length === 0">
        <el-empty description="很遗憾，未能检索到相关结果"></el-empty>
      </li>
      <li v-for="document in documents" :key="`document-${document.id}`">
        <h3 class="document-title">
          <router-link target="_blank" :to="`/document?document_id?=${document.uuid || document.id}`" class="el-link el-link--primary">
            <img :src="`/static/images/${document.icon}_24.png`" :alt="`${document.icon}文档`" />
            {{ document.title }}
          </router-link>
        </h3>
        <div class="document-desc">{{ document.description }}</div>
        <div class="document-info">
          <el-rate v-model="document.score" disabled show-score text-color="#ff9900" score-template="{value}">
          </el-rate>
          <span class="float-right">{{ document.price || 0 }} {{ settingStore.system.credit_name || '魔豆' }} |
            {{ document.pages || '-' }} 页 |
            {{ formatBytes(document.size) }}
            <span class="hidden-xs-only">| {{ formatRelativeTime(document.created_at) }}</span></span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { defineProps } from 'vue'
import { formatBytes, formatRelativeTime } from '@/utils/utils'
import useSettingStore from '@/store/module/setting'
const settingStore = useSettingStore()

defineProps({
  documents: {
    type: Array,
      default: () => [],
    }
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

.document-desc {
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

.document-info {
  color: #bdc3c7;
  font-size: 13px;
}
</style>
