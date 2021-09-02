# saber-form

> 配置驱动式form解决方案

## 安装

```js
// npm安装
npm install saber-form
// yarn安装
yarn add saber-form

// 在应用的入口文件中配置
import SaberForm from 'saber-form'
import Vue from 'vue'

Vue.use(SaberForm)
```

## 主配置项

### 概览
```html
<ll-form
  :form-configs="object"
  :export-form-data="function"
  :default-form-data="formData"
  :clean-cache="Boolean"
  @on-cancel="function"
/>
```

### 属性说明

#### LlForm props

|  属性名   | 描述  | 类型 | 默认值 |  必填项 | 备注 |
|  ----  | ----  | ----  |  ----  | ----  | ----  |
| form-configs  | 表单配置项 | Object | {} | true | - |
| export-form-data  | 提交表单触发,function(value){},value为form的值 | function | function(value){} | true | - |
| default-form-data  | 表单初始值 | Object | {} | false | - |
| clean-cache  | 下次操作是否缓存上次值 | Boolean | false | false |- |
| on-cancel  | 取消按钮回调函数 | function | - | false | - |

#### FormConfigs

> 配置demo及说明

```js
/**
 * footer: 定义form底部组件及内容
 * template footer模版, temp1: 常用于moal类型的form交互; temp2: 常用于table表单的顶部搜索模块
 * cancelText 取消按钮的文案，默认“取消”
 * sureText 确定按钮的文案，默认“确定”
 * hide 是否隐藏footer模块，默认false
*/
{
  footer: {
    template: 'temp1',
    cancelText: '',
    sureText: '',
    hide: false,
  },
  labelPosition: 'left',
  items: [
    {...},
  ]
}
```

items数据结构

- 表单横向布局

```js
[
  {
    span: 24, // 横向整体布局宽度，默认24
    children: [
      {...}, // 上述配置对象
    ]
  }
]
```

- 表单纵向布局

```js
[
  {...}
]
```

## 子配置项

### input

#### 必填项配置

```js
{
  type: INPUT,
  formProps: {
    name: 'name',
    label: 'label',
  },
  componentProps: {
    name: 'total',
  },
},
```

#### 全部配置

```js
{
  type: INPUT, // 见附录变量表
  span: 24, // form项珊格宽度，默认24
  formProps: {
    name: 'name',
    label: 'label',
    labelWidth: '100px', // label宽度，默认值：100px
    rules: [ // 表单填写项校验
      { required: true, message: '不可为空', trigger: 'blur' },
      { validator: validateTotal, trigger: 'blur' }
    ],
  },
  componentProps: {
    name: 'total',
    span: 24, // 组件span，默认24
    placeholder: '输入总数量',
    style: 'width: 90%;', // 自定义input样式
    disabled: type === 'edit',
    input: () => {}, // input 输入回调函数
    extends: { // 扩展组件队列
      span: 10, // form项span，默认24
      items: [
        {
          type: BUTTON,
          span: 5, // 单项扩展component的span
          key: 1,
          display: true,
          formProps: {
          },
          componentProps: {
            type: 'primary',
            text: '增加优惠券',
            size: 'small',
            click: () => {}
          },
        }
      ],
    },
    unit: { // 表单项备注或单位
      layoutProps: {
        span: 2
      },
      componentProps: {
        style: 'color: red;'
      },
      label: '张'
    },
  },
},
```

### select

#### 必填项配置

```js
{
  type: SELECT,
  formProps: {
    name: 'name',
    label: 'label',
  },
  componentProps: {
    name: 'name',
    option: [
      { label: 'x', value: 'y' },
    ]
  },
},
```

#### 全部配置

```js
{
  type: SELECT,
  span: 24, // form项珊格宽度，默认值 24
  formProps: {
    name: 'status',
    label: 'label',
    labelWidth: '90px', // 默认值 100px
    rules: [
      { required: true, message: '不可为空', trigger: 'blur' },
    ],
  },
  componentProps: {
    name: 'status',
    option: [
      { label: 'x', value: 'y' },
    ]
  },
},
```

### radio

#### 必填项配置

```js
{
  span: 24,
  children: [
    {
      type: RADIO,
      formProps: {
        name: 'name',
        label: 'label',
      },
      componentProps: {
        name: 'limits',
        option: [
          { label: 'x', value: 'y' },
        ],
      },
    },
  ]
},
```

#### 全部配置

