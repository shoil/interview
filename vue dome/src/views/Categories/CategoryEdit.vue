<template>
  <div class="categoriesCreate">
    <!-- 当有id的时候显示编辑没有显示新建 -->
    <h2>{{ id ? "编辑" : "新建" }}分类</h2>
    <el-form label-width="120px" @submit.native.prevent="saveEdit">
      <el-form-item label="上级分类">
        <!-- form表单的submit事件 native表示原生表单  prevent表示阻止默认提交  save为自定义事件 -->
        <el-select v-model="model.parentOptions">
          <!--v-for="item in parentOptions" :key="item._id"
          遍历parenOptions   label为显示内容  value与数据关联的内容
           :label="item.name" :value="item._id"  -->
          <el-option v-for="item in parentOptions" :key="item._id"
          :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <!-- form表单的submit事件 native表示原生表单  prevent表示阻止默认提交  save为自定义事件 -->
        <el-input v-model="model.name"></el-input>
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
    saveEdit() {
      //异步回调写成类似回调的写法
  
      if(this.id){
        this.$http.put(`rest/categories/${this.id}`, this.model);
      } else {
        this.$http.post("rest/categories", this.model);
      }
      // 创建成功后跳转到列表页
      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    fetch() {
      // 要将"" 改为` `
      this.$http.get(`rest/categories/${this.id}`).then(res =>{
      this.model = res.data;
      })
    },
    fetchParenOption() {
      // 要将"" 改为` `
      this.$http.get('rest/categories').then(res =>{
      this.parentOptions = res.data;
      })
    }
  },
  created() {
    // 满足前面事件再执行后面事件
    // 就是有id不为空才执行后面
    this.fetchParenOption();
    this.id && this.fetch();
  }
};
</script>