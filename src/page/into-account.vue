<template>
	<div class="declaration">
		<div action="" class="declaration-form">
			<label for="" class="amount"><div>数量</div><input type="text" name="" id="" value="" placeholder="请输入转出数量"/><span>{{number}}</span></label>
			<label for="" class="code"><div>验证码</div><input type="text" name="" id="" value="" placeholder="请输入手机验证码"/><span @click="getCode">{{ codeTime === 61 ? '获取验证码' : `${codeTime}s后重试`}}</span></label>
			<label for="" ><div id="account">对方账号</div><input type="text" name="" id="account-input" value="" placeholder="请输入对方账号"/></label>
		</div>
		<div class="submit" @click="submit">提交</div>
	</div>
</template>

<script>
  export default {
    name: 'personal',
    data () {
      return {
      phone: '',
	    code: '',
	    codeTime: 61,
	    number:'2000个可用'
      }
    },
    mounted () {
    	this.$bus.$emit('pageHead','对方账户');
  	},
  	destroyed () {
    	this.$bus.$emit('pageHead');
  	},
    methods: {
    	getCode(){
    		if (this.codeTime !== 61) return false;
        if (this.phone === '' || !(/^1[34578]\d{9}$/.test(this.phone))) return this.$bus.$emit('alert', '手机号格式不正确或为空');
    		this.codeTime = 60
		    let timer = setInterval(() => {
		    	if (--this.codeTime === 0) {
		          this.codeTime = 61
		          clearInterval(timer)
		        }
		      }, 1000)
      		this.axios.post('auth/sms', {
	          	phone: '18337113683'
	        }).then(({data}) => {
	          	if (data.status === 200) {
	          	}
	        })
    	},
 		submit(){
 			//if (this.code === '') return this.$bus.$emit('alert', '请输入手机验证码');
 			this.$router.push({path:'intoDetails' })
 		}
    },
    components: {
    }
  }
</script>

<style lang="scss" scoped>
	.declaration{
		padding:0 20px;
		padding-top:100px;
		.declaration-form{
			margin-top:12px;
			background: #fff;
			padding:0 10px;
			border-radius: 10px;
			height:auto;
			margin-bottom:335px;
			label{
				height:93px;
				line-height: 93px;
				border-bottom: 1px solid #f5f5f5;
				padding-left: 18px;
				display: flex;
				//justify-content: space-between;
				div{
					font-size: 28px;
					color:#333333;
					width:176px;

				}
				input{
					font-size: 26px;
					color:#bfbfbf;
					width: 70%;

				}
			}
			.amount{
				height:108px;
				line-height: 108px;
				input{
					width:50%;
				}
				span{
					color:#2d8afd;
					font-size: 26px;
				}
			}
			.code{
				input{
					width:50%;
				}
				span{
					color:#ff9800;
					font-size: 26px;
					text-align: right;
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
</style>
