<template>
    <div class="comment-list">
        <comment-item v-for="item in comments" :key="`comment-${item.id}`" :comment="item">
            <comment-item v-for="child in item.children" :key="`comment-child-${child.id}`" class="comment-child"
                :comment="child" :size="'small'">
            </comment-item>
        </comment-item>
    </div>
</template>

<script setup>
import CommentItem from '@/components/CommentItem.vue'
import { ref } from 'vue';

const comments = ref([])
</script>

<style lang="scss">
.comment-list {
    &>.el-row {
        margin-top: 20px;
        border-bottom: 1px solid #efefef;
        padding-bottom: 10px;
    }

    &>.el-row:first-of-type {
        margin-top: 0;
    }
}
</style>