<template>
    <div class="profile-form">
        <el-form ref="profile" label-width="80px" :model="profile">
            <el-form-item label="用户名">
                <el-input v-model="profile.username" placeholder="请输入您的登录用户名" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" prop="realname">
                <el-input v-model="profile.realname" clearable></el-input>
            </el-form-item>
            <el-form-item label="身份证号">
                <el-input v-model="profile.identity" clearable></el-input>
            </el-form-item>
            <el-form-item label="联系邮箱" prop="email" :rules="[
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
                <el-input v-model="profile.signature" type="textarea" clearable :rows="3"></el-input>
            </el-form-item>

            <el-form-item class="btn-setprofile">
                <el-button type="primary" class="btn-block" :icon="Check" @click="setProfile">修改资料</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { Check } from '@element-plus/icons-vue'
import { reactive } from 'vue';
import useUserStore from '@/store/module/user'
const userStore = useUserStore()

const profile = reactive({...userStore.user})
const setProfile = () => {

}
</script>

<style lang="scss">
.profile-form {
    .btn-setprofile {
        .el-form-item__content {
            margin-left: 0 !important;
        }
    }
}
</style>