<template>
    <div class="page page-user">
        <el-row>
            <el-col :span="24">
                <el-card shadow="never">
                    <user-card2 :user="user"></user-card2>
                    <el-tabs class="user-tabs mgt-20px" type="border-card" v-model="activeTab">
                        <el-tab-pane name="document">
                            <template #label>
                                <span>
                                    <el-icon>
                                        <document />
                                    </el-icon>
                                    &nbsp;文档
                                </span>
                            </template>
                            <user-document :userId="userId"></user-document>
                        </el-tab-pane>
                        <el-tab-pane name="article">
                            <template #label>
                                <span>
                                    <el-icon>
                                        <tickets />
                                    </el-icon>
                                    &nbsp;文章
                                </span>
                            </template>
                            <user-article :userId="userId"></user-article>
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import UserCard2 from '@/components/UserCard2.vue'
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import UserDocument from '@/components/UserDocument.vue'
import UserArticle from '@/components/UserArticle.vue'

// 获取用户 ID
const $route = useRoute()
const userId = parseInt($route.query.user_id)

// 获取用户信息
let user = reactive()

const getUserInfo = () => {
    console.log(userId, "userIdddddddddddddd")
    if (userId) {
        user = reactive({
            "loginAt": "2024-06-03T08:16:27Z",
            "createdAt": "2023-01-04T06:45:26Z",
            "updatedAt": "2024-06-14T01:41:19Z",
            "id": 1,
            "username": "system",
            "email": "truthhun@mnt.ltd",
            "signature": "1",
            "lastLoginIp": "14.150.96.152",
            "documentCount": 55,
            "favoriteCount": 3,
            "commentCount": 2,
            "avatar": "//moredoc.mnt.ltd/uploads/9/0/0/5/f/9005f4f76a1980efe8761260c6ad3af3.png",
            "creditCount": 69,
            "articleCount": 17
        })

        console.log(user, "usssssssssssssssssssss")
    }
}

// tabs
const activeTab = ref('document')

onMounted(() => {
    getUserInfo()
})

</script>

<style lang="scss">
.page-user {
    .shared-user {
        .el-card__body {
            padding-top: 0;
        }
    }

    .user-tabs {
        &>.el-tabs__content {
            min-height: calc(100vh - 280px);
        }

        .el-tabs__header {
            margin-bottom: 20px;
        }
    }
}
</style>