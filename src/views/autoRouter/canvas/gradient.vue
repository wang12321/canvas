<template>
  <div>
    <canvas ref="jianb" width="1000" height="310" style="background-color: #f7f7f7" />

    <canvas ref="jianbwz" width="1000" height="310" style="background-color: #f7f7f7" />

    <canvas ref="jianbjx" width="1000" height="310" style="background-color: #f7f7f7" />

    <canvas ref="yy" width="1000" height="410" style="background-color: #f7f7f7" />
    <img ref="img" style="display: none" src="../../../assets/image/xm.png" alt="">

  </div>
</template>

<script>
export default {
  name: 'Gradient',
  meta: {
    title: '渐变及阴影',
    icon: 'form',
    permissionArray: [1, 2, 3],
    sortIndex: 1,
    newTime: '2022-05-20'
  },
  mounted() {
    this.jianb()
    this.jianbwz()
    this.jianbjx()
    this.yy()
  },
  methods: {
    yy() {
      // 获取canvas对象 像素操作
      const cnv = this.$refs.yy
      // 获取上下文环境对象context
      const cxt = cnv.getContext('2d')
      // 开始绘制图形
      const image = this.$refs.img
      image.onload = () => {
        // 定义阴影
        cxt.shadowOffsetX = 5
        cxt.shadowOffsetY = 5
        cxt.shadowColor = 'HotPink'
        cxt.shadowBlur = 5

        // 定义文字
        var text = '渐变及阴影'
        cxt.font = 'bold 40px 微软雅黑'

        // 填充文字
        cxt.fillText(text, 440, 200)

        cxt.fillRect(440, 15, 120, 120)
        cxt.drawImage(image, 10, 10)
      }
    },
    jianbjx() {
      // 获取canvas对象 像素操作
      const cnv = this.$refs.jianbjx
      // 获取上下文环境对象context
      const cxt = cnv.getContext('2d')
      // 开始绘制图形
      // 画圆
      cxt.beginPath()
      cxt.arc(80, 80, 50, 0, Math.PI * 2, true)
      cxt.closePath()
      // 渐变
      var gnt = cxt.createRadialGradient(100, 60, 15, 80, 80, 50)
      gnt.addColorStop(0, 'white')
      gnt.addColorStop(0.9, 'orange')
      gnt.addColorStop(1, 'rgba(0,0,0,0)')
      // 填充
      cxt.fillStyle = gnt
      cxt.fill()

      var gradient = cxt.createRadialGradient(260, 60, 0, 260, 60, 60)
      gradient.addColorStop('0', 'magenta')
      gradient.addColorStop('0.25', 'blue')
      gradient.addColorStop('0.50', 'green')
      gradient.addColorStop('0.75', 'yellow')
      gradient.addColorStop('1.0', 'HotPink')
      cxt.fillStyle = gradient
      cxt.fillRect(200, 0, 120, 120)

      var i = 0
      setInterval(function() {
        gradient = cxt.createRadialGradient(460, 60, 0, 460, 60, 60)
        gradient.addColorStop(i * 0, 'magenta')
        gradient.addColorStop(i * 0.25, 'blue')
        gradient.addColorStop(i * 0.50, 'green')
        gradient.addColorStop(i * 0.75, 'yellow')
        gradient.addColorStop(i * 1.0, 'HotPink')
        cxt.fillStyle = gradient

        i = i + 0.1
        if (i >= 1) { // 超过颜色点值后，自动归0
          i = 0
        }
        cxt.fillRect(400, 0, 120, 120)
      }, 50)
    },
    jianbwz() {
      // 获取canvas对象 像素操作
      const cnv = this.$refs.jianbwz
      // 获取上下文环境对象context
      const cxt = cnv.getContext('2d')
      // 开始绘制图形
      var text = '渐变及阴影'
      cxt.font = 'bold 30px 微软雅黑'

      var gnt = cxt.createLinearGradient(0, 150, 200, 150)
      gnt.addColorStop(0, 'HotPink')
      gnt.addColorStop(1, 'LightSkyBlue')
      cxt.fillStyle = gnt
      cxt.fillText(text, 10, 100)

      var gnt1 = cxt.createLinearGradient(200, 0, 200, 150)
      gnt1.addColorStop(0, 'HotPink')
      gnt1.addColorStop(1, 'LightSkyBlue')
      cxt.fillStyle = gnt1
      cxt.fillText(text, 210, 100)

      var gnt2 = cxt.createLinearGradient(0, 160, 200, 310)
      gnt2.addColorStop(0, 'HotPink')
      gnt2.addColorStop(1, 'LightSkyBlue')
      cxt.fillStyle = gnt2
      cxt.fillText(text, 10, 200)

      var gnt3 = cxt.createLinearGradient(200, 310, 400, 160)
      gnt3.addColorStop(0, 'HotPink')
      gnt3.addColorStop(1, 'LightSkyBlue')
      cxt.fillStyle = gnt3
      cxt.fillText(text, 210, 200)
    },
    jianb() {
      // 获取canvas对象 像素操作
      const cnv = this.$refs.jianb
      // 获取上下文环境对象context
      const cxt = cnv.getContext('2d')
      // 开始绘制图形
      var gnt = cxt.createLinearGradient(0, 150, 200, 150)
      gnt.addColorStop(0, 'HotPink')
      gnt.addColorStop(1, 'green')
      cxt.fillStyle = gnt
      cxt.fillRect(0, 0, 200, 150)

      var gnt1 = cxt.createLinearGradient(0, 160, 200, 310)
      gnt1.addColorStop(0, 'HotPink')
      gnt1.addColorStop(1, 'green')
      cxt.fillStyle = gnt1
      cxt.fillRect(0, 160, 200, 150)

      var gnt2 = cxt.createLinearGradient(200, 0, 200, 150)
      gnt2.addColorStop(0, 'HotPink')
      gnt2.addColorStop(1, 'green')
      cxt.fillStyle = gnt2
      cxt.fillRect(210, 0, 200, 150)

      var gnt3 = cxt.createLinearGradient(210, 310, 400, 160)
      gnt3.addColorStop(0, 'HotPink')
      gnt3.addColorStop(1, 'green')
      cxt.fillStyle = gnt3
      cxt.fillRect(210, 160, 200, 150)
    }
  }
}
</script>

<style scoped>

</style>
