<template>
  <div id="app">
   
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
  	return{
  		
  	}
  },
  mounted:function(){
          this.fn()
    },
  methods:{
    fn(){
      window.isopen="111"
      window.shopId=''
      window.checkboxtype=''
    }
  }
}
</script>

<style>
 @import "assets/css/reset.css";
#app {
 /*  font-family: 'Avenir', Helvetica, Arial, sans-serif; */
 font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #2c3e50;
  width: 100%;
  height: 100%;
}


</style>
