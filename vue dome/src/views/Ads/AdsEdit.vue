<template>
  <div class="adsCreate">
    <!-- 当有id的时候显示编辑没有显示新建 -->
    <h2>{{ id ? "编辑" : "新建" }}广告位</h2>
    <el-form label-width="120px" @submit.native.prevent="saveEdit">
      <el-form-item label="名称">
        <!-- form表单的submit事件 native表示原生表单  prevent表示阻止默认提交  save为自定义事件 -->
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button @click="model.items.push({})"> <i class="el-icon-plus"></i> 添加广告</el-button>
        <el-row type="flex" style="flex-wrap: wrap">
          <el-col :md="24" v-for="(item, i) in model.items" :key="i">
            <el-form-item label="跳转链接(url)">
              <el-input v-model="item.url" > </el-input>
            </el-form-item>
            <el-form-item label="图片" style="margin-top:0.5rem">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL + '/upload'"
                :show-file-list="false"
                :on-success="res => $set(item, 'image', res.url)">
                <!-- vue的显示赋值 给item中的icon 赋值-->
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button
                @click="model.items.splice(i, 1)"
                size="small"
                type="danger">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
      model: {
        items:[]
      },
      
    };
  },
  methods: {
    saveEdit() {
      //异步回调写成类似回调的写法
      if (this.id) {
        this.$http.put(`rest/ads/${this.id}`, this.model);
      } else {
        this.$http.post("rest/ads", this.model);
      }
      // 创建成功后跳转到列表页
      this.$router.push("/ads/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    fetch() {
      // 要将"" 改为` `
      this.$http.get(`rest/ads/${this.id}`).then(res => {
        // this.model = res.data;
        // 多层数据赋值
        this.model = Object.assign({},this.model,res.data)
      });
    }
  },
  created() {
    // 满足前面事件再执行后面事件
    // 就是有id不为空才执行后面
    this.id && this.fetch();
  }
};
</script>