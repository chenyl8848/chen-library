<template>
    <div class="page page-search">
        <el-row class="header-links hidden-xs-only">
            <el-col :span="24">
                <router-link to="/" class="el-link el-link--default">
                    <el-icon>
                        <HomeFilled />
                    </el-icon>
                    &nbsp;首页
                </router-link>
                <template v-for="item in categoryStore.navigations.filter((item) => item.enable)">
                    <el-popover v-if="item.href === '/category'" :key="`/category-${item.id}`" width="520"
                        trigger="hover" :disabled="categoryStore.categoryTree.filter((x) => !x.type).length === 0">
                        <CategoryCard :type="0"></CategoryCard>
                        <template #reference>
                            <router-link class="el-link el-link--default" to="/category/document?categoryId=">{{
                                item.title ||
                                '文库资料' }}</router-link>
                        </template>
                    </el-popover>
                    <el-popover v-if="item.href === '/article'" :key="`/article-${item.id}`" width="520" trigger="hover"
                        :disabled="categoryStore.categoryTree.filter((x) => x.type === 1).length === 0">
                        <CategoryCard :type="1"></CategoryCard>
                        <template #reference>
                            <router-link class="el-link el-link--default" to="/category/article">{{ item.title
                                || '文章资讯' }}</router-link>
                        </template>
                    </el-popover>
                </template>
                <span class="float-right">
                    <router-link to="/upload" class="el-link el-link--default">
                        <el-icon>
                            <Upload />
                        </el-icon>
                        &nbsp;上传文档
                    </router-link>
                    <router-link to="/publish" class="el-link el-link--default">
                        <el-icon>
                            <Plus />
                        </el-icon>
                        &nbsp;发布文章
                    </router-link>
                    <router-link v-if="userStore.user.id > 0" :to="`/user?userId=${userStore.user.id}`"
                        class="el-link el-link--default">
                        <el-icon>
                            <User />
                        </el-icon>
                        &nbsp;会员中心
                    </router-link>
                    <router-link v-else class="el-link el-link--default" to="/login">
                        <el-icon>
                            <User />
                        </el-icon>
                        &nbsp;登录账户
                    </router-link>
                </span>
            </el-col>
        </el-row>
        <div ref="searchBox" class="search-box">
            <el-row :gutter="20">
                <el-col :span="4" class="logo hidden-xs-only">
                    <router-link to="/" :title="settingStore.system.sitename"><img
                            :src="settingStore.system.logo || '/static/images/logo-empty.png'" style="max-width: 100%"
                            :alt="settingStore.system.sitename" /></router-link>
                </el-col>
                <el-col :span="14" class="search-form">
                    <el-input v-model="query.searchText" class="search-input" size="large" placeholder="请输入关键词"
                        @keyup.enter="onSearch">
                        <!-- 加一个搜索前缀，搜索文章还是文档 -->
                        <template #prepend>
                            <el-select v-model="query.searchType" placeholder="请选择搜索类型" @change="changeSearchType">
                                <el-option v-for="item in categoryTypeEnum" :key="`st-${item.value}`"
                                    :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </template>
                        <template #append>
                            <el-button icon="Search" @click="onSearch" />
                        </template>
                    </el-input>
                </el-col>
            </el-row>
        </div>
        <el-row :gutter="20">
            <template v-for="item in advertisements">
                <el-col v-if="item.position == 'search_top'" :key="item.position + item.id" :span="24">
                    <div v-html="item.content"></div>
                </el-col>
            </template>
            <el-col ref="searchMain" :span="18" class="search-main">
                <el-card v-loading="loading" shadow="never">
                    <template #header>
                        <div class="search-filter">
                            <el-dropdown :show-timeout="showTimeout">
                                <el-button type="primary" link :size="filterSize">
                                    {{ filterCategoryName(query.category_id)
                                    }}<el-icon class="el-icon--right">
                                        <ArrowDown />
                                    </el-icon>
                                </el-button>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item v-for="item in [
                                            { id: 0, title: '全部分类' },
                                            ...categoryStore.categoryTree.filter(
                                                (item) =>
                                                    (!query.searchType && !item.type) ||
                                                    (query.searchType && item.type == query.searchType)
                                            ),
                                        ]" :key="'cate-' + item.id" :value="item.id">
                                            <router-link class="el-link el-link--default" :class="item.id == query.category_id ? 'el-link--primary' : ''
                                                " :to="{
                                                    query: {
                                                        ...$route.query,
                                                        category_id: item.id,
                                                        page: 1,
                                                    },
                                                }">{{ item.title }}</router-link>
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                            <el-dropdown v-if="(settingStore.language || []).length > 0 && !query.searchType"
                                :show-timeout="showTimeout">
                                <el-button type="primary" link :size="filterSize">
                                    {{ filterLanguageName(query.language) }}
                                    <el-icon class="el-icon--right">
                                        <ArrowDown />
                                    </el-icon>
                                </el-button>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item v-for="item in [
                                            { code: '', language: '全部语言' },
                                            ...(settingStore.language || []),
                                        ]" :key="'lang-' + item.code" :value="item.code">
                                            <router-link class="el-link el-link--default" :class="item.code == query.language ? 'el-link--primary' : ''
                                                " :to="{
                                                    query: {
                                                        ...$route.query,
                                                        language: item.code,
                                                        page: 1,
                                                    },
                                                }">{{ item.language }}</router-link>
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                            <el-dropdown v-if="!query.searchType" :show-timeout="showTimeout">
                                <el-button type="primary" link :size="filterSize">
                                    <img v-if="query.ext != 'all' && query.ext != ''"
                                        :src="`/static/images/${query.ext}_24.png`" :alt="`${query.ext}文档`" />
                                    {{ filterExtName(query.ext)
                                    }}<el-icon class="el-icon--right">
                                        <ArrowDown />
                                    </el-icon>
                                </el-button>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item v-for="item in searchExtEnum" :key="'se-' + item.value">
                                            <router-link class="el-link el-link--default"
                                                :class="item.value == query.ext ? 'el-link--primary' : ''" :to="{
                                                    query: { ...$route.query, ext: item.value, page: 1 },
                                                }">
                                                <img v-if="item.value != 'all' && item.value != ''"
                                                    :src="`/static/images/${item.value}_24.png`"
                                                    :alt="`${item.label}文档`" />
                                                {{ item.label }}</router-link>
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                            <el-dropdown :show-timeout="showTimeout">
                                <el-button type="primary" link :size="filterSize">
                                    {{ filterSortName(query.sort)
                                    }}
                                    <el-icon class="el-icon--right">
                                        <ArrowDown />
                                    </el-icon>
                                </el-button>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item v-for="item in searchSortEnum.filter(
                                            (item) =>
                                                !query.searchType ||
                                                (query.searchType &&
                                                    item.value != 'pages' &&
                                                    item.value != 'size')
                                        )" :key="'ss-' + item.value">
                                            <router-link class="el-link el-link--default" :class="item.value == query.sort ? 'el-link--primary' : ''
                                                " :to="{
                                                    query: { ...$route.query, sort: item.value, page: 1 },
                                                }">{{ item.label }}</router-link>
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                            <el-dropdown :show-timeout="showTimeout">
                                <el-button type="primary" link :size="filterSize">
                                    {{ filterDurationName(query.duration) }}
                                    <el-icon class="el-icon--right">
                                        <ArrowDown />
                                    </el-icon>
                                </el-button>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item v-for="item in searchDurationEnum" :key="'d-' + item.value">
                                            <router-link class="el-link el-link--default" :class="item.value == query.duration ? 'el-link--primary' : ''
                                                " :to="{
                                                    query: {
                                                        ...$route.query,
                                                        duration: item.value,
                                                        page: 1,
                                                    },
                                                }">{{ item.label }}</router-link>
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </div>
                    </template>
                    <div class="search-tips">
                        本次搜索耗时
                        <span class="el-link el-link--danger">{{ spend || '0.000' }}</span>
                        秒，为您找到相关结果约
                        <span class="el-link el-link--danger">{{ total || 0 }}</span> 个.
                    </div>
                    <!-- <div class="search-result-none">没有搜索到内容...</div> -->
                    <div class="search-result">
                        <SearchResultArticle v-if="query.searchType === 1" :articles="articles" />
                        <SearchResultDocument v-else :documents="documents" />
                    </div>
                    <el-pagination v-if="total > 0" :current-page="query.currentPage" :page-size="query.pageSize"
                        :layout="isMobile
                            ? 'total, prev, pager, next'
                            : 'total, prev, pager, next, jumper'
                            " :pager-count="isMobile ? 5 : 7" :small="isMobile" :total="total"
                        @current-change="handleChangePage">
                    </el-pagination>
                </el-card>
            </el-col>
            <el-col v-if="keywords.length > 0" :span="6" class="search-right">
                <div ref="searchRight" class="scroll">
                    <el-card shadow="never">
                        <template #header>
                            <div class="clearfix">
                                <span>相关搜索词</span>
                            </div>
                        </template>
                        <router-link v-for="keyword in keywords" :key="`kw-${keyword}`" rel="nofollow" :to="{
                            path: '/search',
                            query: {
                                keyword: keyword,
                                type: query.searchType,
                            },
                        }" class="el-link el-link--default">{{ keyword }}</router-link>
                    </el-card>
                </div>
                <template v-for="item in advertisements">
                    <div v-if="item.position == 'search_right'" :key="item.position + item.id" v-html="item.content">
                    </div>
                </template>
            </el-col>
        </el-row>
        <template v-for="item in advertisements">
            <div v-if="item.position == 'search_bottom'" :key="item.position + item.id" v-html="item.content"></div>
        </template>
    </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import CategoryCard from '@/components/CategoryCard.vue'
