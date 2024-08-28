<template>
    <div class="page page-index">
        <div class="searchbox">
            <el-carousel :interval="3000" arrow="always" height="420px">
                <a v-for="banner in settingStore.banner" :key="`banner-${banner.id}`"
                    :href="banner.url ? banner.url : 'javascript:;'" :target="banner.url ? '_blank' : ''"
                    :title="banner.title">
                    <el-carousel-item :style="`background: url(${banner.path}) center center no-repeat;`
                        "></el-carousel-item>
                </a>
            </el-carousel>
            <el-form class="search-form">
                <el-form-item>
                    <el-input v-model="searchText" size="large" placeholder="搜索文档..." @keydown.enter="onSearch">
                        <template #suffix>
                            <el-button icon="Search" link type="info" @click="onSearch" />
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item v-if="settingStore.system.recommend_words">
                    <span class="hidden-xs-only">大家在搜:</span>
                    <router-link v-for="word in settingStore.system.recommend_words" :key="'kw-' + word" target="_blank"
                        :to="{
                            path: '/search',
                            query: { wd: word },
                        }">
                        <el-tag size="small">{{ word }}</el-tag>
                    </router-link>
                </el-form-item>
            </el-form>
        </div>

        <el-row :gutter="20" class="mgt-20px">
            <el-col :span="18" class="latest-recommend">
                <el-card shadow="never">
                    <template #header>
                        <div>
                            <el-icon>
                                <CollectionTag />
                            </el-icon>
                            文档推荐
                            <div class="float-right stats">
                                <el-button link type="primary">
                                    {{ 0 }}
                                    <span class="text-muted">文档</span>
                                </el-button>
                                <el-button link type="primary">
                                    {{ 0 }}
                                    <span class="text-muted">文章</span>
                                </el-button>
                                <el-button link type="primary">
                                    {{ 0 }}
                                    <span class="text-muted">用户</span>
                                </el-button>

                            </div>
                        </div>
                    </template>
                    <el-row :gutter="20">
                        <el-col v-for="(item, index) in recommendDocuments" :key="`recommend-document-${item.id}`"
                            :span="4" :class="index > 7 ? 'hidden-xs-only' : ''">
                            <el-tooltip class="item" effect="dark" :content="item.title" placement="top">
                                <router-link :to="`/document?document_id=${item.uuid}`" target="_blank">
                                    <document-cover :document="item" />
                                    <div class="el-link el-link--default">{{ item.title }}</div>
                                </router-link>
                            </el-tooltip>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>

            <el-col :span="6" class="float-right right-at-recommend">
                <el-card v-if="userStore.user.id > 0" class="box-card hidden-xs-only login-form" shadow="never">
                    <template #header>
                        <el-row>
                            <el-col :span="8">
                                <router-link :to="`/me`" target="_blank">
                                    <user-avatar :size="64" :user="userStore.user" />
                                </router-link>
                            </el-col>
                            <el-col :span="16">
                                <router-link class="el-link el-link--default" target="_blank" :to="`/me`">
                                    <h3>{{ userStore.user.username }}</h3>
                                </router-link>
                                <div class="help-block login-tips">
                                    <span class="el-link el-link--default" @click="logout">
                                        <el-icon>
                                            <DArrowRight />
                                        </el-icon>
                                        <small>退出登录</small>
                                    </span>
                                </div>
                            </el-col>
                        </el-row>
                    </template>
                    <!-- <div class="line"></div> -->
                    <el-button v-if="userStore.user.sign" :key="`sign-${userStore.user.sign}`" class="btn-block"
                        type="success" disabled>
                        <el-icon>
                            <CircleCheckFilled />
                        </el-icon>
                        &nbsp;
                        今日已签到
                    </el-button>
                    <el-button v-else :key="'sign-0'" class="btn-block" type="success" @click="signToday">
                        <el-icon>
                            <Check />
                        </el-icon>
                        &nbsp;
                        每日签到
                    </el-button>
                    <div class="help-block sub-btn">
                        <el-row>
                            <el-col :span="12">
                                <router-link to="/upload" class="el-link el-link--default" target="_blank">
                                    <el-icon>
                                        <Upload />
                                    </el-icon>
                                    上传文档
                                </router-link>
                            </el-col>
                            <el-col :span="12" class="text-right">
                                <router-link to="/publish" class="el-link el-link--default" target="_blank">
                                    <el-icon>
                                        <Plus />
                                    </el-icon>
                                    发布文章
                                </router-link>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
                <el-card v-else class="box-card hidden-xs-only login-form" shadow="never">
                    <template #header>
                        <el-row>
                            <el-col :span="8">
                                <router-link to="/login">
                                    <user-avatar :size="64" :user="userStore.user" />
                                </router-link>
                            </el-col>
                            <el-col :span="16">
                                <h3>欢迎您，游客</h3>
                                <div class="help-block login-tips">登录，体验更多功能</div>
                            </el-col>
                        </el-row>
                    </template>
                    <!-- <div class="line"></div> -->
                    <div class="btn-login">
                        <router-link to="/login">
                            <el-button class="btn-block" type="primary">马上登录</el-button>
                        </router-link>
                    </div>
                    <div class="help-block sub-btn">
                        <el-row>
                            <el-col :span="12">
                                <router-link to="/findpassword" class="el-link el-link--default">
                                    <small>找回密码</small>
                                </router-link>
                            </el-col>
                            <el-col :span="12" class="text-right">
                                <router-link to="/register" class="el-link el-link--default">
                                    <small>注册账户</small>
                                </router-link>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
                <el-card shadow="never" class="index-articles mgt-20px">
                    <template #header>
                        <el-icon>
                            <Document />
                        </el-icon> 文章资讯
                        <router-link to="/article" target="_blank" class="float-right">
                            <el-button link type="primary">更多</el-button>
                        </router-link>
                    </template>
                    <ArticleSimpleList :articles="articles"></ArticleSimpleList>
                </el-card>
            </el-col>
        </el-row>

        <div class="categories mgt-20px">
            <el-row :gutter="20">
                <template v-for="(category, index) in categoryTreesV2.filter((item) => !item.type)"
                    :key="`tree-${category.id}`">
                    <el-col v-if="index < 4" :span="6">
                        <el-card class="box-card" shadow="never">
                            <template #header>
                                <div class="clearfix">
                                    <router-link :to="`/category/document?categoryId=${category.id}`" target="_blank"
                                        class="el-link el-link--default">
                                        <img :src="category.icon || '@/assets/images/logo-icon.png'"
                                            :alt="category.title" class="category-icon" />
                                        {{ category.title }}
                                    </router-link>
                                </div>
                            </template>
                            <router-link v-for="item in category.children" :to="`/category/document?categoryId=${item.id}`"
                                :key="`category-child-${item.id}`" class="el-link el-link--default">
                                {{ item.title }}
                            </router-link>
                        </el-card>
                    </el-col>
                </template>
            </el-row>
        </div>

        <el-row :gutter="20" class="category-item-card">
            <el-col v-for="item in documents" :key="`card-cate-${item.category_id}`" :span="12">
                <el-card class="box-card mgt-20px" shadow="never">
                    <template #header>
                        <div class="clearfix">
                            <strong>
                                {{ item.category_name }}
                            </strong>
                            <router-link :to="`/category/document?categoryId=${item.category_id}`" target="_blank" class="float-right">
                                <el-button link type="primary">更多</el-button>
                            </router-link>
                        </div>
                    </template>
                    <div>
                        <div class="card-body-left hidden-xs-only">
                            <router-link :to="`/category/document?categoryId=${item.category_id}`" target="_blank">
                                <el-image lazy class="category-cover" :src="item.category_cover">
                                    <template #error>
                                        <div class="image-slot">
                                            <img src="/assets/images/default-category-cover.png"
                                                :alt="item.category_name" />
                                        </div>
                                    </template>>
                                </el-image>
                            </router-link>
                        </div>
                        <div class="card-body-right">
                            <router-link v-for="(doc, index) in item.document" :key="`document-${doc.id}`"
                                v-show="index < 5" class="el-link el-link--default" target="_blank"
                                :to="`/document?document_id=${doc.uuid}`">
                                <!-- <img :src="`/static/images/${getIcon(doc.ext)}_24.png`"
                                    :alt="`${getIcon(doc.ext)}文档`" /> -->
                                <!-- <img :src="`/static/images/${getIcon(doc.ext)}_24.png`"
                                    :alt="`${getIcon(doc.ext)}文档`" /> -->
                                <span>{{ doc.title }}</span>
                            </router-link>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import UserAvatar from '@/components/UserAvatar.vue'
