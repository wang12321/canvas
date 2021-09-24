<template>
  <div>
    <canvas
      id="canvas"
      ref="jp"
      width="500"
      height="500"
      style="background-color: #f7f7f7;position: absolute"
    />
    <div style="background-color: #f7f7f7;position: absolute;left: 550px; top:50px">
      <div>移动方向</div>
      <div>上:W / 向上键</div>
      <div>左:A / 向左键</div>
      <div>下:S / 向下键</div>
      <div>右:D / 向右键</div>

      <el-button style="margin-top: 40px" @click="xhAction">循环事件</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KeyboardEvents',
  meta: {
    title: '键盘事件',
    icon: 'form',
    permissionArray: [1, 2, 3],
    sortIndex: 1,
    newTime: '2022-05-20'
  },
  data() {
    return {
      cnv: null,
      cxt: null,
      x: 200,
      y: 200,
      right: true
    }
  },
  mounted() {
    this.cnv = this.$refs.jp
    this.cxt = this.cnv.getContext('2d')
    this.drawBall(this.x, this.y, this.cxt)

    window.onkeydown = (event) => {
      const key = this.getKey(event)
      console.log(123, key)
      // 根据key.direction的值，判断小球移动方向
      switch (key.direction) {
        case 'up':
          this.y -= this.y > 20 ? 10 : 0
          this.drawBall(this.x, this.y, this.cxt)
          break
        case 'down':
          this.y += this.y < this.cnv.height - 20 ? 10 : 0
          this.drawBall(this.x, this.y, this.cxt)
          break
        case 'left':
          this.x -= this.x > 20 ? 10 : 0
          this.drawBall(this.x, this.y, this.cxt)
          break
        case 'right':
          this.x += this.x < this.cnv.width - 20 ? 10 : 0
          this.drawBall(this.x, this.y, this.cxt)
          break
        // default值
        default:
          this.drawBall(this.x, this.y, this.cxt)
      }
    }
  },
  methods: {

    xhAction() {
      if (this.x === this.cnv.width - 30) {
        this.right = false
      }
      if (this.x === 30) {
        this.right = true
      }
      if (this.x < this.cnv.width - 20 && this.right) {
        this.x += 10
        this.drawBall(this.x, this.y, this.cxt)
      } else if (this.x > 20 && !this.right) {
        this.x -= 10
        this.drawBall(this.x, this.y, this.cxt)
      }
      window.requestAnimationFrame(this.xhAction)
    },

    // 定义绘制小球的函数
    drawBall(x, y, cxt) {
      cxt.beginPath()
      cxt.clearRect(0, 0, this.cnv.width, this.cnv.height)

      cxt.beginPath()
      cxt.arc(x, y, 20, 0, 360 * Math.PI / 180, true)
      cxt.closePath()
      cxt.fillStyle = '#6699FF'
      cxt.fill()
    },
    getKey(e) {
      const key = {}
      if (e.keyCode === 38 || e.keyCode === 87) {
        key.direction = 'up'
      } else if (e.keyCode === 39 || e.keyCode === 68) {
        key.direction = 'right'
      } else if (e.keyCode === 40 || e.keyCode === 83) {
        key.direction = 'down'
      } else if (e.keyCode === 37 || e.keyCode === 65) {
        key.direction = 'left'
      } else {
        key.direction = ''
      }
      return key
    },
    keydownAction(e) {
      console.log(444, e)
      console.log(this.getKey(e))
    }
  }

}
</script>

<style scoped>

</style>
