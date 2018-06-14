<template>
  <div class="index_wrap" style='background: #fff;'>
    <header>
      <div class="logo">
        <img :src="logo" alt="" width="100%" height="100%">
      </div>
    </header>
    <!--列表-->
   <ul class="file">
    	<li v-for="(item,index) in list" @click="go(index)">
	    		<i><img :src="item.img" alt="" width="100%" height="100%"/></i>
	    		<div>{{item.name}}</div>
    	</li>
    </ul>
     <div class="wrap">
         	<div class="vip-img">
         		<img :src="vip" alt="" width="100%" height="100%"  @click="img"/>
         	</div>
     </div>
     <div class="message">
     	<div class="title-box">
     		  <h3 class="title floatLeft">最新资讯</h3>

     	</div>
       <div class="goods-list">
             	 <div v-for='(item,index) in goods' :key='index' :class="item.flat"  @click="good(index)">
             	 	<img :src="item.img" alt=""  width="100%" height="100%"/>
             	 <p class="fotsize">{{item.title}}</p>
             	 <p class="fotsize2">{{item.title2}}</p>
             	 </div>
     </div>
  </div>
  <!--list-box-->
  <ul class="list-box">
  	<h3 class="title">实惠专区</h3>
  	 <li class="list" v-for='(item,index) in lists' :key='index' @click="jump(index)">
  	 		<div class="floatLeft">
	  	  <img :src="item.img" alt="" width="100%" height="100%"/>
	  	 	</div>
	  	 	<div class='floatLeft duihuan'>
	  	 		<p>{{item.title}}</p>
	  	 		<p>{{item.title2}}</p>
	  	 	</div>
	  	 	<div class="floatRight">{{item.btn}}</div>
  	 </li>
  </ul>
  <div class="loding"></div>
  </div>
</template>
<script>
export default {
  name: 'index',
  data () {
    return {
      logo: require('../assets/images/banner.png'),
      vip: require('../assets/images/vip.png'),
      list: [
          {name:"线上商城",img:require('../assets/images/xx.png'),path:'',id:'1'},
          {name:"线下商城",img:require('../assets/images/xxsc.png'),path:'',id:'2'},
          {name:"附近债行",img:require('../assets/images/zh.png'),id:'3'},
          {name:"附近解债师",img:require('../assets/images/jzs.png'),id:'1'}
      ],
      goods:[
        {img:require('../assets/images/upvaluation.png'),title:'DCC空间升值',title2:'专家解说',flat:'floatLeft',path:'newsList'},
        {img:require('../assets/images/detrusion.png'),title:'推出积分解债，更快捷',title2:'强力推荐',flat:'floatRight',path:'blockchain'}
      ],
      lists:[
          {img:require('../assets/images/conversion.png'),title:'低价兑换区',title2:'商城兑换',btn:'进入'},
          {img:require('../assets/images/displace.png'),title:'债权置换专区',title2:'解除您债务烦恼',btn:'进入'}
      ]
    }
  },
  mounted () {
    this.$bus.$emit('footer',{
      button: [],
      navShow: true
    })
    this.loko();
  },
  destroyed () {
    this.$bus.$emit('footer')
  },
  methods: {
    seeDetails () {
      //公告
      this.$router.push('message')
    },
     img(){
       this.$router.push('precept')
     },
    go(index){
    	this.token=localStorage.getItem("token");
      if(index==0){
        window.location.href="http://www.360qklsc.com/public/zzuser?token="+this.token;
      }else{
    		 this.$router.push({path: this.list[index].path})
    	}
      if(index==1){
        this.$bus.$emit('alert', '正在开发，请等待');
      }
      if(index==2){
        this.$bus.$emit('alert', '正在开发，请等待');
      }
      if(index==3){
        this.$bus.$emit('alert', '正在开发，请等待');
      }
    },
    good(index){
      this.$router.push({path: this.goods[index].path})
    },
    jump(index){
     this.token=localStorage.getItem("token");
      if(index==0){
        window.location.href="http://www.360qklsc.com/public/zzuser?token="+this.token;
      }
      if(index==1){
        window.location.href="http://www.360qklsc.com/public/zzuser?token="+this.token;
      }
    },
    //   获取token
    loko(){
      if(!localStorage.getItem("token")){
        this.$router.push('login')
      }
    },


  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/style.scss';
  .logo{
  	width: 100%;
  	height:420px;
  	}
.file{
	display: flex;
	justify-content: space-around;
	height:140px;
	width:640px;
	margin: 0 auto;
	li{
		text-align: center;
		a{
			color:#222222;
		}
		i{
			width: 48px;
			height:52px;
			display:inline-block;
			line-height:140px;

		}
	}
	}
.wrap{
		height: 162px;
		background: #f5f4f7;
		.vip-img{
			  width: 683px;
		    margin: 0 auto;
		    padding-top:20px;
		}
	}
	.message{
		.title-box{
			width:100%;height:77px;
			line-height: 77px;
			padding-left:20px;
			padding-right:20px;
			.floatLeft{
				float:left;
				/*font-size:30px;
				font-weight:500;*/
			}
			.floatRight{
				float: right;

			}
			}
			.goods-list{
				height: 306px;
				width:660px;
				margin: 0 auto;
				overflow: hidden;
				.floatLeft{
					float:left;
					width: 300px;
					.fotsize{font-size:28px;font-weight:600;}
					.fotsize2{font-size: 22px;color:#a9a9a9;margin-top: 10px;}
				}
				.floatRight{
					float:right;
					width: 300px;
					.fotsize{font-size: 28px;font-weight:600;}
					.fotsize2{color:#a9a9a9;font-size: 22px;margin-top: 10px;}
				}
			}
	}
.list-box{

	.title{
	height: 77px;
	line-height: 77px;
	padding-left: 20px;
	box-sizing: border-box;
	border-bottom: 1px solid #f5f4f7;
	}
.list{
	width:685px;
	margin:0 auto;
	height:170px;
	border-bottom: 1px solid #f5f4f7;
  overflow: hidden;
	.floatLeft{
		height: 142px;
		width:202px;
		float:left;
		margin-top:15px;
	}
	.duihuan{
		padding-top:35px;
		margin-left: 24px;
		p:nth-child(1){
			font-size:28px;
			font-weight:550;
			margin-bottom:5px;
		}
			p:nth-child(2){
	     color:#a9a9a9;
		}
		}
		.floatRight{
			float:right;
			border:1px solid;
			height: 60px;
			text-align: center;
			line-height:60px;
			width: 120px;
			color:#fa4461;
			border-radius:7px 7px;
			margin-top:60px;
		}
}
}
.loding{
	/*height:50px;*/
	  background: #f5f4f7;
		margin-bottom: 100px;
		line-height: 100px;
		text-align: center;
		font-size: 26px;
		color:#999;
}
</style>
