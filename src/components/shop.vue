<template>
	<div id="shopWarp">
		<!--头部-->
		<v-header></v-header>
		<!--banner图-->
		<div class="banner">
			 <el-carousel height="400px">
			      <el-carousel-item v-for="(item1,banIndex) in bannerList" :key="banIndex">
			       <a :href="item1.bannerLink">
			       	<img :src="item1.imgSrc"/>
			       </a>
			      </el-carousel-item>
		    </el-carousel>
		</div>
		<v-goods></v-goods>
		
		<v-footer></v-footer>
	</div>

</template>
<script>
	import header from './shophead'
	import footer from './footer'
	import goods from './goods'
	export default {
		name: 'shopWarp',
		data() {
			return {
				bannerList:''
			}
		},
		components:{
			'v-header':header,
			'v-footer':footer,
			'v-goods':goods
		},
		mounted: function() {
			this.sele()	
		},
		methods: {
		
			sele(cityCode){
					var that=this;
				ajax({
					type:"post",
						url:http+"main/getBannerTable",					
						data: JSON.stringify({											        	
						}),
						success:function(res){
							//console.log(res)
							var obj=JSON.parse(res)
							that.bannerList=obj.resultList;
							//console.log(that.bannerList)
						},error:function(res){							
						}
					})
			}
		}
	}
</script>
<style scoped>

#app{
	width: 100%;
	height: 100%;
	background: #fff;
}
.banner{
	width: 100%;
	height: 400px;
	
	
}
.banner img{
	width: 100%;
	height: 100%;
}
</style>
