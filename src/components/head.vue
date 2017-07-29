<template>
	<div id="head">
		<div class="title clear">

			<div class="logo"><img src="../assets/image/logo.png" alt=""></div>
			<div class="shopName" @click="order()">红宝石商城</div>
			<div class="topright">
				<span @click='daili()' class="daili" v-show="isDaili">我的代理</span>
				<span class="userName"><em></em>{{userName}}</span>
				<!--<span class='phone'>手机版
              
          </span>-->
				<span><em>XIMI币：</em><em>{{fencount}}</em></span>
				<span class="us" @click='myorder()'>我的操作交易记录            
             </span>
				<span class="talk ">客服电话：400-820-5678</span>
			</div>
		</div>
		<div>
			<el-row>
				<el-col :span="24">
					<el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
						<el-submenu index="1">
							<template slot="title">系统</template>
							<el-menu-item index="1-1">修改密码</el-menu-item>
							<el-menu-item index="1-2">系统公告</el-menu-item>
							<el-menu-item index="1-3">帮助中心</el-menu-item>
							<el-menu-item index="1-4">退出系统</el-menu-item>
						</el-submenu>
						<el-menu-item index="2">K线窗口</el-menu-item>
						<!-- <el-menu-item index="3">账户报表</el-menu-item> -->
						<el-submenu index="3">
							<template slot="title">交易设置</template>
							<el-menu-item index="3-1">下单设置</el-menu-item>
							<el-menu-item index="3-2">{{wordpass}}</el-menu-item>
						</el-submenu>
						<!-- <el-menu-item index="4">资金管理</el-menu-item> -->
						<el-submenu index="4">
							<template slot="title">资金管理</template>
							<el-menu-item index="4-1">入金</el-menu-item>
							<el-menu-item index="4-2">出金</el-menu-item>
							<el-menu-item index="4-3">明细</el-menu-item>
							<el-menu-item index="4-4">充值XIMI币</el-menu-item>
						</el-submenu>
						<!--<el-menu-item index="5">账户报表</el-menu-item>-->
					</el-menu>
				</el-col>
			</el-row>
		</div>
		<!-- 修改密码弹出层 -->
		<div class="mask" v-show="mask"></div>
		<div class="tang" v-show="closeTag">
			<div class="clear tangTitle"><span>修改密码</span><em class="close" @click="tagClose()"></em></div>
			<el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" class="clear">
				<el-form-item label="旧密码">
					<el-input v-model="formLabelAlign.old" type="password"></el-input>
				</el-form-item>
				<el-form-item label="新密码">
					<el-input v-model="formLabelAlign.pass" type="password"></el-input>
				</el-form-item>
				<el-form-item label="新密码确认">
					<el-input v-model="formLabelAlign.repass" type="password"></el-input>
				</el-form-item>
				<div class="formword">{{formword}}</div>
				<el-button style="float:right;" v-show="closeTag" @click="passSure()" :plain="true" type="danger">确认</el-button>
			</el-form>
		</div>
		<!-- 消息列表 -->
		<div class="news" v-show="closeNews">
			<div class="clear tangTitle"><span style="margin-left:20px;" class="fn-left">消息列表</span><em class="close" @click="newsClose()"></em></div>
			<div class="newsList">
				<el-table :data="tableData" border style="width: 100%">
					<el-table-column prop="number" label="序号" width="80">
					</el-table-column>
					<el-table-column prop="title" label="标题" width="180">
					</el-table-column>
					<el-table-column prop="date" label="发布时间" width="150">
					</el-table-column>
					<el-table-column prop="name" label="发布人" width="80">
					</el-table-column>
					<el-table-column prop="address" label="已读">
					</el-table-column>
				</el-table>
			</div>
			<el-button class='fn-right newsBtnclose' @click="newsBtnclose()" :plain="true" type="danger">关闭</el-button>
			<el-button class='fn-right' :plain="true" type="danger">更新列表</el-button>
		</div>
		<!-- 交易设置弹框 -->
		<div class="set" v-show="closeSet">
			<div class="clear tangTitle"><span style="margin-left:20px;" class="fn-left">交易设置</span><em class="close" @click="setClose()"></em></div>
			<div>
				<el-checkbox-group v-model="checkList">
					<el-checkbox label="0">下单时弹出确认提示框</el-checkbox>
					<!-- <el-checkbox label="1">双击持仓单平仓</el-checkbox> -->
				</el-checkbox-group>
				<el-button class="setSure setBtn" @click="setSure()" :plain="true" type="danger">确定</el-button>
				<el-button class="setBtnClose setBtn" @click="setBtnClose()" :plain="true" type="danger">取消</el-button>

			</div>
		</div>
		<!-- 消息提示框 -->
		<div class="prompt" v-show="prompt">{{promptword}}</div>
		<!-- 账户明细 -->
		<div class="maskwrite" v-show="isdetail"></div>

		<div class="detail" v-show="isdetail">
			<div class="detailTitle clear"><em class="close" @click="detailClose()"></em></div>
			<el-table :data="tableData3" height="500" border style="width: 800px">
				<el-table-column prop="date" label="转账时间" width="180">
				</el-table-column>
				<el-table-column prop="money" label="转账金额" width="150">
				</el-table-column>
				<el-table-column prop="type" label="转账类型" width='100'>
				</el-table-column>
				<el-table-column prop="card" label="银行" width='180'>
				</el-table-column>
				<el-table-column prop="supMoney" label="可用余额">
				</el-table-column>
			</el-table>
		</div>
		<!-- 退出系统 -->
		<div class="back" v-show="back">
			<div class="backtitle">系统提示</div>
			<div class="backword">确认退出本系统吗</div>
			<el-button class="setSure setBtn" @click="backBtnSure()" :plain="true" type="danger">是（Y）</el-button>
			<el-button class="setBtnClose setBtn" @click="backBtnClose()" :plain="true" type="danger">否（N）</el-button>
		</div>
		<!-- 公告提示消息 -->
		<div class="mask" v-show="noticemask"></div>
		<div class="getNotice clear" v-show="noticemask">
			<h2 class="notice">{{noticeTitle}} <span class='close' @click='noticeBack'></span></h2>
			<div class="iframe">
				<iframe :src="ifremeUrl" frameborder="0" width="100%" height="100%"></iframe>
			</div>
			<div class="agree">
				<el-checkbox v-model="noticeChecked">下次不再提示</el-checkbox>
				<el-button @click="noticeBtn">确定</el-button>
			</div>
			
		</div>
	</div>
