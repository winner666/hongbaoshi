<template>
	<div class="myorder">
		<v-header></v-header>
		<div class="warpMyorder">
			<div class="clear myorder_warp width">
			<div class="my_order">我的订单</div>
			<div class="myorder_right">
				<div class="left_top">
						<span>商品信息</span>
						<span>XIMI币</span>
						<span>数量</span>
						<span>交易状态</span>
						<span>操作</span>
				</div>
				<div class="order_down">
					<div class="myorderList clear" v-for='(payitemList,index) in orderlistPay' :key="index">
						<div class="myorderImg"  >

							<img :src="payitemList.src"/>
						
						</div>

						<div class="myorderName">{{payitemList.goods.name}}</div>
						<div class="score">{{payitemList.money}}</div>
						<div class="myorderNum">{{payitemList.num}}</div>						
						<div class="status" v-if='payitemList.state==0'>待付款</div>
						<div class="status" v-else-if='payitemList.state==1'>待收货</div>
						<div class="status" v-else-if='payitemList.state===2'>已完成</div>						
						<div class="operation" v-if='payitemList.state==0'>
							
							<div class="myorderDetail" @click="paymentDetail(payitemList.orderId,payitemList.state)">订单详情</div>
							<div class="successPay" @click='secpay(payitemList.orderId,payitemList.money)'>完成支付</div>
							
						</div>
						<div class="operation" v-if='payitemList.state==1'>
							<div class="myorderDetail" @click="paymentDetail(payitemList.orderId,payitemList.state)">订单详情</div>	
							
						</div>
						<div class="operation" v-if='payitemList.state==2'>
							<div class="myorderDetail" @click="paymentDetail(payitemList.orderId,payitemList.state)">订单详情</div>
							
						</div>
					</div>
				</div>
				<div class="pageBox">
					<el-pagination
			      @size-change="handleSizeChange"
			      @current-change="handleCurrentChange"
			      :current-page.sync="currentPage1"
			      :page-size="10"
			      layout="total, prev, pager, next"
			      :total="+totalsize">
    				</el-pagination>
				</div>
				
			</div>
		</div>
		</div>
		
		<v-footer></v-footer>
		
		
		<!--立即提取弹出框-->
		<div class="mask" v-show="payordermask"></div>
		<div class="paymentBox" v-show="payordermask">
			<div class="payTitle"><span>请输入支付密码</span><span class="close1" @click='payorderClose'></span></div>
			<div class='pay'><span>支付XIMI币：</span><span>{{totleNum}}</span></div>
			<div class="paypass"><input type="password" name="" id="" value="" placeholder="请输入支付密码进行支付" v-model='passfu'/></div>
			<div class="payBtn" @click='payorderBtn()'>确定</div>
		</div>
	</div>
</template>

<script>
	import header from './shophead'
	import footer from './footer'
	export default{
		name:'myorder',
		data(){
			return{
				orderlistPay:'',
				totalSize:'',
				abc:"",
			 	payordermask:false,
			 	totleNum:'',
			 	orderpayId:'',
			 	passfu:'',
			 	ispasscode:'',
			 	 currentPage1: 1,
			 	 totalsize:'',
			 	 page:1
			}
		},
		components:{
			'v-header':header,
			'v-footer':footer,
			
		},
		mounted:function(){
			this.paymentOrderList(this.page);
		},
		updated:function(){		
					
		},
		methods:{
			handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
      	//console.log(val)
      	this.size=val;
      	this.paymentOrderList(val)
       // console.log(`当前页: ${val}`);
      },
			ispass(){//判断第一次是否有支付密码
				var that=this;
				ajax({
					type: "post",
					url: http + "user/isEmptyPayPwd",
					data: JSON.stringify({
						"sessionKey": sessionKey,						
					}),
					success: function(res) {
						var obj=JSON.parse(res);
						//console.log(res)
						that.ispasscode=obj.code;
						
					}
					})
			},
			paymentDetail(index,n){//点击进入订单详情
				//console.log(index,)
				this.$router.push({path:'/payDetail',query:{orderId:index}})
			},
			paymentOrderList(page){
				console.log(page)
// debugger;
				var that=this;
				 ajax({
					type:"post",
						url: http + "goodsOrder/findGoodsOrderByCancel",					
						data: JSON.stringify({
							"sessionKey":sessionKey,
							 "state":-1,
							 "page":page,
							  "size":10
							
						}),
						success:function(res){								
								var data=JSON.parse(res).obj;
								console.log(data)
							that.totalsize=parseInt(JSON.parse(res).total);
							if(data==null){
								that.orderlistPay=''
							}else if(data.length!=0){
									console.log(data.length)
									that.orderlistPay=data.reverse();
									that.orderlistPay.forEach(function(item){
										if(item.goods.goodsImgs.length && Array.isArray(item.goods.goodsImgs)){
											item.src = item.goods.goodsImgs[0].src
										}										
									})																																			
								}
							
								
						}
					})
			},
			secpay(index,k){//点击完成支付
				this.orderpayId=index;
				this.payordermask=true;
				this.totleNum=k;
				this.passfu='';
				this.ispass();
			},
			payorderClose(){
				this.payordermask=false;
			},
			payorderBtn(){//点击完成支付确定按钮
				var that=this;
				//console.log(that.orderpayId)
				//that.payordermask=false;
				console.log(sessionKey,that.orderpayId,parseInt(that.passfu))
				console.log(that.ispasscode)
				if(that.ispasscode==200){
					if(that.passfu==''){
						 that.$message({
				          message: '警告哦，请输入支付密码',
				          type: 'warning'
				        });
				        return
					}else{
						ajax({
						type:"post",
							url: http + "goodsOrder/goodsPurchase",					
							data: JSON.stringify({
									
								 "sessionKey":sessionKey,
	 							"orderId":that.orderpayId,
	 							"payPwd":parseInt(that.passfu)
							}),
							success:function(res){
								var obj=JSON.parse(res);
								console.log(obj)
								if(obj.code==205){
									console.log(obj.msg)
									that.$message(obj.msg);									
								}else if(obj.code==200){
									that.$router.push({path:'/paysuccess'})
								}else if(obj.code==206){
									that.$message(obj.msg);
								}else if(obj.code==201){
									that.$message(obj.msg);
								}
							}
						})
					}															
				}else{
					that.$router.push({path:'/pass'})
				}
			},
//			cancelOrder(k,n){
//				console.log(k,n)
//				var that=this;
//				ajax({
//					type:"post",
//						url: http + "goodsOrder/editGoodsOrder",					
//						data: JSON.stringify({
//							"orderId":k,
//							 "state":n
//							
//						}),
//						success:function(res){
//							var data=JSON.parse(res);
//							//console.log(res)
//							if(data.code==200){
//								that.$message({
//						          message: '恭喜你，删除成功',
//						          type: 'success'
//						        });
//
//								that.paymentOrderList(that.page);
//							}
//						}
//					})
//			}
		}
	}
	
