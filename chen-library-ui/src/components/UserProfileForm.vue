<template>
    <div class="user-profile-form">
        <el-form label-position="left" label-width="80px" :model="profile" ref="profileForm">
            <el-form-item label="用户名">
                <el-input v-model="profile.username" placeholder="请输入您的登录用户名" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" prop="realname">
                <el-input v-model="profile.realname" clearable></el-input>
            </el-form-item>
            <el-form-item label="身份证号">
                <el-input v-model="profile.identity" clearable></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱" prop="email" :rules="[
                { required: true, message: '请输入电子邮箱', trigger: 'blur' },
                { type: 'email', message: '请输入正确的电子邮箱', trigger: 'blur' },
            ]">
                <el-input v-model="profile.email" clearable></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
                <el-input v-model="profile.mobile" clearable></el-input>
            </el-form-item>
            <el-form-item label="联系地址">
                <el-input v-model="profile.address" clearable type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="个性签名">
                <el-input v-model="profile.signature" type="textarea" clearable :rows="5"></el-input>
            </el-form-item>
            <el-form-item v-if="isAdmin" label="用户备注">
                <el-input v-model="profile.remark" type="textarea" placeholder="管理员可以在此处添加对用户的备注信息，备注只有管理员可见" clearable
                    :rows="5"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="btn-block" icon="Check" @click="onSubmit(profileForm)"
                    v-loading="loading">修改资料</el-button>
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

            }
        }
    }
})

const profileForm = ref()
let profile = reactive({
    username: '',
    realname: '',
    identity: '',
    email: '',
    mobile: '',
    address: '',
    signature: '',
    remark: ''
})

watch(() => $props.initUser, (newValue) => {
    profile = reactive({ ...newValue })
}, { immediate: true })

const $emits = defineEmits(['success'])
const loading = ref(false)
const onSubmit = async (formRef) => {
    await formRef.validate((valid, fields) => {
        if (valid) {
            console.log("dddddddddddddd")
            loading.value = true
            if (profile.id && profile.id > 0) {
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