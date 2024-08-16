<template>
    <div class="user-article">
        <el-form :inline="true" :model="query">
            <el-form-item>
                <el-input v-model="query.keyword" placeholder="请输入关键字" clearable @keydown.enter="onSearch"></el-input>
            </el-form-item>
            <el-form-item>
                <el-date-picker v-model="query.createdAt" type="datetimerange" :shortcuts="datetimePickerShortcuts"
                    range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                    value-format="YYYY-MM-DD HH:mm:ss">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :icon="Search" :loading="loading" @click="onSearch">
                    搜索
                </el-button>
            </el-form-item>
        </el-form>

        <el-table v-loading="loading" :data="articles" style="width: 100%">
            <el-table-column prop="title" label="标题" min-width="300">
                <template #default="scope">
                    <el-tooltip :content="scope.row.title" placement="right">
                        <router-link target="_blank" :to="`/article?article_id=${scope.row.identifier}`"
                            class="el-link el-link--default doc-title">
                            {{ scope.row.title }}
                        </router-link>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column v-if="showPrivateData" prop="status" label="状态" width="100">
                <template #default="scope">
                    <el-tag :type="filterStatus(scope.row.status).type" effect="plain">
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
            <el-table-column v-if="userId === userStore.user.id" label="操作" width="100" fixed="right">
                <template #default="scope">
                    <el-tooltip content="编辑文章" placement="top">
                        <el-button link type="primary" :icon="Edit" @click="updateArticle(scope.row)"></el-button>
                    </el-tooltip>
                    <el-tooltip content="删除文章" placement="top">
                        <el-button link type="primary" :icon="Delete" @click="deleteArticle(scope.row)"></el-button>
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
import { defineProps, reactive, ref, computed, onMounted } from 'vue'
import { Search, Edit, Delete } from '@element-plus/icons-vue'
import { datetimePickerShortcuts, articleStatusEnums } from '@/utils/enum'
import { formatDateTime, formatRelativeTime } from '@/utils/utils'
import hooks from '@/hooks'
import useUserStore from '@/store/module/user'
import { articleList } from '../../mock/data'

const { isMobile } = hooks()
const userStore = useUserStore()
const $props = defineProps({
    userId: {
        type: Number,
        default: 0
    }
})

const showPrivateData = computed(() => {
    // 如果是用户自身或者是网站管理员则显示私有数据
    return $props.userId === userStore.user.id || userStore.permissions.length > 0
})

const query = reactive({
    keyword: '',
    createdAt: '',
    page: 1,
    size: 10
})

const loading = ref(false)
const articles = ref([])
const total = ref(0)

const onSearch = () => {
    console.log(query, "queryyyyyyyyyyyy")
    loading.value = true
    setTimeout(() => {
        loading.value = false
        articles.value = articleList
        total.value = 76
    }, 2000);
}

const pageChange = (page) => {
    query.page = page
    onSearch()
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

/**
 * 编辑文章
 * @param article 文章
 */
const updateArticle = (article) => {
    console.log(article)
}

/**
 * 删除文章
 * @param article 文章
 */
const deleteArticle = (article) => {
    console.log(article)
}

onMounted(() => {
    onSearch()
})
</script>

<style lang="scss" scoped>
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