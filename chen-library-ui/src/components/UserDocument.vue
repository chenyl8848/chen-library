<template>
    <div class="user-document">
        <el-form :inline="true" :model="query">
            <el-form-item>
                <el-input v-model="query.keyword" placeholder="请输入关键字" clearable @keydown.enter="onSearch"></el-input>
            </el-form-item>
            <el-form-item>
                <el-date-picker v-model="query.createdAt" type="datetimerange" :shortcuts="datetimePickerShortcuts"
                    range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                    value-format="YYYY-MM-DD HH:mm:ss">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="Search" :loading="loading" @click="onSearch">
                    搜索
                </el-button>
            </el-form-item>
        </el-form>

        <el-table v-loading="loading" :data="documents" style="width: 100%">
            <el-table-column prop="title" label="名称" min-width="250">
                <template #default="scope">
                    <el-tooltip :content="scope.row.title" placement="right">
                        <router-link target="_blank" :to="`/document?document_id=${scope.row.uuid || scope.row.id}`"
                            class="el-link el-link--default doc-title">
                            <img :src="`/static/images/${scope.row.icon}_24.png`" alt="" />
                            {{ scope.row.title }}
                        </router-link>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column v-if="(settingStore.language || []).length > 0" prop="language" label="语言" width="90">
                <template #default="scope">
                    <el-tag v-if="filterLanguage(scope.row.language).language" size="small" effect="plain">
                        {{ filterLanguage(scope.row.language).language }}
                    </el-tag>
                    <span v-else>{{ scope.row.language }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="score" label="评分" width="120">
                <template #default="scope">
                    <!-- TODO -->
                    <el-rate :value="scope.row.score || 0.0" disabled score-template="{value}"></el-rate>
                </template>
            </el-table-column>
            <el-table-column v-if="settingStore.display.show_document_view_count || showPrivateData" prop="view_count"
                label="浏览" width="70">
                <template #default="scope">{{ scope.row.view_count || 0 }}</template>
            </el-table-column>
            <el-table-column v-if="settingStore.display.show_document_download_count || showPrivateData"
                prop="download_count" label="下载" width="70">
                <template #default="scope">{{
                    scope.row.download_count || 0
                }}</template>
            </el-table-column>
            <el-table-column v-if="settingStore.display.show_document_favorite_count || showPrivateData"
                prop="favorite_count" label="收藏" width="70">
                <template #default="scope">{{
                    scope.row.favorite_count || 0
                }}</template>
            </el-table-column>
            <el-table-column v-if="showPrivateData" prop="status" label="状态" width="90">
                <template #default="scope">
                    <el-tag :type="filterStatus(scope.row.status).type" size="small" effect="plain">
                        {{ filterStatus(scope.row.status).label }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="page" label="页数" width="70">
                <template #default="scope">{{ scope.row.pages || '-' }}</template>
            </el-table-column>
            <el-table-column prop="page" label="价格" width="70">
                <template #default="scope">{{ scope.row.price || '0' }}</template>
            </el-table-column>
            <el-table-column prop="size" label="大小" width="100">
                <template #default="scope">{{
                    formatBytes(scope.row.size)
                }}</template>
            </el-table-column>
            <el-table-column prop="created_at" label="上传" width="100">
                <template #default="scope">
                    <el-tooltip :content="formatDateTime(scope.row.created_at)" placement="top">
                        <span>{{ formatRelativeTime(scope.row.created_at) }}</span>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column v-if="userId === userStore.user.id" label="操作" width="90" fixed="right">
                <template #default="scope">
                    <el-tooltip content="编辑文档" placement="top">
                        <el-button icon="Edit" link type="primary" :loading="updating"
                            @click="updateDocument(scope.row)"></el-button>
                    </el-tooltip>
                    <el-tooltip content="删除文档" placement="top">
                        <el-button icon="Delete" @click="deleteDocument(scope.row)" link type="primary"></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-if="total > 0" :current-page="query.page" :page-size="query.size" :layout="isMobile
            ? 'total, prev, pager, next'
            : 'total, prev, pager, next, jumper'
            " :pager-count="isMobile ? 5 : 7" :small="isMobile" :total="total" class="mgt-20px"
            @current-change="pageChange">
        </el-pagination>
        <el-dialog title="编辑文档" v-model="updateDocumentVisible" :width="isMobile ? '95%' : '640px'">
            <document-update-form :category-trees="categoryStore.categoryTree" :init-document="initDocument"
                :is-admin="false" @success="updateDocumentSuccess" />
        </el-dialog>
    </div>
</template>

<script setup>
import { defineProps, reactive, ref, computed, onMounted } from 'vue'
import { datetimePickerShortcuts, documentStatusEnum } from '@/utils/enum'
import { formatBytes, formatDateTime, formatRelativeTime } from '@/utils/utils'
import hooks from '@/hooks'
import useSettingStore from '@/store/module/setting'
import useUserStore from '@/store/module/user'
import useCategoryStore from '@/store/module/category'
import { relatedDocumentList, documentValue } from '../../mock/data'
import DocumentUpdateForm from '@/components/DocumentUpdateForm.vue'

const { isMobile } = hooks()
const settingStore = useSettingStore()
const userStore = useUserStore()
const categoryStore = useCategoryStore()

const $props = defineProps({
    userId: {
        type: Number,
        default: 0
    }
})

const showPrivateData = computed(() => {
    // 如果是用户自身或者是网站管理员则显示私有数据
    return $props.userId === userStore.user.id || userStore.permissions.length > 0
})

const query = reactive({
    keyword: '',
    createdAt: '',
    page: 1,
    size: 10
})

const loading = ref(false)
const documents = ref([])
const total = ref(0)

const onSearch = () => {
    console.log(query, "queryyyyyyyyyyyy")
    loading.value = true
    setTimeout(() => {
        loading.value = false
        documents.value = relatedDocumentList
        total.value = 76
    }, 2000);
}

const pageChange = (page) => {
    query.page = page
    onSearch()
}

const getDocument = (documentId) => {
    console.log(documentId, "dddddddddd")
    return documentValue
}

const filterLanguage = (lang) => {
    const languageMap = {}
        ; (settingStore.language || []).forEach((item) => {
            languageMap[item.code] = item
        })

    return (
        languageMap[lang] || {
            value: lang || '-',
            label: lang || '-',
            type: 'info',
        }
    )
}

const filterStatus = (status) => {
    const articleStatusOptionsMap = {}
    documentStatusEnum.forEach(item => {
        articleStatusOptionsMap[item.value] = item
    })

    return (
        articleStatusOptionsMap[status] || {
            value: status,
            label: '未知',
            type: 'info',
        }
    )
}

const updating = ref(false)
/**
 * 编辑文档
 * @param document 文档
 */
const updateDocument = (document) => {
    updating.value = true
    console.log(document)
    setTimeout(() => {
        initDocument = getDocument(document.id)
        updating.value = false
        updateDocumentVisible.value = true
    }, 1000)
}
let initDocument = reactive({})

/**
 * 删除文档
 * @param document 文档
 */
const deleteDocument = (document) => {
    console.log(document)
}

const updateDocumentVisible = ref(false)
const updateDocumentSuccess = () => {
    console.log("gggggggggggggggg")
    updateDocumentVisible.value = false
    onSearch()
}

onMounted(() => {
    onSearch()
})
</script>

<style lang="scss" scoped>
.user-document {
    .doc-title {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 180%;

        img {
            height: 18px;
            position: relative;
            top: 3px;
        }
    }
}
</style>