<template>
    <div class="user-download">
        <el-table v-loading="loading" :data="downloads" style="width: 100%">
            <el-table-column prop="title" label="文档" min-width="200">
                <template #default="scope">
                    <router-link target="_blank" :to="{
                        path: '/document',
                        query: { document_id: scope.row.document_uuid || scope.row.document_id },
                    }" class="el-link el-link--default doc-title">
                        <img :src="`/static/images/${scope.row.icon}_24.png`" alt="" />
                        {{ scope.row.title || '已被删除' }}
                    </router-link>
                </template>
            </el-table-column>
            <el-table-column prop="score" label="评分" width="120">
                <template #default="scope">
                    <el-rate :value="scope.row.score || 0.0" disabled score-template="{value}"></el-rate>
                </template>
            </el-table-column>
            <el-table-column prop="page" label="页数" width="70">
                <template #default="scope">{{ scope.row.pages || '-' }}</template>
            </el-table-column>
            <el-table-column prop="size" label="大小" width="100">
                <template #default="scope">{{
                    formatBytes(scope.row.size)
                }}</template>
            </el-table-column>
            <el-table-column prop="created_at" label="下载时间" width="160">
                <template #default="scope">
                    <el-tooltip :content="formatDateTime(scope.row.created_at)" placement="top">
                        <span>{{ formatRelativeTime(scope.row.created_at) }}</span>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-if="total > 0" :current-page="query.page" :page-size="query.size" :layout="isMobile
            ? 'total, prev, pager, next'
            : 'total, prev, pager, next, jumper'
            " :pager-count="isMobile ? 5 : 7" :small="isMobile" :total="total" class="mgt-20px"
            @current-change="pageChange">
        </el-pagination>
    </div>
</template>

<script setup>
import { defineProps, ref, reactive, onMounted } from 'vue'
import { formatDateTime, formatRelativeTime, formatBytes } from '@/utils/utils'
import { downloadDocumentList } from '../../mock/data'
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
const downloads = ref([])
const total = ref(0)

const getFavoriteDocuments = () => {
    loading.value = true
    setTimeout(() => {
        downloads.value = downloadDocumentList
        total.value = 37
        loading.value = false
    }, 2000);
}

const pageChange = (page) => {
    query.currentPage = page
    getFavoriteDocuments()
}

onMounted(() => {
    getFavoriteDocuments()
})
</script>

<style lang="scss">
.user-download {
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