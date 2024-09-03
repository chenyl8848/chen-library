<template>
    <div class="password-form">
        <el-form ref="passwordForm" label-position="top" label-width="80px" :model="profile">
            <el-form-item label="用户名">
                <el-input v-model="profile.username" placeholder="请输入您的登录用户名" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="原密码" prop="old_password" :rules="[
                { required: true, trigger: 'blur', message: '请输入您的原密码' },
            ]">
                <el-input v-model="profile.old_password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="new_password" :rules="[
                { required: true, trigger: 'blur', message: '请输入您的新密码' },
            ]">
                <el-input v-model="profile.new_password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="repeat_password" :rules="[
                { required: true, trigger: 'blur', message: '请再次输入您的新密码' },
            ]">
                <el-input v-model="profile.repeat_password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="btn-block" icon="Check" @click="onsubmit(passwordForm)">修改密码</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { reactive, ref, defineEmits } from 'vue';

import useUserStore from '@/store/module/user'
const userStore = useUserStore()

const passwordForm = ref()
const profile = reactive({...userStore.user})
const $emits = defineEmits(['success'])
const onsubmit = async (formEl) => {
    await formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
            $emits('success')
        } else {
            console.log('error!')
        }
    })

} 
</script>

<style lang="scss">

</style>