<template>
  <div id="payPwd">
    <div class="title">
      请输入原支付密码
    </div>
    <input ref="pwd" type="password" maxlength="6" v-model="msg"  style="position:absolute;z-index: -1;left:-100%;opacity: 0"/>
    <ul class="pwd-wrap" @click="focus">
      <li><i v-if="msgLength > 0"></i></li>
      <li><i v-if="msgLength > 1"></i></li>
      <li><i v-if="msgLength > 2"></i></li>
      <li><i v-if="msgLength > 3"></i></li>
      <li><i v-if="msgLength > 4"></i></li>
      <li><i v-if="msgLength > 5"></i></li>
    </ul>
     <div class="wangji" @click="wangji">忘记支付密码？</div>
  </div>
</template>

<script>
  export default {
    name: 'pwdpush',
    data () {
      return {
        msg:'',
        msgLength:0,
      }
    },
    mounted () {
      this.$bus.$emit('pageHead',{
               title:"修改支付密码",
      })
    },
    watch:{

      msg(curVal){
        let that = this
        if(/[^\d]/g.test(curVal)){
          this.msg = this.msg.replace(/[^\d]/g,'');
        }else{
          this.msgLength = curVal.length;
        }
        if(this.msg.length === 6){
          this.axios.post('validatePassword', {
            token:localStorage.getItem("token"),
            pay_password:this.msg,
          }).then(({data}) => {
            console.log(data)
            if(data.msg === "交易密码不匹配"){
              that.msg =''
              return this.$bus.$emit('alert', '交易密码不正确')

            }
            if(data.msg === "交易密码验证通过"){
              this.$router.push('newPsd')
            }
          })


        }

      },

    },
    beforeDestroy () {
    },
    methods: {
      focus(){
        this.$refs.pwd.focus();
      },
      wangji(){
   this.$router.push('retrieve')
    },



      },
    destroyed () {
      this.$bus.$emit('pageHead')
    },

  }
</script>
<style lang="scss" scoped>
  @import '../assets/scss/style.scss';
  #payPwd{
  .title{
    padding-top:100px;
    margin-bottom:100px;
    height: 244px;
    text-align:center;
    line-height:244px;
    font-size: 28px;
  }
  .pwd-wrap{
    width:80%;
    height:100px;
    padding-bottom: 1px;
    margin: 0 auto;
    background: #fff;
    border:1px solid #ddd;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    cursor: pointer;
  li{
    list-style-type:none;
    text-align: center;
    line-height:100px;
    -webkit-box-flex: 1;
    flex: 1;
    -webkit-flex: 1;
    border-right:1px solid #ddd ;
  i{
    height: 10px;
    width: 10px;
    border-radius:50% ;
    background: #000;
    display: inline-block;
  }
  }
  li:last-child{
    border-right: 0;
  }
  }
  .wangji{
    color:#5094c7;
    float: right;
    margin-right:70px;
    margin-top:20px;
    font-size: 28px;
  }
  }

</style>
