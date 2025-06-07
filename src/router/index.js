import { createRouter, createWebHashHistory } from "vue-router";


const routes = 
[
      {
            path: "/",
            redirect: "/login",
      },
      {
            path: "/login",
            name: "login",
            meta: {
              title: "登录",
            },
            component: () => import("../view/login.vue"),
      },
  {
    path: "/home",
    name: "主页",
    meta: {
      title: "主页",
    },
    component: () => import("../view/home.vue"),
    redirect: "/index",
    children: [
      {
        path: "/index",
        name: "index",
        meta: {
          title: "首页",
        },
        component: () => import("../view/welcome.vue"),
      },
    ],
  },
  
  {
      path: "/register",
      name: "register",
      meta: {
        title: "注册",
      },
      component: () => import("../view/register.vue"), // 确保路径正确
  },    
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 挂载路由导航守卫：to表示将要访问的路径，from表示从哪里来，next是下一个要做的操作
router.beforeEach((to, from, next) => {
  // 修改页面 title
  if (to.meta.title) {
    document.title = "文悟 - " + to.meta.title;
  }

  // 检查用户是否已经登录，这里假设登录后会设置sessionStorage中的menuList
  const menuList = JSON.parse(sessionStorage.getItem("menuList")); 
  if (menuList) {
    const menus = filterRouter(menuList);
    menus.forEach((route) => {
      if (!router.hasRoute(route.name)) {
        router.addRoute('home', route); // 确保父级路由名称正确
      }
    });
  }

  // 放行登录和注册页面
  if (to.path === "/login" || to.path === "/register") {
    return next();
  }

  // 检查用户是否已经登录
  if (!sessionStorage.getItem("userInfo")) {
    // 如果未登录，重定向到登录页面
    return next('/login');
  }

  next();
});



const filterRouter = (menuList) => {
  // import.meta.glob 作用是 Vite 特有的功能,它允许你在模块内部匹配多个模块,基于文件系统的模式
  const modules = import.meta.glob("../view/**/*.vue");
  // 遍历菜单数据
  for (let index = 0; index < menuList.length; index++) {
    // 获取父菜单
    const e = menuList[index];
    // 因为我们在 home 页面的 el-main 设置了 router-view ，所以这里父级菜单默认指向 home页面
    e.component = modules["../view/home.vue"];
    // 遍历子菜单，
    for (let index = 0; index < e.children.length; index++) {
      const item = e.children[index];
      // 导入组件
      item.component = modules[`../view/${item.component}.vue`];
    }
  }
  return menuList;
};
// 导出路由
export default router;