</template>
<script>
	export default {
		name: 'head',
		data() {
			return {
				activeIndex2: '1',
				labelPosition: 'right',
				formLabelAlign: {
					old: '',
					pass: '',
					repass: ''
				},
				checkList: ['0'],
				mask: false,
				closeTag: false, //修改密码弹框 
				closeNews: false, //关闭消息列表
				closeSet: false, //下单设置
				formword: '', //修改密码消息提示
				promptword: '',
				isdetail: false, //账户明细显示
				tableData: [{
					number: '',
					title: "",
					date: ' ',
					name: '',
					address: ''
				}],
				type: '',
				prompt: false, //消息提示判断
				tableData3: [{
						date: '',
						money: '',
						type: '',
						card: '',
						supMoney: '',
					},

				],
				back: false, //退出系统
				userName: '',
				ispasscode:'',//
				wordpass:'',
				fencount:'',
				noticeTitle:'',
				ifremeUrl:'',
				noticeChecked:true,
				noticemask:true,
				isDaili:false,
			}
		},
		mounted: function() {
			this.getNoticeApp()
			this.checkboxtype()
			this.ispass()
			//window.fen = this.fen
			this.getWalletByUser()
		},
		methods: {
			getWalletByUser(){
				var that=this
				console.log(objAgency)
				if(objAgency==120){
					that.isDaili=true;
				}else{
					that.isDaili=false;
				}
				
					ajax({
					type:"post",
						url: http + "wallet/appGetWalletByUser",
						//async:true,
						//contentType:"application/json;charset=utf-8",
						//dataType:'json',
						data: JSON.stringify({
							"sessionKey":sessionKey
						}),
						success:function(res){
							var res=JSON.parse(res);
							if(res.code==200){
								that.fencount=res.obj.shopMoney
							}	
						}
					})

					var notice1=localStorage.getItem('noticeChecked')
					console.log(notice1)
					if(notice1=='true'){
						console.log(9999)
							that.noticemask=false;
					}else{
						that.noticemask=true;
					}

			
			},
			checkboxtype() {
				this.userName = userName
				$('.us').on('mouseover', function() {
					$('.myOrder').show();
					//console.log(222)
					$('.myOrder').on('mouseout', function() {
						// console.log(666)
						$('.myOrder').hide()
					})
				})
				//			$('.us').on('mouseout',function(){
				//				$('.myOrder').hide()
				//			})

				if(localStorage.getItem('checkList') == null) {
					this.checkList = ['0'];

				} else {
					if(localStorage.getItem('checkList') == '0') {

						this.checkList = ['0']
					} else if(localStorage.getItem('checkList') == 1) {
						this.checkList = ['1']
					} else if(localStorage.getItem('checkList').length === 0) {

						this.checkList = []
					} else {
						this.checkList = ['0', '1']

					}

				}
			},
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
				if(key == '1-1') {
					this.mask = true
					this.closeTag = true
				} else if(key == '1-2') {
					          //this.mask=true  
					           //this.closeNews=true
					  this.$router.push({path: '/news'})
				} else if(key == '1-4') {
					this.back = true;
					this.mask = true;

				} else if(key == '2') {
					console.log(222)
					if(window.isopen != 111) {
						open(url + 'xiaoshanPC/kline/index.html?id=' + window.shopId, '介绍', 'width=800,height=800,left=150,top=150,resizable=no,scrollbars=no,status=yes,toolbar=no,location=no,menubar=no,menu=yes')
					}

				} else if(key == '3-1') {
					this.mask = true
					this.closeSet = true
				} else if(key =='3-2'){
					if(this.ispasscode==200){
						this.$router.push({path: '/repass'})															
					}else if(this.ispasscode==304){
						this.$router.push({path: '/pass'})	
					}
				}
				else if(key == '4-1') {
					location.href = url + 'xs-recharge.html'
				} else if(key == '4-2') {
					location.href = url + 'xs-recharge.html'
				} else if(key == '4-3') {
						this.$router.push({path: '/capital'})
					//this.isdetail = true;
					//this.moneyDetail();
				}else if(key == '4-4') {
					this.$router.push({path: '/point'})					
				}

			},
			tagClose() { //修改密码关闭按钮
				this.mask = false
				this.closeTag = false

			},
			passSure() { //修改密码确定按钮
					var that=this;
				if(that.formLabelAlign.old == '') {
					//this.prompt=true;
					that.formword = '请输入旧密码'

					return
				} else if(this.formLabelAlign.pass == '') {
					that.formword = '请输入新密码'
					return
				} else if(this.formLabelAlign.repass == '') {
					that.formword = '请输入确认密码'
					return
				} else if(this.formLabelAlign.pass != this.formLabelAlign.repass) {
					that.formword = '两次密码不一致'

					return
				} else {
					//console.log(this.formLabelAlign.old, this.formLabelAlign.pass, this.formLabelAlign.repass)


					ajax({
					type: "post",
					url: http + "wallet/getUserWalletRecord",
					data: JSON.stringify({
						"pwd": that.formLabelAlign.old,
						"newPwd1": that.formLabelAlign.pass,
						"newPwd2": that.formLabelAlign.repass
					}),
					success: function(res) {

						var res = JSON.parse(res);

						if(res.code == 200) {
							that.mask = false
							that.closeTag = false
							// this.prompt=true;
							// this.promptword='密码修改成功'
							// setTimeout(()=>{

							// this.prompt=false
							// },2000) 
							that.$message({
								message: '修改密码成功',
								type: 'success'
							});

						}
					}
					})					
				}

			},
			newsClose() { //消息列表关闭按钮
				this.mask = false
				this.closeNews = false
			},
			newsBtnclose() { //消息列表关闭按钮
				this.mask = false
				this.closeNews = false
			},
			setClose() { //下单设置关闭按钮
				this.mask = false
				this.closeSet = false
			},
			setSure() { //下单设置确定按钮
				this.mask = false
				this.closeSet = false;
				// console.log(this.checkList)
				localStorage.setItem('checkList', this.checkList);

			},
			setBtnClose() { //下单取消按钮
				this.mask = false
				this.closeSet = false
			},
			detailClose() { //账户明细关闭按钮
				this.isdetail = false;
			},
			moneyDetail() {
				
				var that = this;
				ajax({
					type: "post",
					url: http + "wallet/getUserWalletRecord",
					data: JSON.stringify({
						"sessionKey": sessionKey,
						'currentPage': 1,
						'pageSize': 100000,
					}),
					success: function(res) {
						var obj = JSON.parse(res);
						//console.log(obj)
						var resultList = obj.resultList;
						var freeArray = [];
						
						//console.log(resultList)

						if(resultList.length != 0) {
							for(let i = 0; i < resultList.length; i++) {
								var obj = {};

								var newDate = new Date();
								var createTime = resultList[i].createTime
								newDate.setTime(createTime);

								obj.date = newDate.format('yyyy-MM-dd hh:mm:ss');
								// console.log( obj.date)
								obj.money = resultList[i].money;
								//0,(充值)/1,(扣费)/2,(提现)/3,(当日结算)
								if(resultList[i].type == 0) {
									obj.type = "充值"
								} else if(resultList[i].type == 1) {
									obj.type = "扣费"
								} else if(resultList[i].type == 2) {
									obj.type = "提现"
								} else if(resultList[i].type == 3){
									obj.type = '返佣'
								}else{
									obj.type = '提佣'
								}

								obj.card = resultList[i].bankCard;
								obj.supMoney = resultList[i].supMoney;
								freeArray[i] = obj;
							}
							that.tableData3 = freeArray
						}

					}
				})
			},
			backBtnSure() { //退出系统确定按钮
				this.back = false;
				this.mask = false;
				var that=this;
					ajax({
					type: "post",
					url: http + "user/exit",
					data: JSON.stringify({
						
					}),
					success: function(res) {
						var res = JSON.parse(res);
								if(res.code == 200) {
						location.href = url + "xs_login.html"
					}
					}
				})
				

			},
			backBtnClose() { //退出系统取消按钮
				this.back = false;
				this.mask = false;
			},
			order() {
				this.$router.push({
					path: '/shop'
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
						//console.log(res)
						that.ispasscode=obj.code;
						console.log(that.ispasscode)
						if(that.ispasscode==200){
							that.wordpass='修改支付密码'
						}else if(that.ispasscode==304){
							that.wordpass='支付密码设置'
						}else if(that.ispasscode==101){
							location.href = url + "xs_login.html"
						}
					}
					})
			},
			myorder(){
   				this.$router.push({path:'/barg'})
   			},
			
			 daili(){
          	location.href=url+'xs-userList.html'
       		 },
       		 getNoticeApp(){
       		 	var that=this;
       		 	ajax({
					type: "post",
					url: http + "news/getNoticeApp",
					data: JSON.stringify({
						"sessionKey": sessionKey,						
					}),
					success: function(res) {
						var obj=JSON.parse(res).obj;
						//console.log(obj)

						that.noticeTitle=obj.title;
						that.ifremeUrl=obj.url;
						
					}
				})
       		 },
       		 noticeBack(){
       		 	location.href = url + "xs_login.html"
       		 },
       		 noticeBtn(){
       		 	//noticeChecked:true,
				this.noticemask=false;
				localStorage.setItem('noticeChecked',this.noticeChecked)
       		 }
		},

	}
	// this.$http.post(http+'stock/getUserStockTable',{
	//          'sessionKey':sessionKey,
	//          'currentPage':1,
	//          'pageSize':10000000,
	//        }
	//        ).then(res => {

	//          },res =>{
	//            console.log("error");
	//          })
