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
        <input type="password" placeholder="密码" v-model="pass">
      </div>
      <div class="input" style="margin-bottom:0;">
        <div class="inpt-code">
          <input type="text" placeholder="图形验证码"  v-model="captCha">
        </div>
         <span class="code"  id="login-img"><img :src="img" alt="" width="100%" height="100%" @click="tab"></span>
      </div>
      <div class="reber">
        <div class="remember">
          <span class="iconfont " @click="say" :class="{'icon-circle2yuanquan' :show,'icon-jizhumima' :!show}"></span>
          <span>记住用户名和密码</span>
        </div>
        <div class="note">
          <router-link to="codeLogin">
          短信验证码登陆
          </router-link>
        </div>
      </div>
        <div class="btn" @click="submit">登录</div>
    </div>
    <div class="option">
      <router-link to="codeLogin" tag="span" class="route">忘记密码</router-link>
      |
      <router-link to="register" tag="span" class="route">快速注冊</router-link>
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
      cap:''
    }
  },
  mounted () {
    this.imgCaptcha();
    this.getCookie();
  },
  methods: {

    submit () {
      if (this.phone === '') return this.$bus.$emit('alert', '请输入手机号');
      if (this.pass === '') return this.$bus.$emit('alert', '请输入登录密码');
      //保存的账号
      let name=this.phone;
      //保存的密码
      let pass=this.pass;
      if(this.show===0){
        //传入账号名，密码，和保存天数3个参数
        this.setCookie(name,pass,7);
      }
      this.doLogin()
    },
    say(){
    this.show = !this.show;
    },

    doLogin() {
      let $that=this;
      this.axios.post('userLogin', {
        username: this.phone,
        password: this.pass,
        captcha:this.captCha,
        code:this.code,
        cap:this.cap
      }).then(({data}) => {
        if (data.ret === 0){
          let token=data.data.token;
          window.localStorage.setItem('token',token);
          this.$bus.$emit('alertCer', {
            msg:"登录成功"
          });
          setTimeout(function () {
            $that.$router.push('index');
          },2000)
        }
         if(data.msg === '图片验证码不匹配'){
           this.imgCaptcha();
           $that.captCha =''
         }
         if(data.msg === '用户名和密码不匹配'){
           $that.pass =''
         }
        if(data.ret === 1){
          //this.$bus.$emit('alertCer', data.msg);
            this.$bus.$emit('alertCer', {
              msg:data.msg
            });

        }

      })
    },
    //校验图片验证
    imgCaptcha(){
      this.axios.post('captchaInfo', {
      }).then(({data}) =>{
        this.img= data.data.img
        this.cap= data.data.str
      })
    },
    checkoutCaptcha () {
      let $that=this;
      this.axios.post('checkCaptcha', {
        cap: $that.cap,
        captcha:$that.captCha
      }).then(({data}) => {
      })
    },
    tab(){
        this.imgCaptcha();
    },
    //设置cookie
    setCookie(c_name,c_pwd,exdays) {
      var exdate=new Date();//获取时间
      exdate.setTime(exdate.getTime() + 24*60*60*1000*exdays);//保存的天数
      //字符串拼接cookie
      window.document.cookie="userName"+ "=" +c_name+";path=/;expires="+exdate.toGMTString();
      window.document.cookie="userPwd"+"="+c_pwd+";path=/;expires="+exdate.toGMTString();
    },
    //读取cookie
    getCookie:function () {
      if (document.cookie.length>0) {
        var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
        for(var i=0;i<arr.length;i++){
          var arr2=arr[i].split('=');//再次切割
          //判断查找相对应的值
          if(arr2[0]=='userName'){
            this.phone=arr2[1];//保存到保存数据的地方
          }else if(arr2[0]=='userPwd'){
            this.pass=arr2[1];
          }
        }
      }
    },
    //清除cookie
    clearCookie:function () {
      this.setCookie("","",-1);//修改2值都为空，天数为负1天就好了
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
          width:60%;
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
