<template>
  <div>
    <span>实现签名功能</span>
    <canvas
      id="canvas"
      ref="sb"
      width="500px"
      height="500"
      style="background-color: #f7f7f7;position: absolute;left: 0px"
      @mousedown="canvasDown($event)"
      @mouseup="canvasUp($event)"
      @mousemove="canvasMove($event)"
    />
    <div style="position: relative;top:500px;text-align: left">{{ pageX }}---{{ pageY }}
      <el-button @click="save">保存</el-button>
      <el-button @click="clear">清空</el-button>
    </div>
    <div style="position: absolute;left:510px;top: 0px; background-color: #f4f4f5; text-align: left">
      <img :src="imgStr" alt="图片未上传">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MouseEvents',
  meta: {
    title: '鼠标事件',
    icon: 'form',
    permissionArray: [1, 2, 3],
    sortIndex: 1,
    newTime: '2022-05-20'
  },
  data() {
    return {
      pageX: 0,
      pageY: 0,
      cnv: null,
      cxt: null,
      zt: false,
      imgStr: ''
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {

    // 使用formData上传canvas
    submitImg(canvas) {
      const param = new FormData()
      param.append('file', this.base64ToFile(canvas.toDataURL('image/png')))
      param.append('user_name', 'mason')
      // 注意添加headers
      // axios.post('/que/admin/final/report/chess/image/add/', param, { headers: { 'Content-Type': 'multipart/form-data' }}).then(res => {
      //   console.log(res.data)
      // })
    },
    clear() {
      this.cxt.beginPath() // 开启新路径 删除上传画的
      this.cxt.clearRect(0, 0, this.cnv.width, this.cnv.height)
      this.imgStr = this.canvasToBase64(this.cnv)
    },
    save() {
      if (this.cnv) {
        console.log(this.convertCanvasToImage(this.cnv))
        this.imgStr = this.canvasToBase64(this.cnv)
      }
    },
    // canvas转化为64
    canvasToBase64(canvas) {
      // 'image/png'可以换成'image/jpeg'
      return canvas.toDataURL('image/png')
    },
    // base64转化为file
    base64ToFile(urlData, fileName) {
      const arr = urlData.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const bytes = atob(arr[1])
      let n = bytes.length
      const ia = new Uint8Array(n)
      while (n--) {
        ia[n] = bytes.charCodeAt(n)
      }
      return new File([ia], fileName, { type: mime })
    },
    convertCanvasToImage(canvas) {
      const image = new Image()
      image.src = canvas.toDataURL('image/png')
      return image
    },
    canvasDown(e) {
      console.log('按下', e)
      this.zt = true
      if (!this.cnv) {
        this.cnv = this.$refs.sb
        this.cxt = this.cnv.getContext('2d')
      }

      console.log(this.isCollapse)
      // 开始绘制图形
      if (this.isCollapse) {
        this.cxt.moveTo(e.pageX - 54, e.pageY - 50)
      } else {
        this.cxt.moveTo(e.pageX - 210, e.pageY - 50)
      }
    },
    canvasUp(e) {
      console.log('抬起', e)
      this.zt = false
    },
    canvasMove(e) {
      if (this.zt) {
        if (this.isCollapse) {
          this.pageX = e.pageX - 54
          this.pageY = e.pageY - 50
        } else {
          this.pageX = e.pageX - 210
          this.pageY = e.pageY - 50
        }

        // 获取上下文环境对象context

        // this.cxt.moveTo(50, 100)
        // this.cxt.lineTo(150, 50)
        // this.cxt.stroke()
        this.cxt.lineTo(this.pageX, this.pageY)
        this.cxt.stroke()
      }
    }
  }
}
</script>

<style scoped>

</style>
