<template>
  <div>
    <canvas ref="jxyj" width="200" height="200" style="background-color: #f7f7f7" />
    <canvas ref="qp" width="200" height="200" style="background-color: #f7f7f7" />
    <canvas ref="syc" width="200" height="200" style="background-color: #f7f7f7" />
    <canvas ref="pid" width="200" height="200" style="background-color: #f7f7f7" />

  </div>
</template>

<script>
export default {
  name: 'Curve',
  meta: {
    title: '曲线-圆角',
    icon: 'form',
    permissionArray: [1, 2, 3],
    sortIndex: 1,
    newTime: '2022-05-20'
  },
  mounted() {
    this.updata()
  },
  methods: {
    /*
         * createRoundedRect()用于绘制圆角矩形
         * width、height：分别表示长和宽
         * r：表示圆角半径
         * offsetX、offsetY：分别表示左上角顶点坐标
         */
    createRoundedRect(cxt, width, height, r, offsetX, offsetY) {
      cxt.beginPath()
      cxt.moveTo(offsetX + r, offsetY)
      cxt.lineTo(offsetX + width - r, offsetY)
      cxt.arcTo(offsetX + width, offsetY, offsetY + width, offsetY + r, r)
      cxt.lineTo(offsetX + width, offsetY + height - r)
      cxt.arcTo(offsetX + width, offsetY + height, offsetX + width - r, offsetY + height, r)
      cxt.lineTo(offsetX + r, offsetY + height)
      cxt.arcTo(offsetX, offsetY + height, offsetX, offsetY + height - r, r)
      cxt.lineTo(offsetX, offsetY + r)
      cxt.arcTo(offsetX, offsetY, offsetX + r, offsetY, r)
      cxt.closePath()
    },

    /*
         * createLeaf()用于绘制N叶草
         * n：n片
         * dx、dy：花朵中心位置的坐标
         * size：控制花朵的大小
         * length：控制花瓣长度
         */
    createLeaf(cxt, n, dx, dy, size, length) {
      cxt.beginPath()
      cxt.moveTo(dx, dy + size)
      var degree = 2 * Math.PI / n
      for (var i = 1; i < n + 1; i++) {
        // 计算控制点坐标
        var cx1 = Math.sin((i - 1) * degree) * length + dx
        var cy1 = Math.cos((i - 1) * degree) * length + dy
        var cx2 = Math.sin(i * degree) * length + dx
        var cy2 = Math.cos(i * degree) * length + dy
        // 计算结束点的坐标
        var x = Math.sin(i * degree) * size + dx
        var y = Math.cos(i * degree) * size + dy
        cxt.bezierCurveTo(cx1, cy1, cx2, cy2, x, y)
      }
      cxt.closePath()
    },
    createSector(cxt, x, y, r, angle1, angle2) {
      cxt.beginPath()
      cxt.moveTo(x, y)
      cxt.arc(x, y, r, angle1 * Math.PI / 180, angle2 * Math.PI / 180, false)
      cxt.closePath()
    },
    updata() {
      // 获取canvas对象 圆角
      const cnv = this.$refs.jxyj
      // 获取上下文环境对象context
      const cxt = cnv.getContext('2d')
      // 开始绘制图形
      this.createRoundedRect(cxt, 100, 100, 20, 20, 20)
      cxt.fillStyle = 'HotPink'
      cxt.fill()

      // 获取canvas对象 气泡
      const cnvqp = this.$refs.qp
      // 获取上下文环境对象context
      const cxtqp = cnvqp.getContext('2d')
      // 开始绘制图形
      cxtqp.moveTo(75, 25)
      cxtqp.quadraticCurveTo(25, 25, 25, 62)
      cxtqp.quadraticCurveTo(25, 100, 50, 100)
      cxtqp.quadraticCurveTo(50, 120, 30, 125)
      cxtqp.quadraticCurveTo(60, 120, 65, 100)
      cxtqp.quadraticCurveTo(125, 100, 125, 62)
      cxtqp.quadraticCurveTo(125, 25, 75, 25)
      cxtqp.fillStyle = 'HotPink'
      cxtqp.fill()

      // 获取canvas对象 四叶草
      const cnvsyc = this.$refs.syc
      // 获取上下文环境对象context
      const cxtsyc = cnvsyc.getContext('2d')

      // 开始绘制图形
      this.createLeaf(cxtsyc, 6, cnv.width / 2, cnv.height / 2, 20, 80)
      // 定义填充颜色为浅绿色
      cxtsyc.fillStyle = 'red'
      cxtsyc.fill()

      this.createLeaf(cxtsyc, 6, cnv.width / 2, cnv.height / 2, 10, 60)
      // 定义填充颜色为浅绿色
      cxtsyc.fillStyle = '#00FF99'
      cxtsyc.fill()

      // 获取canvas对象 饼图
      const cnvpid = this.$refs.pid
      // 获取上下文环境对象context
      const cxtpid = cnvpid.getContext('2d')
      // 开始绘制图形
      this.createSector(cxtpid, cnvpid.width / 2, cnvpid.height / 2, 50, 30, 120)
      cxtpid.fillStyle = 'HotPink'
      cxtpid.fill()

      this.createSector(cxtpid, cnvpid.width / 2, cnvpid.height / 2, 50, 120, 180)
      cxtpid.fillStyle = 'red'
      cxtpid.fill()

      this.createSector(cxtpid, cnvpid.width / 2, cnvpid.height / 2, 50, 180, 30)
      cxtpid.fillStyle = 'green'
      cxtpid.fill()
    }
  }
}
</script>

<style scoped>

</style>
