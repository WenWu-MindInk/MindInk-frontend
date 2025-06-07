<template>
  <div class="register-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 返回按钮 -->
        <div class="return-button" @click="goBack">
          <img src="@/assets/images/fanhuiicon.png" alt="返回" class="return-icon"/> <!-- 添加图片 -->
          <span>返回</span>
        </div>
        <!-- 注册新账号标题 -->
        <span></span>
      </div>
      <el-form ref="registerForm" :model="registerForm" label-width="100px">
        <el-form-item>
          <template #label>
            <img src="@/assets/images/shenfen.png" alt="类型" class="input-prefix-icon-shenfen"/>
          </template>
          <el-select class="custom-input-xuanze" v-model="registerForm.user_iden" placeholder="请选择用户类型">
            <el-option label="教师" value="1"></el-option>
            <el-option label="学生" value="2"></el-option>
            <el-option label="管理者" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <template #label>
            <img src="@/assets/images/shouji.png" alt="手机号" class="input-prefix-icon-shouji"/>
          </template>
          <el-input class="custom-input" v-model="registerForm.user_tel" placeholder="手机号" ></el-input>
        </el-form-item>
        <el-form-item>
          <template #label>
            <img src="@/assets/images/zhanghao.png" alt="用户名" class="input-prefix-icon-zhanghao"/>
          </template>
          <el-input class="custom-input" v-model="registerForm.user_name" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <template #label>
            <img src="@/assets/images/mima.png" alt="密码" class="input-prefix-icon-mima"/>
          </template>
          <el-input class="custom-input" type="password" v-model="registerForm.user_password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <template #label>
            <img src="@/assets/images/xingming.png" alt="姓名" class="input-prefix-icon-xingming"/>
          </template>
          <el-input class="custom-input" v-model="registerForm.user_truename" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <template #label>
            <img src="@/assets/images/shenfenzheng.png" alt="身份证号" class="input-prefix-icon-shenfenzheng"/>
          </template>
          <el-input class="custom-input" v-model="registerForm.user_no" placeholder="身份证号"></el-input>
        </el-form-item>
        <el-form-item>
          <img src="@/assets/images/zhuce.png" alt="注册" class="register-button" @click="onSubmit">
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'; // 引入axios
import { reactive } from 'vue';

export default {
  data() {
    return {
      registerForm: reactive({
        user_iden: '',
        user_tel: '',
        user_name: '',
        user_password: '',
        user_truename: '', // 姓名
        user_no: '' // 身份证号
      })
    };
  },
  methods: {
    onSubmit() {
      // 假设后端接口地址是 http://localhost:8000/users/add/
      axios.post('http://localhost:8000/add/', this.registerForm)
        .then(response => {
          // 处理响应
          console.log(response);
          alert('注册成功');
        })
        .catch(error => {
          // 处理错误
          console.error(error);
          alert('注册失败');
        });
    },
    goBack() {
      this.$router.push('/login'); // 假设登录界面的路由是 '/login'
    }
  }
};
</script>

<style scoped>
	
.custom-input {
  
  width: 3000px; /* 设置一个最大宽度，防止输入框过宽 */
  margin: 0 auto; /* 上下自动，左右自动，实现水平居中 */
}
.custom-input-xuanze {
  
  width: 200px; /* 设置一个最大宽度，防止输入框过宽 */
  position: absolute; /* 使用绝对定位 */
  top: 50%; /* 从顶部开始定位 */
  left: 50%; /* 从左侧开始定位 */
  transform: translate(-60%, -50%); /* 使用变换使元素居中 */
}
:deep(.el-input__wrapper) {
    border-radius: 95px;
    border: 0;
    box-shadow: 0 0 0 0px;
	position: absolute; /* 使用绝对定位 */
	top: 50%; /* 从顶部开始定位 */
	left: 50%; /* 从左侧开始定位 */
	transform: translate(-60%, -50%); /* 使用变换使元素居中 */
}	
	
:deep(.el-select__wrapper) {
    border-radius: 95px;
    border: 0;
    box-shadow: 0 0 0 0px;

}	
	
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('../assets/images/background.png'); /* 确保路径正确 */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative; /* 确保背景覆盖整个视口 */
  z-index: 1; /* 确保背景在最顶层 */
}

.box-card {
  width: 600px;
  height: 450px;
  background-color: rgba(255, 255, 255, 0.5); /* 确保卡片在背景图片上更明显 */
  border-radius: 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 清除浮动 */
.clearfix::before,
.clearfix::after {
  content: " ";
  display: table;
}

.clearfix::after {
  clear: both;
}

/* 返回按钮样式 */
.return-button {
  
  cursor: pointer;
  font-size: 15px;
  color: #2f2f91; /* 可根据实际设计调整颜色 */
  margin-right: 50px; /* 与标题保持一定间距 */
  padding-top: 5px; /* 垂直居中对齐 */
}
.return-icon {
  width: 20px; /* 根据需要调整图标大小 */
  height: auto;
  margin-right: 5px; /* 图标与文字之间的间距 */
  position: relative; /* 相对定位 */
  top: 5px; /* 向上微调 */
}

.register-button {
  cursor: pointer; /* 将鼠标指针设置为点击状态 */
  width: auto; /* 根据图片的实际尺寸设置宽度 */
  height: 40px; /* 根据需要设置高度 */
  position: absolute; /* 使用绝对定位 */
  top: 90%; /* 从顶部开始定位 */
  left: 40%; /* 从左侧开始定位 */
  transform: translate(-35%, 50%); /* 使用变换使元素居中 */
}

/* 自定义图标样式 */
.input-prefix-icon-shenfen {
	 margin-right:-110px;
  width: 25px; /* 根据需要调整图标大小 */
  height: auto;
}
.input-prefix-icon-shouji {
	margin-right:-110px;
	margin-top:2px;
  width: 25px; /* 根据需要调整图标大小 */
  height: auto;
}
.input-prefix-icon-zhanghao {
	margin-right:-104px;
  width: 12px; /* 根据需要调整图标大小 */
  height: auto;
}
.input-prefix-icon-mima {
	margin-right:-106px;
	margin-top:2px;
  width: 16px; /* 根据需要调整图标大小 */
  height: auto;
}
.input-prefix-icon-shenfenzheng {
	margin-right:-111px;
		margin-top:4px;
	width: 25px; /* 根据需要调整图标大小 */
  height: auto;
}
.input-prefix-icon-xingming {
	margin-right:-108px;
		margin-top:5px;
	width: 20px; /* 根据需要调整图标大小 */
  height: auto;
}
</style>