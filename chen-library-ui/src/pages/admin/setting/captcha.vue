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
                "id": 14,
                "label": "验证码高度",
                "name": "height",
                "value": "60",
                "placeholder": "请输入验证码高度，默认为60",
                "input_type": "number",
                "category": "captcha",
                "sort": 13,
                "created_at": "2023-01-04T06:45:26Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 15,
                "label": "验证码宽度",
                "name": "width",
                "value": "240",
                "placeholder": "请输入验证码宽度，默认为240",
                "input_type": "number",
                "category": "captcha",
                "sort": 14,
                "created_at": "2023-01-04T06:45:26Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 16,
                "label": "验证码长度",
                "name": "length",
                "value": "5",
                "placeholder": "请输入验证码长度，默认为6",
                "input_type": "number",
                "category": "captcha",
                "sort": 15,
                "created_at": "2023-01-04T06:45:26Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 17,
                "label": "验证码类型",
                "name": "type",
                "value": "digit",
                "placeholder": "请选择验证码类型，默认为数字",
                "input_type": "select",
                "category": "captcha",
                "sort": 16,
                "options": "string:字符串\nmath:算术\ndigit:数字\naudio:语音",
                "created_at": "2023-01-04T06:45:26Z",
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