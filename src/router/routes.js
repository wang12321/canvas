import Layout from '@/layout'
export default [
  {
    path: '/canvas',
    name: 'canvas',
    meta: {
      title: 'canvas基础',
      icon: 'form',
      permissionArray: [1, 2, 3],
      sortIndex: 1,
      newTime: '2022-05-20'
    },
    index: 10,
    alwaysShow: false,
    component: Layout,
    children: [
      {
        path: 'curve',
        name: 'curve',
        meta: {
          title: '曲线-圆角',
          icon: 'form',
          permissionArray: [1, 2, 3],
          sortIndex: 1,
          newTime: '2022-05-20'
        },
        index: 10,
        component: () => import('@/views/autoRouter/canvas/curve.vue'),
        children: []
      },
      {
        path: 'deformation',
        name: 'deformation',
        meta: {
          title: '变形操作',
          icon: 'form',
          permissionArray: [1, 2, 3],
          sortIndex: 1,
          newTime: '2022-05-20'
        },
        index: 10,
        component: () => import('@/views/autoRouter/canvas/deformation.vue'),
        children: []
      },
      {
        path: 'gradient',
        name: 'gradient',
        meta: {
          title: '渐变及阴影',
          icon: 'form',
          permissionArray: [1, 2, 3],
          sortIndex: 1,
          newTime: '2022-05-20'
        },
        index: 10,
        component: () => import('@/views/autoRouter/canvas/gradient.vue'),
        children: []
      },
      {
        path: 'index1',
        name: 'index1',
        meta: {
          title: 'canvas简介',
          icon: 'form',
          permissionArray: [1, 2, 3],
          sortIndex: 1,
          newTime: '2022-05-20'
        },
        index: 10,
        component: () => import('@/views/autoRouter/canvas/index1.vue'),
        children: []
      },
      {
        path: 'pixel',
        name: 'pixel',
        meta: {
          title: '像素操作',
          icon: 'form',
          permissionArray: [1, 2, 3],
          sortIndex: 1,
          newTime: '2022-05-20'
        },
        index: 10,
        component: () => import('@/views/autoRouter/canvas/pixel.vue'),
        children: []
      },
      {
        path: 'polygon',
        name: 'polygon',
        meta: {
          title: '多边行',
          icon: 'form',
          permissionArray: [1, 2, 3],
          sortIndex: 2,
          newTime: '2022-05-20'
        },
        index: 20,
        component: () => import('@/views/autoRouter/canvas/polygon.vue'),
        children: []
      }
    ]
  },
  {
    path: '/canvasAdvanced',
    name: 'canvasAdvanced',
    meta: {
      title: 'canvas进阶',
      icon: 'form',
      permissionArray: [1, 2, 3],
      sortIndex: 1,
      newTime: '2022-05-20'
    },
    index: 10,
    alwaysShow: false,
    component: Layout,
    children: [
      {
        path: 'mouseEvents',
        name: 'mouseEvents',
        meta: {
          title: '鼠标事件',
          icon: 'form',
          permissionArray: [1, 2, 3],
          sortIndex: 1,
          newTime: '2022-05-20'
        },
        index: 10,
        component: () =>
          import('@/views/autoRouter/canvasAdvanced/mouseEvents.vue'),
        children: []
      }
    ]
  },
  {
    path: '/system',
    name: 'system',
    meta: {
      title: '系统管理',
      icon: 'form',
      permissionArray: [1, 2, 3],
      sortIndex: 1,
      newTime: '2022-05-20'
    },
    index: 10,
    alwaysShow: false,
    component: Layout,
    children: [
      {
        path: 'menu',
        name: 'menu',
        meta: {
          title: '菜单管理',
          icon: 'form',
          permissionArray: [1, 2, 3],
          sortIndex: 2,
          newTime: '2022-05-20'
        },
        index: 20,
        component: () => import('@/views/autoRouter/system/menu.vue'),
        children: []
      },
      {
        path: 'user',
        name: 'user',
        meta: {
          title: '用户管理',
          icon: 'form',
          permissionArray: [1, 2, 3],
          sortIndex: 1,
          newTime: '2022-05-20'
        },
        index: 10,
        component: () => import('@/views/autoRouter/system/user.vue'),
        children: []
      },
      {
        path: 'role/:id',
        name: 'role_id',
        meta: {
          title: '角色管理',
          icon: 'form',
          permissionArray: [1, 2, 3],
          sortIndex: 3,
          newTime: '2022-05-20'
        },
        index: 30,
        component: () => import('@/views/autoRouter/system/role_id/index.vue'),
        children: [
          {
            path: 'testg',
            name: 'testg',
            meta: {
              title: '角色管理1',
              icon: 'form',
              permissionArray: [1, 2, 3],
              sortIndex: 3,
              newTime: '2022-05-20'
            },
            index: 30,
            component: () =>
              import('@/views/autoRouter/system/role_id/testg.vue'),
            children: []
          }
        ]
      }
    ]
  }
]
