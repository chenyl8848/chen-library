<template>
    <div class="document-list">
        <ul>
            <li v-for="document in documents" :key="`document-${document.id}`">
                <el-row :gutter="20">
                    <el-col :span="!settingStore.display.hide_keywords_on_lists || isMobile ? 4 : 3" class="doc-cover">
                        <router-link :to="`/document?document_id=${document.uuid || document.id}`" target="_blank">
                            <document-cover :document="document" />
                        </router-link>
                    </el-col>
                    <el-col :span="!settingStore.display.hide_keywords_on_lists || isMobile ? 20 : 21
                        ">
                        <h3>
                            <router-link target="_blank" :to="`/document?document_id=${document.uuid || document.id}`"
                                class="el-link el-link--primary">
                                <img :src="`@/assets/images/${getIcon(document.ext)}_24.png`"
                                    :alt="`${getIcon(document.ext)} 文档`" />
                                {{ document.title }}
                                <img v-if="document.recommend_at" src="@/assets/images/recommend.png" alt="推荐" />
                            </router-link>
                        </h3>
                        <div class="doc-info">
                            <el-rate v-model="document.score" disabled show-score text-color="#ff9900"
                                score-template="{value}">
                            </el-rate>
                            <span class="float-right">
                                {{ document.price || 0 }}
                                {{ settingStore.system.credit_name || '魔豆' }}
                                <span class="line">|</span>
                                {{ document.pages || '-' }} 页
                                <span class="line">|</span>
                                {{ formatBytes(document.size) || '-' }}
                                <span class="hidden-xs-only">
                                    <span class="line">|</span>
                                    {{ formatDateTime(document.created_at) }}
                                </span>
                            </span>
                        </div>
                        <div class="doc-desc">
                            {{ document.description }}
                        </div>
                    </el-col>
                </el-row>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'
import useSettingStore from '@/store/module/setting'
import hooks from '@/hooks'
import DocumentCover from './DocumentCover.vue'
import { getIcon, formatBytes, formatDateTime } from '@/utils/utils'

const settingStore = useSettingStore()
const { isMobile } = hooks()

defineProps({
    documents: {
        type: Array,
        default: () => []
    }
})
</script>

<style lang="scss" scoped>
.document-list {

    ul,
    li {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    li {
        margin-bottom: 20px;
        padding-bottom: 18px;
        border-bottom: 1px dashed #ddd;
    }

    h3 {
        margin: 0;

        a {
            font-size: 18px;
            font-weight: 400;
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100%;

            img {
                height: 18px;
                position: relative;
                top: 3px;
            }
        }
    }

    .doc-cover {
        .el-image {
            width: 100%;
            min-height: 120px;
            border: 2px solid #efefef;
            border-radius: 5px;

            &:hover img {
                transform: scale(1.2);
            }
        }
    }

    .doc-info {
        margin: 10px 0;
        font-size: 13px;
        color: #888;

        .line {
            color: #ddd;
            margin: 0 5px;
        }
    }

    .doc-desc {
        font-size: 14px;
        color: #999;
        line-height: 180%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        max-height: 78px;
        -webkit-box-orient: vertical;
    }
}
</style>

<style lang="scss">
.document-list {
    .el-image {
        img {
            transition: transform 0.3s ease 0s;

            &:hover {
                transform: scale(1.2);
            }
        }
    }
}
</style>