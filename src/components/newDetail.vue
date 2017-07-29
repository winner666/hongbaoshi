<template>
	<div class="newDetail">
		<v-header></v-header>
		<div class="newsDetailBox">
			<div class="width">
				<iframe id='ifr' frameborder=0 width="100%" height=100% marginheight=0 marginwidth=0 scrolling=no src=""></iframe>
			</div>
		</div>
		
		
	</div>
</template>

<script>
	import header from './shophead'
	export default {
		name: 'newDetail',
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
				
				parseInt(this.$route.query.newsurl);
				
				document.getElementById('ifr').src=this.$route.query.newsurl;
			}
		}
	}
</script>

<style>
	.newDetail{
		width: 100%;
		height: 100%;
	}
	.newsDetailBox{
		min-height: 10px;
		border-top: 10px solid #fde5e8;
	}
</style>