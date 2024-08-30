<template>
    <div>
        <el-card shadow="never" class="search-card">
            <SearchForm :fields="searchFormFields" :loading="loading" :show-add="true" :show-delete="false"
                :disabled-delete="selectedRow.length === 0" :default-search="search" @onAdd="onAdd" @onSearch="onSearch" />
        </el-card>
        <el-card shadow="never" class="mgt-20px">
            <TableList :table-data="permissions" :fields="tableListFields" :show-actions="true" :show-view="false"
                :loading="loading" :show-edit="true" :show-delete="false" :show-select="false" :actions-min-width="80"
                @editRow="editRow" />
        </el-card>
        <el-card shadow="never" class="mgt-20px">
            <div class="text-right">
                <el-pagination background :current-page="search.page" :page-sizes="[10, 20, 50, 100]"
                    :page-size="search.size" layout="total, sizes, prev, pager, next, jumper" :total="total"
                    @size-change="handleSizeChange" @current-change="handlePageChange">
                </el-pagination>
            </div>
        </el-card>
        <el-dialog :close-on-click-modal="false" :title="permission.id ? '编辑权限' : '新增权限'" width="640px" v-model="permissionFormVisible">
            <PermissionForm :init-permission="permission" @success="onSuccess" />
        </el-dialog>
    </div>
</template>

<script setup>
import SearchForm from '@/components/SearchForm.vue'
import TableList from '@/components/TableList.vue'
import { onMounted, reactive, ref } from 'vue'
import { methodEnum } from '@/utils/enum'
import PermissionForm from './form/PermissionForm.vue'

const searchFormFields = [
    {
        type: 'text',
        label: '关键字',
        name: 'wd',
        placeholder: '请输入关键字',
    },
    {
        type: 'text',
        label: 'API',
        name: 'path',
        placeholder: '请输入API',
    },
    {
        type: 'select',
        label: 'Method',
        name: 'method',
        placeholder: '请选择Method',
        multiple: true,
        options: methodEnum,
    },
]

const loading = ref(false)
const selectedRow = ref([])
const search = reactive({
    currentPage: 1,
    pageSize: 10
})

const onSearch = () => {
    getPermissionList()
}

const onAdd = () => {
    permissionFormVisible.value = true
}

const getPermissionList = () => {
    loading.value = true
    setTimeout(() => {
        loading.value = false
        permissions.value = []
        total.value = 15
    }, 2000);
}

const tableListFields = [
    // { prop: 'id', label: 'ID', width: 80, type: 'number', fixed: 'left' },
    { prop: 'title', label: '名称', width: 240, fixed: 'left' },
    { prop: 'description', label: '描述', minWidth: 150 },
    {
        prop: 'method',
        label: 'Method',
        width: 80,
        type: 'enum',
        enum: methodEnum,
    },
    { prop: 'path', label: 'API', minWidth: 150 },
    { prop: 'created_at', label: '创建时间', width: 160, type: 'datetime' },
    { prop: 'updated_at', label: '更新时间', width: 160, type: 'datetime' },
]
const permissions = ref([])
const total = ref(0)

const editRow = (row) => {
    permissionFormVisible.value = true
    getPermussion(row.id)
}

const handleSizeChange = (pageSize) => {
    search.pageSize = pageSize
    onSearch()
}
const handlePageChange = (page) => {
    search.currentPage = page
    onSearch()
}

const permission = reactive({})
const permissionFormVisible = ref(false)

const getPermussion = (id) => {
    console.log(id)
}

const onSuccess = () => {
    permissionFormVisible.value = false
    getPermissionList()
}


onMounted(() => {
    getPermissionList()
})
</script>