<template>
    <div class="user-document">
        <!-- 文档搜索表单 -->
        <el-form :inline="true" :model="query" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="query.searchText" placeholder="请输入关键字" clearable
                    @keydown.enter="onSearch"></el-input>
            </el-form-item>
            <el-form-item>
                <el-date-picker v-model="query.createdAt" type="datetimerange" :shortcuts="datetimePickerShortcuts"
                    range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right"
                    value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :icon="Search" :loading="loading" @click="onSearch">
                    搜索
                </el-button>
            </el-form-item>
        </el-form>

        <el-table v-loading="loading" :data="docs" style="width: 100%">
            <el-table-column prop="title" label="名称" min-width="250">
                <template #default="scope">
                    <el-tooltip :content="scope.row.title" placement="right">
                        <router-link target="_blank" :to="{
                            path: 'document',
                            query: { id: scope.row.uuid || scope.row.id },
                        }" class="el-link el-link--default doc-title">
                            <img :src="`/static/images/${scope.row.icon}_24.png`" alt="" />
                            {{ scope.row.title }}
                        </router-link>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column v-if="(settingStore.language || []).length > 0" prop="language" label="语言" width="120">
                <template #default="scope">
                    <el-tag v-if="filterLanguage(scope.row.language).language" size="small" effect="plain">
                        {{ filterLanguage(scope.row.language).language }}
                    </el-tag>
                    <span v-else>{{ scope.row.language }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="score" label="评分" width="120">
                <template #default="scope">
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
            <el-table-column label="操作" width="90" fixed="right">
                <template #default="scope">
                    <el-tooltip content="编辑文档" placement="top">
                        <el-button link type="primary" :icon="Edit" :loading="updating"
                            @click="updateDocument(scope.row)"></el-button>
                    </el-tooltip>
                    <el-tooltip content="删除文档" placement="top">
                        <el-button link type="primary" :icon="Delete" @click="deleteDocument(scope.row)"></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-if="total > 0" :current-page="query.currentPage" :page-size="query.pageSize" :layout="isMobile
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
import { onMounted, reactive, ref } from 'vue'
import { uploadDocumentList, documentValue } from '../../../mock/data'
import { datetimePickerShortcuts, documentStatusEnums } from '@/utils/enum'
import { Search, Edit, Delete } from '@element-plus/icons-vue'
import DocumentUpdateForm from '@/components/DocumentUpdateForm.vue'
import hooks from '@/hooks'
const { isMobile } = hooks()
import useCategoryStore from '@/store/module/category'
const categoryStore = useCategoryStore()
import useSettingStore from '@/store/module/setting'
const settingStore = useSettingStore()
import { formatDateTime, formatRelativeTime, formatBytes } from '@/utils/utils'

const loading = ref(false)
const docs = ref([])
const total = ref(0)
const query = reactive({
    searchText: '',
    createdAt: '',
    currentPage: 1,
    pageSize: 10
})

const onSearch = () => {
    getDocs()
}

const showPrivateData = ref(true)

const getDocs = () => {
    console.log(query)
    loading.value = true
    setTimeout(() => {
        loading.value = false
        docs.value = uploadDocumentList
        total.value = 49
    }, 2000);
}

const pageChange = (page) => {
    query.currentPage = page
    getDocs()
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
    documentStatusEnums.forEach(item => {
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

const getDocument = (documentId) => {
    console.log(documentId, "dddddddddd")
    return documentValue
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
    updateDocumentVisible.value = false
    onSearch()
}

onMounted(() => {
    getDocs()
})

</script>

<style lang="scss">
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
