<template>
    <div class="page-admin-dashboard">
        <el-card shadow="never">
            <template #header>
                数据统计
            </template>
            <el-descriptions :column="3" border>
                <el-descriptions-item>
                    <template #label>
                        <el-icon><Document /></el-icon>
                        文档
                    </template>
                    {{ stats.document_count || 0 }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <el-icon><ChatDotSquare /></el-icon>
                        评论
                    </template>
                    {{ stats.comment_count || 0 }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <el-icon><User /></el-icon>
                        用户
                    </template>
                    {{ stats.user_count || 0 }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <el-icon><Grid /></el-icon>
                        分类
                    </template>
                    {{ stats.category_count || 0 }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <el-icon><Warning /></el-icon>
                        举报
                    </template>
                    {{ stats.report_count || 0 }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <el-icon><Tickets /></el-icon>
                        文章
                    </template>
                    {{ stats.article_count || 0 }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <el-icon><Link /></el-icon>
                        友链
                    </template>
                    {{ stats.friendlink_count || 0 }}
                </el-descriptions-item>
            </el-descriptions>
        </el-card>
    </div>
</template>

<script setup>
import { reactive } from 'vue'

const stats = reactive({
    document_count: 10,
    comment_count: 20,
    user_count: 30,
    category_count: 40,
    report_count: 50,
    article_count: 60,
    friendlink_count: 100
})
</script>