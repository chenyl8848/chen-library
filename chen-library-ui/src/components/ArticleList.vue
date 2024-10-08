<template>
    <div class="article-list">
        <ul v-if="articles.length > 0">
            <li v-for="article in articles" :key="`article-${article.id}`">
                <h3>
                    <router-link :to="`/article?articleId=${article.identifier}`" class="el-link el-link--default"
                        target="_blank">
                        {{ article.title }}
                        <img v-if="article.recommend_at" src="/static/images/recommend.png" alt="推荐"
                            class="min-recommend" />
                    </router-link>
                </h3>
                <div class="info">
                    <span v-if="article.user_id" class="author">
                        <router-link :to="`/user?userId=${article.user_id}`"
                            class="el-link el-link--default font-normal author" target="_blank">
                            <el-avatar :size="16" class="avatar" :src="article.user.avatar">
                            </el-avatar>
                            {{ article.user.username }}
                        </router-link>
                    </span>
                    <span class="text-muted">·</span>
                    <span><i class="el-icon-time"></i>{{ formatRelativeTime(article.created_at) }}</span>
                </div>
                <div class="desc">
                    {{ article.description }}
                </div>
                <div class="info">
                    <span>
                        <el-icon>
                            <View />
                        </el-icon>
                        {{ article.view_count || 0 }} 阅读</span>
                    <span>
                        <!-- 收藏 -->
                        <el-icon>
                            <Star />
                        </el-icon>
                        {{ article.favorite_count || 0 }} 收藏
                    </span>
                    <span>
                        <el-icon>
                            <ChatDotSquare />
                        </el-icon>
                        {{ article.comment_count || 0 }} 评论
                    </span>
                </div>
            </li>
        </ul>
        <div v-else>
            <el-empty></el-empty>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { formatRelativeTime } from '@/utils/utils'

defineProps({
    articles: {
        type: Array,
        default: () => []
    }
})
</script>

<style lang="scss">
.article-list {
    padding: 15px 0;

    mark {
        background-color: transparent;
        color: red;
    }
}
</style>

<style lang="scss" scoped>
.article-list {

    ul,
    li {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    h3 {
        margin: 0;

        a {
            color: #000;
            font-size: 18px;
            font-weight: 400;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
            line-height: 30px;
            margin-bottom: 10px;
            display: inline-block;
        }

        .min-recommend {
            height: 24px;
            vertical-align: text-bottom;
        }
    }

    .desc {
        color: #666;
        font-size: 13px;
        margin: 10px 0;
        line-height: 1.8;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .info {
        color: #999;
        font-size: 12px;

        span {
            margin-right: 10px;

            i {
                margin-right: 5px;
            }
        }
    }

    li {
        border-bottom: 1px solid #f6f6f6;
        padding-bottom: 15px;
        margin-bottom: 10px;

        &:last-of-type {
            border-bottom: 0;
            padding-bottom: 0;
            margin-bottom: 0;
        }
    }

    .no-articles {
        text-align: center;
        font-size: 15px;
        color: #ccc;
        padding: 40px 0;
    }

    .author {
        position: relative;
        top: -1px;

        :deep(.el-link--default) {
            color: #787878;
            font-weight: normal;
        }

        .avatar {
            vertical-align: middle;
            margin-top: 2px;
            margin-right: 6px;
        }
    }
}
</style>