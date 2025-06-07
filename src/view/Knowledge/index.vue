<template>
  <div>
    <el-header>文悟大模型，你的智慧教学助手</el-header>
    <div class="upload-box" @click="openDialog">
      <div class="icon-and-text">
        <div class="icon">
          <img src="./shangchuanwenjian.png" alt="上传文件图标" style="width: 1cm; height: auto;">
        </div>
        
        <div class="text">上传文件</div>
        <div class="additional-text">文件数量：最多50个</div>
        <div class="additional-text">支持文件类型：pdf,png,jpg,doc,docx,xslx,xsl,ppt,pptx......</div>
      </div>
    </div>
    <el-dialog title="上传文件" v-model="dialogVisible" width="30%">
      <el-form @submit.prevent="uploadFile">
        <input type="file" ref="fileInput" @change="onFileChange" style="display: none;" />
        <el-button type="primary" @click="triggerFileInput">选择文件</el-button>
        <div>
          <label for="file_open">是否公开 (1: 私有, 0: 公开):</label>
          <el-input-number v-model="file_open" :min="0" :max="1"></el-input-number>
        </div>
        <el-button type="success" native-type="submit">上传文件</el-button>
      </el-form>
    </el-dialog>
    <p v-if="message">{{ message }}</p>
    <div v-if="files.length" class="file-list">
        <el-table :data="files" style="width: 90%" class="custom-table">
          <el-table-column prop="file_name" label="文件名"></el-table-column>
          <el-table-column label="公开状态" style="{'text-align': 'right'}">
            <template #default="{row}">
              {{ row.file_open ? '公开' : '私有' }}
            </template>
          </el-table-column>
          <el-table-column label="审核状态" style="{'text-align': 'right'}">
            <template #default="{row}">
              <span :style="{'color': getStatusColor(row.file_check)}">
                {{ getStatusText(row.file_check) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="文件地址">
            <template #default="{row}">
              <el-button type="primary" @click="downloadFile(row.file_address)">下载</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import OSS from 'ali-oss';
import axios from 'axios';
import { ElButton, ElIcon, ElDialog, ElForm, ElInput, ElInputNumber, ElMessage, ElTable, ElTableColumn } from 'element-plus';

const dialogVisible = ref(false);
const fileInput = ref(null);
const selectedFile = ref(null);
const file_open = ref(0);
const files = ref([]); // 用于存储从后端获取的文件列表
const message = ref('');

const openDialog = () => {
  dialogVisible.value = true;
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    ElMessage({
      message: '文件选择成功',
      type: 'success',
    });
  }
};

const uploadFile = async () => {
  if (!selectedFile.value) {
    ElMessage.error('请选择文件');
    return;
  }

  const client = new OSS({
    region: 'oss-cn-nanjing',
    accessKeyId: 'LTAI5tG65vWDXY4oWLJksWCF',
    accessKeySecret: 'FYLpCuyLJxLFZbemUKTJYnZxbNnnn5',
    bucket: 'wenwu-file-test'
  });

  try {
    const fileName = `${Date.now()}_${selectedFile.value.name}`;
    const result = await client.put(fileName, selectedFile.value);

    const data = {
      file_name: fileName,
      file_open: file_open.value,
      file_check: 0, // Assuming file_check is always 0 for simplicity
      file_type: selectedFile.value.type,
      url: result.url,
    };

    const backendResponse = await axios.post('http://localhost:8000/submit/', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (backendResponse.data.success === 'YES') {
      message.value = '文件上传成功';
      ElMessage.success('文件上传成功');
      resetForm();
      await fetchFiles(); // Refresh the file list after upload
    } else {
      message.value = '文件上传失败';
      ElMessage.error('文件上传失败');
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    message.value = '文件上传过程中发生错误';
    ElMessage.error('文件上传过程中发生错误');
  }
};

const resetForm = () => {
  selectedFile.value = null;
  file_open.value = 0;
  dialogVisible.value = false;
};

const downloadFile = (url) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = ''; // 可以设置下载文件的名称
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const fetchFiles = async () => {
  try {
    const response = await axios.get('http://localhost:8000/fileadmin/');
    files.value = response.data.files;
    message.value = '文件列表已更新';
  } catch (error) {
    console.error('Error fetching files:', error);
    message.value = '获取文件列表失败';
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 2:
      return 'red';
    case 1:
      return 'green';
    case 0:
      return 'orange';
    default:
      return 'black';
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 2:
      return '未通过';
    case 1:
      return '已通过';
    case 0:
      return '未审核';
    default:
      return '未知状态';
  }
};

onMounted(fetchFiles); // Call fetchFiles when the component is mounted
</script>

<style scoped>
.el-header {
  font-size: 30px;
  font-weight: 800;
  padding-left: 280px;
  padding-top: 50px;
  position: relative;
}
.input-area {
  display: flex;
  align-items: center;
  margin-bottom: 20px; /* 与 upload-box 的间距 */
  position: absolute;
  top: 250px; /* 距离 el-header 顶部 200px */
  left: 60%;
  transform: translateX(-50%);
  width: 500px;
}

.el-input {
  flex: 1;
  font-size: 15px;
  margin-right: 10px;
}

.custom-table .el-table__body .cell {
    text-align: right;
}

.send-button, .mic-button {
  background-color: transparent;
  border: none;
  padding: 0px;
}

.icon2 {
  font-size: 20px;
}

.mic-button {
  margin-right: 5px; /* 麦克风 icon 和发送 icon 之间的间距 */
}

.text {
  font-size: 16px; /* 调整为所需的大小 */
  font-weight: 700;
  color: #333; /* 调整为所需的颜色 */
}

.additional-text {
  font-size: 8px; /* 新增文字的大小 */
  color: #919191; /* 新增文字的颜色 */
  margin-top: 5px; /* 新增文字与上传文件文字之间的间距 */
}

.custom-table {
  margin-top: 5000px; /* 与上一元素的间距 */
  margin-left: 50px; /* 自动边距 */
  margin-right: 50px; /* 自动边距 */
  position: relative; /* 相对定位 */
  top: 330px; /* 向下移动 */
  left: 0; /* 向左移动 */
  width: 60%; /* 宽度为父元素的80% */
}

.upload-box {
  position: fixed; /* 保留固定定位 */
  width: 500px;
  height: 200px;
  border: 2px dashed #dcdfe6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fffcf9;
  left: 50%; /* 水平居中 */
  top: 50%; /* 垂直居中 */
  transform: translate(-20%, -50%); /* 根据自身的宽高进一步精确居中*/
    text-align: center;
    cursor: pointer;
  }
  
  .icon-and-text {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .icon {
    margin-bottom: 10px;
  }
  
  .text {
    font-size: 16px;
    font-weight: 700;
  }
  .file-types {
    font-size: 14px;
    color: #909399;
    margin-bottom: 20px;
  }
  .actions {
    display: flex;
    gap: 10px;
  }
  
  .file-list {
    margin-top: 50px; /* 与上传组件的间距 */
    width: 100%;
  }
  
  .el-table {
    margin-top: 20px; /* 与文件列表标题的间距 */
  }
  
  .el-table-column {
    font-size: 14px; /*表格字体大小 */
  }
  </style>
  