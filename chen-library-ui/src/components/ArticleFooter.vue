<template>
    <div class="article-footer">
        <div>
            <el-link v-if="settingStore.footer.about" :underline="false" target="_blank"
                :href="settingStore.footer.about">关于我们</el-link>
            <el-link v-if="settingStore.footer.agreement" :href="settingStore.footer.agreement" :underline="false"
                target="_blank">文库协议</el-link>
            <el-link v-if="settingStore.footer.contact" :underline="false" target="_blank"
                :href="settingStore.footer.contact">联系我们</el-link>
            <el-link v-if="settingStore.footer.feedback" :underline="false" :href="settingStore.footer.feedback"
                target="_blank">意见反馈</el-link>
            <el-link v-if="settingStore.footer.copyright" :underline="false" :href="settingStore.footer.copyright"
                target="_blank">免责声明</el-link>
            <el-link :underline="false" target="_blank" title="站点地图" href="/sitemap.xml">站点地图</el-link>
        </div>
        <div>
            <el-link v-if="settingStore.system.com.codechen.library.api.domain" :underline="false" :title="settingStore.system.sitename || ''"
                :href="settingStore.system.com.codechen.library.api.domain">
                {{ settingStore.system.sitename }}
            </el-link>
            <span class="copyright-year"><span v-if="settingStore.system.copyright_start_year == currentYear">©{{
                currentYear }}</span>
                <span v-else>
                    ©{{ settingStore.system.copyright_start_year }} - {{ currentYear }}
                </span></span>
        </div>
        <div v-if="settingStore.system.icp">
            <el-link :underline="false" target="_blank" :title="settingStore.system.icp"
                href="https://beian.miit.gov.cn/">{{ settingStore.system.icp }}</el-link>
        </div>
        <div v-if="settingStore.system.sec_icp">
            <el-link :underline="false" target="_blank" :title="settingStore.system.sec_icp" :href="`http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=${settingStore.system.sec_icp.replace(
                /[^\d]/g,
                ''
            )}`">{{ settingStore.system.sec_icp }}</el-link>
        </div>
        <div class="powered-by">
            Powered By
            <el-link :underline="false" type="primary" target="_blank" href="https://mnt.ltd/#services"
                title="MOREDOC">MOREDOC</el-link>
            CE
            <span>{{ settingStore.system.version }}</span>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import useSettingStore from '@/store/module/setting'
const settingStore = useSettingStore()

const currentYear = computed(() => {
    return new Date().getFullYear()
})
</script>

<style lang="scss" scoped>
.article-footer {
    font-size: 14px;

    &>div {
        margin-bottom: 6px;
    }

    .el-link {
        font-weight: normal;
        display: inline-block;
        line-height: 160%;
        font-size: 14px;
        margin-right: 10px;
    }

    .powered-by {
        color: #898989;
        font-size: 12px;

        .el-link {
            margin-right: 0;
            position: relative;
            top: -1px;
            font-size: 12px;
        }
    }

    .copyright-year {
        position: relative;
        top: 1px;
        color: #606266;
    }
}
</style>