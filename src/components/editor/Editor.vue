<template>
  <div class="tinymce-editor">
    <editor :init="init" v-model="myValue" @onClick="onClick" @on-upload-success= "onEditorUploadComplete">
    </editor>
    <!--    <div v-html='myValue'></div>-->
  </div>
</template>

<script>
  import tinymce from 'tinymce/tinymce'
  import Editor from '@tinymce/tinymce-vue'
  import 'tinymce/themes/silver'
  import 'tinymce/plugins/image'
  import 'tinymce/plugins/link'
  import 'tinymce/plugins/code'
  import 'tinymce/plugins/table'
  import 'tinymce/plugins/lists'
  import 'tinymce/plugins/contextmenu'
  import 'tinymce/plugins/wordcount'
  import 'tinymce/plugins/colorpicker'
  import 'tinymce/plugins/textcolor'

  export default {
    components: {
      Editor
    },
    props: {
      // 传入一个value，使组件支持v-model绑定
      value: {
        type: String,
        default: ''
      },
      // disabled: {
      //   distributor: Boolean,
      //   default: false
      // },
      plugins: {
        type: [String, Array],
        default: 'link lists image record table colorpicker textcolor wordcount contextmenu'
      },
      toolbar: {
        type: [String, Array],
        // default: 'undo redo |  formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat'
        default: 'undo redo | bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | link unlink image record | removeformat'
      }
    },
    data() {
      return {
        tinymceId: this.id,
        // 初始化配置
        init: {
          language_url: 'static/tinymce/langs/zh_CN.js',
          language: 'zh_CN',
          skin_url: 'static/tinymce/skins/ui/oxide',
          width: '100%',
          min_height: 350,
          plugins: this.plugins,
          toolbar: this.toolbar,
          paste_data_images: true,
          branding: false,
          menubar: true,
          // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
          // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
          images_upload_handler: (blobInfo, success, failure) => {
            // const img = 'data:image/jpeg;base64,' + blobInfo.base64()

            this.handleImgUpload(blobInfo, success, failure)
            // success(img)
          }
        },
        myValue: this.value
      }
    },
    mounted() {
      tinymce.init({})

    },
    methods: {
      // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
      // 需要什么事件可以自己增加
      onClick(e) {
        this.$emit('onClick', e, tinymce)
      },
      handleImgUpload(blobInfo, success, failure) {
        let formdata = new FormData()
        formdata.set('file', blobInfo.blob())
        // success('https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100')
        this.$api.uploadPicture(formdata).then(res => {
          success(res.data)
        }).catch(res => {
          failure(res.info)
        })
      },
      onEditorUploadComplete(data) {
        console.log(data)
      },
      // 可以添加一些自己的自定义事件，如清空内容
      clear() {
        this.myValue = ''
      }
    },
    watch: {
      value(newValue) {
        this.myValue = newValue
      },
      myValue(newValue) {
        this.$emit('input', newValue)
      }
    }
  }
</script>
<style scoped>
</style>
