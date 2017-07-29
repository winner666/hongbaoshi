<template>
	<div class="countryBox clear">
		<ul class="country">
			<li  @click='shop()' v-bind:class="{ 'light' : isA,}">全部商品</li>
			<li @click="self()" v-bind:class="{ 'light' : isB,}" v-show='selectshow'>自选</li>
			
		</ul>
		<div class="block">
			<table>
				<thead class="thead">
					<tr>
						<th>商品名称</th>
						<th>最新价</th>
						<th>涨跌</th>
						<th>涨跌幅</th>
						<th>买价</th>
						<th>卖价</th>						
						<th>最高价</th>
						<th>最低价</th>
						<th>昨收价</th>
						<th>现量</th>
						<th>买量</th>
						<th>卖量</th>
						<th>开盘价</th>
						<th>量比</th>
						<th>委比</th>
						<th>换手率</th>
						<th>成交量</th>
						<th>成交金额</th>
						<th>库存量</th>
																		
					</tr>
				</thead>
				<tbody class="tbodyList">
					<tr    v-for="(item,index) in lists" @click="listItem(item,index)" ref="listStyle" :class="{'listActive':ind===index}"
				 @dblclick="listItemTwo(item,index)" v-on:isopen="openw()" @contextmenu.prevent="context(item,index)" >
						<td class="shopName">{{item.name}}</td>
						<td class="newPrice" :class="{'isnewred':item.now>item.opens,'isnewgreen':item.now<item.opens}">{{item.now}}</td>

						<td class="uoDown" :class="{'isnewred':item.now>item.opens,'isnewgreen':item.now<item.opens}">{{item.rise}}</td><!-- 涨跌 -->
						<td class="riseRange" :class="{'isnewred':item.now>item.opens,'isnewgreen':item.now<item.opens}">{{item.riseRange}}</td><!-- 涨跌幅 -->
						<td class="buyprice" :class="{'isnewred':item.now>item.opens,'isnewgreen':item.now<item.opens}">{{item.buyAmount}}</td>
						<td class="sellprice" :class="{'isnewred':item.now>item.opens,'isnewgreen':item.now<item.opens}">{{item.sellAmount}}</td>
						<td class="highprice" :class="{'isnewred':item.now>item.opens,'isnewgreen':item.now<item.opens}">{{item.height}}</td>
						<td class="lowprice">{{item.low}}</td>
						<td class="yesp">{{item.rise}}</td>
						<td class="nowl">{{item.nowVol}}</td>
						<td class="buyl">{{item.buyVol}}</td>
					 	<td class="selll">{{item.sellVol}}</td>
					 	<td class="open">{{item.opens}}</td>
						<td class="lb">{{item.quantity}}</td>
						<td class="wl">{{item.entrust}}</td>
						<td class="hs">{{item.turnover}}</td>
						<td class="successL">{{item.volume}}</td>
						<td class="successp">{{item.amount}}</td>
						<td class="stock">{{item.nowTotal}}</td>
						
						 
					</tr>
				</tbody>									
			</table>
		</div>
		<el-row>
			<el-col :span="16">
				<div class="grid-content top">
					<el-tabs type="border-card" style="padding:0;">
						  <el-tab-pane label="当日成交" class="center" >
							  	<el-row class="th">
									  <el-col :span="3"><div class="grid-content">商品名称</div></el-col>
									  <el-col :span="2"><div class="grid-content">买卖</div></el-col>
									  <el-col :span="3"><div class="grid-content">成交价格</div></el-col>
									  <el-col :span="3"><div class="grid-content">数量</div></el-col>
									   <el-col :span="3"><div class="grid-content">手续费</div></el-col>
									   <el-col :span="3"><div class="grid-content">盈亏</div></el-col>
									    <el-col :span="4"><div class="grid-content">成交时间</div></el-col>
									   <el-col :span="3"><div class="grid-content">成交单号</div></el-col>									  									  
								</el-row>
								<div class="height1">
									<el-row v-for='(item1,index) in todayOverDealVos' :key='index'>
									  <el-col :span="3"><div class="grid-content">{{item1.name}}</div></el-col>
									   <el-col :span="2"><div class="grid-content" v-if="item1.type==0">买入</div></el-col>
										<el-col :span="2"><div class="grid-content" v-if="item1.type==1">卖出</div></el-col>
									  <el-col :span="3"><div class="grid-content">{{item1.amount}}</div></el-col>
									  <el-col :span="3"><div class="grid-content">{{item1.countVol}}</div></el-col>
									   <el-col :span="3"><div class="grid-content">{{item1.feeMoney}}</div></el-col>
									   <el-col :span="3"><div class="grid-content">{{item1.profit}}</div></el-col>
									   <el-col :span="4"><div class="grid-content">{{item1.createTime}}</div></el-col>
									   <el-col :span="3"><div class="grid-content">{{item1.dealSn}}</div></el-col>									  									  
								</el-row>
								</div>
						  </el-tab-pane>
						  <el-tab-pane label="当日委托" class="center" >
						  <el-row class="th">
									  <el-col :span="3"><div class="grid-content">商品名称</div></el-col>
									  <el-col :span="2"><div class="grid-content">买卖</div></el-col>
									  <el-col :span="3"><div class="grid-content">委托价格</div></el-col>
									  <el-col :span="3"><div class="grid-content">委托数量</div></el-col>
									   <el-col :span="3"><div class="grid-content">成交数量</div></el-col>
									   <el-col :span="4"><div class="grid-content">委托时间</div></el-col>
									    <el-col :span="3"><div class="grid-content">委托单号</div></el-col>
									   <el-col :span="3"><div class="grid-content">撤单</div></el-col>
									  
								</el-row>
						  		<div class="height1">
						  				<el-row v-for='(item,index) in unSettledDealVos' :key='index'>
								  			<el-col :span="3"><div class="grid-content">{{item.name}}</div></el-col>
											  <el-col :span="2"><div class="grid-content" v-if="item.type==0">买入</div></el-col>
											  <el-col :span="2"><div class="grid-content" v-if="item.type==1">卖出</div></el-col>
											  <el-col :span="3"><div class="grid-content">{{item.price}}</div></el-col>
											  <el-col :span="3"><div class="grid-content">{{item.total}}</div></el-col>
											   <el-col :span="3"><div class="grid-content">{{item.closing}}</div></el-col>
											   <el-col :span="4"><div class="grid-content" >{{item.createTime}}</div></el-col>
											    <el-col :span="3"><div class="grid-content" >{{item.dealSn}}</div></el-col>
											 <el-col :span="3" class="kill"><div class="grid-content" @click='killOrder(item.dealId)'><span class='che'>撤单</span></div></el-col>	
									  	</el-row>
								</div>
						  </el-tab-pane>
					</el-tabs>
				</div>
				<div class="grid-content top">
					<div class='th border'>
						<span class='keep'>持仓</span> 
					</div>	
					<el-row class="th border">
					<el-col :span="24"><div class="grid-content center">
						 <el-row>
								<el-col :span="4"><div class="grid-content">商品名称</div></el-col>
									  <el-col :span="3"><div class="grid-content">持有量</div></el-col>
									  <el-col :span="3"><div class="grid-content">可用数</div></el-col>									  
									  <el-col :span="3"><div class="grid-content">均价</div></el-col>
									  <el-col :span="3"><div class="grid-content">最新价</div></el-col>
									  <el-col :span="3"><div class="grid-content">持仓价</div></el-col>
									  <el-col :span="3"><div class="grid-content">盈亏</div></el-col>
							</el-row>
					</div></el-col>
						 
							 						
					</el-row>	
					<el-row class='height'>
						 <el-col :span="24" v-for='(item,index) in getUserStockPosition' :key='index'>
						<div class="grid-content center">
							<el-row>
								<el-col :span="4"><div class="grid-content">{{item.name}}</div></el-col>
									  <el-col :span="3"><div class="grid-content">{{item.position}}</div></el-col>
									  <el-col :span="3"><div class="grid-content">{{item.positionSup}}</div></el-col>									  
									  <el-col :span="3"><div class="grid-content">{{item.avgPrice}}</div></el-col>
									  <el-col :span="3"><div class="grid-content">{{item.positionSup}}</div></el-col>
									  <el-col :span="3"><div class="grid-content">{{item.marketPrice}}</div></el-col>
									  <el-col :span="3"><div class="grid-content">{{item.profit}}</div></el-col>
							</el-row>
						</div>
						</el-col>		 										
					</el-row>	
					
				</div>
			</el-col>
  			<el-col :span="8">
	  			<div class="grid-content top right">										  
						  		<div class="easy center">
									<div class="">									
										<el-row>
											<el-col :span="6"><div class="grid-content rightHeight">商品</div></el-col>
  											<el-col :span="10"><div class="grid-content rightHeight clear"><input type="text" name="" value="商品名称" readonly="readonly" v-text="text.name" v-model="text.name"></div></el-col>
  											<el-col :span="8"><div class="grid-content rightHeight"><span>涨停<em v-if="text.opens=='-'">{{text.opens}}<!-- {{text.openPrice}} --></em>
  											<em v-else>{{text.openPrice}}</em>
  											</span></div></el-col>								
										</el-row>
									</div>
									<div>
										<el-row>
											<el-col :span="6"><div class="grid-content rightHeight">手数</div></el-col>
  											<el-col :span="10"><div class="grid-content rightHeight" ><span style="display:flex;flex-direction:row;">
											<em class="handLeft" @click="handLeft()"></em>
											<input type="text" name="" class="handInput"   v-model="handNumber">
											<em class="handRight" @click="handRight()"></em>
										</span></div></el-col>
 											<el-col :span="8"><div class="grid-content rightHeight">		
											  	<em>卖<i>{{text.sellAmount}}</i>/<i>{{text.sellVol}}</i></em>
											  	<em>买<i>{{text.buyAmount}}</i>/<i>{{text.sellVol}}</i></em>										
											</div></el-col>											
										</el-row>
									
									</div>
									<div>
										<el-row>
											<el-col :span="6"><div class="grid-content rightHeight">
												<button class="switch" @click="price()">{{priceBtn}}</button>
											</div></el-col>
  											<el-col :span="10"><div class="grid-content rightHeight" style="display:flex;flex-direction:row;">
  												<em class="specialLeft" v-show="specialBtn" @click="specialLeft()"></em>
  												<input type="text" name="" value="" class="specialInput" v-model="specialPrice" v-bind:readonly="isReadOnly" >
  												<em class="specialRight" v-show="specialBtn" @click="specialRight()"></em>
  												</div>
  											</el-col>
  											<el-col :span="8"><div class="grid-content rightHeight"><span>跌停<em v-if="text.opens=='-'">{{text.opens}}<!-- {{text.stopPrice}} --></em>
  											<em v-else>{{text.stopPrice}}</em>
  											</span></div></el-col>											
										</el-row>


									</div>
									<div class="easyBtnBox">									
										<span class='easyBtn buy' @click="buy">买进</span>
										<span class="easyBtn sell" @click="sell">卖出</span>																		
									</div>
									<div class="accountCount">
										<ul class="clear">
											<li>
												<p>账号权益</p>
												<p>{{user.totalMoney}}</p>
											</li>
											
											<li>
												<p>手续费</p>
												<p>{{user.feeMoney}}</p>
											</li>
											
											<li>
												<p>锁定XIMI币</p>
												<p>{{user.shopMoney	}}</p>
											</li>
											<li>
												<p>可用资金</p>
												<p>{{user.supMoney}}</p>
											</li>
											
										</ul>
										
									</div>
								</div>	
	  			</div>
  			</el-col>
		</el-row>
		<!-- 鼠标右键 -->
		<div class="free" v-show='isfree' style="position:absolute;" @click="free()">添加到自选合约</div>
		<!-- 买弹出框 -->
			<div class="maskwrite" v-if="ordertang"></div>
			<div class="sellBox" v-if="ordertang">
				<div class="selltitle"><span >确认下单</span><span class="close" @click="sellClose"></span></div>
				<div class="sellorder">
					<span>下单：</span>
					<span class="orderword">买：</span>
					
					<span class="ordername">{{text.name}}</span>
					<span class="">手数</span>
					<span>{{handNumber}}</span>
					<span class="">价格</span>
					<span class="orderprice" v-if="specialPrice=='市价'">{{text.marketPrice}}</span>
					<span class="orderprice" v-else>{{specialPrice}}</span>
				</div>
				<div class="sellBtn">
					<el-button @click="sellClose" :plain="true" type="danger">取消</el-button>
					<el-button @click="sellBtn" :plain="true" type="danger">确认</el-button>
				</div>
			</div>
			<!-- 卖弹出框 -->
			<div class="maskwrite" v-if="ordertang2"></div>
			<div class="sellBox" v-if="ordertang2">
				<div class="selltitle"><span >确认下单</span><span class="close" @click="sellClose"></span></div>
				<div class="sellorder">
					<span>下单：</span>
					
					<span class="orderword" >卖：</span>
					<span class="ordername">{{text.name}}</span>
					<span class="">手数</span>
					<span>{{handNumber}}</span>
					<span class="">价格</span>
					<span class="orderprice" v-if="specialPrice=='市价'">{{text.marketPrice}}</span>
					<span class="orderprice" v-else>{{specialPrice}}</span>
				</div>
				<div class="sellBtn">
					<el-button @click="sellClose" :plain="true" type="danger">取消</el-button>
					<el-button @click="sellBtn2" :plain="true" type="danger">确认</el-button>
				</div>
			</div>
			<!-- 提示消息框 -->
			<div class="messageBox" v-show='messageBox'>
				<div class="messagetitle"><span class="close" @click="messageClose"></span></div>
				<div class="message">{{message}}</div>
				<div class="messageSure">
					<el-button :plain="true" type="danger" class="" @click="messageClose">确定</el-button>
				</div>
				
			</div>
	</div>

