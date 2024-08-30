<template>
    <div class="role-form">
        <el-form ref="roleForm" label-position="top" label-width="80px" :model="role">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="名称" prop="title" :rules="[
                        { required: true, trigger: 'blur', message: '请输入名称' },
                    ]">
                        <el-input v-model="role.title" placeholder="请输入名称" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="排序(值越大越靠前)">
                        <el-input-number v-model.number="role.sort" clearable :min="0" :step="1"
                            placeholder="请输入排序值"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否为默认用户组">
                        <el-switch v-model="role.is_default" style="display: block" active-color="#13ce66"
                            inactive-color="#ff4949" active-text="是" inactive-text="否">
                        </el-switch>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="允许上传文档">
                        <el-switch v-model="role.enable_upload" style="display: block" active-color="#13ce66"
                            inactive-color="#ff4949" active-text="是" inactive-text="否">
                        </el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="文档需要审核">
                        <el-switch v-model="role.enable_document_review" style="display: block" active-color="#13ce66"
                            inactive-color="#ff4949" active-text="是" inactive-text="否">
                        </el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否允许评论">
                        <el-switch v-model="role.enable_comment" style="display: block" active-color="#13ce66"
                            inactive-color="#ff4949" active-text="是" inactive-text="否">
                        </el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="评论需要审核">
                        <el-switch v-model="role.enable_comment_approval" style="display: block" active-color="#13ce66"
                            inactive-color="#ff4949" active-text="是" inactive-text="否">
                        </el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="允许发布文章">
                        <el-switch v-model="role.enable_article" style="display: block" active-color="#13ce66"
                            inactive-color="#ff4949" active-text="是" inactive-text="否">
                        </el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="文章需要审核">
                        <el-switch v-model="role.enable_article_approval" style="display: block" active-color="#13ce66"
                            inactive-color="#ff4949" active-text="是" inactive-text="否">
                        </el-switch>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="描述">
                <el-input v-model="role.description" type="textarea" rows="5" placeholder="请输入分组描述"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="btn-block" icon="Check" :loading="loading"
                    @click="onSubmit(roleForm)">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { defineProps, reactive, ref, defineEmits, watch } from 'vue'

const $props = defineProps({
    initRole: {
        type: Object,
        default: () => {
            return {
                id: 0,
                email: '',
                username: '',
                password: '',
                group_id: [],
            }
        }
    },
    roles: {
        type: Array,
        default: () => []
    },
})

const roleForm = ref()
let role = reactive({
    username: '',
    password: '',
    email: '',
    group_id: [],
})

watch(() => $props.initRole, (newValue) => {
    role = reactive({ ...newValue })
}, { immediate: true })

const $emits = defineEmits(['success'])
const loading = ref(false)
const onSubmit = async (formRef) => {
    await formRef.validate((valid, fields) => {
        if (valid) {
            loading.value = true
            if (role.id && role.id > 0) {
                // 修改
                formRef.resetFields()
                $emits('success')
            } else {
                // 新增
                formRef.resetFields()
                $emits('success')
            }
            loading.value = false
        } else {
            console.log('error submit!', fields)
        }
    })
}
</script>

<style lang="scss" scoped></style>