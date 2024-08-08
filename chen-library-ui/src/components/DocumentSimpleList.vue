<template>
    <div class="document-simple-list">
        <ul>
            <li v-for="doc in documents" :key="`document-${doc.id}`">
                <el-popover v-if="showPopover" :placement="placement" width="480" trigger="hover" :open-delay="500">
                    <document-card :document="doc"></document-card>
                    <template #reference>
                        <router-link :to="`/document?document_id=${doc.id}`" :target="target"
                            class="el-link el-link--default">
                            <img :src="'/static/images/' + getIcon(doc.ext) + '_24.png'"
                                :alt="getIcon(doc.ext) + '文档'" />
                            {{ doc.title }}
                        </router-link>
                    </template>
                </el-popover>
                <router-link v-else :to="`/document?document_id=${doc.id}`" :target="target"
                    class="el-link el-link--default">
                    <img :src="'/static/images/' + getIcon(doc.ext) + '_24.png'" :alt="getIcon(doc.ext) + '文档'" />
                    {{ doc.title }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { getIcon } from '@/utils/utils'
import DocumentCard from '@/components/DocumentCard.vue'

defineProps({
    documents: {
        type: Array,
        default: () => []
    },
    showPopover: {
        type: Boolean,
        default: () => true
    },
    placement: {
        type: String,
        default: () => 'left'
    },
    target: {
        type: String,
        default: '_blank '
    }
})
</script>

<style lang="scss" scoped>
.document-simple-list {

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