</script>

<style scoped="scoped">
.pageBox{
	margin-top: 20px;
}
	.my_order{
		color: #FC7988;
		float: left;
	}
	.myorder_warp{
		margin-top: 36px;
	}
	.myorder_right{
		width: 1020px;
		float: right;
		border-left: 1px solid #D5D5D5;
		padding-left: 34px;
			min-height: 800px;
			margin-bottom: 50px;
	}
	.left_top{
		text-align: center;
	}
	.left_top span{
		display: inline-block;
	}
	.left_top span:nth-child(1){
		width: 440px;
		
	}
	.left_top span:nth-child(2){
		width: 130px;
	}
	.left_top span:nth-child(3){
		width: 130px;
	}
	.left_top span:nth-child(4){
		width: 140px;
	}
	.left_top span:nth-child(5){
		width: 140px;
	}
	
	.myorderList{
		background: #EEEEEE;
		padding: 15px;
		margin-top: 15px;
	}
	.myorderImg{
		float: left;
		width: 140px;
		height:124px;
	}
	.myorderImg img{
		width: 100%;
		height: 100%;		
	}
	.myorderName{
		float: left;
		width: 260px;
		margin:0 20px;
		padding:35px 0;
	}
	.score{
		float: left;
		width: 130px;
		line-height: 124px;
		text-align: center;
	}
	.myorderNum{
		float: left;
		line-height: 124px;
		width: 135px;
		text-align: center;
	}
	.status{
		float: left;
		line-height: 124px;
		width: 140px;
		text-align: center;
	}
	.operation{
		float: right;
	}
	.operation div{
		width: 78px;
		height: 28px;
		line-height: 28px;
		border-radius: 5px;
		-moz-border-radius: 5px;
		-webkit-border-radius: 5px;
		text-align: center;
		cursor: pointer;
	}
	.myorderDetail{
		background: #FC7988;
		color: #fff;
		margin-top: 30px;
		
	}
	.successPay{
		background: #FC7988;
		color: #fff;
		margin-top:15px;
	}
	.cancelOrder{
		border:1px solid #000;
		margin-top:15px;
	}
	.warpMyorder{
		border-top: 10px solid #FDE5E8;
	}
	.page{
		margin:0 auto;
	}
	/*支付弹出框*/
	.paymentBox{
		width: 340px;
		height: 330px;
		position: absolute;
		left: 50%;
		top: 50%;
		margin:-165px 0 0 -170px;
		background: #fff;
		z-index: 20;
		text-align: center;
		border-radius: 5px;
		-webkit-border-radius:5px;
		-moz-border-radius:5px;
		box-shadow: 0 0 1px #000000;		
	}
	.payTitle{
		
		text-align: center;
		color: #000;
		font-size: 20px;
		margin:30px 40px;
		
	}
	.close1{
		float: right;
		background: url(../assets/image/guanbi.png) no-repeat 0 0;
		width: 12px;
		height: 12px;
		cursor: pointer;
		margin-top: 6px;
	}
	.payBtn{
		width: 150px;
		height: 36px;
		line-height: 36px;
		text-align: center;
		color: #fff;
		background: #FC7988;
		font-size: 18px;
		border-radius: 5px;
		-moz-border-radius: 5px;
		-webkit-border-radius: 5px;
		margin:0 auto;
		cursor: pointer;
	}
	.paypass input{
		border-radius: 5px;
		-moz-border-radius: 5px;
		-webkit-border-radius: 5px;
		width: 240px;
		line-height: 40px;
		height: 40px;
		border: 1px solid #D5D5D5;
		text-align: center;
	}
	.paypass{
		margin:55px 0;
	}
	.pay{
		margin-top: 20px;
	}
</style>