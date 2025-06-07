<template>
	<div >
	<el-container>
   <el-header>文悟大模型，你的智慧教学助手</el-header>
   
	 <div class="input-area">
	         <el-input
	           type="textarea"
	           v-model="inputText"
			   rows="1"
	           placeholder="请输入您的主题和要求，越详细生成质量越高"
	         />
	         <el-button
	           class="mic-button"
	           @click="toggleMic"
	         >
			<div class="icon2">
	           <el-icon><microphone /></el-icon>
			</div>
	         </el-button>
	         <el-button
	           class="send-button"
			   :disabled = "!Disabled"
	           @click="send"
	         >
			<div class="icon2">
	           <el-icon><Promotion /></el-icon>
			</div>
	         </el-button>
	</div>
<!--	<div class="upload-box2">
	  <el-upload
	    ref="upload"
	    class="upload-demo"
	    :limit="1"
	    :on-exceed="handleExceed"
	    :auto-upload="false"
	  >
	    <template #trigger>
	      <el-button type="primary">选择文件</el-button>
	    </template>
	    <el-button class="ml-3" type="success" @click="submitUpload">
	    上传文件
	    </el-button>
	    <template #tip>
	      <div class="el-upload__tip text-red">
	        仅限一个文件，新文件将会覆盖旧文件
	      </div>
	    </template>
	  </el-upload>
	</div>
	-->
	<div class="file-type-component">
	    <!-- 下拉框选择生成的文件类型 -->
	    <el-select v-model="selectedFileType" placeholder="生成文件类型" style="width: 130px;" v-if="!Visiable">
		  <el-option label="MD" value="md"></el-option>
	      <el-option label="PPTX" value="pptx"></el-option>
	      <el-option label="TXT" value="txt"></el-option>
	      <el-option label="Excel" value="xlsx"></el-option>
	    </el-select>
	
	    <!-- 单选框 -->
		<div class="Prompt" v-if="!Visiable">
			<span style="color:black; font-weight: 400;">是否加入提示词</span>
			<el-radio-group v-model="includePromptWords" class="radio-group">
			<el-radio :value="true"><span style="color:black; font-weight: 400;">是</span></el-radio>
			<el-radio :value="false"><span style="color:black; font-weight: 400;">否</span></el-radio>
			</el-radio-group>
		</div>
	    
	</div>
	
	<div class="Demo" v-if="Visiable2">
	<div class = "demoText">
		内容正在生成~
	</div>
	<div class="demo-progress">
	   <el-progress :percentage ="30":indeterminate="true":show-text="false"/>
	</div>
	</div>
	
	
	<div class="upload-box1" @click="GoToLaTex" v-if="!Visiable">
		<span class = "LatexText">手写公式转LaTex公式</span>
	</div>
	
	
	
  <div class="upload-box" @click="openDialog" v-if="!Visiable">
    <div class="icon">
      <el-icon style="size:3cm;"><upload-filled /></el-icon>
    </div>
    <div class="text">上传文件</div>
    <div class="file-types">支持的文件类型：pdf，docx，pptx</div>
  </div>
  
  <el-dialog title="上传文件" v-model="dialogVisible" width="30%">
    <el-form @submit.prevent="uploadFile">
      <input type="file" ref="fileInput" @change="onFileChange" style="display: none;" />
      <el-button type="primary" @click="triggerFileInput">选择文件</el-button>
      <div>
        <label for="file_belongid">归属ID:</label>
        <el-input v-model="file_belongid" placeholder="请输入归属ID"></el-input>
      </div>
      <div>
        <label for="file_open">是否公开 (0: 私有, 1: 公开):</label>
        <el-input-number v-model="file_open" :min="0" :max="1"></el-input-number>
      </div>
      <div>
        <label for="file_check">是否审核 (0: 未审核, 1: 已审核):</label>
        <el-input-number v-model="file_check" :min="0" :max="1"></el-input-number>
      </div>
      <el-button type="success" native-type="submit" @click="CloseDialog">上传文件</el-button>
    </el-form>
  </el-dialog>
  
  </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, watch} from 'vue';
