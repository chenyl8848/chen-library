<template>
    <div class="user-dynamic">
        <el-table v-loading="loading" :data="dynamics" style="width: 100%">
            <el-table-column prop="created_at" label="时间" :width="isMobile ? 90 : 160">
                <template #default="scope">
                    <el-tooltip :content="formatDateTime(scope.row.created_at)" placement="top">
                        <span>{{ formatRelativeTime(scope.row.created_at) }}</span>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column prop="title" label="内容">
                <template #default="scope">
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <span v-html="scope.row.content"></span>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-if="total > 0" :current-page="query.currentPage" :page-size="query.pageSize" :layout="isMobile
            ? 'total, prev, pager, next'
            : 'total, prev, pager, next, jumper'
            " :pager-count="isMobile ? 5 : 7" :small="isMobile" :total="total" @current-change="pageChange"
            class="mgt-20px">
        </el-pagination>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { dynamicList } from '../../../mock/data'
import { formatDateTime, formatRelativeTime } from '@/utils/utils'
import hooks from '@/hooks'
const { isMobile } = hooks()

const loading = ref(false)
const dynamics = ref([])
const total = ref(0)
const query = reactive({
    currentPage: 1,
    pageSize: 10
})

const getDynamics = () => {
    console.log(query)
    loading.value = true
    setTimeout(() => {
        loading.value = false
        dynamics.value = dynamicList
        total.value = 55
    }, 2000);
}

const pageChange = (page) => {
    query.currentPage = page
    getDynamics()
}

onMounted(() => {
    getDynamics()
})


</script>

<style lang="scss">
.user-dynamic {
    .doc-title {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 180%;

        img {
            height: 18px;
            position: relative;
            top: 3px;
        }
    }
}
</style>