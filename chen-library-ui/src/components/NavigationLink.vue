<template>
    <el-menu-item :class="hiddenXS ? 'hidden-xs-only' : ''" :key="`nav-${navigation.id}`"
        :index="`nav-${navigation.id}`">
        <template v-if="navigation.href">
            <!-- 判断是否存在 https:// 或者 http:// -->
            <template v-if="navigation.href.indexOf('https://') === 0 || navigation.href.indexOf('http://') === 0">
                <a :href="navigation.href" :target="navigation.target" :style="`color: ${navigation.color}`"
                    class="el-link el-link--default">
                    {{ navigation.title }}
                </a>
            </template>
            <router-link v-else :to="navigation.href" :target="navigation.target" :style="`color: ${navigation.color}`"
                class="el-link el-link--default">{{ navigation.title }}</router-link>
        </template>
        <template v-else>
            <span :style="`color: ${navigation.color}`">{{ navigation.title }}</span>
        </template>
    </el-menu-item>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
    navigation: {
        type: Object,
        default: () => { }
    },
    hiddenXS: {
        type: Boolean,
        default: false
    }
})
</script>