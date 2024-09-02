<template>
    <div>
        <el-card shadow="never">
            <SearchForm :fields="searchFormFields" :loading="loading" :show-add="false" :show-delete="true"
                :disabled-delete="selectedRow.length === 0" :default-search="search" @onSearch="onSearch"
                @onDelete="onBatchDelete" />
        </el-card>
        <el-card shadow="never" class="mgt-20px">
            <TableList :loading="loading" :table-data="reports" :fields="tableListFields" :show-actions="true"
                :show-view="false" :show-edit="true" :show-delete="true" :show-select="true" @selectRow="selectRow"
                @editRow="editRow" @deleteRow="deleteRow" />
            <div class="mgt-20px text-right">
                <el-pagination background :current-page="search.page" :page-sizes="[10, 20, 50, 100]"
                    :page-size="search.size" layout="total, sizes, prev, pager, next, jumper" :total="total"
                    @size-change="handleSizeChange" @current-change="handlePageChange">
                </el-pagination>
            </div>
        </el-card>
        <el-dialog :close-on-click-modal="false" title="编辑举报" v-model="reportFormVisible" width="640px">
            <ReportForm :init-report="report" :is-admin="true" @success="onSuccess" />
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import SearchForm from '@/components/SearchForm.vue'
import ReportForm from '@/components/ReportForm.vue'
import TableList from '@/components/TableList.vue'
import { reportReasonEnum } from '@/utils/enum'

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
        options: [
            { label: '已处理', value: 1 },
            { label: '未处理', value: 0 },
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
    getReportList()
}

const onBatchDelete = () => {

}

const getReportList = () => {
    loading.value = true
    setTimeout(() => {
        loading.value = false
        reports.value = []
        total.value = 15
    }, 2000);
}

const tableListFields = [
    // { prop: 'id', label: 'ID', width: 80, type: 'number', fixed: 'left' },
    {
        prop: 'status',
        label: '是否已处理',
        width: 100,
        type: 'bool',
        fixed: 'left',
    },
    {
        prop: 'document_title_html',
        label: '文档',
        minWidth: 150,
        fixed: 'left',
        type: 'html',
    },
    {
        prop: 'reason',
        label: '举报原因',
        width: 80,
        type: 'enum',
        enum: reportReasonEnum,
    },
    {
        prop: 'username_html',
        label: '举报人',
        width: 100,
        type: 'html',
    },
    { prop: 'remark', label: '处理描述', minWidth: 150 },
    { prop: 'created_at', label: '举报时间', width: 160, type: 'datetime' },
    { prop: 'updated_at', label: '更新时间', width: 160, type: 'datetime' },
]
const reports = ref([])
const total = ref(0)

const selectRow = (row) => {
    console.log(row)
}
const editRow = (row) => {
    reportFormVisible.value = true
    getReport(row.id)
}

const deleteRow = (row) => {
    console.log(row)
}

const handleSizeChange = (pageSize) => {
    search.pageSize = pageSize
    onSearch()
}
const handlePageChange = (page) => {
    search.currentPage = page
    onSearch()
}

const report = reactive({})
const reportFormVisible = ref(false)

const getReport = (id) => {
    console.log(id)
}

const onSuccess = () => {
    reportFormVisible.value = false
    getReportList()
}

onMounted(() => {
    getReportList()
})
</script>