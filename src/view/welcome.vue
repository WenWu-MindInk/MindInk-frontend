<template>
  <div >
    <el-container>
      <el-header>文悟大模型，你的智慧教学助手</el-header>
      <el-main>
		  
		   <!-- 添加可点击的文本按钮 -->
		          <div class="text-with-button">
		            <span>你可以尝试以下案例...</span>
		            <el-button type="text" style="padding-left: 360px;" @click="switchContent"><el-icon><refresh /></el-icon>换一换</el-button>
		          </div>
		  
        <div class="content-wrapper">
          <div class="content content-left">
            <h2>代码修改</h2>
			<div class="icon-with-text">
				<el-icon style="color:black;"><TrendCharts /></el-icon>
				<h3>为什么这段代码会编译报错呢?</h3>
			</div>
            
            <p>这段代码缺少了对std::cout和std:endl的命名空间声明。在C++中,std:cout和std:endl是标准库的一部分,通常位于< iostream >头文件中。为了正确地使用它们，你需要包含< iostream >并且可以通过两种方式解决这个问题:</p>
            <ul>
              <li>使用std:前缀来指定这些标识符属于std命</li>
            </ul>
          </div>
          <div class="content content-right"> 
            <h2>知识问答</h2>
			<div class="icon-with-text">
			    <el-icon style="color: #ff5500;"><QuestionFilled /></el-icon>
			    <h3>为什么鲸鱼不是一种鱼呢?</h3>
			</div>
            <p v-if="!searchQuery || (searchQuery && isSearchResultVisible('鲸鱼'))">鲸鱼不是真正的鱼类,而是哺乳动物,主要是由于:</p>
            <ul v-if="!searchQuery || (searchQuery && isSearchResultVisible('鲸鱼'))">
              <li>呼吸方式:鲸鱼通过肺部呼吸空气，而不是像鱼类那样通过鳃来呼吸水中的氧气。</li>
              <li>繁殖方式:鲸鱼是胎生的,幼崽出生后通过母乳喂养成长,而大多数鱼类产卵并通过外都要结繁</li>
            </ul>
          </div>
        </div>
		<!-- 添加输入框和发送按钮 -->
		        <div class="input-wrapper">
		          <el-input
		            v-model="inputText"
		            placeholder="输入代码/问题与文悟交互!"
		            type="textarea"
		            rows="1"
		          ></el-input>
		          <el-button type="primary" @click="send">发送</el-button>
		        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElContainer, ElHeader, ElMain, ElInput } from 'element-plus';
import { Search ,
		Message,
		Location,
		Setting,
		Lock,
		Unlock,
		QuestionFilled,
		Refresh,
		TrendCharts,
		Menu as IconMenu,
} from '@element-plus/icons-vue'


const searchQuery = ref('');
const inputText = ref(''); // 绑定输入框的模型

function handleSearch() {
  // 搜索逻辑可以在这里实现
  console.log('搜索:', searchQuery.value);
}

function isSearchResultVisible(keyword) {
  // 简单的搜索结果可见性检查
  return searchQuery.value.toLowerCase() === keyword.toLowerCase();
}

function send() {
  // 发送逻辑可以在这里实现
  console.log('发送内容:', inputText.value);
}

function switchContent() {
  // 切换内容的逻辑可以在这里实现
  console.log('切换内容');
}


</script>

<style scoped>


.content-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: calc(275px * 2 + 30px); /* 总宽度为两个框的宽度加上间距 */
  margin: auto; /* 居中显示 */
  padding-top: 0px; /* 内容框整体向下移动 40px */
  margin-bottom: 195px;
  margin-top: 5px;
}

.content {
  width: 275px;
  height: 250px;
  padding: 10px;
  border: 1px solid #ccc; /* 方框边框 */
  border-radius: 8px; /* 圆角边框 */
  background-color: #f9f9f9; /* 背景颜色 */
  overflow: auto; /* 处理超出内容 */
  box-sizing: border-box; /* 边框和内边距包含在宽度和高度内 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
	
.el-header{
	font-size: 30px;
	font-weight: 800;
	padding-left: 280px;
	padding-top: 80px;
}
h2 {
  color: #333;
  font-size: 16px; /* 调整段落和列表项大小 */
  margin: 0;
  
}
h3 {
  color: #b8b8b7;
  font-size: 13px; /* 调整段落和列表项大小 */
  border-bottom: 1.5px solid #b8b8b7; /* 添加下划线 */
  display: flex;
    align-items: center;
}
p, li {
  color: #b8b8b7;
  font-size: 12px; /* 调整段落和列表项大小 */
  margin: 0;
}

ul {
  padding-left: 20px;
}

.search-container {
  margin-bottom: -13px;
}

.el-input__icon {
  color: #666;
}

h3 .el-icon {
  margin-right: 5px; /* 图标和文本之间的间距 */
}

.input-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 195px; /* 输入框距离内容框的距离 */
  width: 65%; /* 输入框占页面宽度的 60% */
  margin: 0 auto 20px; /* 居中显示 */
}

.el-input {
  width: 100%; /* 输入框宽度 */
  margin-bottom:100px; /* 输入框与按钮的间距 */
}

.text-with-button {
  display: flex;
  align-items: center;
  margin-top: 70px;	
  justify-content: center;
  padding-right: 10px;
  color: #b8b8b7;
  font-size: 13px;
}
.send-button {
  width: 80px;
}
/* 添加图标和文本的样式 */
.el-button {
  display: flex;
  align-items: center;
}

.icon-with-text{
	display: flex;
	align-items: center;
}

.el-icon {
  margin-right: 5px; /* 图标和文本之间的间距 */
}
</style>