</template>
<script>
	export default{
		data(){
			return{
				isA:true,
				isB:false,
				priceBtn:'市价',
				 handNumber:1,
				 specialBtn:false,
				 specialPrice:'市价',
				 isReadOnly:true,
				 lists:'', 
				 ind:'',
				 text:'',
				 add:1.1,
				 reduce:0.9,
				 isOpen:false,
				 stockId:'',//商品id
				 openPrice:'',
				 stopPrice:'',				
				 marketPrice:'',
				 ordermask:false,
				 ordertang:false,
				  ordertang2:false,
				 isfree:false,
				 selectshow:true,
				 maskwrite:false,
				 isSellBuy:false,
				 messageBox:false,
				 user:'',
				 toprice:'',
				 message:'',
				todayOverDealVos:'',//当日成交
				unSettledDealVos:'',//当日委托
				getUserStockPosition:'',//持仓
				
				 // isred:false,
				 // isgreen:false
				 
			}
		},
		mounted:function(){
					this.list();
					this.bodyclose();
					this.getWalletByUser();
					//this.getUserStockPosition();//持仓接口
					this.getUserTodayDeal();//当日成交当日委托
					this.getUserPosition();
				//console.log(this.$route.query.id)
				this.settime();

		},
		updated:function(){
			//this.context()
		},
		methods:{
			getWalletByUser(){
				var that=this
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
								//console.log(res)
								that.user=res.obj
							}	
						}
					})
			},
			list(){
				 this.lists=[{
				 		"name": "",
			            "news": "3176.11", 
			            "downs": "-0.37%", 			             
			            "id": "000001", 
			            "type": 1, 
			            "time": null, 
			            "rose": "-11.75",
			            "open":2000
			        }
			        ]
				
				var that = this;
				ajax({
					type:"post",
						url: http + "stock/getStockTable",					
						data: JSON.stringify({
							'currentPage':1,
				        	'pageSize':10000,
						}),
						success:function(res){
							//console.log(JSON.parse(res))

								// console.log(res.resultList)
								var res=JSON.parse(res);
								console.log( res)
								if(res.resultList.length!=0){							
									that.lists=res.resultList;						
									that.text=that.lists[0];
									//console.log(that.text)
									that.stockId=that.lists[0].stockId;
									//console.log(that.stockId)
									that.text.openPrice=(that.text.opens*1.1).toFixed(2)
									//console.log(this.text.openPrice)
										that.text.stopPrice=(that.text.opens*0.9).toFixed(2)
									var listItemNum=that.lists										
								}
						}
				})
						
				

			},
			
			shop(){//全部商品				 
				 this.isA=true
				 this.isB=false				
				 this.list()				
			},			
			self(){//自选商品
				var that=this;

				that.isA =false
				that.isB=true
				ajax({
					type:"post",
						url: http + "stock/getUserStockTable",					
						data: JSON.stringify({
							'sessionKey':sessionKey,
							'currentPage':1,
							'pageSize':10000000,
						}),
						success:function(res){
							var res=JSON.parse(res);
							if(res.resultList.length!=0){
							//console.log(res.data.resultList)
							that.lists=res.resultList;														
						}
						}
				})
			},
			openw(){
				this.isOpen
			},
			listItem(item,index){//点击商品列表	
				/*this.$emit('isopen',this.sv)	*/	
				//console.log(item)
				//console.log(window.isopen);
				window.isopen="000";
				window.shopId=item.stockId
				this.ind=index;
				this.marketPrice=item.marketPrice
				//console.log(this.marketPrice)
				this.text=item;
				this.stockId=item.stockId
				this.getDealStockDetail(this.stockId)
				if(item.opens=='-'){
					this.text.openPrice='--'
					this.text.stopPrice='--'
				}else{
					this.text.openPrice=(item.opens*1.1).toFixed(2)
					//console.log(this.text.openPrice)
					this.text.stopPrice=(item.opens*0.9).toFixed(2)
				}
				if(this.priceBtn=='指定价'){
					 this.specialPrice=this.marketPrice
				}


				
			},
			listItemTwo(item,index){
					this.stockId=item.stockId
				///console.log(item)
				//console.log(this.stockId)
					 open(url+'xiaoshanPC/kline/index.html?id='+this.stockId,'介绍','width=800,height=800,left=300,top=150,margin:-400 0 0-400;,resizable=no,scrollbars=no,status=yes,toolbar=no,location=no,menubar=no,menu=yes')
			},
			getDealStockDetail(index){
				//console.log('商品的id为'+index);
				var that=this;
					ajax({//商品详情
					type:"post",
						url: http + "deal/getDealStockDetail",					
						data: JSON.stringify({
							"stockId":parseInt(index),
							"sessionKey":sessionKey,							    
						}),
						success:function(res){
							
							var obj=JSON.parse(res);
							
							var result=obj.result;
							//console.log(result)
							that.maxSell=result.maxSell;
							//console.log(that.maxSell)
						}
					})	
			},
			context(item,index){//鼠标点击右键
				//console.log(event.clientX)
				window.shopId=item.stockId
				console.log(event.clientX,event.clientY)
				$('.free').css({'left':event.clientX,'top':event.clientY})
				this.isfree=true;
				
			},
			free(){
				var that=this;
				that.selectshow=true;
				console.log(window.shopId)
					ajax({
					type:"post",
						url: http + "userWeb/appAddUserStock",					
						data: JSON.stringify({
							"sessionKey":sessionKey,
							'stockId':window.shopId,
						}),
						success:function(res){
							var obj=JSON.parse(res);
							//console.log(obj)
						}
					})		
			},
			handLeft(){//手数左
				this.handNumber--;
				if(this.handNumber<=1){
					this.handNumber=1
					return;
				}	
			},
			handRight(){//手数右
					this.handNumber++;
			},
			price(){//点击价格按钮
				switch(this.priceBtn){
					case "市价":
					this.priceBtn="指定价";
					 this.specialBtn=true;
					this.specialPrice=this.marketPrice
					 this.isReadOnly=false;
					 break;
					case "指定价":
					this.priceBtn="市价";
					this.specialBtn=false;
					this.specialPrice="市价";
					this.isReadOnly=true;					
					break;
					// case "跟盘价":
					// this.priceBtn="指定价";
					// this.specialBtn=true;
					// this.specialPrice="2000"
					// this.isReadOnly=false;
					// break;
					// case "指定价":
					// this.priceBtn="市价";
					// this.specialBtn=false;
					// this.specialPrice="市价";
					// this.isReadOnly=true;
					// break;
					// case "市价":
					// this.priceBtn="跟盘价"
					// this.specialBtn=false;
					// this.specialPrice="跟盘价";
					// this.isReadOnly=true;
					// break;
				}
			},
			specialLeft(){
				this.specialPrice--;
				if(this.specialPrice<=1){
					this.specialPrice=1
					return;
				}	
			},
			specialRight(){
					this.specialPrice++;
			},
			buy(){
				
				var that=this;
				console.log(that.stockId);
				
				if(that.specialPrice=='市价'){
					that.toprice=that.marketPrice;
					console.log(that.toprice)
				}else{
					that.toprice=that.specialPrice;
					console.log(that.toprice)
				}
				if(that.toprice=='-'||that.handNumber==''){
					 that.$message({
				          message: '交易失败',
				          type: 'warning'
				        });
				        return
					
				}else if(that.toprice>that.text.openPrice||that.toprice<that.text.stopPrice){
					 that.$alert('请重新输入价格', '', {
				          confirmButtonText: '确定',
				        });
				        return
				}
				else{
					that.isSellBuy=false;
				var ischeck=localStorage.getItem('checkList');			
				 if(ischeck=='0'){
				 		that.ordertang=true;
				 		
				 }else{
				 	console.log(that.stockId,that.toprice,that.handNumber)
				 		that.ordertang=false;
				 		that.buyStockId(that.stockId,that.toprice,that.handNumber);
					that.messageBox=true;
					setTimeout(()=>{

					that.messageBox=false
					},2000)	
				 }

			}
			
				
			},
			buyStockId(stockId,price,handNumber){//买商品接口
				console.log(stockId,price,handNumber)
				var that=this;
				ajax({
					type:"post",
						url: http + "deal/buyFutures",					
						data: JSON.stringify({
							"sessionKey":sessionKey,
							     "deal":{
							     	"stockId":stockId,
								  "price":parseFloat(price) ,
								  "total":handNumber  
								}
						}),
						success:function(res){
							console.log(res)
							var obj=JSON.parse(res);
							if(obj.code==200){
								that.message='委托成功';
								that.getUserTodayDeal();
								that.getUserPosition();
							}else if(obj.code==201){
								that.message='服务器连接超时';
							}
							else if(obj.code==300){
								that.message=obj.msg;
							}else if(obj.code==301){
								that.message=obj.msg;
							}else if(obj.code==302){
								that.message=obj.msg;
							}														
						}
				
					})
			},
			sellStockId(stockId,price,handNumber){//卖商品接口
				var that=this;
				ajax({
					type:"post",
						url: http + "deal/sellFutures",					
						data: JSON.stringify({
							"sessionKey":sessionKey,
							     "deal":{
							     	"stockId":stockId,
								  "price":parseFloat(price) ,
								  "total":handNumber  
								}
						}),
						success:function(res){
							console.log(res)
							var obj=JSON.parse(res);
							if(obj.code==200){
								that.message='委托成功';
								that.getUserPosition();
								that.getUserTodayDeal();
							}else if(obj.code==201){
								that.message='服务器连接超时';
							}
							else if(obj.code==305){
								that.message=obj.msg;
							}else if(obj.code==306){
								that.message=obj.msg;
							}
							
							
						}
				
					})
			},
			getUserTodayDeal(){//当日委托和当日成交
				var that=this
				ajax({
					type:"post",
						url: http + "deal/getUserTodayDeal",	
						data: JSON.stringify({
							"sessionKey":sessionKey,
							"currentPage":1,
				        	"pageSize":100000,
						}),
						success:function(res){							
								var res=JSON.parse(res);
								console.log(res)
								var arr1=[];
								var arr2=[];
								if(res.todayOverDealVos.length!=0){
									//console.log(res.todayOverDealVos)								
									that.todayOverDealVos=res.todayOverDealVos;
									for(let i=0;i<res.todayOverDealVos.length;i++){
										let obj={};
										obj.dealId=res.todayOverDealVos[i].dealId;
										let newDate=new Date();
					                    let createTime=res.todayOverDealVos[i].createTime;
					                   
					                    newDate.setTime(createTime);					               
					                    obj.createTime=newDate.format('yyyy-MM-dd hh:mm:ss');
					                    obj.name=res.todayOverDealVos[i].name;
					                    obj.type=res.todayOverDealVos[i].type;
					                    obj.amount=res.todayOverDealVos[i].amount;
					                    obj.countVol=res.todayOverDealVos[i].countVol;
					                    obj.feeMoney=res.todayOverDealVos[i].feeMoney;
					                    obj.profit=res.todayOverDealVos[i].profit;
					                     obj.dealSn=res.todayOverDealVos[i].dealSn;
					                    arr1.push(obj);
									}
									that.todayOverDealVos=[...arr1];



								}
								//console.log(res.unSettledDealVos)
								
								if(res.unSettledDealVos.length!=0){	
									//console.log(res.unSettledDealVos)
									//that.unSettledDealVos=res.unSettledDealVos;
									for(let i=0;i<res.unSettledDealVos.length;i++){
										let obj={};
										obj.dealId=res.unSettledDealVos[i].dealId;
										let newDate=new Date();
					                    let createTime=res.unSettledDealVos[i].createTime;
					                   
					                    newDate.setTime(createTime);					               
					                    obj.createTime=newDate.format('yyyy-MM-dd hh:mm:ss');
					                    obj.name=res.unSettledDealVos[i].name;
					                    obj.type=res.unSettledDealVos[i].type;
					                    obj.total=res.unSettledDealVos[i].total;
					                    obj.price=res.unSettledDealVos[i].price;
					                    obj.closing=res.unSettledDealVos[i].closing;
					                    obj.dealSn=res.unSettledDealVos[i].dealSn;
					                    arr2.push(obj);
									}
									that.unSettledDealVos=[...arr2];	
								}
						}
				})
			},
			killOrder(index){//委托撤单
				//console.log(index)
				
				var that=this;
				ajax({
					type:"post",
						url: http + "deal/revokeDeal",	
						data: JSON.stringify({
							"sessionKey":sessionKey,
							"dealId":index,
				        	
						}),
						success:function(res){
							var res=JSON.parse(res);
								//console.log(res);
								if(res.code==200){
									that.getUserTodayDeal();//当日委托接口
									that.getUserPosition();
								}
								
						}
					})
			},
			sell(){				 			
				var that=this;
				console.log(that.stockId);
				that.getDealStockDetail(that.stockId)
					if(that.specialPrice=='市价'){
						that.toprice=that.marketPrice;
						//console.log(that.toprice)
					}else{
						that.toprice=that.specialPrice;
						//console.log(that.toprice)
					}
					console.log(that.maxSell)
					if(that.handNumber>that.maxSell){
						that.$alert('请重新输入手数', '', {
					          confirmButtonText: '确定',
					        });
					        return
					}
					else if(that.toprice=='-'||that.handNumber==''){
						 that.$message({
					          message: '委托失败',
					          type: 'warning'
					        });
					        return
						
					}else if(that.toprice>that.text.openPrice||that.toprice<that.text.stopPrice){
						 that.$alert('请重新输入价格', '', {
					          confirmButtonText: '确定',
					        });
					        return
					}
					else{
						that.isSellBuy=true;
					var ischeck=localStorage.getItem('checkList');			
					 if(ischeck=='0'){
					 		that.ordertang2=true;
					 		
					 }else{
					 	//console.log(that.stockId,that.toprice,that.handNumber)
					 		that.ordertang2=false;
					 		that.sellStockId(that.stockId,that.toprice,that.handNumber);
						that.messageBox=true;
						setTimeout(()=>{
	
						that.messageBox=false
						},2000)	
					 }
				 }
			},
			sellBtn(){//点击买确定按钮
				var that=this;
				
				that.buyStockId(that.stockId,that.toprice,that.handNumber);
				this.ordertang=false; 
				
				this.messageBox=true;
				setTimeout(()=>{
				
					this.messageBox=false
				},3000)	
			},
			sellBtn2(){//点击卖确定按钮
				var that=this;
				that.sellStockId(that.stockId,that.toprice,that.handNumber);
				this.ordertang2=false; 
				this.messageBox=true;
				setTimeout(()=>{

					this.messageBox=false
				},3000)	
			},
			sellClose(){
				this.ordertang=false;
				this.ordertang2=false;
			},
			messageClose(){
				this.messageBox=false
			},
			bodyclose(){
				$(document).click(event=> {
					
					this.isfree=false;
					 });
			},
			getUserPosition(){//持仓接口
				var that=this;
				ajax({
						type:"post",
							url: http + "deal/getUserStockPosition",					
							data: JSON.stringify({
								 "sessionKey":sessionKey,
	 							"currentPage":1,
	 							"pageSize":100000,
							}),
							success:function(res){	
								//console.log(res)
								var obj=JSON.parse(res);
								//console.log(obj)
								var resultList=obj.resultList;
								//console.log(resultList)
								if(resultList.length!=0){
									that.getUserStockPosition=resultList;
									//console.log('持仓'+that.getUserStockPosition)
								}
								//console.log(obj);
		         			  	
							}	             
		           })  
			},
			settime(){
				var that=this;
				setInterval(function(){
					that.list()
				},60000)

				
			}




		}
	}
