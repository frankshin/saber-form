<template>
  <el-form
    ref="saberform"
    :model="saberform"
    :label-position="formConfigs.labelPosition"
  >
    <el-row v-for="item in formConfigs.items" :key="item.label">
      <el-col v-if="!item.children" :span="item.span || 24">
        <el-form-item
          v-if="item.display !== false"
          v-bind="formItemBinds(item.formProps)"
          :prop="item.formProps.name"
        >
          <component
            :is="item.type"
            :component-props="item.componentProps"
            :data="saberform"
          />
        </el-form-item>
      </el-col>

      <el-col v-if="item.children">
        <el-row :gutter="20">
          <el-col v-for="child in item.children" :key="child.label" :span="child.span || 24">
            <el-form-item
              v-if="item.display !== false"
              v-bind="formItemBinds(child.formProps)"
              :prop="child.formProps.name"
            >
              <component
                :is="child.type"
                :component-props="child.componentProps"
                :data="saberform"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row>
      <el-col
        v-if="formConfigs.footer && !formConfigs.footer.hide && formConfigs.footer.template === 'temp1'"
        :span="24"
        style="display:flex;justify-content: space-evenly;"
      >
        <el-button type="primary" @click="onSubmit">{{ formConfigs.footer.sureText || '确定' }}</el-button>
        <el-button @click="$emit('on-cancel')">{{ formConfigs.footer.cancelText || '取消' }}</el-button>
      </el-col>

      <el-col
        v-if="formConfigs.footer && !formConfigs.footer.hide && formConfigs.footer.template === 'temp2'"
        :span="24"
        style="display:flex;justify-content: flex-end;"
      >
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
// main components
import CheckBox from './check-box/index.vue'
import DatePicker from './date-picker/index.vue'
import InputComponent from './input/index'
import RadioComponent from './radio'
import SelectComponent from './select'
import FileUpload from './upload-file'

// side components
import ElFormItem from './form/src/form-item.vue'
import ElCol from './col/src/col'
import ElRol from './row/src/row'

import { deepCopy } from '@/utils/base'

export default {
  name: 'SaberForm',
  componentName: 'SaberForm',
  components: {
    CheckBox,
    DatePicker,
    InputComponent,
    RadioComponent,
    SelectComponent,
    FileUpload,
    ElFormItem,
    ElCol,
    ElRol,
  },
  props: {
    exportFormData: {
      type: Function,
      default: function (){
        return () => {}
      }
    },
    formConfigs: {
      type: Object,
      default: function () {
        return {
        }
      }
    },
    // 表单默认值
    defaultFormData: {
      type: Object,
      default: function() {
        return {}
      }
    },
    // 在操作透出数据后是否清空当前数据
    cleanCache: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      saberform: deepCopy(this.defaultFormData),
    }
  },
  computed: {
  },
  watch: {
    defaultFormData: function() {
      this.saberform = deepCopy(this.defaultFormData)
    },
  },
  methods: {
    onSubmit() {
      this.$refs['saberform'].validate(valid => {
        if (valid) {
          this.exportFormData(this.saberform)
          if (this.cleanCache) {
            this.saberform = {}
          }
        } else {
          return false;
        }
      });
    },
    formItemBinds (props) {
      return {
        labelWidth: '100px',
        ...props,
      }
    }
  }
}
</script>
