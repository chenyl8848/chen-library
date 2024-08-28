<template>
    <div class="comment-form">
        <el-form ref="form" :inline="true" :model="comment" :rules="rules" class="comment-form">
            <el-form-item prop="content" class="comment-content">
                <el-input v-model="comment.content" type="textarea" :placeholder="placeholder" :autosize="isMobile ? { minRows: 3, maxRows: 6 } : { minRows: 4, maxRows: 6 }
                    " />
            </el-form-item>
            <el-form-item class="comment-btns">
                <el-row>
                    <el-col :span="isMobile ? 24 : 7"> 请文明评论，理性发言. </el-col>
                    <el-col :span="isMobile ? 24 : 17" :class="isMobile ? '' : 'text-right'">
                        <template v-if="captcha.enable">
                            <el-form-item class="el-form-item-captcha">
                                <div class="captcha">
                                    <div v-if="captcha.type == 'audio'">
                                        <el-row :gutter="15">
                                            <el-col :span="20">
                                                <audio controls="controls" :src="captcha.captcha"></audio>
                                            </el-col>
                                            <el-col :span="4">
                                                <el-tooltip placement="top" content="刷新语音验证码">
                                                    <el-button icon="Refresh" class="btn-audio-refresh"
                                                        @click="loadCaptcha"></el-button>
                                                </el-tooltip>
                                            </el-col>
                                        </el-row>
                                    </div>
                                    <div v-else>
                                        <el-tooltip placement="top" content="点击可刷新验证码">
                                            <img :src="captcha.captcha" class="pointer" @click="loadCaptcha" />
                                            <!-- <img src="@/assets/images/touch-captcha.png" class="pointer" @click="loadCaptcha" /> -->
                                        </el-tooltip>
                                    </div>
                                </div>
                            </el-form-item>
                            <el-form-item prop="captcha" :rules="[
                                { required: true, trigger: 'blur', message: '请输入验证码' },
                            ]">
                                <el-input v-model="comment.captcha" placeholder="请输入验证码"
                                    :size="isMobile ? 'medium' : ''"></el-input>
                            </el-form-item>
                        </template>
                        <el-form-item>
                            <el-button type="primary" icon="Position" :size="isMobile ? 'medium' : ''"
                                @click="submitForm('form')">发表点评</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { reactive, defineProps } from 'vue'
import hooks from '@/hooks'
const { isMobile } = hooks()
import useSettingStore from '@/store/module/setting'
const settingStore = useSettingStore()

defineProps({
    documentId: {
        type: Number,
        default: 0
    },
    placeholder: {
        type: String,
        default: '请输入评论内容'
    }
})

/**
 * 评论表单
 */
const comment = reactive({
    content: '',
    captcha: ''
})
const rules = reactive({
    content: [
        { required: true, message: '请输入评论内容', trigger: 'blur' },
    ],
})

/**
 * 验证码
 */
const captcha = reactive({
    enable: settingStore.security.enable_captcha_comment,
    captcha: '/src/assets/images/touch-captcha.png',
    type: 'images'
})

// 刷新验证码
const loadCaptcha = () => {
    // TODO 刷新验证码
}

/**
 * 表单提交
 */
const submitForm = () => { 
    // TODO 提交评论

    // TODO 通知父组件
}
</script>

<style lang="scss">
.comment-form {
    .comment-content {
        width: 100%;

        .el-form-item__content {
            display: block;
        }
    }

    .comment-btns {
        width: 100%;

        img {
            height: 40px;
        }

        .el-form-item__content {
            display: block;
        }

        .captcha {
            float: left;
        }
    }
}
</style>