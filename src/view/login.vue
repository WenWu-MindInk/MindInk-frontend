<template>
  <div class="content">
    <el-card style="background-color: rgba(0, 0, 0, 0); box-shadow: none; border-color: rgba(0, 0, 0, 0);">
      <el-form :model="form">
        <el-form-item>
          <el-input v-model="form.user_tel" placeholder="请输入手机号/用户名">
            <template #prefix>
              <img src="@/assets/images/zhanghao.png" alt="账号" class="input-prefix-icon-zhanghao"/>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.user_password" type="password" placeholder="请输入密码">
            <template #prefix>
              <img src="@/assets/images/mima.png" alt="密码" class="input-prefix-icon-mima"/>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <img src="@/assets/images/login-button.png" alt="登录" @click="onSubmit" style="width: 200px; height: auto; cursor: pointer; border-radius: 20px;"/>
        </el-form-item>
      </el-form>
      <div class="register-link">
        还没有账号？ <router-link to="/register" style="color: #800080; text-decoration: underline;">立即注册</router-link>
      </div>
    </el-card>
  </div>
  <div class="background-image-container">
  </div>
</template>



<script setup>
import { reactive } from "vue";
import router from "../router/index";
const form = reactive({
  username: "15789098765",
  password: "12121232122",
});


// 登录
const onSubmit = () => {
  let menusOne = [
    {
      id: 69,
      parentId: null,
      name: "智能问答",
      icon: "el-icon-search",
      type: 0,
      path: "/Question",
      component: "",
      perms: "",
      children: [
        {
          id: 87,
          parentId: 69,
          name: "智能问答",
          type: 1,
          path: "list",
          component: "Question/index",
          perms: "",
          children: null,
        },
      ],
    },
    {
      id: 78,
      parentId: null,
      name: "资料检索",
      type: 0,
      path: "/Data",
      component: "",
      perms: "",
      children: [
        {
          id: 78,
          parentId: 79,
          name: "资料检索",
          type: 1,
          path: "list",
          component: "Data/index",
          perms: "",
          children: null,
        },
      ],
    },
    {
      id: 88,
      parentId: null,
      name: "智能生成",
      type: 0,
      path: "/Generate",
      component: "",
      perms: "",
      children: [
        {
          id: 89,
          parentId: 88,
          name: "智能生成",
          type: 1,
          path: "list",
          component: "Generate/index",
          perms: "",
          children: null,
        },
      ],
    },
    {
      id: 3,
      parentId: null,
      name: "我的知识库",
      type: 0,
      path: "/Knowledge",
      component: "",
      perms: "",
      children: [
        {
          id: 4,
          parentId: 3,
          name: "我的知识库",
          type: 1,
          path: "list",
          component: "Knowledge/index",
          perms: "",
          children: null,
        },
      ],
    },
	{
		  id: 51,
		  parentId: null,
		  name: "我的工具库",
		  type: 0,
		  path: "/Tool",
		  component: "",
		  perms: "",
		  children: [
		    {
		      id: 52,
		      parentId: 51,
		      name: "我的工具库",
		      type: 1,
		      path: "list",
		      component: "Tool/index",
		      perms: "",
		      children: null,
		    },
		  ],
		},
		{
		  id: 200,
		  parentId: null,
		  name: "娱乐作品生成",
		  type: 0,
		  path: "/Amusement",
		  component: "",
		  perms: "",
		  children: [
		    {
		      id: 201,
		      parentId: 200,
		      name: "娱乐作品生成",
		      type: 1,
		      path: "list",
		      component: "Amusement/index",
		      perms: "",
		      children: null,
		    },
		  ],
		},

	
	
	
	
  ];
  let menusTwo = [
    {
      id: 69,
      parentId: null,
      name: "用户管理",
      type: 0,
      path: "/user",
      component: "",
      perms: "",
      children: [
        {
          id: 87,
          parentId: 69,
          name: "用户列表",
          type: 1,
          path: "list",
          component: "user/index",
          perms: "",
          children: null,
        },
      ],
    },
  ];
  // 模拟登录请求
  const res = { 
    data: {
      code: 200,
      menuList: [],
      message: "请求成功",
    },
  };
  if (form.username === "admin") {
    res.data.menuList = menusOne;
  } else {
    res.data.menuList = menusOne;
  }
  
  
  sessionStorage.setItem("userTel", form.username);
  sessionStorage.setItem("menuList", JSON.stringify(res.data.menuList));
  sessionStorage.setItem("userInfo", JSON.stringify({ username: form.username }));
  router.push("/home");
};
</script>



<style lang="scss" scoped>
.content {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50vw; // 例如，设置宽度为视口宽度的50%
  height: 60vh; // 例如，设置高度为视口高度的50%
  background-color: rgba(255, 255, 255, 0.5); // 白色背景，20%透明度
  margin-top: 10%;
  margin-left: 25%;
  z-index: 1; // 确保内容在背景图之上
  position: relative; // 相对定位
  border-radius: 40px; // 可选，为内容区域添加圆角
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // 可选，为内容区域添加阴影
}

.background-image-container {
  display: flex;
  width: 100%;
  height: 100%;
  background-image: url('../../src/assets/images/background.png'); // 替换为你的图片路径
  background-size: cover;
  background-position: center;
  position: absolute; // 绝对定位，覆盖整个页面
  top: 0;
  left: 0;
  z-index: 0; // 确保背景图在内容之下
}
:deep(.el-input__wrapper) {
    // background-color: transparent;/*覆盖原背景颜色，设置成透明 */
    border-radius: 95px;
    border: 0;
    box-shadow: 0 0 0 0px;
}

/* 自定义图标样式 */
.input-prefix-icon-zhanghao
{
  position: absolute; /* 绝对定位 */
  left: -18px; /* 距离输入框左侧的距离 */
  top: 40%;
  transform: translateY(-50%); /* 垂直居中 */
  width: 10px; /* 调整图标大小 */
  height: auto;
  z-index: 2; /* 确保图标在输入框之上 */
}
.input-prefix-icon-mima 
{
  position: absolute; /* 绝对定位 */
  left: -20px; /* 距离输入框左侧的距离 */
  top: 45%;
  transform: translateY(-50%); /* 垂直居中 */
  width: 15px; /* 调整图标大小 */
  height: auto;
  z-index: 2; /* 确保图标在输入框之上 */
}

/* 调整输入框内部元素的样式 */
:deep(.el-input__inner) {
  padding-left: 5px; /* 为图标腾出空间 */
}
/* 注册链接样式 */
.register-link {
  margin-top: 20px;
  font-size: 10px;
  color: #868686;
  text-align: center;
  a {
    color: #787878;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>