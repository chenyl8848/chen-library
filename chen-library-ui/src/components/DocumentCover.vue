<template>
    <div ref="imageBox">
        <el-image ref="image" class="document-cover"
            :src="document.attachment && document.attachment.hash ? `/view/cover/${document.attachment.hash}` : document.cover || ''"
            :lazy="lazy" :alt="document.title" :class="showExt ? 'ext-icon ext-' + getIcon(document.ext) : ''">
            <template #error>
                <div class="image-slot">
                    <img src="@/assets/images/default-cover.png" />
                </div>
            </template>
        </el-image>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
    document: {
        type: Object,
        default: () => { }
    },
    lazy: {
        type: Boolean,
        default: true
    },
    width: {
        type: Number,
        default: 0
    },
    showExt: {
        type: Boolean,
        default: false
    }
})
</script>

<style lang="scss">
.document-cover {
    border: 2px solid #efefef;
    border-radius: 5px;

    img {
        width: 100% !important;
        transition: transform 0.3s ease 0s;

        &:hover {
            transform: scale(1.2);
        }
    }
}
</style>