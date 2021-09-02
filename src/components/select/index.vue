<template>
  <el-select
    v-model="data[componentProps.name]"
    style="width: 100%"
    v-bind="componentProps"
  >
    <el-option
      v-for="opt in componentProps.option"
      :key="opt.code"
      :label="opt.label"
      :value="opt.value"
    ></el-option>
  </el-select>
</template>

<script>
import SelectComponent from './src/select'

export default {
  components: {
    SelectComponent,
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
