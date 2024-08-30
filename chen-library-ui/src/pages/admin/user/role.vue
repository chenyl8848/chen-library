<template>
    <div>
        <el-card shadow="never" class="search-card">
            <SearchForm :fields="searchFormFields" :loading="loading" :show-add="true" :show-delete="true"
                :disabled-delete="selectedRow.length === 0" :default-search="search" @onAdd="onAdd"
                @onDelete="onBatchDelete" @onSearch="onSearch" />
        </el-card>
        <el-card shadow="never" class="mgt-20px">
            <TableList :table-data="roles" :fields="tableListFields" :show-actions="true" :show-view="false"
                :show-edit="true" :show-delete="true" :show-select="true" :actions-min-width="200"
                @selectRow="selectRow" @deleteRow="deleteRow" @editRow="editRow">
                <template #actions="scope">
                    <el-tooltip content="网站管理后台管理功能授权" placement="top">
                        <el-button type="text" icon="Coordinate" size="small"
                            @click="setGroupPermission(scope.row)">管理授权</el-button>
                    </el-tooltip>
                </template>
            </TableList>
        </el-card>
        <el-card v-if="total > 0" shadow="never" class="mgt-20px">
            <div class="text-right">
                <el-pagination background :current-page="search.page" :page-sizes="[10, 20, 50, 100]"
                    :page-size="search.size" layout="total, sizes, prev, pager, next, jumper" :total="total"
                    @size-change="handleSizeChange" @current-change="handlePageChange">
                </el-pagination>
            </div>
        </el-card>

        <el-dialog :close-on-click-modal="false" :title="role.id ? '编辑角色' : '新增角色'" v-model="roleFormVisible"
            width="640px">
            <RoleForm :init-role="role" @success="onSuccess" />
        </el-dialog>
        <!-- <el-drawer :title="`【${group.title}】管理授权`" :visible.sync="formGroupPermissionVisible">
            <div style="padding: 0 20px">
                <FormGroupPermission ref="groupPermission" :group-id="group.id"
                    @success="updateGroupPermissionSuccess" />
            </div>
        </el-drawer>
        <el-dialog :close-on-click-modal="false" :title="`【${group.title}】前台功能授权`"
            v-model="formGroupPermissionFrontVisible" width="640px">
            asd
        </el-dialog> -->
    </div>
</template>

<script setup>
import SearchForm from '@/components/SearchForm.vue'
import TableList from '@/components/TableList.vue'
import { onMounted, reactive, ref } from 'vue'
import RoleForm from './form/RoleForm.vue'
const searchFormFields = [
    {
        type: 'text',
        label: '关键字',
        name: 'wd',
        placeholder: '请输入关键字',
    },
]

const loading = ref(false)
const selectedRow = ref([])
const search = reactive({
    currentPage: 1,
    pageSize: 10
})

const onSearch = () => {
    getRoleList()
}

const getRoleList = () => {
    loading.value = true
    setTimeout(() => {
        loading.value = false
        roles.value = []
        total.value = 15
    }, 2000);
}

const onAdd = () => {
    roleFormVisible.value = true
}
const onBatchDelete = () => { }

const tableListFields = [
    // { prop: 'id', label: 'ID', width: 80, type: 'number', fixed: 'left' },
    { prop: 'title', label: '名称', width: 150, fixed: 'left' },
    { prop: 'sort', label: '排序', width: 80, type: 'number' },
    { prop: 'user_count', label: '用户数', width: 80, type: 'number' },
    // { prop: 'color', label: '颜色', width: 120, type: 'color' },
    { prop: 'is_default', label: '默认组', width: 80, type: 'bool' },
    {
        prop: 'enable_upload',
        label: '允许上传文档',
        width: 120,
        type: 'bool',
    },
    {
        prop: 'enable_document_review',
        label: '文档需要审核',
        width: 120,
        type: 'bool',
    },
    {
        prop: 'enable_comment',
        label: '允许评论',
        width: 120,
        type: 'bool',
    },
    {
        prop: 'enable_comment_approval',
        label: '评论需审核',
        width: 120,
        type: 'bool',
    },
    {
        prop: 'enable_article',
        label: '允许发布文章',
        width: 120,
        type: 'bool',
    },
    {
        prop: 'enable_article_approval',
        label: '文章需要审核',
        width: 120,
        type: 'bool',
    },
    // { prop: 'is_display', label: '是否展示', width: 80, type: 'bool' },
    { prop: 'description', label: '描述', width: 250 },
    { prop: 'created_at', label: '创建时间', width: 160, type: 'datetime' },
    { prop: 'updated_at', label: '更新时间', width: 160, type: 'datetime' },
]
const roles = ref([])
const total = ref(0)

const editRow = (row) => {
    roleFormVisible.value = true
    getRole(row.id)
}
const deleteRow = (row) => {
    console.log(row)
}
const selectRow = () => { }
const setGroupPermission = (row) => {
    getRole(row.id)
}

const handleSizeChange = (pageSize) => {
    search.pageSize = pageSize
    onSearch()
}
const handlePageChange = (page) => {
    search.currentPage = page
    onSearch()
}

const role = reactive({})
const roleFormVisible = ref(false)

const getRole = (id) => {
    console.log(id)
}

const onSuccess = () => {
    onSearch()
}


onMounted(() => {
    getRoleList()
})
</script>