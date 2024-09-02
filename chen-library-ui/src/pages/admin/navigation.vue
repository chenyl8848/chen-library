<template>
    <div>
        <el-card shadow="never">
            <SearchForm :fields="searchFormFields" :loading="loading" :show-add="true" :show-delete="true"
                :disabled-delete="selectedRow.length === 0" :default-search="search" @onSearch="onSearch" @onAdd="onAdd"
                @onDelete="onBatchDelete" />
        </el-card>
        <el-card shadow="never" class="mgt-20px">
            <TableList :loading="loading" :table-data="navigations" :fields="tableListFields" :show-actions="true"
                :show-view="false" :show-edit="true" :show-delete="true" :show-select="true"
                :tree-props="{ children: 'children' }" @selectRow="selectRow" @editRow="editRow"
                @deleteRow="deleteRow" />
            <div class="mgt-20px text-right">
                <el-pagination background :current-page="search.page" :page-sizes="[10, 20, 50, 100]"
                    :page-size="search.size" layout="total, sizes, prev, pager, next, jumper" :total="total"
                    @size-change="handleSizeChange" @current-change="handlePageChange">
                </el-pagination>
            </div>
        </el-card>
        <el-dialog :close-on-click-modal="false" :title="navigation.id ? '编辑导航' : '新增导航'"
            v-model="navigationFormVisible" width="640px">
            <NavigationForm :init-navigation="navigation" :trees="navigations" @success="onSuccess" />
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import SearchForm from '@/components/SearchForm.vue'
import TableList from '@/components/TableList.vue'
import NavigationForm from './form/NavigationForm.vue'

const searchFormFields = [
    {
        type: 'text',
        label: '关键字',
        name: 'wd',
        placeholder: '请输入关键字',
    }
]
const loading = ref(false)
const selectedRow = ref([])
const search = reactive({
    currentPage: 1,
    pageSize: 10
})

const onSearch = () => {
    getNavigationList()
}

const onAdd = () => {
    navigationFormVisible.value = true
}

const onBatchDelete = () => {

}

const getNavigationList = () => {
    loading.value = true
    setTimeout(() => {
        loading.value = false
        navigations.value = []
        total.value = 15
    }, 2000);
}

const tableListFields = [
    // { prop: 'id', label: 'ID', width: 80, type: 'number', fixed: 'left' },
    {
        prop: 'title_html',
        label: '名称',
        minWidth: 200,
        fixed: 'left',
        type: 'html',
    },
    {
        prop: 'enable',
        label: '启用',
        width: 80,
        type: 'bool',
    },
    { prop: 'href', label: '链接', minWidth: 200 },
    { prop: 'target', label: '打开方式', width: 80 },
    { prop: 'sort', label: '排序', width: 80, type: 'number' },
    { prop: 'description', label: '描述', minWidth: 200 },
    { prop: 'created_at', label: '创建时间', width: 160, type: 'datetime' },
    { prop: 'updated_at', label: '更新时间', width: 160, type: 'datetime' },
]
const navigations = ref([])
const total = ref(0)

const selectRow = (row) => {
    console.log(row)
}
const editRow = (row) => {
    navigationFormVisible.value = true
    getNavigation(row.id)
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

const navigation = reactive({})
const navigationFormVisible = ref(false)

const getNavigation = (id) => {
    console.log(id)
}

const onSuccess = () => {
    navigationFormVisible.value = false
    getNavigationList()
}


onMounted(() => {
    getNavigationList()
})
</script>