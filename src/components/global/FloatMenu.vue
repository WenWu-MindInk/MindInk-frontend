<template>
  <div id="app">
    <!-- 悬浮按钮 -->
    <div class="floating-button" @click="toggleMenu">
      <button>☰</button>
    </div>

    <!-- 弹出菜单 -->
    <div class="menu" v-if="showMenu">
      <div class="menu-item" @click="goToTools">我的工具库</div>
      <div class="menu-item" @click="logout">登出</div>
      <div class="menu-item" @click="goToProfile">个人中心</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMenu: false
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    goToTools() {
      this.toggleMenu(); // 关闭菜单
      // 跳转到工具库页面
    },
    logout() {
      this.toggleMenu(); // 关闭菜单
      // 登出逻辑
    },
    goToProfile() {
      this.toggleMenu(); // 关闭菜单
      // 跳转到个人中心页面
    }
  }
};
</script>

<style>
.floating-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
}

.menu {
  position: fixed;
  bottom: 30px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.menu-item {
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 5px 0;
  cursor: pointer;
  border-radius: 5px;
  transform-origin: bottom right;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.menu-item:nth-child(1) { transform: translateY(-20px); }
.menu-item:nth-child(2) { transform: translateY(-40px); }
.menu-item:nth-child(3) { transform: translateY(-60px); }

.floating-button:hover + .menu .menu-item,
.menu-item:hover {
  opacity: 1;
  visibility: visible;
}
</style>