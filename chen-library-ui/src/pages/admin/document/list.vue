<template>
    <div>
        <el-card shadow="never">
            <SearchForm :fields="searchFormFields" :loading="loading" :show-add="true" :show-delete="true"
                :disabled-delete="selectedRow.length === 0" :default-search="search" @onSearch="onSearch" @onAdd="onAdd"
                @onDelete="onBatchDelete">
                <template #buttons>
                    <el-tooltip effect="dark" content="将转换失败的文档一键重置为待转换状态，以便重新转换" placement="top">
                        <el-button type="warning" icon="Refresh" @click="reconvertDocument">失败重转</el-button>
                    </el-tooltip>
                    <el-dropdown :disabled="selectedRow.length === 0" @command="checkDocument" class="mgl-10px">
                        <el-button type="warning" icon="Stamp">
                            批量审批
                            <el-icon>
                                <ArrowDown />
                            </el-icon>
                        </el-button>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <!-- 文档变为待转换 -->
                                <el-dropdown-item :command="0">审核通过</el-dropdown-item>
                                <!-- 文档状态变为拒绝 -->
                                <el-dropdown-item :command="7">审核拒绝</el-dropdown-item>
                                <!-- 文档状态变为待审核 -->
                                <el-dropdown-item :command="6">变为待审</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <el-tooltip effect="dark" content="批量修改选中的文档分类" placement="top">
                        <el-button type="success" :disabled="selectedRow.length === 0" icon="Edit"
                            @click="batchUpdateDocumentsCategory" class="mgl-10px">批量分类</el-button>
                    </el-tooltip>
                    <el-tooltip effect="dark" content="批量更新文档所属语言" placement="top">
                        <el-button type="primary" :disabled="selectedRow.length === 0" icon="Edit"
                            @click="batchUpdateDocumentsLanguage">批量语言</el-button>
                    </el-tooltip>
                </template>
            </SearchForm>
        </el-card>
        <el-card shadow="never" class="mgt-20px">
            <TableList :loading="loading" :table-data="documents" :fields="tableListFields" :show-actions="true"
                :show-view="false" :show-edit="true" :show-delete="true" :show-select="true" :actions-min-width="200"
                @editRow="editRow" @viewRow="viewRow" @selectRow="selectRow" @deleteRow="deleteRow">
                <template #actions="scope">
                    <el-tooltip v-if="scope.row.convert_error && scope.row.status === 3" effect="dark" placement="top">
                        <template #content>
                            <div class="tooltip-box">
                                {{ scope.row.convert_error }}
                            </div>
                        </template>
                        <el-button type="primary" link size="small" class="text-warning" icon="Error">转换失败原因</el-button>
                    </el-tooltip>
                    <el-button type="primary" link size="small" icon="CollectionTag"
                        @click="recommendDocument(scope.row)">推荐</el-button>
                    <el-button v-if="
                        scope.row.status === 6 ||
                        scope.row.status === 7 ||
                        scope.row.status === 4
                    " type="text" icon="Download" class="text-warning"
                        @click="download2review(scope.row)">下载审核</el-button>
                </template>
            </TableList>
            <div class="mgt-20px text-right">
                <el-pagination background :current-page="search.currentPage" :page-sizes="[10, 20, 50, 100]"
                    :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"
                    @size-change="handleSizeChange" @current-change="handlePageChange">
                </el-pagination>
            </div>
        </el-card>
        <el-dialog :close-on-click-modal="false" title="编辑文档" width="640px" v-model="formVisible">
            <FormUpdateDocument :category-trees="trees" :init-document="document" :is-admin="true"
                @success="formSuccess" />
        </el-dialog>
        <el-dialog :close-on-click-modal="false" title="批量分类" width="640px" v-model="formDocumentsCategoryVisible">
            <FormUpdateDocumentsCategory v-if="formDocumentsCategoryVisible" :category-trees="trees"
                :documents="categoryDocuments" @success="formSuccess" />
        </el-dialog>
        <el-dialog :close-on-click-modal="false" title="批量设置语言" width="640px" v-model="formDocumentsLanguageVisible">
            <FormUpdateDocumentsLanguage v-if="formDocumentsLanguageVisible" :documents="languageDocuments"
                @success="formSuccess" />
        </el-dialog>
        <el-dialog :close-on-click-modal="false" title="推荐设置" v-model="formDocumentRecommendVisible" width="640px">
            <FormDocumentRecommend :init-document="document" @success="formSuccess" />
        </el-dialog>
    </div>
