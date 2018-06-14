<template>
  <div class="forget-box">
    <div class="forget">
      <label class="label" for="phone">
        <span class="icon"><img src="../assets/images/shoujiaho.png" alt="" width="100%" height="100%"></span>
        <input class="input" id="phone" type="number" v-model="phone" placeholder="请输入手机号">
      </label>
      <label class="label" for="phone">
        <span class="icon"><img src="../assets/images/yzm.png" alt="" width="100%" height="100%"></span>
        <input class="code" type="text" placeholder="请输入验证码" v-model="code">
        <button class="code_button" @click="getCode">{{ codeTime === 61 ? '获取验证码' : `${codeTime}s后重试`}}</button>
      </label>
    </div>
    <div class="sub" @click="submit">确定</div>
  </div>
</template>

<script>
  export default {
    name: 'retrieve',
    data () {
      return {
        phone: '',
        pass: '',
        show:0,
        code:'',
        codeTime: 61,
      }
    },
    mounted () {
      this.$bus.$emit('pageHead',{
        title:"找回支付密码",
        titleClass:'bottom'
      })
    },
    destroyed () {
      this.$bus.$emit('pageHead')
    },
    methods: {
      say(){
        this.show = !this.show;
      },
      getCode () {
        if (this.codeTime !== 61) return false;
        if (this.phone === '') return this.$bus.$emit('alert', '请输入手机号')
        this.codeTime = 60
        let timer = setInterval(() => {
          if (--this.codeTime === 0) {
            this.codeTime = 61
            clearInterval(timer)
          }
        }, 1000)
        this.axios.post('Auth/registerSms', {
          phone: this.phone,
          code:this.code,
        }).then(({data}) => {
          if (data.status !== 200) this.$bus.$emit('alert', data.message)
        })
      },
      submit () {
        if (this.phone === '') return this.$bus.$emit('alert', '请输入手机号');
        this.doLogin()
      },
      doLogin () {
//        this.axios.post('/Auth/login', {
//          phone: this.phone,
//          password: this.pass
//        }).then(({data}) => {
//          if (data.status === 200) {
//            this.$router.push('/')
//          } else {
//            this.$bus.$emit('alert', data.message)
//          }
//        })
      }
    },

  }
</script>

<style lang="scss" sconed>
  @import '../assets/scss/style.scss';
  .bottom{border-bottom:1px solid #ececec;}
  .forget{
    background: #fff;
    padding-top:100px;
    padding-bottom:90px;
  .label {
    display: block;
    width: 600px;
    margin: 0 auto;
    border-bottom: 1px solid #dddddd;
    margin-top: 28px;
    height: 85px;
    line-height: 85px;
    position: relative;
    padding-left: 60px;
  input{
     height: 100%;
  }
  .code{float:left;
    background: none;
    font-size:28px;
  }


  .code_button{
    float: right;
    margin-top:20px;
    background:none;
    color: #2f89ff;
  }

  .icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    /*color: #fff;*/
    font-size: 40px;
  img{
    vertical-align: middle;
  }
  }
  .input {
    background: none;
    /*color: #fff;*/
    font-size: 28px;
  }
  }
  }
  .sub{
    background:#2f89ff;
    height: 80px;
    width:502px;
    margin: 100px auto;
    border-radius: 10px;
    text-align: center;
    line-height: 80px;
    font-size: 32px;
    color:#fff;
  }
</style>
