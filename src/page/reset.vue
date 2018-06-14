<template>
  <div class="forget-box">
    <div class="forget">
      <label class="label-list" for="phone">
        <div class="label-box">
        <span class="icon">手机号</span>
        <input class="input" id="phone" type="number" v-model="phone" placeholder="请输入手机号">
        </div>
      </label>
      <label class="label-list">
        <div class="label-box">
        <span class="icon">图片验证码</span>
        <div class="inpt-code input-captcha">
          <input type="text" id="register-captcha" v-model="captCha" placeholder="图形验证码">
        </div>
        <span class="cap" id="login-img"><img :src="img" id="register-img" alt=""  width="100%" height="100%" @click="tab"></span>
        </div>
      </label>
      <label class="label-list" for="phone">
        <div class="label-box">
        <span class="icon">短信验证码</span>
        <input class="code" type="text" placeholder="请输入验证码" v-model="code">
        <button class="code_button" @click="getCode">{{ codeTime === 61 ? '获取验证码' : `${codeTime}s后重试`}}</button>
        </div>
      </label>
      <label class="label-list">
        <div class="label-box">
        <span class="icon">设置新密码</span>
        <input type="text" placeholder="设置新密码" class="pass" v-model="pass" v-if="this.show"/>
        <input type="password" class="pass" v-model="pass" placeholder="设置新密码" v-else/>
        <div class="eye iconfont" @click="say" :class="{'icon-close-eye':!show,'icon-eyesopen':show}"></div>
        </div>
      </label>
    </div>
    <div class="btn" @click="submit">确定</div>
    <div class="mutie" v-show="loding">
      <div>登录密码重置成功</div>
    </div>


  </div>
</template>

<script>
  export default {
    name: 'forget',
    data () {
      return {
        phone: '',
        pass:'',
        loding:false,
        show:0,
        code:'',
        codeTime: 61,
        img:'',
        captCha:'',
        imgData:''
      }
    },
    mounted () {
      this.imgCaptcha()
      this.$bus.$emit('pageHead',{
        title:"忘记密码",
        titleClass:'bottom'
      })
    },
    destroyed () {
      this.$bus.$emit('pageHead')
    },
    methods: {

      submit () {
        if (this.phone === '' || !(/^1[34578]\d{9}$/.test(this.phone))) return this.$bus.$emit('alert', '手机号格式不正确或为空');
        if (this.code === '') return this.$bus.$emit('alert', '请输入手机验证码');
        this.checkoutCaptcha();
        this.axios.post('resetMobilePassword', {
          token:localStorage.getItem("token"),
          phone: this.phone,
          code:this.code,
          captcha:this.captCha,
          cap:this.imgData,
          password:this.pass
        }).then(({data}) =>{
          if (data.ret !== 0) this.$bus.$emit('alert', data.msg);
          if (data.ret === 0) {
            let that=this;
            this.loding=true;
            setTimeout(function () {
              that.loding=false;
              that.$router.push('setting')
            },1000)
          }
          if(data.ret === 401) this.$router.push('login')
        })
      },
      say(){
        this.show = !this.show;
      },
      getCode () {
        if (this.codeTime !== 61) return false;
        if (this.phone === '') return this.$bus.$emit('alert', '请输入手机号');
        this.codeTime = 60;
        let timer = setInterval(() => {
          if (--this.codeTime === 0) {
            this.codeTime = 61;
            clearInterval(timer)
          }
        }, 1000);
        this.axios.post('sms', {
          phoneNo: this.phone,
        }).then(({data}) =>{
          if (data.ret !==0) this.$bus.$emit('alert', data.msg)
        })
      },
      //校验图片验证
      imgCaptcha(){
        this.axios.post('captchaInfo', {
        }).then(({data}) => {
          this.img= data.data.img;
          this.imgData= data.data.str
        })
      },
      checkoutCaptcha () {
        this.axios.post('checkCaptcha', {
          cap: this.imgData,
          captcha:this.captCha
        }).then(({data}) => {
        })
      },
      tab(){
        this.imgCaptcha();
      },
    },

  }
</script>

<style lang="scss" sconed>
  @import '../assets/scss/style.scss';
  .forget-box {
  .forget {
    background: #fff;
    padding-top: 100px;
    padding-bottom: 10px;

  .label-list {
    display: block;
    border-bottom: 1px solid #ececec;
    margin-top: 28px;
    position: relative;
  .label-box {
    width: 710px;
    margin: 0 auto;
    height: 85px;
    line-height: 85px;

  .inpt-code {
    float: left;
    height: 100%;
  }

  .code {
    float: left;
    /*margin-top:20px;*/
    background: none;
    font-size: 28px;
  }

  .cap {
    float: right;
    display: inline-block;
    width: 140px;
    height: 55px;
    margin-top: 14px;
  }

  .pass {
    background: none;
  }

  .eye {
    color: red;
    float: right;
    margin-right: 20px;
  }

  .code_button {
    float: right;
    margin-top: 20px;
    background: none;
    color: #2f89ff;
  }

  .icon {
    float: left;
    width: 200px;
    font-size: 32px;

  img {
    vertical-align: middle;
  }

  }
  .input {
    background: none;
    /*color: #fff;*/
    font-size: 28px;
  }

  input {
    width: 200px;
    height: 100%;
    line-height: 87px;
  }

  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    font-size: 32px;
    line-height: 32px;

  }

  input:-moz-placeholder, textarea:-moz-placeholder {
    font-size: 32px;
    line-height: 32px;

  }

  input::-moz-placeholder, textarea::-moz-placeholder {
    font-size: 32px;
    line-height: 32px;

  }

  input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    font-size: 32px;
    line-height: 32px;

  }

  }
  }
  .label-list:last-child {
    border: none
  }

  }
  .btn {
    background: #2f89ff;
    height: 80px;
    width: 502px;
    margin: 100px auto;
    border-radius: 10px;
    text-align: center;
    line-height: 80px;
    font-size: 32px;
    color: #fff;
  }


  .mutie{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background:rgba(0,0,0,.3);
    z-index: 99999;
  div{
    width: 520px;
    height:280px;
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    -o-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    -webkit-transform: translate(-50%,-50%);
    background: #fff;
    text-align: center;
    line-height:280px;
    font-size: 28px;
    border-radius:10px 10px ;
    color: #666;

  }
  }
  }
</style>
