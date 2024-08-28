<template>
    <el-form ref="formArticle" label-position="top" label-width="80px" :model="article">
        <el-row :gutter="20">
            <el-col :span="11" :xs="14">
                <el-form-item label="标题" prop="title" :rules="[
                    { required: true, trigger: 'blur', message: '请输入文章标题' },
                ]">
                    <el-input v-model="article.title" placeholder="请输入文章标题" clearable :disabled="!canIPublish">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6" :xs="10">
                <el-form-item label="分类" prop="category_id" :rules="[
                    { required: true, trigger: 'blur', message: '请选择文章分类' },
                ]">
                    <el-cascader v-model="article.category_id" :options="categoryTrees" :disabled="!canIPublish"
                        :filterable="true" :props="{
                            checkStrictly: true,
                            expandTrigger: 'hover',
                            label: 'title',
                            value: 'id',
                        }" clearable placeholder="请选择文章分类"></el-cascader>
                </el-form-item>
            </el-col>
            <el-col v-if="isAdmin" :span="7" :xs="12">
                <el-form-item label="标识" prop="identifier">
                    <!-- 管理员才有权限设置标识 -->
                    <el-input v-model="article.identifier" placeholder="请输入文章标识，建议为字母和数字组合" :disabled="article.id > 0"
                        clearable></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="11" :xs="16">
                <el-form-item label="关键字">
                    <el-input v-model="article.keywords" :disabled="!canIPublish"
                        placeholder="请输入文章关键字，多个关键字用英文逗号分隔"></el-input>
                </el-form-item>
            </el-col>
            <template v-if="isAdmin">
                <el-col :span="6" :xs="8">
                    <!-- 审核状态 -->
                    <el-form-item label="审核状态">
                        <el-select v-model="article.status">
                            <el-option v-for="item in articleStatusOptions" :key="'s-' + item.value" :label="item.label"
                                :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :xs="24">
                    <!-- 推荐 -->
                    <el-form-item label="推荐">
                        <el-switch v-model="article.is_recommend" active-text="是" inactive-text="否"></el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <!-- 如果是审核拒绝，则填写拒绝原因 -->
                    <el-form-item v-if="article.status === 2" label="拒绝原因" prop="reject_reason">
                        <el-input v-model="article.reject_reason" placeholder="请输入拒绝原因" type="textarea"
                            rows="3"></el-input>
                    </el-form-item>
                </el-col>
            </template>
        </el-row>
        <el-form-item label="描述">
            <el-input v-model="article.description" placeholder="请输入文章描述，可为空" type="textarea" :disabled="!canIPublish"
                rows="5"></el-input>
        </el-form-item>
        <!-- TODO markdown编辑器 -->
        <!-- <el-form-item label="内容" class="editor-item">
            <Editor v-if="canIPublish" v-model="article.content" :init="init"></Editor>
            <div v-else>
                <el-input v-model="article.content" type="textarea" rows="10" :disabled="true"
                    placeholder="你未登录或没有权限发布文章"></el-input>
            </div>
        </el-form-item> -->
        <el-form-item>
            <el-button type="primary" class="btn-block" icon="Check" :disabled="!canIPublish" :loading="loading"
                @click="onSubmit">{{ canIPublish ? '提交' : '你未登录或没有权限发布文章' }}</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { defineProps, reactive, ref } from 'vue'

defineProps({
    isAdmin: {
        type: Boolean,
        default: false
    },
    canIPublish: {
        type: Boolean,
        default: false
    },
    initArticle: {
        type: Object,
        default: () => {
            return {
                title: '',
                category_id: [],
                identifier: '',
                keywords: '',
                status: '',
                reject_reason: '',
                description: '',
                content: ''
            }
        }
    },
    categoryTrees: {
        type: Array,
        default: () => []
    }
})

const article = reactive({
    title: '',
    category_id: [],
    identifier: '',
    keywords: '',
    status: '',
    reject_reason: '',
    description: '',
    content: ''
})

const loading = ref(false)

const onSubmit = () => {

}
</script>

<style>
.tox-promotion {
    display: none !important;
}
</style>
<style lang="scss" scoped>
.header-title {
    height: 40px;
    line-height: 40px;
    font-size: 20px;
}
</style>