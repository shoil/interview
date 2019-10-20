<template>
  <div class="articlesCreate">
    <!-- 当有id的时候显示编辑没有显示新建 -->
    <h2>{{ id ? "编辑" : "新建" }}文章</h2>
    <el-form label-width="120px" @submit.native.prevent="saveEdit">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option v-for="item in categories" :key="item._id"
          :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="名称">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item  label="内容">
        <vue-editor v-model="model.body" useCustomImageHandler @imageAdded="handleImageAdded" ></vue-editor>
      </el-form-item>
      <el-form-item>
        <!-- form表单的submit事件 native表示原生表单  prevent表示阻止默认提交  save为自定义事件 -->
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// 这是解构方式可以对象的子元素
import { VueEditor } from "vue2-editor";
export default {
  // 引用路由传递的参数id
  props: {
    id: {}
  },
  components: {
    VueEditor
  },
  data() {
    return {
      model: {},
      categories:[]
    };
  },
  methods: {
    saveEdit() {
      if(this.id){
        this.$http.put(`rest/articles/${this.id}`, this.model);
      } else {
        this.$http.post("rest/articles", this.model);
      }
      // 创建成功后跳转到列表页
      this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    fetch() {
      // url为变量时要将"" 改为` `
      this.$http.get(`rest/articles/${this.id}`).then(res =>{
      this.model = res.data;
      })
    },
    fetchCategories() {
      this.$http.get('rest/categories').then(res =>{
      this.categories = res.data;
      })
    },
    /* 手动添加加图片的方法 */
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await this.$http.post('upload',formData)
        Editor.insertEmbed(cursorLocation, "image", res.data.url);
        resetUploader();
        // axios({
        //   url: "https://fakeapi.yoursite.com/images",
        //   method: "POST",
        //   data: formData
        // })
          // .then(result => {
          //   let url = result.data.url; // Get url from response
          //   Editor.insertEmbed(cursorLocation, "image", url);
          //   resetUploader();
          // })
          // .catch(err => {
          //   window.console.log(err);
          // });
      }
  },
  created() {
    // 满足前面事件再执行后面事件
    // 就是有id不为空才执行后面
    this.fetchCategories();
    this.id && this.fetch();
  }
};
</script>