</script>
<style scoped>
.countryBox{
	background: #f1f1f1;
	margin-top: 40px;
}
	.country{
		overflow: hidden;
		font-size: 14px;


	}
.tbodyList	.listActive{
		background: #400080;
	}
	.isnewred{
		color: #f00;
	}
	.isnewgreen{
		color: green;
	}
	
	.country li{
		float: left;
		background: #eef1f6;
		border-top:#d9d9d9;
		border-left: #d9d9d9;
		
		width: 80px;
		text-align: center;
		
		font-size: 14px;
		border-top:1px solid #d9d9d9;
		border-left: 1px solid #d9d9d9;
		  cursor: pointer;
		  line-height: 35px;
	}
	.country li:last-child{
		border-right: 1px solid #d9d9d9;
	}
	.country .light{
		background: #fff;
	}
	.tbodyList{
		color: yellow;
		text-align: center;
		line-height: 30px;
	}
		.tbodyList td {
			cursor: pointer
	}
	.block{
		background: #000;	
		height: 300px;
		overflow: auto	
	}
	.thead{
		width:100%;
		color: #02e4e4;
	}
	.thead th{
		position: relative;
		height:50px;
		width: 100px!important;
		min-width: 100px;
		text-align: center;
		
	}
	.top{
		margin-top: 20px;
	}
	.el-tabs--border-card>.el-tabs__content{
		padding: 0px;
	}

	.th{
		background: #eef1f6;
		padding:5px 0;
	}
	.border{
		border-top:1px solid #d1dbe5;
		border-left: 1px solid #d1dbe5;
		border-right: 1px solid #d1dbe5;
		
	   
	}
	.keep{
		display: inline-block;
		text-indent: 15px;
	}
	.height1{
		height:120px;
		overflow: auto;
	}
	.height{
		height: 160px;
		overflow: auto;
		background: #fff;
		border:1px solid #ccc;
	}
	.bg-purple-light {
    background: #e5e9f2;
  }
  .center{
  	text-align: center;
  }
  .easyBtnBox{
  	margin-top: 70px;
  }
  .easyBtn{
  	display: inline-block;
		width:80px;
		background:url(../assets/image/bg.png) no-repeat 0 0;
		background-size:100% 100%; 
		height: 110px;
		line-height: 110px;
		text-align:center;
		cursor: pointer; 
  }
  .buy{
  	/*margin:0  20%;*/
  	margin-right:80px;
  }
  .sell{
  	
  }
