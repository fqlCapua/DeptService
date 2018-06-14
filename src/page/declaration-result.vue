<template>
	<div class="dec-result-wrap">
		<div class="dec-result">
			<div class="successfully">
				<div class="successfully-pic"><img src="../assets/images/bd.png"/></div>
				<div class="text">提交成功</div>
				<div class="hint">您的解债方案已提交平台审核，请耐心等待1—2个工作日</div>
				<div class="link"></div>
			</div>
			<ul class="list-tab">
		       <li v-for="(item,index) in list" :key="index" class="clearfloat">
		         <div class="floatLeft">{{item.name}}</div>
		         <div class="floatRight">{{item.cont}}</div>
		       </li>
		    </ul>
		    <div class="submit" @click="submit()">返回首页</div>
		</div>
	</div>
</template>

<script>
  export default {
    name: 'declarationResult',
    data () {
      return {
          telname:{tel:'18612158960'},
          list:[
            {name:'方案名称',cont:'油卡积分解债'},
            {name:'解债内容',cont:'50%USDT+50%债权=100%DCC价值转让'},
            {name:'解债周期',cont:'6个月'},
          ]
      }
    },
    mounted () {
    	this.$bus.$emit('pageHead', '报单结果');
  	},
  	destroyed () {
    	this.$bus.$emit('pageHead');
  	},
    methods: {
 		submit(){
 			this.$router.push({path:'index' })
 		}
    },
    components: {
    }
  }
</script>

<style lang="scss" scoped>
	.dec-result-wrap{
		padding:100px 20px 0;
		.dec-result{
			margin-top:10px;
			.successfully{
				height:569px;
				background: #fff;
				border-radius: 10px;
				border-bottom: 1px dashed #ebebeb;
				text-align: center;
				padding-top:102px;
				position: relative;
				.successfully-pic{
					width:181px;
					height:200px;
					margin:0 auto 48px;
					img{
						max-width: 100%;
					}
				}
				.text{
					font-size: 34px;
					color: #57a1fd;
					margin-bottom: 30px;
				}
				.hint{
					font-size: 24px;
					color: #b2b2b2;
				}
				.link{
					position:absolute;
					left:0;
					bottom:-18px;
					width:100%;
					display: flex;
					justify-content:space-between;
					&:before{
						display: block;
						content: "";
						width: 0;
					    height: 0;
					    border-top: 18px solid transparent;
					    border-left: 18px solid #f5f4f7;
					    border-bottom: 18px solid transparent;
					}
					&:after{
						display: block;
						content: "";
						width: 0;
					    height: 0;
					    border-top: 18px solid transparent;
					    border-right: 18px solid #f5f4f7;
					    border-bottom: 18px solid transparent;
					}
				}
			}
			.list-tab{
				height:auto;
			   	background: #fff;
			   	border-radius: 10px;
			   	padding:38px 72px 24px 76px;
			   	margin-bottom: 139px;
			    li{
			      display: flex;
			      background: #fff;
			      margin-bottom: 28px;
			      .floatLeft{
			        float:left;
			        color:#808080;
			        font-size:26px;
			        width:136px;
			        margin-right: 145px;
			      }
			      .floatRight{
			        word-break:break-all;
			        float:right;
			        width:300px;
			        font-size:24px;
			        color:#ff9800;
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
				margin:0 auto;
				border-radius: 10px;
			}
		}
	}
</style>