import { useRoute } from 'vue-router'
import useCategoryStore from '@/store/module/category'
const categoryStore = useCategoryStore()
import useUserStore from '@/store/module/user'
const userStore = useUserStore()
import useSettingStore from '@/store/module/setting'
const settingStore = useSettingStore()
import { categoryTypeEnum, searchDurationEnum, searchExtEnum, searchSortEnum } from '@/utils/enum'
import hooks from '@/hooks'
import SearchResultArticle from '@/components/SearchResultArticle.vue';
import SearchResultDocument from '@/components/SearchResultDocument.vue';
import { latestPublishArticleList } from '../../../mock/data';
const { isMobile } = hooks()

const $route = useRoute()

const query = reactive({
    searchText: '',
    searchType: '',
    currentPage: 1,
    pageSize: 10
})

const loading = ref(false)
const total = ref(100)
const spend = ref(1.11)
const documents = ref([])
const articles = ref([])

const keywords = ref([])

const onSearch = () => {
    console.log(query, "queryyyyyyyyyyyy")
    loading.value = true
    setTimeout(() => {
        loading.value = false
        documents.value = latestPublishArticleList
        keywords.value = ["语文", "小学教育"]
    }, 2000);
}

watch($route, (newVal) => {
    console.log(newVal, "fffffffffff")
    query.searchText = newVal.query.keyword
    onSearch()
}, { immediate: true })

