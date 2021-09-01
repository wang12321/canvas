<template>
  <div>
    <canvas ref="canvas" style="width:150px;height: 200px" />
  </div>
</template>

<script>
export default {
  name: 'Index',
  meta: {
    title: 'canvas简介',
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
      // 获取canvas对象
      const cnv = this.$refs.canvas
      // 获取上下文环境对象context
      const cxt = cnv.getContext('2d')
      // 开始绘制图形
      cxt.moveTo(50, 100)
      cxt.lineTo(150, 50)
      cxt.stroke()

      console.log(cxt)
    }
  }
}
</script>

<style scoped>

</style>
