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
                "id": 1,
                "label": "网站名称",
                "name": "sitename",
                "value": "魔豆文库(演示站点)",
                "placeholder": "请输入您网站的名称，如：魔豆文库",
                "input_type": "text",
                "category": "system",
                "sort": 10,
                "created_at": "2023-01-04T06:45:26Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 11,
                "label": "【重要】网站域名",
                "name": "domain",
                "value": "https://moredoc.mnt.ltd",
                "placeholder": "请输入您网站的域名访问地址，如 https://moredoc.mnt.ltd，带 https:// 或 http:// 。用以生成网站地图sitemap、支付回调等",
                "input_type": "text",
                "category": "system",
                "sort": 11,
                "created_at": "2023-01-04T06:45:26Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 2,
                "label": "首页标题",
                "name": "title",
                "value": "MOREDOC · 魔豆文库(演示站点)",
                "placeholder": "请输入您网站的首页标题，如：魔豆文库，强大、专业的文库系统",
                "input_type": "text",
                "category": "system",
                "sort": 20,
                "created_at": "2023-01-04T06:45:26Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 3,
                "label": "网站关键字",
                "name": "keywords",
                "value": "MOREDOC · 魔豆文库(演示站点)",
                "placeholder": "请输入您网站的关键字",
                "input_type": "text",
                "category": "system",
                "sort": 30,
                "created_at": "2023-01-04T06:45:26Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 4,
                "label": "网站描述",
                "name": "description",
                "value": "MOREDOC · 魔豆文库(演示站点)",
                "placeholder": "请输入您网站的描述",
                "input_type": "textarea",
                "category": "system",
                "sort": 40,
                "created_at": "2023-01-04T06:45:26Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 5,
                "label": "首页搜索推荐词",
                "name": "recommend_words",
                "value": "语文, Python, 阿里巴巴, Java",
                "placeholder": "网站首页搜索推荐关键字，多个关键字用英文逗号分隔",
                "input_type": "text",
                "category": "system",
                "sort": 50,
                "created_at": "2023-01-04T06:45:26Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 166,
                "label": "小程序Logo",
                "name": "mp_logo",
                "placeholder": "请上传一张图片作为小程序Logo",
                "input_type": "image",
                "category": "system",
                "sort": 59,
                "created_at": "2023-10-19T06:45:57Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 6,
                "label": "网站Logo",
                "name": "logo",
                "value": "/uploads/5/1/c/5/9/51c59a56e1b49eabc12042beae0f3e71.png",
                "placeholder": "请上传一张图片作为网站Logo(透明背景，以便网站底部logo反色展示)",
                "input_type": "image",
                "category": "system",
                "sort": 60,
                "created_at": "2023-01-04T06:45:26Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 7,
                "label": "网站Favicon",
                "name": "favicon",
                "value": "/uploads/1/6/c/6/1/16c6131482c64d9f38cd887c8cc1d705.ico",
                "placeholder": "请上传一张方方正正的小图片作为网站favicon，建议为 .ico 的图片",
                "input_type": "image",
                "category": "system",
                "sort": 61,
                "created_at": "2023-01-04T06:45:26Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 8,
                "label": "注册页背景图",
                "name": "register_background",
                "value": "/uploads/f/2/8/5/e/f285ef40a325b1f16c467a2c5e0ea3f8.jpg",
                "placeholder": "请上传一张图片作为注册页背景图",
                "input_type": "image",
                "category": "system",
                "sort": 62,
                "created_at": "2023-01-04T06:45:26Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 9,
                "label": "登录页背景图",
                "name": "login_background",
                "value": "/uploads/f/2/8/5/e/f285ef40a325b1f16c467a2c5e0ea3f8.jpg",
                "placeholder": "请上传一张图片作为登录页背景图",
                "input_type": "image",
                "category": "system",
                "sort": 63,
                "created_at": "2023-01-04T06:45:26Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 73,
                "label": "是否显示Powerd By Moredoc",
                "name": "enable_powered_by",
                "value": "true",
                "placeholder": "关闭之后，不会在前台页面底部显示Powerd By Moredoc",
                "input_type": "switch",
                "category": "system",
                "sort": 64,
                "created_at": "2023-03-13T12:49:02Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 74,
                "label": "是否启用文档水印",
                "name": "enable_watermark",
                "value": "true",
                "input_type": "switch",
                "category": "system",
                "sort": 65,
                "created_at": "2023-03-13T12:49:02Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 75,
                "label": "文档水印图片",
                "name": "watermark",
                "value": "/static/images/watermark.svg",
                "placeholder": "请上传一张方方正正的【透明背景图片】作为文档阅读时的水印",
                "input_type": "image",
                "category": "system",
                "sort": 66,
                "created_at": "2023-03-13T12:49:02Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 76,
                "label": "公网安备",
                "name": "sec_icp",
                "value": "京公网安备 44030402005740 号",
                "placeholder": "请输入您网站的公网安备备案号",
                "input_type": "text",
                "category": "system",
                "sort": 68,
                "created_at": "2023-03-22T01:49:53Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 10,
                "label": "网站备案号",
                "name": "icp",
                "value": "粤ICP备2022091336号",
                "placeholder": "请输入您网站的备案号",
                "input_type": "text",
                "category": "system",
                "sort": 69,
                "created_at": "2023-01-04T06:45:26Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 12,
                "label": "版权起始年",
                "name": "copyright_start_year",
                "value": "2019",
                "placeholder": "请输入您网站版权起始年，如：2019，则前台会显示如 ©2019 - 20xx 的字样",
                "input_type": "text",
                "category": "system",
                "sort": 80,
                "created_at": "2023-01-04T06:45:26Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 13,
                "label": "网站统计代码",
                "name": "analytics",
                "value": "var _hmt = _hmt || [];\n(function() {\n  var hm = document.createElement(\"script\");\n  hm.src = \"https://hm.baidu.com/hm.js?be74370f1c70319aeb6dbf546a531ea8\";\n  var s = document.getElementsByTagName(\"script\")[0]; \n  s.parentNode.insertBefore(hm, s);\n})();",
                "placeholder": "请输入您网站的统计代码，当前只支持百度统计",
                "input_type": "textarea",
                "category": "system",
                "sort": 90,
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