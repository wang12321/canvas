<template>
  <div>
    <div>
      <canvas ref="fz" width="1000" height="400" style="background-color: #f7f7f7" />
    </div>
    <img ref="img" style="display: none" src="../../../assets/image/xm.png" alt="">
    <div>
      <canvas ref="hb" width="1000" height="400" style="background-color: #f7f7f7" />
    </div>
    <img ref="imghb" style="display: none" src="../../../assets/image/xm.png" alt="">

    <div>
      <canvas ref="ld" width="1000" height="400" style="background-color: #f7f7f7" />
    </div>
    <img ref="imgld" style="display: none" src="../../../assets/image/xm.png" alt="">

    <div>
      <canvas ref="fg" width="1000" height="400" style="background-color: #f7f7f7" />
    </div>
    <img ref="imgfg" style="display: none" src="../../../assets/image/xm.png" alt="">

    <div>
      <canvas ref="hm" width="1000" height="400" style="background-color: #f7f7f7" />
    </div>
    <img ref="imghm" style="display: none" src="../../../assets/image/xm.png" alt="">

    <div>
      <canvas ref="tm" width="1000" height="400" style="background-color: #f7f7f7" />
    </div>
    <img ref="imgtm" style="display: none" src="../../../assets/image/xm.png" alt="">

  </div>
</template>

<script>
export default {
  name: 'Pixel',
  meta: {
    title: '像素操作',
    icon: 'form',
    permissionArray: [1, 2, 3],
    sortIndex: 1,
    newTime: '2022-05-20'
  },
  mounted() {
    this.fz() // 反转效果
    this.hb() // 黑白效果
    this.ld() // 亮度效果
    this.fg() // 复古效果
    this.hm() // 红色蒙版
    this.tm() // 透明处理
  },
  methods: {
    fz() {
      // 获取canvas对象 像素操作
      const cnv = this.$refs.fz
      // 获取上下文环境对象context
      const cxt = cnv.getContext('2d')
      // 开始绘制图形
      const image = this.$refs.img
      image.onload = () => {
        cxt.drawImage(image, 10, 10)
        const imgData = cxt.getImageData(10, 10, 400, 400)
        const data = imgData.data
        console.log(imgData)
        // 遍历每个像素
        for (let i = 0; i < data.length; i += 4) {
          data[i + 0] = 255 - data[i + 0]
          data[i + 1] = 255 - data[i + 1]
          data[i + 2] = 255 - data[i + 2]
        }
        // 在指定位置输出图片
        cxt.putImageData(imgData, 410, 10)
      }
    },
    hb() {
      // 获取canvas对象 像素操作
      const cnv = this.$refs.hb
      // 获取上下文环境对象context
      const cxt = cnv.getContext('2d')
      // 开始绘制图形
      const image = this.$refs.imghb
      image.onload = () => {
        cxt.drawImage(image, 10, 10)
        const imgData = cxt.getImageData(10, 10, 400, 400)
        const data = imgData.data
        // 遍历每个像素
        for (let i = 0; i < data.length; i += 4) {
          // const average = (data[i + 0] + data[i + 1] + data[i + 2]) / 3
          // data[i + 0] = average // 红
          // data[i + 1] = average // 绿
          // data[i + 2] = average // 蓝
          const grayscale = data[i] * 0.3 + data[i + 1] * 0.6 + data[i + 2] * 0.1
          data[i + 0] = grayscale // 红
          data[i + 1] = grayscale // 绿
          data[i + 2] = grayscale // 蓝
        }
        // 在指定位置输出图片
        cxt.putImageData(imgData, 410, 10)
      }
    },
    ld() {
      // 获取canvas对象 像素操作
      const cnv = this.$refs.ld
      // 获取上下文环境对象context
      const cxt = cnv.getContext('2d')
      // 开始绘制图形
      const image = this.$refs.imgld
      image.onload = () => {
        cxt.drawImage(image, 10, 10)
        const imgData = cxt.getImageData(10, 10, 400, 400)
        const data = imgData.data
        console.log(imgData)
        // 遍历每个像素
        for (let i = 0; i < data.length; i += 4) {
          const a = 100
          data[i + 0] += a
          data[i + 1] += a
          data[i + 2] += a
        }
        // 在指定位置输出图片
        cxt.putImageData(imgData, 410, 10)
      }
    },
    fg() {
      // 获取canvas对象 像素操作
      const cnv = this.$refs.fg
      // 获取上下文环境对象context
      const cxt = cnv.getContext('2d')
      // 开始绘制图形
      const image = this.$refs.imgfg
      image.onload = () => {
        cxt.drawImage(image, 10, 10)
        const imgData = cxt.getImageData(10, 10, 400, 400)
        const data = imgData.data
        console.log(imgData)
        // 遍历每个像素
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i + 0]
          const g = data[i + 1]
          const b = data[i + 2]

          data[i + 0] = r * 0.39 + g * 0.76 + b * 0.18
          data[i + 1] = r * 0.35 + g * 0.68 + b * 0.16
          data[i + 2] = r * 0.27 + g * 0.53 + b * 0.13
        }
        // 在指定位置输出图片
        cxt.putImageData(imgData, 410, 10)
      }
    },
    hm() {
      // 获取canvas对象 像素操作
      const cnv = this.$refs.hm
      // 获取上下文环境对象context
      const cxt = cnv.getContext('2d')
      // 开始绘制图形
      const image = this.$refs.imghm
      image.onload = () => {
        cxt.drawImage(image, 10, 10)
        const imgData = cxt.getImageData(10, 10, 400, 400)
        const data = imgData.data
        console.log(imgData)
        // 遍历每个像素
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i + 0]
          const g = data[i + 1]
          const b = data[i + 2]

          const average = (r + g + b) / 3
          data[i + 0] = average
          data[i + 1] = 0
          data[i + 2] = 0
        }
        // 在指定位置输出图片
        cxt.putImageData(imgData, 410, 10)
      }
    },
    tm() {
      // 获取canvas对象 像素操作
      const cnv = this.$refs.tm
      // 获取上下文环境对象context
      const cxt = cnv.getContext('2d')
      // 开始绘制图形
      const image = this.$refs.imgtm
      image.onload = () => {
        cxt.drawImage(image, 10, 10)
        const imgData = cxt.getImageData(10, 10, 400, 400)
        const data = imgData.data
        console.log(imgData)
        // 遍历每个像素
        for (let i = 0; i < data.length; i += 4) {
          data[i + 3] = data[i + 3] * 0.3
        }
        // 在指定位置输出图片
        cxt.putImageData(imgData, 410, 10)
      }
    }
  }
}
</script>

<style scoped>

</style>
