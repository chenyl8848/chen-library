<template>
    <div class="page-admin-article">
        <el-card shadow="never" class="search-card">
            <SearchForm :fields="searchFormFields" :loading="loading" :show-add="true" :show-delete="true"
                :disabled-delete="selectedRow.length === 0" :default-search="search" @onSearch="onSearch" @onAdd="onAdd"
                @onDelete="onBatchDelete">
                <template #buttons>
                    <el-tooltip class="item" effect="dark" content="批量修改选中的文档分类" placement="top">
                        <el-button type="success" :disabled="selectedRow.length === 0" icon="Edit"
                            @click="batchUpdateArticlesCategory">批量分类</el-button>
                    </el-tooltip>
                    <el-dropdown :disabled="selectedRow.length === 0" @command="batchRecommend" class="mgl-10px">
                        <el-button type="primary" icon="Check">
                            批量推荐
                            <el-icon>
                                <ArrowDown />
                            </el-icon>
                        </el-button>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="true">推荐选中</el-dropdown-item>
                                <el-dropdown-item command="false">取消推荐</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <el-dropdown :disabled="selectedRow.length === 0" @command="batchCheck" class="mgl-10px">
                        <el-button type="warning" icon="Check">
                            批量审核
                            <el-icon>
                                <ArrowDown />
                            </el-icon>
                        </el-button>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item v-for="status in articleStatusEnum" :key="`status-${status.value}`"
                                    :command="status.value">设为{{ status.label
                                    }}</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </template>
            </SearchForm>
        </el-card>
        <el-card shadow="never" class="mgt-20px">
            <TableList :loading="loading" :table-data="articles" :fields="tableListFields" :show-actions="true"
                :show-view="false" :show-edit="true" :show-delete="true" :show-select="true" @selectRow="selectRow"
                @editRow="editRow" @deleteRow="deleteRow">
            </TableList>
            <div class="mgt-20px text-right">
                <el-pagination background :current-page="search.page" :page-sizes="[10, 20, 50, 100]"
                    :page-size="search.size" layout="total, sizes, prev, pager, next, jumper" :total="total"
                    @size-change="handleSizeChange" @current-change="handlePageChange">
                </el-pagination>
            </div>
        </el-card>
        <el-dialog :close-on-click-modal="false" title="批量分类" width="640px" v-model="updateArticlesCategoryFormVisible">
            <UpdateArticlesCategoryForm :category-trees="categoryStore.categoryTree" :articles="selectedRow"
                @success="onSuccess" />
        </el-dialog>
    </div>
</template>

<script setup>
import SearchForm from '@/components/SearchForm.vue'
import TableList from '@/components/TableList.vue'
import UpdateArticlesCategoryForm from './form/UpdateArticlesCategoryForm.vue'
import { articleStatusEnum } from '@/utils/enum'
import { onMounted, reactive, ref } from 'vue'
import { articleList } from '../../../../mock/data'
import { useRouter } from 'vue-router'
import useCategoryStore from '@/store/module/category'
const categoryStore = useCategoryStore()

const $router = useRouter()
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
        multiple: true,
        placeholder: '请选择状态',
        options: articleStatusEnum,
    },
    {
        type: 'cascader',
        label: '分类',
        name: 'category_id',
        placeholder: '请选择分类',
        trees: categoryStore.categoryTree,
    }
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
        articles.value = articleList
        total.value = articleList.length
    }, 2000);
}

// 新增
const onAdd = () => {
    $router.push({ path: '/admin/article/set' })
}

// 批量删除
const onBatchDelete = () => { }

const updateArticlesCategoryFormVisible = ref(false)
// 批量分类
const batchUpdateArticlesCategory = () => {
    updateArticlesCategoryFormVisible.value = true
}

// 批量推荐
const batchRecommend = (command) => {
    console.log(command)
}

// 批量审核
const batchCheck = (command) => {
    console.log(command)
}


// 编辑文档
const editRow = (row) => {
    console.log(row)
    $router.push({ path: '/admin/article/set', query: { articleId: row.id } })
}

const onSuccess = () => {
    updateArticlesCategoryFormVisible.value = false
}

const tableListFields = [
    // { prop: 'id', label: 'ID', width: 80, type: 'number', fixed: 'left' },
    {
        prop: 'title_html',
        label: '标题',
        minWidth: 150,
        fixed: 'left',
        type: 'html',
    },
    {
        prop: 'user_html',
        label: '作者',
        minWidth: 100,
        type: 'html',
    },
    { prop: 'identifier', label: '标识', width: 200 },
    { prop: 'view_count', label: '阅读', width: 80, type: 'number' },
    { prop: 'favorite_count', label: '收藏', width: 80, type: 'number' },
    { prop: 'comment_count', label: '评论', width: 80, type: 'number' },
    {
        prop: 'category_name',
        label: '分类',
        minWidth: 180,
        type: 'breadcrumb',
    },
    {
        prop: 'status',
        label: '状态',
        width: 100,
        type: 'enum',
        enum: articleStatusEnum,
    },
    {
        prop: 'recommend_at',
        label: '推荐时间',
        width: 180,
        type: 'datetime',
    },
    { prop: 'created_at', label: '创建时间', width: 180, type: 'datetime' },
    { prop: 'updated_at', label: '更新时间', width: 180, type: 'datetime' },
]
const articles = ref([])
const total = ref(0)

const deleteRow = () => { }
const selectRow = (rows) => {
    selectedRow.value = rows
}

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