import OSS from 'ali-oss';
import axios from 'axios';
import { genFileId } from 'element-plus';
import { ElButton, ElIcon, ElDropdown, ElDropdownItem, ElDialog, ElInput, ElMessage, ElMessageBox, ElSelect,
  ElOption,
  ElRadio,
  ElRadioGroup} from 'element-plus';
import { ArrowDown, UploadFilled, Microphone, Promotion} from '@element-plus/icons-vue';
import type { MessageParams, UploadInstance, UploadProps, UploadRawFile } from 'element-plus';

const inputText = ref('');
const linkDialogVisible = ref(false);
const fileLink = ref('');
const fileType = ref('');
const fileInput = ref(null);

const upload = ref<UploadInstance>()
const selectedFileType = ref(''); // 绑定到选择文件类型的下拉框
const includePromptWords = ref(false); // 绑定到单选框
const promptWordsStatus = ref(0);

watch(includePromptWords, (newValue) => {
  promptWordsStatus.value = newValue ? 1: 0;
});
 
const Disabled = ref(false);
const dialogVisible = ref(false);
const selectedFile = ref(null);
const file_belongid = ref('');
const file_open = ref(0);
const file_check = ref(0);
const message = ref('');
const Visiable = ref(false);
const Visiable2 = ref(false);
//let responseText = ref('');
const Url = ref('');

const GoToLaTex = () =>{
	window.location.href = "https://def5843dba3c381a67.gradio.live/";
}

const openDialog = () => {
  dialogVisible.value = true;
};

const CloseDialog = () => {
	dialogVisible.value = false;
}

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
    message.value = '请选择文件';
    return;
  }

  const client = new OSS({
    region: 'oss-cn-nanjing',
    accessKeyId: 'LTAI5tG65vWDXY4oWLJksWCF',
    accessKeySecret: 'FYLpCuyLJxLFZbemUKTJYnZxbNnnn5',
    bucket: 'wenwu-file-test'
  });

 // try {
    const fileName = `${Date.now()}_${selectedFile.value.name}`;
    const result = await client.put(fileName, selectedFile.value);

    const data = {
      file_name: fileName,
      file_belongid: file_belongid.value,
      file_open: file_open.value,
      file_check: file_check.value,
      file_type: selectedFile.value.type,
      url: result.url,
    };
	console.log("Url是？？？？？？:",data.url);
	while(!data.url);
	Disabled.value = true;
	Url.value = data.url;
/*
    const backendResponse = await axios.post('http://localhost:8000/submit/', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (backendResponse.data.success === 'YES') {
      message.value = '文件上传成功';
      resetForm();
    } else {
      message.value = '文件上传失败';
    }

  } 
  catch (error) {
    console.error('Error uploading file:', error);
    message.value = '文件上传过程中发生错误';
  }*/
};

const resetForm = () => {
  selectedFile.value = null;
  file_belongid.value = '';
  file_open.value = 0;
  file_check.value = 0;
  dialogVisible.value = false;
};

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const submitUpload = () => {
  upload.value!.submit()
}

function triggerUpload(event) {
	// 检查点击的是否是 upload-box 本身
	  if (event.target === event.currentTarget) {
	    fileInput.value.click();
	  }
}