.right{
	margin-left:20px;
	padding:20px 0 80px 0;
	height:376px;
	border:1px solid #d1dbe5;
}
.rightHeight{
	line-height: 40px;
}
.easy{
	
}
.easy input{
	text-align: center;
	width: 100%;
	line-height: 30px;
	border:1px solid #ccc;
	    height: 30px;
}
.easy .handInput{
	flex:1;
}
.handLeft{
	width: 15px;
	background: url(../assets/image/Arrow1.png) no-repeat left center;
	cursor: pointer;

}
.handRight{
	width:15px;
	background: url(../assets/image/Arrow2.png) no-repeat right center;
	cursor: pointer;
}
.switch{
	cursor: pointer;
	padding:5px 10px;
	background:url(../assets/image/bg.png) no-repeat 0 0;
	background-size: 100% 100%;
	outline: none;
}
.specialRight{
	width:15px;
	background: url(../assets/image/Arrow2.png) no-repeat right center;
	cursor: pointer;
}
.specialLeft{
	width: 15px;
	background: url(../assets/image/Arrow1.png) no-repeat left center;
	cursor: pointer;
}
.specialInput{
	flex:1;
}
.free{
	position: absolute;
	border:1px solid #f1f1f1;
	background: #f1f1f1;
	cursor: pointer;
	left:0;
	top:0;
	padding:2px;
	border-radius: 3px;
	-webkit-border-radius:3px; 
}
/*买卖弹出框*/
.sellBox{
	position: absolute;
	width: 500px;
	height: 300px;
	left: 50%;
	top: 50%;
	margin:-150px 0 0 -250px;
	background:#d3dce6 ;
	z-index: 20;
	border-radius: 5px;
	-webkit-border-radius:5px;
	-moz-border-radius:5px;
	border:1px solid #ccc;
	 
}
.selltitle{
	font-size: 20px;
	border-bottom: 1px solid #ccc;
	padding: 10px;
}
.sellorder{
	
	border-bottom:1px solid #ccc;
	height: 150px;
	padding:10px;
	background: #fff;
}
.sellBtn{
	margin-top:20px;
}
.sellBtn button{
	float: right;
	margin-right: 20px;
}

