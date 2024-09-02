<template>
    <el-card shadow="never" v-loading="loading">
        <SettingForm v-if="settings.length > 0" :init-settings="settings"></SettingForm>
    </el-card>
</template>

<script setup>
import SettingForm from '@/components/SettingForm.vue'
import { onMounted, ref } from 'vue'

const loading = ref(false)
const settings = ref([])

const loadSetting = () => {
    loading.value = true
    setTimeout(() => {
        settings.value = [
            {
                "id": 53,
                "label": "是否启用邮件服务",
                "name": "enable",
                "value": "true",
                "placeholder": "邮件服务，用于找回账户密码",
                "input_type": "switch",
                "category": "email",
                "sort": 10,
                "created_at": "2023-01-16T03:18:34Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 54,
                "label": "SMTP 服务器地址",
                "name": "host",
                "value": "smtpdm.aliyun.com",
                "placeholder": "如：smtp.exmail.com",
                "input_type": "text",
                "category": "email",
                "sort": 20,
                "created_at": "2023-01-16T03:18:34Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 55,
                "label": "SMTP 服务器端口",
                "name": "port",
                "value": "80",
                "placeholder": "如：465",
                "input_type": "number",
                "category": "email",
                "sort": 30,
                "created_at": "2023-01-16T03:18:34Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 56,
                "label": "是否启用TLS",
                "name": "is_tls",
                "value": "true",
                "placeholder": "如果是TLS端口，请启用",
                "input_type": "switch",
                "category": "email",
                "sort": 40,
                "created_at": "2023-01-16T03:18:34Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 57,
                "label": "发件人名称",
                "name": "from_name",
                "value": "魔豆文库",
                "placeholder": "请输入您要展示的发件人名称",
                "input_type": "text",
                "category": "email",
                "sort": 50,
                "created_at": "2023-01-16T03:18:34Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 58,
                "label": "SMTP 账号",
                "name": "username",
                "value": "admin@bookstack.cn",
                "placeholder": "请输入您的邮箱账户",
                "input_type": "text",
                "category": "email",
                "sort": 60,
                "created_at": "2023-01-16T03:18:34Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 59,
                "label": "SMTP 密码",
                "name": "password",
                "value": "******",
                "placeholder": "请输入您的邮箱密码",
                "input_type": "password",
                "category": "email",
                "sort": 70,
                "created_at": "2023-01-16T03:18:34Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 60,
                "label": "邮件有效期",
                "name": "duration",
                "value": "30",
                "placeholder": "找回密码时链接有效期，默认为30，表示30分钟",
                "input_type": "number",
                "category": "email",
                "sort": 80,
                "created_at": "2023-01-16T03:18:34Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 61,
                "label": "签名密钥",
                "name": "secret",
                "value": "moredoc",
                "placeholder": "找回密码链接签名密钥",
                "input_type": "text",
                "category": "email",
                "sort": 80,
                "created_at": "2023-01-16T03:18:34Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 62,
                "label": "测试邮箱",
                "name": "test_email",
                "value": "truthhun@qq.com",
                "placeholder": "用于每次变更配置时保存发送测试邮件",
                "input_type": "text",
                "category": "email",
                "sort": 90,
                "created_at": "2023-01-16T03:18:34Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            }
        ]
        loading.value = false
    }, 2000);
}

onMounted(() => {
    loadSetting()
})

</script>