<template>
	<div class="solve_debt">
		<div class="head-top">
			<div class="back iconfont icon-fanhui" @click="$router.back(-1);"></div>
		</div>
		<div class="solveDebt">
			<div class="solveDebt-content">
				<div class="link"></div>
				<ul class="list-tab">
					<li class="clearfix">
						<div class="floatLeft">解债方案</div>
						<div class="floatRight">{{list.comment}}</div>
					</li>
					<li class="clearfix">
						<div class="floatLeft">解债周期</div>
						<div class="floatRight">{{list.months |numFilter}}个月</div>
					</li>
					<li  class="clearfix">
						<div class="floatLeft">{{department.name}}</div>
						<div class="floatRight money" @click="toggle2">
							<input ref="money" class="input widthSpecial" type="number" :placeholder="department.cont" readonly="readonly" v-model="zqgx"> 万元
						</div>
					</li>
					<li  class="clearfix">
						<div class="floatLeft">{{zqgm.name}}</div>
						<div class="floatRight money">
							<input ref="money" @input="output" class="input widthSpecial" type="number" :placeholder="zqgm.cont" v-model="jzgm"> 万元
						</div>
					</li>
					<li class="planCost clearfix">
						<div class="floatLeft">方案计算</div>
						<div class="floatRight">
							<div class="CostBox">
								<div class="costName">{{price.usdt}}</div>
								<div class="costName">USDT</div>
							</div>
							<div class="CostBox">
								<div class="costName">{{price.dept}}</div>
								<div class="costName">债权(万元)</div>
							</div>
							<div class="CostBox">
								<div class="costName">{{price.service}}</div>
								<div class="costName">服务费(USDT)</div>
							</div>
						</div>
					</li>
					<li class="dyfsMargin clearfix">
						<div class="floatLeft">{{other.name}}</div>
						<div class="floatRight" id="choseType" @click="toggle">
							<span class="chooseContent" :class="{'color':isClicked}" v-model="chooseContet">{{chooseContet}}</span>
							<span class="iconfont icon-up-copy-copy chooseBtn"></span>
						</div>
					</li>
					<li class="clearfix">
						<div class="floatLeft">支付金额</div>
						<div class="floatRight" id="choseType">
							<span class="chooseContent blueColor" v-model="zfje">{{zfje}}<i class="dw">USDT</i> </span>
						</div>
					</li>
					<li class="tkmMargin clearfix">
						<div class="floatLeft">提款码</div>
						<div class="floatRight" id="choseType">
							<input class="input" type="text" :placeholder="tkm.cont" v-model="tkma">
						</div>
					</li>
					<li  class="clearfix">
						<div class="floatLeft">图形验证</div>
						<div class="floatRight" id="choseType">
							<input class="input" type="text" placeholder="请输入验证码" v-model="dxyzm"> <span class="yzmBtn"><img :src="img" alt="" width="100%" height="100%" @click="imgShow" class="yz_img"></span>
						</div>
					</li>
					<li  class="clearfix">
						<div class="floatLeft">短信验证</div>
						<div class="floatRight" id="choseType">
							<input class="input" type="text" placeholder="请输入验证码" v-model="phoneYzm">
							<!--<span  @click="getCode">获取验证码</span>-->
							<button class="code_button" @click="getCode">{{ codeTime === 61 ? '获取验证码' : `${codeTime}s后重试`}}</button>
						</div>
					</li>
					<!--<div class="subBox">-->
						<!--<div class="submit" @click="isSubmit">提交</div>-->
					<!--</div>-->
				</ul>
        <div class="submit" @click="isSubmit">我要提交</div>
			</div>
		</div>
		<!--抵押选择下拉框-->
		<div class="bgBox" v-show="isShow">
      <div style="position: absolute;top:0;width:100%;height: 100%;background:none" @click="isg"></div>
			<div class="slectBox">
				<p class="navBox">
					<span class="qxz">请选择</span>

				</p>
				<ul>
					<li class="oli" v-for="(item,index) in selectInfo" @click="hx(index)" style="overflow: hidden">
						 <div class="oDiv">
               {{item.name}}
             </div>
            <div class=""  class="iconfont icon-duihao aDiv" v-show="isIj == index"></div>
					</li>
				</ul>
			</div>
		</div>

		<!--解债规模下拉框-->
		<div class="jzBox" v-show="isShow2">
      <div style="position: absolute;top:0;width:100%;height: 100%;background:none" @click="isg"></div>
			<div class="slectBox_jz">
				<p class="navBox">
					<span class="qxz2">请选择</span>
				</p>
				<ul>
					<li v-for="(item,index) in tab1" @click="xz(index)">
						<span class="creditorName">债务人：{{item.debtor_uid_data.name}}</span>
						<span class="amount">债务金额： {{(item.amount/10000).toFixed(2)}}万元</span>
            <span class="iconfont icon-duihao" style="float: right;color:blue;" v-show="isIcoon == index"></span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'solveDebt',
		data() {
			return {
        isIcoon:-1,
        isIj:-1,
				token: '',
				title: "50%油卡积分解债",
				isShow: false,
				isShow2: false,
				isClicked: false,
				chooseContet: "请选择",
				guaranty: '',
				chooseId: '1',
				case_tag: '',
				jzgm: '',
				tkma: '',
				zfje: '',
				dxyzm: '',
				img: '',
				cap: '',
				zqgx: '',
				debt_id: '',
				codeTime: 61,
				phoneNum: '',
				phoneYzm: '',
				phone: '',
				ret: '',
				price: {
					usdt: "0",
					dept: "0",
					service: "0"
				},
				zqgm: {
					name: '解债规模',
					cont: '解债规模≥ 0.1'
				},
				department: {
					name: '选择债务',
					cont: '请选择债务'
				},
				tkm: {
					name: '提款码',
					cont: '请填写USDT提款码',
				},

				other: {
					name: '抵押方式',
					cont: ["请选择", "请选择"]
				},
				list: {
          months: ''
				},
				selectInfo: [],
				tab1: [],
			}
		},

		mounted() {
        this.show();
			this.imgCaptcha();
			this.userPhone();
      // this.toggle2();
      // this.toggle();
		},

		destroyed() {
			this.$bus.$emit('pageHead');
		},
		beforeDestroy() {

    },
		watch: {　

		},
    filters: {
      numFilter(value) {
        // 截取当前数据到小数点后两位
        let realVal = Number(value).toFixed(2)
        // num.toFixed(2)获取的是字符串
        return Number(realVal)
      }
    },
		methods: {
			show() {
				let $that = this;
				let index = this.$route.query.id - 1
				$that.token = localStorage.getItem('token');
				this.axios.post('debtSolutions', {
					token: $that.token,
				}).then(({
					data
				}) => {
					$that.list = data.data[index];
					console.log($that.list);
					this.case_tag= $that.list.tag;
					if(this.$route.path == '/solveDebt') {
						var name = $that.list.name;
						this.$bus.$emit('pageHead', name)
					}
					if($that.list.id == 1) {
						localStorage.setItem('token', $that.token);
						localStorage.setItem('name', $that.list.name);
					}
				})
			},
			//			方案计算
			output() {
				if(this.zqgx == '' || this.zqgx == null) {
					this.jzgm = '';
					return this.$bus.$emit('alertCer', {
						msg: "请先选择债务关系"
					});
				} else if(Number(this.jzgm) > Number(this.zqgx)) {
					this.jzgm = this.zqgx;
					this.$bus.$emit('alertCer', "解债规模需小于等于债务");

				};
				if(this.list.id == 1) {
					this.price.usdt = Number(this.jzgm * 10000 * 5 / 5 / 6.5).toFixed(4);
					this.price.dept = Number(this.jzgm).toFixed(2);
					this.price.service = Number(this.jzgm * 10000 * 1 / 5 / 6.5).toFixed(4);
					this.zfje = (Number(this.price.usdt) + Number(this.price.service)).toFixed(4);
				} else if(this.list.id == 2) {
					this.price.usdt = Number(this.jzgm * 10000 * 4 / 6 / 6.5).toFixed(4);
					this.price.dept = Number(this.jzgm).toFixed(2);
					this.price.service = Number(this.jzgm * 10000 * 1 / 6 / 6.5).toFixed(4);
					this.zfje = (Number(this.price.usdt) + Number(this.price.service)).toFixed(4);
				} else if(this.list.id == 3) {
					this.price.usdt = Number(this.jzgm * 10000 * 3 / 7 / 6.5).toFixed(4);
					this.price.dept = Number(this.jzgm).toFixed(2);
					this.price.service = Number(this.jzgm * 10000 * 1 / 7 / 6.5).toFixed(4);
					this.zfje = (Number(this.price.usdt) + Number(this.price.service)).toFixed(4);
				} else if(this.list.id == 4) {
					this.price.usdt = Number(this.jzgm * 10000 * 2 / 8 / 6.5).toFixed(4);
					this.price.dept = Number(this.jzgm).toFixed(2);
					this.price.service = Number(this.jzgm * 10000 * 1 / 8 / 6.5).toFixed(4);
					this.zfje = (Number(this.price.usdt) + Number(this.price.service)).toFixed(4);
				}
			},
			//			抵押选择
			toggle() {
				if(this.isShow == false) {
					let $that = this;
					$that.token = localStorage.getItem('token');
					$that.axios.post('guaranty', {
						token: $that.token,
					}).then(({
						data
					}) => {
						this.selectInfo = data.data;
					})
					this.isShow = true;
				} else {
					this.isShow = false;
				}
			},
			yc() {
				this.isShow = false;
			},
			qd() {
				this.isShow = false;
			},
			hx(index) {
				this.isShow = false;
				this.chooseContet = this.selectInfo[index].name;
				this.chooseId = this.selectInfo[index].id;
				this.isClicked = true;
        this.isIj =index;
			},
			//解债规模的下拉框
			toggle2() {
				if(this.isShow2 == false) {
					let $that = this;
					$that.token = localStorage.getItem('token');
					$that.axios.post('beiAnList', {
						token: $that.token,
					}).then(({
						data
					}) => {
						//获取到的数据
						$that.tab1 = data.data.creditor;
					})
					this.isShow2 = true;
				} else {
					this.isShow2 = false;
				}
			},
			yc2() {
				this.isShow2 = false;
			},
			qd2() {
				this.isShow2 = false;
			},
			xz(index) {
			  let that =this;
        this.isIcoon=index,
          this.zqgx = ((this.tab1[index].amount) / 10000).toFixed(2);
				//				this.debt_id = this.tab1[index];
        setTimeout(function () {
          that.isShow2 = false;
        },500)
			},
      isg(){
        this.isShow2 = false;
        this.isShow = false;
      },
			imgShow() {
				this.imgCaptcha();
			},
			//校验图片验证
			imgCaptcha() {

				this.axios.post('captchaInfo', {}).then(({
					data
				}) => {
					this.img = data.data.img
					this.cap = data.data.str
				})
			},
			//获取用户手机号
			userPhone() {
				let $that = this;
				$that.token = localStorage.getItem('token');
				$that.axios.post('userHomePage', {
					token: $that.token,
				}).then(({
					data
				}) => {
					this.phoneNum = data.data.phone;
				})
			},
			//手机短信验证
			getCode() {
				if(this.dxyzm == '' || this.dxyzm == null) {
					return this.$bus.$emit('alertCer', {
						msg: "请输入图形验证码"
					});
				} else {
					this.axios.post('checkCaptcha', {
						cap: this.cap,
						captcha: this.dxyzm
					}).then(({
						data
					}) => {
						if(data.ret == 1) {
							this.$bus.$emit('alertCer', {
								msg: "图形验证码输入错误"
							});
						this.imgCaptcha();
						} else if(data.ret == 0) {
							if(this.codeTime !== 61) return false;
							this.codeTime = 60;
							let timer = setInterval(() => {
								if(--this.codeTime === 0) {
									this.codeTime = 61
									clearInterval(timer)
								}
							}, 1000)
							this.axios.post('sms', {
								phoneNo: this.phoneNum,
							}).then(({
								data
							}) => {})
						}
					})

				}
			},

			//			我要提交
			isSubmit() {
				if(this.jzgm == null || this.jzgm == '') {
					return this.$bus.$emit('alertCer', {
						msg: "请选择解债规模"
					});
				} else if(this.tkma == null || this.tkma == '') {
					return this.$bus.$emit('alertCer', {
						msg: "提款码不能为空"
					});
				} else if(this.dxyzm == null || this.dxyzm == '') {
					return this.$bus.$emit('alertCer', {
						msg: "图形验证码不能为空"
					});
				} else if(this.phoneYzm == null || this.phoneYzm == '') {
					return this.$bus.$emit('alertCer', {
						msg: "短信验证码不能为空"
					});
				} else {
					this.axios.post('useCase', {
						token: localStorage.getItem('token'),
						case_tag: this.case_tag,
						amount: this.zfje,
						usdt_tag: this.tkma,
						code: this.phoneYzm,
						debt_id: this.list.id,
						name: this.name,
						guaranty: this.chooseId,
					}).then(({
						data
					}) => {
						if(data.ret == 0) {
							this.$router.push({
								path: 'solveDebtSuccess',
								query: {
									code: this.phoneYzm,
									name: this.list.name,
									comment: this.list.comment,
									months: this.list.months,
									amount: this.zfje,

									usdt: this.price.usdt,
									dept: this.price.dept,
									service: this.price.service,
									case_tag: this.case_tag,
									debt_id: this.list.id,
									usdt_tag: this.tkma,
									guaranty: this.chooseId,
									zfje: this.zfje,
								}
							});
						} else {
							return this.$bus.$emit('alertCer', {
								msg: data.msg
							});
						}

					})

				}
			},

		}
	}
