<template>
    <el-row :class="`comment-item comment-item-${size}`">
        <el-col :span="isMobile ? 3 : 2">
            <router-link :to="`/user?user_id=${userStore.user.id}`">
                <user-avatar v-if="isMobile" :size="size == 'small' ? 32 : 36" :user="comment.user"></user-avatar>
                <user-avatar v-else :size="size == 'small' ? 40 : 48" :user="comment.user"></user-avatar>
            </router-link>
        </el-col>
        <el-col :span="isMobile ? 21 : 22">
            <div class="username">
                <router-link class="el-link el-link--default" :to="`/user?user_id=${comment.user_id}`">{{
                    comment.user.username }}</router-link>
            </div>
            <div class="comment-content" :class="'comment-status-' + (comment.status || 0)">
                <!-- eslint-disable-next-line vue/no-v-html -->
                <span v-html="comment.reply_user" />
                {{ comment.content }}
            </div>
            <div class="comment-action">
                <el-row class="help-block">
                    <el-col :span="12">
                        <el-tooltip :content="formatDateTime(comment.created_at)" placement="right">
                            <small class="text-muted">
                                <i class="el-icon-time"></i>
                                {{ formatRelativeTime(comment.created_at) }}
                            </small>
                        </el-tooltip>
                    </el-col>
                    <el-col :span="12" class="text-right">
                        <el-button type="text" size="small" :icon="ChatDotSquare" @click="reply">回复</el-button>
                    </el-col>
                </el-row>
            </div>
            <comment-form v-if="replyComment" :document-id="comment.document_id" :parent-id="comment.id"
                :placeholder="`回复 ${comment.user.username}`" :type="comment.type" @success="commentSuccess" />
            <slot></slot>
        </el-col>
    </el-row>
</template>

<script setup>

import UserAvatar from '@/components/UserAvatar.vue'
import CommentForm from '@/components/CommentForm.vue'
import { defineProps, ref } from 'vue'
import hooks from '@/hooks'
const { isMobile } = hooks()
import useUserStore from '@/store/module/user'
const userStore = useUserStore()
import { formatDateTime } from '@/utils/utils'
import {ChatDotSquare} from '@element-plus/icons-vue'

defineProps({
    size: {
        type: String,
        // default、small
        default: 'default'
    },
    comment: {
        type: Object,
        default: () => ({
            id: 0,
            parent_id: 0,
            user_id: 0,
            username: '匿名',
            avatar: '',
            group_id: 0,
            verify_status: 0,
            content: '内容加载中...',
            created_at: '0000-00-00',
        }),
    },
})

const replyComment = ref(false)

// 回复
const reply = () => {

}

const commentSuccess = () => {}
</script>

<style lang="scss">
.comment-item {
    font-size: 14px;

    .comment-content {
        margin-top: 10px;
        margin-bottom: 10px;
        background-color: #f5f7f8;
        border-radius: 4px;
        padding: 20px;
        box-sizing: border-box;
        color: #565656;

        span {
            position: relative;
            top: -2px;
        }
    }

    .username a {
        font-weight: 400;
        font-size: 1.2em;
    }

    .comment-status-0::before {
        content: '(待审核)';
        color: red;
        margin-left: -10px;
    }
}

.comment-item-small {
    font-size: 13px;

    .el-col-2 {
        width: 7%;
    }

    .el-col-22 {
        width: 93%;
    }

    .comment-content {
        padding: 15px;
    }
}
</style>