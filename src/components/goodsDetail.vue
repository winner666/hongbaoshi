<template>
	<div class="detailBox">
		<v-header></v-header>
		<div class="detailWarp">
			<div class="detail width">
				<div class="deatilTop">
					<a class="backIndex" @click="order()">首页></a>
					<em class="detailTitle">{{gemstone.name}}</em>
				</div>
				<div class="clear">
					<ul class="goodsImgSmall">
						<li v-for='(goodsimgsmall,index) in gemstone.goodsImgs'><img :src="goodsimgsmall.src"/></li>						
					</ul>
					<div class="goodsImgBig">
						<img :src="imgsrc"/>
					</div>
					<div class="goodsRight">
						<div class="nameGoods">{{gemstone.name}}</div>
						<div class="product clear"><em>商品货号</em>{{gemstone.goodsId}}<em></em></div>
						<div class="goodsPrice clear"><em>商品价格</em><em class="jifen">{{gemstone.price}}XIMI币</em></div>
						<!-- <div class="detailGoods clear">
							<em class="">商品详情</em>
							<em class="detailName">{{gemstone.remark}}</em></div> -->
						<div class="countBox clear">
							<em>数量</em>
							<div class="NumberBox">
								<i class="reduce" @click="reduce">-</i>								
								<input type="text"  class="num" value="1" v-model="num"/>
								<i class="add" @click="add">+</i>								
							</div>
						</div>
						<div class="goodsBtn" @click='ordersure(gemstone.goodsId)'>立即提取</div>
					</div>
				</div>
				<div class="spec">
					<div class="specTitle">
						商品详情
					</div>					
					<div id="remark"></div>
				</div>
			</div>
		</div>
		<v-footer></v-footer>
	</div>
	
</template>

<script>
	import header from './shophead'
	import footer from './footer'
	export default{
		name:"detailBox",
		data(){
			return{
				num:1,
				gemstone:'',
				imgsrc:''
			}
		},
		components:{
			'v-header':header,
			'v-footer':footer,
		},
		mounted(){
			this.detailGoods()
		},
		updated:function(){		
			var that=this;
					if(that.gemstone!=0){
						$.each(that.gemstone.goodsImgs,function(j,i){																			
						  that.imgsrc=i.src								
						})
					}
						
		
			//console.log(that.abc)
		},
		methods:{
			detailGoods(){
				//var sessionKey=sessionStorage.getItem('objOne');
					//var sessionKey='ef92bd5e1831af9d4918c3991b0e4f22'
					var that=this;
					console.log(parseInt(this.$route.query.shopId))
				 ajax({
					type:"post",
						url: http + "goods/findGoods",					
						data: JSON.stringify({
							"goodsId":parseInt(this.$route.query.shopId),							 							
						}),
						success:function(res){	
							//console.log(res)
							var data=JSON.parse(res).obj;
							//console.log(data)	
							if(data.length!=0){
								that.gemstone=data[0];
								document.getElementById("remark").innerHTML=that.gemstone.remark
								 console.log(that.gemston)
	         					that.goodsImgSmallhover();
							}
								 
							
	         			 
	         				
						 }
	             		
	           		})
			},
			goodsImgSmallhover(){
				var that=this
				$('.goodsImgSmall').on('click','li',function(){
					console.log(6666)
					that.imgsrc=$(this).children('img').attr('src')
					console.log(that.imgsrc)
				})
			},
			reduce(){
				if(this.num==1){
					this.num=1
				}else{
					this.num--;
				}
			},
			add(){
				this.num++;
			},
			ordersure(index){
				
				this.$router.push({path:'/order',query:{shopId:index}})
			}
		},
		watch:{
			num:function(val,oldval){
				
					//alert(val,oldval)
					if(val<0){
						this.num=1
					}
			},
		},
	}
</script>

<style scoped>
	.detailWarp{
		border-top:10px solid #FDE5E8 ;
	}
	.detail{
		min-height:1000px;
	}
	.backIndex{
		color: #A3A3A3;
		cursor: pointer;
	}
	.detailTitle{
		color: #2C2C2C;
	}
	.deatilTop{
		margin:24px 0;
	}
	.goodsImgSmall li{
		width: 106px;
		height: 106px;
		margin-bottom: 14px;
		border:1px solid #ddd;
	}
	.goodsImgSmall li img{
		width: 100%;
		height: 100%;
	}
	.goodsImgSmall{
		float: left;
	}
	.goodsImgBig{
		width: 360px;
		height: 360px;
		margin:0px 48px 0 20px;
		float: left;
		border:1px solid #ddd;
	}
	.goodsImgBig img{
		width: 100%;
		height: 100%;
	}
	.goodsRight{
		width: 590px;
		float: right;
		font-size: 16px;
		color: #8c8c8c;

		
	}
	.nameGoods{
		font-size: 24px;
		color: #2C2C2C;
		line-height: 35px;
	}
	.detailName{
		display: inline-block;
		line-height: 30px;
	}
	.product{
		margin:16px 0;
	}
	.goodsPrice{
		margin:16px 0;
	}
	.detailGoods{
		margin:16px 0;
	}
	.goodsRight em{
		float: left;
	}
	.goodsRight em:nth-child(1){
		margin-right: 40px;
	}
	.detailName{
		width: 470px;
	}
	.reduce{
		float: left;
	}
	
	.NumberBox{
		float: left;
		margin-left:40px;
		border: 1px solid #8C8C8C;
		text-align: center;
		width: 40px;
		line-height: 40px;
		width:155px;
	}
	.NumberBox i{
		cursor: pointer;
		width: 40px;
	}
	
	.add{
		float: left;
	}
	.num{
		height: 40px;
		float: left;
		border-left: 1px solid #8C8C8C;
		border-right: 1px solid #8C8C8C;
		width: 70px;
		text-align: center;	
	}
	.goodsBtn{
		width: 150px;
		height: 40px;
		line-height: 40px;
		color: #fff;
		background: #FC7988;
		text-align: center;
		cursor: pointer;
		margin-left: 100px;
		margin-top: 28px;
	}
	.spec{
		margin-top: 28px;
	}
	.specTitle{
		line-height: 50px;
		font-size: 18px;
	}
	.specDetail{
		border-left: 1px solid #8C8C8C;
		border-bottom: 1px solid #8C8C8C;
	}
	.specDetail .text{
		width: 375px;
		float: left;
		border-right: 1px solid #8C8C8C;
		border-top: 1px solid #8C8C8C;
		height: 60px;
		line-height: 60px;
		text-indent: 32px;			
	}
	.jifen{
		color: #FC7988;
	}
	#remark{
		text-indent: 2rem;
	}
</style>