import ArticleSimpleList from '@/components/ArticleSimpleList.vue'
import DocumentCover from '@/components/DocumentCover.vue'
import useSettingStore from '@/store/module/setting'
import useUserStore from '@/store/module/user'
import useCategoryStore from '@/store/module/category'
import { computed, ref } from 'vue'
import { articleList, recommendDocumentList, frontDocumentList } from '../../mock/data'

const settingStore = useSettingStore()
const userStore = useUserStore()
const categoryStore = useCategoryStore()

const searchText = ref('')
const onSearch = () => {

}

// 今日签到
const signToday = () => {

}

// 文章资讯
const articles = ref([])
articles.value = articleList


const recommendDocuments = ref([])
recommendDocuments.value = recommendDocumentList

const categoryTreesV2 = computed(() => {

    const trees = (categoryStore.categoryTree || []).filter((item) => item.enable)

    // 过滤二级分类
    trees.filter((item) => {
        item.children = (item.children || []).filter((child) => {
            return child.enable
        })
    })
    return trees
})

const documents = ref([])
documents.value = frontDocumentList
</script>

<style lang="scss">
.page-index {
    width: 100%;
    max-width: 100%;
    margin-top: -20px;

    .upload-box a {
        border: 1px dashed #ddd;
        border-radius: 4px;
        color: #666;
        text-decoration: none !important;
        font-size: 13px;
        display: block;
        padding: 20px 0;

        i {
            font-size: 55px;
            margin-bottom: 20px;
            color: #c0c4cc;
        }
    }

    .el-carousel__button {
        width: 20px;
        height: 3px;
        border-radius: 2px;
    }

    .searchbox {
        position: relative;
        margin-bottom: 20px;

        a {
            display: inline-block;
        }

        .el-carousel__item {
            background-size: cover !important;
        }

        // 搜索表单垂直居中显示
        .search-form {
            position: absolute;
            z-index: 99;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 640px;
            color: #fff;

            .el-form-item {
                margin-bottom: 0;
            }

            .el-tag {
                margin-left: 5px;
            }

            .el-input__icon {
                color: #666;
            }

            .el-input__inner {
                border-right: 0;
                height: 45px;
                line-height: 45px;
                font-size: 15px;

                &:focus {
                    border-color: #dcdfe6;
                }
            }

            .el-input-group__append {
                background-color: #fff;
                border-left: 0;
            }
        }
    }

    &>.el-row {
        width: $default-width;
        max-width: $max-width;
        margin: 0 auto !important;
    }

    .stat-info {
        color: #888;
        font-size: 18px;

        small {
            font-size: 13px;
        }

        .el-card__body {
            padding: 5px 0;

            .el-col {
                padding: 8px 0;

                &:first-child {
                    border-right: 1px solid #efefef;
                }
            }
        }
    }

    .categories {
        background-color: #fff;

        .category-icon {
            width: 22px;
            height: 22px;
            position: relative;
            top: 5px;
        }

        .el-card__header {
            a {
                font-size: 16px;
                color: #303133;
                margin-top: -2px;
                margin-bottom: 0 !important;
                margin-left: 3px;

                &:hover {
                    color: #409eff;
                }
            }
        }

        .el-row {
            margin: 0 auto !important;
            width: $default-width;
            max-width: $max-width;

            .el-card__header {
                padding-left: 0;
                border-bottom: 0;
                padding-bottom: 0;
            }

            .el-card__body {
                padding: 15px 0 20px;
                max-height: 115px;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                box-sizing: border-box;
            }

            a {
                display: inline-block;
                padding: 2px 0 5px;
                text-decoration: none;
                margin-right: 10px;
                margin-bottom: 5px;
            }
        }
    }

    .login-form {
        h3 {
            margin-top: 5px;
        }

        .line {
            border-top: 1px solid #efefef;
            margin: 14px 0 15px;
        }

        ul,
        li {
            margin: 0;
            padding: 0;
        }

        ul {
            margin: 10px 0;
        }

        li {
            margin-left: 20px;
            line-height: 200%;
            color: #555;
            font-size: 15px;
        }

        .login-tips {
            margin-top: 10px;
            font-size: 14px;
        }

        .user-count {
            margin: 20px 0;
            font-size: 13px;
            color: #999;

            .el-col:nth-child(2) {
                border-left: 1px solid #efefef;
                border-right: 1px solid #efefef;
            }

            span {
                display: block;
                margin-top: 5px;
                font-size: 16px;
                color: #409eff;
            }
        }

        .user-signature {
            text-align: left;
            text-indent: 2em;
            margin-top: 10px;
            height: 41px;
            font-size: 14px;
            line-height: 23px;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    }

    .el-card__header {
        .float-right {
            margin-top: 2px;

            .text-muted {
                font-weight: normal !important;
            }
        }
    }

    .sub-btn {
        position: relative;
        top: 13px;
        padding-bottom: 7px;
    }

    .index-articles {
        .el-card__body {
            padding-top: 4px;
            padding-bottom: 4px;
            min-height: 253px;
            box-sizing: border-box;
        }
    }

    .latest-recommend {
        .el-card__body {
            padding-bottom: 0;
            min-height: 476px;
            box-sizing: border-box;
        }

        a {
            text-decoration: none;
            display: block;
            margin-bottom: 20px;

            &:hover {
                color: #409eff;
            }

            .el-image {
                border: 2px solid #efefef;
                border-radius: 5px;
                height: 160px;
                width: 115px;
                max-width: 100%;

                img {
                    width: 100%;
                    transition: transform 0.3s ease 0s;

                    &:hover {
                        transform: scale(1.2);
                    }
                }
            }

            div.el-link {
                height: 40px;
                overflow: hidden;
                margin-bottom: 0px;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                word-break: break-word;
                font-size: 13px;
                line-height: 20px;
            }
        }
    }

    .category-item-list {
        .el-card__body {
            padding-bottom: 0;

            .doc-item {
                margin-bottom: 20px;
                display: flex;

                .el-link {
                    display: block;
                }

                .doc-cover {
                    width: 70px;
                    margin-right: 15px;
                }

                .doc-title {
                    flex: 1;

                    .el-link {
                        font-size: 14px;
                        margin-bottom: 20px;
                        line-height: 180%;

                        &>div {
                            overflow: hidden;
                            display: -webkit-box;
                            text-overflow: ellipsis;
                            height: 50px;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            word-break: break-word;
                        }
                    }

                    // @media screen and (max-width: $mobile-width) {
                    //     .el-link {
                    //         margin-bottom: 15px;

                    //         &>div {
                    //             height: 66px;
                    //             line-height: 22px;
                    //             -webkit-line-clamp: 3;
                    //         }
                    //     }
                    // }

                    &>div {
                        font-size: 13px;
                        color: #888;
                    }
                }
            }
        }
    }

    .category-item-card {
        .el-card__body {
            padding-bottom: 15px;
        }

        .el-card__body>div {
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            .card-body-left {
                width: 180px;
                padding-right: 20px;

                .category-cover {
                    height: 145px;
                    width: 180px;
                    overflow: hidden;
                }

                .image-slot {
                    height: 145px;
                    overflow: hidden;
                }

                img {
                    width: 180px;
                    height: 145px;
                    border-radius: 5px;
                }
            }

            .card-body-right {
                width: 100%;
                margin-top: -5px;
                margin-left: 12px;
                box-sizing: border-box;
                padding-right: 200px;

                a {
                    text-decoration: none;
                    display: block;
                    line-height: 30px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;

                    img {
                        display: none;
                    }
                }
            }
        }
    }
}
</style>