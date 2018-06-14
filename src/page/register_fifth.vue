<template>
    <div class="register_fifth">
    	<div class="progress">
    		<div class="progress_bar">
    			<div class=""></div>
    		</div>
    		<div class="num">85%</div>
    	</div>
    	<div class="title_hint">请填写<span></span>信息，便于债务链匹配 (个人信息我们会严格保密)</div>
    	<div class="inp_box">
    		<div class="inp_list"  v-for="(item,index) in form" :key="index">
	    		<div class="name">{{item.title}}</div>
	    		<div class="input_box">
	    		   <input  type="text"  v-model="item.val" :placeholder="item.placeholder" :readonly="item.readOnly"/>
	    		</div>	
	    		<div v-if="item.title == '债务性质' || '地区'" class="iconfont" :class="item.icon"></div>
    	    </div>
    	</div>
    	<div class="agreement_box">
    		<p>
			      本人郑重承诺于<span>  {{form.time.val.substring(0, 4)}}</span>  年<span>  {{form.time.val.substring(5, 7)}}</span>  月 <span>  {{form.time.val.substring(8,10)}}</span>  日向“河南债事众志商业服务有
				限公司”做备案的债事信息全面完整，所提供的相关债事证明（借
				条、借据、协议书、转账明细或资产、物权）等证明真实有效，并
				对相关资产情况备案详实无虚假信息。同时承诺当资产情况产生
				变化时第一时间向“河南债事众志服务有限公司”做出申报。如因
				债事处理过程中因资产上报不实或资产情况变更未及时申报而产
				生的不良后果，本人愿意承担相关法律责任及经济损失。
    		</p>
    		<div class="signature_box">
    			<h1>债事人备案人签名:</h1>
    		    <div class="signature" @click="sign">
    		    	<img v-if="signImg.signature" :src="signImg.signature"/>
    		    </div>
    		</div>
    		<div class="sub_T">(点击空白区域内手写)</div>
    	</div>
    	<div class="next_btn" @click="goNext">确  定</div>
    	<signature :content="signImg"></signature>
    </div>
</template>
  
<script>
 import signature from '../components/signature'
