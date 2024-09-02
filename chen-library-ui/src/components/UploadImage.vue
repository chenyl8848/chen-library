<template>
    <div class="upload-image">
        <el-upload class="image-uploader" :action="action" :headers="{ authorization: `bearer ${useStore.token}` }"
            :show-file-list="false" :on-success="success" :on-error="onError" accept="image/*" :multiple="false"
            :disabled="disabled">
            <el-image v-if="disabled" :src="image" :style="'width:' + width + ';height:' + height">
                <!-- <temlate #error>
                    <div class="image-slot">
                        <img :src="errorImage" />
                    </div>
                </temlate> -->
            </el-image>
            <el-tooltip v-else content="点击上传图片" placement="top">
                <el-image :src="image" :style="'width:' + width + ';height:' + height">
                    <!-- <temlate #error>
                        <div class="image-slot">
                            <img :src="errorImage" />
                        </div>
                    </temlate> -->
                </el-image>
            </el-tooltip>
            <div v-if="showRemove && image" class="el-upload__tip">
                <el-button type="primary" link size="small" icon="Delete" @click="onRemove">移除图片</el-button>
            </div>
        </el-upload>
    </div>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue'
import useUserStore from '@/store/module/user'
const useStore = useUserStore()
defineProps({
    action: {
        type: String,
        default: '',
    },
    width: {
        type: String,
        default: 'auto',
    },
    height: {
        type: String,
        default: 'auto',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    showRemove: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String,
        default: '',
    },
    errorImage: {
        type: String,
        default: '/static/images/blank.png',
    },
})

const $emits = defineEmits(['success', 'remove'])
const success = (res) => {
    $emits('success', res)
}
const onRemove = () => {
    $emits('remove')
}
const onError = (err) => {
    try {
        const message = JSON.parse(err.message)
        console.log(message)
    } catch (e) {
        console.log(e)
    }
}
</script>
<style lang="scss">
.upload-image {
    line-height: 1 !important;

    .el-image {
        img {
            width: 100%;
            height: auto;
        }
    }
}
</style>