</script>
<style scoped>
	.clear:after {
		content: '.';
		display: block;
		height: 0;
		clear: both;
		visibility: hidden;
	}
	
	.clear {
		zoom: 1;
	}
	/* 头部 */
	
	.title {
		width: 100%;
		line-height: 90px;
		color: #fff;
		font-size: 14px;
	}
	
	.logo {
		float: left;
	}
	
	.shopName {
		float: left;
		color: #fc7988;
		font-size: 18px;
		margin-left: 50px;
		cursor: pointer;
	}
	
	.el-menu {
		background: url(../assets/image/headbg.png) no-repeat 0 0;
		background-size: 100% 100%;
	}
	/*弹出层*/
	
	.tang {
		position: fixed;
		width: 350px;
		height: 300px;
		padding: 10px 20px;
		left: 50%;
		top: 50%;
		margin: -150px 0 0 -175px;
		background: #d3dce6;
		z-index: 20;
		border-radius: 5px;
	}
	
	.tangTitle {
		line-height: 32px;
		margin-bottom: 20px;
	}
	/*消息弹出层*/
	
	.news {
		background: #d3dce6;
		position: fixed;
		width: 650px;
		height: 500px;
		left: 50%;
		top: 50%;
		margin: -250px 0 0 -325px;
		z-index: 20;
		border-radius: 5px;
		padding: 10px;
	}
	
	.newsList {
		height: 400px;
		overflow: auto;
	}
	
	.newsBtnclose {
		margin: 0 20px;
	}
	
	.set {
		position: fixed;
		left: 50%;
		top: 50%;
		width: 200px;
		height: 200px;
		background: #d3dce6;
		border-radius: 5px;
		z-index: 20;
		padding: 10px 20px;
		margin: -100px 0 0 -100px;
	}
	
	.el-checkbox {}
	
	.el-checkbox+.el-checkbox {
		margin-left: 0;
		margin-top: 10px;
	}
	
	.setBtn {
		margin-top: 30px;
	}
	
	.setSure {
		margin: 0 20px 0 20px;
	}
	
	.el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active,
	.el-menu-item.is-active {
		color: #333;
	}
	
	.el-menu-item,
	.el-submenu__title {}
	
	.el-menu--horizontal>.el-submenu:hover .el-submenu_title {
		border-bottom: 5px solid #fc7988;
	}
	
	.prompt {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 50px;
		background: #FB808E;
		line-height: 50px;
		z-index: 20;
		text-align: center;
	}
	
	.formword {
		text-align: center;
		color: #f00;
	}
	/*账户明细弹窗*/
	
	.detail {
		position: absolute;
		top: 100px;
		left: 50%;
		margin-left: -400px;
		z-index: 30;
		overflow: hidden;
		background: #fff;
		border-radius: 5px;
	}
	
	.detailTitle {
		padding: 5px 10px;
	}
	/*退出系统*/
	
	.back {
		padding: 20px;
		background: #fff;
		width: 250px;
		height: 170px;
		border-radius: 5px;
		-webkit-border-radius: 5px;
		-moz-border-radius: 5px;
		box-shadow: 0px 0px 1px #f00;
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: 20;
		margin:-85px 0 0 -125px;
	}
	
	.backtitle {
		font-size: 18px;
	}
	
	.backword {
		text-align: center;
		margin: 40px 0 10px;
	}
	/*头部*/
	
	.topright {
		float: right;
		color: #2c2c2c;
	}
	
	.topright span {
		margin-right: 20px;
	}
	
	.us {
		position: relative;
		cursor: pointer;
	}
	
	.myOrder {
		width: 130px;
		height: 60px;
		position: absolute;
		top: 40px;
		left: -30px;
		display: none;
		z-index: 20;
		background: #fff;
		/*background:*/
		border-radius: 5px;
	}
	
	.san {
		width: 0;
		height: 0;
		border: 10px solid transparent;
		border-bottom-color: #fff;
		position: absolute;
		top: -20px;
		left: 30px;
	}
	
	.myOrder ul {}
	
	.myOrder li {
		cursor: pointer;
		line-height: 30px;
		height: 30px;
		padding: 0 10px;
	}
	
	.myOrder li:hover {
		cursor: pointer;
		line-height: 30px;
		height: 30px;
		background: #f1f1f1;
	}
	
	.myOrder li:nth-child(1) {
		border-bottom: 1px solid #f1f1f1;
	}
	
	.usOrder {
		cursor: pointer;
	}
	.daili{
		cursor: pointer;
	}
	.getNotice{
		width: 800px;
		height: 600px;
		position: fixed;
		left: 50%;
		top: 50%;
		margin:-300px 0 0 -400px;
		z-index: 20;
		background: #fff;
		border-radius: 5px;
		-webkit-border-radius: 5px;
		-moz-border-radius: 5px;
	}
	.agree{
		float: right;
		margin-right: 20px;
		margin-top:20px;
	}
	.notice{
		font-size: 20px;
		margin:10px;
		text-align: center;
	}
	.iframe{
		height: 460px;
		overflow: auto;
		padding:0 10px;

	}
</style>