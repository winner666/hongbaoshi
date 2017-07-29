<template>
	<div class="payWarp">
		<v-header></v-header>
		<div class="payBox">
			<div class="width clear">
				<div class="payleft">我的订单</div>
				<div class="payRight">
					<div class="">
						<span class="light">我的订单></span>
						<span>订单详情</span>
					</div>
					<div class="paymentWarp clear" >
						<div class="inforLeft">
							<div class="inforTitle">订单信息</div>
							<div class="inforWard">
								<span>收货地址：{{shoppayList.address.province}}{{shoppayList.address.city}}{{shoppayList.address.county}}{{shoppayList.address.address}}</span>
								
							</div>
							<div class="inforWard">
								<span>订单编号：</span>
								<span>{{shoppayList.orderId}}</span>
								
							</div>
							<div class="inforWard">
								<span>下单时间：</span>
								<span>{{time}}</span>
							</div>
							<div class="inforWard">
								<span>联系方式：</span>
								<span>{{shoppayList.address.mobile}}</span>
							</div>
							<div class="inforWard">
								<span>姓名：</span>
								<span>{{shoppayList.address.name}}</span>
							</div>
						</div>
						<div class="inforRight" v-if='shoppayList.state==0'>
							<div class="inforStatus">
								<span>订单状态：</span>
								<span>待付款</span>
							</div>
							<div >
								<span class="inforSuccess" @click="secpay(shoppayList.orderId)">完成支付</span>
								
							</div>
							
						</div>
						<div class="inforRight" v-if='shoppayList.state==1'>
							<div class="inforStatus">
								<span>订单状态：</span>
								<span>待收款</span>
							</div>							
						</div>
						<div class="inforRight" v-if='shoppayList.state==2'>
							<div class="inforStatus">
								<span>订单状态：</span>
								<span>已完成</span>
							</div>							
						</div>
						
					</div>
					<div class="order_down">
					<div class="myorderList clear">
						<div class="myorderImg">
							<img :src="shoppayList.imgsrc"/>
						</div>
						<div class="myorderName"></div>
						<div class="score">{{shoppayList.money}}</div>
						<div class="myorderNum">{{shoppayList.num}}</div>
						<div class="status" v-if='shoppayList.state==0'>待付款</div>
						<div class="status" v-else-if='shoppayList.state==1'>待收款</div>
						<div class="status" v-else-if='shoppayList.state==2'>已完成</div>
						<!--<div class="operation">
							<div class="myorderDetail" @click="paymentDetail">订单详情</div>
							<div class="successPay">完成支付</div>
							<div class="cancelOrder">取消订单</div>
						</div>-->
					</div>
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
		name:'payWarp',
		data(){
			return{
				time:'',
				addressDetail:'',
				ordermasknum:'',
				seller:'',//商家名称
				shoppayList:'',
				imgsrc:'',
				payordermask:false,
			 	totleNum:'',
			 	orderpayId:'',
				passfu:'',
				ispasscode:''
				
			}
		},
		components:{
			'v-header':header,
			'v-footer':footer,
			
		},
		mounted:function(){
			this.paymentDetail();
		},
		updated:function(){
			
			var that=this;
					
			
		},
		methods:{
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
						console.log(res)
						that.ispasscode=obj.code;
						
					}
					})
			},
			paymentDetail(){
				
							
								var that=this;
								
							 ajax({
								type:"post",
									url: http + "goodsOrder/getGoodsOrderById",					
									data: JSON.stringify({
										"orderId":parseInt(that.$route.query.orderId),sessionKey,
										 "sessionKey":sessionKey,										
									}),
									success:function(res){										
										var data=JSON.parse(res);
									console.log(data)
										if(data!=null){
											 that.shoppayList=data.obj
											 
					         			     var newDate=new Date();
					         			   
						                    var createTime= that.shoppayList.createTime;
						                  
						                   newDate.setTime(createTime);
						               		that.totleNum=that.shoppayList.money;
						                    that.time=newDate.format('yyyy-MM-dd hh:mm:ss');
						                   	if(that.shoppayList.goods.goodsImgs.length && Array.isArray(that.shoppayList.goods.goodsImgs)){
						                   		that.shoppayList.imgsrc = that.shoppayList.goods.goodsImgs[0].src;
						                   		
						                   	}

						                   // console.log(that.time)
										}				         			 					                   					         			  
									}
				             
				           		})
						},	
						secpay(index){//点击完成支付
							this.orderpayId=index;
							this.payordermask=true;
							this.passfu='';
							this.ispass();
						},
						payorderClose(){
							this.payordermask=false;
						},
						payorderBtn(){//点击完成确定按钮
							var that=this;
							
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
				 							"PayPwd":that.passfu
										}),
										success:function(res){
											var obj=JSON.parse(res);
										
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
//						cancelOrder(k,n){
//							
//							var that=this;
//							ajax({
//								type:"post",
//									url: http + "goodsOrder/editGoodsOrder",					
//									data: JSON.stringify({
//										"orderId":k,
//										 "state":n
//										
//									}),
//									success:function(res){
//										var data=JSON.parse(res);
//										//console.log(res)
//										if(data.code==200){
//											that.$message({
//									          message: '恭喜你，删除成功',
//									          type: 'success'
//									        });
//											that.$router.push({path: '/myorder'})	
//										}
//									}
//								})
//			}
					}
	}
