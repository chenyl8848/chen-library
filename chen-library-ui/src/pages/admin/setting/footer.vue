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
                "id": 27,
                "label": "关于我们",
                "name": "about",
                "value": "/article/about",
                "placeholder": "请输入关于我们的链接地址，留空表示不显示",
                "input_type": "text",
                "category": "footer",
                "sort": 24,
                "created_at": "2023-01-04T06:45:26Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 28,
                "label": "联系我们",
                "name": "contact",
                "value": "/article/contact",
                "placeholder": "请输入联系我们的链接地址，留空表示不显示",
                "input_type": "text",
                "category": "footer",
                "sort": 25,
                "created_at": "2023-01-04T06:45:26Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 29,
                "label": "文库协议",
                "name": "agreement",
                "value": "/article/agreement",
                "placeholder": "请输入文库协议的链接地址，留空表示不显示",
                "input_type": "text",
                "category": "footer",
                "sort": 26,
                "created_at": "2023-01-04T06:45:27Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 30,
                "label": "免责声明",
                "name": "copyright",
                "value": "/article/copyright",
                "placeholder": "请输入免责声明的链接地址，留空表示不显示",
                "input_type": "text",
                "category": "footer",
                "sort": 27,
                "created_at": "2023-01-04T06:45:27Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 31,
                "label": "意见反馈",
                "name": "feedback",
                "value": "/article/feedback",
                "placeholder": "请输入意见反馈的链接地址，留空表示不显示",
                "input_type": "text",
                "category": "footer",
                "sort": 28,
                "created_at": "2023-01-04T06:45:27Z",
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