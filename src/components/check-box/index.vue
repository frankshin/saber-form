<template>
  <div class="saber-form-checbox-wrap">
    <el-checkbox-group
      v-model="data[restParams.name]"
    >
      <el-checkbox
        v-for="opt in restParams.option"
        :key="opt.value"
        :label="opt.value"
        v-bind="restParams"
        @change="val => { opt.change && opt.change(val, data) }"
      >
        <div class="check_extend_wrap">
          <span>{{ opt.label }}</span>
          <el-form-item
            v-for="extend in opt.extends"
            :key="extend.key"
            style="margin-left: 5px;"
            v-bind="extend.formProps"
            :prop="extend.formProps.name"
          >
            <el-checkbox-group
              v-if="extend.type === CHECKBOX && (extend.display || data[componentProps.name].includes(opt.value))"
              v-model="data[extend.componentProps.name]"
            >
              <el-checkbox
                v-for="extendOpt in extend.componentProps.option"
                :key="extendOpt.value"
                :label="extendOpt.value"
                v-bind="extend.componentProps"
                @change="val => { opt.change && opt.change(val, data) }"
              >
                <span>{{ extendOpt.label }}</span>
              </el-checkbox>
            </el-checkbox-group>
            <span v-if="extend.unit">{{ extend.unit && extend.unit.label }}</span>
          </el-form-item>
        </div>
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
import ElCheckbox from './src/checkbox.vue'
import ElCheckboxGroup from './src/checkbox-group.vue'
import { FORM_COMPONENTS } from '@/constants'

export default {
  components: {
    ElCheckbox,
    ElCheckboxGroup
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
    },
  },
  data() {
    // ps: restParams需保证是纯属性对象，以避免一些异常问题
    const {
      change = () => {}, ...restParams
    } = this.componentProps
    return {
      change,
      restParams,
      ...FORM_COMPONENTS,
    }
  },
}
</script>

<style lang="less" scoped>
  .saber-form-checbox-wrap{
    .check_extend_wrap{
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .el-checkbox-group{
        display: flex;
        flex-wrap: wrap;
      }
    }
  }
</style>



