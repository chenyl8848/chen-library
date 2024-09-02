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
                "id": 219,
                "label": "是否显示文档数",
                "name": "show_document_count",
                "value": "true",
                "placeholder": "是否显示网站文档数",
                "input_type": "switch",
                "category": "display",
                "created_at": "2024-02-01T01:32:26Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 220,
                "label": "是否显示文档下载数",
                "name": "show_document_download_count",
                "value": "true",
                "placeholder": "是否显示文档被下载次数",
                "input_type": "switch",
                "category": "display",
                "sort": 1,
                "created_at": "2024-02-01T01:32:27Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 221,
                "label": "是否显示文档浏览数",
                "name": "show_document_view_count",
                "value": "true",
                "placeholder": "是否显示文档被浏览次数",
                "input_type": "switch",
                "category": "display",
                "sort": 2,
                "created_at": "2024-02-01T01:32:27Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 222,
                "label": "是否显示文档收藏数",
                "name": "show_document_favorite_count",
                "value": "true",
                "placeholder": "是否显示文档被收藏次数",
                "input_type": "switch",
                "category": "display",
                "sort": 3,
                "created_at": "2024-02-01T01:32:27Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 78,
                "label": "是否显示注册用户数",
                "name": "show_register_user_count",
                "value": "true",
                "placeholder": "网站首页，是否显示注册用户数",
                "input_type": "switch",
                "category": "display",
                "sort": 10,
                "created_at": "2023-03-22T01:49:53Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 79,
                "label": "网站虚拟注册用户数",
                "name": "virtual_register_count",
                "value": "3432",
                "placeholder": "网站首页显示的用户数=真实注册用户数+虚拟注册用户数，用以避免网站初期用户注册数过少的尴尬窘境",
                "input_type": "number",
                "category": "display",
                "sort": 20,
                "created_at": "2023-03-22T01:49:53Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 104,
                "label": "是否显示文档摘要",
                "name": "show_document_descriptions",
                "value": "true",
                "placeholder": "文档阅读页面，是否显示文档摘要等信息",
                "input_type": "switch",
                "category": "display",
                "sort": 21,
                "created_at": "2023-05-22T04:31:01Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 80,
                "label": "是否显示横栏分类",
                "name": "show_index_categories",
                "value": "true",
                "placeholder": "网站首页中间横栏位置，是否显示分类",
                "input_type": "switch",
                "category": "display",
                "sort": 30,
                "created_at": "2023-03-22T01:49:53Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 207,
                "label": "是否显示订单功能",
                "name": "show_order",
                "value": "true",
                "placeholder": "对于公益类站点，可以关闭订单功能的显示。关闭之后，用户下载文档将不会出现支付流程。",
                "input_type": "switch",
                "category": "display",
                "sort": 31,
                "created_at": "2023-12-21T10:06:11Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 234,
                "label": "首页文档展示方式",
                "name": "index_document_style",
                "value": "card",
                "placeholder": "默认为卡片方式",
                "input_type": "select",
                "category": "display",
                "sort": 31,
                "options": "card:卡片\nlist:列表",
                "created_at": "2024-05-08T01:19:35Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 81,
                "label": "文档【继续阅读】的页数",
                "name": "pages_per_read",
                "value": "10",
                "placeholder": "用户阅读文档，每次点击继续阅读按钮时阅读的页数，默认为5，表示5页",
                "input_type": "number",
                "category": "display",
                "sort": 40,
                "created_at": "2023-03-22T01:49:53Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 82,
                "label": "文档搜索结果最大页数",
                "name": "max_search_pages",
                "value": "100",
                "placeholder": "搜索结果，默认最大展示100页，0表示不限制",
                "input_type": "number",
                "category": "display",
                "sort": 50,
                "created_at": "2023-03-22T01:49:53Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 83,
                "label": "版权声明",
                "name": "copyright_statement",
                "value": "本站为【魔豆文库】演示站点，本站所上传文档，仅作演示使用，如侵犯您的权益，请联系我们进行删除。",
                "placeholder": "网站最底部版权声明，支持HTML",
                "input_type": "textarea",
                "category": "display",
                "sort": 60,
                "created_at": "2023-03-22T01:49:53Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 215,
                "label": "显示关键字",
                "name": "show_keywords_on_lists",
                "value": "true",
                "placeholder": "文档列表页，是否显示右侧关键字",
                "input_type": "switch",
                "category": "display",
                "sort": 70,
                "created_at": "2024-01-02T06:27:53Z",
                "updated_at": "2024-04-17T14:41:02Z",
                "col_num": 24
            },
            {
                "id": 217,
                "label": "隐藏关键字",
                "name": "hide_keywords_on_lists",
                "value": "false",
                "placeholder": "文档列表页，是否隐藏右侧关键字",
                "input_type": "switch",
                "category": "display",
                "sort": 70,
                "created_at": "2024-01-12T00:56:56Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 218,
                "label": "显示文档来源",
                "name": "show_document_source",
                "value": "false",
                "placeholder": "对于采集而来的文档，在文档阅读页，是否显示文档来源",
                "input_type": "switch",
                "category": "display",
                "sort": 80,
                "created_at": "2024-01-12T00:56:56Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 229,
                "label": "隐藏无文档分类",
                "name": "hide_category_without_document",
                "value": "false",
                "placeholder": "对于分类下没有文档的分类，是否在前台页面进行隐藏",
                "input_type": "switch",
                "category": "display",
                "sort": 90,
                "created_at": "2024-04-08T09:04:19Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 230,
                "label": "微信/微信公众号提示文案",
                "name": "wechat_tip",
                "value": "我们的公众号同样精彩",
                "placeholder": "全局右下角【固定栏】微信/微信公众号提示文案",
                "input_type": "text",
                "category": "display",
                "sort": 100,
                "created_at": "2024-04-17T14:38:42Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 231,
                "label": "微信/微信公众号二维码",
                "name": "wechat_qrcode",
                "value": "/uploads/2/9/e/4/d/29e4dde26911e5b41a3f329c4a746628.jpg",
                "placeholder": "全局右下角【固定栏】微信/微信公众号二维码图片。不存在则不显示",
                "input_type": "image",
                "category": "display",
                "sort": 110,
                "created_at": "2024-04-17T14:38:42Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 232,
                "label": "联系我们提示文案",
                "name": "contact_tip",
                "value": "联系我们，了解魔豆文库产品",
                "placeholder": "全局右下角【固定栏】联系我们的提示文案",
                "input_type": "text",
                "category": "display",
                "sort": 120,
                "created_at": "2024-04-17T14:38:42Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 233,
                "label": "联系我们跳转链接",
                "name": "contact_link",
                "value": "https://mnt.ltd/moredoc.html",
                "placeholder": "全局右下角【固定栏】联系我们链接地址。不存在则不显示",
                "input_type": "text",
                "category": "display",
                "sort": 130,
                "created_at": "2024-04-17T14:38:42Z",
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