/*提示消失弹出框*/
.messageBox{
	background:#d3dce6; 
	position: absolute;
	left: 0;
	bottom:0;
	width: 500px;
	height: 300px;	
	border-radius: 5px;
	-webkit-border-radius:5px;
	-moz-border-radius:5px;
	border:1px solid #ccc;
}
.message{
	height:160px;
	padding:10px;
	border-bottom: 1px solid #ccc;
	background: #fff;
}
.messagetitle{
	height:30px;
	border-bottom: 1px solid #ccc;
	padding:10px;
}
.messageSure{
	float: right;
	padding:10px 20px 0 0;
	
}
.accountCount{
		overflow: hidden;
		margin-top: 50px;
	}
	.accountCount ul
	{
		width: 100%;
		
		border-bottom: 1px solid #ccc;
		border-top:1px solid #ccc ;
		color: #000;
	}
	.accountCount li{
		float: left;
		width: 24.5%;
		text-align: center;
		font-size: 14px;
		border-right: 1px solid #ccc;
		height: 72px;

	}
	.accountCount li:nth-child(4){
		border-right: none;
	}
	.accountCount li p{
		line-height: 36px;
	}
	.kill{
		cursor: pointer;
	}
	.che{
		display: inline-block;
		width:50px;
		height: 24px;
		line-height: 24px;
		margin-top: 5px;
		background:url(../assets/image/bg.png) no-repeat 0 0;
		background-size: 100% 100%;
	}
</style>