<template>
  <div class="admin-container" :style="{'background-color': activeIndex === '3' ? '#fff' : '#F1F3F6'}">
    <!-- 导航栏 -->
    <el-aside width="200px">
      <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @select="handleSelect">
        <el-menu-item index="1">
          <i class="el-icon-s-home"></i>
          <span>主页面</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-notebook-2"></i>
          <span>知识库管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-data-analysis"></i>
          <span>大模型管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-lock"></i>
          <span>权限管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 主内容区 -->
    <el-container>
      <el-main>
        <div v-if="activeIndex === '1'" class="content-panel">
          <img v-if="activeIndex === '1'" src="../../assets/images/zhuyemian.png" alt="主页面" style="width: 100%; height: auto;">
        </div>

        <!-- 知识库管理界面 -->
        <div v-if="activeIndex === '2'" class="content-panel">
          <el-card class="box-card">
            <div>
              <button @click="fetchFiles" class="btn-load">加载文件</button>
              <button @click="fetchUnreviewedFiles" class="btn-unreviewed">显示未审核</button>
            </div>
            <el-table :data="fileList" style="width: 100%" v-if="fileList.length" class="file-table">
              <el-table-column prop="file_name" label="文件名" :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column label="查看文件">
                <template #default="scope">
                  <button @click="viewFile(scope.row.file_address)">下载文件</button>
                </template>
              </el-table-column>
              <el-table-column label="审核状态">
                <template #default="scope">
                  <span :class="{'text-red': scope.row.file_check === 2, 'text-green': scope.row.file_check === 1, 'text-yellow': scope.row.file_check === 0}">
                    {{ getStatusText(scope.row.file_check) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template #default="scope">
                  <button @click="examineFile(scope.row.file_id, 'YES')">通过</button>
                  <button @click="examineFile(scope.row.file_id, 'NO')">不通过</button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </div>

        <div v-if="activeIndex === '3'" class="content-panel">
          <img src="../../assets/images/damoxingguanli.jpg" alt="大模型管理" style="width: 100%; height: auto;">
        </div>

        <div v-if="activeIndex === '4'" class="content-panel">
          <img v-if="activeIndex === '4'" src="../../assets/images/quanxianguanli.png" alt="权限管理" style="width: 100%; height: auto;">
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import router from "../../router/index";

const activeIndex = ref('1');
const fileList = ref([]);

const handleSelect = (index, indexPath) => {
  activeIndex.value = index;
};

const fetchFiles = async () => {
  try {
    const response = await axios.get('http://localhost:8000/fileadmin/'); // 替换为你的后端接口地址
    if (response.data.success === 'YES') {
      fileList.value = response.data.files;
    } else {
      console.error('Failed to fetch files');
    }
  } catch (error) {
    console.error('Error fetching files:', error);
  }
};

const fetchUnreviewedFiles = async () => {
  // 清空已有的文件列表
  fileList.value = [];
  try {
    const response = await axios.get('http://localhost:8000/file_examine_post/'); // 替换为你的后端接口地址
    if (response.data.success === 'YES') {
      fileList.value = response.data.files;
    } else {
      console.error('Failed to fetch unreviewed files');
    }
  } catch (error) {
    console.error('Error fetching unreviewed files:', error);
  }
};

const viewFile = (fileAddress) => {
  const link = document.createElement('a');
  link.href = fileAddress;
  link.setAttribute('download', ''); // 这里可以设置下载的文件名，例如：link.setAttribute('download', 'filename.ext');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const examineFile = async (fileId, fileCheck) => {
  const data = JSON.stringify({ file_id: fileId, file_check: fileCheck });
  try {
    const response = await axios.post('http://localhost:8000/file_examine/', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.data.success === 'YES') {
      alert('文件审核成功');  
      // 重新加载文件列表
      fetchFiles();
    } else {
      alert('文件审核失败');
    }
  } catch (error) {
    console.error('Error examining file:', error);
    alert('文件审核请求失败');
  }
};

const getStatusText = (fileCheck) => {
  if (fileCheck === 2) {
    return '未通过';
  } else if (fileCheck === 1) {
    return '通过';
  } else if (fileCheck === 0) {
    return '未审核';
  } else {
    return '未知状态';
  }
};
</script>

<style scoped>
.admin-container {
  display: flex;
  height: 100vh;
  transition: background-color 0.3s; /* 添加过渡效果 */
}

.el-aside {
  background-color: #333744; /* 深蓝色背景 */
}

.el-menu-vertical-demo {
  border-right: none;
  background-color: #333744; /* 深蓝色背景 */
}

.el-menu-item {
  cursor: pointer;
  color: #fff; /* 未选中时的字体颜色为白色 */
}

.el-menu-item:hover {
  background-color: #48576a; /* 鼠标悬停时的背景颜色 */
}

.el-menu-item.is-active {
  color: #ffd04b; /* 选中时的字体颜色 */
  background-color: #48576a; /* 选中时的背景颜色 */
}

.el-main {
  padding: 20px;
}

.content-panel {
  margin-top: 20px;
}

.box-card {
  margin-bottom: 20px;
}

button {
  margin: 5px;
  cursor: pointer;
}

/* 按钮样式 */
.btn-load {
  background-color: #007bff; /* 蓝色背景 */
  color: #fff; /* 白色字体 */
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
}

.btn-unreviewed {
  background-color: #dc3545; /* 红色背景 */
  color: #fff; /* 白色字体 */
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
}

.file-table /deep/ .el-table .el-button {
  margin-right: 5px;
}

.file-table /deep/ .el-table th {
  background-color: #f5f7fa;
  color: #333;
}

.file-table /deep/ .el-table td, .file-table /deep/ .el-table th {
  border: 1px solid #ebeef5; /* 浅灰色边框 */
}

/* 审核状态文本颜色 */
.text-red {
  color: red;
}

.text-green {
  color: green;
}

.text-yellow {
  color: orange;
}

/* 文件名列样式 */
.file-table /deep/ .el-table_2_column_1 .cell {
  white-space: normal;
  word-break: break-all;
}
</style>