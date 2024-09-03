<template>
    <div class="document-update-form">
        <el-form ref="documentRef" label-position="top" label-width="80px" :model="document" :rules="documentRules">
            <el-form-item label="名称" prop="title">
                <el-input v-model="document.title" placeholder="请输入文档名称"></el-input>
            </el-form-item>
            <el-row :gutter="20">
                <el-col :span="12" :xs="24">
                    <el-form-item label="分类" prop="categoryId">
                        <el-cascader v-model="document.categoryId" :options="categoryTrees.filter((item) => !item.type)"
                            :filterable="true" :props="{
                                checkStrictly: true,
                                expandTrigger: 'hover',
                                label: 'title',
                                value: 'id',
                            }" clearable placeholder="请选择文档分类"></el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span="12" :xs="24">
                    <el-form-item :label="`价格(${settingStore.system.credit_name || '魔豆'})`" prop="price">
                        <el-input-number v-model.number="document.price" placeholder="文档价格" clearable :min="0"
                            :step="1"></el-input-number> </el-form-item></el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col v-if="isAdmin" :span="12">
                    <el-form-item label="状态" prop="status" :rules="[
                        { required: true, message: '请选择文档状态', trigger: 'change' },
                    ]">
                        <el-select v-model="document.status" filterable placeholder="请选择文档状态">
                            <el-option v-for="item in documentStatusEnum" :key="`status-${item.value}`"
                                :value="item.value" :label="item.label" :disabled="item.disabled"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="语言" prop="language">
                        <el-select v-model="document.language" filterable clearable placeholder="请选择文档语言">
                            <el-option v-for="item in settingStore.language || []" :key="`language-${item.code}`"
                                :value="item.code" :label="item.language"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="关键字">
                <el-input v-model="document.keywords" placeholder="请输入文档关键字，多个关键字用英文逗号分隔"></el-input>
            </el-form-item>
            <el-form-item label="摘要">
                <el-input v-model="document.description" placeholder="请输入文档摘要" type="textarea" rows="4 "></el-input>
            </el-form-item>
            <el-form-item label="文档文本内容(一般无需编辑，当文档文本乱码时可以在此编辑修正)">
                <el-input v-model="document.content" placeholder="请输入文档文本内容" type="textarea" rows="8"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" class="btn-block" icon="Check" @click="updateDocument(documentRef)">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { defineProps, reactive, ref, watch, defineEmits } from 'vue'
import useSettingStore from '@/store/module/setting'
const settingStore = useSettingStore()
import { documentStatusEnum } from '@/utils/enum'

const $props = defineProps({
    // 是否是管理员。如果是管理员，则可以更新文档的状态，如禁用等
    isAdmin: {
        type: Boolean,
        default: () => false
    },
    // 文档分类
    categoryTrees: {
        type: Array,
        default: () => []
    },
    initDocument: {
        type: Object,
        default: () => {
            return {
                id: 0,
                title: '',
                keywords: '',
                description: '',
                categoryId: [],
                price: 0,
                status: 0,
            }
        }
    }
})

const documentRef = ref()
let document = reactive({
    title: 'fff',
    categoryId: [],
    price: 0,
    status: 0,
    language: '',
    keywords: '',
    description: '',
    content: ''
})

watch(() => $props.initDocument, (newVal) => {
    // 逻辑
    document = reactive({ price: 0, ...newVal })
},
    { deep: true, immediate: true })


const documentRules = reactive({
    title: [
        { required: true, message: '请输入文档名称', trigger: 'blur' }
    ],
    // categoryId: [
    //     { required: true, trigger: 'blur', message: '请选择文档分类' }
    // ],
})

const $emit = defineEmits(['success']) 
const updateDocument = async (formEl) => {
    await formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
            $emit("success")
        } else {
            console.log('error!')
        }
    })

} 
</script>

<style lang="scss" scoped>
.document-update-form {
    .el-select {
        width: 100%;
    }
}
</style>