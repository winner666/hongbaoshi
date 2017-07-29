<template>
	<div class="order">
		<v-header></v-header>
		<div class="orderWarp">
			<div class="orderBox width">
				<div class="addressTitle clear">
					<em class="title1">1.选择收货地址</em>
					<em class="addAddress" @click='addAddress'>添加收货地址</em>
				</div>
				<div class="address">
					  <el-radio-group v-model="radio2" style='width: 100%;'>
					<div class="addressList clear" v-for='($address,addressIndex) in listAddress'>
					
						<div style="float:left" v-if='$address.isDefault==0'>
							<el-radio class="radio"  :label="$address.addressId">
								地址：{{$address.province}}{{$address.city}}{{$address.county}}{{$address.address}}   联系方式： {{$address.mobile}} 姓名：{{$address.name}}								
							</el-radio>
						</div>					
					 	<div style="float:left" v-if='$address.isDefault==1'>					 		
							<el-radio class="radio"  :label="$address.addressId" v-if='$address.isDefault==1'>地址：{{$address.province}}{{$address.city}}{{$address.county}}{{$address.address}}联系方式：{{$address.mobile}} 姓名：{{$address.name}}</el-radio>
							<span>默认地址</span>
						</div>
						<div class="editAdd">
							<span class="editAddress" @click='editAddressBtn($address.addressId)'>编辑地址</span>
							<span class="" @click='reduceAddress($address.addressId)'>删除地址</span>
						</div>
					</div>
					</el-radio-group>
				</div>
				<div class="orderDetail">
					<div class="ordert">2.确认订单</div>
					<div class="orderTit">
						<span>商品</span>
						<span>XIMI币</span>
						<span>数量</span>
						<span>合计</span>
					</div>
					<div class="orderUp">
						
						<div class="up clear">
							<div class="upLeft">
								<div class="upImg">
									<img :src="goodsItemList.imgsrc"/>
								</div>
								<div class="upName">
									{{goodsItemList.name}}
								</div>
							</div>
							
							<div class="ji">{{goodsItemList.price}}</div>
							<div class="upnumBox"> 
								
								<em class="upReduce" @click='upReduce'>-</em>
								<input type="number" value="" class="upNum" v-model="upNum" min="1"/>
								<em class="upAdd" @click='upAdd'>+</em>
							</div>
							<div class="upCount">
								{{goodsItemList.price*upNum}}
							</div>
						</div>
						<!--<div class="down clear">
							<div class="downlabel">商品备注</div>
							<textarea class="remark"></textarea>
						</div>-->
					</div>
					<div class="totleBox clear">
						
						<div class="totleBtn" @click="totalBtn(goodsItemList.price*upNum)">
							立即提取
						</div>
						<div class="totleLeft">
							<span class="totleTitle">合计XIMI币：</span>
							<span class="totle" >{{goodsItemList.price*upNum}}</span>
						</div>
					</div>
				</div>
			</div>
			
		</div>
		
		<v-footer></v-footer>
		<!--立即提取弹出框-->
		<div class="mask" v-show="paymask"></div>
		<div class="paymentBox" v-show="paymask">
			<div class="payTitle"><span>请输入支付密码</span><span class="close1" @click='payClose'></span></div>
			<div class='pay'><span>支付XIMI币：</span><span>{{totleNum}}</span></div>
			<div class="paypass"><input type="password" name="" id="" value="" placeholder="请输入支付密码进行支付" v-model="passfu"/></div>
			<div class="payBtn" @click='payBtn'>确定</div>
		</div>
		<!--添加地址弹出框-->
		<div class="mask" v-show='addressmask'></div>
		<div class="add_address" v-show='addressmask'>
			<div class="siteTitle">
				<span>添加收货地址</span>
				<span class="site_close" @click='siteClose'></span>
			</div>
			<div class="clear">
				<div class="">
					<span>所在地区</span><em class="color">*</em>
					<el-select v-model="select1" placeholder="请选择" class="cityone"  @change='changeValue'>
					    <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
					    </el-option>
				  	</el-select>
				  	<el-select v-model="select2" placeholder="请选择" @change='changeValue2'>
					    <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
					    </el-option>
				  	</el-select>
				  	<el-select v-model="select3" placeholder="请选择">
					    <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
					    </el-option>
				  	</el-select>
				</div>
				<div>
					<span>详细地址</span>
					<em class="color">*</em>
					<el-input type="textarea" v-model="desc" style='width: 690px;margin-top: 30px;'></el-input>
				</div>
			
				<div>
					<span>收货人姓名</span>
					<em class="color">*</em>
					 <el-input v-model="addressName" class='inputsite'></el-input>
				</div>
				<div>
					<span>手机号码</span>
					<span class="color">*</span>
					<el-input v-model="addressNumber" class='inputsite'></el-input>
				</div>
				<div>
					<el-checkbox v-model="checkeddouble" class="moaddress">设置为默认地址</el-checkbox>	
				</div>
				<div>
					<div class="addressBtn" @click="addressBtn">确定</div>
				</div>
					 		
			</div>
		</div>
		<!--编辑地址弹出框-->
		<div class="mask" v-show='editaddressmask'></div>
		<div class="add_address" v-show='editaddressmask'>
			<div class="siteTitle">
				<span>添加收货地址</span>
				<span class="site_close" @click='editClose'></span>
			</div>
			<div class="clear">
				<div class="">
					<span>所在地区</span><em class="color">*</em>
					<el-select v-model="select1" placeholder="请选择" class="cityone"  @change='changeValue'>
					    <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
					    </el-option>
				  	</el-select>
				  	<el-select v-model="select2" placeholder="请选择" @change='changeValue2'>
					    <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
					    </el-option>
				  	</el-select>
				  	<el-select v-model="select3" placeholder="请选择">
					    <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
					    </el-option>
				  	</el-select>
				</div>
				<div>
					<span>详细地址</span>
					<em class="color">*</em>
					<el-input type="textarea" v-model="desc" style='width: 690px;margin-top: 30px;'></el-input>
				</div>
			
				<div>
					<span>收货人姓名</span>
					<em class="color">*</em>
					 <el-input v-model="addressName" class='inputsite'></el-input>
				</div>
				<div>
					<span>手机号码</span>
					<span class="color">*</span>
					<el-input v-model="addressNumber" class='inputsite'></el-input>
				</div>
				<div>
					<el-checkbox v-model="checkeddouble" class="moaddress">设置为默认地址</el-checkbox>	
				</div>
				<div>
					<div class="addressBtn" @click="editAddressBtnsure">确定</div>
				</div>					 		
			</div>
		</div>
		
		
		
		
		
		
		
		
	</div>
