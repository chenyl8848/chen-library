<template>
    <div class="language-form">
        <el-form ref="languageForm" label-position="top" label-width="80px" :model="language">
            <el-form-item label="语言名称" prop="language" :rules="[
                { required: true, trigger: 'blur', message: '请输入语言名称' },
            ]">
                <el-input v-model="language.language" placeholder="请输入语言名称，如：中文(简体)" clearable></el-input>
            </el-form-item>
            <el-form-item label="语言代码" prop="code" :rules="[
                {
                    required: true,
                    trigger: 'blur',
                    message: '请输入语言代码',
                },
                {
                    //最大 8个字符长度
                    max: 8,
                    message: '最大8个字符长度',
                    trigger: 'blur',
                },
            ]">
                <el-input v-model="language.code" placeholder="请输入语言代码，如：zh-CN。建议遵循相应ISO标准" :disabled="language.id > 0"
                    clearable></el-input>
            </el-form-item>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="排序(值越大越靠前)">
                        <el-input-number v-model.number="language.sort" clearable :min="0" :step="1"
                            placeholder="请输入排序值"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="是否启用">
                        <el-switch v-model="language.enable" style="display: block" active-color="#13ce66"
                            inactive-color="#ff4949" active-text="是" inactive-text="否">
                        </el-switch> </el-form-item></el-col>
            </el-row>
            <el-form-item>
                <el-button type="primary" class="btn-block" icon="Check" :loading="loading"
                    @click="onSubmit(languageForm)">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { defineProps, reactive, ref, defineEmits, watch } from 'vue'

const $props = defineProps({
    initLanguage: {
        type: Object,
        default: () => {
            return {
                language: '',
                code: '',
                sort: 0,
                enable: ''
            }
        }
    }
})


const languageForm = ref()
let language = reactive({
    language: '',
    code: '',
    sort: 0,
    enable: ''
})
const loading = ref(false)

watch(() => $props.initLanguage, (newValue) => {
    language = reactive({ ...newValue })
}, { immediate: true })

const $emits = defineEmits([['success']])

const onSubmit = async (formRef) => {
    await formRef.validate((valid, fields) => {
        if (valid) {
            console.log("dddddddddddddd")
            loading.value = true
            if (language.id && language.id > 0) {
                // 修改
                formRef.resetFields()
                $emits('success')
            } else {
                // 新增
                formRef.resetFields()
                $emits('success')
            }
            loading.value = false
        } else {
            console.log('error submit!', fields)
        }
    })
}
</script>

<style lang="scss" scoped></style>