<template>
	<div class="successPayment">
			<v-header></v-header>
			<div class="successtop">
				<div class="width">
					<div class="sucImg">
						<img src="../assets/image/suc.png"/>							
					</div>
					<div class="sucWord">提取成功</div>
					<div class="sucBack" @click='sucBtn'>返回商城首页</div>
				</div>
			</div>
			<v-footer></v-footer>
	</div>
</template>

<script>
	import header from './shophead'
	import footer from './footer'
	export default{
		name:'payWarp',
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
			sucBtn(){
				this.$router.push({path:'/shop'})
			}
		}
	}
</script>

<style scoped="scoped">
	.successtop{
		border-top: 10px solid #FEE5E8;
		min-height:1055px;
	}
	.sucImg{
		width: 140px;
		height:140px ;
		margin: 200px auto 0;
	}
	.sucWord{
		text-align: center;
		font-weight: 600;
		font-size: 20px;
		padding:20px 0;
	}
	.sucBack{
		text-align: center;
		width: 200px;
		border: 1px solid #FC7988;
		color: #FC7988;
		border-radius: 5px;
		-webkit-border-radius: 5px;
		-moz-border-radius: 5px;
		line-height: 35px;
		margin:0 auto;
		cursor: pointer;
	}
</style>