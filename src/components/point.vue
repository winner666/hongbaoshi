<template>
	<!--头部-->
	<div class="pass">
		<div class="passHead clear">
			<div class="img" @click='indexback'><img src="../assets/image/logo1.png" alt="" /></div>
			<span class="setWord">充值XIMI币</span>
		</div>
			<div class="passBox">
						
			<div class="width">
					<div class="xs-register-box ctr">
			<div class="xs-sub-title">充值XIMI币</div>
			<div class="xs-register-box-account">
				<div class="xs-hint-box cf">
					<span class="xs-registerImg-word fl">可用资金：<em class="star">*</em></span>
				
						<span class="count fr">{{supMoney}}</span>
					
				</div>
				<div class="xs-hint-box cf">
					<span class="xs-registerImg-word fl">充值XIMI币<em class="star">*</em></span>
					<div class="xs-registerImg-box fr">
						<input type="text" class="fr" id="" placeholder="请输入充值金额" v-model='pass1'/>
					</div>
				</div>
				<div class="xs-hint-box cf">
					<span class="xs-registerImg-word fl">请输入密码：<em class="star">*</em></span>
					<div class="xs-registerImg-box fr">
						<input type="password" class="fr" id="" placeholder="请输入密码" v-model='repass1'/>
					</div>
				</div>
				<div class="cf">
					<div class="fr" style="width: 222px;"><button type="button" class="xs-member-btn xs-registerBtn passBtn" @click='passBtn'>确定</button></div>
				</div>
			</div>
		</div>
			</div>	
			</div>
	</div>
		
</template>

<script>
	
	export default {
		name: 'pass',
		data() {
			return {
					pass1:'',
					repass1:'',
					supMoney:'',
					ispasscode:''
			}
		},
		components:{
					
		},
		mounted: function() {
			this.getWalletByUser();
			this.ispass()
		},
		methods: {
			getWalletByUser(){
				var that=this;

					ajax({//
						type:"post",
							url: http + "wallet/appGetWalletByUser",					
							data: JSON.stringify({
								"sessionKey":sessionKey,
								
							}),
							success:function(res){
									var res=JSON.parse(res);
									if(res.code==200){
											that.supMoney=res.obj.supMoney
									}
							}
						})

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
						
						that.ispasscode=obj.code;
						
					}
					})
			},
			passBtn(){
				var that=this;
				
				var reg = new RegExp(/^\d{6}$/);
				
				if(that.ispasscode==200){
						if(that.pass1==''){
						 that.$message({
				          message: '请输入充值XIMI币',
				          type: 'warning'
	       			 	});
	       			 return 
					}else if(that.repass1==''){
						that.$message({
				          message: '请输入密码',
				          type: 'warning'
	       			 	});
	       			 	return
					}else if(!reg.test(that.repass1)){
						that.$message({
				          message: '密码请输入6位数字',
				          type: 'warning'
	       			 	});
	       			 	return
					}else{
						
						ajax({//设置密码
						type:"post",
							url: http + "wallet/rechargePoints",					
							data: JSON.stringify({
								"sessionKey":sessionKey,
								"shopMoney":parseInt(that.pass1),
								"payPwd":parseInt(that.repass1)
							}),
							success:function(res){
								//console.log(res)
								var obj=JSON.parse(res);
							
								if(obj.code==200){
									 that.$alert('充值成功', '', {
							          confirmButtonText: '确定',
							          callback: action => {
							            that.$router.push({path:'/shop'})
							          }
							        });
								}else if(obj.code==202){
									that.$alert('余额不足，请先进行充值', '', {
							          confirmButtonText: '确定',
							          callback: action => {
							            location.href = url + 'xs-recharge.html'
							          }
							        });
								}else if(obj.code==203){
									that.$alert('支付密码错误', '', {
							          confirmButtonText: '确定',
							          callback: action => {
							           	
							          }
							        });
								}else if(obj.code==204){
									that.$alert('请先设置密码', '', {
							          confirmButtonText: '确定',
							          callback: action => {
							          that.$router.push({path:'/pass'})  
							          }
							        });
								}
								  
							}
					
						})
					}
				}else{
								that.$alert('请先设置密码', '', {
							          confirmButtonText: '确定',
							          callback: action => {
							          //that.$router.push({path:'/pass'})  
							          }
							        });
					 
				}
				
				
			},
			indexBack(){
				this.$router.push({path: '/one'})	
			}
		}
	}
</script>

<style scoped="scoped">
	.count{
		width: 202px;
		text-align: center;
		margin-bottom: 20px;
	}
	.passBtn{
		outline: none;
		cursor: pointer;
	}
.pass{
	width: 100%;
	height: 100%;
}
.passHead{
	width: 1130px;
	margin: 10px auto;
}
.passHead .img{
	float: left;
}
.setWord{
	float: left;
	margin-left: 1px solid #ccc;
	line-height: 80px;
	    height: 58px;
    margin-top: 11px;
    line-height: 58px;
    margin-left: 52px;
    padding-left: 30px;
    border-left: 1px solid #e6e6e6;
    font-size: 24px;
    color: #999;	
}
.passBox{
	    border-bottom: 6px solid #fde5e8;
}
.fl{float: left;}
			.fr{float: right;}
			.cf{clear: both;}
			
			.star{color: #ff4f4f;}
			/*全局样式结束*/
			.ctr{margin: auto;overflow: hidden;}
			.xs-register-box{border: 1px solid #fc7988;width: 448px;height: 398px;margin-top: 3px;
			position: absolute;z-index: 25;left: 50%;top: 50%;margin-left: -224px;margin-top: -199px;}
			.xs-sub-title{height: 40px;color: #FC7988;background: #fff1f3;padding-left: 24px;line-height: 40px;}
			.xs-register-box-account{width: 355px; overflow: hidden; padding-top: 40px;padding-left: 40px;}
			.xs-registerImg-word{height: 36px;line-height: 36px;display: block;color: #333;}
			.xs-registerImg-box{width: 202px;padding-left: 10px; height: 36px;border: 1px solid #ccc;border-radius: 6px;
			margin-right: 5px;margin-bottom: 30px;}
			.xs-registerImg-box input{width: 202px;height:36px;}
			.actmar{margin-bottom: 10px;}
			/*注册按钮*/
			.xs-member-btn{width: 80px;margin-top: 30px;background: #fc7988;color: #fff;height: 36px;border: 0;
			border-radius: 6px;}
</style>