<template>
  <div>
    <div>
      <canvas
        ref="jxpz"
        width="200"
        height="200"
        style="background-color: #f7f7f7;border: #1f2d3d solid 1px"
        @mousemove="canvasMove"
      />
      <div>{{ innerHTML }}</div>
    </div>
    <div>
      <canvas
        ref="yxpz"
        width="200"
        height="200"
        style="background-color: #f7f7f7;border: #1f2d3d solid 1px"
        @mousemove="canvasMove1"
      />
      <div>{{ innerHTML1 }}</div>
    </div>
  </div>
</template>

<script>
import Ball from '@/views/autoRouter/canvasAdvanced/common/common'
import { mapGetters } from 'vuex'

export default {
  name: 'CollisionDetection',
  meta: {
    title: '碰撞检测',
    icon: 'form',
    permissionArray: [1, 2, 3],
    sortIndex: 1,
    newTime: '2022-05-20'
  },
  data() {
    return {
      innerHTML: '',
      innerHTML1: '',
      pageX: 0,
      pageY: 0,
      pageX1: 0,
      pageY1: 0
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
    this.jxpzAction()
    this.yxpzAction()
  },
  methods: {
    // 外接矩形判定法（碰撞检测）
    checkRect(rectA, rectB) {
      return !(rectA.x + rectA.width < rectB.x ||
        rectB.x + rectB.width < rectA.x ||
        rectA.y + rectA.height < rectB.y ||
        rectB.y + rectB.height < rectA.y)
    },
    // 外接圆判定法（碰撞检测）
    checkCircle(circleB, circleA) {
      const dx = circleB.x - circleA.x
      const dy = circleB.y - circleA.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      if (distance < (circleA.radius + circleB.radius)) {
        return true
      } else {
        return false
      }
    },
    // 鼠标移动
    canvasMove(e) {
      if (this.isCollapse) {
        this.pageX = e.pageX - 54
        this.pageY = e.pageY - 50
      } else {
        this.pageX = e.pageX - 210
        this.pageY = e.pageY - 50
      }
    },
    // 鼠标移动
    canvasMove1(e) {
      if (this.isCollapse) {
        this.pageX1 = e.pageX - 54
        this.pageY1 = e.pageY - 50
      } else {
        this.pageX1 = e.pageX - 210
        this.pageY1 = e.pageY - 50
      }
    },
    yxpzAction() {
      const cnv = this.$refs.yxpz
      const cxt = cnv.getContext('2d')
      const ballA = new Ball(cnv.width / 2, cnv.height / 2)
      ballA.fill(cxt)
      const yxpzAnimation = () => {
        window.requestAnimationFrame(yxpzAnimation)
        cxt.clearRect(0, 0, cnv.width, cnv.height)

        // 定义一个位置不固定的小球ballB，小球追随鼠标
        const ballB = new Ball(this.pageX1, this.pageY1 - 220)
        ballB.fill(cxt)

        // 碰撞检测
        if (this.checkCircle(ballB, ballA)) {
          this.innerHTML1 = '撞上了'
        } else {
          this.innerHTML1 = '没撞上'
        }
        ballA.fill(cxt)
      }
      yxpzAnimation()
    },
    jxpzAction() {
      const cnv = this.$refs.jxpz
      const cxt = cnv.getContext('2d')
      const ballA = new Ball(cnv.width / 2, cnv.height / 2)
      ballA.fill(cxt)
      // 获取ballA的外接矩形
      const rectA = ballA.getRect()
      const jxpzAnimation = () => {
        window.requestAnimationFrame(jxpzAnimation)
        cxt.clearRect(0, 0, cnv.width, cnv.height)

        // 绘制ballA以及它的外接矩形
        ballA.fill(cxt)
        cxt.strokeRect(rectA.x, rectA.y, rectA.width, rectA.height)

        // 定义一个位置不固定的小球ballB，小球追随鼠标
        const ballB = new Ball(this.pageX, this.pageY)
        // 获取ballB的外接矩形
        const rectB = ballB.getRect()

        // 绘制ballB以及它的外接矩形
        ballB.fill(cxt)
        cxt.strokeRect(rectB.x, rectB.y, rectB.width, rectB.height)

        // 碰撞检测
        if (this.checkRect(rectA, rectB)) {
          this.innerHTML = '撞上了'
        } else {
          this.innerHTML = '没撞上'
        }
      }
      jxpzAnimation()
    }

  }
}
</script>

<style scoped>

</style>
