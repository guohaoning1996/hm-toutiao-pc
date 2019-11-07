<template>
  <el-select :value="value"
             @change="fn"
             placeholder="请选择"
             clearable>
    <el-option v-for="item in channelOptions"
               :key="item.id"
               :label="item.name"
               :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {
      // value: null,
      channelOptions: []
    }
  },
  created () {
    this.getChannelOptions()
  },
  methods: {
    // 获取频道选项数据
    async getChannelOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      // 赋值频道下拉选项依赖数据
      this.channelOptions = data.channels
    },
    fn (channelId) {
      // 把数据提交父组件
      if (channelId === '') channelId = null
      this.$emit('input', channelId)
    }
  }

}
</script>

<style scoped lang='less'></style>
