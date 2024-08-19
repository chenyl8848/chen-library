<template>
    <div class="page page-article">
        <el-row :gutter="20">
            <el-col :span="18" :xs="24">
                <el-card shadow="never">
                    <template #header>
                        <h1>
                            <template v-if="article.id > 0">
                                <template v-if="article.status != 1">
                                    (
                                    <span v-if="article.status == 2" class="text-danger">审核拒绝</span>
                                    <span v-else class="text-warning">待审核</span>
                                    )
                                </template>
                            </template>
                            {{ article.title }}
                            <img v-if="article.recommend_at" class="icon-recommend" src="/static/images/recommend.png"
                                alt="推荐" />
                            <div v-if="
                                userStore.user.id > 0 &&
                                (accessDelete ||
                                    accessRecommend ||
                                    accessUpdate ||
                                    accessForbiden)
                            " class="actions">
                                <el-button v-if="accessDelete" type="primary" link :icon="Delete"
                                    @click="deleteArticle">删除文章</el-button>
                                <router-link v-if="accessUpdate" :to="`/post?identifier=${article.identifier}`">
                                    <el-button type="primary" link :icon="Edit">编辑文章</el-button>
                                </router-link>
                                <!-- 管理员权限 -->
                                <el-dropdown v-if="accessForbiden" @command="checkArticle">
                                    <span class="el-dropdown-link">
                                        <el-button type="primary" link :icon="DocumentChecked">文章审批</el-button>
                                    </span>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item command="pass">审核通过</el-dropdown-item>
                                            <el-dropdown-item command="reject">审核拒绝</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                                <el-dropdown v-if="accessRecommend" @command="recommendArticle">
                                    <span class="el-dropdown-link">
                                        <el-button type="primary" link :icon="Mug"> 推荐设置</el-button>
                                    </span>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item command="cancel">取消推荐</el-dropdown-item>
                                            <el-dropdown-item command="recommend">推荐文章</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </div>
                        </h1>
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item>
                                <router-link to="/">
                                    <el-icon>
                                        <HomeFilled />
                                    </el-icon>
                                    首页
                                </router-link>
                            </el-breadcrumb-item>
                            <el-breadcrumb-item>
                                <router-link to="/article">文章</router-link>
                            </el-breadcrumb-item>
                            <template v-if="breadcrumbs.length < 3">
                                <el-breadcrumb-item v-for="breadcrumb in breadcrumbs" :key="`bread-${breadcrumb.id}`">
                                    <router-link :to="`/category/article?categoryId=${breadcrumb.id}`">
                                        {{ breadcrumb.title }}
                                    </router-link>
                                </el-breadcrumb-item>
                            </template>
                            <template v-else>
                                <el-breadcrumb-item>
                                    <router-link :to="`/category/article?categoryId=${breadcrumbs[0].id}`">
                                        {{ breadcrumbs[0].title }}
                                    </router-link>
                                </el-breadcrumb-item>
                                <el-breadcrumb-item>...</el-breadcrumb-item>
                                <el-breadcrumb-item>
                                    <router-link :to="`/category/article?categoryId=${breadcrumbs[breadcrumbs.length - 1].id
                                        }`">{{ breadcrumbs[breadcrumbs.length - 1].title }}</router-link>
                                </el-breadcrumb-item>
                            </template>
                            <el-breadcrumb-item>文章详情</el-breadcrumb-item>
                        </el-breadcrumb>
                    </template>
                    <div class="help-block text-muted article-info hidden-xs-only">
                        <span>
                            <el-icon>
                                <View />
                            </el-icon>
                            {{ article.view_count || 0 }}
                            阅读
                        </span>
                        <span>
                            <el-icon>
                                <Star />
                            </el-icon>
                            {{ article.favorite_count || 0 }}
                            收藏
                        </span>
                        <span>
                            <el-icon>
                                <ChatDotSquare />
                            </el-icon>
                            {{ article.comment_count || 0 }} 评论
                        </span>
                        <span class="float-right">
                            <el-icon>
                                <Timer />
                            </el-icon>
                            <span class="hidden-xs-only">
                                发布:</span>{{ formatRelativeTime(article.created_at) }}
                        </span>
                    </div>
                    <!-- 展示文章作者信息 -->
                    <!-- <div v-if="article.id > 0" class="hidden-sm-and-up">
                        <div class="m-userinfo">
                            <div>
                                <router-link :to="'/user/' + article.user_id">
                                    <UserAvatar :size="32" :user="article.user" />
                                </router-link>
                            </div>
                            <div class="user-profile">
                                <router-link class="el-link el-link--default" :to="'/user/' + article.user_id">
                                    <strong>{{ article.user.username }}</strong>
                                </router-link>
                                <div>
                                    <small class="help-block">
                                        发布于 {{ formatRelativeTime(article.created_at) }}
                                    </small>
                                </div>
                            </div>
                            <div class="article-info">
                                <span>
                                    <el-icon>
                                        <View />
                                    </el-icon>
                                    {{ article.view_count || 0 }}
                                </span>
                                <span>
                                    <el-icon>
                                        <Star />
                                    </el-icon>
                                    {{ article.favorite_count || 0 }}
                                </span>
                                <span>
                                    <el-icon>
                                        <ChatDotSquare />
                                    </el-icon>
                                    {{ article.comment_count || 0 }}
                                </span>
                            </div>
                        </div>
                    </div> -->
                    <article class="mgt-20px markdown-body">
                        <el-alert v-if="article.status === 2 && article.reject_reason" title="审核拒绝原因" type="error">
                            {{ article.reject_reason }}
                        </el-alert>
                        <!-- eslint-disable-next-line vue/no-v-html -->
                        <!-- <div ref="viewer" v-viewer data-slate-editor v-html="article.content"></div> -->
                        <div ref="viewer" data-slate-editor v-html="article.content"></div>
                        <div v-if="!article.id" style="min-height: 100vh"></div>
                    </article>
                    <el-row v-if="article.id > 0" class="btn-actions">
                        <el-col :span="12">
                            <share-box :title="article.title" />
                        </el-col>
                        <el-col :span="12" class="text-right">
                            <el-button v-if="favorite.id > 0" type="primary" :icon="Star"
                                @click="deleteFavorite">取消收藏</el-button>
                            <el-button v-else type="primary" :size="isMobile ? 'medium' : 'large'" :icon="StarFilled"
                                @click="createFavorite">收藏文章</el-button>
                        </el-col>
                    </el-row>
                </el-card>
                <el-card shadow="never" class="mgt-20px">
                    <CommentForm :document-id="article.id" :type="1" class="mgt-20px" @success="commentSuccess" />
                    <comment-list v-if="article.id > 0" ref="commentList" :document-id="article.id" :type="1" />
                </el-card>
            </el-col>
            <el-col :span="6" :xs="24" class="article-right">
                <el-card shadow="never" class="hidden-xs-only">
                    <template #header>分享用户</template>
                    <user-card :hide-actions="true" :type="'1'" :user="article.user" />
                </el-card>
                <el-card v-if="relatedArticles.length > 0" ref="relArt" shadow="never" class="mgt-20px article-list">
                    <template #header>相关文章</template>
                    <article-simple-list :articles="relatedArticles"></article-simple-list>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import UserCard from '@/components/UserCard.vue'
import ShareBox from '@/components/ShareBox.vue'
import CommentForm from '@/components/CommentForm.vue'
import CommentList from '@/components/CommentList.vue'
import ArticleSimpleList from '@/components/ArticleSimpleList.vue'
import { onMounted, reactive, ref } from 'vue'
import { DocumentChecked, Edit, Delete, Mug, StarFilled, Star } from '@element-plus/icons-vue'
import { formatRelativeTime } from '@/utils/utils'
import { articleValue, relatedArticleList } from '../../../mock/data'

import useUserStore from '@/store/module/user'
const userStore = useUserStore()
import useCategoryStore from '@/store/module/category'
const categoryStore = useCategoryStore()

import hooks from '@/hooks'
const { isMobile } = hooks()

import { useRoute } from 'vue-router'
const $route = useRoute()
const articleId = parseInt($route.query.articleId)

let article = reactive({})
article = articleValue

const breadcrumbs = ref([])
const accessDelete = ref(true)
const deleteArticle = () => {

}
const accessRecommend = ref(true)
const accessUpdate = ref(true)
const accessForbiden = ref(true)
const checkArticle = () => {

}

const recommendArticle = () => { }

const commentSuccess = () => {

}

const relatedArticles = ref([])
// relatedArticles.value = relatedArticleList

const setBreadcrumbs = () => {
    const tmpBreadcrumbs = (article.category_id || []).map((id) => {
        const breadcrumb = categoryStore.categoryMap[id]
        if (!breadcrumb.parent_id) {
          breadcrumbs.value.push(breadcrumb)
        }
        return breadcrumb
      })

      const length = tmpBreadcrumbs.length
      for (let j = 0; j < length; j++) {
        for (let i = 0; i < tmpBreadcrumbs.length; i++) {
          const breadcrumb = tmpBreadcrumbs[i]
          if (breadcrumb.parent_id === breadcrumbs.value[breadcrumbs.value.length - 1].id) {
            breadcrumbs.value.push(breadcrumb)
            tmpBreadcrumbs.splice(i, 1)
            break
          }
        }
      }
} 

const getArticle = () => {
    // TODO 
    console.log(articleId, "articleIdddddddd", article)
    setTimeout(() => {
        console.log("gggggggggggggg")
        // article = articleValue
        relatedArticles.value = relatedArticleList
        setBreadcrumbs()
        console.log(article, "aaaaaaaaaaaa")
    }, 2000);

}

const favorite = reactive({})
const createFavorite = () => {

}

onMounted(() => {
    getArticle()
})
</script>

<style lang="scss">
.page-article {
    .el-breadcrumb {
        margin-top: 15px;

        .el-breadcrumb__inner a,
        .el-breadcrumb__inner.is-link {
            color: #666;
        }

        .el-breadcrumb__item:last-child .el-breadcrumb__inner {
            color: #777;
        }

        .el-breadcrumb__inner a:hover,
        .el-breadcrumb__inner.is-link:hover {
            color: #409eff;
        }
    }

    .el-card__header {
        h1 {
            font-size: 24px;
            font-weight: 400;
            margin: 0;
            color: #111;

            .icon-recommend {
                height: 30px;
                vertical-align: middle;
            }

            .actions {
                // TODO 管理员按钮权限样式调整
            }
        }
    }

    [data-w-e-type='todo'] {
        input {
            margin-right: 5px;
        }
    }

    .article-info {
        font-size: 13px;

        span {
            margin-right: 10px;

            &.float-right {
                margin-right: 0;
            }
        }
    }

    .article-list {
        .el-card__body {
            padding-top: 10px;
        }

        a {
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            height: 40px;
            line-height: 40px;
            border-bottom: 1px dashed #efefef;
        }
    }

    article {
        line-height: 180%;
        min-height: 300px;
        word-wrap: break-word;

        img {
            max-width: 100% !important;
            cursor: zoom-in;
            height: auto !important;

            &:hover {
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                border-radius: 4px !important;
                overflow: hidden;
            }
        }

        .w-e-text-container [data-slate-editor] blockquote {
            border-left-width: 4px !important;
        }

        blockquote {
            padding: 10px;
            color: #777;
            font-size: 0.95em;
            background-color: #f6f8fa;
        }
    }

    .m-userinfo {
        display: flex;
        align-items: center;
        color: #999;

        .user-profile {
            margin-left: 10px;
            position: relative;
            top: -4px;
        }

        small {
            font-size: 12px;
        }

        .article-info {
            margin-top: 15px;
            color: #999;
            font-size: 12px;
            flex: 1;
            text-align: right;

            span {
                margin-right: 0;
                margin-left: 10px;
            }
        }
    }

    @media screen and (max-width: 768px) {
        .article-list {
            position: relative !important;
            width: 100% !important;
            top: 0 !important;
        }
    }
}
</style>