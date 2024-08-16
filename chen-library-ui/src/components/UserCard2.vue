<template>
    <div class="user-card2">
        <el-row :gutter="20">
            <el-col :span="16" :xs="24">
                <div class="user">
                    <div class="user-card-avatar">
                        <router-link :to="`/user?user_id=${user.id}`">
                            <user-avatar :user="user" :size="64"></user-avatar>
                        </router-link>
                    </div>
                    <div class="user-card-profile">
                        <h2 class="user-card-username">{{ user.username }}</h2>
                        <div class="help-block signature">
                            {{ user.signature || '暂无个性签名' }}
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="8" :xs="24">
                <div class="user-card-stat">
                    <el-row class="help-block">
                        <el-col :span="8">
                            <div>文档</div>
                            <div class="el-link el-link--primary">
                                {{ user.documentCount || 0 }}
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div>文章</div>
                            <div class="el-link el-link--primary">
                                {{ user.articleCount || 0 }}
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div>{{ settingStore.system.credit_name || '魔豆' }}</div>
                            <div class="el-link el-link--primary">
                                {{ user.creditCount || 0 }}
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import UserAvatar from '@/components/UserAvatar.vue'
import { defineProps } from 'vue'
import useSettingStore from '@/store/module/setting'
const settingStore = useSettingStore()

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
    }
})
</script>

<style lang="scss" scoped>
.user-card2 {
    .user {
        display: flex;

        .user-card-avatar {
            width: 70px;
        }

        .user-profile {
            flex: 1;
            margin-left: 10px;
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
        margin: 0 0 10px;
        font-size: 25px;
    }

    .user-card-stat {
        text-align: center;

        .help-block {
            font-size: 14px;

            .el-link {
                font-size: 18px;
                margin-top: 8px;
            }

            .el-col {
                border-right: 1px solid #eee;

                &:first-child {
                    border-left: 1px solid #eee;
                }
            }
        }
    }

    .signature {
        margin-top: 10px;
        font-size: 13px;
    }
}
</style>