<template>
    <div>
        <el-card shadow="never">
            <SearchForm :fields="searchFormFields" :loading="loading" :show-add="true" :show-delete="true"
                :disabled-delete="selectedRow.length === 0" :default-search="search" @onSearch="onSearch" @onAdd="onAdd"
                @onDelete="onBatchDelete">
                <template #buttons>
                    <el-dropdown :disabled="selectedRow.length === 0" @command="batchStatus" class="mgl-10px">
                        <el-button type="warning">
                            批量启用/禁用
                            <el-icon>
                                <ArrowDown />
                            </el-icon>
                        </el-button>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="enable">启用</el-dropdown-item>
                                <el-dropdown-item command="disable">禁用</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </template>
            </SearchForm>
        </el-card>
        <el-card shadow="never" class="mgt-20px">
            <TableList :loading="loading" :table-data="languages" :fields="tableListFields" :show-actions="true"
                :show-view="false" :show-edit="true" :show-delete="true" :show-select="true" @selectRow="selectRow"
                @editRow="editRow" @deleteRow="deleteRow"></TableList>
            <div class="mgt-20px text-right">
                <el-pagination background :current-page="search.page" :page-sizes="[10, 20, 50, 100]"
                    :page-size="search.size" layout="total, sizes, prev, pager, next, jumper" :total="total"
                    @size-change="handleSizeChange" @current-change="handlePageChange">
                </el-pagination>
            </div>
        </el-card>
        <el-dialog :close-on-click-modal="false" :title="language.id ? '编辑语言' : '新增语言'" v-model="formLanguageVisible"
            width="640px">
            <LanguageForm :init-language="language" :visible="formLanguageVisible" @success="onSuccess"/>
        </el-dialog>
    </div>
</template>

<script setup>
import SearchForm from '@/components/SearchForm.vue'
import TableList from '@/components/TableList.vue'
import { onMounted, reactive, ref } from 'vue'
import LanguageForm from './form/LanguageForm.vue'

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
        name: 'enable',
        placeholder: '请选择状态',
        multiple: true,
        options: [
            { label: '启用', value: 1 },
            { label: '禁用', value: 0 },
        ],
    },
]

const loading = ref(false)
const selectedRow = ref([])
const search = reactive({
    currentPage: 1,
    pageSize: 10
})

const onSearch = () => {
    getLanguageList()
}

const getLanguageList = () => {
    loading.value = true
    setTimeout(() => {
        loading.value = false
        languages.value = []
        total.value = 15
    }, 2000);
}

const onAdd = () => {
    formLanguageVisible.value = true
}
const onBatchDelete = () => { }

const batchStatus = () => { }

const tableListFields = [
    // { prop: 'id', label: 'ID', width: 80, type: 'number', fixed: 'left' },
    {
        prop: 'enable',
        label: '状态',
        width: 80,
        type: 'bool',
        fixed: 'left',
    },
    {
        prop: 'language',
        label: '语言',
        minWidth: 150,
    },
    { prop: 'code', label: '代码', minWidth: 150 },
    { prop: 'sort', label: '排序', width: 80, type: 'number' },
    { prop: 'created_at', label: '创建时间', width: 160, type: 'datetime' },
    { prop: 'updated_at', label: '更新时间', width: 160, type: 'datetime' },
]
const languages = ref([])
const total = ref(0)

const deleteRow = (row) => {
    console.log(row)
}
const editRow = (row) => {
    formLanguageVisible.value = true
    getLanguage(row.id)
}
const selectRow = () => { }

const handleSizeChange = (pageSize) => {
    search.pageSize = pageSize
    onSearch()
}
const handlePageChange = (page) => {
    search.currentPage = page
    onSearch()
}

let language = reactive({})
const formLanguageVisible = ref(false)

const getLanguage = (id) =>{
    console.log(id)
    language = reactive({
        ...{id: 1, language: '中文', code: 'ZH', sort: 10}
    })
}

const onSuccess = () => {
    formLanguageVisible.value = false
    getLanguageList()
}

onMounted(() => {
    getLanguageList()
})
</script>