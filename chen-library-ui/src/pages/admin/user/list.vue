<template>
    <div>
        <el-card shadow="never">
            <SearchForm :fields="searchFormFields" :loading="loading" :show-add="true" :show-delete="true"
                :disabled-delete="selectedRow.length === 0" :default-search="search" @onSearch="onSearch" @onAdd="onAdd"
                @onDelete="onBatchDelete">
            </SearchForm>
        </el-card>
        <el-card shadow="never" class="mgt-20px">
            <TableList :table-data="users" :loading="loading" :fields="tableListFields" :show-actions="true"
                :show-view="false" :show-edit="true" :show-delete="true" :show-select="true" :actions-min-width="100"
                @editRow="editRow" @viewRow="viewRow" @deleteRow="deleteRow" @selectRow="selectRow">
                <template #actions="scope">
                    <el-button type="primary" link size="small" icon="Setting"
                        @click="setUser(scope.row)">设置</el-button>
                </template>
            </TableList>
            <div class="mgt-20px text-right">
                <el-pagination background :current-page="search.page" :page-sizes="[10, 20, 50, 100]"
                    :page-size="search.size" layout="total, sizes, prev, pager, next, jumper" :total="total"
                    @size-change="handleSizeChange" @current-change="handlePageChange">
                </el-pagination>
            </div>
        </el-card>
        <el-dialog :close-on-click-modal="false" :title="user.id ? '设置用户' : '新增用户'" v-model="userFormVisible"
            width="640px">
            <UserForm ref="formUser" :init-user="user" :roles="roles" @success="onSuccess" />
        </el-dialog>
        <el-dialog :close-on-click-modal="false" title="编辑用户" v-model="userProfileFormVisible" width="640px">
            <UserProfileForm :init-user="user" :is-admin="true" @success="onSuccessProfile" />
        </el-dialog>
    </div>
</template>

<script setup>
import SearchForm from '@/components/SearchForm.vue'
import TableList from '@/components/TableList.vue'
import { onMounted, reactive, ref } from 'vue'
import UserForm from './form/UserForm.vue'
import UserProfileForm from '@/components/UserProfileForm.vue'

const roles = []
const searchFormFields = [
    {
        type: 'text',
        label: '关键字',
        name: 'wd',
        placeholder: '请输入关键字',
    },
    {
        type: 'select',
        label: '用户组',
        name: 'group_id',
        placeholder: '请选择用户组',
        multiple: true,
          options: roles.map((item) => {
            return {
              label: item.title,
              value: item.id,
            }
          }),
    },
    // {
    //   type: 'select',
    //   label: '状态',
    //   name: 'status',
    //   placeholder: '请选择用户状态',
    //   multiple: true,
    //   options: this.userStatusOptions,
    // },
]

const loading = ref(false)
const selectedRow = ref([])
const search = reactive({
    currentPage: 1,
    pageSize: 10
})

const onSearch = () => {
    getUserList()
}

const getUserList = () => {
    loading.value = true
    setTimeout(() => {
        loading.value = false
        users.value = []
        total.value = 15
    }, 2000);
}

const onAdd = () => {
    userFormVisible.value = true
}
const onBatchDelete = () => { }

const tableListFields = [
    // { prop: 'id', label: 'ID', width: 80, type: 'number', fixed: 'left' },
    {
        prop: 'avatar',
        label: '头像',
        width: 80,
        type: 'avatar',
        fixed: 'left',
    },
    {
        prop: 'username_html',
        label: '用户名',
        width: 150,
        fixed: 'left',
        type: 'html',
    },
    {
        prop: 'group',
        label: '用户组',
        width: 150,
    },
    { prop: 'doc_count', label: '文档', width: 80, type: 'number' },
    { prop: 'credit_count', label: '积分', width: 100, type: 'number' },
    { prop: 'follow_count', label: '关注', width: 80, type: 'number' },
    { prop: 'fans_count', label: '粉丝', width: 80, type: 'number' },
    { prop: 'favorite_count', label: '收藏', width: 80, type: 'number' },
    { prop: 'comment_count', label: '评论', width: 80, type: 'number' },
    { prop: 'realname', label: '姓名', width: 150 },
    {
        prop: 'remark',
        label: '备注',
        width: 250,
    },
    { prop: 'email', label: '邮箱', width: 200 },
    { prop: 'mobile', label: '电话', width: 200 },
    { prop: 'identity', label: '身份证', width: 250 },
    { prop: 'address', label: '地址', width: 250 },
    { prop: 'signature', label: '签名', width: 250 },
    { prop: 'created_at', label: '注册时间', width: 160, type: 'datetime' },
    { prop: 'register_ip', label: '注册IP', width: 160 },
    { prop: 'login_at', label: '最后登录', width: 160, type: 'datetime' },
    {
        prop: 'last_login_ip',
        label: '最后登录IP',
        width: 160,
    },
]
const users = ref([])
const total = ref(0)

const viewRow = (row) => {
    getUser(row.id)
}
const editRow = (row) => {
    userProfileFormVisible.value = true
    getUser(row.id)
}
const deleteRow = (row) => {
    console.log(row)
}
const selectRow = () => { }
const setUser = (row) => {
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

let user = reactive({})
const userFormVisible = ref(false)

const getUser = (id) => {
    console.log(id)
    user = reactive({

    })
}

const onSuccess = () => {
    userFormVisible.value = false
    getUserList()
}

const userProfileFormVisible = ref(false)
const onSuccessProfile = () => {
    userProfileFormVisible.value = false
}

onMounted(() => {
    getUserList()
})
</script>