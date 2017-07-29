// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router';
import jQuery from 'jquery'
//import iView from 'iview';
//import 'iview/dist/styles/iview.css';    // 使用 CSS
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//require('es6-promise').polyfill();
import "babel-polyfill"
// import axios from 'axios'
// Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(VueRouter);
//Vue.use(iView);
Vue.use(ElementUI)
/* eslint-disable no-new */
window.$ = jQuery
 Date.prototype.format = function(format) {
       var date = {
              "M+": this.getMonth() + 1,
              "d+": this.getDate(),
              "h+": this.getHours(),
              "m+": this.getMinutes(),
              "s+": this.getSeconds(),
              "q+": Math.floor((this.getMonth() + 3) / 3),
              "S+": this.getMilliseconds()
       };
       if (/(y+)/i.test(format)) {
              format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
       }
       for (var k in date) {
              if (new RegExp("(" + k + ")").test(format)) {
                     format = format.replace(RegExp.$1, RegExp.$1.length == 1
                            ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
              }
       }
       return format;
      }





      var ajax = function(info){
				if(window.XMLHttpRequest){
					var xhr = new XMLHttpRequest();	
				}else{
					var xhr = new ActiveXObject("Microsoft.XMLHTTP");
				}
				var url = info.url;
				var type = info.type||"GET";
				var data = info.data||"";
				
				if(type=="GET"){
					xhr.open("GET",url+"?"+data+"&t="+new Date().getTime(),true);
					xhr.send();
				}else{
					xhr.open("POST",url,true);
					xhr.setRequestHeader("Content-Type","application/json; charset=utf-8")  ;
					xhr.send(data);
				}
				
				xhr.onload = function(){
					if(info.success){
						info.success(xhr.responseText);
					}
				}
			}
		Vue.prototype.$ajax = ajax;

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
