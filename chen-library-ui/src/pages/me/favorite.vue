<template>
    <div>
        <el-tabs v-model="activeName">
            <el-tab-pane label="文档收藏" name="document">
                <favorite-document :user-id="userStore.user.id" />
            </el-tab-pane>
            <el-tab-pane label="文章收藏" name="article">
                <favorite-article :user-id="userStore.user.id" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import FavoriteDocument from '@/components/FavoriteDocument.vue'
import FavoriteArticle from '@/components/FavoriteArticle.vue'

import useUserStore from '@/store/module/user'
const userStore = useUserStore()

const activeName = ref('document')
</script>

<style lang="scss" scoped></style>