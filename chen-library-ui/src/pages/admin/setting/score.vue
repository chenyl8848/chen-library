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
                "id": 77,
                "label": "积分名称",
                "name": "credit_name",
                "value": "魔豆",
                "placeholder": "请输入网站的积分名称，默认为魔豆",
                "input_type": "text",
                "category": "score",
                "sort": 1,
                "created_at": "2023-03-22T01:49:53Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 86,
                "label": "人民币兑积分",
                "name": "credit_exchange",
                "value": "10",
                "placeholder": "1元人民币可以兑换多少积分，默认为10，建议为 1、10、100、1000 之中选择填写。用户购买文档以及后续的充值功能用到",
                "input_type": "number",
                "category": "score",
                "sort": 2,
                "created_at": "2023-05-21T00:02:43Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 120,
                "label": "是否显示换算",
                "name": "show_exchange",
                "value": "true",
                "placeholder": "是否在订单处显示积分兑换人民币金额（非营利性站点，建议不显示）",
                "input_type": "switch",
                "category": "score",
                "sort": 5,
                "created_at": "2023-07-24T06:21:07Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 41,
                "label": "注册",
                "name": "register",
                "value": "10",
                "placeholder": "注册时获得的积分",
                "input_type": "number",
                "category": "score",
                "sort": 10,
                "created_at": "2023-01-04T06:45:27Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 42,
                "label": "签到",
                "name": "sign_in",
                "value": "1",
                "placeholder": "每日签到获得的积分",
                "input_type": "number",
                "category": "score",
                "sort": 20,
                "created_at": "2023-01-04T06:45:27Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 43,
                "label": "删除文档",
                "name": "delete_document",
                "value": "1",
                "placeholder": "删除上传文档扣除的积分，0表示不扣除",
                "input_type": "number",
                "category": "score",
                "sort": 25,
                "created_at": "2023-01-04T06:45:27Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 44,
                "label": "上传文档",
                "name": "upload_document",
                "value": "5",
                "placeholder": "上传一篇文档可获得的积分",
                "input_type": "number",
                "category": "score",
                "sort": 30,
                "created_at": "2023-01-04T06:45:27Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 45,
                "label": "每日上传文档奖励次数",
                "name": "upload_document_limit",
                "value": "1",
                "placeholder": "每天最多可以获得多少次文档上传奖励，0表示无奖励。",
                "input_type": "number",
                "category": "score",
                "sort": 40,
                "created_at": "2023-01-04T06:45:27Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 46,
                "label": "文档被收藏",
                "name": "document_collected",
                "value": "1",
                "placeholder": "上传的文档被收藏后获得的积分",
                "input_type": "number",
                "category": "score",
                "sort": 50,
                "created_at": "2023-01-04T06:45:27Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 47,
                "label": "每日文档被收藏奖励次数",
                "name": "document_collected_limit",
                "value": "1",
                "placeholder": "每天最多可以获得多少次文档被收藏奖励，0表示无奖励。",
                "input_type": "number",
                "category": "score",
                "sort": 60,
                "created_at": "2023-01-04T06:45:27Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 48,
                "label": "文档被评论",
                "name": "document_commented",
                "value": "1",
                "placeholder": "上传的文档被评论后获得的积分",
                "input_type": "number",
                "category": "score",
                "sort": 70,
                "created_at": "2023-01-04T06:45:27Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 49,
                "label": "每日文档被评论奖励次数",
                "name": "document_commented_limit",
                "value": "1",
                "placeholder": "每天最多可以获得多少次文档被评论奖励，0表示无奖励。",
                "input_type": "number",
                "category": "score",
                "sort": 80,
                "created_at": "2023-01-04T06:45:27Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 205,
                "label": "激励视频广告",
                "name": "rewarded_video_ad",
                "value": "10",
                "placeholder": "观看激励视频广告获得的积分",
                "input_type": "number",
                "category": "score",
                "sort": 90,
                "created_at": "2023-12-21T10:06:11Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 206,
                "label": "每日激励视频广告奖励次数",
                "name": "rewarded_video_ad_limit",
                "value": "5",
                "placeholder": "每天最多可以获得多少次激励视频广告奖励，0表示无奖励。",
                "input_type": "number",
                "category": "score",
                "sort": 100,
                "created_at": "2023-12-21T10:06:11Z",
                "updated_at": "2024-09-01T21:00:23Z",
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