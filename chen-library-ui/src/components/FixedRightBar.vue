<template>
    <div class="fixed-right-bar hidden-xs-only">
        <ul>
            <li>
                <el-tooltip class="item" effect="dark" content="上传文档" placement="left">
                    <router-link to="/upload" class="el-link el-link--default">
                        <el-icon>
                            <UploadFilled />
                        </el-icon>
                    </router-link>
                </el-tooltip>
            </li>
            <li>
                <el-tooltip class="item" effect="dark" content="发布文章" placement="left">
                    <router-link to="/publish" class="el-link el-link--default">
                        <el-icon>
                            <Edit />
                        </el-icon>
                    </router-link>
                </el-tooltip>
            </li>
            <li v-if="settingStore.display.wechat_qrcode">
                <el-popover placement="left" trigger="hover" width="200">
                    <div class="qrcode">
                        <img :src="settingStore.display.wechat_qrcode" :alt="settingStore.display.wechat_tip || '扫码关注'"
                            style="width: 100%" />
                        <div class="help-block text-center" style="font-size: 13px">
                            {{ settingStore.display.wechat_tip || '扫码关注' }}
                        </div>
                    </div>
                    <template #reference>
                        <a href="javascript:;" class="el-link el-link--default">
                            <el-icon>
                                <Link />
                            </el-icon>
                        </a>
                    </template>
                </el-popover>
            </li>
            <li v-if="settingStore.display.contact_link">
                <el-tooltip class="item" effect="dark" :content="settingStore.display.contact_tip || '联系我们，反馈您的意见与建议'
                    " placement="left">
                    <a :href="settingStore.display.contact_link" target="_blank" class="el-link el-link--default">
                        <el-icon>
                            <PhoneFilled />
                        </el-icon>
                    </a>
                </el-tooltip>
            </li>
            <li>
                <el-tooltip class="item" effect="dark" content="返回顶部" placement="left">
                    <a href="javascript:;" class="el-link el-link--default" @click="go2top">
                        <el-icon>
                            <Top />
                        </el-icon>
                    </a>
                </el-tooltip>
            </li>
        </ul>
    </div>
</template>

<script setup>
import usesettingStore from '@/store/module/setting'
const settingStore = usesettingStore()
</script>

<style lang="scss" scoped>
.fixed-right-bar {
    z-index: 9999;
    position: fixed;
    right: 20px;
    bottom: 0;
    transform: translateY(-20%);

    ul {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
            margin-bottom: 10px;

            a {
                display: block;
                width: 40px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                background-color: #f5f5f5;
                border-radius: 50%;
                color: #666;
                font-size: 12px;
                box-shadow: 0px 1px 20px 0px rgba(0, 0, 0, 0.1),
                    inset 0px -1px 0px 0px rgba(0, 0, 0, 0.1);

                &:hover {
                    background-color: #f0f0f0;
                }

                i {
                    font-size: 16px;
                    vertical-align: middle;
                }
            }
        }
    }
}
</style>