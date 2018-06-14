<template>
    <div class="subscribe">
    	 <div class="nav_box">
    	     <!--<div class="_nav">
    	     	<div class="nav_title" v-for="(item,index) in nav" @click="toggle (index)" :class="{ active : addActive === index}" :key="index">
    	     		{{item.title}}
    	     	</div>
    	     </div>-->
    	 </div>

    	 <!--<div class="hint_title">请选择解债方案，便于债务链匹配 (个人信息我们会严格保密)</div>-->
    	<div class="user_msg_box">
    		<div class="user_body">
    			<div class="headImg_box">
    				<img :src="userMsg.headImg" alt="" />
    			</div>
    			<!--<div class="u_name">{{userMsg.name}}</div>
    			<div class="u_address">{{userMsg.address}}</div>-->
    		</div>
    		<!--<div class="project_box">
    			<div class="project_list" v-for="(item,index) in project" :key="index">
    				<div class="project_del">{{item.headline}}</div>
    				<div class="project_title">{{item.hint}}</div>
    			</div>
    		</div>-->
    	</div>

    	<div class="debt_bank">
    		 <div class="debt_list" v-for="(item,index) in debtBank" :key="index" @click="debetC(index)">
    		 	<div class="_title">{{item.title}}</div>
    		 	<div class="_content">
    		 		<img :src="item.img" :class="{'imgActive':index == 'debtDivision'}" alt="" />
    		 		<span :class="{'active':index == 'serviceCharge'}"><span v-if="index =='serviceCharge'">￥</span>{{item.val}}</span>
    		 		<span v-show="addActive" class="iconfont" :class="item.icon"></span>
    		 	</div>
    		 </div>
    	</div>

    	<div class="next_btn" @click="submit">预  约</div>
    	<companyType :content="debtBank.bank"></companyType>
    	<companyType :content="debtBank.debtDivision"></companyType>
    </div>
</template>

