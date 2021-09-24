<template>
  <div>
    <canvas ref="ch" width="200" height="200" style="background-color: #f7f7f7" />
    <canvas ref="bx" width="400" height="200" style="background-color: #f7f7f7" />

  </div>
</template>

<script>
export default {
  name: 'Bx',
  meta: {
    title: '变形操作',
    icon: 'form',
    permissionArray: [1, 2, 3],
    sortIndex: 1,
    newTime: '2022-05-20'
  },
  mounted() {
    this.updata()
  },
  methods: {
    updata() {
      // 获取canvas对象 变形
      const cnv = this.$refs.ch
      // 获取上下文环境对象context
      const cxt = cnv.getContext('2d')
      // 开始绘制图形
      // 定义数组，存储7种颜色
      const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'navy', 'purple']
      cxt.lineWidth = 12
      cxt.translate(50, 0)

      // 循环绘制圆弧
      for (let i = 0; i < colors.length; i++) {
        // 定义每次向下移动10px的变换矩阵
        cxt.translate(0, 10)
        // 定义颜色
        cxt.strokeStyle = colors[i]
        // 绘制圆弧
        cxt.beginPath()
        cxt.arc(50, 100, 100, 0, 180 * Math.PI / 180, true)
        cxt.stroke()
      }

      // 获取canvas对象 变形
      const cnvbx = this.$refs.bx
      // 获取上下文环境对象context
      const cxtbx = cnvbx.getContext('2d')
      // 开始绘制图形
      cxtbx.translate(150, 0)
      cxtbx.fillStyle = 'rgba(255,0,0,0.25)'
      for (let i = 0; i < 50; i++) {
        cxtbx.translate(25, 25) // 图形平移
        cxtbx.scale(0.95, 0.95) // 图形缩放
        cxtbx.rotate(Math.PI / 10) // 图形旋转
        cxtbx.fillRect(0, 0, 100, 50)
      }
    }
  }
}
</script>

<style scoped>

</style>
