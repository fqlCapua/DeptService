<template>
  <div class="login">
    <div class="head-top"></div>
    <div class="form">
      <div class="img"><img src="../assets/images/zhuce.png" alt="" width="100%" height="100%"></div>
      <div class="input" style="margin-top:35px">
        <input type="text" placeholder="手机号" v-model="phone" @change="userCount">
      </div>
      <div class="input">
        <input type="password" placeholder="密码" v-model="psd">
      </div>
      <div class="input">
        <div class="inpt-code input-captcha">
          <input type="text" id="register-captcha" v-model="captCha" placeholder="图形验证码">
        </div>
         <span class="code" id="login-img"><img :src="img" id="register-img" alt=""  width="100%" height="100%" @click="tab"></span>
      </div>
        <div class="input">
          <div class="input-code"><input type="text" placeholder="请输入验证码" v-model="code"></div>
          <button class="code_button" @click="getCode">{{ codeTime === 61 ? '获取验证码' : `${codeTime}s后重试`}}</button>
        </div>
      <div class="deal">注册即代表您已同意 <span @click="deal">《债事联商服务协议》</span></div>
      <div class="btn" @click="submit">注册</div>
    </div>
    <div class="tog">
      已有账号？<router-link to="/login" tag="span" class="route">去登录</router-link>
    </div>
  </div>
</template>

<script>
import areaPage from '../components/area_select.vue'
export default {
  name: 'register',
  data () {
    return {
      img:'',
      phone: '',
      code: '',
      codeTime: 61,
      psd:'',
      imgData:'',
      captCha:'',
      fid:'',
      isUserCount:false
    }
  },
  mounted () {
    this.imgCaptcha()
  },
  beforeDestroy () {
    this.$bus.$off('areaBoxSelect')
  },
  methods: {
    // 获取验证码
    getCode () {
      if (this.codeTime !== 61) return false;
      if (this.phone === '' || !(/^1[34578]\d{9}$/.test(this.phone))) return this.$bus.$emit('alert', '手机号格式不正确或为空');
      this.codeTime = 60
      let timer = setInterval(() => {
        if (--this.codeTime === 0) {
          this.codeTime = 61;
          clearInterval(timer)
        }
      }, 1000);
      this.axios.post('sms', {
        phoneNo: this.phone,
      }).then(({data}) =>{

      })
},
    deal (){
       this.$router.push("deal")
    },

    // 注册提交
    submit () {
     let  $that =this;
      
      if (this.phone === '' || !(/^1[34578]\d{9}$/.test(this.phone))) return this.$bus.$emit('alert', '手机号格式不正确或为空');
      if (this.code === '') return this.$bus.$emit('alert', '请输入手机验证码');
      if (!this.isUserCount) return this.$bus.$emit('alert', '您的手机号已注册');
      this.checkoutCaptcha()
      this.axios.post('userRegister', {
        username: this.phone,
        password:this.psd,
        captcha:this.captCha,
        cap: this.imgData,
        code:this.code
      }).then(({data}) => {
        if (data.ret === 0) {
          var token=data.data.token;
          window.localStorage.setItem('token', token)
          this.$bus.$emit('alertCer', {
            msg: '恭喜您注册成功',
          });
          setTimeout(function(){
        	   	 $that.$router.push("login")
        	   },1000)
        }else{
        	this.imgCaptcha();
        	if(data.msg.indexOf("图片验证码已过期") > -1){
        	   this.$bus.$emit('alertCer',"图片验证码不对");
        	}
        }
      })
    },
    userCount(){
    	let $that = this;
    	  this.axios.post('userCount', {
        phone: this.phone,
      }).then(({data}) => {
         if(data.data == 1){
        	   this.$bus.$emit('alertCer',"您的手机号已注册");
        	   setTimeout(function(){
        	   	 $that.$router.push("login")
        	   },1000)
        	}else{
        		this.isUserCount = false;
        	}
      })
    },
    tab(){
      this.imgCaptcha();
    },


//校验图片验证
    imgCaptcha(){
      this.axios.post('captchaInfo', {
      }).then(({data}) => {
        this.img= data.data.img
        this.imgData= data.data.str


      })
    },
 checkoutCaptcha () {
     let $that=this;
     this.axios.post('checkCaptcha', {
     cap: $that.imgData,
     captcha:$that.captCha
   }).then(({data}) => {

   })
 },

  },
  components: {
    areaPage
  }
}
</script>
<style lang="scss" scoped>
  @import '../assets/scss/style.scss';
  .login {
    .head-top{
      height:521px;
      background:url("../assets/images/balogin.png");
    }
    .form{
      background: #fff;
      width: 662px;
      margin: 0 auto;
      position: relative;
      top:-196px;
      border-radius:20px 20px;
      padding-top:80px;
      padding-bottom: 50px;
      .img{
        height: 75px;
        width:164px;
        margin-left:78px;
      }
      .input{
        border-bottom:1px solid #818fb0;
        height:60px;
        width: 502px;
        margin: 0 auto;
        margin-bottom:40px;
        input{width:70%;height: 100%;font-size: 28px;}
        .inpt-code{
          float: left;
          height: 100%;
          width: 60%;
        }
        .input-code{float:left;height:100%;line-height:28px;width: 60%}
        .code_button{
          background: #fff;
          float: right;
          height:100%;
          color:#3f89e2;
        }
        input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
          font-size: 32px;
          line-height:32px;
          color:#818fb0;
        }
        input:-moz-placeholder, textarea:-moz-placeholder {
          font-size: 32px;
          line-height:32px;
          color:#818fb0;
        }
        input::-moz-placeholder, textarea::-moz-placeholder {
          font-size: 32px;
          line-height:32px;
          color:#818fb0;
        }
        input:-ms-input-placeholder, textarea:-ms-input-placeholder {
          font-size: 32px;
          line-height:32px;
          color:#818fb0;
        }
        .code{float: right;display: inline-block;width: 140px;height:55px;border:1px solid;}
      }
      .btn{
        width: 504px;
        margin: 0 auto;
        background:#fa4461;
        text-align: center;
        height: 81px;
        line-height:81px;
        margin-top:50px;
        border-radius: 10px 10px;
        font-size: 32px;
        color: #fff;
      }
      .deal{
        color:#666;
        margin-top: 2px;
        margin-bottom: 2px;
        font-size: 20px;
        text-align: center;
        span{
        color:#3f89e2
        }
      }
    }
    .tog{
      position:absolute;
      bottom:30px;
      width: 100%;
      text-align: center;
      font-size:28px;
      span{
        color:#3c90fe;
      }
    }
  }
</style>
