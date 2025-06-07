<template>
  <div >
    <el-container>
      <el-header>文悟大模型，你的智慧教学助手</el-header>
      <el-main>
		  
		   <!-- 添加可点击的文本按钮 -->
		          <div class="text-with-button">
		            <span></span>
		          </div>
		  
        <div class="content-wrapper">
          <div class="content content-1">
            <div class="icon-text">
                    <img src="@/assets/images/jisuanqi.jpg" alt="专业计算器图标" class="icon" />
                    <div class="text">
                      <h2>专业计算器</h2>
                      <div class="icon-with-text">
                      	<img src="@/assets/images/shoucang.png" alt="收藏图标" class="small-icon" />
                      	<h3>加入收藏</h3>
                      </div>
                    </div>
            </div>
            <p>提供多功能的专业性计算器</p>
            <p><a href="https://zaixianjisuanqi.bmcx.com/" target="_blank">https://zaixianjisuanqi.bmcx.com/</a></p>
          </div>
		  <div class="content content-2">
		    <div class="icon-text">
		            <img src="@/assets/images/tushuguan.png" alt="图书馆图标" class="icon" />
		            <div class="text">
		              <h2>图书馆馆藏查询</h2>
		              <div class="icon-with-text">
		              	<img src="@/assets/images/shoucang.png" alt="收藏图标" class="small-icon" />
		              	<h3>加入收藏</h3>
		              </div>
		            </div>
		    </div>
		    <p>提供图书馆内各类馆藏书籍的信息查询</p>
		    <p><a href="http://lib.seu.edu.cn/" target="_blank">http://lib.seu.edu.cn/</a></p>
		  </div>
          <div class="content content-3"> 
            <div class="icon-text">
                    <img src="@/assets/images/zhiwang.png" alt="知网图标" class="icon" />
                    <div class="text">
                      <h2>知网检索</h2>
                      <div class="icon-with-text">
                      	<img src="@/assets/images/shoucang.png" alt="收藏图标" class="small-icon" />
                      	<h3>加入收藏</h3>
                      </div>
                    </div>
            </div>
            <p>为全社会知识资源的高效共享提供了知识...</p>
            <p><a href="https://www.cnki.net/" target="_blank">https://www.cnki.net/</a></p>
          </div>
        </div>
		<div class="content-wrapper">
		  <div class="content content-4">
		    <div class="icon-text">
		            <img src="@/assets/images/Markdown.png" alt="Markdown图标" class="icon" />
		            <div class="text">
		              <h2>Markdown编辑器</h2>
		              <div class="icon-with-text">
		              	<img src="@/assets/images/shoucang.png" alt="收藏图标" class="small-icon" />
		              	<h3>加入收藏</h3>
		              </div>
		            </div>
		    </div>
		    <p>markdown编辑器</p>
		    <p><a href="https://markdown.liuchengtu.com/" target="_blank">https://markdown.liuchengtu.com/</a></p>
		  </div>
		  <div class="content content-5">
		    <div class="icon-text">
		            <img src="@/assets/images/MySQL.png" alt="MySQL图标" class="icon" />
		            <div class="text">
		              <h2>MySQL数据库工具</h2>
		              <div class="icon-with-text">
		              	<img src="@/assets/images/shoucang.png" alt="收藏图标" class="small-icon" />
		              	<h3>加入收藏</h3>
		              </div>
		            </div>
		    </div>
		    <p>为各种系统提供后端数据库存储数据</p>
		    <p><a href="https://www.mysql.com/" target="_blank">https://www.mysql.com/</a></p>
		  </div>
		  <div class="content content-6"> 
		    <div class="icon-text">
		            <img src="@/assets/images/chengyu.png" alt="成语词典图标" class="icon" />
		            <div class="text">
		              <h2>成语词典</h2>
		              <div class="icon-with-text">
		              	<img src="@/assets/images/shoucang.png" alt="收藏图标" class="small-icon" />
		              	<h3>加入收藏</h3>
		              </div>
		            </div>
		    </div>
		    <p>成语大全、成语接龙</p>
		    <p><a href="http://cy.5156edu.com/" target="_blank">http://cy.5156edu.com/</a></p>
		  </div>
		</div>
		<!-- 添加输入框和发送按钮 -->
		       
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
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


