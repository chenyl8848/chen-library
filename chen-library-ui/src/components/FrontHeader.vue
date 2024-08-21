<template>
    <div class="front-header">
        <template v-if="advertisements.length > 0">
            <div v-for="item in advertisements" :key="`header-ad-${item.id}`">
                <div v-if="item.position === 'global_top'" :key="item.position + item.id" v-html="item.content">
                </div>
            </div>
        </template>

        <el-header v-if="$route.name !== 'search'">
            <div>
                <el-menu :defaultPath="activePath" mode="horizontal" class="float-left">
                    <el-menu-item class="logo" index="/">
                        <router-link to="/">
                            <img :src="settingStore.system.logo || '/assets/logo.png'"
                                :alt="settingStore.system.sitename" />
                        </router-link>
                    </el-menu-item>
                    <template v-for="item in categoryStore.navigations.filter((item) => item.enable)">
                        <template v-if="item.fixed">
                            <el-menu-item v-if="item.href === '/'" :key="`nav-index-${item.id}`" index="/"
                                class="hidden-xs-only">
                                <router-link to="/">{{ item.title || '首页' }}</router-link>
                            </el-menu-item>
                            <el-menu-item v-else-if="item.href === '/category'" :key="`nav-category-${item.id}`"
                                index="/category" class="hidden-xs-only">
                                <el-popover ref="popover0" width="520" trigger="hover" :show-after="600"
                                    :disabled="categoryStore.categories.filter((x) => !x.type).length === 0">
                                    <category-card :type="0"></category-card>
                                    <template #reference>
                                        <router-link to="/category/document">{{ item.title || '文库资料' }}</router-link>
                                    </template>
                                </el-popover>
                            </el-menu-item>
                            <el-menu-item v-else-if="item.href === '/article'" :key="`nav-article-${item.id}`"
                                index="/article" class="hidden-xs-only">
                                <el-popover ref="popover1" width="520" trigger="hover" :show-after="600"
                                    :disabled="categoryStore.categories.filter((x) => x.type === 1).length === 0">
                                    <category-card :type="1"></category-card>
                                    <template #reference>
                                        <router-link to="/category/article">{{ item.title || '文章资讯' }}</router-link>
                                    </template>
                                </el-popover>
                            </el-menu-item>
                            <navigation-link v-else :navigation="item" :hiddenXS="true"
                                :key="`nav-fixed-${item.id}`"></navigation-link>
                        </template>
                        <template v-else>
                            <el-sub-menu v-if="item.children && item.children.length > 0" :key="`nav1-${item.id}`"
                                :index="`nav-${item.id}`" class="hidden-xs-only">
                                <template #title>{{ item.title }}</template>
                                <navigation-link v-for="nav in item.children || []" :navigation="nav" :hidden-x-s="true"
                                    :key="`nav-child-${nav.id}`"></navigation-link>
                            </el-sub-menu>
                            <navigation-link v-else :navigation="item" :key="`nav2-${item.id}`"
                                :hidden-x-s="true"></navigation-link>
                        </template>
                    </template>
                    <el-menu-item
                        v-show="$route.path !== '/' || categoryStore.navigations.filter((item) => item.enable).length <= 3"
                        index="searchbox" class="nav-searchbox hidden-xs-only"
                        :class="categoryStore.navigations.length <= 2 ? 'nav-searchbox-large' : ''">
                        <el-input v-model="searchText" @keydown.enter="onSearch">
                            <template #suffix>
                                <el-button :icon="Search" link type="info" @click="onSearch" />
                            </template>
                        </el-input>
                    </el-menu-item>
                    <el-menu-item v-if="userStore.user.id > 0" index="user-center"
                        class="float-right nav-user-center hidden-xs-only">
                        <el-dropdown trigger="hover" @command="handleCommand">
                            <span class="el-dropdown-link">
                                <user-avatar :user="userStore.user" class="nav-user-avatar" :size="45"></user-avatar>
                                <span>{{ userStore.user.username }}</span>
                                <el-icon class="el-icon--right">
                                    <ArrowDown />
                                </el-icon>
                            </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item command="userHome">
                                        <el-icon>
                                            <HomeFilled />
                                        </el-icon>
                                        个人主页
                                    </el-dropdown-item>
                                    <el-dropdown-item command="userCenter"><el-icon>
                                            <Grid />
                                        </el-icon>
                                        个人中心
                                    </el-dropdown-item>
                                    <el-dropdown-item command="uploadDocument">
                                        <el-icon>
                                            <UploadFilled />
                                        </el-icon>
                                        上传文档
                                    </el-dropdown-item>
                                    <el-dropdown-item command="publishArticle">
                                        <el-icon>
                                            <DocumentAdd />
                                        </el-icon>
                                        发布文章
                                    </el-dropdown-item>
                                    <el-dropdown-item command="adminBackground">
                                        <el-icon>
                                            <Platform />
                                        </el-icon>
                                        管理后台
                                    </el-dropdown-item>
                                    <el-dropdown-item command="logout">
                                        <el-icon>
                                            <DArrowRight />
                                        </el-icon>
                                        退出登录
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </el-menu-item>
                </el-menu>
            </div>
        </el-header>

    </div>
