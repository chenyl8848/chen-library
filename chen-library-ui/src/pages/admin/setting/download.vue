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
                "id": 36,
                "label": "是否允许游客下载",
                "name": "enable_guest_download",
                "value": "false",
                "placeholder": "当前配置项已无效！用户下载文档需要购买并生成订单。",
                "input_type": "switch",
                "category": "download",
                "sort": 10,
                "created_at": "2023-01-04T06:45:27Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 37,
                "label": "购买文档免费下载时长",
                "name": "free_download_duration",
                "value": "0",
                "placeholder": "购买文档后多少天内允许免费重复下载，0表示不限时长",
                "input_type": "number",
                "category": "download",
                "sort": 20,
                "created_at": "2023-01-04T06:45:27Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 38,
                "label": "下载链接有效时长(秒)",
                "name": "url_duration",
                "value": "60",
                "placeholder": "生成文档下载链接后多少秒之后链接失效",
                "input_type": "number",
                "category": "download",
                "sort": 30,
                "created_at": "2023-01-04T06:45:27Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 39,
                "label": "允许登录用户每天下载次数",
                "name": "times_every_day",
                "value": "10000",
                "placeholder": "允许登录用户每天下载次数，0表示不允许下载",
                "input_type": "number",
                "category": "download",
                "sort": 40,
                "created_at": "2023-01-04T06:45:27Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 65,
                "label": "允许每个IP每天下载次数",
                "name": "times_every_ip",
                "value": "20",
                "placeholder": "允许每个IP每天下载的次数，0表示不允许下载（针对所有用户）",
                "input_type": "number",
                "category": "download",
                "sort": 41,
                "created_at": "2023-02-07T09:43:43Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 40,
                "label": "链接签名密钥",
                "name": "secret_key",
                "value": "moredoc",
                "placeholder": "链接签名密钥，用于加密下载链接",
                "input_type": "text",
                "category": "download",
                "sort": 50,
                "created_at": "2023-01-04T06:45:27Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 66,
                "label": "是否启用下载码下载",
                "name": "enable_code_download",
                "value": "true",
                "placeholder": "任何用户都可以根据获得的下载码下载文档",
                "input_type": "switch",
                "category": "download",
                "sort": 60,
                "created_at": "2023-02-07T09:43:43Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 67,
                "label": "是否垫付用户下载码下载的付费文档",
                "name": "enable_system_pay",
                "value": "true",
                "placeholder": "为补偿文档上传者的损失，是否由系统垫付用户通过下载码免费下载的付费文档",
                "input_type": "switch",
                "category": "download",
                "sort": 61,
                "created_at": "2023-02-07T09:43:43Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 70,
                "label": "文档价格限制",
                "name": "max_price",
                "value": "10",
                "placeholder": "下载码下载文档时可免费下载价格在多少魔豆以内的文档",
                "input_type": "number",
                "category": "download",
                "sort": 62,
                "created_at": "2023-02-21T13:46:31Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 68,
                "label": "下载码",
                "name": "code",
                "value": "morefun",
                "placeholder": "用户下载文档需要输入的下载码",
                "input_type": "text",
                "category": "download",
                "sort": 70,
                "created_at": "2023-02-07T09:43:43Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 69,
                "label": "获取下载码提示",
                "name": "code_tip",
                "value": "示例：关注微信公众号【刻舟求荐】，发送关键字【下载码】获取魔豆文库下载码下载文档。（注意：这里只是示例，当前下载码为morefun）",
                "placeholder": "用户用下载码下载文档时的提示，支持HTML",
                "input_type": "textarea",
                "category": "download",
                "sort": 80,
                "created_at": "2023-02-07T09:43:43Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 201,
                "label": "是否启用激励视频广告下载",
                "name": "enable_rewarded_video_ad",
                "value": "false",
                "placeholder": "用户可以通过观看广告免费下载文档",
                "input_type": "switch",
                "category": "download",
                "sort": 90,
                "created_at": "2023-12-21T10:06:11Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 202,
                "label": "激励视频广告下载文档价格限制",
                "name": "rewarded_video_ad_max_price",
                "value": "10",
                "placeholder": "激励视频广告下载文档时可免费下载价格在多少积分以内的文档，0表示不限制",
                "input_type": "number",
                "category": "download",
                "sort": 100,
                "created_at": "2023-12-21T10:06:11Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 203,
                "label": "激励视频广告下载每日次数",
                "name": "rewarded_video_ad_times_every_day",
                "value": "5",
                "placeholder": "0值和负值等同于不启用(不存在可以无限刷的视频激励广告)",
                "input_type": "number",
                "category": "download",
                "sort": 110,
                "created_at": "2023-12-21T10:06:11Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 204,
                "label": "激励视频广告积分比例",
                "name": "rewarded_video_ad_reward_percent",
                "value": "50",
                "placeholder": "用户通过观看广告下载文档之后，给文档上传者文档价格的积分比例。0表示0%，即不给文档上传者按文档价格回馈积分；100表示100%，即按文档价格原价给作者积分。",
                "input_type": "number",
                "category": "download",
                "sort": 120,
                "created_at": "2023-12-21T10:06:11Z",
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