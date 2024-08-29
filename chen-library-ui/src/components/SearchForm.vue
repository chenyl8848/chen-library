<template>
    <div class="search-form">
        <el-row>
            <el-button type="primary" icon="Plus" @click="onAdd" v-if="showAdd">新增</el-button>
            <el-button type="danger" icon="Delete" @click="onDelete" v-if="showDelete" :disabled="disabledDelete">批量删除</el-button>
            <slot name="buttons"></slot>
        </el-row>
        <el-row style="margin-top: 20px;">
            <el-col :span="21">
                <el-form :model="search" ref="searchForm">
                    <el-row :gutter="20">
                        <el-col :span="5" v-for="(field, index) in fields" :key="index">
                            <el-form-item :label="field.label">
                                <el-input v-if="field.type == 'text'" v-model="search[field.name]"
                                    :placeholder="field.placeholder" clearable @keydown.enter="onSearch"></el-input>
                                <el-select v-else-if="field.type == 'select'" v-model="search[field.name]"
                                    :placeholder="field.placeholder" :multiple="field.multiple" clearable filterable>
                                    <el-option v-for="item in field.options" :key="`${field.name}_option_${item.value}`"
                                        :label="item.label" :value="item.value"></el-option>
                                </el-select>
                                <el-cascader v-else-if="field.type == 'cascader'" v-model="search[field.name]"
                                    :options="field.trees || []" :filterable="true" :props="field.props || {
                                        checkStrictly: true,
                                        expandTrigger: 'hover',
                                        label: 'title',
                                        value: 'id',
                                    }
                                        " clearable :placeholder="field.placeholder"></el-cascader>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <slot name="inputs"></slot>
                        </el-col>
                    </el-row>
                </el-form>
            </el-col>
            <el-col :span="3">
                <el-button type="primary" icon="Search" @click="onSearch" :loading="loading">查询</el-button>
                <el-button type="success" icon="RefreshRight" @click="onReset(searchForm)">重置</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { defineProps, reactive, watch, defineEmits, ref, nextTick } from 'vue'

const $props = defineProps({
    showAdd: {
        type: Boolean,
        default: true
    },
    showDelete: {
        type: Boolean,
        default: true
    },
    disabledDelete: {
        type: Boolean,
        default: true
    },
    loading: {
        type: Boolean,
        default: false
    },
    fields: {
        type: Array,
        default: () => []
    },
    defaultSearch: {
        type: Object,
        default: () => { }
    }
})

const $emits = defineEmits(['onAdd', 'onDelete', 'onSearch'])

const onAdd = () => {
    $emits('onAdd')
}

const onDelete = () => {
    $emits('onDelete')
}

const searchForm = ref()
let search = reactive({

})

watch(() => $props.defaultSearch, (newVal) => {
    // 逻辑
    search = reactive({ ...newVal })
}, { deep: true, immediate: true })


const onSearch = () => {
    $emits('onSearch', search)
}

const onReset = (formRef) => {
    console.log(formRef)
    if (!formRef) return
    nextTick(() => {
        // TODO 
        Object.keys(search).forEach(item => {
            search[item] = null
        });
        formRef.resetFields()
    })
}
</script>

<style lang="scss" scoped>
.search-form {}
</style>