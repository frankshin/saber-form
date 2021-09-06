<template>
  <div>
    <FileUpload
      v-model="data[name]"
      :tips="tips"
      :source-type="sourceType"
      :accept="accept"
      :size-limit="sizeLimit"
      :amount-limit="amount"
      :ajax-params="ajaxParams"
      :default-files="defaultFiles"
    />
  </div>
</template>

<script>
import FileUpload from './src/upload.vue'

import { isObject } from '@/utils/types';

export default {
  components: {
    FileUpload,
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
    const {
      sourceType, name, tips = '', accept = ['jpg', 'jpeg', 'png'],
      sizeLimit = 3 * 1024 * 1024, amount = 3, ajaxParams = {}, ...restParams
    } = this.componentProps
    return {
      name,
      tips,
      sourceType,
      accept,
      sizeLimit,
      amount,
      ajaxParams,
      ...restParams,
      // deal 特殊组件数据回显
      defaultFiles: []
    }
  },
  watch: {
    data: function() {
      if (this.data && isObject(this.data) && this.data[this.name]) {
        this.defaultFiles = this.data[this.name]
      }
    }
  },
}
</script>