<script>
import companyType from '../components/company_type'
export default {

  name: 'subscribe',
  data () {
    return {
    	dataObj:"",
    	 addActive: 1,
         nav:[
            {
              title:"免费"
            },
            {
              title:"VIP"
            }
         ],
        userMsg:{
        	headImg:require('../assets/images/mrtx.png'),
        	name:"安琪",
        	address:"郑东新区东风南路创业路"
        },
        project:{
        	sum:{
        	  headline:"22万",
        	  hint:"债务金额"
        	},
        	scheme:{
        	  headline:"",
        	  hint:"债务性质"
        	},
        	telNum:{
        	  headline:"158****5241",
        	  hint:"手机号"
        	}
        },
        debtBank:{
        	// 债行
        	bank:{
        		title:"债行",
        		val:"请选择债行",
        		img:require('../assets/images/12.png'),
        		icon:"icon-up-copy-copy",
        		show:false,
        		isLoading:false,
        		notJieZai:false,
        		id:'',
        		uid:"",
        		list:[]
        	},
        	//解债师
        	debtDivision:{
        		title:"解债师",
        		val:"请选择解债师",
        		img:require('../assets/images/mrtx.png'),
        		icon:"icon-up-copy-copy",
        		show:false,
        		isLoading:false,
        		notJieZai:false,
        		id:'',
        		uid:"",
        		list:[]
        	},
        	//服务费
        	serviceCharge:{
        		title:"服务费",
        		val:"0.00",
        		img:"",
        		icon:""
        	}
        }
    }
  },
  beforeMount () {

  },
  mounted () {
    this.$bus.$emit('pageHead','预约解债师')
    this.init ()
    this.debetCompanies()
  },
  destroyed () {
    this.$bus.$emit('pageHead')
  },
  methods: {
  	init (){

  		 this.dataObj =  JSON.parse(localStorage.getItem("dataObj"));
  		 this.userMsg.name = this.dataObj.nameF   //name
  		 this.userMsg.address = this.dataObj.districtF + this.dataObj.addressF   //地址
  		 this.project.scheme.headline = this.dataObj.nature   //债务性质
  		 this.project.sum.headline = this.dataObj.grade + "万"   //金额
  		 this.project.telNum.headline= this.dataObj.phoneF   //手机号
  	},
     submit (){
     	
     	if(this.debtBank.bank.val.indexOf("请选择") > -1) return this.$bus.$emit('alert', '请选择债行')
//   	if(this.debtBank.debtDivision.val.indexOf("请选择") > -1) return this.$bus.$emit('alert', '请选择债行')

     	  this.dataObj.uid =  this.debtBank.debtDivision.uid  //解债师
     	  this.dataObj.bank =  this.debtBank.bank.id  //债行
     	  this.dataObj.serviceCharge =  this.debtBank.serviceCharge.val    //服务费

     	  localStorage.setItem("dataObj",JSON.stringify(this.dataObj));

     	  if(!this.addActive){
     	  	  this.beiAn(0)  // this.addActive ==0时  免费
     	  }else{
     	  	 let uid = this.debtBank.debtDivision.uid
     	  	 let bank = this.debtBank.bank.id
     	  	 let charge = this.debtBank.serviceCharge.val

     	  	 this.beiAn(0,uid,bank)
     	  }

//   	  this.$router.push("pay")

     },
     toggle (index) {
    	this.addActive = index
    	if(index ==0) {

    		this.debtBank.serviceCharge.val = "0.00"
    		this.debtBank.bank.val = "河南众志债事商业服务有限公司"
    		this.debtBank.debtDivision.val = "安琪"

    	}else{
    		this.debtBank.serviceCharge.val = "0.00"
    	}
    },
    debetC(index){

    	if(!this.addActive) return false;

    	if(index == "bank"){
    		this.$bus.$emit('companyType')
     	    this.debtBank.bank.show = true
    	}else if(index == "debtDivision"){
    		 if(!this.debtBank.bank.id) return this.$bus.$emit('alert', '请选择债行')
    		 console.log(this.debtBank.bank.id)
    		this.$bus.$emit('companyType')
     	    this.debtBank.debtDivision.show = true
     	    this.debetCompanies(this.debtBank.bank.id)
    	}

    },
    debetCompanies(id){
    	this.debtBank.bank.isLoading = true
    	this.debtBank.debtDivision.isLoading = true
//  	if(this.debtBank.bank.val.indexOf("请选择") > -1) return this.$bus.$emit('alert', '请选择债行')

    	let debet = id ||"" ;

    	this.axios.post('debetCompanies',{
    		token:localStorage.getItem("token"),
    		id:debet
    	}).then(({data}) => {
    		if(!debet){
    			this.debtBank.bank.isLoading = false
    			this.debtBank.bank.list = data.data[0]
    			if(this.debtBank.bank.list.length == 0){
    				this.debtBank.bank.notJieZai = true
    			}
    		}else{
    			this.debtBank.debtDivision.isLoading = false
    			this.debtBank.debtDivision.list = data.data[0].jiezhaishi
    			if(this.debtBank.debtDivision.list.length == 0){
    				this.debtBank.debtDivision.notJieZai = true
    			}
    		}
      })
    },
    beiAn (charge,uid,bank){

    	 this.axios.post('beiAn', {
         token:localStorage.getItem("token"), //Token
         promised:1, //承诺
         promised_related_id:"",   //昵称
         signed_img:this.dataObj.qianT,     // 欠条照片
         com_id: bank || "",     //债行id
         service_amount:charge || 0, // 服务费
         manager_id: uid || "",                  //解债师的id
         total_assets:this.dataObj.globalValue, //资产总价值
         comment:this.dataObj.remark,          //备注债务需求
         amount:this.dataObj.globalValue,          //债务总量
         grade:this.dataObj.grade,         //债务级别
         attached_files:[this.dataObj.zhengCard,this.dataObj.fanCard], //身份证照
         related_id:1,                  //备注债务 有关系的
         ids_related_id:this.dataObj.card,   //身份证IDs

         creditor_uid:this.dataObj.statusType == 1 ? 1 : 2,  //债权人id
         debtor_uid:this.dataObj.statusType == 2 ? 1 : 2, //债权人id

         creditor_address: this.dataObj.statusType == 1 ?   this.dataObj.code : this.dataObj.codeS, //债权人地址
         debtor_address:this.dataObj.statusType == 1  ?  this.dataObj.codeS  :  this.dataObj.code ,  //债务人地址

         creditor_phone: this.dataObj.statusType == 1 ?   this.dataObj.phoneF : this.dataObj.phoneS, //债权人手机号
         debtor_phone: this.dataObj.statusType == 1  ?  this.dataObj.phoneS  :  this.dataObj.phoneF ,  //债务人手机号

         creditor_name: this.dataObj.statusType == 1 ?   this.dataObj.nameF : this.dataObj.nameS, //债权人姓名
         debtor_name: this.dataObj.statusType == 1  ?  this.dataObj.nameS  :  this.dataObj.nameF ,  //债务人姓名

         creditor_type_id:this.dataObj.natureId, //债权人类型
         debtor_type_id: this.dataObj.natureId ,  //债务人类型

      }).then(({data}) => {

          if(!data.ret){
          	  this.$router.push("beianSucceed")
           localStorage.setItem('dataObj','');
          }else{
          	    this.$bus.$emit('alert', {
	          		title:'提示',
	          		msg:"提交失败，请重新提交",
	          		btn:"知道了",
	          		cb:function(){
	          			this.$router.push("checkIn")
	          		}
          	    })
          }

      })

    }
  },
  components: {
    companyType
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/style.scss';
  .subscribe {
  	   padding-top:100px;
     /*.nav_box{
     	height:84px;
     	background:#fff;
     	margin-top:1px;
     	padding-top:12px;
     	box-sizing:border-box;
     	._nav{
     		width: 50%;
     		height:60px;
     		display: flex;
     		justify-content: space-between;
     		border:1px solid #2d8afd;
     		border-radius:6px;
     		margin:0 auto;
     		.nav_title{
     			width:50%;
     			text-align: center;
     			color:#2d8afd;
     			font-size:28px;
     			line-height:58px;
     			&.active{
     				background: #2d8afd;
     				color:#fff;
     			}
     		}
     	}
     }*/
     .hint_title{
     	color: #808080;
     	font-size: 20px;
     	line-height: 60px;
     	text-indent: 1em;
     	margin-bottom: 70px;
     }
     .user_msg_box{
     	width: 96%;
     	height: 248px;
     	background: rgb(245,244,247);
     	border-radius:6px;
     	margin: 20px auto;
     	/*margin-bottom:20px;*/
     	.user_body{
     		height: 278px;
     		/*line-height:278px;*/
     		/*padding-top: 70px;*/
     		/*box-shadow: border-box;*/
     		/*border-bottom: 1px dashed #bdbdbd;*/
     		.headImg_box{
     			width:178px;
     			/*height:178px;*/
     			border-radius:50%;
     			margin:auto;
     			overflow: hidden;
     			padding-top: 35px;
     			img{
     				width: 100%;
     				height: 100%;
     				border-radius:50%;
     			}
     		}
     		.u_name{
     			text-align: center;
     			color: #173a64;
     			font-size:32px;
     			line-height:60px;
     		}
     		.u_address{
     			text-align: center;
     			color: #bdbdbd;
     			font-size:26px;
     		}
     	}
     	.project_box{
     		display: flex;
     		justify-content: space-around;
     		padding-top: 26px;
     		.project_list{
     			height:112px;
     			.project_del{
     				text-align: center;
     				color: #ff9800;
     				font-size: 28px;
     				line-height: 50px;
     			}
     			.project_title{
     				text-align: center;
     				color: #bdbdbd;
     				font-size:24px;
     			}
     		}
     	}
     }
     .debt_bank{
     	 width: 96%;
     	 background: #fff;
     	 border-radius:6px;
     	 margin: 0 auto;
     	 margin-bottom: 160px;
     	 .debt_list{
     	 	display: flex;
     	 	justify-content: space-between;
     	 	height:110px;
     	 	border-bottom: 1px solid #f5f4f7;
     	 	padding: 0 12px 0 26px;
     	 	box-sizing:border-box;
     	 	&:last-child{
     	 		border-bottom: none;
     	 	}
     	 	._title,._content{
     	 		line-height: 110px;
     	 		color: #333333;
     	 		font-size: 28px;
     	 	}
     	 	._content{
     	 		color: #4c4c4c;
     	 		font-size: 26px;
     	 		img{
     	 			height: 35%;
     	 			vertical-align: middle;
     	 		}
     	 		.iconfont{
     	 			font-size: 36px;
     	 			position: relative;
     	 			top: 5px;
     	 		}
     	 		span.active{
     	 			color:#fa4461;
     	 			margin-right: 15px;
     	 		}
     	 		img.imgActive{
     	 			width:60px;
     	 			height: 60px;
     	 			border-radius:50%;
     	 		}
     	 	}
     	 }
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







