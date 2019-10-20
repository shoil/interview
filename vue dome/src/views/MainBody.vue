<template>
  <div class="main">
    <el-container style="height: 100vh;">
      <!-- 100vh表示屏幕的高度-->
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <!-- 添加router变成路由的一个状态 -->
        <el-menu router :default-openeds="['1']" unique-opened :default-active="$route.path"> 
         <!--  :default-openeds="['1']" 默认打开那一个 unique-opened 默认展开第一个且只能展开一组 :default-active="$route.path"默认打开分页 $route.path高亮 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>内容管理
            </template>
             <el-menu-item-group>
              <template slot="title">物品</template>
              <!-- 这里与router path值保持一致 -->
              <el-menu-item index="/equipments/create">新建装备</el-menu-item>
              <el-menu-item index="/equipments/list">装备列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">英雄</template>
              <!-- 这里与router path值保持一致 -->
              <el-menu-item index="/heroes/create">创建英雄</el-menu-item>
              <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">文章</template>
              <el-menu-item index="/articles/create">创建文章</el-menu-item>
              <el-menu-item index="/articles/list">文章列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
       
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-message"></i>运营管理
            </template>
            
            <el-menu-item-group>
              <template slot="title">广告位</template>
              <el-menu-item index="/ads/create">新建广告位</el-menu-item>
              <el-menu-item index="/ads/list">广告位列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
      
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-message"></i>系统管理
            </template>
            
            <el-menu-item-group>
              <template slot="title">分类</template>
              <!-- 这里与router path值保持一致 -->
              <el-menu-item index="/categories/create">新建分类</el-menu-item>
              <el-menu-item index="/categories/list">分类列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">管理员</template>
              <!-- 这里与router path值保持一致 -->
              <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
              <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </el-header>

        <el-main>
          
          <router-view></router-view>
          <!-- 这是写死的 -->
          <!-- <el-table :data="tableData">
            <el-table-column prop="date" label="日期" width="140"></el-table-column>
            <el-table-column prop="name" label="姓名" width="120"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
          </el-table>-->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script>
export default {
  name: "mainBody",
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(20).fill(item)
    };
  }
};
</script>
<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
