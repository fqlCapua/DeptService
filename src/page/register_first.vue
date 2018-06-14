<template>
    <div class="register_first">
    	<div class="progress">
    		<div class="progress_bar">
    			<div class=""></div>
    		</div>
    		<div class="num">25%</div>
    	</div>
    	<div class="title_hint">请填写<span></span>信息，便于债务链匹配 (个人信息我们会严格保密)</div>
    	<div class="inp_box" :class="{'active' : isShow}">
    		<div class="inp_list"  v-for="(item,index) in form" :key="index">
	    		<div class="name">{{item.title}}</div>
	    		<div class="input_box">
	    		   <input  v-if="index === 'nature'"  @click="company" type="text"  v-model="item.val" :placeholder="item.placeholder"  :readonly="item.readOnly"/>
	    		   <input  v-else-if="index === 'district'" @click="getAddress" type="text"  v-model="item.val" :placeholder="item.placeholder"  :readonly="item.readOnly"/>
	    		   <input  v-else  type="text"  v-model="item.val" :placeholder="item.placeholder"  :readonly="item.readOnly"/>
	    		</div>
	    		<div v-if="item.title == '债务性质' || '地区'" class="iconfont" :class="item.icon"></div>
    	    </div>
    	</div>
    	<div class="spread" @click="Show" v-show="!isShow">展开更多</div>
    	<div class="next_btn" @click="goNext">下一步</div>
    	<companyType :content="form.nature"></companyType>
    	<picker></picker>
    </div>
</template>

<script>
import companyType from '../components/company_type'
import picker from '../components/picker.vue'
export default {
  name: 'registerFirst',
  data () {
    return {
    	 statusType:"",
         isShow:true,
         code:'',
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
          card:{
           title:"身份证号",
           	placeholder:"请输入身份证号",
           	icon:"",
           	val:"",
           	readOnly:false
           },
           grade:{
           	title:"债务量级(万元)",
           	placeholder:"请输入量级",
           	icon:"",
           	val:"",
           	readOnly:false
           },
           globalValue:{
           	title:"资产总价值(万元)",
           	placeholder:"请输入总价值",
           	icon:"",
           	val:"",
           	readOnly:false
           },
           nature:{
           	show:false,
           	title:"债务性质",
           	placeholder:"请选择",
           	icon:"icon-up-copy-copy",
           	val:"",
           	id:'',
           	list:[],
           	readOnly:true
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
           },
           remark:{
           	title:"债务需求",
           	placeholder:"请输入您的需求（可不填）",
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
  	 this.init()
     this.$bus.$emit('pageHead','债务登记')
     this.statusType  =  this.$route.query.type
    // 监听关闭事件
//  this.$bus.$on('closeCompanyType')
   if(localStorage.getItem('type') == 1){
     this.form.name.title = '债权人姓名'
   }
    if(localStorage.getItem('type') == 2){
      this.form.name.title = '债务人姓名'
    }
    this.companyTypeList()
  },
  destroyed () {
    this.$bus.$emit('pageHead')
//  this.$bus.$off('closeCompanyType')
  },
  methods: {
  	init() {
  		let getItemData  = localStorage.getItem("dataObj")
	    if(getItemData !== null && getItemData !== '' &&  getItemData !== "undefined" ){
	   	   let getMsg = JSON.parse(getItemData);
	   	   this.form.name.val =  getMsg.nameF
	   	   this.form.phone.val = getMsg.phoneF
	   	   this.form.card.val =  getMsg.card
	   	   this.form.grade.val = getMsg.grade
	   	   this.form.globalValue.val = getMsg.globalValue
	   	   this.form.nature.val = getMsg.nature
	   	   this.form.district.val = getMsg.districtF
	   	   this.code = getMsg.code
	   	   this.form.nature.id = getMsg.natureId
	   	   this.form.address.val = getMsg.addressF
	   	   this.form.remark.val = getMsg.remark
	   }
  	},
     goNext (){

     	   let dataObj = {}
     	   let reg =/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;

     	  if (this.form.name.val === '') return this.$bus.$emit('alert', '请输入姓名')
     	  if (this.form.phone.val === '' || !(/^1[345789]\d{9}$/.test(this.form.phone.val))) return this.$bus.$emit('alert', '输入的手机号格式不对')
     	  if (this.form.card.val === '' || !(reg.test(this.form.card.val))) return this.$bus.$emit('alert', '请输入正确的身份证号')
     	  if (this.form.grade.val === '') return this.$bus.$emit('alert', '请输入量级')
     	  if (this.form.globalValue.val === '') return this.$bus.$emit('alert', '请输入总价值')
     	  if (this.form.nature.val=== '') return this.$bus.$emit('alert', '请选择性质')
     	  if (this.form.district.val === '') return this.$bus.$emit('alert', '请选择地区')
     	  if (this.form.address.val === '') return this.$bus.$emit('alert', '请输入详细地址')

     	  dataObj.statusType =  this.statusType    //身份   1：债权人   2：债务人
     	  dataObj.nameF =  this.form.name.val    //姓名
     	  dataObj.phoneF =  this.form.phone.val  //手机号
     	  dataObj.card =  this.form.card.val    //身份证号
     	  dataObj.grade =  this.form.grade.val   //量级
     	  dataObj.globalValue =  this.form.globalValue.val   //总价值
     	  dataObj.nature =  this.form.nature.val  //性质
     	  dataObj.districtF =  this.form.district.val  //地区
     	  dataObj.code =  this.code  //地区 code
     	  dataObj.natureId =  this.form.nature.id  //性质id
     	  dataObj.addressF =  this.form.address.val   //详细地址
     	  dataObj.remark =  this.form.remark.val    //备注

     	  localStorage.setItem("dataObj",JSON.stringify(dataObj));

     	   this.$router.push("registerSecond")

     },
     Show (){
     	  this.isShow  =  !this.isShow
     },
     // 债务性质list
     company (){
     	this.$bus.$emit('companyType')
     	this.form.nature.show = true
     },
    companyTypeList (){
    	this.axios.post('companyType')
    	.then(({data}) => {
           this.form.nature.list = data.data
      })
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
     	this.code = data.code
     }
  },
   components: {
    companyType,
    picker
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/style.scss';
  .register_first {
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
       			width:25%;
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
        &.active{
       	   height: auto;
           margin-bottom: 100px;

       	}

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
       			  width: 60%;
           height:100%;
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
