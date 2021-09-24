<template>
  <div>
    <canvas
      ref="tcss"
      width="500"
      height="500"
      style="background-color: #f7f7f7;border: #1f2d3d solid 1px"
    />
  </div>
</template>

<script>
import Ball from '@/views/autoRouter/canvasAdvanced/common/common'

export default {
  name: 'Tcs',
  meta: {
    title: '贪吃蛇',
    icon: 'form',
    permissionArray: [1, 2, 3],
    sortIndex: 1,
    newTime: '2022-05-20'
  },
  data() {
    return {
      direction: 'right', // 方向
      directionX: 0, // 方向改变的点
      directionY: 0 // 方向改变的点
    }
  },
  mounted() {
    this.tcsAction()
    window.onkeydown = (event) => {
      const key = this.getKey(event)
      this.direction = key.direction
    }
  },
  methods: {
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
    // 向下
    top(ball, cnv, cxt) {
      ball.y -= 1
      // 检测上边界
      if (ball.y < -ball.radius) {
        ball.y = cnv.height + ball.radius
      }
      ball.fill(cxt)
    },
    // 向下
    bottom(ball, cnv, cxt) {
      ball.y += 1
      // 检测下边界
      if (ball.y > cnv.height + ball.radius) {
        ball.y = -ball.radius
      }
      ball.fill(cxt)
    },
    // 向右
    right(ball, cnv, cxt) {
      ball.x += 1
      // 检测右边界
      if (ball.x > cnv.width + ball.radius) {
        ball.x = -ball.radius
      }
      ball.fill(cxt)
    },
    // 向左
    left(ball, cnv, cxt) {
      ball.x -= 1
      // 检测左边界
      if (ball.x < -ball.radius) {
        ball.x = cnv.width + ball.radius
      }
      ball.fill(cxt)
    },
    tcsAction() {
      const cnv = this.$refs.tcss
      const cxt = cnv.getContext('2d')
      const balls = []
      // n表示小球数量
      const n = 3
      // 生成n个小球，其中小球的color、vx、vy取的都是随机值
      for (let i = 0; i < n; i++) {
        const ball = new Ball(cnv.width / 2 - i * 10, cnv.height / 2, 5)
        balls.push(ball)
      }
      const tcsAnimation = () => {
        window.requestAnimationFrame(tcsAnimation)
        cxt.clearRect(0, 0, cnv.width, cnv.height)
        balls.forEach((ball, index) => {
          // 根据key.direction的值，判断小球移动方向
          switch (this.direction) {
            case 'up':
              if (index === 0) {
                this.directionX = ball.x
              }
              if (ball.x === this.directionX) {
                this.top(ball, cnv, cxt)
              } else if (ball.x < this.directionX) {
                this.right(ball, cnv, cxt)
              } else {
                this.left(ball, cnv, cxt)
              }
              break
            case 'down':
              if (index === 0) {
                this.directionX = ball.x
              }
              if (ball.x === this.directionX) {
                this.bottom(ball, cnv, cxt)
              } else if (ball.x < this.directionX) {
                this.right(ball, cnv, cxt)
              } else {
                this.left(ball, cnv, cxt)
              }
              break
            case 'left':
              if (index === 0) {
                this.directionY = ball.y
              }
              if (ball.y === this.directionY) {
                this.left(ball, cnv, cxt)
              } else if (ball.y < this.directionY) {
                this.bottom(ball, cnv, cxt)
              } else {
                this.top(ball, cnv, cxt)
              }
              break
            case 'right':
              if (index === 0) {
                this.directionY = ball.y
              }
              if (ball.y === this.directionY) {
                this.right(ball, cnv, cxt)
              } else if (ball.y < this.directionY) {
                this.bottom(ball, cnv, cxt)
              } else {
                this.top(ball, cnv, cxt)
              }
              break
            // default值
            default:
          }
        })
      }
      tcsAnimation()
    }
  }
}
</script>

<style scoped>

</style>
