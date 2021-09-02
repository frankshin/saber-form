<template>
  <el-date-picker
    v-model="data[componentProps.name]"
    style="width: 100%"
    v-bind="componentProps"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
  />
</template>

<script>
import ElDatePicker from './src/picker/date-picker';

export default {
  components: {
    ElDatePicker
  },
  props: {
    componentProps: {
      type: Object,
      default: function () {
        return {}
      },
    },
    data: {
      type: Object,
      default: function () {
        return {}
      },
    }
  },
  data() {
    return {}
  },
}
</script>
