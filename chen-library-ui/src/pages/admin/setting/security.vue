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
                "id": 85,
                "label": "待支付超时关闭",
                "name": "unpaid_order_close_hours",
                "value": "1",
                "placeholder": "用户创建的待支付订单，超过多少小时之后自动关闭，默认和最小值均为1，即1小时。",
                "input_type": "number",
                "category": "security",
                "sort": -2,
                "created_at": "2023-05-21T00:02:43Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 18,
                "label": "最大文档大小(MB)",
                "name": "max_document_size",
                "value": "50",
                "placeholder": "允许用户上传的最大文档大小，默认为50，即50MB。配置时仍需配置反向代理服务所允许传输的最大大小，如nginx的client_max_body_size值！",
                "input_type": "number",
                "category": "security",
                "sort": 1,
                "created_at": "2023-01-04T06:45:26Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 19,
                "label": "评论时间间隔",
                "name": "comment_interval",
                "value": "10",
                "placeholder": "用户评论时间间隔，单位为秒。0表示不限制。",
                "input_type": "number",
                "category": "security",
                "sort": 2,
                "created_at": "2023-01-04T06:45:26Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 63,
                "label": "允许上传的文档类型",
                "name": "document_allowed_ext",
                "placeholder": "留空表示允许程序所支持的全部文档类型",
                "input_type": "select-multi",
                "category": "security",
                "sort": 3,
                "options": ".br\n.bz2\n.zip\n.gz\n.lz4\n.lz\n.sz\n.xz\n.zz\n.zst\n.tar\n.rar\n.7z\n.rar\n.pdf\n.doc\n.docx\n.rtf\n.wps\n.odt\n.dot\n.ppt\n.pptx\n.pps\n.ppsx\n.dps\n.odp\n.pot\n.xls\n.xlsx\n.et\n.ods\n.csv\n.tsv\n.txt\n.epub\n.mobi\n.chm\n.umd\n.azw\n.azw3\n.azw4",
                "created_at": "2023-02-01T10:55:36Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 50,
                "label": "文档的【相关文档】有效期",
                "name": "document_related_duration",
                "value": "7",
                "placeholder": "文档的相关联文档的有效期，默认为7，即7天，0或小于0，表示不开启相关文档功能",
                "input_type": "number",
                "category": "security",
                "sort": 14,
                "created_at": "2023-01-05T08:50:52Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 84,
                "label": "从回收站清除的文档文件保留时长",
                "name": "attachment_retention_minute",
                "value": "1440",
                "placeholder": "单位为分钟，默认为1440，即24小时。文档被从回收站清除之后，文档文件并未真正删除，用以规避操作失误的情况。设为 0 则表示即时删除文档文件，用以释放存储空间。",
                "input_type": "number",
                "category": "security",
                "sort": 15,
                "created_at": "2023-04-05T06:09:43Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 216,
                "label": "搜索记录保留天数",
                "name": "search_record_retention_days",
                "value": "7",
                "placeholder": "单位为天，默认为7，即7天。0表示不记录用户搜索记录。",
                "input_type": "number",
                "category": "security",
                "sort": 16,
                "created_at": "2024-01-03T13:18:44Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 72,
                "label": "是否禁止上传已存在的文档",
                "name": "disable_upload_exist_document",
                "value": "false",
                "placeholder": "禁止则不允许上传已存在的文档",
                "input_type": "switch",
                "category": "security",
                "sort": 17,
                "created_at": "2023-03-11T06:57:37Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 22,
                "label": "是否允许注册",
                "name": "enable_register",
                "value": "true",
                "placeholder": "请选择是否允许用户注册",
                "input_type": "switch",
                "category": "security",
                "sort": 18,
                "created_at": "2023-01-04T06:45:26Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 71,
                "label": "是否登录才能访问",
                "name": "login_required",
                "value": "false",
                "placeholder": "用户是否登录了才能访问",
                "input_type": "switch",
                "category": "security",
                "sort": 18,
                "created_at": "2023-03-02T13:53:18Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 23,
                "label": "是否开启登录验证码",
                "name": "enable_captcha_login",
                "value": "true",
                "placeholder": "请选择是否开启登录验证码",
                "input_type": "switch",
                "category": "security",
                "sort": 19,
                "created_at": "2023-01-04T06:45:26Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 24,
                "label": "是否开启注册验证码",
                "name": "enable_captcha_register",
                "value": "true",
                "placeholder": "请选择是否开启注册验证码",
                "input_type": "switch",
                "category": "security",
                "sort": 20,
                "created_at": "2023-01-04T06:45:26Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 25,
                "label": "是否开启评论验证码",
                "name": "enable_captcha_comment",
                "value": "true",
                "placeholder": "请选择是否开启评论验证码",
                "input_type": "switch",
                "category": "security",
                "sort": 21,
                "created_at": "2023-01-04T06:45:26Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 26,
                "label": "是否开启找回密码验证码",
                "name": "enable_captcha_find_password",
                "value": "true",
                "placeholder": "请选择是否开启找回密码验证码",
                "input_type": "switch",
                "category": "security",
                "sort": 22,
                "created_at": "2023-01-04T06:45:26Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 64,
                "label": "是否开启下载验证码",
                "name": "enable_captcha_download",
                "value": "true",
                "placeholder": "请选择用户下载文档时是否需要验证码",
                "input_type": "switch",
                "category": "security",
                "sort": 22,
                "created_at": "2023-02-07T09:43:43Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 169,
                "label": "是否开启注册邮箱验证",
                "name": "enable_verify_register_email",
                "value": "true",
                "placeholder": "用户注册时是否需要验证邮箱",
                "input_type": "switch",
                "category": "security",
                "sort": 50,
                "created_at": "2023-11-11T05:01:26Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 20,
                "label": "是否关闭网站",
                "name": "is_close",
                "value": "false",
                "placeholder": "请选择是否关闭网站",
                "input_type": "switch",
                "category": "security",
                "sort": 160,
                "created_at": "2023-01-04T06:45:26Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 21,
                "label": "闭站说明",
                "name": "close_statement",
                "value": "false",
                "placeholder": "关闭网站后，页面提示内容（支持HTML）",
                "input_type": "textarea",
                "category": "security",
                "sort": 170,
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