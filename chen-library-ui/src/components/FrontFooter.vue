<template>
    <div class="front-footer">
        <div v-if="$route.path === '/' && friendLinks.length > 0" class="footer-friendlink ">
            <el-card shadow="never" class="box-card">
                <template #header>
                    <div class="clearfix">
                        <strong>友情链接</strong>
                    </div>
                </template>
                <a v-for="item in friendLinks" :key="`friend-link-${item.id}`" :href="item.link" target="_blank"
                    class="el-link el-link--default">
                    {{ item.title }}
                </a>
            </el-card>
        </div>
        <div class="footer-links">
            <div class="links-logo">
                <router-link to="/">
                    <img :src="settingStore.system.logo || '/src/assets/images/logo-empty.png'"
                        :alt="settingStore.system.sitename" />
                </router-link>
                <div>
                    <el-link v-if="settingStore.footer.about" :href="settingStore.footer.about" :underline="false"
                        target="_blank">关于我们</el-link>
                    <el-link v-if="settingStore.footer.agreement" :href="settingStore.footer.agreement"
                        :underline="false" target="_blank">文库协议</el-link>
                    <el-link v-if="settingStore.footer.contact" :href="settingStore.footer.contact" :underline="false"
                        target="_blank">联系我们</el-link>
                    <el-link v-if="settingStore.footer.feedback" :href="settingStore.footer.feedback" :underline="false"
                        target="_blank">意见反馈</el-link>
                    <el-link v-if="settingStore.footer.copyright" :href="settingStore.footer.copyright"
                        :underline="false" target="_blank">免责声明</el-link>
                </div>
            </div>
            <div v-if="settingStore.display.copyright_statement">
                <div class="el-link el-link--default copyright-statement"
                    v-html="settingStore.display.copyright_statement">
                </div>
            </div>
            <div>
                <el-link v-if="settingStore.system.com.codechen.library.api.domain" :underline="false" :href="settingStore.system.com.codechen.library.api.domain">
                    {{ settingStore.system.sitename }}
                </el-link>
                <span class="copyright-year">
                    <span v-if="settingStore.system.copyright_start_year === currentYear">
                        @{{ currentYear }}
                    </span>
                    <span v-else>
                        @{{ settingStore.system.copyright_start_year }} - {{ currentYear }}
                    </span>
                    <span> | </span>
                    <el-link href="/sitemap.xml" :underline="false" target="_blank">站点地图</el-link>
                    <el-link v-if="settingStore.system.icp" href="https://beian.miit.gov.cn/" :underline="false"
                        target="_blank">
                        {{ settingStore.system.icp }}
                    </el-link>
                    <el-link v-if="settingStore.system.sec_icp" :href="`http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=${settingStore.system.sec_icp.replace(
                        /[^\d]/g,
                        ''
                    )}`" :underline="false" target="_blank">
                        {{ settingStore.system.sec_icp }}
                    </el-link>
                    <div class="powered-by">
                        Powered By
                        <el-link :underline="false" type="primary" target="_blank" href="https://mnt.ltd/#services"
                            title="MOREDOC">MOREDOC</el-link>
                        CE
                        <span>{{ settingStore.system.version }}</span>
                    </div>
                </span>
            </div>
        </div>
        <FixedRightBar />
    </div>
</template>

<script setup>
import FixedRightBar from './FixedRightBar.vue';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router'
import useSettingStore from '@/store/module/setting';

const $route = useRoute()
const settingStore = useSettingStore()

const friendLinks = ref([
    {
        "id": 1,
        "title": "摩枫网络科技",
        "link": "https://mnt.ltd"
    },
    {
        "id": 2,
        "title": "书栈网",
        "link": "https://www.bookstack.cn"
    }
])

const currentYear = computed(() => {
    return new Date().getFullYear()
})

</script>

<style lang="scss">
.front-footer {
    .footer-friendlink {
        margin: 0 auto;
        padding: 10px 0;
        width: $default-width;
        max-width: $max-width;

        .el-link {
            margin-right: 10px;
        }
    }

    .footer-links {
        background-color: #1c2b40;
        color: #a4acb7;
        padding: 30px 0;

        .links-logo {
            display: flex;
            align-items: center;
            margin-bottom: 5px;

            img {
                margin-right: 10px;
                height: 30px;
                filter: brightness(0) invert(0.73);
            }

            div {
                flex: 1;
            }
        }

        &>div {
            margin: 0 auto;
            width: $default-width;
            max-width: $max-width;
            box-sizing: border-box;
            padding: 0 20px;
            // text-align: center;
        }

        .el-link {
            color: #a4acb7;
            margin: 5px;
            font-size: 13px;
            font-weight: normal;

            .el-link--primary {
                color: #409eff;
            }

            &:hover {
                color: #409eff;
            }

            &.copyright-statement {
                color: #a4acb7;
                cursor: auto;
            }
        }

        .copyright-year {
            font-size: 13px;
            position: relative;
            top: 1px;
            margin-left: -5px;
            margin-right: 5px;
        }

        .powered-by {
            float: right;
            font-size: 13px !important;
            margin-left: 0;
            margin-right: 0;

            .el-link {
                position: relative;
                top: -1px;
                color: #409eff;
            }
        }
    }

    .footer-links {
        font-size: 13px !important;
        padding: 20px 0;

        .el-link {
            font-size: 13px;
        }

        .copyright-year {
            font-size: 13px;
        }
    }
}
</style>