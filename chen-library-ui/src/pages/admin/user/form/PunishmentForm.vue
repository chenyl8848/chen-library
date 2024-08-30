<template>
    <div class="punishment-form">
        <el-form ref="punishmentForm" label-position="top" label-width="80px" :model="punishment">
            <el-form-item label="用户" prop="user_id" :rules="punishment.id === 0
                ? [{ required: true, trigger: 'blur', message: '请选择用户' }]
                : []
                ">
                <el-select v-if="punishment.id === 0" v-model="punishment.user_id" filterable multiple remote
                    reserve-keyword placeholder="请输入和选择用户" :remote-method="remoteSearchUser" :loading="loading">
                    <el-option v-for="user in users" :key="'userid' + user.id" :label="user.username" :value="user.id">
                    </el-option>
                </el-select>
                <el-input v-else v-model="punishment.username" :disabled="true" />
            </el-form-item>
            <el-form-item prop="type" :rules="[
                { required: true, trigger: 'blur', message: '请选择处罚类型' },
            ]">
                <template #label>
                    处罚类型
                    <ToolTip content="禁止评论：不允许发表评论；禁止上传：不允许上传文档；禁止收藏：不允许收藏文档和文章；禁止下载：不允许下载文档；禁止发布文章；禁用账户：包括上述全部禁用项" />
                </template>
                <el-checkbox-group v-if="punishment.id === 0" v-model="punishment.type">
                    <el-checkbox v-for="item in punishmentEnum" :key="'checkbox-pt' + item.value" :label="item.value">{{
                        item.label }}</el-checkbox>
                </el-checkbox-group>
                <el-select v-else v-model="punishment.type" :disabled="true">
                    <el-option v-for="item in punishmentEnum" :key="'select-pt-' + item.value" :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="是否启用处罚">
                        <el-switch v-model="punishment.enable" style="display: block" active-color="#13ce66"
                            inactive-color="#ff4949" active-text="是" inactive-text="否">
                        </el-switch> </el-form-item></el-col>
                <el-col :span="16">
                    <el-form-item>
                        <template #label>
                            截止时间
                            <ToolTip content="用户被处罚的截止时间，留空则为永久" />
                        </template>
                        <el-date-picker v-model="punishment.end_time" type="datetime" placeholder="请选择处罚截止时间"
                            :shortcuts="datetimePickerPunishmentShortcuts">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="处罚原因">
                <el-input v-model="punishment.reason" type="textarea" :rows="3"
                    placeholder="请输入处罚原因，被处罚用户可见"></el-input>
            </el-form-item>
            <el-form-item label="处罚备注">
                <el-input v-model="punishment.remark" type="textarea" :rows="3" placeholder="请输入处罚备注，管理员可见"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="btn-block" icon="Check" :loading="loading"
                    @click="onSubmit(punishmentForm)">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import ToolTip from '@/components/ToolTip.vue'
import { defineProps, reactive, ref, defineEmits, watch } from 'vue'
import { punishmentEnum, datetimePickerPunishmentShortcuts } from '@/utils/enum'

const $props = defineProps({
    initPunishment: {
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
    }
})

const punishmentForm = ref()
let punishment = reactive({
    username: '',
    password: '',
    email: '',
    group_id: [],
})

watch(() => $props.initRole, (newValue) => {
    punishment = reactive({ ...newValue })
}, { immediate: true })

const $emits = defineEmits(['success'])
const loading = ref(false)
const onSubmit = async (formRef) => {
    await formRef.validate((valid, fields) => {
        if (valid) {
            loading.value = true
            if (punishment.id && punishment.id > 0) {
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