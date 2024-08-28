<template>
    <div class="user-article">
        <!-- 文章搜索表单 -->
        <el-form :inline="true" :model="query" class="demo-form-inline" @submit.prevent>
            <el-form-item>
                <el-input v-model="query.searchText" placeholder="请输入关键字" clearable
                    @keydown.enter="onSearch"></el-input>
            </el-form-item>
            <el-form-item>
                <el-date-picker v-model="query.createdAt" type="datetimerange" :shortcuts="datetimePickerShortcuts"
                    range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right"
                    value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="Search" :loading="loading" @click="onSearch">
                    搜索
                </el-button>
            </el-form-item>
        </el-form>
        <el-table v-loading="loading" :data="articles" style="width: 100%">
            <el-table-column prop="title" label="标题" min-width="300">
                <template #default="scope">
                    <el-tooltip :content="scope.row.title" placement="right">
                        <router-link target="_blank" :to="{
                            path: '/article',
                            query: { article_id: scope.row.identifier },
                        }" class="el-link el-link--default doc-title">
                            {{ scope.row.title }}
                        </router-link>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column v-if="showPrivateData" prop="status" label="状态" width="100">
                <template #default="scope">
                    <el-tag :type="filterStatus(scope.row.status).type" size="small" effect="plain">
                        {{ filterStatus(scope.row.status).label }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="view_count" label="阅读" width="100">
                <template #default="scope">{{ scope.row.view_count || 0 }}</template>
            </el-table-column>
            <el-table-column prop="comment_count" label="评论" width="100">
                <template #default="scope">{{
                    scope.row.comment_count || 0
                }}</template>
            </el-table-column>
            <el-table-column prop="favorite_count" label="收藏" width="100">
                <template #default="scope">{{
                    scope.row.favorite_count || 0
                }}</template>
            </el-table-column>

            <el-table-column prop="created_at" label="发布" width="100">
                <template #default="scope">
                    <el-tooltip :content="formatDateTime(scope.row.created_at)" placement="top">
                        <span>{{ formatRelativeTime(scope.row.created_at) }}</span>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="90" fixed="right">
                <template #default="scope">
                    <el-tooltip content="编辑文章" placement="top">
                        <el-button link type="primary" icon="Edit" @click="updateArticle(scope.row)"></el-button>
                    </el-tooltip>
                    <el-tooltip content="删除文章" placement="top">
                        <el-button link type="primary" icon="Delete" @click="deleteArticle(scope.row)"></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-if="total > 0" :current-page="query.currentPage" :page-size="query.pageSize" :layout="isMobile
            ? 'total, prev, pager, next'
            : 'total, prev, pager, next, jumper'
            " :pager-count="isMobile ? 5 : 7" :small="isMobile" :total="total" class="mgt-20px"
            @current-change="pageChange">
        </el-pagination>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { articleList } from '../../../mock/data'
import { formatDateTime, formatRelativeTime } from '@/utils/utils'
import { datetimePickerShortcuts, articleStatusEnums } from '@/utils/enum'
import hooks from '@/hooks'
const { isMobile } = hooks()

const showPrivateData = ref(true)
const query = reactive({
    searchText: '',
    createdAt: '',
    currentPage: 1,
    pageSize: 10

})

const loading = ref(false)
const articles = ref([])
const total = ref(0)

const onSearch = () => {
    getArticle()
}

const getArticle = () => {
    loading.value = true
    setTimeout(() => {
        articles.value = articleList
        total.value = 69
        loading.value = false
    }, 2000);
}

const pageChange = (page) => {
    query.currentPage = page
    getArticle()
}

const filterStatus = (status) => {
    const articleStatusOptionsMap = {}
    articleStatusEnums.forEach(item => {
        articleStatusOptionsMap[item.value] = item
    })

    return (
        articleStatusOptionsMap[status] || {
            value: status,
            label: '待审核',
            type: 'info',
        }
    )
}

const updateArticle = (row) => {
    console.log(row)
}

const deleteArticle = (row) => {
    console.log(row)
}

onMounted(() => {
    getArticle()
})
</script>

<style lang="scss">
.user-article {
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