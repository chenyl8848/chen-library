<template>
    <div class="category-form">
        <el-form ref="categoryForm" label-position="top" label-width="80px" :model="category">
            <el-form-item label="上级分类">
                <el-cascader v-model="category.parent_id" :options="trees" :filterable="true" :props="{
                    checkStrictly: true,
                    expandTrigger: 'hover',
                    label: 'title',
                    value: 'id',
                }" clearable placeholder="请选择上级分类"></el-cascader>
            </el-form-item>
            <!-- 创建的时候，不支持上传封面。因为创建的时候，支持批量创建 -->
            <el-form-item v-if="
                category.id > 0 &&
                (!category.parent_id ||
                    category.parent_id === 0 ||
                    category.parent_id.length === 0)
            " label="分类图标(请上传长宽比为1:1的小图片)" class="form-item-cover">
                <UploadImage :action="'/api/v1/upload/category'" :image="category.icon" :width="'48px'"
                    @success="successUploadIcon" />
            </el-form-item>
            <el-form-item v-if="
                category.id > 0 &&
                (!category.parent_id ||
                    category.parent_id === 0 ||
                    category.parent_id.length === 0)
            " label="分类封面(一级分类才需要上传)" class="form-item-cover">
                <UploadImage :action="'/api/v1/upload/category'" :image="category.cover" :width="'180px'"
                    @success="successUpload" />
            </el-form-item>
            <el-row :gutter="20">
                <el-col :span="16">
                    <el-form-item label="名称" prop="title" :rules="[
                        { required: true, trigger: 'blur', message: '请输入名称' },
                    ]">
                        <el-input v-model="category.title" :placeholder="category.id > 0
                            ? '请输入分类名称'
                            : '请输入分类名称，多个分类名称换行输入，重复的分类名称自动跳过...'
                            " :type="category.id > 0 ? 'text' : 'textarea'" :rows="5" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="排序(值越大越靠前)">
                        <el-input-number v-model.number="category.sort" clearable :min="0" :step="1"
                            placeholder="请输入排序值"></el-input-number>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item v-if="initCategory.id > 0" label="描述" prop="description">
                <el-input v-model="category.description" :type="'textarea'" description="请输入描述，支持换行" :rows="5"
                    clearable></el-input>
            </el-form-item>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="是否启用">
                        <el-switch v-model="category.enable" style="display: block" active-color="#13ce66"
                            inactive-color="#ff4949" active-text="是" inactive-text="否">
                        </el-switch> </el-form-item></el-col>
                <el-col v-if="initCategory.id > 0" :span="12">
                    <el-form-item label="显示分类描述">
                        <el-switch v-model="category.show_description" style="display: block" active-color="#13ce66"
                            inactive-color="#ff4949" active-text="是" inactive-text="否">
                        </el-switch> </el-form-item></el-col>
            </el-row>
            <el-form-item>
                <el-button type="primary" class="btn-block" icon="Check" :loading="loading"
                    @click="onSubmit">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { defineProps, reactive, ref, defineEmits, watch } from 'vue'
import UploadImage from './UploadImage.vue'

const $props = defineProps({
    initCategory: {
        type: Object,
        default: () => {
            return {
                id: 0,
                title: '',
                sort: 0,
                enable: false,
                cover: '',
                icon: '',
            }
        }
    },
    trees: {
        type: Array,
        default: () => []
    },
    type: {
        // 0: 文档分类 1: 文章分类
        type: Number,
        default: 0,
    },
})

let category = reactive({
    id: 0,
    title: '',
    sort: 0,
    enable: false,
    cover: '',
    icon: '',

})

watch(()=>$props.initCategory, (newValue) => {
    category = reactive({...newValue})
}, {immediate: true})


const successUploadIcon = () => {
    
}

const successUpload = () => {

}

const $emits = defineEmits(['success'])
const loading = ref(false)
const onSubmit = () => {
    $emits('success')
}
</script>

<style lang="scss">
.category-form {
    .form-item-cover {
        .el-form-item__content {
            line-height: 1;
        }
    }
}
</style>