</template>
<!--caf6f71b64892b2b04b96f54c3f63028-->
<script>
	import header from './shophead'
	import footer from './footer'
	export default{
		data(){
			name:'order'
			return{
				paymask:false,
				upNum:1,
				ji:200,
				totleNum:'',
				addressmask:false,
				 options1: [{
		          value: '选项1',
		          label: '黄金糕'
		        }, {
		          value: '选项2',
		          label: '双皮奶'
		        }, {
		          value: '选项3',
		          label: '蚵仔煎'
		        }, {
		          value: '选项4',
		          label: '龙须面'
		        }, {
		          value: '选项5',
		          label: '北京烤鸭'
		        }],
		       select1: '',
		        options2: [{
		          value: '选项1',
		          label: '黄金糕'
		        }],
		        select2: '',
		         options3: [{
		          value: '选项1',
		          label: '黄金糕'
		        }],
		        select3: '',
		        desc:'',
		      
		        addressName:'',
		        addressNumber:'',
		         checkeddouble: true,
		            radio2: '',
		          listAddress:'',
		          imgpic:'',
		          goodsItemList:'',
		          editaddressmask:false,
		          editaddressId:'',
		          imgsrc:'',
		          passfu:'',
		          payPwd:'',
		          ispasscode:''//判断密码是否为空
			}
		},
		components:{
			'v-header':header,
			'v-footer':footer,
		},
		mounted:function(){					
					this.addList();
					this.shopinfor();
					this.city(100000);
					
		},
		updated:function(){		
			var that=this;
				//console.log(that.goodsItemList)	
				// if(that.goodsItemList!=null){
				// 	$.each(that.goodsItemList.goodsImgs,function(j,i){																			
				// 			that.imgsrc=i.src								
				// 		})
				// }
						
		
			//console.log(that.abc)
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
						console.log(obj)
						that.ispasscode=obj.code;
						console.log(that.ispasscode)
						
					}
					})
			},
			addList(){
				var that=this;
				 ajax({//用户地址列表
					type:"post",
						url: http + "address/getAddressApp",					
						data: JSON.stringify({
							"sessionKey":sessionKey,
							     "PageVo":{
								  "page": 1,
								  "size": 10000    
								}
						}),
						success:function(res){	
							//console.log(res)
							var obj=JSON.parse(res).obj;
							console.log(obj)
							
								that.listAddress=obj
								//console.log(that.listAddress)
								if(obj.length!=0){
									for(var i=0;i<that.listAddress.length;i++){
										if(that.listAddress[i].isDefault==1){
											
											//console.log(that.listAddress[i].addressId)
											that.radio2=that.listAddress[i].addressId
											
										}
									}
									
								}
	         			   		
							
						}	             
	          }) ;	           	           
			},
			shopinfor(){
				var that=this;
				//console.log(sessionKey+'商品id为：'+parseInt(this.$route.query.shopId))
				ajax({//商品信息
					type:"post",
						url: http + "goods/getGoodsAndAdderss",					
						data: JSON.stringify({
							"sessionKey":sessionKey,
							"goodsId":parseInt(that.$route.query.shopId),
							
						}),
						success:function(res){	
							//console.log("商品详情"+res)
							//console.log(JSON.parse(res).Goods[0])
							//var obj=JSON.parse(res)
							var obj=JSON.parse(res).Goods[0];
							console.log(obj)
						
	         			  that.goodsItemList=obj;
	         			  console.log(that.goodsItemList.goodsImgs)
	         			  if(that.goodsItemList.goodsImgs.length && Array.isArray(that.goodsItemList.goodsImgs)){
						                   		that.goodsItemList.imgsrc = that.goodsItemList.goodsImgs[0].src;
						                   		
						                   	}	         			    	         			
						}	             
	           		})     
			},
			city(cityId){
				var that=this;
				ajax({//城市列表
					type:"post",
						url: http + "main/getCityList",					
						data: JSON.stringify({
							'cityCode':parseInt(cityId)
							
						}),
						success:function(res){
							//console.log(res)
							let obj=JSON.parse(res).resultList;
							//console.log(obj)
							var cityType=JSON.parse(res).cityType;
							 var cityList=[];
							 for(var i=0;i<obj.length;i++){
							 	var objList={};
							 	objList.value=obj[i].code;
							 	objList.label=obj[i].fullName;
							 	cityList[i]=objList
							 }
							 if(cityType==1){
							 	that.options1=cityList;
							 	//console.log(that.options1[0])
							 	that.select1=that.options1[0].value
							 	//console.log(that.select1)
							 }else if(cityType==2){
							 	//that.options2=''
							 	that.options2=cityList;
							 	that.select2=that.options2[0].value
							 }else{
							 	
							 	that.options3=cityList;
							 	that.select3=that.options3[0].value
							 }
							 
							 
							//console.log(res)
	         			 
						}	             
	           		})    
			},
			changeValue(value){
				//console.log(value)
				this.city(value)
			},
			changeValue2(value){
				this.city(value)
			},
			reduceAddress(id){
				var that=this;
				 ajax({
					type:"post",
						url: http + "address/delAddress",					
						data: JSON.stringify({
							 "sessionKey":sessionKey,
 							"addressId":parseInt(id)
						}),
						success:function(res){						
							var obj=JSON.parse(res).code							
	         			  	if(obj==200){
	         			  		  that.$message('删除成功');
	         			  		  that.addList()
	         			  	}
						}	             
	           })  
			},
			totalBtn(money){//立即提取按钮
				var that=this;	
				that.totleNum=money;
				that.passfu=''
				//console.log(that.radio2)
				//console.log(parseInt(this.$route.query.shopId),that.radio2,that.upNum,money)
				that.ispass()
				if(that.radio2==''){
					 that.$message({
				          message: '请添加收货地址',
				          type: 'warning'
				        });
					return
				}else{
						ajax({
						type:"post",
							url: http + "goodsOrder/addGoodsOrder",					
							data: JSON.stringify({
								 "sessionKey":sessionKey,
	 							"goodsOrder":{
								      "goodsId":parseInt(this.$route.query.shopId),
								      "addressId":that.radio2,
								      "num":that.upNum,
								      "money":money
								 }
							}),
							success:function(res){	
								//console.log(res)
								var res=JSON.parse(res);
							console.log(res)
		         			  	if(res.code==200){
		         			  		that.orderpayId=res.obj;
		         			  		  that.$message('添加成功');
		         			  		  that.paymask=true;
		         			  		 
		         			  	}
							}	             
		           })  
				}
				
				
				
			},
			payBtn(){//支付确定按钮
				var that=this;
				
				console.log(that.ispasscode)
				console.log(that.orderpayId,that.passfu)
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
	 							"payPwd":that.passfu							 
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
			
			payClose(){
				this.paymask=false;//立即提取关闭按钮
			},
			upReduce(){
				if(this.upNum==1){
					this.upNum=1
				}else{
					this.upNum--;
				}
				
			},
			upAdd(){
				this.upNum++;
				
			},
			
			addAddress(){
				this.city(100000)
				this.addressmask=true
				this.addressName='';
				this.addressNumber='';
				this.desc='';
				
			},
			siteClose(){
				this.addressmask=false
			},
			
			addressBtn(){//添加地址确定按钮
				
				
				var that=this;
				if(that.desc==''){
					that.$message('请输入详细地址');
					return
				}
				else if(that.addressName==''){
					that.$message('请输入收货人');
					return
				}else if(that.addressNumber==''){
					that.$message('请输入电话号码');
					return
				}
				console.log(that.checkeddouble)
				console.log('姓名：'+that.addressName+'电话：'+that.addressNumber+'省'+that.select1+'市'+that.select2+'区'+that.select3+'详细地址：'+that.desc)
				var moAddress;
				if(that.checkeddouble==true){
					moAddress=1
				}else{
					moAddress=0
				}
				
				ajax({
					type:"post",
						url: http + "address/editAddress",					
						data: JSON.stringify({
							  "sessionKey":sessionKey,
							    "address":{							       
								"name": that.addressName,
								"mobile": that.addressNumber,
								"provinceId":that.select1,
								"cityId":that.select2,
							        "regionId":that.select3,
								"address": that.desc,
								"isDefault":moAddress
								}
						}),
						success:function(res){
							console.log(res)
							
						var obj=JSON.parse(res).code							
	         			  	if(obj==200){
	         			  		  that.$message('添加成功');
	         			  		   that.addList()
	         			  	}
	         			  that.addressmask=false;
						}	             
	           })  
			},
			editAddressBtn(addressId){//编辑地址				
				console.log(addressId)
				var that=this;
				that.editaddressId=addressId;
				that.editaddressmask=true;
				 ajax({
					type:"post",
						url: http + "address/getAddressById",					
						data: JSON.stringify({
							 "sessionKey":sessionKey,
 							"addressId":addressId
						}),
						success:function(res){
							console.log(res)
							
							var obj=JSON.parse(res).obj;
							console.log()
							console.log(obj.provinceId)
							that.select1=obj.provinceId;
							that.select2=obj.cityId;
							that.select3=obj.regionId;
							that.desc=obj.address
							that.addressNumber=obj.mobile
							that.addressName=obj.name
							
							if(obj.isDefault==1){
								that.checkeddouble=true;									
							}else{
								that.checkeddouble=false
							}
							
							
	         			  	if(obj==200){
	         			  		  that.$message('删除成功');
	         			  		  that.addList()
	         			  	}
						}	             
	           })  
				
			},
			editAddressBtnsure(){//修改地址确定按钮
				var that=this;
				//that.editaddressmask=true;
				//that.city(100000);
				if(that.desc==''){
					that.$message('请输入详细地址');
					return
				}
				else if(that.addressName==''){
					that.$message('请输入收货人');
					return
				}else if(that.addressNumber==''){
					that.$message('请输入电话号码');
					return
				}
				var moAddress;
				if(that.checkeddouble==true){
					moAddress=1
				}else{
					moAddress=0
				}
				ajax({
					type:"post",
						url: http + "address/editAddress",					
						data: JSON.stringify({
							  "sessionKey":sessionKey,
							    "address":{	
							    "addressId":that.editaddressId,
								"name": that.addressName,
								"mobile": that.addressNumber,
								"provinceId":that.select1,
								"cityId":that.select2,
							        "regionId":that.select3,
								"address": that.desc,
								"isDefault":moAddress
								}
						}),
						success:function(res){
							console.log(res)
							
						var obj=JSON.parse(res).code							
	         			  	if(obj==200){
	         			  		  that.$message('修改成功');
	         			  		   that.addList()
	         			  	}
	         			  that.editaddressmask=false;
						}	             
	           })  
			},
			editClose(){
				this.editaddressmask=false;
			},
			isEmptyPayPwd(){//判断是否为空密码
				ajax({
					type:"post",
						url: http + "address/getAddressById",					
						data: JSON.stringify({
							 "sessionKey":sessionKey,
 							
						}),
						success:function(res){
							var  obj=JSON.parse(res);
							console.log(obj);	
						}
				})
			}
			
		},
		watch:{
			upNum:function(val,oldval){
				
					//alert(val,oldval)
					if(val<0){
						this.upNum=1
					}
			},
		},
		
	}
