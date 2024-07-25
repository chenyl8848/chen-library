<template>
    <div class="user-avatar">
        <el-avatar :size="size" :shape="shape" :src="user.avatar" :alt="user.username" @error="errorHandler">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
        </el-avatar>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
    size: {
        type: Number,
        default: 80
    },
    shape: {
        type: String,
        default: 'circle'
    },
    user: {
        type: Object,
        default: () => { }
    }
})

const errorHandler = () => true
</script>

<style lang="scss">
.user-avatar {
    display: inline-block;
    position: relative;

    .el-avatar {
        border: 2px solid #ddd;
        padding: 3px;
        box-sizing: border-box;
        background-color: #fff;

        &:hover {
            border: 2px solid #409eff;
        }

        img {
            // height: 100%;
            // width: 100%;
            // border-radius: 50%;
            margin: 0 auto;
        }
    }
}
</style>