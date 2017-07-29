import Vue from 'vue'
import Router from 'vue-router'
//import index from '@/components/index'
import register from '@/components/register'
import one from "@/components/one"
import shop from "@/components/shop"
import detail from "../components/goodsDetail"
import order from "../components/order"
import myorder from '../components/myorder'
import payDetail from '../components/payDetail'
import paysuccess from '../components/paysuccess'
import help from '../components/help'
import pass from '../components/pass'
import repass from '../components/repass'
import news from '../components/news'
import point from '../components/point'
import newDetail from '../components/newDetail'
import barg from '../components/barg'
import capital from '../components/capital'
Vue.use(Router)

export default new Router({
	// mode: 'history',
  routes: [
   /* {
      path: '/',
      name: 'index',
      component: index
    }*/
    {
      path: '/',
      name: 'one',
      component: one
    },{
    
	  path:"/one",
	  component:one,
       redirect:{
        path:'/'
      }
  },
    {
    	path:'/register',
    	name:"register",
    	component: register
    },{
    	path:'/shop',
    	name:"shop",
    	component: shop
    },
    	{
    	path:'/detail',
    	name:"detail",
    	component: detail
    },{
    	path:'/order',
    	name:"order",
    	component:order
    },{
    	path:'/myorder',
    	name:'myorder',
    	component:myorder
    },{
    	path:'/payDetail',
    	name:'payDetail',
    	component:payDetail
    },{
    	path:'/paysuccess',
    	name:'paysuccess',
    	component:paysuccess
    },{
    	path:'/help',
    	name:'help',
    	component:help
    },
    {
    	path:'/pass',
    	name:'pass',
    	component:pass
    },
    {
    	path:'/repass',
    	name:'repass',
    	component:repass
    },{
    	path:'/news',
    	name:'news',
    	component:news
    },
    {
    	path:'/point',
    	name:'point',
    	component:point
    },
    {
    	path:'/newDetail',
    	name:'newDetail',
    	component:newDetail
    },
    {
    	path:'/barg',
    	name:'barg',
    	component:barg
    },
    {
    	path:'/capital',
    	name:'capital',
    	component:capital
    }
  ]
})
