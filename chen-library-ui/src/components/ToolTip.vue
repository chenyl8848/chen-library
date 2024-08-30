<template>
  <el-tooltip class="item" effect="dark" :content="content" placement="top">
    <el-button size="small" type="primary" link icon="Info"></el-button>
  </el-tooltip>
</template>
<script>
export default {
  name: 'ToolTip',
  props: {
    content: {
      type: String,
      default: '',
    },
  },
}
</script>
