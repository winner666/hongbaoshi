<template>
	<div class="help">
		<v-header></v-header>
		<div class="helpwarp">
			<div class="width">
				<div class="helpTitle">
					<span class="helpBack">首页></span>
					<span>帮助中心</span>
				</div>
				<div class="helpContent"></div>
			</div>
		</div>
		<v-footer></v-footer>
	</div>
</template>

<script>
	import header from './shophead'
	import footer from './footer'
	export default{
		name:'help',
		data(){
			return{
				
			}
		},
		components:{
			'v-header':header,
			'v-footer':footer,
			
		},
		mounted:function(){
			
		},
		methods:{
//			paymentDetail(){
//				this.$router.push({path:'/payDetail'})
//			}
			
		}
	}
</script>

<style scoped="scoped">
	.helpwarp{
		border-top: 10px solid #FDE5E8;
		padding-top: 20px;
	}
	.helpBack{
		color:#7F7F7F;
	}
	.helpContent{
		min-height: 1013px;
	}
</style>