export default {
	
  name: 'registerFifth',
  data () {
    return {
    	dataObj:"",
    	signImg:{
    	  signature :"",
    	},
         form:{
           name: {
           	title:"备案人",
           	placeholder:"请输入备案人姓名",
           	icon:"",
           	val:"安琪",
           	readOnly:true
           },
          mold:{
           	title:"备案人类型",
           	placeholder:"请选择",
           	icon:"",
           	val:"债务公司",
           	readOnly:true
            },
          card:{
           	title:"身份证号",
           	placeholder:"请输入身份证号",
           	icon:"",
           	val:"41022********5462",
           	readOnly:true
            },
          phone: {
           	title:"备案人电话",
           	placeholder:"请输入手机号",
           	icon:"",
           	val:"183****5825",
           	readOnly:true
           },
           time:{
           	title:"备案时间",
           	placeholder:"请输入",
           	icon:"",
           	val:"2018-05-16",
           	readOnly:true
           }
         }
    }
  },
  beforeMount () {
   
  },
  mounted () {
    this.$bus.$emit('pageHead','债务登记')
    this.init()
  },
  destroyed () {
    this.$bus.$emit('pageHead')
  },
  methods: {
  	init (){
  		
  		this.dataObj =  JSON.parse(localStorage.getItem("dataObj"));
  		
  		this.form.name.val = this.dataObj.nameF
  		this.form.mold.val = this.dataObj.nature
  		this.form.card.val = this.dataObj.card
  		this.form.phone.val = this.dataObj.phoneF
  		this.form.time.val = this.getNowFormatDate()
  		if(this.dataObj.signature){
  			 this.signImg.signature  = this.dataObj.signature
  		}
  		
  	},
     goNext (){
     	
     	  if (this.form.name.val === '') return this.$bus.$emit('alert', '请输入姓名')
     	  if (this.form.phone.val === '') return this.$bus.$emit('alert', '请输入手机号')
//   	  if (this.form.district.val === '') return this.$bus.$emit('alert', '请选择地区')
     	  if (this.form.time.val === '') return this.$bus.$emit('alert', '请输入详细地址')
     	  
     	  this.dataObj.signature =  this.signImg.signature   //上传签名
     	  if (this.signImg.signature === '') return this.$bus.$emit('alert', '请签名')
     	  
     	  
     	  localStorage.setItem("dataObj",JSON.stringify(this.dataObj));
     	  
     	  this.$router.push("subscribe")
     },
     sign (){
        this.$bus.$emit('signature')
        document.documentElement.style.overflow='hidden';
        document.body.style.overflow='hidden';
     },
     getNowFormatDate () {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    }

    
  },
   components: {
    signature
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/style.scss';
  .register_fifth {
  	   padding-top:100px;
  	   padding-bottom:180px;
       .progress{
       	height:84px;
       	display:flex;
       	justify-content:space-between;
       	background:#fff;
       	margin-top:1px;
       	padding:26px 27px 26px 85px;
       	box-sizing:border-box;
       	.progress_bar{
       		width: 88%;
       		background:#ededed;
       		border-radius: 32px;
       		div{
       			width:85%;
       			background: #2f89ff;
       			border-radius: 32px;
       		    height:100%;
       		}
       	}
       	.num{
       		width: 8%;
       		color:#2f89ff;
       		font-size:24px;
       	}
       }
       .title_hint{
       	height:56px;
       	color:#808080;
       	font-size: 20px;
       	line-height: 56px;
       	padding-left:20px;
       }
       .agreement_box{
       	width: 95%;
       	margin: 0 auto;
       	border-radius: 10px;
       	background: #fff;
       	margin-top:10px;
       	padding: 20px 30px;
       	margin-bottom: 80px;
       	p{
       		font-size:24px;
       		color:#808080;
       		line-height: 40px;
       		text-indent:2em;
       	}
       	.signature_box{
       		height: 170px;
       		display: flex;
       		justify-content: space-between;
       		h1{
       		font-size: 28px;
       		color: #808080;
       		font-weight: 400;
       		line-height: 100px;
	       	}
	       	.signature{
	       		width: 60%;
	       		overflow: hidden;
	       		img{
	       			height: 100%;
	       			width: 60%;
	       		}
	       	}
       	}
       	.sub_T{
       		text-align: right;
       		color: #dd6b66;
       		font-size: 22px;
       	}
       	
       }
       .inp_box{
       	width: 95%;
       	margin: 0 auto;
       	border-radius: 10px;
       	overflow:hidden;
        transition: all .4s;
       	.inp_list{
       		display: flex;
       		justify-content: space-between;
       		margin-bottom:1px;
       		height:94px;
       		padding-left:26px;
       		padding-right:20px;
       		background: #fff;
       		.name{
       			color:#333;
       			font-size: 28px;
       			line-height: 94px;
       		}
       		.input_box{
       			  width: 70%;
       			input{
       				background: none;
       				outline: none;
                    border: none;
                    height: 100%;
                    width: 100%;
                    font-size: 28px;
                    color: #333;
       			}
       		}
       		.iconfont{
       			line-height: 94px;
       			color: #333;
       			font-size: 38px;
       		}
       	}
       }
       	.spread{
       		width: 95%;
         	margin: 0 auto;
         	margin-top: 1px;
       		text-align: center;
       		height: 80px;
       		line-height: 80px;
       		background: #fff;
       		color:#fa4461;
       		font-size:28px;
       		border-radius: 10px;
       		margin-bottom: 100px;
       		
       	}
     .next_btn{
     	width: 70%;
     	height:86px;
     	line-height: 86px;
     	color: #fff;
     	font-size: 34px;
     	text-align: center;
     	margin: 0 auto;
     	background: #2d8afd;
     	border-radius: 10px;
     }
  }
</style>
