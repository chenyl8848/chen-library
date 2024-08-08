<template>
    <div class="document-card">
        <router-link :to="`/document?document_id=${document.id}`" class="el-link el-link--default">
            <h3>
                <img v-if="document.id > 0" :src="`/static/images/${getIcon(document.ext)}_24.png`" />
                {{ document.title }}
            </h3>
        </router-link>
        <el-row :gutter="10">
            <el-col :span="7" class="doc-cover">
                <router-link :to="`/document?document_id=${document.id}`">
                    <document-cover :document="document" :lazy="false" />
                </router-link>
            </el-col>
            <el-col :span="17">
                <el-descriptions :column="1" border>
                    <el-descriptions-item>
                        <template #label>
                            <el-icon>
                                <User />
                            </el-icon>
                            上传
                        </template>
                        <router-link :to="`/user?user_id=${document.user_id}`" class="el-link el-link--primary">{{
                            (document.user && document.user.username) || document.username
                        }}</router-link>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <el-icon>
                                <PriceTag />
                            </el-icon>
                            价格
                        </template>
                        {{ document.price || 0 }}
                        {{ settingStore.system.credit_name || '魔豆' }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <el-icon>
                                <Notification />
                            </el-icon>
                            大小
                        </template>
                        {{ formatBytes(document.size) }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <el-icon>
                                <DocumentCopy />
                            </el-icon>
                            页数
                        </template>
                        {{ document.pages || '-' }} 页
                    </el-descriptions-item>
                </el-descriptions>
            </el-col>
            <el-col :span="24" class="mgt">
                <el-descriptions :column="1" border>
                    <el-descriptions-item width="30px">
                        <template #label>
                            <el-icon>
                                <Star />
                            </el-icon>
                            评分
                        </template>
                        <div class="description">
                            <el-rate v-model="score" disabled show-score text-color="#ff9900"
                                score-template="{value}"></el-rate>
                        </div>
                    </el-descriptions-item>
                    <el-descriptions-item width="30px">
                        <template #label>
                            <el-icon>
                                <Tickets />
                            </el-icon>
                            摘要
                        </template>
                        <div class="description">{{ document.description }}</div>
                    </el-descriptions-item>
                </el-descriptions>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { getIcon, formatBytes } from '@/utils/utils'
import DocumentCover from '@/components/DocumentCover.vue'
import useSettingStore from '@/store/module/setting'

const settingStore = useSettingStore()

const $props = defineProps({
    document: {
        type: Object,
        default: () => { }
    }
})

const score = computed(() => {
    return $props.document.score / 100 || 3
})

</script>

<style lang="scss" scoped>
.document-card {
    h3 {
        margin-top: 0;

        img {
            height: 20px;
            vertical-align: middle;
            margin-top: -4px;
        }
    }

    .el-descriptions-item__label.is-bordered-label {
        width: 100px;
    }

    .doc-cover img {
        max-width: 130px;
    }

    .mgt {
        margin-top: 5px;
    }

    .description {
        // 只显示3行
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
    }
}
</style>