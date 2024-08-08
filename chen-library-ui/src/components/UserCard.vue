<template>
    <div class="user-card">
        <div class="user-card-avatar">
            <router-link :to="`/user?user_id=${user.id}`">
                <user-avatar :user="user"></user-avatar>
            </router-link>
        </div>
        <div class="user-card-username">
            <strong>{{ user.nickname }}</strong>
        </div>
        <div class="user-card-stat">
            <el-row class="help-block">
                <el-col :span="8">
                    <div>文档</div>
                    <div class="el-link el-link--primary">{{ user.documentCount || 0 }}</div>
                </el-col>
                <el-col :span="8">
                    <div>文章</div>
                    <div class="el-link el-link--primary">{{ user.articleCount || 0 }}</div>
                </el-col>
                <el-col :span="8">
                    <div>魔豆</div>
                    <div class="el-link el-link--primary">{{ user.creditCount || 0 }}</div>
                </el-col>
            </el-row>
        </div>
        <div v-if="!hiddenSignature" class="user-card-signature">
            <div>
                <small>
                    个性签名
                </small>
            </div>
            <div class="help-block">
                {{ user.signature || '暂无个性签名' }}
            </div>
        </div>
        <template v-if="!hiddenLatestUpload">
            <template v-if="type === '0'">
                <div v-if="latestUploadDocuments && latestUploadDocuments.length > 0" class="mgt-20px latest">
                    <div class="heading">
                        <small>
                            <strong>最近上传</strong>
                        </small>
                        <el-icon>
                            <Clock />
                        </el-icon>
                    </div>
                    <div class="block-help">
                        <document-simple-list :documents="latestUploadDocuments"></document-simple-list>
                    </div>
                </div>
            </template>
            <template v-else-if="type === '1'">
                <div v-if="latestPublishArticles && latestPublishArticles.length > 0" class="mgt-20px latest">
                    <div class="heading">
                        <small>
                            <strong>最近发布</strong>
                        </small>
                        <el-icon>
                            <Clock />
                        </el-icon>
                    </div>
                    <div class="block-help">
                        <article-simple-list :articles="latestPublishArticles"></article-simple-list>
                    </div>
                </div>
            </template>
        </template>
    </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import UserAvatar from '@/components/UserAvatar.vue'
import DocumentSimpleList from '@/components/DocumentSimpleList.vue'
import ArticleSimpleList from '@/components/ArticleSimpleList.vue'
import { latestUploadDocmentList, latestPublishArticleList } from '../../mock/data'

defineProps({
    user: {
        type: Object,
        default: () => {
            return {
                id: 0,
                username: '',
                nickname: '',
                avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
                signature: '',
                documentCount: 0,
                articleCount: 0,
                favoriteCount: 0,
                creditCount: 0,
            }
        }
    },
    hiddenSignature: {
        type: Boolean,
        default: () => false
    },
    hiddenLatestUpload: {
        type: Boolean,
        default: () => false
    },
    type: {
        type: String,
        default: () => '0'
    }
})

const latestUploadDocuments = ref([])
latestUploadDocuments.value = latestUploadDocmentList

const latestPublishArticles = ref([])
latestPublishArticles.value = latestPublishArticleList

</script>

<style lang="scss" scoped>
.user-card {
    text-align: center;

    .latest {
        text-align: left;
        margin-bottom: -10px;

        .heading {
            margin-bottom: 10px;
        }
    }

    .el-avatar {
        border: 2px solid #ddd;
        padding: 3px;
        background-color: #fff;
        width: 80px;
        height: 80px;

        &:hover {
            border: 2px solid #409eff;
        }

        img {
            border-radius: 50%;
        }
    }

    .user-card-username {
        margin: 10px 0;
        font-size: 16px;

        small {
            font-size: 13px;
        }
    }

    .user-card-stat {
        margin: 20px 0;

        .help-block {
            font-size: 12px;

            .el-link {
                font-size: 14px;
                margin-top: 5px;
            }

            .el-col {
                border-right: 1px solid #eee;

                &:first-child {
                    border-left: 1px solid #eee;
                }
            }
        }
    }

    .user-card-signature {
        text-align: left;

        .help-block {
            margin-top: 10px;
            font-size: 13px;
            text-indent: 2em;
        }
    }
}
</style>