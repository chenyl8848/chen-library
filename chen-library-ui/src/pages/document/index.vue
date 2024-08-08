<template>
    <div class="page page-document">
        <el-row :gutter="20">
            <el-col :span="scaleSpan" class="doc-left">
                <el-card ref="docMain" shadow="never" class="doc-main">
                    <template #header>
                        <div class="clearfix">
                            <h1 v-if="document.id > 0">
                                <img :src="`/static/images/${document.icon}_24.png`" :alt="`${document.icon}文档`" />
                                {{ document.title }}
                                <img v-if="document.recommend_at" class="icon-recommend"
                                    src="/static/images/recommend.png" alt="推荐" />
                                <el-popover v-show="document.id > 0" class="hidden-xs-only" placement="bottom"
                                    width="200" trigger="hover">
                                    <div id="qrcode" ref="qrcode" class="qrcode text-center"></div>
                                    <template #reference>
                                        <span target="_blank" class="share-wechat">
                                            <i class="fa fa-qrcode"></i>
                                        </span>
                                    </template>
                                </el-popover>
                                <div v-if="
                                    userStore.user.id > 0 &&
                                    (accessDelete ||
                                        accessRecommend ||
                                        accessUpdate ||
                                        accessForbiden)
                                " class="actions">
                                    <el-button v-if="accessUpdate" type="primary" link :loading="showUpdating"
                                        :icon="EditPen" @click="showUpdateDocument">
                                        编辑文档
                                    </el-button>
                                    <el-button v-if="accessDelete" type="primary" link :icon="DocumentDelete"
                                        @click="deleteDocument">
                                        删除文档
                                    </el-button>

                                    <!-- 管理员权限 -->
                                    <el-button v-if="accessForbiden" type="primary" link :icon="NoSmoking"
                                        @click="forbiden">禁用文档</el-button>&nbsp;
                                    <el-dropdown v-if="accessRecommend" @command="setRecommend">
                                        <span class="el-dropdown-link">
                                            <el-button type="primary" link :icon="Mug">推荐设置</el-button>
                                        </span>
                                        <template #dropdown>
                                            <el-dropdown-menu>
                                                <el-dropdown-item command="cancel">取消推荐</el-dropdown-item>
                                                <el-dropdown-item command="recommend">推荐文档</el-dropdown-item>
                                            </el-dropdown-menu>
                                        </template>
                                    </el-dropdown>
                                </div>
                            </h1>
                            <el-skeleton v-else animated>
                                <template #template><el-skeleton-item variant="h1" style="width: 70%" /></template>
                            </el-skeleton>
                            <el-breadcrumb separator-class="el-icon-arrow-right">
                                <el-breadcrumb-item>
                                    <router-link to="/">
                                        <el-icon>
                                            <HomeFilled />
                                        </el-icon>
                                        首页
                                    </router-link>
                                </el-breadcrumb-item>
                                <el-breadcrumb-item>
                                    <router-link to="/category">全部文档</router-link>
                                </el-breadcrumb-item>
                                <template v-if="breadcrumbs.length < 3">
                                    <el-breadcrumb-item v-for="breadcrumb in breadcrumbs"
                                        :key="`bread-${breadcrumb.id}`">
                                        <router-link :to="`/category?category_id=${breadcrumb.id}`">
                                            {{ breadcrumb.title }}
                                        </router-link>
                                    </el-breadcrumb-item>
                                </template>
                                <template v-else>
                                    <el-breadcrumb-item>
                                        <router-link :to="`/category?category_id=${breadcrumbs[0].id}`">
                                            {{ breadcrumbs[0].title }}
                                        </router-link>
                                    </el-breadcrumb-item>
                                    <el-breadcrumb-item>...</el-breadcrumb-item>
                                    <el-breadcrumb-item>
                                        <router-link
                                            :to="`/category?category_id=${breadcrumbs[breadcrumbs.length - 1].id}`">{{
                                                breadcrumbs[breadcrumbs.length - 1].title }}</router-link>
                                    </el-breadcrumb-item>
                                </template>
                                <el-breadcrumb-item>文档阅览</el-breadcrumb-item>
                            </el-breadcrumb>
                            <div class="float-right doc-info">
                                <span>
                                    <!-- 显示文档大小 -->
                                    <el-icon>
                                        <Document />
                                    </el-icon>
                                    {{ formatBytes(document.size) }}
                                </span>
                                <span>
                                    <el-icon>
                                        <Files />
                                    </el-icon>
                                    {{ document.pages || '-' }} 页
                                </span>
                                <span v-if="settingStore.display.show_document_download_count">
                                    <el-icon>
                                        <Download />
                                    </el-icon>
                                    {{ document.download_count || 0 }} 下载
                                </span>
                                <span v-if="settingStore.display.show_document_view_count">
                                    <el-icon>
                                        <View />
                                    </el-icon>
                                    {{ document.view_count || 0 }} 浏览
                                </span>
                                <span>
                                    <el-icon>
                                        <ChatDotSquare />
                                    </el-icon>
                                    {{ document.comment_count || 0 }} 评论
                                </span>
                                <span v-if="settingStore.display.show_document_favorite_count">
                                    <el-icon>
                                        <Star />
                                    </el-icon>
                                    {{ document.favorite_count || 0 }} 收藏
                                </span>
                                <span v-if="!settingStore.display.show_document_descriptions">
                                    <el-rate v-model="document.score" disabled show-score text-color="#ff9900"
                                        score-template="{value}"></el-rate>
                                </span>
                            </div>
                        </div>
                    </template>
                    <template v-if="tips">
                        <el-alert type="warning" effect="dark" :title="tips" show-icon :closable="false"></el-alert>
                        <div class="mgt-20px"></div>
                    </template>

                    <template v-for="item in advertisements">
                        <div v-if="item.position == 'document_top'" :key="item.position + item.id"
                            v-html="item.content"></div>
                    </template>

                    <el-descriptions v-if="settingStore.display.show_document_descriptions"
                        class="document-descriptions" :column="isMobile ? 1 : 3" border>
                        <el-descriptions-item v-for="item in descriptions" :key="`desc-${item.label}`"
                            :span="item.name == 'description' ? 3 : 1" label-class-name="descriptions-label">
                            <template #label>
                                <!-- <i :class="item.icon"></i> -->
                                <el-icon>
                                    <component :is="item.icon"></component>
                                </el-icon>
                                {{ item.label }}
                            </template>
                            <span v-if="item.name === 'score'">
                                <el-rate v-model="item.value" disabled show-score text-color="#ff9900"
                                    score-template="{value}"></el-rate>
                            </span>
                            <div v-else-if="item.name === 'description'">
                                <div v-if="item.value.length > 255">
                                    <div ref="description" class="description"
                                        :class="showContent ? 'description-lg' : ''">
                                        {{ item.value }}
                                    </div>
                                    <div class="text-center">
                                        <el-button v-if="showContent" type="primary" link :icon="ArrowUp" size="small"
                                            @click="toggleContent">收起内容</el-button>
                                        <el-button v-else type="primary" link :icon="ArrowDown" size="small"
                                            @click="toggleContent">展开内容</el-button>
                                    </div>
                                </div>
                                <div v-else class="description">{{ item.value }}</div>
                            </div>
                            <div v-else>{{ item.value }}</div>
                        </el-descriptions-item>
                    </el-descriptions>
                    <div ref="docPages" class="doc-pages" @contextmenu.prevent>
                        <el-skeleton v-if="!document.id" animated>
                            <template #template>
                                <div style="background-color: #f6f6f6; padding: 5px">
                                    <el-skeleton-item variant="image" style="width: 100%; height: 520px" />
                                    <div style="height: 5px"></div>
                                    <el-skeleton-item variant="image" style="width: 100%; height: 520px" />
                                </div>
                            </template>
                        </el-skeleton>
                        <!-- <div v-if="isMobile" v-viewer>
                            <div v-for="(page, index) in pages" :key="index + page.src">
                                <el-image :src="page.src" :alt="page.alt" :data-source="page.lazySrc" lazy
                                    class="doc-page" :style="{
                                        width: pageWidth + 'px',
                                        height: pageHeight + 'px',
                                    }"></el-image>
                                <div v-if="randomAdvertisement()" class="doc-page"
                                    v-html="randomAdvertisement().content"></div>
                            </div>
                        </div> -->
                        <div v-else>
                            <div v-for="(page, index) in pages" :key="index + page.src">
                                <el-image :src="page.src" :alt="page.alt" :data-source="page.lazySrc" lazy
                                    class="doc-page" :style="{
                                        width: pageWidth + 'px',
                                        height: pageHeight + 'px',
                                    }"></el-image>
                                <div v-if="randomAdvertisement()" class="doc-page"
                                    v-html="randomAdvertisement().content"></div>
                            </div>
                        </div>
                    </div>
                    <div class="doc-page-more text-center">
                        <div>下载文档到本地，方便使用</div>
                        <el-button type="primary" :icon="Download" :size="isMobile ? 'medium' : ''"
                            :loading="downloading" @click="downloadDocument">下载文档({{ formatBytes(document.size)
                            }})</el-button>
                        <div v-if="document.preview - pages.length > 0">
                            共 {{ document.pages }} 页， 还有
                            {{ document.preview - pages.length }} 页可预览，
                            <span class="el-link el-link--primary" @click="continueRead">继续阅读</span>
                        </div>
                        <template v-else>
                            <div v-if="document.pages != document.preview" class="text-muted">
                                <small>
                                    - 可预览页数已用完，剩余
                                    {{ document.pages - document.preview }} 页请下载阅读 -
                                </small>
                            </div>
                        </template>
                    </div>
                    <div class="moreinfo">
                        <div class="share-info">
                            本文档由
                            <router-link :to="`/user?user_id=${document.user_id}`" class="el-link el-link--primary">{{
                                document.user.username ||
                                '匿名用户' }}</router-link>
                            于
                            <span class="text-muted">
                                {{ formatDateTime(document.created_at) }}
                            </span>
                            上传分享
                        </div>
                        <div class="btn-actions">
                            <el-button type="primary" :size="isMobile ? 'medium' : ''" plain :icon="Warning"
                                @click="showReport">举报</el-button>
                            <!-- <el-button
                type="primary"
                icon="el-icon-download"
                class="float-right"
                :size="isMobile ? 'medium' : ''"
                :loading="downloading"
                @click="downloadDocument"
                >下载文档({{ formatBytes(document.size) }})</el-button
              >-->
                            <el-button v-if="favorite.id > 0" type="primary" plain class="float-right hidden-xs-only"
                                :icon="Star" @click="deleteFavorite">取消收藏</el-button>
                            <el-button v-else type="primary" class="float-right hidden-xs-only" :icon="StarFilled"
                                @click="createFavorite">收藏</el-button>
                        </div>
                    </div>
                </el-card>

                <el-card v-if="document.id > 0" ref="commentBox" shadow="never" class="mgt-20px">
                    <div>
                        <span v-if="disabledScore" class="score-tips">我的评分</span>
                        <span v-else class="score-tips">文档评分</span>
                        <el-rate v-model="score" :disabled="disabledScore" show-text :texts="[
                            '该文档令人失望',
                            '该文档不怎么样',
                            '该文档一般般',
                            '该文档很让我满意',
                            '该文档非常棒',
                        ]" @change="setDocumentScore"></el-rate>
                    </div>
                    <comment-form :document-id="document.id" class="mgt-20px" @success="commentSuccess" ></comment-form>
                    <comment-list ref="commentList" :document-id="document.id" />
                </el-card>
            </el-col>
            <el-col :span="24 - scaleSpan" class="idden-xs-only document-author">
                <el-card shadow="never">
                    <template #header>
                        分享用户
                    </template>
                    <user-card></user-card>
                </el-card>
                <el-card v-if="relatedDocuments.length > 0" ref="relateDocs" shadow="never"
                    class="mgt-20px relate-docs">
                    <template #header>
                        相关文档
                    </template>
                    <div :style="`max-height: ${footerTop - 188}px;overflow-y: auto;`">
                        <document-simple-list :documents="relatedDocuments" />
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <div class="fixed-buttons">
            <el-card shadow="never">
                <el-row>
                    <el-col :span="18">
                        <el-button-group class="btn-actions">
                            <el-tooltip v-if="isMobile" content="文档点评">
                                <el-button :icon="ChatDotSquare" @click="gotoComment"></el-button>
                            </el-tooltip>
                            <el-tooltip content="全屏阅读" class="hidden-xs-only">
                                <el-button :icon="FullScreen" @click="fullscreen"></el-button>
                            </el-tooltip>
                            <el-tooltip :content="favorite.id > 0 ? '取消收藏' : '收藏文档'">
                                <el-button v-if="favorite.id > 0" :icon="StarFilled"
                                    @click="deleteFavorite"></el-button>
                                <el-button v-else :icon="Star" @click="createFavorite"></el-button>
                            </el-tooltip>
                            <el-tooltip content="缩小" class="hidden-xs-only">
                                <el-button :icon="ZoomOut" :disabled="scaleSpan === 18" @click="zoomOut"></el-button>
                            </el-tooltip>
                            <el-tooltip content="放大" class="hidden-xs-only">
                                <el-button :icon="ZoomIn" :disabled="scaleSpan === 24" @click="zoomIn"></el-button>
                            </el-tooltip>
                            <el-tooltip content="上一页" class="hidden-xs-only">
                                <el-button :icon="ArrowUp" :disabled="currentPage === 1" @click="prevPage"></el-button>
                            </el-tooltip>
                            <el-tooltip content="当前页数/总页数" class="hidden-xs-only">
                                <el-button>{{ currentPage }}/{{ document.pages }}</el-button>
                            </el-tooltip>
                            <el-tooltip content="下一页" class="hidden-xs-only">
                                <el-button :icon="ArrowDown" :disabled="currentPage === document.preview"
                                    @click="nextPage"></el-button>
                            </el-tooltip>
                        </el-button-group>
                        <el-button class="btn-comment hidden-xs-only" :icon="ChatDotSquare"
                            @click="gotoComment">文档点评</el-button>
                        <el-button-group class="float-right">
                            <el-button type="primary" :icon="Coin" class="btn-coin">
                                {{ document.price || 0 }}
                                <span>{{ settingStore.system.credit_name || '魔豆' }}</span>
                            </el-button>
                            <el-button type="primary" :icon="Download" :loading="downloading" @click="downloadDocument">
                                下载文档
                                <span class="hidden-xs-only">({{ formatBytes(document.size) }})</span>
                            </el-button>
                        </el-button-group>
                    </el-col>
                    <el-col :span="6" class="text-right hidden-xs-only">
                        <el-button :icon="Top" @click="scrollTop">回到顶部</el-button>
                    </el-col>
                </el-row>
            </el-card>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import UserCard from '@/components/UserCard.vue'
