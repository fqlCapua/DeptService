<template>
	<div class="solution">
		<div class="choose">
			<ul class="choose-list">
				<li v-for="(item,index) in list" @click="choose(index)" :class="item.check?'active':''">{{item.text}}</li>
			</ul>
		</div>		
		<div class="solution-title">请选择解债方案，便于债务链匹配 (个人信息我们会严格保密)</div>
		<div class="solution-debt">
			<div class="debt-box">
				<div class="debtor">
					<div class="portrait"><img :src="info.head"/></div>
					<div class="name">{{info.name}}</div>
					<div class="address">{{info.address}}</div> 
				</div>
				<div class="debt-content">
					<div class="zhaishi">
						<span>{{info.sum}}</span>
						<span>债务金额</span>
					</div>
					<div class="debt-type">
						<span>{{info.type}}</span>
						<span>解决方案</span>
					</div>
					<div class="debt-type">
						<span>{{info.phone}}</span>
						<span>解决方案</span>
					</div>
				</div>
			</div>
			<div class="debt-list">
				<div class="bank">
					<div class="name">债行</div>
					<div class="con">
						<div class="head"><img :src="debt.bankImg"/></div>
						<span>{{debt.bank}}</span><i class="iconfont icon-jiantou"></i>
					</div>
				</div>
				<div class="division">
					<div class="name">解债师</div>
					<div class="con">
						<div class="head"><img :src="debt.head"/></div>
						<span>{{debt.division}}</span><i class="iconfont icon-jiantou"></i>
					</div>
				</div>
				<div class="service">
					<div class="name">服务费</div>
					<div class="con">
						<span v-if="type==0">￥{{debt.service}}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="submit" @click="submit">预约</div>
	</div>
</template>

<script>
  export default {
    name: 'personal',
    data () {
      return {
      	list:[
      		{text:'VIP',check:true},
      		{text:'免费',check:false}
      	],
      	info:{
      		head:require('../assets/images/toux.png'),
      		name:'安琪',
      		address:'郑东新区东风南路创业路',
      		sum:'22万',
      		type:'油卡积分解债',
      		phone:'158****5241',      		
      	},
      	debt:{
      		bankImg:require('../assets/images/12.png'),
      		bank:'河南众志债事商业服务有限公司',
      		head:require('../assets/images/tou.png'),
      		division:'安琪',
      		service:'399.00'
      	},
		type:0
      }
    },
    mounted () {
    	this.$bus.$emit('pageHead','选择解债方案');
  	},
  	destroyed () {
    	this.$bus.$emit('pageHead');
  	},
    methods: {
    	choose(index){
    		for(var i=0;i<this.list.length;i++){
    			this.list[i].check=false;
    		}
    		this.list[index].check=true;
 			if(this.type==index){
 				this.debt.service='399.00';
 			}else{
 				this.debt.service='0.00';
 			}
    	},
    	submit(){
    		this.$router.push('pay')
    	}
    },
    components: {
    }
  }
</script>

<style lang="scss" scoped>
	.solution{
		padding-top:100px;
		.choose{
			background: #FFFFFF;
			padding:12px 0;
			margin-top:1px;
			.choose-list{
				width:318px;
				height:57px;
				margin:0 auto;
				display: flex;
				border:1px solid #2d8afd;
				border-radius: 10px;
				li{
					width:50%;
					text-align: center;
					line-height: 59px;
					color:#2d8afd;
				}
				.active{
					background: #2d8afd;
					color:#FFFFFF;
				}
			}
		}
		.solution-title{
			padding:0 20px;
			color: #808080;
			line-height: 54px;
			font-size: 20px;
		}
		.solution-debt{
			padding:0 20px;
			.debt-box{
				background: #FFFFFF;
				border-radius: 10px;				
				margin:52px 0 14px;
				position:relative;	
				padding:0 10px;			
				.debtor{					
					text-align: center;
					border-bottom:1px dashed #e6e6e6;
					.portrait{
						position: absolute;
						left:50%;
						top:-50px;
						width:98px;
						height:98px;
						margin-left: -44px;
						img{
							max-width: 100%;
						}
					}
					.name{
						padding-top: 65px;
						font-size: 30px;
						color:#173a64;
					}
					.address{
						padding:7px 0 30px;
						font-size: 26px;
						color:#bdbdbd;
					}
				}
				.debt-content{
					padding:22px 0;
					display: flex;
					justify-content: space-between;
					align-content: center;
					div{
						width:33.3%;
						font-size: 24px;
						color:#bdbdbd;
						text-align: center;
						span{
							display: block;
							&:first-child{
								font-size: 28px;
								color:#ff9800;
								margin-bottom: 12px;
							}
						}
					}
				}
			}
			.debt-list{
				background: #FFFFFF;
				border-radius: 10px;
				padding:0 10px;
				div{
					height:90px;
					line-height: 90px;
					color: #333333;
					font-size: 28px;					
					display: flex;
					justify-content: space-between;
					border-bottom: 1px solid #f5f4f7;
					.name{
						padding-left: 16px;
					}
					span{						
						color: #4c4c4c;
						font-size: 24px;
						margin-right: 16px;
					}
				}
				.bank{
					.head{
						width:37px;
						height:30px;
						margin-top:35px;
						margin-right: 10px;
						overflow: hidden;
						img{
							max-width:100%;
							//height:100%;
						}
					}
					
				}
				.division{
					.head{
						width:45px;
						height:45px;
						margin-top:22px;
						margin-right: 18px;
						overflow: hidden;
						border-radius: 50%;
						img{
							max-width:100%;
							//height:100%;
						}
					}					
				}
				.service{
					span{
						color: #fa4461;
						font-size: 28px;
					}
				}
			}
		}
		.submit{
			width:590px;
			height:87px;
			line-height:87px;
			background: #2d8afd;
			color: #fff;
			font-size: 34px;
			text-align: center;
			margin:252px auto 0;
			border-radius: 10px;
		}
	}
</style>
