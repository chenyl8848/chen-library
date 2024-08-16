<template>
    <div class="page page-category-article">
        <el-row :gutter="20">
            <el-col :span="4" class="hidden-xs-only">
                <article-navbar></article-navbar>
            </el-col>
            <el-col :span="16" :xs="24" class="main-list">
                <el-breadcrumb v-if="categoryId > 0" style="margin-bottom: 10px" separator="/" class="hidden-xs-only">
                    <el-breadcrumb-item>
                        <router-link to="/"> <el-icon>
                                <HomeFilled />
                            </el-icon>
                            首页
                        </router-link>
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>
                        <router-link to="/category/article">全部文章</router-link>
                    </el-breadcrumb-item>
                    <el-breadcrumb-item v-for="item in breadcrumbs" :key="`bread1-${item.id}`">
                        <el-dropdown v-if="item.children && item.children.length > 0">
                            <span class="el-dropdown-link">
                                {{ item.title }}
                                <el-icon class="el-icon--right">
                                    <arrow-down />
                                </el-icon>
                            </span>
                            <template #dropdown>
                                <el-dropdown-menu class="breadcrumb-dropdown">
                                    <el-dropdown-item v-for="ss in item.children.filter((x) => x.type)"
                                        :key="`s1-${ss.id}`">
                                        <router-link class="el-link el-link--default block" :class="{
                                            'el-link--primary': ss.id === categoryId,
                                        }" :to="`/category/article?categoryId=${ss.id}`">{{ ss.title
                                            }}
                                        </router-link>
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                        <span v-else>{{ item.title }}</span>
                    </el-breadcrumb-item>
                </el-breadcrumb>
                <el-card shadow="never">
                    <template #header>
                        <router-link class="el-link el-link--default" :class="{
                            'el-link--primary':
                                $route.query.tab === 'latest' || !$route.query.sort,
                        }" :to="`?categoryId=${$route.query.categoryId || ''}&sort=latest`">最新发布</router-link>
                        <router-link class="el-link el-link--default" :class="{
                            'el-link--primary': $route.query.sort === 'popular',
                        }" :to="`?categoryId=${$route.query.categoryId || ''}&sort=popular`">热门文章</router-link>
                        <router-link to="/post">
                            <el-button size="small" type="primary" class="float-right" style="margin-top: -4px"
                                :icon="Plus">发布文章</el-button>
                        </router-link>
                    </template>
                    <article-list-skeleton v-if="loading && articles.length === 0 && query.page === 1" />
                    <article-list v-else :articles="articles" />
                    <el-pagination v-if="total > 0" :current-page="query.page" :page-size="query.pageSize" :layout="isMobile
                        ? 'total, prev, pager, next'
                        : 'total, prev, pager, next, jumper'
                        " :pager-count="isMobile ? 5 : 7" :small="isMobile" :total="total"
                        @current-change="pageChange">
                    </el-pagination>
                </el-card>
            </el-col>
            <el-col :span="4" class="hidden-xs-only">
                <div class="fixed-right">
                    <el-card shadow="never" class="recommend">
                        <template #header>推荐</template>
                        <div v-if="recommendArticles.length > 0">
                            <article-simple-list v-loading="recommend.loading" :articles="recommendArticles">
                            </article-simple-list>
                            <el-button v-if="recommend.totalPage > 1" :icon="Refresh" link type="primary" class="mgb-5px"
                                @click="getRecommendArticles">换一批</el-button>
                        </div>
                        <el-empty v-else> </el-empty>
                    </el-card>
                    <article-footer class="mgt-20px" />
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router'
import { Plus, Refresh } from '@element-plus/icons-vue'
import ArticleNavbar from '@/components/ArticleNavbar.vue'
import ArticleList from '@/components/ArticleList.vue'
import ArticleListSkeleton from '@/components/ArticleListSkeleton.vue'
import ArticleSimpleList from '@/components/ArticleSimpleList.vue'
import ArticleFooter from '@/components/ArticleFooter.vue'
import { latestPublishArticleList } from '../../../mock/data'
import useCategoryStore from '@/store/module/category'
const categoryStore = useCategoryStore()

import hooks from '@/hooks'
const { isMobile } = hooks()

const $route = useRoute()
const categoryId = ref(parseInt($route.query.categoryId) || 0)

watch($route, (newValue) => {
    categoryId.value = parseInt(newValue.query.categoryId) || 0
    getCategorys()
    setQuery(newValue)
    getArticles()
})

const breadcrumbs = ref([])