import DocumentSimpleList from '@/components/DocumentSimpleList.vue'
import CommentForm from '@/components/CommentForm.vue'
import CommentList from '@/components/CommentList.vue'
import { relatedDocumentList, documentValue } from '../../../mock/data'
import { Download, Top, ChatDotSquare, Coin, ZoomIn, ZoomOut, ArrowUp, StarFilled, Warning, FullScreen, Star, ArrowDown, EditPen, DocumentDelete, NoSmoking, Mug, Document, InfoFilled, User } from '@element-plus/icons-vue'
import hooks from '@/hooks/index'
import { formatBytes, formatDateTime } from '@/utils/utils'
import useSettingStore from '@/store/module/setting'
import useUserStore from '@/store/module/user'

const { footerTop, isMobile } = hooks()
const settingStore = useSettingStore()
const userStore = useUserStore()

let scaleSpan = ref(18)

const breadcrumbs = ref([])

const accessDelete = ref(true)
const accessRecommend = ref(true)
const accessUpdate = ref(true)
const showUpdating = ref(false)
const showUpdateDocument = ref(false)
const accessForbiden = ref(true)
const deleteDocument = () => { }
const forbiden = () => { }
const setRecommend = () => { }
const showReport = () => { }

let document = reactive({})
document = documentValue

