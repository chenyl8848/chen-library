<template>
    <div class="user-form">
        <el-form ref="userForm" label-position="top" label-width="80px" :model="user">
            <el-form-item label="用户名" prop="username" :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]">
                <el-input v-model="user.username" placeholder="请输入用户名"
                    :disabled="user.id > 0 ? true : false"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" :rules="user.id > 0
                ? []
                : [{ required: true, message: '请输入用户密码', trigger: 'blur' }]
                ">
                <el-input v-model="user.password" :placeholder="user.id > 0 ? '输入密码表示修改用户密码' : '请输入用户密码'
                    " type="password" clearable></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email" :rules="[
                { required: true, message: '请输入邮箱', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
            ]">
                <el-input v-model="user.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="角色" prop="group_id" :rules="[{ required: true, message: '请选择角色', trigger: 'blur' }]">
                <el-select v-model="user.group_id" multiple filterable placeholder="请选择角色">
                    <el-option v-for="group in groups" :key="'group-' + group.id" :label="group.title"
                        :value="group.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="btn-block" icon="Check" @click="onSubmit(userForm)">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { defineProps, reactive, ref, defineEmits, watch } from 'vue'

const $props = defineProps({
    initUser: {
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
    },
    roles: {
        type: Array,
        default: () => []
    },
})

const userForm = ref()
let user = reactive({
    username: '',
    password: '',
    email: '',
    group_id: [],
})

watch(() => $props.initUser, (newValue) => {
    user = reactive({ ...newValue })
}, { immediate: true })

const $emits = defineEmits(['success'])
const loading = ref(false)
const onSubmit = async (formRef) => {
    await formRef.validate((valid, fields) => {
        if (valid) {
            loading.value = true
            if (user.id && user.id > 0) {
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