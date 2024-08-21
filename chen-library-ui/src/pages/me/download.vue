<template>
  <div>
    <user-download :user-id="userStore.user.id"></user-download>
  </div>
</template>

<script setup>
import UserDownload from '@/components/UserDownload.vue'
import useUserStore from '@/store/module/user'
const userStore = useUserStore()
</script>

<style lang="scss"></style>