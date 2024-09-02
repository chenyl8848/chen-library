<template>
    <div>
        <el-card shadow="never">
            <SearchForm :fields="searchFormFields" :loading="loading" :show-add="true" :show-delete="true"
                :disabled-delete="selectedRow.length === 0" :default-search="search" @onSearch="onSearch" @onAdd="onAdd"
                @onDelete="onBatchDelete" />
        </el-card>
        <el-card shadow="never" class="mgt-20px">
            <TableList :loading="loading" :table-data="advertisements" :fields="tableListFields" :show-actions="true"
                :show-view="false" :show-edit="true" :show-delete="true" :show-select="true" @selectRow="selectRow"
                @editRow="editRow" @deleteRow="deleteRow" />
            <div class="mgt-20px text-right">
                <el-pagination background :current-page="search.page" :page-sizes="[10, 20, 50, 100]"
                    :page-size="search.size" layout="total, sizes, prev, pager, next, jumper" :total="total"
                    @size-change="handleSizeChange" @current-change="handlePageChange">
                </el-pagination>
            </div>
        </el-card>
        <el-dialog :close-on-click-modal="false" :title="advertisement.id ? '编辑广告' : '新增广告'"
            v-model="advertisementFormVisible" width="640px">
            <AdvertisementForm :init-advertisement="advertisement" @success="onSuccess" />
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import SearchForm from '@/components/SearchForm.vue'
import TableList from '@/components/TableList.vue'
import AdvertisementForm from './form/AdvertisementForm.vue'
import { advertisementPositionEnum } from '@/utils/enum'

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
    {
        type: 'select',
        label: '位置',
        name: 'position',
        placeholder: '请选择位置',
        multiple: true,
        options: advertisementPositionEnum,
    }
]
const loading = ref(false)
const selectedRow = ref([])
const search = reactive({
    currentPage: 1,
    pageSize: 10
})

const onSearch = () => {
    getAdvertisementList()
}

const onAdd = () => {
    advertisementFormVisible.value = true
}

const onBatchDelete = () => {

}

const getAdvertisementList = () => {
    loading.value = true
    setTimeout(() => {
        loading.value = false
        advertisements.value = []
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
          prop: 'position', label: '广告位', width: 200,
          type: 'enum',
          enum: advertisementPositionEnum,
        },
        {
          prop: 'title',
          label: '广告名称',
          minWidth: 150,
        },
        { prop: 'remark', label: '广告备注', minWidth: 250 },
        // { prop: 'content', label: '广告代码', minWidth:250 },
        { prop: 'start_time', label: '开始时间', width: 160, type: 'datetime' },
        { prop: 'end_time', label: '截止时间', width: 160, type: 'datetime' },
        { prop: 'created_at', label: '创建时间', width: 160, type: 'datetime' },
        { prop: 'updated_at', label: '更新时间', width: 160, type: 'datetime' },
      ]
const advertisements = ref([])
const total = ref(0)

const selectRow = (row) => {
    console.log(row)
}
const editRow = (row) => {
    advertisementFormVisible.value = true
    getAdvertisement(row.id)
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

const advertisement = reactive({})
const advertisementFormVisible = ref(false)

const getAdvertisement = (id) => {
    console.log(id)
}

const onSuccess = () => {
    advertisementFormVisible.value = false
    getAdvertisementList()
}


onMounted(() => {
    getAdvertisementList()
})
</script>