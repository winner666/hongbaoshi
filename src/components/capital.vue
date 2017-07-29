<template>
	<div class="capital">
		<div class="passHead clear">
			<div class="img" @click='indexback'><img src="../assets/image/logo1.png" alt="" /></div>
			<span class="setWord">资金明细</span>
		</div>
		<div class="passBox">
			
				<div class="look clear">
					<div>
						  <el-date-picker v-model="value4" type="daterange" align="right" placeholder="选择日期范围" :picker-options="pickerOptions2"> </el-date-picker>
					</div>
					
					<div>
						<el-button size="small" class="query" @click="query()">查询</el-button>
					</div>   				
				</div>
				<div class="">
					<el-table :data="tableData3"  border style="width: 100%">
						<el-table-column prop="date" label="转账时间" >
						</el-table-column>
						<el-table-column prop="money" label="转账金额">
						</el-table-column>
						<el-table-column prop="type" label="转账类型" >
						</el-table-column>
						<el-table-column prop="card" label="银行" >
						</el-table-column>
						<el-table-column prop="supMoney" label="可用余额">
						</el-table-column>
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
	

	export default {
		name: 'capital',
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
				
				
				ajax({
					type: "post",
					url: http + "wallet/getUserWalletRecord",
					data: JSON.stringify({
								"sessionKey":sessionKey,
								
								"currentPage": page,
								"pageSize": 15,
								"createTime": that.startTime,
								"endTime": that.endTime,
								
					}),
					success: function(res) {
						var obj = JSON.parse(res);
						console.log(obj)
						var resultList = obj.resultList;
						var freeArray = [];
						that.totle=obj.total
						//console.log(resultList)

						
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