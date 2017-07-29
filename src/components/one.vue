<template>
	<div id="first" >
<!-- 	头部	 -->
<div class="head">
	<v-headTop></v-headTop>
</div>
			

<div class="content clear">
<!-- 货币 -->
	<!--<v-account></v-account>-->
	<!-- 国家 -->
	<v-country></v-country>
</div>

	</div>
</template>
<script>

import headTop from './head.vue'

import country from './country.vue'
	export default{
		name:'first',
		data(){
			return{

				}
		},
		components:{
			'v-headTop':headTop,
			
			'v-country':country
		},
		methods:{
			
		}
	}
</script>
<style>
body,html{
	width: 100%;
	height: 100%;
}
#first{
	width: 100%;
	height: 100%;
	/*background: #f1f1f1;*/
}
	.content{
	width: 100%-15px;
	
		padding:0 15px;
		
		
	}
</style>	