```js
{
  span: 24, // form项珊格宽度，默认值 24
  children: [
    {
      type: RADIO,
      span: 20,
      formProps: {
        name: 'name',
        label: 'label',
        labelWidth: '100px', // label宽度，默认 100px
      },
      componentProps: {
        name: 'name',
        option: [
          {
            label: '最大货量',
            value: 'Y',
            extends: [ // 扩展填写项
              {
                type: INPUT,
                key: 1, // 手动定义扩展项的key值
                display: true, // 是否开始即展示该扩展项，若未设置，则默认需要勾选该radio后才展示该raido对应的扩展项
                formProps: {
                  name: 'maxVolume',
                  label: '',
                  labelWidth: '100px',
                },
                componentProps: {
                  name: 'maxVolume',
                  placeholder: '输入最大货量值',
                },
                unit: {
                  label: 'xxxx' // 扩展组件后面的备注式文案，如单位：<Input> 元
                }
              }
            ]
          },
          {
            label: '不限货量',
            value: 'N'
          },
        ],
      },
      unit: {
        label: 'xxxx' // 扩展组件后面的备注式文案，如单位：<Input> 元
      }
    },
  ]
},
```

### checkbox

#### 必填项配置

```js
{
  type: CHECKBOX,
  formProps: {
    name: 'name',
    label: 'label',
  },
  componentProps: {
    name: 'name',
    option: [
      { label: 'label', value: 'ALL' },
    ],
  },
},
```

#### 全部配置

```js
{
  type: CHECKBOX,
  span: 24,
  formProps: {
    name: 'name',
    label: 'label',
    labelWidth: '100px', // form项珊格宽度，默认值 24
    rules: [
      { required: true, message: '不可为空', trigger: 'blur' },
    ]
  },
  componentProps: {
    name: 'name',
    option: [
      { label: 'label', value: 'ALL' },
      {
        label: 'label',
        value: 'EXPRESS',
        change: Function, // checkbox值改变
        extends: [
          {
            type: CHECKBOX,
            key: 1,
            display: false,
            formProps: {
              name: 'express_extend',
              label: '',
              labelWidth: '0px',
            },
            componentProps: {
              name: 'express_extend',
              option: [{ label: 'label', value: 'ALL' }],
              style: 'margin-left: 30px;',
              change: Function, // checkbox值改变回调函数
            },
          }
        ]
      },
      { label: 'label', value: 'value' },
    ],
    style: 'width: 100%;',
    disabled: type === 'edit'
  },
},
```

### date

#### 必填项配置

```js
{
  type: DATE_PICKER,
  formProps: {
    name: 'name',
    label: 'label',
  },
  componentProps: {
    name: 'name',
    type: 'daterange',
    valueFormat: 'yyyy-MM-dd'
  },
},
```

#### 全部配置

```js
{
  type: DATE_PICKER,
  span: 24,
  formProps: {
    name: 'name',
    label: 'label',
    labelWidth: '100px',
    rules: [
      { required: true, message: '不可为空', trigger: 'blur' },
    ],
  },
  componentProps: {
    name: 'name',
    type: 'daterange', // 不传daterange即选单天
    valueFormat: 'yyyy-MM-dd' // 时间格式
  },
},
```

### upload

#### 必填项配置

```js
{
  type: FILE_UPLOAD,
  formProps: {
    name: 'name',
    label: 'label:',
  },
  componentProps: {
    name: 'images',
    sourceType: 'ADVERTISEMENT_PIC',
  },
}
```

#### 全部配置

```js
{
  type: FILE_UPLOAD,
  span: 24,
  formProps: {
    name: 'name',
    label: 'label:',
    labelWidth: '115px',
    rules: [
      { required: true, message: '不可为空', trigger: 'blur' },
    ],
  },
  componentProps: {
    name: 'images',
    sourceType: 'ADVERTISEMENT_PIC',
    tips: 'xxxxxxxx', // 上传文件说明文案
    accept: [], // 接受的文件类型，默认['jpg', 'jpeg', 'png']
    sizeLimit: 1048576, // number, 单位字节，默认大小3*1024*1024
    amount: 1, // number 上传数量限制，默认3
    ajaxParams: { // ajax相关配置 默认值 {}
      path: process.env.API_HOST + 'common/getOssSign',
      headers: { // 需要加入请求头的数据
        a: 'a',
      }
    }
  },
}
```

## 扩展场景
### footer定制
1、 完全自定义footer模块以及表单项存在非配置生成的表单项，可通过ref绑定的方式实现定制化
```html
<ll-form
  ref="xxx"
  :form-configs="queryConfig"
  :export-form-data="query"
/>
```

2、有实时获取form数据（或某些字段值）的场景

## 附录

- 组件名变量映射

```js
{
  SELECT: 'SelectComponent',
  INPUT: 'InputComponent',
  RADIO: 'RadioComponent',
  DATE_PICKER: 'DatePicker',
  CHECKBOX: 'CheckBox',
  BUTTON: 'Button',
  FILE_UPLOAD: 'FileUpload'
}
```