const descriptions = ref([
    {
        label: '格式',
        value: document.ext,
        icon: Document,
        name: 'ext',
    },
    {
        label: '评分',
        value: document.score,
        icon: Star,
        name: 'score',
    },
    {
        label: '摘要',
        value: document.content,
        icon: Document,
        name: 'description',
    }
])

const descriptionItem = document.language ? {
    label: '语言',
    value: document.language,
    icon: InfoFilled,
    name: 'language',
}
    : {
        label: '上传',
        value: document.user.username,
        icon: User,
        name: 'username',
    }
descriptions.value.unshift(descriptionItem)

const tips = ref('欢迎阅读文档~')
const advertisements = ref([])

const showContent = ref(false)
const toggleContent = () => {
    showContent.value = !showContent.value
}

const pages = ref(3)
const pageHeight = ref(0)
const pageWidth = ref(0)

const randomAdvertisement = () => {
    // const advertisements = advertisements.filter(
    //     (item) => item.position == 'document_between'
    //   )
    //   if (advertisements.length > 0) {
    //     const index = Math.floor(Math.random() * advertisements.length)
    //     return advertisements[index]
    //   }
    //   return null
}

// 相关文档
const relatedDocuments = ref([])
relatedDocuments.value = relatedDocumentList

// 文档点评
const gotoComment = () => {

}

