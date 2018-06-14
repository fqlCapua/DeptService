<template>
	<div class="solveDebtSuccess">
		<div class="dec-result">
			<div class="successfully">
				<div class="successfully-pic"><img src="../assets/images/bd.png" /></div>
				<div class="text">提交成功</div>
				<div class="hint">您的解债方案已提交平台审核，请耐心等待1—2个工作日</div>
				<div class="link"></div>
			</div>
			<div class="submitInfoBox">
				<ul class="infoList">
					<li v-for="(item,index) in infoList">
						<span class="title_common">
							{{item.title}}
						</span>
						<span class="info_common">
							{{item.info}}
						</span>
					</li>
				</ul>

				<ul class="planCompute">
					<li v-for="(item,index) in palnCompute">
						<span class="title_common">
							{{item.title}}
						</span>
						<span class="info_common">
							{{item.price}}
						</span>
						<span class="dw_common">
							{{item.dw}}
						</span>
					</li>

				</ul>
				<ul class="dyPrice">
					<li v-for="(item,index) in dyPrice">
						<span class="title_common">
							{{item.title}}
						</span>
						<span class="info_common">
							{{item.price}}
						</span>
						<span class="dw_common">
							{{item.dw}}
						</span>
					</li>
				</ul>

			</div>

			<div class="submit" @click="submit()">返回首页</div>
		</div>
	</div>

</template>

<script>
	export default {
		name: 'solveDebtSuccess',
		data() {
			return {
				token:'',
				debt_id:'',
				case_tag:'',
				name:'',
				infoList: [{
						title: '解债名称',
						info: ''
					},
					{
						title: '解债方案',
						info: ''
					},
					{
						title: '解债周期',
						info: ''
					},

				

				],
				palnCompute: [
					{
						title: '解债规模',
						price: '',
						dw:'万元'
					},
					{
						title: '方案计算',
						price: '',
						dw: 'USDT'
					},
					{
						title: '',
						price: '',
						dw: '债权(万元)'
					},
					{
						title: '',
						price: '',
						dw: '服务费(USDT)'
					},
				],
				dyPrice:[
				   {
				   	title:'抵押方式',
				   	price:'',
				   },
				   {
				   	title:'支付金额',
				   	price:'',
				   	dw:'USDT'
				   }
				]
			}
		},
		mounted() {
			this.$bus.$emit('pageHead', {
				leftShow: true,
				title: '提交结果'
			});
			this.show()
		},
		destroyed() {
			this.$bus.$emit('pageHead');
		},
		methods: {
			submit() {
				this.$router.push("/");
			},
			show() {
				this.axios.post('useCase', {
					token:localStorage.getItem('token'),
					case_tag: this.$route.query.case_tag,
					amount : this.$route.query.amount,
					usdt_tag:this.$route.query.usdt_tag,
					code:this.$route.query.code,
					debt_id: this.$route.query.debt_id,
					name: this.$route.query.name,
					guaranty: this.$route.query.guaranty,
				}).then(({
					data
				}) => {
     				this.infoList[0].info = this.$route.query.name;
					this.infoList[1].info = this.$route.query.comment;
					this.infoList[2].info = this.$route.query.months;
					this.palnCompute[0].price = this.$route.query.amount;
					this.palnCompute[1].price = this.$route.query.usdt;
					this.palnCompute[2].price = this.$route.query.dept;
					this.palnCompute[3].price = this.$route.query.service;
					this.dyPrice[1].price = this.$route.query.zfje;
					console.log(this.$route.query.guaranty);
					if(this.$route.query.guaranty == 1){
						this.dyPrice[0].price = '无担保抵押'
					}else if(this.$route.query.guaranty == 2){
						this.dyPrice[0].price = '珠宝抵押'
					}else{
						this.dyPrice[0].price = '房产抵押'
					}
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.solveDebtSuccess {
		padding: 50px 0;
		.dec-result {
			.successfully {
				height: 495px;
				background: #fff;
				border-radius: 10px;
				text-align: center;
				padding-top: 102px;
				position: relative;
				border-bottom: 1px dashed rgb(237, 237, 237);
				.successfully-pic {
					width: 181px;
					height: 200px;
					margin: 0 auto 48px;
					img {
						max-width: 100%;
					}
				}
				.text {
					font-size: 34px;
					color: #57a1fd;
					margin-bottom: 30px;
				}
				.hint {
					font-size: 24px;
					color: #b2b2b2;
				}
				.link {
					position: absolute;
					left: 0;
					bottom: -18px;
					width: 100%;
					display: flex;
					justify-content: space-between;
					&:before {
						display: block;
						content: "";
						width: 0;
						height: 0;
						border-top: 18px solid transparent;
						border-left: 18px solid #f5f4f7;
						border-bottom: 18px solid transparent;
					}
					&:after {
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
			.list-tab {
				height: auto;
				background: #fff;
				border-radius: 10px;
				padding: 38px 72px 24px 76px;
				margin-bottom: 139px;
				li {
					display: flex;
					background: #fff;
					margin-bottom: 28px;
					.floatLeft {
						float: left;
						color: #808080;
						font-size: 26px;
						width: 136px;
						margin-right: 145px;
					}
					.floatRight {
						word-break: break-all;
						float: right;
						width: 300px;
						font-size: 24px;
						color: #ff9800;
					}
				}
			}
			.submit {
				width: 590px;
				height: 87px;
				line-height: 87px;
				background: #2d8afd;
				color: #fff;
				font-size: 34px;
				text-align: center;
				margin: 0 auto;
				border-radius: 10px;
			}
			.submitInfoBox {
				/*height: 275px;*/
				background: #fff;
				padding: 35px 65px;
				margin-bottom: 46px;
				.infoList{
					margin: 0 auto;
					li {
						margin-bottom: 21px;
						width: 550px;
						display: flex;
						justify-content: space-between;
						.title_common {
							display: inline-block;
							width: 200px;
							font-size: 26px;
							color: rgb(121, 121, 121);
						}
						.info_common {
							width: 460px;
							text-align: left;
							color: rgb(255, 165, 47);
							font-size: 26px;
						}
					}
				}
				.planCompute {
					li {
						margin-bottom: 21px;
						width: 600px;
						.title_common {
							display: inline-block;
							width: 160px;
							font-size: 26px;
							color: rgb(121, 121, 121);
						}
						.info_common {
							width: 460px;
							text-align: left;
							color: rgb(255, 165, 47);
							font-size: 26px;
						}
					}
					.dw_common {
						float: right;
						color: rgb(255, 165, 47);
					}
				}
				.dyPrice{
					li{
						margin-bottom: 21px;
						width: 600px;
						
							.title_common {
							display: inline-block;
							width: 160px;
							font-size: 26px;
							color: rgb(121, 121, 121);
						}
						.info_common {
							width: 460px;
							text-align: left;
							color: rgb(255, 165, 47);
							font-size: 26px;
						}
							.dw_common {
						float: right;
						color: rgb(255, 165, 47);
					}
					}
				
				}
			}
		}
	}
</style>