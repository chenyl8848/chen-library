<template>
    <div>
        <el-card shadow="never" class="search-card">
            <SearchForm :fields="searchFormFields" :loading="loading" :show-add="true" :show-delete="true"
                :disabled-delete="selectedRow.length === 0" @onSearch="onSearch" @onAdd="onAdd" @onDelete="batchDelete">
            </SearchForm>
        </el-card>
        <el-card shadow="never" class="mgt-20px">
            <TableList :table-data="categories" :loading="loading" :fields="tableListFields" :show-actions="true"
                :show-view="false" :show-edit="true" :show-delete="true" :show-select="true"
                :tree-props="{ children: 'children' }" @selectRow="selectRow" @editRow="editRow"
                @deleteRow="deleteRow" />
        </el-card>
        <el-dialog :close-on-click-modal="false" :title="category.id ? '编辑分类' : '新增分类'" v-model="categoryFormVisible"
            :width="'640px'">
            <CategoryForm ref="categoryForm" :init-category="category" :trees="categoryStore.categoryTree"
                @success="onSuccess" />
        </el-dialog>
    </div>
</template>

<script setup>
import SearchForm from '@/components/SearchForm.vue'
import TableList from '@/components/TableList.vue'
import { ref, onMounted, reactive } from 'vue'
import useCategoryStore from '@/store/module/category'
import CategoryForm from '@/components/CategoryForm.vue';
const categoryStore = useCategoryStore()

const searchFormFields = [{
    type: 'text',
    label: '名称',
    name: 'title',
    placeholder: '请输入名称',
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
}]
const onAdd = () => {
    categoryFormVisible.value = true
}
const batchDelete = () => {
    console.log('batchDeletebatchDeletebatchDelete')
}

let search = {}
const loading = ref(false)
const selectedRow = ref([])
const onSearch = (queryParams) => {
    search = { ...search, ...queryParams }
    console.log(queryParams, search)
    getCategoryList()
}

const tableListFields = [
    { prop: 'title', label: '名称', minWidth: 120, fixed: 'left' },
    // { prop: 'id', label: 'ID', width: 80, type: 'number', fixed: 'left' },
    {
        prop: 'enable',
        label: '是否启用',
        width: 80,
        type: 'bool',
    },
    {
        prop: 'show_description',
        label: '显示描述',
        width: 80,
        type: 'bool',
    },
    {
        prop: 'sort',
        label: '排序',
        width: 80,
        type: 'number',
    },
    { prop: 'icon', label: '图标', width: 64, type: 'image' },
    { prop: 'cover', label: '封面', width: 100, type: 'image' },
    { prop: 'doc_count', label: '文章数', width: 80, type: 'number' },
    { prop: 'description', label: '分类描述', minWidth: 200 },
    { prop: 'created_at', label: '创建时间', width: 160, type: 'datetime' },
    { prop: 'updated_at', label: '更新时间', width: 160, type: 'datetime' },
]

const categories = ref([])
const selectRow = (rows) => {
    selectedRow.value = rows
}

const editRow = (row) => {
    categoryFormVisible.value = true
    getCategory(row.id)
    category = reactive({...row})
}

const deleteRow = (row) => {
    console.log(row, "deleteeeeeeeeeeeeee")

}

/**
 * 获取分类列表数据
 */
const getCategoryList = () => {
    loading.value = true
    setTimeout(() => {
        loading.value = false
        categories.value = categoryStore.categoryTree
    }, 2000);
}

const categoryFormVisible = ref(false)
let category = {
    title: '',
    sort: 0,
    enable: false,
    cover: '',
    icon: ''
}

const getCategory = (id) => {
    console.log(id)
    category = reactive({})
} 

const onSuccess = () => {
    categoryFormVisible.value = false
    getCategoryList()
}

onMounted(() => {
    getCategoryList()
})
</script>