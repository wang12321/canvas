<template>
  <div>
    <canvas ref="zsbx" width="200" height="200" style="background-color: #f7f7f7" />
    <canvas ref="zsbx1" width="200" height="200" style="background-color: #f7f7f7" />
    <canvas ref="zsbx2" width="200" height="200" style="background-color: #f7f7f7" />
    <canvas ref="zsbx3" width="200" height="200" style="background-color: #f7f7f7" />
    <canvas ref="wjx" width="200" height="200" style="background-color: #f7f7f7" />
    <canvas ref="yshb" width="200" height="200" style="background-color: #f7f7f7;position: relative" />
    <canvas ref="ysjb" width="200" height="200" style="background-color: #f7f7f7;position: relative" />
  </div>
</template>

<script>
export default {
  name: 'PolygonVue',
  meta: {
    title: '多边行',
    icon: 'form',
    permissionArray: [1, 2, 3],
    sortIndex: 2,
    newTime: '2022-05-20'
  },
  mounted() {
    this.updata()
  },
  methods: {
    /*
         * n：表示n边形
         * dx、dy：表示n边形中心坐标
         * size：表示n边形的大小
         */
    createPolygon(cxt, n, dx, dy, size) {
      cxt.beginPath()
      const degree = (2 * Math.PI) / n
      for (let i = 0; i < n; i++) {
        const x = Math.cos(i * degree)
        const y = Math.sin(i * degree)
        cxt.lineTo(x * size + dx, y * size + dy)
      }
      cxt.closePath()
    },

    // 五角星
    pentagram(cxt) {
      cxt.beginPath()
      for (let i = 0; i < 5; i++) {
        cxt.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * 50 + 100,
          -Math.sin((18 + i * 72) * Math.PI / 180) * 50 + 100)
        cxt.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * 25 + 100,
          -Math.sin((54 + i * 72) * Math.PI / 180) * 25 + 100)
      }
      cxt.closePath()
      cxt.stroke()
    },
    updata() {
      // 获取canvas对象
      const cnv = this.$refs.zsbx
      // 获取上下文环境对象context
      const cxt = cnv.getContext('2d')
      // 开始绘制图形
      this.createPolygon(cxt, 3, 100, 100, 50)
      cxt.fillStyle = 'HotPink'
      cxt.fill()

      // 获取canvas对象
      const cnv1 = this.$refs.zsbx1
      // 获取上下文环境对象context
      const cxt1 = cnv1.getContext('2d')
      // 开始绘制图形
      this.createPolygon(cxt1, 4, 100, 100, 50)
      cxt1.fillStyle = 'HotPink'
      cxt1.fill()

      // 获取canvas对象
      const cnv2 = this.$refs.zsbx2
      // 获取上下文环境对象context
      const cxt2 = cnv2.getContext('2d')
      // 开始绘制图形
      this.createPolygon(cxt2, 5, 100, 100, 50)
      cxt2.fillStyle = 'HotPink'
      cxt2.fill()

      // 获取canvas对象
      const cnv3 = this.$refs.zsbx3
      // 获取上下文环境对象context
      const cxt3 = cnv3.getContext('2d')
      // 开始绘制图形
      this.createPolygon(cxt3, 6, 50, 45, 50)
      cxt3.fillStyle = 'HotPink'
      cxt3.fill()

      this.createPolygon(cxt3, 6, 50, 135, 50)
      cxt3.fillStyle = '#00ff00'
      cxt3.fill()

      this.createPolygon(cxt3, 6, 127, 90, 50)
      cxt3.fillStyle = 'red'
      cxt3.fill()

      // 获取canvas对象
      const cnvwjx = this.$refs.wjx
      // 获取上下文环境对象context
      const cxtwjx = cnvwjx.getContext('2d')
      // 开始绘制图形
      this.pentagram(cxtwjx)
      cxtwjx.fillStyle = 'HotPink'
      cxtwjx.fill()

      // 获取canvas对象  颜色渐变
      const cnvysjb = this.$refs.ysjb
      // 获取上下文环境对象context
      const cxtysjb = cnvysjb.getContext('2d')
      // 开始绘制图形
      let r = 255; let g = 0; let b = 0
      for (let i = 0; i < 150; i++) {
        if (i < 25) {
          g += 10
        } else if (i > 25 && i < 50) {
          r -= 10
        } else if (i > 50 && i < 75) {
          g -= 10
          b += 10
        } else if (i >= 75 && i < 100) {
          r += 10
        } else {
          b -= 10
        }
        cxtysjb.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')'
        cxtysjb.fillRect(3 * i, 0, 3, cnv.height)
      }
      cxtysjb.fill()

      // 获取canvas对象 颜色画板
      const cnvyshb = this.$refs.yshb
      // 获取上下文环境对象context
      const cxtyshb = cnvyshb.getContext('2d')
      // 开始绘制图形
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
          cxtyshb.fillStyle = 'rgb(' + Math.floor(255 - 42.5 * i) + ',' + Math.floor(255 - 42.5 * j) + ',0)'
          cxtyshb.fillRect(j * 25, i * 25, 25, 25)
        }
      }
      cxtyshb.fill()
    }
  }
}
</script>

<style scoped>

</style>
