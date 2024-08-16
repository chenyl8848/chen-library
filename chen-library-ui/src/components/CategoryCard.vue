<template>
    <div class="category-card">
        <div v-for="item in categoryTree" :key="`category-${item.id}`" class="row"
            :class="level === 1 ? 'row-line' : ''">
            <div class="lv1">
                <router-link :to="`${item.type === 1 ?  '/category/article?categoryId=' + item.id : '/category/document?categoryId=' + item.id}`"
                    class="el-link el-link--default">
                    <el-avatar :size="20" :src="item.icon"></el-avatar>
                    <span>{{ item.title }}</span>
                </router-link>
            </div>
            <div class="lv2">
                <router-link v-for="sub in (item.children || []).filter((x) => x.enable)"
                    :key="`category-sub-${sub.id}`"
                    :to="`${sub.type === 1 ? '/category/article?categoryId=' + sub.id : '/category/document?categoryId=' + sub.id}`"
                    class="el-link el-link--default">
                    {{ sub.title }}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { category } from '../../mock/data'
import { categoryToTree } from '@/utils/utils'
import useSettingStore from '@/store/module/setting'

const settingStore = useSettingStore()
const $props = defineProps({
    type: {
        type: Number,
        // 0 - 文档 1 - 文章
        default: 0
    }
})

// 分类树
const categoryTree = computed(() => {
    return getCategoryTree($props.type)
})

// 分类层级
const level = computed(() => {
    let level = 1

    const categoryTree = getCategoryTree($props.type)
    categoryTree.forEach((item) => {
        if (item.children && item.children.length > 0) {
            level = 2
        }
    })

    return level
})

// 生成分类树
const getCategoryTree = (type) => {
    const cates = category.filter((item) => {
        if (!type && !item.type && settingStore.display && settingStore.display.hide_category_without_document) {
            return item.doc_count > 0 && item.enable
        }
        return (item.type === type || (!item.type && !type)) && item.enable
    })

    return categoryToTree(cates)
}
</script>

<style lang="scss" scoped>
.category-card {
    max-height: calc(100vh - 80px);
    overflow: auto;

    .row {
        display: flex;
        justify-content: space-between;
        padding: 15px 0;
        border-bottom: 1px dashed #f1f2f3;

        &.row-line {
            display: inline-block;
            border-bottom: 0;
            padding: 10px 5px;

            .lv1 {
                border-right: 0;
                margin-right: 5px;
            }
        }

        &:last-of-type {
            border-bottom: 0;
            padding-bottom: 5px;
        }

        &:first-of-type {
            padding-top: 5px;
        }

        :deep(.el-link--default) {
            padding: 3px 0;
        }

        .lv1 {
            border-right: 1px solid #eee;
            width: 100px;

            :deep(.el-link--default) {
                display: block;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;

                .el-avatar {
                    vertical-align: middle;
                    position: relative;
                    top: -2px;
                }
            }
        }

        .lv2 {
            flex: 1;
            display: flex;
            flex-wrap: wrap;
            // 只显示3行
            max-height: 72px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;

            :deep(.el-link--default) {
                font-weight: normal;
                margin-left: 15px;
                font-size: 14px;
            }
        }
    }
}
</style>