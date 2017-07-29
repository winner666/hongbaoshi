<template>
	<div id="header">
			<div class="title clear"> 
    
        <div class="logo logo2" @click='backFirst'><img src="../assets/image/logo2.png" alt=""></div>
        <div class="shopName1" @click="order()">红宝石商城</div>
        <div class="topright">
        	<span @click="daili()" class='daili' v-show="isDaili">我的代理</span> 
          <span class="userName"><em></em>{{nameUser}}</span>
          <!--<span class='phone'>手机版
              
          </span>-->
          <span><em>XIMI币：</em><em>{{fencount}}</em></span>
          <span class="us"  @click='myorder()'>我的订单
             
          </span>
          <span class="talk ">客服电话：400-820-5678</span>
          
        </div>
    </div> 
	</div>
</template>
<script>
	export default{
		name:'header',
		data(){
			return{
				nameUser:'',
				fencount:'',
				isDaili:false
			}
		},
		mounted(){
			this.header();
			this.getWalletByUser()
		},
		methods:{
			getWalletByUser(){
        var that=this
        if(objAgency==120){
					that.isDaili=true;
				}else{
					that.isDaili=false;
				}
				
				ajax({
          type:"post",
            url: http + "wallet/appGetWalletByUser",          
            data: JSON.stringify({
              "sessionKey":sessionKey
            }),
            success:function(res){
              var res=JSON.parse(res);
             // console.log(res)
              if(res.code==200){
                that.fencount=res.obj.shopMoney
              }else if(res.code==201){
                  location.href = url + "xs_login.html"
              } 
            }
          })

			},
			header(){
				this.nameUser=userName;				

			},
			 order(){
    			this.$router.push({path:'/shop'})
   			},
   			myorder(){
   				this.$router.push({path:'/myorder'})
   			},
   			helpecenter(){
   				this.$router.push({path:'/help'})
   			},
   			backFirst(){
   				this.$router.push({path:'/one'})
   			},
        daili(){
          location.href=url+'xs-userList.html'
        }
		}
		
	}
</script>
<style>
	  .title{
     	width: 1130px;
     	margin:0 auto;
      line-height: 90px; 
      color: #fff;
    font-size: 14px;

    }
  .logo{
    float: left;
  }
  .logo2 img{
    width:80px;
    height: 80px;
    cursor: pointer;
  }
  .shopName1{
    float: left;
    color: #fc7988;
    font-size: 18px;
    margin-left: 50px;
    cursor: pointer;
  }
  .topright{
  float: right;
  color: #2c2c2c;
}
.topright span{
  margin-right: 20px;
}
.us{
  position: relative;
  cursor: pointer;
}

.myOrder{
  width: 130px;
  height: 60px;
  position:absolute;
  top:40px;
  left: -30px;
  display:none;
  z-index: 20;
   background: #fff;
  /*background:*/ 
  border-radius: 5px;
}
.san{
  width:0;    
height:0;   
border:10px solid transparent;    
border-bottom-color:#fff;
position: absolute;
top: -20px;
left: 30px;
}

.myOrder ul{
    
}
.myOrder li{
  cursor: pointer;
  line-height: 30px;
  height: 30px;
  padding:0 10px;

}
.myOrder li:hover{
  cursor: pointer;
  line-height: 30px;
  height: 30px;
  background: #f1f1f1;

}
.myOrder li:nth-child(1){
 border-bottom: 1px solid #f1f1f1;
}
.usOrder{
  cursor: pointer;
}
.daili{
    cursor: pointer;
  }
</style>