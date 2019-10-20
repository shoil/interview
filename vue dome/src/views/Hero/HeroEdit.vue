<template>
  <div class="categoriesCreate">
    <!-- 当有id的时候显示编辑没有显示新建 -->
    <h2>{{ id ? "编辑" : "新建" }}英雄</h2>
    <el-form label-width="120px" @submit.native.prevent="saveEdit">
      <el-tabs type="border-card" value="skills">
        <el-tab-pane label="基本信息" name="basic">
          <el-form-item label="名称">
            <!-- form表单的submit事件 native表示原生表单  prevent表示阻止默认提交  save为自定义事件 -->
            <el-input v-model="model.name"></el-input>
          </el-form-item>

          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>

          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="afterUpload">
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="类型">
            <!-- multiple表示可以多选 -->
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item of categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 多层级会报错 -->
          <el-form-item label="难度">
            <!-- el-rate elment中的打分机 -->

            <el-rate
              :max="10"
              show-score
              v-model="model.scores.difficult"
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate
              :max="10"
              show-score
              v-model="model.scores.skills"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate
              :max="10"
              show-score
              v-model="model.scores.attack"
            ></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate
              :max="10"
              show-score
              v-model="model.scores.survive"
            ></el-rate>
          </el-form-item>

          <el-form-item label="顺风出装">
            <!-- multiple表示可以多选 -->
            <el-select v-model="model.equipmentsObey" multiple>
              <el-option
                v-for="item of equipments"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="逆风出装">
            <!-- multiple表示可以多选 -->
            <el-select v-model="model.equipmentsOpposite" multiple>
              <el-option
                v-for="item of equipments"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"> </el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"> </el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"> </el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button @click="model.skills.push({})"> <i class="el-icon-plus"></i> 添加技能</el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, i) in model.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="item.name">
                </el-input>
              </el-form-item>
              <el-form-item label="图标">
                 <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/upload'"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'icon', res.url)">
                  <!-- vue的显示赋值 给item中的icon 赋值-->
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description">
                </el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="item.tips">
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="model.skills.splice(i, 1)" size="small" type="danger">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    
      <el-form-item style="margin-top: 1rem">
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
      categories: [],
      // equipmentsObey:[],
      equipments: [],
      model: {
        name: "",
        acater: "",
        scores: {
          difficult: 0,
          skills: 0,
          attack: 0,
          survive: 0
        }
      },
      parentOptions: []
      // usageTips: ,
    };
  },
  methods: {
    afterUpload(res) {
      window.console.log(res);

      /* 直接给model对象赋值
      model赋值就可以使用这种赋值方式
       */
      this.model.avatar = res.url;

      /* 
      显示赋值
      $set这个是vue官方的方式
      $set(this.model, 'icon',res.url)
      （被赋值的对象，属性，参数）
      */
      // this.$set(this.model, 'avatar',res.url)
    },
    saveEdit() {
      //异步回调写成类似回调的写法

      if (this.id) {
        this.$http.put(`rest/heroes/${this.id}`, this.model);
      } else {
        this.$http.post("rest/heroes", this.model);
      }
      // 创建成功后跳转到列表页
      this.$router.push("/heroes/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    fetch() {
      // 要将"" 改为` `
      this.$http.get(`rest/heroes/${this.id}`).then(res => {
        /* 这种方式会将服务器响应的数据直接赋给 model造成scores中没有数据 */
        // this.model = res.data;
        /* 将model中的数据赋给空对象，再将res.data数据赋给已经赋予model的空对象，
      res.data有model中相同属性会被res.data中的属性替换掉，model特有的属性会被保存*/
        this.model = Object.assign({}, this.model, res.data);
      });
    },
    fetchCategories() {
      // 要将"" 改为` `
      this.$http.get(`rest/categories`).then(res => {
        this.categories = res.data;
      });
    },
    fetchEquipment() {
      // 要将"" 改为` `
      this.$http.get(`rest/equipments`).then(res => {
        this.equipments = res.data;
      });
    }
  },
  created() {
    this.id && this.fetch();
    this.fetchCategories();
    this.fetchEquipment();
  }
};
</script>
<style>

</style>