const changeSearchType = () => {
    onSearch()
}

const advertisements = ref([])

const showTimeout = ref(50)
const filterSize = computed(() => {
    return isMobile.value ? 'small' : 'default'
})

const filterCategoryName = (id) => {
    const category = categoryStore.categoryTree.find((item) => item.id === id)
    return category ? category.title : '全部分类'
}
const filterLanguageName = (code) => {
    const item = (settingStore.language || []).find(
        (item) => item.code === code
    )
    return item ? item.language : '全部语言'
}
const filterSortName = (value) => {
    const sort = searchSortEnum.find((item) => item.value === value)
    return sort ? sort.label : '默认排序'
}

const filterDurationName = (value) => {
    const duration = searchDurationEnum.find((item) => item.value === value)
    return duration ? duration.label : '全部时间'
}

const filterExtName = (value) => {
    const ext = searchExtEnum.find((item) => item.value === value)
    return ext ? ext.label : '全部格式'
}

const handleChangePage = (page) => {
    query.currentPage = page
    onSearch()
}
</script>

<style lang="scss">
.search-page {
    .layout-default {
        padding-top: 0;

        .el-main {
            padding-top: 0;
        }
    }

    .el-dropdown-menu__item {
        padding: 0;

        .el-link {
            padding: 0 20px;

            img {
                width: 16px;
                height: 16px;
                margin-right: 4px;
            }
        }
    }
}

