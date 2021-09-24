<template>
  <div>
    <canvas
      ref="bjhr"
      width="200"
      height="200"
      style="background-color: #f7f7f7;border: #1f2d3d solid 1px"
    />
    <canvas
      ref="bjsc"
      width="200"
      height="200"
      style="background-color: #f7f7f7;"
    />

    <canvas
      ref="bjft"
      width="200"
      height="200"
      style="background-color: #f7f7f7;border: #1f2d3d solid 1px"
    />

    <!--    <div>-->
    <!--      <canvas-->
    <!--        ref="tcs"-->
    <!--        width="500"-->
    <!--        height="500"-->
    <!--        style="background-color: #f7f7f7;border: #1f2d3d solid 1px"-->
    <!--      />-->
    <!--    </div>-->

  </div>
</template>

<script>
import Ball from './common/common'

export default {
  name: 'BoundaryDetection',
  meta: {
    title: '边界检测',
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
    this.bjxzAction()// 边界环绕
    this.bjscAction()// 边界生成
    this.bjftAction()// 边界反弹
    // this.tcsAction() // 贪吃蛇
    // window.onkeydown = (event) => {
    //   const key = this.getKey(event)
    //   this.direction = key.direction
    // }
  },
  methods: {
    bjftAction() {
      const cnv = this.$refs.bjft
      const cxt = cnv.getContext('2d')
      const ball = new Ball(cnv.width / 2, cnv.height / 2)
      ball.fill(cxt)
      var vx = (Math.random() * 2 - 1) * 3
      var vy = (Math.random() * 2 - 1) * 3

      const bjftAnimation = () => {
        window.requestAnimationFrame(bjftAnimation)
        cxt.clearRect(0, 0, cnv.width, cnv.height)
        ball.x += vx
        ball.y += vy
        // 碰到左边界
        if (ball.x < ball.radius) {
          ball.x = ball.radius
          vx = -vx
          // 碰到右边界
        } else if (ball.x > cnv.width - ball.radius) {
          ball.x = cnv.width - ball.radius
          vx = -vx
        }
        // 碰到上边界
        if (ball.y < ball.radius) {
          ball.y = ball.radius
          vy = -vy
          // 碰到下边界
        } else if (ball.y > cnv.height - ball.radius) {
          ball.y = cnv.height - ball.radius
          vy = -vy
        }
        ball.fill(cxt)
      }
      bjftAnimation()
    },
    // 封装函数
    getColor() {
      // #号
      let str = '#'
      // 0-e的数组
      const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
      //    循环6次
      for (let i = 0; i < 6; i++) {
        //    随机这16位中的数字字母
        const num = parseInt(Math.random() * 16)
        //    把每一项添加给str
        arr[num]
        str += arr[num]
      }
      return str
    },
    bjscAction() {
      const cnv = this.$refs.bjsc
      const cxt = cnv.getContext('2d')
      // balls表示用来存放小球的数组
      const balls = []
      // n表示小球数量
      const n = 50
      const gravity = 0.15

      // 生成n个小球，其中小球的color、vx、vy取的都是随机值
      for (let i = 0; i < n; i++) {
        const ball = new Ball(cnv.width / 2, cnv.height / 2, 5, this.getColor())
        // 随机生成-3~3之间的数
        ball.vx = (Math.random() * 2 - 1) * 3
        ball.vy = (Math.random() * 2 - 1) * 3
        balls.push(ball)
      }
      const bjscAnimation = () => {
        window.requestAnimationFrame(bjscAnimation)
        cxt.clearRect(0, 0, cnv.width, cnv.height)

        // 使用forEach()函数遍历数组balls
        balls.forEach(function(ball) {
          // 边界检测，使得小球完全移出画布后会在中心位置重新生成
          if (ball.x < -ball.radius ||
              ball.x > cnv.width + ball.radius ||
              ball.y < -ball.radius ||
              ball.y > cnv.height + ball.radius) {
            ball.x = cnv.width / 2
            ball.y = cnv.height / 2
            ball.vx = (Math.random() * 2 - 1) * 3
            ball.vy = (Math.random() * 2 - 1) * 3
            // // 随机产生3~4之间的任意数
            // ball.vx = Math.random() + 3
            // // 随机产生-3~3之间的任意数
            // ball.vy = (Math.random() * 2 - 1) * 3
          }
          ball.fill(cxt)

          ball.x += ball.vx
          ball.y += ball.vy
          ball.vy += gravity
        })
      }
      bjscAnimation()
    },
    bjxzAction() {
      const cnv = this.$refs.bjhr
      const cxt = cnv.getContext('2d')
      const ball = new Ball(cnv.width / 2, cnv.height / 2)
      ball.fill(cxt)
      const bjxzAnimation = () => {
        window.requestAnimationFrame(bjxzAnimation)
        cxt.clearRect(0, 0, cnv.width, cnv.height)
        ball.y += 3
        // 检测下边界
        if (ball.y > cnv.height + ball.radius) {
          ball.y = -ball.radius
        }
        ball.fill(cxt)
      }
      bjxzAnimation()
    }
  }
}
</script>

<style scoped>

</style>
