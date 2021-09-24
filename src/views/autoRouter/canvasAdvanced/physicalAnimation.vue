<template>
  <div>
    <canvas
      id="canvas"
      ref="jt"
      width="300"
      height="200"
      style="background-color: #f7f7f7;"
      @mousemove="canvasMove"
    />
    <canvas
      ref="Ball"
      width="300"
      height="200"
      style="background-color: #f7f7f7;"
    />

    <canvas
      ref="qx"
      width="1000"
      height="200"
      style="background-color: #f7f7f7;"
    />

    <canvas
      ref="mc"
      width="300"
      height="200"
      style="background-color: #f7f7f7;"
    />

    <canvas
      ref="zl"
      width="300"
      height="200"
      style="background-color: #f7f7f7;"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Ball from './common/common'

export default {
  name: 'PhysicalAnimation',
  meta: {
    title: '物理动画',
    icon: 'form',
    permissionArray: [1, 2, 3],
    sortIndex: 1,
    newTime: '2022-05-20'
  },
  data() {
    return {
      cnv: null,
      cxt: null,
      cnvBall: null,
      cxtBall: null,
      ball: null,
      pageX: 0,
      pageY: 0,
      angle: 0,
      rangeqx: 40,
      angleqx: 0,
      ballqx: null,
      cnvqx: null,
      cxtqx: null,
      rightqx: true,
      cnvmc: null,
      cxtmc: null,
      rangemc: 0.5,
      anglemc: 0,
      ballmc: null,
      cnvzl: null,
      cxtzl: null,
      vyzl: 0,
      gravityzl: 0, // 重力系数
      bouncezl: 0 // 反弹系数
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
  mounted() {
    this.cnv = this.$refs.jt
    this.cxt = this.cnv.getContext('2d')
    this.drawFrame()

    this.cnvBall = this.$refs.Ball
    this.cxtBall = this.cnvBall.getContext('2d')
    this.ball = new Ball(100, 25)
    this.ballAction()

    this.cnvqx = this.$refs.qx
    this.cxtqx = this.cnvqx.getContext('2d')
    this.ballqx = new Ball(0, this.cnvqx.height / 2)
    this.qxAction()

    // 脉冲效果
    this.cnvmc = this.$refs.mc
    this.cxtmc = this.cnvmc.getContext('2d')
    this.ballmc = new Ball(this.cnvmc.width / 2, this.cnvmc.height / 2, 25)
    this.mcAction()

    // 重力,
    this.cnvzl = this.$refs.zl
    this.cxtzl = this.cnvzl.getContext('2d')
    // 初始化数据
    this.ballzl = new Ball(this.cnvzl.width / 2, 0)
    // Y轴初始速度为0，重力加速度为0.2，反弹系数为-0.8
    this.vyzl = 0
    this.gravityzl = 0.2
    this.bouncezl = -0.8
    this.zlAction()
  },
  methods: {
    zlAction() {
      window.requestAnimationFrame(this.zlAction)
      this.cxtzl.clearRect(0, 0, this.cnvzl.width, this.cnvzl.height)

      this.ballzl.y += this.vyzl
      console.log(this.ballzl.y)
      // this.ballzl.x += 1  // x轴改变就成了抛物线
      // 边界检测
      if (this.ballzl.y > this.cnvzl.height - this.ballzl.radius) {
        this.ballzl.y = this.cnvzl.height - this.ballzl.radius
        // 速度反向并且减小
        this.vyzl = this.vyzl * this.bouncezl
      }
      this.ballzl.fill(this.cxtzl)
      this.vyzl += this.gravityzl
    },
    mcAction() {
      window.requestAnimationFrame(this.mcAction)
      this.cxtmc.clearRect(0, 0, this.cnvmc.width, this.cnvmc.height)

      this.ballmc.scaleX = 1 + Math.sin(this.anglemc) * this.rangemc
      this.ballmc.scaleY = 1 + Math.sin(this.anglemc) * this.rangemc
      this.ballmc.fill(this.cxtmc)

      // 角度递增
      this.anglemc += 0.05
    },
    qxAction() {
      window.requestAnimationFrame(this.qxAction)
      this.cxtqx.clearRect(0, 0, this.cnvqx.width, this.cnvqx.height)
      if (this.ballqx.x === 1000) {
        this.rightqx = false
      }
      if (this.ballqx.x === 10) {
        this.rightqx = true
      }

      if (this.rightqx) {
        this.ballqx.x += 1
        this.ballqx.y = this.cnvqx.height / 2 + Math.sin(this.angleqx) * this.rangeqx
      } else {
        this.ballqx.x -= 1
        this.ballqx.y = this.cnvqx.height / 2 + Math.sin(this.angleqx) * this.rangeqx
      }
      this.ballqx.fill(this.cxtqx)

      // 角度递增
      this.angleqx += 0.05
    },

    ballAction() {
      const centerX = this.cnvBall.width / 2
      const centerY = this.cnvBall.height / 2
      const radius = 50
      window.requestAnimationFrame(this.ballAction)
      this.cxtBall.clearRect(0, 0, this.cnvBall.width, this.cnvBall.height)

      // 绘制圆形
      this.cxtBall.beginPath()
      this.cxtBall.arc(centerX, centerY, 50, 0, 360 * Math.PI / 180, false)
      this.cxtBall.closePath()
      this.cxtBall.stroke()

      // 计算小球坐标
      this.ball.x = centerX + Math.cos(this.angle) * radius
      this.ball.y = centerY + Math.sin(this.angle) * radius
      this.ball.fill(this.cxtBall)

      // 角度递增
      this.angle += 0.05
    },
    canvasMove(e) {
      if (this.isCollapse) {
        this.pageX = e.pageX - 54
        this.pageY = e.pageY - 50
      } else {
        this.pageX = e.pageX - 210
        this.pageY = e.pageY - 50
      }
    },
    drawFrame() {
      window.requestAnimationFrame(this.drawFrame)
      this.cxt.clearRect(0, 0, this.cnv.width, this.cnv.height)
      const dx = this.pageX - this.cnv.width / 2
      const dy = this.pageY - this.cnv.height / 2
      // 使用Math.atan2()方法计算出鼠标与箭头中心的夹角
      const angle = Math.atan2(dy, dx)
      this.fill(this.cnv.width / 2, this.cnv.height / 2, '#FF0099', angle, this.cxt)
      this.stroke(this.cnv.width / 3, this.cnv.height / 3, '#FF0099', angle, this.cxt)
    },
    /**
     * //箭头中心x坐标，默认值为0
     //箭头中心y坐标，默认值为0
     //颜色，默认值为“#FF0099”
     //旋转角度，默认值为0
     */
    stroke(x = 0, y = 0, color = '#FF0099', angle = 0, cxt) {
      cxt.save()
      cxt.translate(x, y)
      cxt.rotate(angle)
      cxt.strokeStyle = color
      cxt.beginPath()
      cxt.moveTo(-20, -10)
      cxt.lineTo(0, -10)
      cxt.lineTo(0, -20)
      cxt.lineTo(20, 0)
      cxt.lineTo(0, 20)
      cxt.lineTo(0, 10)
      cxt.lineTo(-20, 10)
      cxt.closePath()
      cxt.stroke()
      cxt.restore()
    },
    fill(x = 0, y = 0, color = '#FF0099', angle = 0, cxt) {
      cxt.save()
      cxt.translate(x, y)
      cxt.rotate(angle)
      cxt.fillStyle = color
      cxt.beginPath()
      cxt.moveTo(-20, -10)
      cxt.lineTo(0, -10)
      cxt.lineTo(0, -20)
      cxt.lineTo(20, 0)
      cxt.lineTo(0, 20)
      cxt.lineTo(0, 10)
      cxt.lineTo(-20, 10)
      cxt.closePath()
      cxt.fill()
      cxt.restore()
    }
  }
}
</script>

<style scoped>

</style>
