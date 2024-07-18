<template>
  <el-container class="front-default">
    <front-header></front-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer height="auto">
      <front-footer></front-footer>
    </el-footer>
  </el-container>
</template>

<script setup>
import FrontHeader from '@/components/FrontHeader.vue'
import FrontFooter from '@/components/FrontFooter.vue'
</script>

<style lang="scss">
.autoheight .front-default .el-main {
  min-height: auto;

  .page {
    min-height: calc(100vh - 60px - 135px);
  }
}

.front-default {
  background-color: $background-grey-light;
  min-width: $min-width !important;
  min-height: 100vh;

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

  .el-main {
    padding-left: 0;
    padding-right: 0;
    min-height: calc(100vh - 60px);
  }

  .el-link {
    font-size: 15px;
  }

  .el-rate {
    display: inline-block;

    .el-rate__icon {
      margin-right: 0;
    }

    .el-rate__text {
      margin-left: 5px;
      color: #bdc3c7 !important;
    }
  }

  .el-breadcrumb__inner a,
  .el-breadcrumb__inner.is-link {
    font-weight: normal;
  }

  padding-top: 60px;

  .el-card {
    border-radius: 5px;
    border: 0;
  }

  .user-center {
    &.is-active {
      border-color: transparent !important;
    }

    .el-dropdown-link {
      line-height: 60px;
      display: inline-block;
      font-weight: 400;
      font-size: 1.2em;
      margin-top: -8px;

      .user-avatar {
        position: relative;
        top: -2px;
      }
    }
  }
}

.dropdown-upload {
  font-size: 17px;
  margin-left: -2px;
}

.page {
  width: $default-width;
  min-width: $min-width !important;
  // max-width: $max-width;
  margin: 0 auto;
  overflow-x: hidden;
}

.btn-search {
  cursor: pointer;
}

.channel-category {
  &.is-active {
    background-color: #f2f6fc !important;

    a {
      color: #409eff;
    }
  }

  a {
    display: block;
  }
}

.el-menu--popup {
  min-width: 115px;

  .el-menu-item {
    a {
      display: block;
    }
  }
}

.el-dialog__header {
  padding: 20px 20px 10px;
}

.el-dialog__body {
  padding: 1px 20px;
}

.el-menu-mobile {
  margin-top: 15px;
  margin-left: -15px;
  border-right: 0;

  &>li {
    padding-left: 0;
  }

  .el-submenu__title {
    height: 32px;
    line-height: 32px;
    font-size: 15px;
  }

  .el-menu-item {
    height: 32px;
    line-height: 32px;
  }
}
</style>