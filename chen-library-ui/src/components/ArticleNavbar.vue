<template>
    <div class="article-navbar">
        <ul>
            <li>
                <router-link to="/category/article" class="el-link el-link--default" :class="!activeId ? 'active' : ''">
                    <!-- TODO 图片加載不出來 -->
                    <el-image :src="`/assets/images/all.png`" class="icon">
                        <template #error>
                            <div class="image-slot">
                                <el-icon>
                                    <Picture />
                                </el-icon>
                            </div>
                        </template>
                    </el-image>
                    全部文章
                </router-link>
            </li>
            <li v-for="cate in categoryStore.categories.filter(
                (item) => item.type === 1 && !item.parent_id && item.enable
            )" :key="'cate-' + cate.id">
                <router-link :to="`/category/article?categoryId=${cate.id}`" class="el-link el-link--default"
                    :class="activeId === cate.id ? 'active' : ''">
                    <el-image :src="cate.icon || '/static/favicon.ico'" class="icon">
                        <template #error>
                            <div class="image-slot">
                                <el-icon>
                                    <Picture />
                                </el-icon>
                            </div>
                        </template>
                    </el-image>
                    {{ cate.title }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script setup>
import useCategoryStore from '@/store/module/category'
import { watch, ref } from 'vue';
import { useRoute } from 'vue-router';
const categoryStore = useCategoryStore()

const $route = useRoute()
const activeId = ref(parseInt($route.query.categoryId) || 0)

watch($route, (newValue) => {
    const cateId = parseInt(newValue.query.categoryId)
    if (cateId > 0) {
        activeId.value = findParentId(cateId)
    } else {
        activeId.value = 0
    }
})

const findParentId = (cateId) => {
    const cate = categoryStore.categories.find((item) => item.id === cateId)
    if (cate && cate.parent_id) {
        return findParentId(cate.parent_id)
    }
    return cateId
}
</script>

<style lang="scss" scoped>
.article-navbar {

    ul,
    li {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    ul {
        justify-content: space-between;

        li {
            margin-bottom: 5px;

            .icon {
                width: 20px;
                height: 20px;
                margin-right: 5px;
                border-radius: 4px;
                vertical-align: middle;
                margin-top: -2px;
            }
        }
    }

    .el-link--default {
        color: #21293c;
        display: block;
        line-height: 40px;
        font-weight: normal;
        padding: 0 10px;
        border-radius: 3px;

        &:hover {
            background-color: #21293c14;
        }

        &.active {
            background-color: #fff;
            color: #409eff;
        }
    }
}
</style>