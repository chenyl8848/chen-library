<template>
    <div>
        <el-card shadow="never" class="search-card">
            <SearchForm :fields="searchFormFields" :loading="loading" :show-add="true" :show-delete="false"
                :disabled-delete="selectedRow.length === 0" :default-search="search" @onSearch="onSearch"
                @onAdd="onAdd">
                <template #inputs>
                    <el-form-item label="用户">
                        <el-select v-model="search.user_id" filterable multiple remote reserve-keyword
                            placeholder="请输入用户名" :remote-method="remoteSearchUser" :loading="loading">
                            <el-option v-for="user in users" :key="'userid' + user.id" :label="user.username"
                                :value="user.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </template>
                <template #buttons>
                    <el-tooltip class="item" effect="dark" content="批量取消处罚" placement="top">
                        <el-button type="warning" :disabled="selectedRow.length === 0" icon="Edit"
                            @click="batchCancelPunishment">批量取消</el-button>
                    </el-tooltip>
                </template>
            </SearchForm>
        </el-card>
        <el-card shadow="never" class="mgt-20px">
            <TableList :loading="loading" :table-data="punishments" :fields="tableListFields" :show-actions="true"
                :show-view="false" :show-edit="true" :show-delete="false" :show-select="true" :actions-min-width="80"
                @selectRow="selectRow" @editRow="editRow" />
        </el-card>
        <el-card shadow="never" class="mgt-20px">
            <div class="text-right">
                <el-pagination background :current-page="search.page" :page-sizes="[10, 20, 50, 100]"
                    :page-size="search.size" layout="total, sizes, prev, pager, next, jumper" :total="total"
                    @size-change="handleSizeChange" @current-change="handlePageChange">
                </el-pagination>
            </div>
        </el-card>

        <el-dialog :close-on-click-modal="false" :title="punishment.id ? '编辑惩罚' : '新增惩罚'"
            v-model="punishmentFormVisible" width="640px">
            <PunishmentForm :init-punishment="punishment" @success="onSuccess" />
        </el-dialog>
    </div>
</template>

<script setup>
import SearchForm from '@/components/SearchForm.vue'
import TableList from '@/components/TableList.vue'
import { onMounted, reactive, ref } from 'vue'
import { punishmentEnum } from '@/utils/enum'
import PunishmentForm from './form/PunishmentForm.vue'

const searchFormFields = [
    {
        type: 'select',
        label: '类型',
        name: 'type',
        placeholder: '请选择惩罚类型',
        multiple: true,
        options: punishmentEnum,
    },
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
    getPunishmentList()
}

const onAdd = () => {
    punishmentFormVisible.value = true
}

const batchCancelPunishment = () => { }

const remoteSearchUser = () => {}
const users = ref([])

const getPunishmentList = () => {
    loading.value = true
    setTimeout(() => {
        loading.value = false
        punishments.value = []
        total.value = 15
    }, 2000);
}

const tableListFields = [
    // { prop: 'id', label: 'ID', width: 80, type: 'number', fixed: 'left' },
    {
        prop: 'enable',
        label: '启用处罚',
        width: 80,
        type: 'bool',
    },
    {
        prop: 'type',
        label: '类型',
        minWidth: 120,
        type: 'enum',
        enum: punishmentEnum,
    },
    {
        prop: 'user_html',
        label: '用户',
        minWidth: 150,
        type: 'html',
    },
    { prop: 'end_time', label: '截止时间', width: 160, type: 'datetime' },
    { prop: 'reason', label: '原因', minWidth: 250 },
    { prop: 'remark', label: '备注', minWidth: 250 },
    { prop: 'created_at', label: '创建时间', width: 160, type: 'datetime' },
    { prop: 'updated_at', label: '更新时间', width: 160, type: 'datetime' },
]
const punishments = ref([])
const total = ref(0)

const selectRow = (row) => {
    console.log(row)
}
const editRow = (row) => {
    punishmentFormVisible.value = true
    getPunishment(row.id)
}

const handleSizeChange = (pageSize) => {
    search.pageSize = pageSize
    onSearch()
}
const handlePageChange = (page) => {
    search.currentPage = page
    onSearch()
}

const punishment = reactive({})
const punishmentFormVisible = ref(false)

const getPunishment = (id) => {
    console.log(id)
}

const onSuccess = () => {
    punishmentFormVisible.value = false
    getPunishmentList()
}


onMounted(() => {
    getPunishmentList()
})
</script>