</script>

<style scoped>
	.orderWarp{
		border-top:10px solid #FDE5E8;
	}
	.addressTitle{
		padding:30px 0 10px;
		border-bottom: 1px solid #E5E5E5;		
	}
	.title1{
		float: left;
		color: #000000;
		font-size: 18px;
	}
	.addAddress{
		float: right;
		color: #8C8C8C;
		font-size: 20px;
		cursor: pointer;
		background: url(../assets/image/tianjia.png) no-repeat center left;
		text-indent: 30px;
		
	}
	.address{
		padding:10px 0;
	}
	.addressList{
		line-height: 30px;
		color: #8C8C8C;
		margin:10px 0;
	}
	.orderBox{
		min-height: 1050px;
	}
	.orderDetail{
		margin-top: 90px;
	}
	.ordert{
		font-size: 18px;
		color: #000000;
		
	}
	.orderTit{
		font-size: 14px;
		color: #8C8C8C;
		border-bottom: 2px solid #FC7988;
		line-height: 60px;
		margin-bottom: 30px;
	}
	.orderTit span{
		display: inline-block;
	}
	.orderTit span:nth-child(1){
		width: 500px;
	}
	.orderTit span:nth-child(2){
		width: 210px;
	}
	.orderTit span:nth-child(3){
		width: 250px;
	}
	.orderTit span:nth-child(4){
		width: 148px;
	}
	.orderUp{
		background:#EEEEEE;
		padding: 16px 30px 0px;
		
	}
	.up{
		border-bottom: 1px solid #D5D5D5;
		padding-bottom:12px;
	}
	.upLeft{
		float: left;
		width: 470px;
	}
	.upImg{
		width: 150px;
		height: 150px;
		float: left;
	}
	.upImg img{
		width: 100%;
		height: 100%;
	}
	.upName{
		float: left;
		width: 270px;
		padding: 40px 0 30px 20px;
		line-height: 28px;
		
		
	}
	.ji{
		float: left;
		width: 210px;
		line-height: 150px;
		color: #FC7988;
	}
	.upnumBox{
		float: left;
		width: 180px;
		
		border: 1px solid #BDBDBD;
		margin:56px 0;
	}
	.upCount{
		float: left;
		width: 140px;
		line-height: 150px;
		color: #FC7988;
		text-indent: 20px;
		padding-left: 60px;
	}
	.upReduce{
		display: inline-block;
		width: 38px;
		height: 36px;
		text-align: center;
		line-height: 36px;
		cursor: pointer;
	}
	.upAdd{
		display: inline-block;
		width: 38px;
		height: 36px;
		text-align: center;
		line-height: 36px;
		cursor: pointer;
	}
	.upNum{
		width: 90px;
		height: 36px;
		text-align: center;
		line-height: 36px;
		border-left: 1px solid #BDBDBD;
		border-right: 1px solid #BDBDBD;
		
	}
	.downlabel{
		float: left;
		line-height: 60px;
		width: 100px;
	}
	.remark{
		float: left;
		width: 950px;
		margin: 12px 0;
		/*line-height: 35px;*/
		text-indent: 2rem;
		border-radius: 5px;
		-webkit-border-radius: 5px;
		-moz-border-radius: 5px;
	}
	.totleBox{
		margin-top: 35px;
		
	}
	.totleLeft{
		float: right;
		line-height: 36px;
	}
	.totleBtn{
		float: right;
		width: 130px;
		height: 36px;
		line-height: 36px;
		text-align: center;
		background: #FC7988;
		color: #fff;
		font-size: 20px;
		cursor: pointer;
	}
	.totleTitle{
		color: #000000;
		font-size: 20px;
		margin-right: 30px;
	}
	.totle{
		font-size: 20px;
		color: #FC7988;
		margin-right:100px ;
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
		text-align: center;
		border-radius: 5px;
		-moz-border-radius: 5px;
		-webkit-border-radius: 5px;
	}
	.paypass{
		margin:55px 0;
	}
	.pay{
		margin-top: 20px;
	}
	.add_address{
		width:800px ;
		height: 520px;
		background: #fff;
		position: absolute;
		top: 50%;
		left: 50%;
		margin:-290px 0 0 -400px;
		z-index: 20;
		padding: 20px 20px 0 20px;
		border-radius: 5px;
		-webkit-border-radius:5px;
		-moz-border-radius:5px;
		box-shadow: 0 0 1px #000000;
	}
	.site_close{
		float: right;
		width: 12px;
		height: 12px;
		background: url(../assets/image/guanbi.png) no-repeat 0 0;
		cursor: pointer;
	}
	.siteTitle{
		text-align: center;
		font-size: 20px;
		margin:20px 0;
	}
	.color{
		color: #f00;
		margin: 10px;
	}
	.inputsite{
		width: 300px;
		margin-top: 30px;
	}
	.moaddress{
		margin:50px 0 0 100px;
	}
	.addressBtn{
		width:150px ;
		height: 36px;
		line-height: 36px;
		text-align: center;
		color: #fff;
		background:#FC7988;
		margin:40px auto 0;
			border-radius: 5px;
		-webkit-border-radius: 5px;
		-moz-border-radius: 5px;
		cursor: pointer;
	}
	.editAdd{
		float: right;
		font-size: 14px;
		color: #8C8C8C;
	}
	.editAdd span{
		border: 1px solid #FC7988;
		color: #FC7988;
		line-height: 30px;
		padding:5px 10px;
		border-radius: 5px;
		-webkit-border-radius: 5px;
		-moz-border-radius: 5px;
		cursor: pointer;
	}
</style>