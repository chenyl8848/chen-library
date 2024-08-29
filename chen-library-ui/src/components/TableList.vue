<template>
    <div class="table-list">
        <el-table v-loading="loading" :data="tableData" style="width: 100%" row-key="id" :tree-props="treeProps"
            @selection-change="selectRow">
            <el-table-column v-if="showSelect" type="selection" width="55" :selectable="selectable">
            </el-table-column>
            <el-table-column v-for="item in fields" :key="`field-${item.prop}`" :prop="item.prop" :label="item.label"
                :width="item.width" :min-width="item.minWidth" :fixed="item.fixed" show-overflow-tooltip>
                <template #default="scope">
                    <!-- 头像 -->
                    <el-avatar v-if="item.type === 'avatar'" :size="45" :src="scope.row[item.prop]">
                        <img src="/static/images/blank.png" />
                    </el-avatar>
                    <!-- 数字 -->
                    <span v-else-if="item.type === 'number'">{{
                        scope.row[item.prop] || '0'
                        }}</span>
                    <el-tag v-else-if="item.type === 'bool'" :type="scope.row[item.prop] ? 'success' : 'danger'"
                        effect="dark">
                        {{ scope.row[item.prop] ? '是' : '否' }}</el-tag>
                    <span v-else-if="item.type === 'bytes'">
                        {{ formatBytes(scope.row[item.prop]) }}
                    </span>
                    <!-- 枚举，键为数字 -->
                    <span v-else-if="item.type === 'enum'">
                        <el-tag v-if="item.enum[scope.row[item.prop] || 0]"
                            :type="item.enum[scope.row[item.prop] || 0].type || 'info'"
                            :effect="item.enum[scope.row[item.prop] || 0].effect || 'dark'">
                            {{ item.enum[scope.row[item.prop] || 0].label }}
                        </el-tag>
                        <span v-else>{{ scope.row[item.prop] || '-' }}</span>
                    </span>
                    <span v-else-if="item.type === 'datetime'">
                        {{ formatDateTime(scope.row[item.prop]) || '0000-00-00 00:00:00' }}
                    </span>
                    <span v-else-if="item.type === 'color'">
                        <span :style="{ color: scope.row[item.prop] }">{{
                            scope.row[item.prop] || '-'
                            }}</span>
                    </span>
                    <span v-else-if="['link', 'url'].includes(item.type)">
                        <a :href="scope.row[item.prop]" target="_blank">
                            <i class="el-icon-link"></i> {{ scope.row[item.prop] }}</a>
                    </span>
                    <span v-else-if="item.type === 'image'">
                        <!-- 因为table cell有个左右的10px内边距，所以需要调整下 -->
                        <UploadImage v-if="scope.row[item.prop]" :disabled="true" :image="scope.row[item.prop]"
                            :width="item.width ? item.width + 'px' : 'auto'"
                            style="margin-left: -10px; margin-right: -10px" />
                        <span v-else>-</span>
                    </span>
                    <span v-else-if="item.type === 'array'">
                        <template v-if="scope.row[item.prop]">
                            <el-tag v-for="(value, idx) in scope.row[item.prop]" :key="item.prop + idx"
                                class="mgr-5px">{{ value }}</el-tag>
                        </template>
                        <template v-else>{{ scope.row[item.prop] || '-' }}</template>
                    </span>
                    <!-- 有层级的，用breadcrumb -->
                    <span v-else-if="item.type === 'breadcrumb'">
                        <template v-if="scope.row[item.prop]">
                            <el-breadcrumb separator-class="el-icon-arrow-right">
                                <el-breadcrumb-item v-for="(value, idx) in scope.row[item.prop]"
                                    :key="item.prop + idx">{{ value }}</el-breadcrumb-item>
                            </el-breadcrumb>
                        </template>
                        <template v-else>{{ scope.row[item.prop] || '-' }}</template>
                    </span>
                    <!-- 字符串。更多，则需要继续扩展 -->
                    <span v-else-if="item.type === 'html'">
                        <span v-html="scope.row[item.prop]"></span>
                    </span>
                    <span v-else>{{ scope.row[item.prop] || '-' }}</span>
                </template>
            </el-table-column>
            <el-table-column v-if="showActions || showView || showEdit || showDelete" fixed="right" label="操作"
                :min-width="actionsMinWidth" class="table-list-actions">
                <template #default="scope">
                    <slot :row="scope.row" name="actions"></slot>
                    <el-button v-if="showView" type="primary" link size="small" icon="View"
                        @click="viewRow(scope.row)">查看</el-button>
                    <el-button v-if="showEdit" type="primary" link size="small" icon="Edit"
                        @click="editRow(scope.row)">编辑</el-button>
                    <el-button v-if="showDelete" type="primary" link size="small" icon="Delete"
                        :disabled="scope.row.disableDelete" @click="deleteRow(scope.row)"
                        class="text-danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import UploadImage from './UploadImage.vue'
import { formatDateTime } from '@/utils/utils'

defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    // 每个field结构，包括：label、prop、width、min-width、fixed，还有type，其中type枚举包括：text、image、link、button、slot
    fields: {
        type: Array,
        default: () => [],
    },
    tableData: {
        type: Array,
        default: () => []
    },
    treeProps: {
        type: Object,
        default: () => { }
    },
    showSelect: {
        type: Boolean,
        default: true
    },
    actionsMinWidth: {
        type: Number,
        default: 180
    },
    showActions: {
        type: Boolean,
        default: true
    },
    showView: {
        type: Boolean,
        default: true
    },
    showEdit: {
        type: Boolean,
        default: true
    },
    showDelete: {
        type: Boolean,
        default: true
    },
})

const $emits = defineEmits(['selectRow', 'viewRow', 'editRow', 'deleteRow'])
const selectRow = (rows) => {
    $emits('selectRow', rows)
}

const selectable = (row) => {
    // 取反，禁止删除的行，不可选中
    return !row.disableDelete
}

const viewRow = (row) => {
    $emits('viewRow', row)
}
const editRow = (row) => {
    $emits('editRow', row)
}
const deleteRow = (row) => {
    $emits('deleteRow', row)
}
</script>

<style lang="scss">
.table-list {
    .el-button {
        margin-left: 0;
        margin-right: 10px;
    }

    .el-breadcrumb__separator[class*='icon'] {
        margin: 0;
    }
}
</style>