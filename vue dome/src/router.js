import Vue from 'vue'
import Router from 'vue-router'
import MainBody from './views/MainBody.vue'

import Login from './views/Login.vue'



import CategoryEdit from './views/Categories/CategoryEdit.vue'
import CategoryList from './views/Categories/CategoryList.vue'
import EquipmentEdit from './views/Equipment/EquipmentEdit.vue'
import EquipmentList from './views/Equipment/EquipmentList.vue'
import HeroEdit from './views/Hero/HeroEdit.vue'
import HeroList from './views/Hero/HeroList.vue'
import ArticlesEdit from './views/Articles/ArticlesEdit.vue'
import ArticlesList from './views/Articles/ArticlesList.vue'
import AdsEdit from './views/Ads/AdsEdit.vue'
import AdsList from './views/Ads/AdsList.vue'
import AdminUserEdit from './views/AdminUsers/AdminUserEdit.vue'
import AdminUserList from './views/AdminUsers/AdminUserList.vue'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/login',
      name: 'login',
      component: Login

    },
    {
      path: '/',
      name: 'mainBody',
      component: MainBody,
      children: [
/* 列表子路由  */
        {path:'/Categories/create',component: CategoryEdit},
        /* 
        两个页面使用同一个组件
        props:true  将path中url参数传给component所指向的页面中在页面中可以引用
        */
        {path:'/Categories/edit/:id',component: CategoryEdit, props:true},
        {path:'/Categories/list',component: CategoryList},

/* 物品子路由 */
        {
          path:'/equipments/create',
          component: EquipmentEdit
        },
        {
          path:'/equipments/edit/:id',
          component: EquipmentEdit, 
          props:true
        },
        {path:'/equipments/list',
        component: EquipmentList},
/*英雄子路由  */
        {path:'/heroes/create',component: HeroEdit},
        {path:'/heroes/edit/:id',
        component: HeroEdit, 
        props:true},
        {path:'/heroes/list',
        component: HeroList},
/* 文章子路由 */
        {path:'/articles/create',component: ArticlesEdit},
        {path:'/articles/edit/:id',component: ArticlesEdit, props:true},
        {path:'/articles/list',component: ArticlesList},
/* 广告位子路由 */
        {path:'/ads/create',component: AdsEdit},
        {path:'/ads/edit/:id',component: AdsEdit, props:true},
        {path:'/ads/list',component: AdsList},
/* 账号管理子路由 */
        {path:'/admin_users/create',component: AdminUserEdit},
        {path:'/admin_users/edit/:id',component: AdminUserEdit, props:true},
        {path:'/admin_users/list',component: AdminUserList},
      ]
    },
   
  ]
})
