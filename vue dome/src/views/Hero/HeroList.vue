<template>
  <div>
    <h1>装备列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="220px"></el-table-column>
      <el-table-column prop="name" label="英雄名称"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="icon" label="头像">
        <template slot-scope="scope">
          <!-- <img :src="../../views/1.jpg" style="height:3rem;"> -->
          <img :src="scope.row.avatar" style="height:3rem;">
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/heroes/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>  
<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    fetch() {
      this.$http.get("rest/heroes").then(res => {
        this.items = res.data;
        // console.log(res.data.icon)
      });
    },
    // 删除当前列
    remove(row) {
      this.$confirm(`是否确定删除"${row.name}"分类?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          this.$http.delete(`rest/heroes/${row._id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetch();
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.fetch();
  }
};
</script>