// 获取面包屑分类数据
const getCategorys = () => {
    if (categoryId.value > 0) {
        // 获取当前分类
        const currentCategory = categoryStore.categories.filter((item) => item.id === categoryId.value)[0]
        if (currentCategory) {
            // 0、清空面包屑
            breadcrumbs.value.splice(0, breadcrumbs.value.length)

            // 1、查询子类
            const childrenCategory = filterCategoryChildrens(currentCategory)
            if (childrenCategory && childrenCategory.length > 0) {
                // 1.1、有子类
                currentCategory.children = childrenCategory
                breadcrumbs.value.push(currentCategory)
            } else {
                // 1.2、没有子类，查找上级分类和兄弟分类
                const parentId = currentCategory.parent_id
                if (parentId) {
                    const parentCategory = categoryStore.categories.filter((item) => item.id === parentId)[0]
                    if (parentCategory) {
                        // 1.2.1、查找兄弟分类
                        const brotherCategory = filterCategoryBrothers(currentCategory)
                        parentCategory.children = brotherCategory
                        breadcrumbs.value.push(parentCategory)
                        breadcrumbs.value.push(currentCategory)
                    }
                }

            }
        }

    } else {
        // 清空面包屑
        breadcrumbs.value.splice(0, breadcrumbs.value.length)
    }
}

const filterCategoryBrothers = (category) => {
    try {
        return categoryStore.categories.filter((x) => {
            return x.parent_id === category.parent_id && x.type === 1 && x.enable
        })
    } catch (error) {
        console.log(error)
    }
    return []
}

const filterCategoryChildrens = (category) => {
    try {
        return categoryStore.categories.filter((x) => {
            return x.parent_id === category.id && x.type === 1 && x.enable
        })
    } catch (error) {
        console.log(error)
    }
    return []
}

const loading = ref(false)
const articles = ref([])
const total = ref(0)
const query = reactive({
    page: 1,
    pageSize: 10,
    categoryId,
    sort: 'latest'
})

const setQuery = (queryParams) => {
    query.categoryId = parseInt(queryParams.query.categoryId)
    if (queryParams.query.sort) {
        query.sort = queryParams.query.sort
    } else {
        query.sort = 'latest'
    }
}

// 页码更改
const pageChange = (currentPage) => {
    query.page = currentPage
    getArticles()
}

// 获取文章列表
const getArticles = () => {
    console.log("gettttttttttttt", query)
    loading.value = true
    setTimeout(() => {
        loading.value = false
        total.value = 76
        articles.value = latestPublishArticleList
    }, 2000);
}

const recommendArticles = ref([])
const recommend = reactive({
    loading: false,
    totalPage: 10
})

// 换一批
const getRecommendArticles = () => {
    console.log("getRecommendArticlesgetRecommendArticles")
    recommend.loading = true
    setTimeout(() => {
        recommend.loading = false
        recommendArticles.value = latestPublishArticleList
    }, 2000);
}

onMounted(() => {
    getCategorys(),
    getArticles(),
    getRecommendArticles()
})
</script>

<style lang="scss">
.page-category-article {
    .el-tabs--border-card>.el-tabs__header {
        padding: 0 10px;
        border-bottom: 0 !important;
    }

    .el-tabs__item.is-active {
        border-top-left-radius: 4px !important;
        border-top-right-radius: 4px !important;
        border-left-color: transparent !important;
        border-right-color: transparent !important;
        margin-top: 2px !important;
    }

    .article-footer {
        .el-card__body {
            padding: 0;
        }
    }

    .el-card__body {
        padding-top: 0;
        padding-bottom: 0;

        .el-pagination {
            padding: 20px 0;
            border-top: 1px dashed #efefef;
        }
    }

    .cate-description {
        padding: 10px 0;
        color: #909399;
        line-height: 170%;
        font-size: 13px;
        word-break: break-all;
        border: 1px dashed #ddd;
        padding: 10px;
        border-radius: 4px;
        margin: 10px -10px 0;
    }

    .popular {
        .el-card__body {
            padding-top: 10px;
        }

        a {
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: normal;
            height: 40px;
            line-height: 40px;
            border-bottom: 1px dashed #efefef;

            &:last-of-type {
                border-bottom: 0;
            }
        }
    }

    .main-list {
        .el-card__header {
            .el-link--default {
                display: inline-block;
                margin-right: 20px;
            }
        }
    }

    .fixed-left {
        width: 185px;
        position: fixed;
    }

    .fixed-right {
        position: fixed;
        width: 285px;
    }
}
</style>