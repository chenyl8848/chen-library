<template>
    <div class="permission-form">
        <el-form ref="permissionForm" label-position="top" label-width="80px" :model="permission">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="Method" prop="method">
                        <el-input v-model="permission.method"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="18">
                    <el-form-item label="API" prop="path">
                        <el-input v-model="permission.path"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="名称" prop="title" :rules="[
                { required: true, trigger: 'blur', message: '请输入权限名称' },
            ]">
                <el-input v-model="permission.title" placeholder="请输入权限名称" clearable></el-input>
            </el-form-item>
            <el-form-item label="描述">
                <el-input v-model="permission.description" type="textarea" rows="5"
                    placeholder="请输入权限相关描述或备注"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="btn-block" icon="Check" :loading="loading"
                    @click="onSubmit(permissionForm)">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { defineProps, reactive, ref, defineEmits, watch } from 'vue'

const $props = defineProps({
    initPermission: {
        type: Object,
        default: () => {
            return {
                id: 0,
                email: '',
                username: '',
                password: '',
                group_id: [],
            }
        }
    }
})

const permissionForm = ref()
let permission = reactive({
    username: '',
    password: '',
    email: '',
    group_id: [],
})

watch(() => $props.initRole, (newValue) => {
    permission = reactive({ ...newValue })
}, { immediate: true })

const $emits = defineEmits(['success'])
const loading = ref(false)
const onSubmit = async (formRef) => {
    await formRef.validate((valid, fields) => {
        if (valid) {
            loading.value = true
            if (permission.id && permission.id > 0) {
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