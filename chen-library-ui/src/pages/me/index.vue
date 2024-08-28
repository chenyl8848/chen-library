<template>
    <div class="page page-me">
        <el-row :gutter="20">
            <el-col :span="6" class="part-left">
                <el-card shadow="never">
                    <user-card :user="userStore.user" :hiddenLatestUpload="true"></user-card>
                    <el-row v-if="!isMobile" :gutter="10">
                        <el-col :span="12">
                            <router-link to="/upload">
                                <el-button type="primary" icon="Upload" class="btn-block mgt-20px">上传文档</el-button>
                            </router-link>
                        </el-col>
                        <el-col :span="12">
                            <router-link to="/publish">
                                <el-button type="primary" icon="Plus" class="btn-block mgt-20px">发布文章</el-button>
                            </router-link>
                        </el-col>
                    </el-row>
                    <el-tabs v-if="isMobile" v-model="defaultActive.value" class="mgt-20px" type="card"
                        @tab-click="tabClick">
                        <el-tab-pane v-for="item in tabs" :key="item.value" :name="item.value" :label="item.label">
                            <template #label>
                                <span>
                                    <i :class="item.icon"></i>
                                    {{ item.label }}
                                </span>
                            </template>
                        </el-tab-pane>
                    </el-tabs>
                    <el-menu v-else class="mgt-20px" :default-active="defaultActive.value" :router="true">
                        <el-menu-item v-for="item in tabs" :key="item.value" :index="item.value">
                            <!-- <component :is="item.icon"></component> -->
                            <el-icon>
                                <component :is="item.icon"></component>
                            </el-icon>
                            <template #title>
                                <span>{{ item.label }}</span>
                            </template>
                        </el-menu-item>
                    </el-menu>
                </el-card>
            </el-col>
            <el-col :span="18" class="part-right">
                <el-card shadow="never">
                    <template #header>
                        <!-- TODO 标题没有切换 -->
                        <div>{{ defaultActive.label }}</div>
                    </template>
                    <div class="nuxt-child">
                        <!-- <nuxt-child :user="user" /> -->
                        <RouterView></RouterView>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { ref, watch, reactive } from 'vue'
import UserCard from '@/components/UserCard.vue'
import useUserStore from '@/store/module/user'
const userStore = useUserStore()

import hooks from '@/hooks'
import { RouterView, useRoute } from 'vue-router';
const { isMobile } = hooks()

const $route = useRoute()

const tabs = ref([
    {
        label: '我的动态',
        value: '/me/dynamic',
        icon: 'MagicStick',
    },
    {
        label: '我的上传',
        value: '/me/document',
        // icon: 'el-icon-document',
        icon: 'Document',
    },
    {
        label: '我的文章',
        value: '/me/article',
        icon: 'Tickets',
    },
    {
        label: '我的收藏',
        value: '/me/favorite',
        icon: 'Star',
    },
    {
        label: '我的下载',
        value: '/me/download',
        icon: 'Download',
    },
    {
        label: '安全设置',
        value: '/me/profile',
        icon: 'Tools',
    },
])

let defaultActive = reactive(tabs.value.filter((item) => $route.path === item.value)[0])
watch($route, (newValue) => {
    console.log(newValue, "newwwwwwwwww", tabs.value.filter((item) => newValue.path === item.value))
    defaultActive = reactive(tabs.value.filter((item) => newValue.path === item.value)[0])
    console.log(defaultActive, "fdeeeeeeeeeeeee")
})
</script>

<style lang="scss">
.page-me {
    .el-menu {
        border-right: 0;
    }

    .fa-shield {
        margin-right: 5px;
        width: 24px;
        text-align: center;
        font-size: 18px;
        vertical-align: middle;
    }

    .nuxt-child {
        min-height: calc(100vh - 190px);
    }
}

// @media screen and (max-width: $mobile-width) {
//     .page-me {
//         .part-left {
//             width: 100%;
//         }

//         .part-right {
//             margin-top: -20px;
//             width: 100%;
//         }
//     }
// }</style>