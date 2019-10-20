<template>
  <div class="categoriesCreate">
    <!-- 当有id的时候显示编辑没有显示新建 -->
    <h2>{{ id ? "编辑" : "新建" }}装备</h2>
    <el-form label-width="120px" @submit.native.prevent="saveEdit">
      <el-form-item label="名称">
        <!-- form表单的submit事件 native表示原生表单  prevent表示阻止默认提交  save为自定义事件 -->
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="上传图片">
      <!-- 
        action  上传地址  动态数据前面要加 :
        :on-success  成功之后
        :before-upload 上传之前
       -->
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload">
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  // 引用路由传递的参数id
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      parentOptions:[]
    };
  },
  methods: {
    afterUpload(res){
      window.console.log(res)

      /* 直接给model对象赋值 */
      // this.model.icon = res.url

      /* 
      显示赋值
      $set这个是vue官方的方式
      $set(this.model, 'icon',res.url)
      （被赋值的对象，属性，参数）
      */
      this.$set(this.model, 'icon',res.url)
    },
    saveEdit() {
      //异步回调写成类似回调的写法
  
      if(this.id){
        this.$http.put(`rest/equipments/${this.id}`, this.model);
      } else {
        this.$http.post("rest/equipments", this.model);
      }
      // 创建成功后跳转到列表页
      this.$router.push("/equipments/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    fetch() {
      // 要将"" 改为` `
      this.$http.get(`rest/equipments/${this.id}`).then(res =>{
      this.model = res.data;
      })
    },
   
  },
  created() {
 
    this.id && this.fetch();
  }
};
</script>
<style>
/* 上传图片的样式 */
  /* .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  } */
</style>