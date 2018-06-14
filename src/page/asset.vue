<template>
	<div class="asset-wrap">
		<!-- <ul class="asset-list">
			<li v-for="(item,index) in list">
				<router-link to="assetDetails">
					<div class="asset-con">
						<div class="name">{{item.title}}</div>
						<div class="date">{{item.date}}</div>
					</div>
					<div class="asset-con">
						<div class="balance">{{item.balance}}</div>
						<div class="consume">{{item.consume}}</div>
					</div>
				</router-link>
				
			</li>
		</ul> -->
	</div>
</template>

<script>
  export default {
    name: 'personal',
    data () {
      return {
      	list:[
      		{title:'登记发放',date:'2018-05-14',balance:'余额：200.0000',consume:'-50.4000'},
      		{title:'商城消费',date:'2018-05-14',balance:'余额：200.0000',consume:'-50.4000'},
      		{title:'转入DFKJSLF钱包',date:'2018-05-14',balance:'余额：200.0000',consume:'-50.4000'},
      		{title:'C2C交易',date:'2018-05-14',balance:'余额：200.0000',consume:'+200.4000'}
      	]
      }
    },
    mounted () {
    	this.$bus.$emit('pageHead', '资产记录');
  	},
  	destroyed () {
    	this.$bus.$emit('pageHead');
  	},
    methods: {
 
    },
    components: {
    }
  }
</script>

<style lang="scss" scoped>
.asset-wrap{
	padding-top:100px;
	.asset-list{
		padding:0 10px;
		li{
			border-top:1px solid #eeeff7;
			padding:0 10px;
			background: #fff;
			border-radius: 10px;
			padding-top:32px;
			.asset-con{
				color:#444444;
				font-size: 24px;
				display:flex;
				justify-content: space-between;
				padding-bottom:36px;
				.name{
					font-size: 28px;
					color: #333333;
				}
				.date{
					color:#c0c0c0;
				}
				.consume{
					
				}
			}
		}
	}
	
}
</style>
