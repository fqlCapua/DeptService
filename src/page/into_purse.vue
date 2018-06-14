<template>
	<div class="declaration">
		<div action="" class="declaration-form">
      <span></span>
      <label for=""  style="color: #2d8afd;font-size:13px"><div style="color: #2d8afd;">可用数量：</div>{{number}}</label>
			<label for="" class="amount"><div>数量</div><input type="text" name=""v-model="amount" value="" placeholder="请输入转出数量"/></label>
			<label for="" class="code"><div>验证码</div><input type="text" name=""  value="" v-model="code"  placeholder="请输入手机验证码"/><span @click="getCode">{{ codeTime === 61 ? '获取验证码' : `${codeTime}s后重试`}}</span></label>
			<label for=""><div>钱包地址</div><input type="text" name=""  value="" v-model="address" placeholder="请输入钱包地址"/></label>
		</div>
		<div class="submit" @click="submit">提交</div>
	</div>
</template>

<script>
  export default {
    name: 'personal',
    data () {
      return {
      phone:localStorage.getItem("phone"),
	    code: '',
	    codeTime: 61,
	    number:'',
      address:'',
      amount:'',
      trans_amount:'',
      created:'',
      }
    },
    mounted () {
    	this.$bus.$emit('pageHead', '转入钱包');
    	this.num()
  	},
  	destroyed () {
    	this.$bus.$emit('pageHead');
  	},
    methods: {

       num(){
         this.axios.post('userHomePage', {
           token:localStorage.getItem("token")
         }).then(({data}) => {
           this.number = data.data.DCC_total+ ' DCC'
         })
       },


    	getCode(){
    		if (this.codeTime !== 61) return false;
    		this.codeTime = 60
		    let timer = setInterval(() => {
		    	if (--this.codeTime === 0) {
		          this.codeTime = 61
		          clearInterval(timer)
		        }
		      }, 1000)
      		this.axios.post('sms', {
            phoneNo:this.phone
	        }).then(({data}) => {
	        })
    	},
 		submit(){
      if(this.amount > this.number ){
        this.$bus.$emit('alert', '数量不能大于可用dcc的数值')
        return false;
      }else if((/0x[0-9a-zA-Z]{40}/.test(this.address))){
          this.axios.post('withDrawDcc', {
            token:localStorage.getItem("token"),
//        钱包地址
            wallet_address:this.address,
//        数量
            amount:this.amount,
            code:this.code
          }).then(({data}) => {
            this.trans_amount =data.data.trans_amount
            this.created =data.data.created
            this.$router.push({path:'intoDetails',query:{created:this.created,trans_amount:this.trans_amount,address:this.address}})
          })
        }else{
        this.$bus.$emit('alert', '钱包地址0x开头的42位字符串');
        }

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
        width: 100%;
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
					width:30%;
				}
				span{
					color:#2d8afd;
					position:absolute;
          right:40px;
          font-size: 27px;
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
