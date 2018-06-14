<template>
	<div class="credit-line-wrap">
		<div class="banner"></div>
		<div class="header">
			<div class="back iconfont icon-fanhui" @click="$router.back(-1);"></div>
    		<h2 class="title">解债详情 </h2>
		</div>
		<div class="credit-line">
			<div class="registration">
				<div class="registration-list">
					<div class="corporation">
						<div>
							<span class="icon"></span>
							<span>{{arrData.com_name}}</span>
						</div>
						<div>
							<span class="icon ren"></span>
							<span>{{arrData.manager_name}}</span>
						</div>
					</div>
					<div class="registration-info">
						<div class="zhaishi">
							<span>{{arrData.amount}}</span>
							<span>债事量级</span>
						</div>
						<div class="zhaishi debt-type">
							<span>{{arrData.name}}</span>
							<span>债务人</span>
						</div>
						<div class="debt">债务信息详情</div>
					</div>
				</div>
				<ul class="list-tab">
					<div class="title">解债方案</div>
			       	<li class="clearfloat">
				        <div class="floatLeft">方案代码</div>
				        <div class="floatRight">{{List.tag}}</div>
			       	</li>
			       	<li  class="clearfloat">
				        <div class="floatLeft">方案名称</div>
				        <div class="floatRight">{{List.name}}</div>
			       	</li>
			       	<li class="clearfloat">
				        <div class="floatLeft">方案内容</div>
				        <div class="floatRight">{{List.name}}</div>
			       	</li>
			       	<li  class="clearfloat">
				        <div class="floatLeft">手续费</div>
				        <div class="floatRight">{{List.service_amount}}</div>
			       	</li>
			       	<li  class="clearfloat">
				        <div class="floatLeft">解债周期（月）</div>
				        <div class="floatRight">{{List.months}}</div>
			       	</li>
			    </ul>
			    <div class="registration-list debt-rate">
					<div class="title">解债进度</div>
					<div class="registration-info">
						<div class="status">
							<span>审核状态</span>
							<span>{{arrData.status_name}}</span>
						</div>
						<div class="chart" style="position: relative;">
							<svg-progress-bar :value="arrData.status" :options="options" class="svg-chart" id="qq" ></svg-progress-bar>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
  export default {
    name: 'personal',
    data () {
      return {
      	    arrData:{},
	       	list1: {
				cor:'龙凤债事有限公司',
				jzs:'解债师安娜',
				value:'45万',
				order:'债事量级',
				username:'安娜',
				name:'债务人',
				debt:'债务信息详情'
	       	},
	       	List:[
	       		{name:'方案名称',cont:'油卡积分解债'},
	            {name:'方案内容',cont:'50%USDT+50%债权=100%DCC价值转让'},
	            {name:'手续费',cont:'￥2000.00元'},
	            {name:'返还方式',cont:'一次性'},
	            {name:'解债周期（月）',cont:'  18个月'},
	       	],
	       	rate:{
	       		name:'审核状态',
	       		type:'已通过',
	       		state:'100',
	       	}
      }
    },
    mounted () {
    	//this.$bus.$emit('pageHead', '债行');
    	this.debt();
  	},
  	destroyed () {
    	//this.$bus.$emit('pageHead');
  	},
    methods: {
		debt(){
			let $that=this;
		  	$that.token=localStorage.getItem('token');
		  	$that.arrData=$that.$route.query.arrData;
		    this.axios.post('debtSolutions', {
		        token: $that.token,
		        id:$that.arrData.id
		    }).then(({data}) => {
		      	$that.List=data.data;
		      	console.log($that.List)
		    })
		}
    },
    computed: {
      	options: function () {
        	return {
	        	radius:20,
	            text: function (value) {
	                return this.htmlifyNumber(value) + '<span style="font-size:9px;color:#4c4c4c;">%</span>';
	            },
	            textColor:'#4c4c4c',
	            pathColors:['#b0b2ae','#519dfc'],
	            varyStrokeArray:[2,4],
	            duration: 0,
	            circleLinecap:'round'
        	}
      	}
   	}
  }
</script>

