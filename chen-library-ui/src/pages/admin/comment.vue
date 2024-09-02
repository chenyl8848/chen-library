<template>
    <div>
        <el-card shadow="never">
            <SearchForm :fields="searchFormFields" :loading="loading" :show-add="false" :show-delete="true"
                :disabled-delete="selectedRow.length === 0" :default-search="search" @onSearch="onSearch"
                @onDelete="onBatchDelete">
                <template #buttons>
                    <el-dropdown :disabled="selectedRow.length === 0" @command="checkComment" class="mgl-10px">
                        <el-button type="primary">
                            批量审批
                            <el-icon>
                                <ArrowDown />
                            </el-icon>
                        </el-button>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item :command="1">审核通过</el-dropdown-item>
                                <el-dropdown-item :command="2">审核拒绝</el-dropdown-item>
                                <el-dropdown-item :command="0">变为待审</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </template>
            </SearchForm>
        </el-card>
        <el-card shadow="never" class="mgt-20px">
            <TableList :loading="loading" :table-data="comments" :fields="tableListFields" :show-actions="true"
                :show-view="false" :show-edit="true" :show-delete="true" :show-select="true" :actions-min-width="160"
                @selectRow="selectRow" @editRow="editRow" @deleteRow="deleteRow" />
            <div class="mgt-20px text-right">
                <el-pagination background :current-page="search.page" :page-sizes="[10, 20, 50, 100]"
                    :page-size="search.size" layout="total, sizes, prev, pager, next, jumper" :total="total"
                    @size-change="handleSizeChange" @current-change="handlePageChange">
                </el-pagination>
            </div>
        </el-card>
        <el-dialog :close-on-click-modal="false" title="评论编审" v-model="commentFormVisible" width="640px">
            <CommentCheckForm :init-comment="comment" @success="onSuccess" />
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import SearchForm from '@/components/SearchForm.vue'
import TableList from '@/components/TableList.vue'
import { categoryTypeEnum } from '@/utils/enum'
import CommentCheckForm from './form/CommentCheckForm.vue'

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
        placeholder: '请选择评论类型',
        multiple: true,
        options: categoryTypeEnum,
    },
    {
        type: 'select',
        label: '状态',
        name: 'status',
        placeholder: '请选择状态',
        multiple: true,
        options: [
            { label: '审核拒绝', value: 2 },
            { label: '审核通过', value: 1 },
            { label: '待审核', value: 0 },
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
    getCommentList()
}

const onBatchDelete = () => {

}

const checkComment = (command) => {
    console.log(command)
}

const getCommentList = () => {
    loading.value = true
    setTimeout(() => {
        loading.value = false
        comments.value = []
        total.value = 15
    }, 2000);
}

const tableListFields = [
    // { prop: 'id', label: 'ID', width: 80, type: 'number', fixed: 'left' },
    {
        prop: 'status',
        label: '状态',
        width: 80,
        type: 'enum',
        fixed: 'left',
        enum: {
            2: { label: '审核拒绝', value: 2, type: 'danger' },
            1: { label: '审核通过', value: 1, type: 'success' },
            0: { label: '待审核', value: 0 },
        },
    },
    {
        prop: 'type',
        width: 80,
        label: '类型',
        type: 'enum',
        enum: categoryTypeEnum,
    },
    {
        prop: 'document_title_html',
        label: '标题',
        minWidth: 150,
        type: 'html',
    },
    { prop: 'content', label: '评论内容', minWidth: 150 },
    { prop: 'username_html', label: '评论人', minWidth: 150, type: 'html' },
    { prop: 'created_at', label: '创建时间', width: 160, type: 'datetime' },
    { prop: 'updated_at', label: '更新时间', width: 160, type: 'datetime' },
]
const comments = ref([])
const total = ref(0)

const selectRow = (row) => {
    console.log(row)
}
const editRow = (row) => {
    commentFormVisible.value = true
    getComment(row.id)
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

const comment = reactive({})
const commentFormVisible = ref(false)

const getComment = (id) => {
    console.log(id)
}

const onSuccess = () => {
    commentFormVisible.value = false
    getCommentList()
}

onMounted(() => {
    getCommentList()
})
</script>