</template>

<script setup>
import SearchForm from '@/components/SearchForm.vue'
import TableList from '@/components/TableList.vue'
import { documentStatusEnums, boolEnum } from '@/utils/enum'
import { onMounted, reactive, ref } from 'vue'
import { uploadDocumentList } from '../../../../mock/data'

const searchFormFields = [
    {
        type: 'text',
        label: '关键字',
        name: 'wd',
        placeholder: '请输入关键字',
    },
    {
        type: 'select',
        label: '状态',
        name: 'status',
        placeholder: '请选择状态',
        multiple: true,
        options: documentStatusEnums,
    },
    {
        type: 'select',
        label: '语言',
        name: 'language',
        placeholder: '请选择语言',
        multiple: true,
        // options: languageOptions,
    },
    {
        type: 'select',
        label: '推荐',
        name: 'is_recommend',
        placeholder: '请选择推荐状态',
        multiple: true,
        options: boolEnum,
    },
    // 级联
    {
        type: 'cascader',
        label: '分类',
        name: 'category_id',
        placeholder: '请选择分类',
        // trees: trees,
    },
]

const loading = ref(false)
const selectedRow = ref([])
const search = reactive({
    currentPage: 1,
    pageSize: 10
})

const onSearch = () => {
    getDcoumentList()
}

const getDcoumentList = () => {
    loading.value = true
    setTimeout(() => {
        loading.value = false
        documents.value = uploadDocumentList
        total.value = uploadDocumentList.length
    }, 2000);
}

const onAdd = () => { }
const onBatchDelete = () => { }
const reconvertDocument = () => { }
const checkDocument = () => { }
const batchUpdateDocumentsCategory = () => { }
const batchUpdateDocumentsLanguage = () => { }

const tableListFields = [
    // { prop: 'id', label: 'ID', width: 80, type: 'number', fixed: 'left' },
    {
        prop: 'title_html',
        label: '文档',
        minWidth: 200,
        fixed: 'left',
        type: 'html',
    },
    { prop: 'ext', label: '扩展名', width: 70 },
    { prop: 'username_html', label: '上传者', width: 120, type: 'html' },
    // {
    //     prop: 'status',
    //     label: '状态',
    //     width: 120,
    //     type: 'enum',
    //     enum: statusMap,
    // },
    // {
    //     prop: 'language',
    //     label: '语言',
    //     width: 120,
    //     type: 'enum',
    //     enum: languageMap,
    // },
    {
        prop: 'category_name',
        label: '分类',
        minWidth: 180,
        type: 'breadcrumb',
    },
    { prop: 'size', label: '大小', width: 100, type: 'bytes' },
    { prop: 'pages', label: '页数', width: 80, type: 'number' },
    { prop: 'price', label: '价格', width: 80, type: 'number' },
    { prop: 'download_count', label: '下载', width: 70, type: 'number' },
    { prop: 'view_count', label: '浏览', width: 70, type: 'number' },
    { prop: 'favorite_count', label: '收藏', width: 70, type: 'number' },
    { prop: 'comment_count', label: '评论', width: 70, type: 'number' },
    { prop: 'keywords', label: '关键字', minWidth: 200 },
    // { prop: 'description', label: '摘要', minWidth: 200 },
    { prop: 'created_at', label: '创建时间', width: 160, type: 'datetime' },
    { prop: 'updated_at', label: '更新时间', width: 160, type: 'datetime' },
    {
        prop: 'recommend_at',
        label: '推荐时间',
        width: 160,
        type: 'datetime',
    },
]
const documents = ref([])
const total = ref(0)

const viewRow = () => { }
const deleteRow = () => { }
const editRow = () => { }
const selectRow = () => { }
const recommendDocument = () => { }
const download2review = () => { }

const handleSizeChange = (pageSize) => {
    search.pageSize = pageSize
    onSearch()
}
const handlePageChange = (page) => {
    search.currentPage = page
    onSearch()
}

onMounted(() => {
    getDcoumentList()
})
</script>