<style lang="scss" scoped>
.credit-line-wrap{
	width: 100%;
	height:100%;
	position: relative;
	.banner{
		position: fixed;
	    top: 0;
	    left: 0;
	  	width:100%;
	  	height: 380px;
	  	background:url(../assets/images/1.png) no-repeat left top;
	    background-size: 100% 100%;
	}
	.header{
	    position: fixed;
	    top: 0;
	    left: 0;
	    width: 100%;
	    height: 100px;
	    background:transparent;
	    text-align: center;
	    z-index: 10;
	    .back {
		    position: absolute;
		    top: 0;
		    left: 0;
		    width: 14%;
		    height: 100px;
		    line-height: 100px;
		    font-size: 40px;
		    color: #fff;
	    }
	    .title {
	      	font-size: 34px;
	      	font-weight: 400;
	      	line-height: 100px;
	      	color: #FFFFFF;
	    }
	}
	.credit-line{
		position: absolute;
		top:150px;
		left: 0;
		width: 100%;
		//background: #f5f4f7;
		.registration{
		  	padding:0 20px;
		  	.registration-list{
		  		background:#fff;
		  		padding:0 60px;
		  		margin-top: 15px;
		  		border-radius: 10px;
		  		border-bottom-left-radius: 30px;
		  		border-bottom-right-radius: 30px;
		  		text-align: center;
				color: #b2b2b2;
				border-bottom: 1px dashed #f5f5f5;
		  		.corporation{
		  			display: flex;
		  			justify-content: space-between;
		  			height:72px;
		  			color:#999999;
		  			font-size: 24px;
		  			line-height: 72px;
		  			border-bottom: 1px dashed #ebebeb;
					div{
						  display:inline-flex;
					}
					.icon{
						display:block;
						width:29px;
						height:29px;
						margin-top:21.5px;
						margin-right:15px;
						background:url("../assets/images/gongsi.png") no-repeat left top;
						background-size:100% 100%;
					}
					.ren{
						background:url("../assets/images/ren.png") no-repeat left top;
						background-size:100% 100%;
					}
		  		}
		  		.registration-info{
		  			display: flex;
		  			justify-content: space-between;
		  			height:258px;
		  			padding-top:83px;
		  			text-align: center;
		  			.zhaishi{
		  				span{
		  					font-size: 24px;
		  					color: #b2b2b2;
		  					display: block;
		  					&:first-child{
		  						color: #fa4461;
		  						font-size: 40px;
		  						margin-bottom: 16px;
		  					}
		  				}
		  			}
					.debt-type{
						span{
							&:first-child{
		  						font-size:34px;
							  	color:#4c4c4c;
								margin-bottom:24px;
		  					}
						}
					}
					.debt{
						width:168px;
						height:48px;
						margin:24px 0;
						color: #fff;
						line-height: 48px;
						text-align: center;
						background: #ff9800;
						box-shadow:0 3px 3px 3px rgba(255,187,87,.46);
						border-radius: 20px;
					}
					.chart{
						width:99px;
						height:99px;
						padding:13px;
						border-radius: 50%;
						background: #f5f5f5;
						overflow: hidden;
						.svg-chart{
							position: absolute;
							left:50%;
							top:50%;
							width:80px;
							height:80px;
							margin-left:-40px;
							margin-top:-40px;
							svg{
								width:100%!important;
								height:100%!important;
							}
						}
		  			}
				}
		  	}
		  	.list-tab{
				height:auto;
			   	background: #fff;
			   	border-radius: 30px;
			   	padding:38px 72px 24px 76px;
			   	border-bottom: 1px dashed #f5f5f5;
			   	.title{
			   		text-align: center;
			   		font-size: 28px;
			   		color:#81b9ff;
			   		margin-bottom: 58px;
			   	}
			    li{
			      display: flex;
			      justify-content: space-between;
			      background: #fff;
			      margin-bottom: 28px;
			      .floatLeft{
			        float:left;
			        color:#808080;
			        font-size:26px;
			      }
			      .floatRight{
			        word-break:break-all;
					width:300px;
			        font-size:24px;
			        color:#ff9800;
			        text-align: right;
			      }
			    }
			}
			.debt-rate{
				margin-top: 0;
				border-radius: 10px;
				border-top-left-radius: 30px;
				border-top-right-radius: 30px;
				.title{
					border:0;
					text-align: center;
			   		font-size: 28px;
			   		color:#81b9ff;
			   		padding:34px 0 38px;
				}
				.registration-info{
					padding-top: 0;
					height: 170px;
					.status{
						font-size: 28px;
						color: #999999;
						span{
							display: block;
							&:last-child{
								color: #2d8afd;
								font-size: 24px;
								text-align: left;
								margin-top: 24px;
							}
						}
					}
				}
			}
	  	}
	}
}

</style>
