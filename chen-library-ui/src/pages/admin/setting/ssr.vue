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
                "id": 240,
                "label": "是否启用SSR",
                "name": "enable",
                "value": "false",
                "placeholder": "是否启用SSR服务",
                "input_type": "switch",
                "category": "ssr",
                "sort": 10,
                "created_at": "2024-05-08T01:19:36Z",
                "updated_at": "2024-09-01T21:00:24Z",
                "col_num": 24
            },
            {
                "id": 241,
                "label": "SSR服务地址",
                "name": "addr",
                "placeholder": "如：http://127.0.0.1:6060",
                "input_type": "text",
                "category": "ssr",
                "sort": 20,
                "created_at": "2024-05-08T01:19:36Z",
                "updated_at": "2024-09-01T21:00:24Z",
                "col_num": 24
            },
            {
                "id": 242,
                "label": "针对哪些客户端有效",
                "name": "useragent",
                "value": "googlebot\nbaiduspider\nbingbot",
                "placeholder": "请输入客户端关键字，多个请换行输入。（建议按默认的即可）",
                "input_type": "textarea",
                "category": "ssr",
                "sort": 30,
                "created_at": "2024-05-08T01:19:36Z",
                "updated_at": "2024-09-01T21:00:24Z",
                "col_num": 24
            },
            {
                "id": 243,
                "label": "SSR项目路径",
                "name": "folder",
                "placeholder": "如果您未使用pm2等来自行启动SSR项目，则在此次配置项目路径，以便文库程序调用指令启动，否则请留空",
                "input_type": "text",
                "category": "ssr",
                "sort": 50,
                "created_at": "2024-05-08T01:19:36Z",
                "updated_at": "2024-09-01T21:00:24Z",
                "col_num": 24
            },
            {
                "id": 244,
                "label": "首页缓存时间",
                "name": "cache_home",
                "value": "1",
                "placeholder": "首页SSR缓存时间，单位为天，默认为1天。0表示不启动首页SSR",
                "input_type": "number",
                "category": "ssr",
                "sort": 60,
                "created_at": "2024-05-08T01:19:36Z",
                "updated_at": "2024-09-01T21:00:24Z",
                "col_num": 12
            },
            {
                "id": 245,
                "label": "文章缓存时间",
                "name": "cache_article",
                "value": "2",
                "placeholder": "文章SSR缓存时间，单位为天，默认为2天。0表示不启动文章页面SSR",
                "input_type": "number",
                "category": "ssr",
                "sort": 70,
                "created_at": "2024-05-08T01:19:36Z",
                "updated_at": "2024-09-01T21:00:24Z",
                "col_num": 12
            },
            {
                "id": 246,
                "label": "文档缓存时间",
                "name": "cache_document",
                "value": "2",
                "placeholder": "文档SSR缓存时间，单位为天，默认为2天。0表示不启动文档页面SSR",
                "input_type": "number",
                "category": "ssr",
                "sort": 80,
                "created_at": "2024-05-08T01:19:36Z",
                "updated_at": "2024-09-01T21:00:24Z",
                "col_num": 12
            },
            {
                "id": 247,
                "label": "分类缓存时间",
                "name": "cache_category",
                "value": "5",
                "placeholder": "分类SSR缓存时间，单位为天，默认为5天。0表示不启动分类页面SSR",
                "input_type": "number",
                "category": "ssr",
                "sort": 90,
                "created_at": "2024-05-08T01:19:36Z",
                "updated_at": "2024-09-01T21:00:24Z",
                "col_num": 12
            },
            {
                "id": 248,
                "label": "用户主页缓存时间",
                "name": "cache_user",
                "value": "5",
                "placeholder": "用户主页缓存时间，单位为天，默认为5天。0表示不启动用户页面SSR",
                "input_type": "number",
                "category": "ssr",
                "sort": 100,
                "created_at": "2024-05-08T01:19:36Z",
                "updated_at": "2024-09-01T21:00:24Z",
                "col_num": 12
            },
            {
                "id": 249,
                "label": "搜索结果缓存时间",
                "name": "cache_search",
                "value": "7",
                "placeholder": "搜索结果缓存时间，单位为天，默认为7天。0表示不启动搜索结果页面SSR",
                "input_type": "number",
                "category": "ssr",
                "sort": 110,
                "created_at": "2024-05-08T01:19:36Z",
                "updated_at": "2024-09-01T21:00:24Z",
                "col_num": 12
            }
        ]
        loading.value = false
    }, 2000);
}

onMounted(() => {
    loadSetting()
})

</script>