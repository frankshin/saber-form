<template>
  <el-row>
    <el-col :span="topComponentProperty.span || 24">
      <el-input
        v-model="data[topComponentProperty.name]"
        style="width: 100%"
        v-bind="topComponentProperty"
        @input="input"
      />
    </el-col>
    <!-- 扩展组件 -->
    <el-col
      v-if="extendComponents"
      :span="extendComponents.span"
    >
      <el-row>
        <el-col
          v-for="extend in extendComponents.items"
          :key="extend.key"
          :span="extend.span"
        >
          <el-button
            v-if="extend.type === BUTTON && extend.display"
            v-bind="extend.componentProps"
            @click="extend.componentProps.click"
          >{{ extend.componentProps.text }}</el-button>
        </el-col>
      </el-row>
    </el-col>
    <!-- 单位 -->
    <el-col
      v-if="unit"
      v-bind="unit.layoutProps"
    >
      <span>{{ unit.label }}</span>
    </el-col>
  </el-row>

</template>

<script>
import ElInput from './src/input';
import { FORM_COMPONENTS } from '@/constants'

export default {
  components: {
    ElInput,
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
    return {
      extendComponents: {},
      unit: '',
      input: null,
      topComponentProperty: {},
      ...FORM_COMPONENTS,
    }
  },
  watch: {
    componentProps: function() {
      this.resetData(this.componentProps)
    }
  },
  created() {
    this.resetData(this.componentProps)
  },
  methods: {
    resetData(propsData) {
      // ps: restParams需保证是纯属性对象，以避免一些异常问题
      const {
        input = () => {},
        extends: extendComponents,
        unit,
        ...restParams,
      } = propsData
      this.extendComponents = extendComponents
      this.unit = unit
      this.input = input
      this.topComponentProperty = restParams
    }
  },
}
</script>
