<template>
    <div>
        <el-card shadow="never">
            <SearchForm :fields="searchFormFields" :loading="loading" :show-add="false" :show-delete="false"
                :disabled-delete="selectedRow.length === 0" :default-search="search" @onSearch="onSearch">
                <template #buttons>
                    <el-button type="success" icon="RefreshLeft" :disabled="selectedRow.length === 0"
                        @click="batchRecover">恢复选中</el-button>
                    <el-button type="warning" icon="Close" :disabled="selectedRow.length === 0"
                        @click="batchDelete">删除选中</el-button>
                    <el-button type="danger" :disabled="selectedRow.length > 0" icon="Delete"
                        @click="clearAll">清空回收站</el-button>
                </template>
            </SearchForm>
        </el-card>
        <el-card shadow="never" class="mgt-20px">
            <TableList :loading="loading" :table-data="articles" :fields="tableListFields" :show-actions="true"
                :show-view="false" :show-edit="false" :show-delete="true" :show-select="true" @selectRow="selectRow"
                @deleteRow="deleteRow">
                <template #actions="scope">
                    <el-button type="primary" icon="RrefreshLeft" size="small"
                        @click="recoverRow(scope.row)">恢复</el-button>
                </template>
            </TableList>
            <div class="mgt-20px text-right">
                <el-pagination background :current-page="search.page" :page-sizes="[10, 20, 50, 100]"
                    :page-size="search.size" layout="total, sizes, prev, pager, next, jumper" :total="total"
                    @size-change="handleSizeChange" @current-change="handlePageChange">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script setup>
import SearchForm from '@/components/SearchForm.vue'
import TableList from '@/components/TableList.vue'
import { onMounted, reactive, ref } from 'vue'

const searchFormFields = [
    {
        type: 'text',
        label: '关键字',
        name: 'wd',
        placeholder: '请输入关键字',
    },
    {
        type: 'cascader',
        label: '分类',
        name: 'category_id',
        placeholder: '请选择分类',
        //   trees: this.trees,
    },
]

const loading = ref(false)
const selectedRow = ref([])
const search = reactive({
    currentPage: 1,
    pageSize: 10
})

const onSearch = () => {
    getArticleList()
}

const getArticleList = () => {
    loading.value = true
    setTimeout(() => {
        loading.value = false
        articles.value = []
        total.value = 15
    }, 2000);
}

const batchRecover = () => { }
const batchDelete = () => { }
const clearAll = () => { }

const tableListFields = [
    { prop: 'id', label: 'ID', width: 80, type: 'number', fixed: 'left' },
    {
        prop: 'title_html',
        label: '标题',
        minWidth: 150,
        fixed: 'left',
        type: 'html',
    },
    { prop: 'identifier', label: '标识', width: 200 },
    { prop: 'view_count', label: '浏览', width: 80, type: 'number' },
    {
        prop: 'category_name',
        label: '分类',
        minWidth: 180,
        type: 'breadcrumb',
    },
    { prop: 'created_at', label: '创建时间', width: 160, type: 'datetime' },
    { prop: 'updated_at', label: '更新时间', width: 160, type: 'datetime' },
    { prop: 'deleted_at', label: '删除时间', width: 160, type: 'datetime' },
]
const articles = ref([])
const total = ref(0)

const deleteRow = (row) => {
    console.log(row)
}
const selectRow = () => { }
const recoverRow = () => { }

const handleSizeChange = (pageSize) => {
    search.pageSize = pageSize
    onSearch()
}
const handlePageChange = (page) => {
    search.currentPage = page
    onSearch()
}

onMounted(() => {
    getArticleList()
})
</script>