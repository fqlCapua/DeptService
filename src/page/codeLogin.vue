<template>
  <div class="login">
    <!-- 頭部 -->
    <div class="head-top"></div>
    <div class="form">
      <div class="img"><img src="../assets/images/denglu.png" alt="" width="100%" height="100%"></div>
      <div class="input" style="margin-top:35px">
        <input type="text" placeholder="手机号" v-model="phone">
      </div>
      <div class="input">
        <div class="captcha"><input type="text" placeholder="请输入验证码" v-model="code"></div>
        <button class="code_button" @click="getCode">{{ codeTime === 61 ? '获取验证码' : `${codeTime}s后重试`}}</button>
      </div>
      <div class="input" style="margin-bottom:0;">
        <div class="inpt-code">
          <input type="text" placeholder="图形验证码"  v-model="captCha">
        </div>
        <span class="code"  id="login-img"><img :src="img" alt="" width="100%" height="100%" @click="tab"></span>
      </div>
      <div class="reber">
        <div class="note">
          <router-link to="login">
            密码登陆
          </router-link>
        </div>
      </div>
      <div class="btn" @click="submit">登录</div>
      </div>
    <div class="option">
      <!--<router-link to="" tag="span" class="route">忘记密码</router-link>-->
      <!--|-->
      <router-link to="register" tag="span" class="route" >快速注冊</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        phone: '',
        pass: '',
        show:0,
        captCha:'',
        img:'',
        cap:'',
        codeTime:61,
        code:''
      }
    },
    mounted () {
      this.imgCaptcha()
    },
    methods: {

      submit(){
        let $that=this;
        this.axios.post('userLogin', {
          username: this.phone,
          code:this.code,
          captcha:this.captCha,
          cap:this.cap
        }).then(({data}) => {
          if (data.ret === 0) {
            let token=data.data.token;
            window.localStorage.setItem('token',token);
            this.$bus.$emit('alertCer', {
              msg:'登录成功'
            });
            setTimeout(function () {
              $that.$router.push('index');
            },2000)
          }
           if(data.msg ==='用户名和短信验证码不匹配或验证码已经过期.'){
             this.$bus.$emit('alertCer', {
               msg:'用户名和短信验证码不匹配'
             });
           }
          if(data.msg ==='图片验证码不匹配'){
            this.imgCaptcha();
            this.captCha = '';
            this.$bus.$emit('alertCer', {
              msg:'验证码不匹配'
            });
          }
        })

      },
      getCode () {
        if (this.codeTime !== 61) return false;
        if (this.phone === '' || !(/^1[34578]\d{9}$/.test(this.phone))) return this.$bus.$emit('alert', '手机号格式不正确或为空');
        this.codeTime = 60
        let timer = setInterval(() => {
          if (--this.codeTime === 0) {
            this.codeTime = 61
            clearInterval(timer)
          }
        }, 1000)
        this.axios.post('sms', {
          phoneNo: this.phone,
        }).then(({data}) => {
        })
      },

      say(){
        this.show = !this.show;
      },

      //校验图片验证
      imgCaptcha(){
        this.axios.post('captchaInfo', {
        }).then(({data}) => {
          this.img= data.data.img
          this.cap= data.data.str

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
      tab(){
        this.imgCaptcha();
      }
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
  .captcha{float:left;height:100%;line-height:28px;width:60%}
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
  .reber{
    width: 502px;
    margin: 20px auto;
  .remember{
    float: left;
  span:nth-child(1){vertical-align:middle;display: inline-block;margin-right: 10px;}
  span:nth-child(2){font-size:24px;color:#7f8695;}
  .icon-jizhumima{color:#fa4461;}
  }
  .note{
    float: right;
    font-size:24px;
    line-height:40px;
    a{
      color:#7dade8;
    }
  }
  }
  .btn{
    width: 504px;
    margin: 0 auto;
    background:#fa4461;
    text-align: center;
    height: 81px;
    line-height:81px;
    margin-top:100px;
    border-radius: 10px 10px;
    font-size: 32px;
    color: #fff;
  }
  }
  .option{
    position:absolute;
    bottom:30px;
    width: 100%;
    text-align: center;
    color:#3c90fe;
    font-size:28px;
  }
  }
</style>
