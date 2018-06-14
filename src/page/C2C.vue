<template>
	<div class="declaration">
		<div action="" class="declaration-form">
      <label for=""  style="color: #2d8afd;font-size:13px"><div style="color: #2d8afd;">可用数量：</div>{{number}}</label>
			<label for="" class="amount"><div>数量</div><input type="text" name="" id="" v-model="amount" value="" placeholder="请输入转出数量"/></label>
			<label for="" class="code"><div>验证码</div><input type="text" v-model="code" value="" placeholder="请输入手机验证码"/><span @click="getCode">{{ codeTime === 61 ? '获取验证码' : `${codeTime}s后重试`}}</span></label>
			<label for="" class="name" ><div id="account">交易账号</div><input type="text" v-model="phone" @change="this.with"  name="" id="account-input" value="" placeholder="请输入交易账号"/><span>{{name}}</span></label>
      <!--<label for="" class="amount"><div>交易密码</div><input type="text" name="" id="" v-model="amount" value="" placeholder="请输入转出数量"/></label>-->
    </div>
		<div class="submit" @click="submit">提交</div>
	</div>
</template>

<script>
  export default {
    name: 'C2C',
    data () {
      return {
      phone: '',
	    code: '',
	    codeTime: 61,
	    number:'',
      name:'',
      amount:'',
      }
    },
    mounted () {
    	 let vm = this;
    	this.$bus.$emit('pageHead',
    	{
    		title:"会员转账",
    		rightShow:true,
//    		rightText:'转入对方账户',
    		rightColor:'#2d8afd',
    		rightBack:function(){
      			 vm.$router.push({path:'intoAccount'})
    		}
    	});
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
          this.number = data.data.DCC_total+' DCC'
        })
      },
    	getCode(){
    		if (this.codeTime !== 61) return false;
    		this.codeTime = 60;
		    let timer = setInterval(() => {
		    	if (--this.codeTime === 0) {
		          this.codeTime = 61;
		          clearInterval(timer)
		        }
		      }, 1000)
      		this.axios.post('sms', {
            phoneNo:localStorage.getItem('phone')
	        }).then(({data}) =>{
	        })
    	},
//      用户名字显示
      with(){
        this.axios.post('c2cUserInfo', {
          token:localStorage.getItem("token"),
          phone:this.phone
        }).then(({data}) => {
           this.name=data.data.name
        })
      },

 		submit(){
      if (this.code === '') return this.$bus.$emit('alert', '请输入手机验证码');
      if(this.name === undefined){
        this.$bus.$emit('alert', '没有此账户');
        return false;
      }else{
        this.axios.post('withDrawDcc',{
          token:localStorage.getItem("token"),
          amount:this.amount,
          code:this.code,
          to_uid:this.phone
        }).then(({data}) => {
          this.trans_amount =data.data.trans_amount
          if(data.ret === 0){
            this.$router.push({path:'transfer',query:{trans_amount:this.trans_amount,phone:this.phone}})
          }else{
            this.$bus.$emit('alert', '交易失败请重新交易');
          }
        })
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
  .name{
  input{
    width:50%;
  }
  span{
    color:#999;
    position:absolute;
    right:80px;
    font-size: 27px;
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