.page-search {
    .el-select .el-input {
        width: 90px;
        padding: 0 15px;

        .el-input__suffix {
            right: 0;
            right: 25px;
        }
    }

    // width: $max-width;

    &>.el-row {
        width: $default-width;
        max-width: $max-width;
        margin: 0 auto !important;
    }

    .header-links {
        padding: 0 10px;

        .el-link {
            line-height: 35px;
            margin-right: 10px;
        }
    }

    .search-box {
        padding: 20px 0;
        margin-bottom: 20px;
        background-color: #fff;
        width: 100%;

        &>.el-row {
            margin: 0 auto !important;
            width: $default-width;
            max-width: $max-width;
        }

        .el-cascader {
            width: 110px;
            height: 38px;
            line-height: 38px;

            .el-input__inner {
                height: 38px;
                line-height: 38px;
                border: 0;
            }
        }

        .el-input-group__append,
        .el-input-group__prepend {
            padding: 0 2px;
            background-color: #fff;
        }

        .search-input {
            margin-top: 5px;
        }
    }

    .scroll {
        overflow: auto;

        &::-webkit-scrollbar {
            width: 5px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #ccc;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 3px;
        }
    }

    .search-right {
        a {
            display: inline-block;
            line-height: 30px;
            margin-right: 10px;
        }
    }

    .emptyblock {
        height: 1px;
    }

    .search-main {
        .el-card__header {
            font-weight: normal;
            font-size: 15px;
            line-height: 20px;
            padding: 10px 20px;
        }

        .el-card__body {
            padding-top: 0;
            padding-bottom: 10px;
            min-height: 540px;
        }
    }

    .search-tips {
        font-size: 14px;
        margin-top: 10px;
        color: #999;

        .el-link {
            position: relative;
            top: -2px;
        }
    }

    .search-filter {
        .el-dropdown {
            margin-right: 15px;
        }

        .el-button--text {
            color: #6b7a88;

            &:hover {
                color: #409eff;
            }
        }

        img {
            width: 14px;
            height: 14px;
            position: relative;
            top: 1px;
        }
    }
}

@media screen and (max-width: $mobile-width) {
    .page-search {
        .search-box {
            padding: 15px 0;
            margin-bottom: 15px;

            .search-form {
                width: 100% !important;
                padding-top: 55px;
            }
        }

        .search-left-col {
            padding-left: 0 !important;
            padding-right: 0 !important;
            width: 100%;

            a {
                display: inline-block;
                padding: 0 10px;
                line-height: 30px;
                font-size: 13px;
            }
        }

        .search-main {
            width: 100% !important;
            // margin-top: 15px;
            padding-left: 0 !important;
            padding-right: 0 !important;

            .el-card__body {
                min-height: unset;
            }

            .search-result li {
                padding-top: 0;
            }

            .el-card__header {
                font-size: 12px;

                .el-button--mini {
                    font-size: 13px;
                }
            }
        }

        .search-filter {
            .el-dropdown {
                margin-right: 7px;
            }
        }

        .search-right {
            width: 100% !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
            margin-top: 15px;
        }
    }
}
</style>