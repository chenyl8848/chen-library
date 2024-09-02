<template>
    <div>
        <el-card shadow="never">
            <SearchForm :fields="searchFormFields" :loading="loading" :show-add="true" :show-delete="true"
                :disabled-delete="selectedRow.length === 0" :default-search="search" @onAdd="onAdd" @onSearch="onSearch"
                @onDelete="onBatchDelete" />
        </el-card>
        <el-card shadow="never" class="mgt-20px">
            <TableList :loading="loading" :table-data="banners" :fields="tableListFields" :show-actions="true"
                :show-view="false" :show-edit="true" :show-delete="true" :show-select="true" :actions-min-width="80"
                @selectRow="selectRow" @editRow="editRow" @deleteRow="deleteRow" />
            <div class="mgt-20px text-right">
                <el-pagination background :current-page="search.page" :page-sizes="[10, 20, 50, 100]"
                    :page-size="search.size" layout="total, sizes, prev, pager, next, jumper" :total="total"
                    @size-change="handleSizeChange" @current-change="handlePageChange">
                </el-pagination>
            </div>
        </el-card>

        <el-dialog :close-on-click-modal="false" width="640px" :title="banner.id > 0 ? '编辑轮播图' : '新增轮播图'"
            v-model="bannerFormVisible">
            <BannerForm :init-banner="banner" @success="onSuccess" />
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import BannerForm from './form/BannerForm.vue'
import SearchForm from '@/components/SearchForm.vue'
import TableList from '@/components/TableList.vue'
import { bannerTypeEnum } from '@/utils/enum'

const searchFormFields = [
    {
        type: 'text',
        label: '关键字',
        name: 'wd',
        placeholder: '请输入关键字',
    },
    {
        type: 'select',
        label: '类型',
        name: 'type',
        placeholder: '请选择轮播图类型',
        multiple: true,
        options: bannerTypeEnum,
    },
    {
        type: 'select',
        label: '状态',
        name: 'enable',
        placeholder: '是否启用',
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
    getBannerList()
}

const onAdd = () => {
    bannerFormVisible.value = true
}

const onBatchDelete = () => {

}

const getBannerList = () => {
    loading.value = true
    setTimeout(() => {
        loading.value = false
        banners.value = []
        total.value = 15
    }, 2000);
}

const tableListFields = [
    // { prop: 'id', label: 'ID', width: 80, type: 'number' },
    { prop: 'path', label: '轮播图', width: 360, type: 'image' },
    {
        prop: 'type',
        label: '类型',
        width: 120,
        type: 'enum',
        enum: bannerTypeEnum,
    },
    {
        prop: 'enable',
        label: '是否启用',
        width: 80,
        type: 'bool',
    },
    { prop: 'title', label: '名称', minWidth: 150 },
    { prop: 'url', label: '链接', minWidth: 150, type: 'link' },
    { prop: 'sort', label: '排序', width: 80, type: 'number' },
    { prop: 'description', label: '备注', width: 200 },
    { prop: 'created_at', label: '创建时间', width: 160, type: 'datetime' },
    { prop: 'updated_at', label: '更新时间', width: 160, type: 'datetime' },
]
const banners = ref([])
const total = ref(0)

const selectRow = (row) => {
    console.log(row)
}
const editRow = (row) => {
    bannerFormVisible.value = true
    getBanner(row.id)
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

const banner = reactive({})
const bannerFormVisible = ref(false)

const getBanner = (id) => {
    console.log(id)
}

const onSuccess = () => {
    bannerFormVisible.value = false
    getBannerList()
}


onMounted(() => {
    getBannerList()
})
</script>