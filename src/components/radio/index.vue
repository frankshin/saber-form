<template>
  <div class="saber-form-radio-wrap">
    <el-radio-group
      v-model="data[componentProps.name]"
      v-bind="componentProps"
      @change="val => componentProps.change && componentProps.change(val)"
    >
      <el-radio
        v-for="opt in componentProps.option"
        :key="opt.code"
        :label="opt.value"
        :value="opt.value"
        class="radio_extend_wrap"
      >
        <div class="radio_extend_wrap">
          <span>{{ opt.label }}</span>
          <div
            v-for="extend in opt.extends"
            :key="extend.key"
          >
            <el-form-item
              v-if="extend.type === INPUT && (extend.display || data[componentProps.name] === opt.value)"
              style="margin-left: 5px;"
              v-bind="extend.formProps"
              :prop="extend.formProps.name"
            >
              <el-input
                v-model="data[extend.componentProps.name]"
                v-bind="extend.componentProps"
              />
              <span
                v-if="extend.unit"
                v-bind="extend.unit.componentProps"
              >{{ extend.unit && extend.unit.label }}</span>
            </el-form-item>
          </div>
        </div>
      </el-radio>
    </el-radio-group>
  </div>
</template>

<script>
import ElRadio from './src/radio';
import ElRadioGroup from '../radio/src/radio-group.vue';

import { FORM_COMPONENTS } from '@/constants'

export default {
  components: {
    ElRadio,
    ElRadioGroup,
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
      ...FORM_COMPONENTS,
    }
  },
  methods: {
  },
}
</script>

<style lang="less" scoped>
  .saber-form-radio-wrap{
    .radio_extend_wrap{
      display: flex;
      align-items: center;
    }
    .el-radio-group{
      height: 40px;
      width: 100%;
      display:flex;
      flex-wrap: wrap;
    }
  }
</style>
