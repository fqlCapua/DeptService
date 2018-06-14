<template>
	<div class="declaration">
		<div action="" class="declaration-form">
			<label for="" class="name"><div>姓名</div><input type="text"  v-model="name"   placeholder="请输入您的姓名"/></label>
			<label for="" class="name"><div>手机号</div><input type="number" v-model="phone" placeholder="请输入您的手机号"/></label>
			<label for="" class="name"><div>借债金额</div><input type="number" v-model="sum" value="" placeholder="请输入借债金额"/></label>
			<label for=""><div>提款码</div><input type="text" v-model="usdtCode" placeholder="请输入您的USDT提款码"/></label>
			<label for="" class="code"><div>验证码</div><input type="text" v-model="code"  placeholder="请输入手机验证码"/><span @click="getCode">{{ codeTime === 61 ? '获取验证码' : `${codeTime}s后重试`}}</span></label>
		</div>
		<div class="submit" @click="submit">确定</div>
	</div>
</template>

<script>
  export default {
    name: 'personal',
    data () {
      return {
        phone: '',
	    code: '',
	    name:'',
	    sum:'',
	    usdtCode:'',
	    codeTime: 61
      }
    },
    mounted () {
    	this.$bus.$emit('pageHead', '方案提交');
  	},
  	destroyed () {
    	this.$bus.$emit('pageHead');
  	},
    methods: {
    	getCode(){
    		
    		
    		return false
    		
    	if (this.codeTime !== 61) return false;
        if (this.phone === '' || !(/^1[34578]\d{9}$/.test(this.phone))) return this.$bus.$emit('alert', '手机号格式不正确或为空');
    		this.codeTime = 60
		    let timer = setInterval(() => {
		    	if (--this.codeTime === 0) {
		          this.codeTime = 61
		          clearInterval(timer)
		        }
		      }, 1000)
      		this.axios.post('sms', {
	          	phone: ''
	        }).then(({data}) => {
	          	if (data.status === 200) {
	          	}
	        })
    	},
 		submit(){
 			
 			 if (this.name === '') return  this.$bus.$emit('alert', '姓名不能为空');
 			 if (this.phone === '') return  this.$bus.$emit('alert', '手机号格式不正确或为空');
 			 if (this.sum === '') return  this.$bus.$emit('alert', '请输入借债金额');
 			 if (this.usdtCode === '') return  this.$bus.$emit('alert', '请输入您的USDT提款码');
 			 if (this.code === '') return  this.$bus.$emit('alert', '请输入手机验证码');
 			
 			

 			this.$router.push({path:'solveDebt' })
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
				justify-content: space-between;
				div{
					font-size: 28px;
					color:#333333;
					width:176px;

				}
				input{
					font-size: 28px;
					color:#333;
					width: 70%;
				}
			}
			.name{
				height:108px;
				line-height: 108px;
			}
			.code{
				input{
					width:50%;
				}
				span{
					color:#ff9800;
					font-size: 26px;
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
