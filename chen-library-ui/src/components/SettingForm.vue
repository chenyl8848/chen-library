<template>
  <div class="setting-form">
    <el-form ref="settingForm" label-position="top" label-width="80px" :model="settings">
      <el-row :gutter="20">
        <el-col v-for="(item, index) in settings" :key="`settings-${item.id}`" :span="item.col_num || 24">
          <el-form-item>
            <template #label>
              {{ item.label }}
              <template v-if="item.placeholder">（<small>{{ item.placeholder }}</small>）</template>
            </template>
            <el-input-number v-if="item.input_type === 'number'" v-model="settings[index]['value']" clearable :min="0"
              :placeholder="item.placeholder" :step="1"></el-input-number>
            <el-input v-else-if="item.input_type === 'textarea'" v-model="settings[index]['value']" type="textarea"
              :placeholder="item.placeholder" rows="5"></el-input>
            <el-select v-else-if="item.input_type === 'select'" v-model="settings[index]['value']">
              <el-option v-for="option in item.options.split('\n')" :key="`option-${option}`"
                :label="option.split(':')[1]" :value="option.split(':')[0]"></el-option>
            </el-select>
            <el-select v-else-if="item.input_type === 'select-multi'" v-model="settings[index]['value']" multiple
              clearable>
              <el-option v-for="option in item.options.split('\n')" :key="`option-${option}`"
                :label="option.split(':')[1]" :value="option.split(':')[0]"></el-option>
            </el-select>
            <el-switch v-else-if="item.input_type === 'switch'" v-model="settings[index]['value']"
              active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否" :active-value="'true'"
              :inactive-value="'false'">
            </el-switch>
            <UploadImage v-else-if="item.input_type === 'image'" :action="'/api/v1/upload/config'"
              :image="settings[index]['value']" :width="'200px'" :show-remove="true"
              @remove="settings[index]['value'] = ''" @success="success($event, index)" />
            <el-input v-else v-model="settings[index]['value']" :placeholder="item.placeholder" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" icon="Check" :loading="loading" @click="onSubmit" size="large">保存设置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { defineProps, ref, watch } from 'vue'
import UploadImage from './UploadImage.vue'

const $props = defineProps({
  initSettings: {
    type: Array,
    default: () => []
  }
})

const loading = ref(false)
let settings = ref([])

watch(() => $props.initSettings, (newValue) => {
  const tempSettings = { ...newValue }
  Object.values(tempSettings).forEach((item) => {
    if (item.input_type === 'select-multi') {
      try {
        item.value = item.value.split(',')
      } catch (error) {
        console.log(error)
      }
    } else if (item.input_type === 'number') {
      item.value = Number(item.value)
    }
  })
  settings.value = tempSettings
}, { immediate: true })

const onSubmit = () => {
  loading.value = true

  const tempSettings = []
  Object.values(settings.value).forEach((item) => {
    // 注意：value值类型全都是字符串，所以提交上去的value值也要转换成字符串
    let value = ''
    try {
      if (item.value) {
        value = item.value.toString()
      }
    } catch (error) {
      console.log(error)
    }
    tempSettings.push({ ...item, value })
  })
  console.log(tempSettings, "temppppppppppppp")
  // const res = await updateConfig({ config: settings })
  // if (res.status === 200) {
  //   this.$message.success('配置更新成功')
  // } else {
  //   this.$message.error(res.data.message || '配置更新失败')
  // }
  loading.value = false
}

const success = (res, index) => {
  settings[index] = { ...settings[index], value: res.data.path }
}
</script>
<style lang="scss">
.setting-form {

  .el-form-item__label {
    padding-bottom: 0;
    line-height: 28px;
  }
}
</style>
