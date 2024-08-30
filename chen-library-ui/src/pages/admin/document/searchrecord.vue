<template>
    <div>
        <el-card shadow="never">
            <SearchForm :fields="searchFormFields" :loading="loading" :show-add="false" :show-delete="true"
                :disabled-delete="selectedRow.length === 0" :default-search="search" @onSearch="onSearch" @onDelete="onBatchDelete">
            </SearchForm>
        </el-card>
        <el-card shadow="never" class="mgt-20px">
            <TableList :loading="loading" :table-data="searchRecords" :fields="tableListFields" :show-actions="true"
                :show-view="false" :show-edit="false" :show-delete="true" :show-select="true" :actions-min-width="100"
                @selectRow="selectRow" @deleteRow="deleteRow">
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
        name: 'keywords',
        placeholder: '请输入关键字',
    },
    {
        type: 'text',
        label: 'IP',
        name: 'ip',
        placeholder: '请输入IP地址',
    },
    // {
    //   type: 'select',
    //   label: '排序',
    //   name: 'order',
    //   placeholder: '请选择状态',
    //   options: orderbyOptions,
    // },
]

const loading = ref(false)
const selectedRow = ref([])
const search = reactive({
    currentPage: 1,
    pageSize: 10
})

const onSearch = () => {
    getSearchRecordList()
}

const getSearchRecordList = () => {
    loading.value = true
    setTimeout(() => {
        loading.value = false
        searchRecords.value = []
        total.value = 15
    }, 2000);
}

const onBatchDelete = () => { }

const tableListFields = [
    // { prop: 'id', label: 'ID', width: 80, type: 'number', fixed: 'left' },
    { prop: 'username_html', label: '用户', width: 120, type: 'html' },
    {
        prop: 'keywords_html',
        label: '关键字',
        minWidth: 150,
        type: 'html',
    },
    { prop: 'total', label: '结果数', width: 80, type: 'number' },
    { prop: 'page', label: '页码', width: 70 },
    { prop: 'ip', label: 'IP', width: 100 },
    { prop: 'spend_time', label: '耗时(秒)', width: 100, type: 'number' },
    { prop: 'created_at', label: '搜索时间', width: 160, type: 'datetime' },
    { prop: 'user_agent', label: '客户端', minWidth: 200, type: 'number' },
]
const searchRecords = ref([])
const total = ref(0)

const deleteRow = (row) => {
    console.log(row)
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

onMounted(() => {
    getSearchRecordList()
})
</script>