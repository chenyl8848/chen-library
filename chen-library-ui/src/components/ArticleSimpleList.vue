<template>
    <div class="article-simple-list">
        <ul>
            <li v-for="item in articles" :key="`article-${item.id}`">
                <el-tooltip placement="left" :title="item.title" trigger="hover" effect="dark" :content="item.title">
                    <router-link :to="`/article?articleId=${item.identifier}`" target="_blank" class="el-link el-link--default">
                        {{ item.title }}
                    </router-link>
                </el-tooltip>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
    articles: {
        type: Array,
        default: () => []
    }
})

</script>

<style lang="scss">
.article-simple-list {

    ul,
    li {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    li {
        a {
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 40px;
            height: 40px;
            border-bottom: 1px dashed #efefef;

            img {
                height: 18px;
                position: relative;
                top: 3px;
                margin-right: 5px;
            }
        }

        &:last-of-type {
            a {
                border-bottom: none;
            }
        }
    }
}
</style>