</script>
<style lang="scss" scoped>
	@import '../assets/scss/style.scss';
	.solve_debt {
		position:relative;
		height: 100vh;
		background: rgb(240,240,240);
		padding-bottom: 10px;
		.head-top {
			/*margin-top: 50px;*/
			/*background-image: url("../assets/images/precept-banner.png");*/
			/*background-size: 100%;*/
			width: 359px;
			height: 312px;
			margin: 0 auto;
			.back {
				position: absolute;
				top: 0;
				left: 20px;
				width: 14%;
				height: 100px;
				line-height: 100px;
				font-size: 40px;
				color: #fff;
			}
		}
		.solveDebt {
			padding: 10px 0;
			margin-top:-200px;
			.title {
				display: flex;
				justify-content: center;
				text-align: center;
				padding: 15px 0;
				line-height: 64px;
				border-bottom: 1px dashed #ebebeb;
				border-radius: 10px;
				background: #FFFFFF;
				span {
					line-height: 100px;
					color: #4c4c4c;
					font-size: 32px;
				}
				.iconWater {
					margin-right: 10px;
					width: 80px;
					height: 80px;
					img {
						width: 100%;
					}
				}
				.iconfont {
					background: #527db2;
					width: 64px;
					height: 64px;
					font-size: 36px;
					color: #FFFFFF;
					border-radius: 50%;
					margin-right: 30px;
				}
			}
			.solveDebt-content {
				border-radius: 10px;
				background: rgb(240,240,240);
				padding: 10px 0 28px;
				position: relative;
				/*.link {
					position: absolute;
					left: 0;
					top: -12px;
					width: 100%;
					display: flex;
					justify-content: space-between;
					&:before {
						display: block;
						content: "";
						width: 0;
						height: 0;
						border-top: 12px solid transparent;
						border-left: 12px solid #3891fd;
						border-bottom: 12px solid transparent;
					}
					&:after {
						display: block;
						content: "";
						width: 0;
						height: 0;
						border-top: 12px solid transparent;
						border-right: 12px solid #3891fd;
						border-bottom: 12px solid transparent;
					}
				}*/
				.list-tab {
					background: rgb(240,240,240);
					li {
						border-bottom: 1px dotted #E2E2E2;
						background: #fff;
						padding: 10px 15px;
						.floatLeft {
							width: 18%;
							display: inline-block;
							line-height: 80px;
							float: left;
							color: #808080;
							font-size: 28px;
						}
						.floatRight {
							width: 79%;
							display: inline-block;
							word-break: break-all;
							font-size: 26px;
							line-height: 80px;
							color: #ff9800;
							/*padding-left: 10px;*/
							position: relative;
							/*.widthSpecial {
								width: 83% !important;
							}*/
							.input {
								display: inline-block;
								width: 88%;
								font-size: 26px;
							}
							.chooseContent {
								&.color {
									color: #ff9800 !important;
								}
							}
							.chooseBtn{

							}
							.blueColor {
								display: inline-block;
								width: 100% !important;
								color: #ff9800;
							}
							.dw {
								font-style: normal;
								color: #ff9800;
								position: absolute;
								top: 10px;
								right:0;
							}
							.yzmBtn {
								position: absolute;
								right: 0;
								top: 10px;
								color: #ff9800;
								.yz_img {
									/*margin-left: -80px;*/
									/*margin-top: 5px;*/
								}
							}
							.code_button {
								background: #fff;
								height: 100%;
								color: #3f89e2;
								position: absolute;
								right: 0;
								top: 0;
							}
						}
					}
					.planCost {
						height: 210px;
						.floatRight {
							padding-top: 10px;
						}
						.CostBox {
							line-height: 60px;
						}
						.CostBox>div {
							display: inline-block;
							color: #2F8BFD;
							width: 47%;
							font-size: 26px;
						}
					}
				}
				.subBox {
					position: fixed;
					top: -13px;
					right: 20px;
					text-align: center;
					z-index: 100;
					font-size: 30px;
				}
        .submit {
          width:80%;
          height: 80px;
          line-height: 80px;
          background: #2d8afd;
          color: #fff;
          font-size:30px;
          text-align: center;
          margin: 25px auto 0;
          border-radius: 10px;
        }
				/*.both {
					position: absolute;
					left: 12px;
					bottom: -14px;
					width: 616px;
					height: 14px;
					margin: 0 auto;
					border-bottom-left-radius: 10px;
					border-bottom-right-radius: 10px;
					background: rgba(255, 255, 255, .5);
				}*/
				.dyfsMargin{
					margin-top: 10px;
				}
				.tkmMargin{
					margin-top: 10px;
				}
			}
		}
		#choseType {
			color: #BDBDBD;
			font-size: 26px;
			span {
				display: inline-block;
				width: 48%;
				line-height: 60px;
			}
			.iconfont {
				text-align: right;
				padding-right: 5px;
			}
		}
		/*下拉框*/
		.bgBox {
			width: 100vw;
			height: 100vh;
			position: fixed;
			top: 0;
			background: rgba(0, 0, 0, 0.3);
			z-index: 100;
			.slectBox {
				position: fixed;
				bottom: 0;
				width: 100%;
				height: 392px;
				background: #fff;
        z-index: 999;
				.navBox {
					width: 100%;
					height: 100px;
					line-height: 100px;
					padding: 0 15px;
					font-size: 26px;
					.qx {
						float: left;
						color: rgb(99, 161, 225);
						z-index: 10;
					}
					.qd {
						float: right;
						color: rgb(99, 161, 225);
					}
					.qxz {
						display: inline-block;
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						text-align: center;
						color: rgb(68, 68, 68);
						z-index: -1;
					}
				}
				ul {
					width: 100%;
					font-size: 26px;
					li {
						width: 90%;
						height: 100px;
            margin:  0 auto;
						line-height: 100px;
						/*text-align: center;*/
            .oDiv{
              position: absolute;
              left: 50%;
              transform: translate(-50%);
            }
            .aDiv{
              float: right;color:blue
            }
					}
				}
				p {
					text-align: center;
				}
			}
		}
		/*解债规模下拉框*/
		.jzBox {
			width: 100vw;
			height: 100vh;
			position: fixed;
			top: 0;
			background: rgba(0, 0, 0, 0.3);
			z-index: 100;
			.slectBox_jz {
				position: fixed;
				bottom: 0;
				width: 100%;
				height: 392px;
				background: #fff;
        z-index: 999;
				.navBox {
					width: 100%;
					height: 100px;
					line-height: 100px;
					padding: 0 15px;
					font-size: 26px;
					.qx2 {
						float: left;
						color: rgb(99, 161, 225);
						z-index: 10;
					}
					.qd2 {
						float: right;
						color: rgb(99, 161, 225);
					}
					.qxz2 {
						display: inline-block;
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						text-align: center;
						color: rgb(68, 68, 68);
						z-index: -1;
					}
				}
				ul {
					height: 268px;
					overflow-y: auto;
					font-size: 26px;
					li {
						width:85%;
            margin: 0 auto;
            overflow: hidden;
            line-height: 60px;
            span:nth-child(1){float: left;width:320px}
            span:nth-child(2){float: left}
					}
				}
			}
		}
	}
</style>
