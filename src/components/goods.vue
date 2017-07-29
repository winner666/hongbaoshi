<template>
	<div class="goods width">
		<ul class="goodsTitle clear">
			<li  v-for='(nav,navIndex) in navList' :class="{goodsActive:navshow==navIndex}"@click='goodsList(nav.typeId,navIndex)'>{{nav.name}}</li>
			
		</ul>
		<div class="goodsList clear">
			<div class="goodsItem" v-for='(itemList,index) in goodsItemList' :key="index" @click="detailgo(itemList.goodsId)">
				<!--<router-link v-bind:to='{path:"/detail",query:{shopId:itemList.goodsId}}'>-->
					<div class="goodsImg">
						<img :src="itemList.src"/>
					</div>
					<div class="goodsName">{{itemList.name}}</div>
					<div class="integral">{{itemList.price}}XIMI币</div>
					<div class="goodsBtn" @click.stop='extract(itemList.goodsId)'>立即提取</div>
				<!--</router-link>-->
			</div>
			
				
		</div>
		<div>
			<el-pagination
			      @size-change="handleSizeChange"
			      @current-change="handleCurrentChange"
			      :current-page.sync="currentPage1"
			      :page-size="8"
			      layout="total, prev, pager, next"
			      :total="+totalsize">
    		</el-pagination>
		</div>
	</div>
</template>

<script>
	export default{
		name:"goods",
		data(){
			return{
				goodsItemList:'',
				navList:'',
								
				navshow:0,
				 currentPage1: 1,
			 	 totalsize:'',
			 	 page:1,
			 	 sizeId:'',
			}
		},
		mounted:function(){
			this.nav();
			this.goodsList(1,0);
			
		},
		updated:function(){		
			var that=this;			
		},
		methods:{
			handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
      	//console.log(val)
      	this.size=val;
      	this.goodsList(this.sizeId,this.navshow,val)
       // console.log(`当前页: ${val}`);
      },
			goodsList(id,index,page){
				console.log(id,index)
			
	             var that = this;
	             	that.navshow=index;
	             	that.sizeId=id;
	             ajax({
					type:"post",
						url: http + "goods/findGoods",					
						data: JSON.stringify({
							"typeId":parseInt(id),
							 "page":page,
							 "size":8,
						}),
						success:function(res){							
							var obj=JSON.parse(res).obj;
							//console.log(obj)
							that.totalsize=parseInt(JSON.parse(res).total);
	         			   that.goodsItemList=obj;
	         			   that.goodsItemList.forEach(function(item){
	         			   		if(item.goodsImgs.length && Array.isArray(item.goodsImgs)){
	         			   			item.src = item.goodsImgs[0].src
	         			   		}
	         			   })
	         			 //  	console.log(that.goodsItemList)	         				         			
						}	             
	           })     
			},
			detailgo(index){
				this.$router.push({path:'/detail',query:{shopId:index}})
			},
			extract(index){
				this.$router.push({path:'/order',query:{shopId:index}})
			},
			nav(){
				var that=this;
				 ajax({
					type:"post",
						url: http + "goods/getGoodsType",					
						data: JSON.stringify({
							"typeId":null,
							 "page":1,
							 "size":1000000,
						}),
						success:function(res){							
							var obj=JSON.parse(res).obj;
							//console.log(obj)
							if(obj.length!=0){
								that.navList=obj;
							}
	         			   //that.goodsItemList=obj;
	         			 
	         			//console.log(that.goodsItemList)
						}	             
	          })     				
			}
		}
	}
</script>

<style scoped>
	.goodsTitle{
		margin:10px 0 20px;
	}
	.goodsTitle li{
		float: left;
		height: 48px;
		line-height: 48px;
		width: 100px;
		text-align: center;
		cursor: pointer;
	}
	.goodsItem{
		width: 260px;
		float: left;
		margin-right: 30px;
		margin-bottom: 40px;
		cursor: pointer;
		
	}
	.goodsItem:nth-child(4n){
		margin-right: 0;
	}
	.goodsImg{
		height: 260px;
		border:1px solid #ddd; 
	}
	.goodsImg img{
		width: 100%;
		height: 100%;
	}
	.goodsName{
		margin-top: 5px;
		line-height: 30px;
		height:60px;
		overflow: hidden;
	}
	.integral{
		color: #FC7988;
		line-height: 35px;
	}
	.goodsBtn{
		line-height: 38px;
		color: #fff;
		text-align: center;
		height: 38px;
		background: #FC7988;
	}
	.goodsActive{
		background: #FC7988;
		color: #fff;
	}
</style>