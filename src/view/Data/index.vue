<template>
  <div>
    <el-container>
      <el-header>文悟大模型，你的智慧教学</el-header>
      
      <div class="input-area">
        <el-input
          type="textarea"
          v-model="inputText"
          rows="1"
          placeholder="请输入关键词"
          style="width: 500px;margin-top: 80px;"
        />
        <el-button
          class="mic-button"
          @click="toggleMic"
        >
          <div class="icon2">
            <el-icon style="margin-top: 80px;"><microphone /></el-icon>
          </div>
        </el-button>
        <el-button
          class="send-button"
          @click="send"
        >
          <div class="icon2">
            <el-icon style="margin-top: 80px;"><promotion /></el-icon>
          </div>
        </el-button>
      </div>
      
      <div class="results" v-if="files.length > 0">
        <h2>检索结果：</h2>
        <ul>
          <li v-for="file in files" :key="file.file_name">
            <div class="file-info">
              <span class="file-name">{{ file.file_name }}</span>
              <span class="file-extension">({{ getExtension(file.file_name) }})</span>
              <span class="file-size">{{ file.file_size }} KB</span>
            </div>
            <el-button type="primary" @click="downloadFile(file.file_address)">下载</el-button>
          </li>
        </ul>
      </div>
      
      <div class='Pic01' v-if="files.length === 0">
        <img
          src="@/assets/dataIndex.png"
          alt="Icon"
          style="width: 660px; height: 280px;"
        />
      </div>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { ElButton, ElIcon, ElInput, ElContainer, ElHeader, ElMessage } from 'element-plus';
import { Microphone, Promotion } from '@element-plus/icons-vue';

const inputText = ref('');
const files = ref([]);

function send() {
  // 发送按钮逻辑
  if (inputText.value.trim() === '') {
    ElMessage({
      message: '请输入关键词',
      type: 'warning',
    });
    return;
  }
  
  axios.post('http://localhost:8000/retrieval/', {
    text: inputText.value
  })
  .then(response => {
    console.log('Response:', response.data);
    if (response.data.success === 'YES') {
      files.value = response.data.files;
    } else {
      ElMessage({
        message: '检索失败',
        type: 'error',
      });
    }
  })
  .catch(error => {
    console.error('Error:', error);
    ElMessage({
      message: '检索过程中发生错误',
      type: 'error',
    });
  });
}



function getExtension(filename: string) {
  const match = /\.([0-9a-z]+)(?=[?#])|([0-9a-z]+)$/i.exec(filename);
  return match ? match[0].toLowerCase() : 'unknown';
}

function downloadFile(fileAddress: string) {
  window.open(fileAddress, '_blank');
}

function toggleMic() {
  // 麦克风按钮逻辑
  console.log('麦克风按钮被点击');
}
</script>

<style scoped>
.el-header{
	font-size: 30px;
	font-weight: 800;
	padding-left: 280px;
	padding-top: 80px;
	position: relative;
}

.input-area {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
  justify-content: center;
}

.el-input {
  margin-right: 10px;
}

.send-button, .mic-button {
  background-color: transparent;
  border: none;
  padding: 0px;
}

.icon2{
	font-size: 20px;
}

.mic-button {
  margin-right: 5px;
}

.Pic01 {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.Pic01 img {
  width: 660px;
  height: 280px;
}

.results {
  margin-top: 20px;
  text-align: center;
}

.results ul {
  list-style-type: none;
  padding: 0;
  display: inline-block;
  text-align: left;
}

.results ul li {
  margin-bottom: 10px;
}

.file-icon {
  width: 32px;
  height: 32px;
  margin-right: 5px;
}

.file-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.file-name {
  font-weight: bold;
}

.file-extension {
  color: #666;
}

.file-size {
  color: #666;
}

.el-button {
  margin-top: 10px;
}
</style>