</script>

<style scoped="scoped">
	.payBox{
		border-top: 10px solid #FDE5E8;
		padding-top: 20px;
		margin-bottom: 100px;
		
	}
	.payleft{
		float: left;
		color: #FC7988;
		padding-right:5px ;
	}
	.payRight{
		float:right;
		border-left: 1px solid #D5D5D5;
		padding: 0 28PX;
		width: 1000px;
		min-height: 936px;
	}
	.light{
		color: #7f7f7f;
	}
	.paymentWarp{
		border:1px solid #D5D5D5;
		margin-top: 20px;
		height: 370px;
	}
	.inforLeft{
		float: left;
		width: 348px;
		border-right:1px solid #D5D5D5 ;
		height: 370px;
	}
	.inforTitle{
		line-height: 45px;
		font-size: 20px;
		text-indent: 8px;
		border-bottom: 1px solid #D5D5D5;
	}
	.inforWard{
		color: #8C8C8C;
		margin-top:10px;
		text-indent: 8px;
	}
	.inforRight{
		float: right;
		width: 640px;
		margin: 0 auto;
	}
	.inforStatus{
		margin-top:100px;
		text-align: center;
		font-size: 18px;
		
	}
	.inforSuccess{
		background: #FC7988;
		color: #fff;
		width: 100px;
		line-height: 32px;
		text-align: center;
		margin:30px 250px;
		display: inline-block;
		border-radius: 5px;
		-webkit-border-radius: 5px;
		-moz-border-radius: 5px;
		cursor: pointer;
	}
	.inforcancel{
		width: 100px;
		line-height: 32px;
		text-align: center;
		margin: 0 auto;
		display: inline-block;
		border:1px solid #000000;
		border-radius: 5px;
		-webkit-border-radius: 5px;
		-moz-border-radius: 5px;
		cursor: pointer;
		
	}
	/**/
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
		
	}
	.successPay{
		background: #FC7988;
		color: #fff;
		margin:15px 0;
	}
	.cancelOrder{
		border:1px solid #000;
	}
	.warpMyorder{
		border-top: 10px solid #FDE5E8;
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
		width: 240px;
		line-height: 40px;
		height: 40px;
		border: 1px solid #D5D5D5;
		border-radius: 5px;
		-moz-border-radius: 5px;
		-webkit-border-radius: 5px;
		text-align: center;
	}
	.paypass{
		margin:55px 0;
	}
	.pay{
		margin-top: 20px;
	}
</style>