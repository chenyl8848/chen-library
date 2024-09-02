<template>
    <div>
        <el-card shadow="never">
            <SearchForm :fields="searchFormFields" :loading="loading" :show-add="false" :show-delete="true"
                :disabled-delete="selectedRow.length === 0" :default-search="search" @onSearch="onSearch"
                @onDelete="onBatchDelete" />
        </el-card>
        <el-card shadow="never" class="mgt-20px">
            <TableList :loading="loading" :table-data="attachments" :fields="tableListFields" :show-actions="true"
                :show-view="false" :show-edit="true" :show-delete="true" :show-select="true" @selectRow="selectRow"
                @editRow="editRow" @deleteRow="deleteRow" />
            <div class="mgt-20px text-right">
                <el-pagination background :current-page="search.page" :page-sizes="[10, 20, 50, 100]"
                    :page-size="search.size" layout="total, sizes, prev, pager, next, jumper" :total="total"
                    @size-change="handleSizeChange" @current-change="handlePageChange">
                </el-pagination>
            </div>
        </el-card>
        <el-dialog :close-on-click-modal="false" title="编辑附件" width="640px" v-model="attachmentFormVisible">
            <AttachmentForm :init-attachment="attachment" @success="onSuccess" />
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import SearchForm from '@/components/SearchForm.vue'
import TableList from '@/components/TableList.vue'
import AttachmentForm from './form/AttachmentForm.vue'
import { attachmentTypeEnum } from '@/utils/enum'

const searchFormFields = [
    {
        type: 'text',
        label: '关键字',
        name: 'wd',
        placeholder: '请输入关键字',
    },
    {
        type: 'select',
        label: '附件类型',
        name: 'type',
        placeholder: '请选择附件类型',
        multiple: true,
        options: attachmentTypeEnum,
    },
    {
        type: 'select',
        label: '是否合法',
        name: 'enable',
        placeholder: '请选择是否合法',
        multiple: true,
        options: [
            { label: '是', value: 1 },
            { label: '否', value: 0 },
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
    getAttachmentList()
}

const onBatchDelete = () => {

}

const getAttachmentList = () => {
    loading.value = true
    setTimeout(() => {
        loading.value = false
        attachments.value = []
        total.value = 15
    }, 2000);
}

const tableListFields = [
    // { prop: 'id', label: 'ID', width: 80, type: 'number' },
    { prop: 'type_name', label: '类型', width: 80 },
    { prop: 'name', label: '名称', minWidth: 200 },
    {
        prop: 'enable',
        label: '是否合法',
        width: 80,
        type: 'bool',
    },
    { prop: 'username', label: '上传者', width: 120 },
    { prop: 'ip', label: 'IP', width: 120 },
    { prop: 'size', label: '大小', width: 90, type: 'bytes' },
    { prop: 'width', label: '宽', width: 90 },
    { prop: 'height', label: '高', width: 90 },
    { prop: 'ext', label: '扩展', width: 90 },
    { prop: 'hash', label: 'HASH', width: 290 },
    { prop: 'path', label: '存储路径', minWidth: 300 },
    { prop: 'description', label: '备注', width: 200 },
    { prop: 'created_at', label: '创建时间', width: 160, type: 'datetime' },
    { prop: 'updated_at', label: '更新时间', width: 160, type: 'datetime' },
]
const attachments = ref([])
const total = ref(0)

const selectRow = (row) => {
    console.log(row)
}
const editRow = (row) => {
    attachmentFormVisible.value = true
    getAttachment(row.id)
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

const attachment = reactive({})
const attachmentFormVisible = ref(false)

const getAttachment = (id) => {
    console.log(id)
}

const onSuccess = () => {
    attachmentFormVisible.value = false
    getAttachmentList()
}

onMounted(() => {
    getAttachmentList()
})
</script>