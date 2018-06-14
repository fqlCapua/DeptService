
<template>
  <div class="setting_body">
  	<div class="setting">
  		<div class="set-list">
	  		<div class="name">头像</div>
	  		<div class="floatRight">
	  			<span class="portrait"><img :src="img" width="100%" height="100%"/></span>
	  			 <i class="iconfont icon-jiantou"></i>
	  		</div>
	  		<input class="file" id="head_file" type="file" @change="onFileChange"/>
	  	</div>
	  	<div class="set-list" @click="change">
	  		<div class="name">账号</div>
	  		<div class="floatRight">
	  			<span>{{phone}}</span>
	  			<i class="iconfont icon-jiantou"></i>
	  		</div>
	  	</div>
	  	<div class="set-list" @click="reset">
	  		<div class="name">登录密码</div>
	  		<div class="floatRight">
	  			<i class="iconfont icon-jiantou"></i>
	  		</div>
	  	</div>
	  	<div class="set-list" @click="pwdpush">
	  		<div class="name">交易密码</div>
	  		<div class="floatRight">
	  			<i class="iconfont icon-jiantou"></i>
	  		</div>
	  	</div>
	  	<div class="set-list" @click="real">
	  		<div class="name">实名认证</div>
	  		<div class="floatRight">
	  			<i class="iconfont icon-jiantou"></i>
	  		</div>
	  	</div>
  	</div>
  	<div class="submit" @click="quit">退出登录</div>
  </div>
</template>

<script>
export default {
  name: 'setting',
  data () {
    return {
			image:'', //64
			img:require("../assets/images/morenT.png"),
      phone:localStorage.getItem("phone"),
    }
  },
  mounted () {
    this.$bus.$emit('pageHead', '设置')
    this.img = localStorage.getItem("imgUrl") == "" ? this.img : localStorage.getItem("imgUrl")
    this.haha()
  },
  created (){

  },
  destroyed () {
    this.$bus.$emit('pageHead')
  },
  methods: {

//    重置密码
    reset(){
      this.$router.push('reset')
    },
//    退出登录
    quit(){
      localStorage.removeItem('token');
      this.$router.push('login')
    },
    pwdpush(){
       let that=this;
      if(localStorage.getItem("has") == 0){
        that.$router.push('setPayPsd')
      }
      if(localStorage.getItem("has") == 1){
        that.$router.push('pwdpush')
      }
    },
    change(){
    	this.$router.push('change')
    },
    real(){
// 	this.$router.push('certification')
this.home()
    },
    haha(){
      this.axios.post('userHomePage', {
        token:localStorage.getItem("token"),
      }).then(({data}) => {
        window.localStorage.setItem('has',data.data.has_payment_password);
      })
    },
    onFileChange(e){
			var files = e.target.files || e.dataTransfer.files;
		   	if (!files.length)
		      return;
		      this.createImage(files[0]);
		},
		createImage(file){
		    var image = new Image();
		    var reader = new FileReader();
		    var vm = this;
		    reader.onload = (e) => {
		        vm.image = e.target.result;
            this.upLoad()
		    };
		    reader.readAsDataURL(file);
		},
    home(){
      this.axios.post('userHomePage', {
        token:localStorage.getItem("token"),
      }).then(({data}) => {
   if(data.data.certification == 1) return this.$router.push('certificationTrue');       //已認證
   if(data.data.certification == 0) return this.$router.push('certification');            //未認證
   if(data.data.certification == 2) return this.$router.push('certification');           //認證失敗
   if(data.data.certification == 3) return this.$bus.$emit('alertCer',"您已进入黑名单");

      })
    },
    upLoad(){
        this.axios.post('userUpload', {
          token:localStorage.getItem("token"),
          img:this.image
        }).then(({data})=>{
             this.img=data.data.server_url;
             localStorage.setItem("imgUrl",this.img);
             this.postUserInfo();
          if(data.ret === 401) this.$router.push('login')
        })

    },
    postUserInfo (){
       this.axios.post('postUserInfo', {
        token:localStorage.getItem("token"),
        phone:this.phone,
        head:this.img
      }).then(({data}) => {
         if(data.ret === 401) this.$router.push('login')
      })
    },

  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/style.scss';

  .setting_body {
      padding-top:100px;
      margin-top:15px;
      .setting{
      	margin:0 10px;
      	padding:0 10px;
      	background-color: #fff;
      	border-radius:10px;

      }
    .set-list{
      height: 90px;
      line-height: 90px;
      border-bottom: 1px solid #f5f4f7;
      margin-top:1px;
      font-size: 30px;
      display: flex;
      justify-content: space-between;
      color: #333333;
      padding: 0 40px;
       position: relative;
      /*&:nth-last-child(1){
          margin-top:22px;
      }*/
      .file{
      	width: 100%;
				 height: 100%;
				 position: absolute;
				 top: 0;
				 left: 0;
       		display: block;
       		outline: none;
       		opacity: 0;
      }
      .floatRight{
      	display: flex;
      	span{
      		color:#b2b2b2;
      	}
        .portrait{
        	display: block;
        	margin-top:14.5px;
        	width:66px;
        	height:66px;
        	overflow: hidden;
        	border-radius: 50%;
        	img{
        		width: 100%;
        		height:100%;
        	}
        }
      	.iconfont{
	        font-size: 40px;
	        color: #bfbdbd;
	        display: block;
	        margin-left: 30px;
	        /*font-weight: 600;*/
      	}
      }
    }
    .submit{
    	background: #2d8afd;
    	color:#fff;
    	font-size: 34px;
    	width:590px;
    	height:88px;
    	margin:242px auto 0;
    	border-radius: 10px;
    	text-align: center;
    	line-height: 88px;
    }
  }
</style>

