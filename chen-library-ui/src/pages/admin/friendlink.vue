<template>
    <div>
        <el-card shadow="never">
            <SearchForm :fields="searchFormFields" :loading="loading" :show-add="true" :show-delete="true"
                :disabled-delete="selectedRow.length === 0" :default-search="search" @onSearch="onSearch" @onAdd="onAdd"
                @onDelete="onBatchDelete" />
        </el-card>
        <el-card shadow="never" class="mgt-20px">
            <TableList :loading="loading" :table-data="friendlinks" :fields="tableListFields" :show-actions="true"
                :show-view="false" :show-edit="true" :show-delete="true" :show-select="true" @selectRow="selectRow"
                @editRow="editRow" @deleteRow="deleteRow" />
            <div class="mgt-20px text-right">
                <el-pagination background :current-page="search.page" :page-sizes="[10, 20, 50, 100]"
                    :page-size="search.size" layout="total, sizes, prev, pager, next, jumper" :total="total"
                    @size-change="handleSizeChange" @current-change="handlePageChange">
                </el-pagination>
            </div>
        </el-card>
        <el-dialog :close-on-click-modal="false" :title="friendlink.id ? '编辑友链' : '新增友链'"
            v-model="friendlinkFormVisible" width="640px">
            <FriendlinkForm :init-friendlink="friendlink" @success="onSuccess" />
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import SearchForm from '@/components/SearchForm.vue'
import TableList from '@/components/TableList.vue'
import FriendlinkForm from './form/FriendlinkForm.vue'

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
    getFriendlinkList()
}

const onAdd = () => {
    friendlinkFormVisible.value = true
}

const onBatchDelete = () => {

}

const getFriendlinkList = () => {
    loading.value = true
    setTimeout(() => {
        loading.value = false
        friendlinks.value = []
        total.value = 15
    }, 2000);
}

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
        prop: 'title_html',
        label: '名称',
        minWidth: 150,
        fixed: 'left',
        type: 'html',
    },
    { prop: 'link', label: '链接', minWidth: 250 },
    { prop: 'sort', label: '排序', width: 80, type: 'number' },
    { prop: 'description', label: '描述', minWidth: 250 },
    { prop: 'created_at', label: '创建时间', width: 160, type: 'datetime' },
    { prop: 'updated_at', label: '更新时间', width: 160, type: 'datetime' },
]
const friendlinks = ref([])
const total = ref(0)

const selectRow = (row) => {
    console.log(row)
}
const editRow = (row) => {
    friendlinkFormVisible.value = true
    getFriendlink(row.id)
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

const friendlink = reactive({})
const friendlinkFormVisible = ref(false)

const getFriendlink = (id) => {
    console.log(id)
}

const onSuccess = () => {
    friendlinkFormVisible.value = false
    getFriendlinkList()
}


onMounted(() => {
    getFriendlinkList()
})
</script>