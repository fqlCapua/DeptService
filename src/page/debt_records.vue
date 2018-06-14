<template>
	<div class="registration-wrap">
		<ul class="registration">
			<li class="registration-list" v-for="(item,index) in list" @click="skip(index)">
				<!--<router-link :to="{path: 'debtDetails', query: {id: item.id}}">-->
				<div class="corporation">
					<div>
						<span class="icon"></span>
						<span>{{item.com_name}}</span>
					</div>
					<div>
						<span class="icon ren"></span>
						<span>{{item.manager_name}}</span>
					</div>
				</div>
				<div class="registration-info">
					<div class="zhaishi">
						<span>{{item.amount}}</span>
						<span>债事量级</span>
					</div>
					<div class="zhaishi debt-type">
						<span>{{item.Case.name}}</span>
						<span>解债方案</span>
					</div>
					<div class="status">
						<!--<div>{{item.status}}</div>-->
						<!--<div :class="'state'+item.s" v-if="item.s==2">{{item.status_name}}</div>-->
						<div class="chart" style="position: relative;">
							<svg-progress-bar :value="item.status" :options="options" class="svg-chart "  ></svg-progress-bar>
						</div>
					</div>
				</div>
				<!--</router-link>-->
			</li>
		</ul>
	</div>

</template>

<script>
	import Vue from 'vue'
    import vueProgressBar from 'svg-progress-bar'
    Vue.use(vueProgressBar)
export default {

  	name: '',
  	data () {
	    return {
	        id:'',
	      	list: [
		        {
					cor:'龙凤债事有限公司',
					jzs:'解债师安娜',
					value:'45万',
					order:'债事量级',
					type:'油卡积分解债',
					plan:'解债方案',
					state:'75',
           			s:1,
					id:1,
//					router:'debtDetails'
		        },
		        {
		      cor:'龙凤债事有限公司',
					jzs:'解债师安娜',
					value:'45万',
					order:'债事量级',
					type:'债事积分解债',
					plan:'解债方案',
					state:'待审核',
           s:2,
					id:2,
					router:''
		        },
		        {
		      cor:'龙凤债事有限公司',
					jzs:'解债师安娜',
					value:'45万',
					order:'债事量级',
					type:'债事积分解债',
					plan:'解债方案',
					state:'100',
					s:1,
          id:3,
					router:''
		        },
		        {
		      cor:'龙凤债事有限公司',
					jzs:'解债师安娜',
					value:'45万',
					order:'债事量级',
					state:'查看解债方案', s:2,
					id:4,
					router:'personal'
		        }
	      	],
			radius:'',
	    }
  	},
  	mounted () {
    	this.$bus.$emit('pageHead', '解债记录');
    	//this.list2();
    	this.show();
  	},
  	destroyed () {
    	this.$bus.$emit('pageHead');
  	},
  	methods: {
  		show(){
	      this.axios.post('beiAnList', {
	        token:localStorage.getItem('token'),
	      }).then(({data}) => {
	      	this.list=data.data.creditor;
	      	console.log(this.list)
	      })
  		},
  	    list2(){
          this.axios.post('schemeShow', {
            token:localStorage.getItem("token")
          }).then(({data}) =>{
          })
        },
        skip(index){
        		// this.$router.push({
	        	// 	path: 'debtDetails',
	        	// 	query: {
	        	// 		arrData: {
                 //  id: this.list[index].useCase,
                 //  com_name: this.list[index].com_name,
                 //  manager_name: this.list[index].manager_name,
                 //  amount: this.list[index].amount,
                 //  status: this.list[index].status,
                 //  status_name: this.list[index].status_name,
                 //  name: this.list[index].creditor_uid_data.name
                // }
	        	// 	}
	        	// })

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
  @import '../assets/scss/style.scss';
  .registration-wrap{
  	width:100%;
  	height:100%;
  	background: #f5f4f7;
  }
  .registration{
  	padding:0 20px;
  	padding-top:100px;
  	.registration-list{
  		height:242px;
  		background:#fff;
  		padding:0 30px;
  		margin-top: 15px;
  		border-radius: 10px;
  		text-align: center;
		color: #b2b2b2;
  		.registration-info{
  			display: flex;
  			justify-content: space-between;
  			height:168px;
  			padding-top:45px;
  			border-top: 1px dashed #f5f5f5;
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
				width:45%;
				span{
					&:first-child{
  						font-size:32px;
					  	color:#ff9800;
						margin-bottom:24px;
						overflow: hidden;
					    text-overflow: ellipsis;
					    white-space: nowrap;

  					}
				}
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
  			.status{
  				line-height:80px;
  				font-size: 28px;
				color:#ceb58a;
				background: transparent;
				width: auto;
				height:auto;
				text-align: center;
  			}
  			.state2{
  				line-height:80px;
  				font-size: 28px;
				color:#ceb58a;
				background: transparent;
				width: auto;
				height:auto;
				text-align: center;
  			}
  		}
  		.corporation{
  			display: flex;
  			justify-content: space-between;
  			height:72px;
  			color:#999999;
  			font-size: 24px;
  			line-height: 72px;
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
  	}
  }
</style>
