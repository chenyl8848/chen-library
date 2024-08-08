<template>
    <div class="page page-category">
        <el-row>
            <el-col :span="24">
                <el-card ref="breadcrumb" shadow="never">
                    <template #header>
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item :to="{ path: '/' }">
                                <el-icon>
                                    <HomeFilled />
                                </el-icon>
                                首页
                            </el-breadcrumb-item>
                            <el-breadcrumb-item :to="{ path: '/category' }">全部文档</el-breadcrumb-item>
                            <el-breadcrumb-item v-for="item in breadcrumbs" :key="`breadcrumb-${item.id}`">
                                <el-dropdown class="breadcrumb-dropdown" v-if="item.brother && item.brother.length > 0">
                                    <span class="el-dropdown-link">
                                        {{ item.title }}
                                        <el-icon class="el-icon--right">
                                            <arrow-down />
                                        </el-icon>
                                    </span>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item v-for="menu in item.brother"
                                                :key="`dropdown-menu-${menu.id}`">
                                                <router-link :to="`category?category_id=${menu.id}`"
                                                    class="el-link el-link--default block" :class="{
                                                        'el-link--primary': menu.id === item.id,
                                                    }">
                                                    {{ menu.title }}
                                                </router-link>
                                            </el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                                <span v-else>
                                    {{ item.title }}
                                </span>
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                    </template>
                    <div v-if="breadcrumbs.length > 0 && breadcrumbs[breadcrumbs.length - 1].show_description"
                        class="category-description">
                        {{ breadcrumbs[breadcrumbs.length - 1].description }}
                    </div>
                    <div v-if="categoryChildren.length > 0" class="item-row">
                        <div class="item-name">分类</div>
                        <div class="item-content">
                            <el-popover v-for="child in categoryChildren" :key="'tree-pop-' + child.id"
                                placement="top-start" :title="child.title" width="200" trigger="hover"
                                :disabled="!child.description" :content="child.description">
                                <template #reference>
                                    <router-link :to="`/category?category_id=${child.id}`" :title="child.title"
                                        class="el-link el-link--default">{{ child.title }}</router-link>
                                </template>
                            </el-popover>
                        </div>
                    </div>
                    <div class="item-row">
                        <div class="item-name">类型</div>
                        <div class="item-content">
                            <router-link v-for="item in exts" :key="item.value"
                                :to="{ query: { ...$route.query, ext: item.value } }" class="el-link" :class="item.value === $route.query.ext ||
                                    (!item.value && !$route.query.ext)
                                    ? 'el-link--primary'
                                    : 'el-link--default'
                                    ">{{ item.label }}</router-link>
                        </div>
                    </div>
                    <div class="item-row">
                        <div class="item-name">费用</div>
                        <div class="item-content">
                            <router-link v-for="item in feeTypeOptions" :key="item.value"
                                :to="{ query: { ...$route.query, fee_type: item.value } }" class="el-link" :class="item.value === $route.query.fee_type ||
                                    (!item.value && !$route.query.fee_type)
                                    ? 'el-link--primary'
                                    : 'el-link--default'
                                    ">{{ item.label }}
                            </router-link>
                        </div>
                    </div>
                    <div v-if="(settingStore.language || []).length > 0" class="item-row">
                        <div class="item-name">语言</div>
                        <div class="item-content">
                            <router-link :to="{ query: { ...$route.query, language: '' } }" class="el-link" :class="!$route.query.language
                                ? 'el-link--primary'
                                : 'el-link--default'
                                ">不限</router-link>
                            <router-link v-for="item in settingStore.language" :key="item.code"
                                :to="{ query: { ...$route.query, language: item.code } }" class="el-link" :class="item.code === $route.query.language ||
                                    (!item.code && !$route.query.language)
                                    ? 'el-link--primary'
                                    : 'el-link--default'
                                    ">{{ item.language }}</router-link>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="20" class="mgt-20px">
            <el-col :span="!settingStore.display.hide_keywords_on_lists ? 18 : 24">
                <el-card ref="docList" shadow="never" class="doc-list">
                    <template #header>
                        <el-tabs v-model="query.sort" @tab-click="tabSortClick">
                            <el-tab-pane name="default">
                                <template #label>
                                    <span><i class="el-icon-coffee-cup"></i> 综合</span>
                                </template>
                            </el-tab-pane>
                            <el-tab-pane name="latest">
                                <template #label>
                                    <span><i class="el-icon-date"></i> 最新</span>
                                </template>
                            </el-tab-pane>
                            <el-tab-pane name="view">
                                <template #label>
                                    <span><i class="el-icon-view"></i> 浏览</span>
                                </template>
                            </el-tab-pane>
                            <el-tab-pane name="recommend">
                                <template #label>
                                    <span><i class="el-icon-coordinate"></i> 推荐</span>
                                </template>
                            </el-tab-pane>
                            <el-tab-pane name="favorite">
                                <template #label>
                                    <span><i class="el-icon-star-off"></i> 收藏</span>
                                </template>
                            </el-tab-pane>
                            <el-tab-pane name="download">
                                <template #label>
                                    <span><i class="el-icon-download"></i> 下载</span>
                                </template>
                            </el-tab-pane>
                            <el-tab-pane name="pages">
                                <template #label>
                                    <span><i class="el-icon-files"></i> 页数</span>
                                </template>
                            </el-tab-pane>
                        </el-tabs>
                    </template>
                    <div class="doc-list-data">
                        <document-list-skeleton v-if="loading"></document-list-skeleton>
                        <document-list v-else-if="documents.length > 0" :documents="documents" />
                        <div v-if="!loading && documents.length === 0" class="no-data">
                            <el-empty description="暂无数据"></el-empty>
                        </div>
                    </div>
                    <el-pagination v-if="total > 0" :current-page="query.page" :page-size="query.pageSize" :layout="isMobile
                        ? 'total, prev, pager, next'
                        : 'total, prev, pager, next, jumper'
                        " :pager-count="isMobile ? 5 : 7" :small="isMobile" :total="total"
                        @current-change="pageChange">
                    </el-pagination>
                </el-card>
            </el-col>
            <el-col v-if="!settingStore.display.hide_keywords_on_lists" :span="6" class="hidden-xs-only">
                <el-card ref="keywords" shadow="never" class="keywords">
                    <template #header>
                        <el-row>
                            <el-col :span="8" class="header-title">关键词</el-col>
                        </el-row>
                    </template>
                    <div v-loading="loading" :style="`max-height: ${footerTop - 188}px;overflow:auto`">
                        <router-link v-for="(item, index) in keyWords" :key="`kw-${index}-${item}`"
                            :to="{ path: '/search', query: { wd: item } }" target="_blank" rel="nofollow">
                            <el-tag effect="plain"> {{ item }}</el-tag>
                        </router-link>
                        <div v-if="keyWords.length === 0">
                            <el-empty description="暂无相关关键词"></el-empty>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>

import { onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import useCategoryStore from '@/store/module/category'
import useSettingStore from '@/store/module/setting'
import hooks from '@/hooks'
import { categoryDocumentList } from '../../../mock/data.js'
import DocumentListSkeleton from '@/components/DocumentListSkeleton.vue'
import DocumentList from '@/components/DocumentList.vue'

const $route = useRoute()
const catetoryStore = useCategoryStore()
const settingStore = useSettingStore()
let categoryId = $route.query.category_id

const breadcrumbs = ref([])
const categoryChildren = ref([])
const exts = ref([
    { label: '不限', value: '' },
    { label: 'PDF', value: 'pdf' },
    { label: 'DOC', value: 'doc' },
    { label: 'PPT', value: 'ppt' },
    { label: 'XLS', value: 'xls' },
    { label: 'TXT', value: 'txt' },
    { label: '其它', value: 'other' },
])
const feeTypeOptions = ref([
    { label: '不限', value: '' },
    { label: '免费', value: 'free' },
    { label: '付费', value: 'charge' },
])

const getCategorys = () => {
    if (categoryId) {
        // 获取当前分类
        const currentCategory = catetoryStore.categories.filter((item) => item.id === Number(categoryId))[0]
        if (currentCategory) {
            // 0、清空面包屑
            breadcrumbs.value.splice(0, breadcrumbs.value.length)

            // 1、查询兄弟分类
            const brotherCategory = filterCategoryBrothers(currentCategory)
            currentCategory.brother = brotherCategory
            breadcrumbs.value.push(currentCategory)

            // 2、查询父级分类的兄弟分类
            const parentId = currentCategory.parent_id
            if (parentId) {
                const parentCategory = catetoryStore.categories.filter((item) => item.id === parentId)[0]
                if (parentCategory) {
                    const parentBrotherCategory = filterCategoryBrothers(parentCategory)
                    parentCategory.brother = parentBrotherCategory

                    breadcrumbs.value.unshift(parentCategory)

                    // 清空分类
                    categoryChildren.value.splice(0, categoryChildren.value.length)
                }
            } else {
                // 获取子集分类
                categoryChildren.value = filterCategoryChildrens(currentCategory)
            }

        }

    } else {
        // 获取一级分类
        categoryChildren.value = filterFirstCategory()

        // 清空面包屑
        breadcrumbs.value.splice(0, breadcrumbs.value.length)

    }
}

const filterCategoryBrothers = (category) => {
    try {
        return catetoryStore.categories.filter((x) => {
            if (
                settingStore.display &&
                settingStore.display.hide_category_without_document
            ) {
                return !x.type && x.parent_id === category.parent_id && x.doc_count > 0
            }
            return !x.type && x.parent_id === category.parent_id
        })
    } catch (error) {
        console.log(error)
    }
    return []
}

const filterCategoryChildrens = (category) => {
    try {
        return catetoryStore.categories.filter((x) => {
            if (
                settingStore.display &&
                settingStore.display.hide_category_without_document
            ) {
                return !x.type && x.parent_id === category.id && x.doc_count > 0
            }
            return !x.type && x.parent_id === category.id
        })
    } catch (error) {
        console.log(error)
    }
    return []
}

const filterFirstCategory = () => {
    try {
        return catetoryStore.categories.filter((x) => {
            if (
                settingStore.display &&
                settingStore.display.hide_category_without_document
            ) {
                return !x.type && !x.parent_id && x.doc_count > 0
            }
            return !x.type && !x.parent_id
        })
    } catch (error) {
        console.log(error)
    }
    return []
}

const total = ref(0)
const query = reactive({
    page: 1,
    pageSize: 10,
    sort: 'default',
    ext: '',
    language: '',
    feeType: '',
    categoryId: ''

})
const pageChange = (currentPage) => {
    query.page = currentPage
    getDocuments()
}

const tabSortClick = (tabName) => {
    query.sort = tabName.paneName
    getDocuments()
}

const loading = ref(false)
const keyWords = ref([])
const { footerTop, isMobile } = hooks()
const documents = ref([])

const getDocuments = () => {
    // TODO 集成 API 接口
    loading.value = true

    setTimeout(() => {
        total.value = categoryDocumentList.total
        documents.value = categoryDocumentList.document

        documents.value.forEach((item1) => {
            item1.keywords.split(",").forEach((item2) => {
                keyWords.value.push(item2)
            })
        })

        loading.value = false
    }, 2000);
}

const setQuery = (queryParams) => {
    console.log("setQuery")
    if (queryParams.category_id !== undefined) {
        categoryId = queryParams.category_id
        query.categoryId = queryParams.category_id
    } else {
        categoryId = ''
        query.categoryId = ''
    }

    if (queryParams.ext !== undefined) {
        query.ext = queryParams.query.ext
    }

    if (queryParams.fee_type !== undefined) {
        query.feeType = queryParams.query.fee_type
    }

    if (queryParams.language !== undefined) {
        query.language = queryParams.query.language
    }
}

onMounted(() => {
    getCategorys(),
        getDocuments()
})

watch($route, (newValue) => {
    setQuery(newValue.query)
    getCategorys()
    getDocuments()
})

</script>

<style lang="scss">
.page-category {
    .el-breadcrumb__inner {
        cursor: pointer !important;

        a {
            font-weight: normal;
        }
    }

    .item-row {
        display: flex;
        margin-bottom: 10px;

        .item-name {
            width: 60px;
            font-size: 15px;
            color: #bbb;
        }

        .item-content {
            flex: 1;
        }

        a {
            display: inline-block;
            margin-right: 20px;
            margin-bottom: 10px;
            font-weight: normal;
        }

        &:last-of-type {
            margin-bottom: -10px;
        }
    }

    .category-description {
        border: 1px dashed #ddd;
        margin-bottom: 20px;
        padding: 15px;
        border-radius: 4px;
        font-size: 14px;
        color: #888;
        line-height: 180%;
    }

    .doc-list-data {
        min-height: 200px;

        .no-data {
            text-align: center;
            font-size: 14px;
            color: #aaa;
        }
    }

    .doc-list {
        .el-card__header {
            padding: 0 20px;

            .el-tabs__header {
                margin: 0;
            }

            .el-tabs__item {
                line-height: 57px;
                height: 57px;
            }
        }

        .el-tabs__nav-wrap::after {
            background-color: transparent;
        }
    }

    .keywords {
        .el-card__body {
            padding-bottom: 10px;
            box-sizing: border-box;
            overflow: auto;

            /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
            &::-webkit-scrollbar {
                background-color: transparent;
                width: 6px;
                height: 6px;
            }

            &:hover::-webkit-scrollbar {
                background-color: rgb(241, 241, 241);
            }

            /*定义滚动条轨道 内阴影+圆角*/
            &::-webkit-scrollbar-track {
                background-color: transparent;
            }

            /*定义滑块 内阴影+圆角*/
            &::-webkit-scrollbar-thumb {
                background-color: transparent;
                border-radius: 3px;
            }

            &:hover::-webkit-scrollbar-thumb {
                background-color: rgb(193, 193, 193);
            }

            &:hover::-webkit-scrollbar-thumb::hover {
                background-color: rgb(168, 168, 168);
            }
        }

        a {
            margin-right: 10px;
            margin-bottom: 10px;
            display: inline-block;

            &:hover .el-tag--plain {
                background-color: #409eff;
                border-color: #409eff;
                color: #fff;
            }
        }
    }
}
</style>