</template>

<script setup>
import CategoryCard from '@/components/CategoryCard.vue';
import NavigationLink from '@/components/NavigationLink.vue';
import UserAvatar from './UserAvatar.vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useSettingStore from '@/store/module/setting';
import useCategoryStore from '@/store/module/category';
import useUserStore from '@/store/module/user';
import { ArrowDown, HomeFilled, Grid, UploadFilled, DocumentAdd, Platform, DArrowRight, Search } from '@element-plus/icons-vue'

const $route = useRoute()
const $router = useRouter()
const settingStore = useSettingStore()
const categoryStore = useCategoryStore()
const userStore = useUserStore()

// 广告
const advertisements = ref([])

const activePath = ref('/')

const searchText = ref('')
const onSearch = () => {
    console.log("searchhhhhhhhhhhh", searchText.value)
}

const handleCommand = (command) => {
    console.log(command, "handleCommand")
    switch (command) {
        case 'userHome':
            $router.push({ path: '/user' })
            break
        case 'userCenter':
            $router.push({ path: '/me' })
            break
        case 'uploadDocument':
            $router.push({ path: '/upload' })
            break
        case 'publishArticle':
            $router.push({ path: '/publish' })
            break
        case 'adminBackground':
            $router.push({ path: '/admin' })
            break
        case 'logout':
            $router.push({ path: '/logout' })
            break

    }
}
</script>

<style lang="scss">
.front-header {
    height: 60px;

    .el-header {
        padding: 0;
        background: #fff;
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 100;
        overflow: hidden;
        border-bottom: 1px solid $background-grey-light;

        .logo {
            &.is-active {
                border-color: transparent !important;
            }

            img {
                margin-top: -4px;
                height: 42px;
            }
        }

        &>div {
            margin: 0 auto;
            width: $default-width;
            max-width: $max-width;
        }

        .el-menu--horizontal>.el-submenu .el-submenu__title {
            padding-top: 1px;
        }

        .el-menu.el-menu--horizontal {
            border-bottom: 0;
            width: $default-width;
            max-width: $max-width;
            min-width: $min-width;

            .float-right {
                float: right;

                a {
                    padding: 0 15px;
                }
            }
        }

        .menu-drawer {
            display: none;
        }

        .nav-searchbox {
            padding: 0 25px !important;
            top: -2px;

            &.nav-searchbox-large {
                .el-input {
                    width: 300px;
                }
            }

            &.is-active {
                border-color: transparent;
            }

            .el-input {
                width: 200px;
            }
        }

        a {
            text-decoration: none;
            height: 60px;
            line-height: 60px;
            display: inline-block;
            // padding: 0 20px;
            padding: 0 15px;
            font-size: 14px;
            font-weight: normal;
        }

        .el-menu-item {
            padding: 0;

            [class^='el-icon-'] {
                font-size: 15px;
                margin-right: 2px;
            }

            &>span {
                position: relative;
                top: -1px;
            }
        }
    }
}

.el-menu-item * {
    vertical-align: middle;
}
</style>