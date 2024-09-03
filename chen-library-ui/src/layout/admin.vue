<template>
  <el-container class="layout-admin">
    <el-aside :class="isCollapse ? 'layout-aside-collapsed' : ''" :width="'240px'">
      <div class="logo" @click="goHome" title="文库管理后台">
        <img v-if="isCollapse" src="@/assets/images/logo-icon.png" />
        <img v-else src="@/assets/images/logo.png" />
      </div>
      <transition :duration="{ enter: 800, leave: 800 }" mode="out-in" name="el-fade-in-linear">
        <el-menu :router="true" :default-active="activeMenu" :collapse="isCollapse" class="layout-admin-menu">
          <el-menu-item index="/admin/dashboard">
            <template #title>
              <el-icon>
                <Monitor />
              </el-icon>
              <span>面板</span>
            </template>
          </el-menu-item>
          <template v-for="menu in menus">
            <el-sub-menu v-if="menu.children" :key="`submenu-${menu.page}`" :index="menu.page">
              <template #title>
                <el-icon>
                  <component :is="menu.icon"></component>
                </el-icon>
                <span>{{ menu.title }}</span>
              </template>
              <el-menu-item v-for="child in menu.children" :key="child.page" :index="child.page">
                <el-icon>
                  <component :is="child.icon"></component>
                </el-icon>
                <span>{{ child.title }}</span>
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item v-else :key="`menu-${menu.page}`" :index="menu.page">
              <template #title>
                <el-icon>
                  <component :is="menu.icon"></component>
                </el-icon>
                <span>{{ menu.title }}</span>
              </template>
            </el-menu-item>
          </template>
        </el-menu>
      </transition>
    </el-aside>
    <el-container>
      <el-header>
        <el-button v-if="isCollapse" class="fold" icon="Expand" type="primary" link
          @click="isCollapse = false"></el-button>
        <el-button v-else class="fold" icon="Fold" type="primary" link @click="isCollapse = true"></el-button>
        <el-dropdown trigger="click" @command="command" class="float-right mgt-10px" size="large">
          <el-button>
            <el-icon>
              <User />
            </el-icon>
            <span>{{ userStore.user.username }}</span>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile"> 个人资料 </el-dropdown-item>
              <!-- <el-dropdown-item command="copyjwt"> 复制 JWT </el-dropdown-item> -->
              <el-dropdown-item command="password"> 修改密码 </el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-dialog title="个人资料" v-model="profileFormVisible" width="30%">
      <ProfileForm @success="onSuccess" />
    </el-dialog>
    <el-dialog title="个人资料" v-model="passwordFormVisible" width="30%">
      <PasswordForm @success="onSuccess" />
    </el-dialog>
  </el-container>
</template>

<script setup>
import { ref, watch } from 'vue'
import { adminMenus } from '@/utils/permission'
import useUserStore from '@/store/module/user'
import { useRoute, useRouter } from 'vue-router'
import ProfileForm from '@/components/ProfileForm.vue'
import PasswordForm from '@/components/PasswordForm.vue'
const userStore = useUserStore()
const $router = useRouter()
const $route = useRoute()

const isCollapse = ref(false)

const goHome = () => {
  $router.push('/')
}

const activeMenu = ref('/admin/dashboard')
const menus = adminMenus


watch(() => $route, (newVal) => {
  activeMenu.value = newVal.path
}, { deep: true, immediate: true })


const profileFormVisible = ref(false)
const passwordFormVisible = ref(false)
const command = (command) => {
  switch (command) {
    case 'profile':
      profileFormVisible.value = true
      break
    case 'password':
      passwordFormVisible.value = true
      break
    case 'logout':
      logout()
      break
  }
}

const logout = () => {
  $router.push('/')
}

const onSuccess = () => {
  profileFormVisible.value = false
  passwordFormVisible.value = false
}


</script>

<style lang="scss">
.layout-admin {
  height: 100vh;

  .logo {
    cursor: pointer;
    height: 60px;
    border-bottom: 1px solid #e5e5e5;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    img {
      padding: 5px;
      height: 50px;
      margin: 0 2px;
      max-width: 100%;
    }

    span {
      font-size: 26px;
      width: 240px;
      font-weight: bold;
      text-align: left;
      height: 60px;
      line-height: 60px;
    }
  }

  .el-main {
    background-color: #f0f2f5;
  }

  .el-aside {
    transition: width 0.2s;
    height: 100vh;
    border-right: 1px solid #e6e6e6;

    .el-menu {
      border-right: 0;
    }
  }

  .el-header {
    border-bottom: 1px solid #e6e6e6;
    line-height: 60px;

    .fold {
      padding: 0 15px 0 0;
      font-size: 20px;
      color: #999;
      cursor: pointer;

      &:hover {
        color: #555;
      }
    }
  }

  .el-footer {
    border-top: 1px solid #e6e6e6;
    text-align: center;
    line-height: 60px;
    height: 60px;
    overflow: hidden;
    color: #999;

    a {
      color: #409eff;
    }
  }

  .el-table th {
    height: 45px;
    line-height: 45px;
    padding: 1px 0 5px;

    &.el-table__cell {
      background-color: #f7fbff;
      color: #000;
      font-weight: normal;

      &.el-table-column--selection>.cell {
        padding-left: 14px;
      }
    }

    &.el-table__cell.is-leaf {
      border-bottom: 0;
    }
  }

  .search-card {
    .el-card__body {
      padding-bottom: 0;
    }
  }

  .el-menu-item.is-active {
    background-color: #ecf5ff;
  }
}

.layout-aside-collapsed {
  width: 64px !important;
  overflow: hidden;

  .quickstart-upload {
    padding: 0;

    .el-button {
      height: 59px;
      line-height: 30px;
      padding: 0 5px;
      border-radius: 0;

      span {
        display: block;
      }
    }
  }
}

.layout-admin-menu .fa {
  font-size: 18px;
  width: 24px;
  margin-right: 5px;
  text-align: center;
}
</style>