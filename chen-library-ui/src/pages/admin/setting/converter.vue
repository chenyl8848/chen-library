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
                "id": 200,
                "label": "最大预览页数百分比",
                "name": "max_preview_percent",
                "value": "100",
                "placeholder": "百分比数值，填1~100，与，0和100均表示不限制。与【最大阅览页数】一起，取两者中的最小值",
                "input_type": "number",
                "category": "converter",
                "sort": -1,
                "created_at": "2023-12-21T10:06:11Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 32,
                "label": "最大预览页数",
                "name": "max_preview",
                "value": "10",
                "placeholder": "文档允许的最大预览页数，0表示不限制",
                "input_type": "number",
                "category": "converter",
                "sort": 15,
                "created_at": "2023-01-04T06:45:27Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 33,
                "label": "转换超时(分钟)",
                "name": "timeout",
                "value": "30",
                "placeholder": "文档转换超时时间，默认为30分钟",
                "input_type": "number",
                "category": "converter",
                "sort": 20,
                "created_at": "2023-01-04T06:45:27Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 12
            },
            {
                "id": 51,
                "label": "转为文本型SVG",
                "name": "with_text",
                "value": "false",
                "placeholder": "是否将文档转为文本型SVG。启用后空间占用减少80%左右，但部分文档会出现排版错乱的问题",
                "input_type": "switch",
                "category": "converter",
                "sort": 22,
                "created_at": "2023-01-06T08:46:43Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 170,
                "label": "预览格式",
                "name": "extension",
                "value": "svg",
                "placeholder": "将文档转为特定格式以供预览",
                "input_type": "select",
                "category": "converter",
                "sort": 30,
                "options": "svg:SVG\njpg:JPEG\npng:PNG\nwebp:WEBP",
                "created_at": "2023-11-11T05:01:26Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 34,
                "label": "是否启用GZIP压缩",
                "name": "enable_gzip",
                "value": "true",
                "placeholder": "是否对文档SVG预览文件启用GZIP压缩，启用后转换效率会【稍微】下降，但相对直接的SVG文件减少75%的存储空间",
                "input_type": "switch",
                "category": "converter",
                "sort": 40,
                "created_at": "2023-01-04T06:45:27Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 35,
                "label": "是否启用SVGO",
                "name": "enable_svgo",
                "value": "false",
                "placeholder": "是否对文档SVG预览文件启用SVGO压缩，启用后转换效率会【明显】下降，但相对直接的SVG文件减少50%左右的存储空间",
                "input_type": "switch",
                "category": "converter",
                "sort": 50,
                "created_at": "2023-01-04T06:45:27Z",
                "updated_at": "2024-09-01T21:00:23Z",
                "col_num": 24
            },
            {
                "id": 52,
                "label": "是否转换重复文档",
                "name": "enable_convert_repeated_document",
                "value": "false",
                "placeholder": "对于已转换过的文档，再次被上传时是否再转换一次",
                "input_type": "switch",
                "category": "converter",
                "sort": 60,
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