function send() {
	console.log('1111');
  // 发送按钮逻辑
 // if(promptWordsStatus.value == 1)

  
  console.log('发送的内容:', Url.value);
  
  Visiable.value = true;
  Visiable2.value = true;
  const Input = Url.value + '\n' + inputText.value;
  const responseText = ref();
  axios.post('http://127.0.0.1:8000/send_URL_input/',{Input})
      .then(result=>{
 		 //alert(result);
 		 //console.log(result);
 		 //alert(result.data.sname);
 		 //alert(result.data.sex);
 		 //alert(result.data.nation);
 		 inputText.value='';
 		 responseText.value = result.data;
		 console.log('你好' + responseText.value);
 		 Visiable2.value=false;
		 Disabled.value = false;
 	//	 this.Box();
 	/*	ElMessageBox({
 		  message: '根据您的要求，文件已生成。',
 		  type: 'info',
 		  showClose: true,
 		  
 		  style: {
 		      display: 'flex', // 使用 Flexbox 布局
 		      justifyContent: 'center', // 水平居中
 		      alignItems: 'center', // 垂直居中
 		      position: 'fixed', // 固定定位
 		      top: '50%', // 距离顶部 50%
 		      left: '50%', // 距离左侧 50%
 		      transform: 'translate(-30%, -50%)', // 偏移自身尺寸的一半以确保完全居中
 		      backgroundColor: '#f1f1f1',
 		      color: '#000000',
 		      borderRadius: '10px',
 		      padding: '20px', // 调整为合适的内边距
 		      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
 	//	      line_height: '2', // 调整行间距
 	//		  lineHeight: '2' // 调整行间距
 		    },
			showConfirmButton: true,
			confirmButtonText: '查看文件',
			onConfirm: () => {
			    window.location.href = responseText.value;
			}
 		});*/
		ElMessageBox({
		  title: '提示',
		  message: '根据您的要求，文件已生成。',
		  dangerouslyUseHTMLString: true,
		  confirmButtonText: '查看文件',
		  showCancelButton: false,
		  type: 'info',
		  beforeClose: (action, instance, done) => {
		    if (action === 'confirm') {
		      window.location.href = responseText.value; // 确保这是一个有效的 URL
			  Visiable.value = false;
		    }
		    done();
		  }
		});
 
 	 });

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

.send-button, .mic-button {
  background-color: transparent;
  border: none;
  padding: 0px;
}

.icon2{
	font-size: 20px;
}

.mic-button {
  margin-right: 5px; /* 麦克风 icon 和发送 icon 之间的间距 */
}

.upload-box {
  width: 500px;
  height: 200px;
  border: 2px dashed #fffaee;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
 /* position: relative;*/
  background-color: #fff8e6;
  position: absolute; /* 使用绝对定位 */
  top: 475px; /* 距离父容器顶部200px */
  left: 60%; /* 先水平居中 */
  transform: translateX(-50%); /* 再向左移动自身宽度的50%，以确保完全居中 */
  
  text-align: center;
  cursor: pointer;
}

.upload-box1 {
  width: 500px;
  height: 75px;
  border: 2px solid #f4f2ef;
  border-radius: 100px; /* 更圆滑的圆角 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
 /* position: relative;*/
  background-color: #fffdef;
  position: absolute; /* 使用绝对定位 */
  top: 365px; /* 距离父容器顶部200px */
  left: 60%; /* 先水平居中 */
  transform: translateX(-50%); /* 再向左移动自身宽度的50%，以确保完全居中 */
  
  text-align: center;
  cursor: pointer;
}


.upload-box2 {
  border: 1px  #dcdfe6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
 /* position: relative;*/
  position: absolute; /* 使用绝对定位 */
  top: 300px; /* 距离父容器顶部200px */
  left: 60%; /* 先水平居中 */
  transform: translateX(-50%); /* 再向左移动自身宽度的50%，以确保完全居中 */
  
  text-align: center;
  cursor: pointer;
}

.icon {
  margin-bottom: 10px;
  font-size: 40px;
}
.text {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 20px;
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

.file-type-component {
   display: flex;
   flex-direction: row;
/*   border:1px dashed; */
   width: 500px;
   height: 50px;
   align-items: center;
   justify-content: center;
  /* position: relative;*/
   position: absolute; /* 使用绝对定位 */
   top: 290px; /* 距离父容器顶部200px */
   left: 58%; /* 先水平居中 */
   transform: translateX(-50%); /* 再向左移动自身宽度的50%，以确保完全居中 */
   
}

.radio-group {
  margin: 10px 20px;
}

.button-group {
  display: flex;
  gap: 10px; /* 设置按钮之间的间距 */
}

.Prompt{
	display: flex;
	flex-direction: row;
	align-items: center;
	font-size: 14px;
	font-weight: 500;
	margin-left: 30px;
	color: #000000;
	
}


.demoText{
	font-size: 22px;
	font-weight: 600;
	padding-left: 275px;
	color: #525252;
}

.demo-progress {
	margin-top: 50px;
	padding-left: 275px;
    max-width: 500px;
}
.Demo{
	margin-top: 200px;
}

.LatexText{
	font-weight: 600;
	font-size: 20px;
	font-family: '幼圆', sans-serif;
}

</style>