// 全屏阅读
const fullscreen = () => {

}

const favorite = reactive({})
// 收藏文档
const createFavorite = () => {

}
// 取消收藏
const deleteFavorite = () => {

}

// 缩小
const zoomOut = () => {

}

// 放大
const zoomIn = () => {

}

// 当前页
const currentPage = ref(1)

// 上一页
const prevPage = () => {

}

// 下一页
const nextPage = () => {

}

const downloading = ref(false)
// 下载文档
const downloadDocument = () => {

}

// 回到顶部
const scrollTop = () => {

}

const disabledScore = ref(false)
const score = ref(0)
const setDocumentScore = () => {}

const commentSuccess = () => {}
</script>

<style lang="scss">
.viewer-canvas>img {
    background-color: #fff;
}

.page-document {
    .doc-main {
        min-height: 90vh;
        overflow: auto;
    }

    .relate-docs {
        .el-card__body {
            padding-top: 10px;
            padding-bottom: 10px;
        }
    }

    h1 {
        margin: 0;

        img {
            position: relative;
            top: 3px;
        }

        .fa-qrcode {
            color: #aaa;
            cursor: pointer;
            margin-left: 5px;
            font-size: 26px;
            top: 2px;
            position: relative;

            &:hover {
                color: unset;
            }
        }

        .actions {
            margin-bottom: -8px;
        }

        .icon-recommend {
            height: 26px;
        }
    }

    .el-breadcrumb {
        font-weight: normal;
        margin-top: 12px;
        color: #565656;

        .el-breadcrumb__inner a,
        .el-breadcrumb__inner.is-link {
            font-weight: normal;
        }

        .el-breadcrumb__separator[class*='icon'] {
            margin: 0 3px;
        }

        .el-breadcrumb__inner {
            color: #666;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 90px;
            display: inline-block;
        }
    }

    .doc-info {
        font-weight: normal;
        position: relative;
        top: -16px;
        font-size: 14px;
        color: #bbb;

        &>span {
            margin-left: 8px;
        }

        .el-rate {
            position: relative;
            top: -2px;
        }
    }

    .doc-pages {
        min-height: 640px;

        .doc-page {
            display: block;
            width: 100%;
            box-sizing: border-box;
            border: 5px solid $background-grey-light;
            border-bottom: 0;

            img {
                width: 100%;
                background-color: #fff;
            }

            .el-image__error {
                min-height: 360px;
            }
        }
    }

    .doc-page-more {
        padding: 30px 0;
        border: 5px solid $background-grey-light;
        color: #565656;

        .el-button {
            margin: 10px 0;
        }
    }

    .share-info {
        font-size: 15px;
        color: #666;
        margin: 15px 0;

        .el-link {
            top: -2px;
        }
    }

    .fixed-buttons {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 100;
        width: 100%;
        min-width: $min-width;
        background-color: #ecf0f1;
        height: 50px;

        [class*=' el-icon-'],
        [class^='el-icon-'] {
            font-weight: bold;
        }

        .el-card {
            border-radius: 0;
            background-color: transparent;
            width: $default-width;
            max-width: $max-width;
            margin: 0 auto;

            .el-card__body {
                padding: 0;
            }

            .el-button {
                border: 0;
                border-radius: 0;
                padding: 18px 20px;
            }

            .btn-comment {
                top: 1px;
                position: relative;
                background-color: transparent;

                &:hover {
                    background-color: #ecf5ff;
                }
            }

            .btn-actions .el-button {
                background-color: transparent;

                &:hover {
                    background-color: #ecf5ff;
                }
            }

            .btn-coin {
                background-color: transparent;
                color: #606266;
                cursor: auto;
            }
        }
    }

    .score-tips {
        position: relative;
        top: 3px;
        margin-right: 10px;
        color: #565656;
    }

    .document-descriptions {
        margin-bottom: 20px;
    }

    .descriptions-label {
        width: 80px;
    }

    .description {
        position: relative;
        max-height: 101px;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        line-height: 180%;
        // 只显示4行
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;

        &.description-lg {
            max-height: unset;
            display: block;
            max-height: 360px;
            overflow-y: auto;
        }
    }
}
</style>