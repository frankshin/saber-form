<template>
  <div class="saber-form-file-upload">
    <el-button
      v-if="imageUrls.length < amountLimit"
      type="primary"
      class="input"
      :disabled="pending || filePending"
      @click="$refs.fileInput.click()"
    >
    {{ pending ? '上传中' : '+上传' }}
    </el-button>
    <input
      ref="fileInput"
      type="file"
      class="input"
      style="display: none"
      @change="uploadFile"
    />
    <div class="file_list">
      <viewer v-for="(url, index) in imageUrls" :key="url">
        <div class="image-box">
          <img :src="url" alt="">
          <span class="image-close" @click.stop="() => remove(index)">
            <i class="el-icon-close"></i>
          </span>
        </div>
      </viewer>
    </div>
    <div class="tips-wrap">{{ tips }}</div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import Viewer from 'v-viewer'

const options = { title: false }
Vue.use(Viewer, options)
Viewer.setDefaults(options)

function getTypeByPrefix() {
  // 文件后缀对应的 Content-Type，由于 rar、7z 文件通过 input-file 无法获取类型
  const fileType = {
    'zip': 'application/x-zip-compressed',
    'rar': 'application/x-rar-compressed',
    '7z': 'application/x-7z-compressed',
  }
  const type = fileType['saber-form-file-upload']
  return type ? type : ''
}

export default {
  props: {
    sourceType: String,
    tips: String,
    accept: Array,
    sizeLimit: Number,
    ajaxParams: Object,
    amountLimit: Number,
    defaultFiles: Array
  },
  data() {
    return {
      pending: false,
      filePending: false,
      imageUrls: [],
    }
  },
  watch: {
    defaultFiles: function () {
      this.imageUrls = [...this.defaultFiles]
    }
  },
  methods: {
    uploadFile() {
      const file = this.$refs.fileInput.files[0]
      this.$refs.fileInput.value = '';
      const suffix = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length)
      if (file.size > this.sizeLimit) {
        this.$message({ message: `文件大小不能超过${this.sizeLimit / 1024 / 1024}M`, type: 'error', center: true })
        return;
      } else if (this.accept.length > 0 && this.accept.indexOf(suffix) === -1) {
        this.$message({ message: `只能上传 ${this.accept.join('/')} 格式文件`, type: 'error', center: true });
        return;
      }
      this.getAccessKey(file, suffix)
    },
    async getAccessKey(file, suffix) {
      const { path, method = 'post', headers } = this.ajaxParams
      this.pending = true
      const fileType = file.type ? file.type : getTypeByPrefix(suffix) // 对一些没有type的文件作兼容
      try {
        const { data } = await axios({
          method: method,
          url: path,
          headers,
          data: {
            suffix,
            type: this.sourceType,
            contentType: fileType
          },
        });
        const { result } = data || {}
        this.uploadToServer(result, file)
      } catch (error) {
        this.pending = false
        this.$message({ message: '出错了哦~', type: 'error', center: true })
      }
    },
    async uploadToServer(result, file) {
      const { accessKeyId, policy, signature, fileName, host: url } = result
      const fullPath = `${url}/${fileName}`
      const body = {
        OSSAccessKeyId: accessKeyId,
        policy: policy,
        signature: signature,
        success_action_status: '200',
        key: fileName,
        file,
      }
      const form = new FormData()
      for (const key in body) {
        if (Object.prototype.hasOwnProperty.call(body, key)) {
          form.append(key, body[key]);
        }
      }
      await axios.post(url, form)
      this.pending = false
      this.imageUrls.push(fullPath)
      this.$emit('input', this.imageUrls)
    },
    remove(i) {
      this.imageUrls.splice(i, 1)
      this.$emit('input', this.imageUrls);
    },
  },
}
</script>

<style src="./upload.less" lang="less" scoped></style>