import axios from 'axios'; // 引入axios
import { reactive } from 'vue';

const searchQuery = ref('');
const inputText = ref(''); // 绑定输入框的模型
/*
 const inputText=reactive({
 	message : ref('')
 });
*/
function handleSearch() {
  // 搜索逻辑可以在这里实现
  console.log('搜索:', searchQuery.value);
}

function isSearchResultVisible(keyword) {
  // 简单的搜索结果可见性检查
  return searchQuery.value.toLowerCase() === keyword.toLowerCase();
}
/*
function send() {
  // 发送逻辑可以在这里实现
  console.log('发送内容:', inputText.value);
  
}
*/


const sendMessage=function(){
	axios.post('http://127.0.0.1:8000/sendMessage/',{inputText})
	     .then(result=>{
			 //alert(result);
			 //console.log(result);
			 //alert(result.data.sname);
			 //alert(result.data.sex);
			 //alert(result.data.nation);
			 this.inputText.message=result.data.message;
		 });
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
  width: calc(390px * 3 + 30*2px); /* 总宽度为两个框的宽度加上间距 */
  margin: auto; /* 居中显示 */
  padding-top: 0px; /* 内容框整体向下移动 40px */
  /*margin-bottom: 195px;*/
  margin-top: 15px;
}

.content {
  width: 390px;
  height: 200px;
  padding: 25px;
  border: 1px solid #ccc; /* 方框边框 */
  border-radius: 20px; /* 圆角边框 */
  overflow: auto; /* 处理超出内容 */
  box-sizing: border-box; /* 边框和内边距包含在宽度和高度内 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.content-1 {
	background-image: linear-gradient(to bottom, #FFFCF2, #ffffff, #ffffff); /* 背景颜色 */
}

.content-2 {
	background-image: linear-gradient(to bottom, #FFF6F4, #ffffff, #ffffff); /* 背景颜色 */
}

.content-3 {
	background-image: linear-gradient(to bottom, #F9FBFD, #ffffff, #ffffff); /* 背景颜色 */
}

.content-4 {
	background-image: linear-gradient(to bottom, #F2EEFF, #ffffff, #ffffff); /* 背景颜色 */
}

.content-5 {
	background-image: linear-gradient(to bottom, #E9F7FE, #ffffff, #ffffff); /* 背景颜色 */
}

.content-6 {
	background-image: linear-gradient(to bottom, #F7F7F7, #ffffff, #ffffff); /* 背景颜色 */
}
.el-header{
	font-size: 30px;
	font-weight: 800;
	padding-left: 280px;
	padding-top: 80px;
}

.icon-text {
  display: flex;
  align-items: center;
}

.icon {
  width:65px; /* 根据需要调整图标大小 */
  height: 65px;
  margin-right: 20px; /* 图标和文本之间的间距 */
  border-radius: 50%; /* 使图片变为圆形 */
}

h2 {
  color: #333;
  font-size: 20px; /* 调整段落和列表项大小 */
  margin: 0;
  
}
h3 {
  color: #262626;
  font-size: 15px; /* 调整段落和列表项大小 */
  display: flex;
  align-items: center;
}

p1 {
  color: #262626;
  font-size: 17px; /* 调整段落和列表项大小 */
   margin: 0;
}

p, li {
  color: #262626;
  font-size: 17px; /* 调整段落和列表项大小 */
  margin: 1px 0; /* 减少间隙 */
}

li {
  list-style-type: none; /* 取消默认列表标记 */
}

ul {
  padding-left: 20px;
}

.category {
  margin-left: auto; /* 右对齐 */
  color: #262626;
  font-size: 14px;
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

.small-icon {
  width: 20px; /* 根据需要调整图标大小 */
  height: 20px;
  margin-right: 5px; /* 图标和文本之间的间距 */
}
</style>