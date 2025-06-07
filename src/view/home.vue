<template>
  <div>
    <el-container class="home-container">
      <!-- 菜单 -->
      <el-aside>
        <el-menu
          background-color="#2561ef"
          text-color="#fff"
          router
          :default-active="activePath"
          class="el-menu-style"
        >
		
		<el-menu-item style="background-color: #024bc9;
		 display: flex; align-items: center; 
		 height: 60px; width: 300px;
		 font: ;"
		 >
		  <img
		    src="@/assets/lights.png"
		    alt="Icon"
		    style="width: 80px; height: 32px; margin-top: -0px;"
		/></el-menu-item>
		
		
			
		<el-menu-item  style="background-color: #024bc9;
		 display: flex; align-items: center; 
		 height: 100px; width: 300px;
		 ;"
		 >   
		  <img
		    src="@/assets/Wenwu_Logo.png"
		    alt="Icon"
		    style="width: 200px; height: 80px; margin-top: -20px;
			 "
		/>
		</el-menu-item> 
		
		<div class="input-container">
		  <el-input
		    v-model="input"
			class="custom-input"
		    style="width: 250px; height: 40px; margin-left: 25px; margin-top: -40px;"
		    placeholder="搜索"
					  
		  >
		    <template #prefix>
		      <el-icon class="el-input__icon"><search /></el-icon>
		    </template>
		  </el-input>
		</div>
		
          <!-- 首页 -->
		 <!--<el-menu-item
            index="/index"
            @click="
              saveActiveNav('/index', {
                title: '首页',
                name: '首页',
              })
            "
			class="custom-menu-item"
          >
            <template #title style="font-size: 20;">首页</template>
          </el-menu-item>
		  -->
          <el-sub-menu v-for="menu in menuList" :key="menu.id" :index="menu.id + ''"  
		
>
            <template #title>
			<el-icon style="margin-right: 20px;"><Lock /></el-icon>
              <span class="custom-menu-item">{{ menu.name }}</span>
            </template>
            <el-menu-item
              v-for="menuItem in menu.children"
              :index="menu.path + '/' + menuItem.path"
              @click="
                saveActiveNav(menu.path + '/' + 'list', {
                  title: menuItem.name,
                  name: menuItem.name,
                })
              "
            >
			<el-icon style="margin-right: 20px;"><Unlock /></el-icon>
              <span>{{ menuItem.name }}</span>
            </el-menu-item>
			
          </el-sub-menu>
		  
		  <el-divider border-style="solid" />
		  <el-menu-item index = "1" >
		    	<el-icon style="margin-right:20px;"><message /></el-icon>
		    	<span class="custom-menu-item">消息</span>
		  </el-menu-item>
		  
		  <el-menu-item index = "2">
		    	<el-icon style="margin-right: 20px;"><Setting /></el-icon>
		  	<span class="custom-menu-item">设置</span>
		  </el-menu-item>
		  
		  
		  
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <el-dropdown style="float: right; margin: 20px">
            <span class="el-dropdown-link">
              {{ userForm.username }} &nbsp;&nbsp;
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click.native="toUpdatePassword"
                  >修改密码</el-dropdown-item
                >
                <el-dropdown-item @click.native="logout">退出系统</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-header>

        <el-main>
          <router-view v-slot="{ Component }">
            <transition name="fade-transition" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </el-main>

        <el-footer>Copyright © 2024 文悟大模型</el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import { onBeforeMount, onMounted, ref, reactive } from "vue";
import router from "../router/index";
import { Search ,
		Message,
		Location,
		Setting,
		Lock,
		Unlock,
		Menu as IconMenu,
} from '@element-plus/icons-vue'

let menuList = JSON.parse(sessionStorage.getItem("menuList"));
let userForm = reactive(JSON.parse(sessionStorage.getItem("userInfo")));
// 挂载 DOM 之前
onBeforeMount(() => {
  // 当前激活的菜单
  activePath.value = sessionStorage.getItem("activePath")
    ? sessionStorage.getItem("activePath")
    : "/index";
});
// 当前激活的路由
let activePath = ref("");
// 保存链接的激活状态
const saveActiveNav = (path) => {
  // 当前激活的菜单
  activePath.value = path;
  sessionStorage.setItem("activePath", path);
};
const logout = () => {
  // 清除缓存
  sessionStorage.clear();
  router.push("/login");
};
</script>

<style scoped lang="scss">
.home-container {
  position: absolute;
  height: 100%;
  top: 0px;
  left: 0px;
  width: 100%;
}

.el-header {
  height: 50px;
  background: #fff;
  overflow: hidden;
  position: relative;
  padding: 0px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
.el-main {
  padding: 10px;
}
.el-aside {
  width: auto;
}
.el-menu {
  height: 100%;
  color: #024bc9 !important;
  font-size: 15px;
  font-weight: bold;
  background-color: #024bc9 !important;
  border-radius: 5px;
  text-align: left;
  line-height: 80px;
  box-sizing: border-box;
  
  box-shadow: 0 4px 8px rgba(85, 255, 127, 0.1); /* 添加阴影 */
}
.el-menu-style:not(.el-menu--collapse) {
  width: auto;
  min-height: 400px;
}

.el-footer {
  height: 40px !important;
  line-height: 40px !important;
  color: #bdbaba;
  font-size: 13px;
  text-align: center;
  padding: 0px !important;
}

.toggle-button {
  width: 50px;
  height: 50px;
  vertical-align: middle;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
}

.el-menu-item.is-active {
  color: #024bc9 !important;
  font-size: 15px;
  font-weight: bold;
  background-color: #e3e3e3 !important;
  border-radius: 1px;
  text-align: center;
  height: 50px;
  line-height: 50px;
  box-sizing: border-box;
}
.el-menu-item.is-active .el-icon {
  margin-left: -5px !important;
}
.el-dropdown-link {
  cursor: pointer;
  color: black;
  border: none !important;
}
.el-icon-arrow-down {
  font-size: 12px;
  border: none !important;
}
.el-dropdown-link:focus {
  outline: none !important;
}
.custom-input {
  .el-input__inner{
    background-color: #ff5500; /* 你可以选择任何你喜欢的颜色 */
    border-color: #dcdcdc; /* 可以设置边框颜色，如果需要 */
  }
}
.custom-menu-item{
	color: #dcdcdc;
}
</style>
