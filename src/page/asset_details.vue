<template>
	<div class="asset-wrap">
		<ul class="asset_details">
			<li>流水号：<span>{{list.content}}</span></li>
			<li>收入：<span>{{list.income}}</span></li>
			<li>类型：<span>{{list.type}}</span></li>
			<li>时间：<span>{{list.date}}</span></li>
			<li class="balance">余额：<span>{{list.balance}}</span></li>
		</ul>
	</div>
</template>

<script>
  export default {
    name: 'personal',
    data () {
      return {     	
  		list:{
  			content:'7465313213215634313',
  			income:'+200.0000',
  			type:'登记发放',
  			date:'2018-02-25 15:20:45',
  			balance:'120.2100'
  		}
      	
      }
    },
    mounted () {
    	this.$bus.$emit('pageHead', '收支明细');
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
	background: #ffffff;
	min-height: 100vh;
    min-width: 100vw;
	overflow: hidden;
	padding-top:100px;
	.asset_details{
		padding:0 20px;		
		border-top:1px solid #f5f4f7;
		li{
			padding-bottom: 56px;
			font-size: 26px;
			color:#999999;
			display: flex;
			justify-content: space-between;
			span{
				font-size: 28px;
				color:#444444;
			}
			&:first-child{
				padding:44px 0 62px;
			}
		}
		.balance{
			span{
				color:#d73535;			
			}			
		}
	}
}
</style>
