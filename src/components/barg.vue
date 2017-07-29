<template>
	<div class="barg">
		<div class="passHead clear">
			<div class="img" @click='indexback'><img src="../assets/image/logo1.png" alt="" /></div>
			<span class="setWord">我的操作交易记录</span>
		</div>
		<div class="passBox">
			
				<div class="look clear">
					<div>
						  <el-date-picker v-model="value4" type="daterange" align="right" placeholder="选择日期范围" :picker-options="pickerOptions2"> </el-date-picker>
					</div>
					<div> 
						<span style="float: left; line-height: 36px;margin-left: 50px;">成交量：</span>
						<el-input v-model="hand" placeholder="请输入成交量" style="float: left; width: 150px;" min='0' type="number"></el-input>
					</div>
					<div>
						<el-button size="small" class="query" @click="query()">查询</el-button>
					</div>   				
				</div>
				<div class="">
					<el-table :data="tableData3" height="" border style="width: 100%">
					    <el-table-column prop="name" label="名称" ></el-table-column>					    
					    <el-table-column prop="dealSn" label="成交单号" > </el-table-column>					   
					    <el-table-column prop="type" label="买卖"></el-table-column>
					    <el-table-column prop="amount" label="成交金额"></el-table-column>
					    <el-table-column prop="countVol" label="成交量"></el-table-column>
					    <el-table-column prop="feeMoney" label="手续费"></el-table-column>					   
					     <el-table-column prop="profit" label="盈亏"></el-table-column>
					      <el-table-column prop="date" label="成交时间"></el-table-column>
					    
				  </el-table>
				</div>
				<div class="ye">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage1" :page-size="15" layout="total, prev, pager, next" :total="+totle">
   				 </el-pagination> 
				</div>
				   
			
		</div>
		
	</div>
</template>

<script>
	import header from './head'

	export default {
		name: 'barg',
		data() {
			return {
				 pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        		value4: '',
        		tableData3: [],	
        		hand:'',//手数
        		startTime:'',//开始时间
        		endTime:'',//结束时间
        		 currentPage1: 1,
        		 totle:'',
        		 page:1,
        		 
			       
			}
		},
		components:{
			'v-header':header,
			
		},
		mounted: function() {
			this.tableList(this.page)
		},
		methods: {		
			indexback(){
				this.$router.push({path: '/one'})	
			},
			  handleSizeChange(val) {
		        //console.log(`每页 ${val} 条`);
		      },
		      handleCurrentChange(val) {
		      	this.currentPage1=val
		        //console.log(`当前页: ${val}`);
		        this.tableList(val)
		      },
			query(){
				//console.log(this.value4)
				var date=new Date()
				if(this.value4[0]==null){
					this.startTime=''	
				}else{
					this.startTime=date.getTime(this.value4[0]);
				}
				if(this.value4[1]==null){
					this.endTime=''
				}else{
					this.endTime=date.getTime(this.value4[1]);
				}
				
				//console.log(this.startTime,this.endTime);
				this.tableList(this.page)
			},
			tableList(page){
				const that=this;
				//console.log(sessionKey,that.startTime,that.endTime,that.hand)
				ajax({//
						type:"post",
							url: http + "deal/getOverDeal",					
							data: JSON.stringify({
								"sessionKey":sessionKey,
								
								"currentPage": page,
								"pageSize": 15,
								"startTime": that.startTime,
								"endTime": that.endTime,
								"countVol":that.hand,
								
							}),
							success:function(res){
								var res=JSON.parse(res);
								//console.log(res)
									var resultList=res.resultList;
									//console.log(resultList)
									that.totle=res.total;
									var arr=[];
									//if(resultList.length != 0){
										for(let i = 0; i < resultList.length; i++) {
											var obj={};
											var newDate = new Date();
											var createTime = resultList[i].createTime
											newDate.setTime(createTime);			
											obj.date = newDate.format('yyyy-MM-dd hh:mm:ss');
											obj.name=resultList[i].name;
											obj.dealSn=resultList[i].dealSn;
											if(resultList[i].type==0){
												obj.type='买入'
											}else{
												obj.type='卖出'
											}
											obj.amount=resultList[i].amount;
											obj.countVol=resultList[i].countVol;
											obj.feeMoney=resultList[i].feeMoney;
											obj.profit=resultList[i].profit;
											arr[i]=obj;
										}
										that.tableData3 = arr
										//console.log(that.tableData3 )
									//}
							}
						})
			}
		}
	}
</script>

<style scoped>
	.passHead{
	width: 1130px;
	margin: 10px auto;
}
.passHead .img{
	float: left;
	cursor: pointer;
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
	    border-top: 6px solid #fde5e8;
}
.look{
	width: 750px;
	margin:30px auto ;
}
.look div{
	float: left;
}
.query{
	margin-left: 100px;
}
.ye{
	width: 500px;
	margin:30px auto;
}
</style>