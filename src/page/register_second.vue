<template>
    <div class="register_second">
    	<div class="progress">
    		<div class="progress_bar">
    			<div class=""></div>
    		</div>
    		<div class="num">35%</div>
    	</div>
    	<div class="title_hint">请填写<span></span>信息，便于债务链匹配 (个人信息我们会严格保密)</div>
    	<div class="inp_box">
    		<div class="inp_list"  v-for="(item,index) in form" :key="index">
	    		<div class="name">{{item.title}}</div>
	    		<div class="input_box">
	    		   <input  v-if="index === 'district'" @click="getAddress" type="text"  v-model="item.val" :placeholder="item.placeholder"  :readonly="item.readOnly"/>
	    		    <input  v-else="" type="text"  v-model="item.val" :placeholder="item.placeholder" :readonly="item.readOnly"/>
	    		</div>
	    		<div v-if="item.title == '债务性质' || '地区'" class="iconfont" :class="item.icon"></div>
    	    </div>
    	</div>
    	<div class="next_btn" @click="goNext">下一步</div>
    	<picker></picker>
    </div>
</template>

<script>
import picker from '../components/picker.vue'
export default {

  name: 'registerSecond',
  data () {
    return {
    	dataObj:"",
    	codeS:"",
         form:{
           name: {
           	title:"姓   名",
           	placeholder:"请输入姓名",
           	icon:"",
           	val:"",
           	readOnly:false
           },
          phone: {
           	title:"手机号",
           	placeholder:"请输入手机号",
           	icon:"",
           	val:"",
           	readOnly:false
           },
           district:{
           	title:"地区",
           	placeholder:"请选择",
           	icon:"icon-up-copy-copy",
           	val:"",
           	readOnly:true
           },
           address:{
           	title:"详细地址",
           	placeholder:"请输入详细地址（必填）",
           	icon:"",
           	val:"",
           	readOnly:false
           }
         }
    }
  },
  beforeMount () {

  },
  mounted () {
    this.$bus.$emit('pageHead','债务登记')
//  this.dataObj =  JSON.parse(localStorage.getItem("dataObj")) ;
    this.init()
    if(localStorage.getItem('type') == 1){
      this.form.name.title = '债务人姓名'
    }
    if(localStorage.getItem('type') == 2){
      this.form.name.title = '债权人姓名'
    }
  },
  destroyed () {
    this.$bus.$emit('pageHead')
  },
  methods: {
  	init() {
  		this.dataObj =  JSON.parse(localStorage.getItem("dataObj")) ;
	    if(this.dataObj.nameS){
	   	   this.form.name.val = this.dataObj.nameS  //姓名2
     	   this.form.phone.val = this.dataObj.phoneS  //手机号2
     	   this.form.district.val = this.dataObj.districtS //地区2
     	   this.form.address.val = this.dataObj.addressS //详细地址2
	   }
  	},
     goNext (){
     	  if (this.form.name.val === '') return this.$bus.$emit('alert', '请输入姓名')
     	  if (this.form.phone.val === '' || !(/^1[345789]\d{9}$/.test(this.form.phone.val))) return this.$bus.$emit('alert', '输入的手机号格式不对')
     	  if (this.form.district.val === '') return this.$bus.$emit('alert', '请选择地区')
  	    if (this.form.address.val === '') return this.$bus.$emit('alert', '请输入详细地址')

     	  this.dataObj.nameS =  this.form.name.val   //姓名2
     	  this.dataObj.phoneS =  this.form.phone.val   //手机号2
     	  this.dataObj.districtS =  this.form.district.val   //地区2
     	  this.dataObj.codeS =  this.codeS   //地区2
     	  this.dataObj.addressS =  this.form.address.val   //详细地址2

     	  localStorage.setItem("dataObj",JSON.stringify(this.dataObj));

     	  	this.$router.push("registerThird")
     },
     // 触发时间选择器
     getAddress () {
        this.$bus.$emit('timerShow', {
          flag: true,
          callBack: this.haveAddress
        })
     },
     haveAddress (data){
     	this.form.district.val = data.addressStr
     	this.codeS = data.code
     }

  },
    components: {
    picker
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/style.scss';
  .register_second {
  	   padding-top:100px;
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
       			width:35%;
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
       .inp_box{
       	width: 95%;
       	height: 665px;
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
