<template>
	<!--头部-->
	<div class="news">
		<v-header></v-header>
		<div class='newsBox'>
			<div class="width">
				<div class="newsTitle">系统公告</div>
				<ul class="new">
				
					<li class="clear" v-for='(item,index) in newList'>
						<router-link :to="{path:'/newDetail',query:{newsurl:item.url}}">
							
								<span class="text">{{item.title}}</span>
								<span class="time">{{item.date}}</span>
							
						</router-link>
					</li>
			
					
				</ul>
			</div>
		</div>
							
	</div>
		
</template>

<script>
	import header from './shophead'
	export default {
		name: 'news',
		data() {
			return {
				newList:''
			}
		},
		components:{
			'v-header':header,
			
		},
		mounted: function() {
			this.news()
		},
		methods: {
			
			news(){
				var that=this;
				ajax({//消息
					type:"post",
						url: http + "main/getNewsTable",					
						data: JSON.stringify({
							"currentPage":1,
							"pageSize":10000
						}),
						success:function(res){
							//console.log(res)
							var obj=JSON.parse(res);
							
							var resultList=obj.resultList;
							
							var arr=[]
							if(resultList.length!=0){
								that.newList=resultList
								for(let i = 0; i < resultList.length; i++) {
								var obj = {};

								var newDate = new Date();
								var createTime = resultList[i].createTime
								newDate.setTime(createTime);

								obj.date = newDate.format('yyyy-MM-dd hh:mm:ss');
								obj.title=resultList[i].title;
								obj.url=resultList[i].url;
								
								
								arr[i] = obj;
							}
							that.newList = arr;
							console.log(that.newList)
							}
						}				
					})
			}
		}
	}
</script>

<style>
		.newsBox{
			width:10px solid #FEE5E8;   
		}
		.newsTitle{
			text-align: center;
			font-size: 24px;
			margin:20px;
		}
		.new li{
			margin:5px;
		}
		.text{
			float: left;
		}
		.time{
			float: right;
		}
</style>