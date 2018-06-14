<template>
	<div class="pay-wrap">
		<div class="prompt">订单有效期时间为10分钟，请在有效期内完成订单</div>
		<div class="way-box">
			<div class="way">
				<div class="way_content">
					<div class="title">债权人</div>
					<div class="con">{{list.name}}</div>
				</div>
				<div class="way_content">
					<div class="title">债市金额</div>
					<div class="con">{{list.sum}}</div>
				</div>
				<div class="way_content">
					<div class="title">债务性质</div>
					<div class="con">{{list.plan}}</div>
				</div>
				<div class="way_content">
					<div class="title">服务费</div>
					<div class="con price">￥{{list.cover}}</div>
				</div>
				<div class="way_content">
					<div class="title">实际支付</div>
					<div class="con price">￥{{list.pay}}</div>
				</div>
			</div>			
		</div>	
		<ul class="payment">
			<li v-for="(item,index) in payList" :key="index" @click="beiAN(index)">
				<div class="pay">
					<span class="iconfont" :class="item.icon"></span>
					<span>{{item.name}}</span>
				</div>				
				<span class="iconfont icon-jiantou"></span>
			</li>
		</ul>
		<div id="formS" ></div>
	</div>
</template>

<script>
  export default {
    name: 'personal',
    data () {
      return {
      	dataObj:"",
      	list:{
      		name:'安琪',
      		sum:'18万',
      		plan:'资产置换',
      		cover:'399',
      		pay:'399'
      	},
      	payList:[
      		{icon:'icon-zhifubao icon1',name:'支付宝支付'},
      		{icon:'icon-weixinzhifu icon2',name:'微信支付'}
      	]
      }
    },
    mounted () {
    	this.$bus.$emit('pageHead','支付');
    	this.init()
  	},
  	destroyed () {
    	this.$bus.$emit('pageHead');
  	},
    methods: {
    	init () {
    		this.dataObj =  JSON.parse(localStorage.getItem("dataObj"));
    		this.list.name = this.dataObj.nameF;
    		this.list.sum = this.dataObj.grade + "万";
    		this.list.plan = this.dataObj.nature;
    		this.list.cover = this.dataObj.serviceCharge;
    		this.list.pay = this.dataObj.serviceCharge;
    	},
        beiAN (index){
       
    	 let charge = this.dataObj.serviceCharge
    	 let uid = this.dataObj.uid
    	 let bank = this.dataObj.bank
    	 
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
         
         creditor_address: this.dataObj.statusType == 1 ?   this.dataObj.districtF : this.dataObj.districtS, //债权人地址
         debtor_address:this.dataObj.statusType == 1  ?  this.dataObj.districtS  :  this.dataObj.districtF ,  //债务人地址
         
         creditor_phone: this.dataObj.statusType == 1 ?   this.dataObj.phoneF : this.dataObj.phoneS, //债权人手机号
         debtor_phone: this.dataObj.statusType == 1  ?  this.dataObj.phoneS  :  this.dataObj.phoneF ,  //债务人手机号
         
         creditor_name: this.dataObj.statusType == 1 ?   this.dataObj.nameF : this.dataObj.nameS, //债权人姓名
         debtor_name: this.dataObj.statusType == 1  ?  this.dataObj.nameS  :  this.dataObj.nameF ,  //债务人姓名
         
         creditor_type_id:this.dataObj.natureId, //债权人类型
         debtor_type_id: this.dataObj.natureId ,  //债务人类型
        
        }).then(({data}) => {
		    if(!data.ret){
			    if(index ===0){
			        //支付宝支付
			        var html_form = `
		        	<form id="form1" action="http://www.360qklsc.com/exchangeOrder/alipayvip" method="post">
		        		<input type="hidden"  name="paysn" value="1000"/>
		        		<input type="hidden" name="orders" value="1000"/>
		        		<input type="hidden" name="need_money" value="399.00"/>
		        		<input type="hidden" name="goods_desc" value="1000"/>
		        	</form>`;
		        	
		        	 let formS = document.getElementById("formS");
		        	formS.innerHTML = html_form;
		        	let form1 = document.getElementById("form1");
 		            form1.submit();
			        
			    } else if(index ===1){
			        // 微信支付
			        let timestamp = Date.parse( new Date());  //时间戳
			        let WXpay_url = "http://www.360qklsc.com/pay/zsindex.html?total_fee=" + charge + "&body=债事备案费用&out_trade_no=" + timestamp + "&attach=1";
			        location.href = WXpay_url;
			    }
		          	
		    }else{
	          	    this.$bus.$emit('alert', {
	          		title:'提示',
	          		msg:"提交失败，请重新提交",
	          		cb:function(){
	          			this.$router.push("checkIn")
	          		}
          	    })
		    }
		})
    	
        }
    },
    components: {
    }
  }
</script>

<style lang="scss" scoped>
.pay-wrap{
	padding-top:100px;
	.prompt{
			padding:30px 20px;
			font-size: 22px;
			color:#808080;
	}
	.way-box{
		padding:0 10px;
		.way{
			background: #FFFFFF;
			border-radius: 10px;
			.way_content{
				display: flex;
				justify-content: space-between;
				height:89px;
				line-height: 90px;
				border-bottom: 1px solid #f5f4f7;
				padding:0 25px;
				font-size: 26px;
				color:#a6a6a6;
				.con{
					font-size: 28px;
					color:#4c4c4c;
				}
				.price{
					color:#e51c23;
				}
			}
		}			
	}
	.payment{
		padding: 0 20px;
		background: #FFFFFF;
		margin-top:42px;
		li{
			display: flex;
			justify-content: space-between;
			height:109px;
			line-height: 110px;
			border-bottom: 1px solid #f5f4f7;
			
			.pay{
				span{
					font-size: 28px;
					&:first-child{
						font-size: 40px;
						margin-right: 36px;
					}
				}
				.icon1{
					margin-left: -15px;
					margin-right:20px!important;
					color: #07a0f8;
				}
				.icon2{
					color: #41b035;
				}
			}
		}
	}
}
</style>