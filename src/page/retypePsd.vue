<template>
  <div id="payPwd">
    <div class="title">
      请再次输入支付密码
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
    <div class="sub" @click="submit">确定</div>
  </div>
</template>

<script>
  export default {
    name: 'newPsd',
    data () {
      return {
        show:false,
        msg:'',
        msgLength:0,
      }
    },
    mounted () {
      this.$bus.$emit('pageHead',{
        title:"确认支付密码",
      })
    },
    watch:{
      msg(curVal){
        if(/[^\d]/g.test(curVal)){
          this.msg = this.msg.replace(/[^\d]/g,'');
        }else{
          this.msgLength = curVal.length;
        }
      },
    },
    beforeDestroy () {
    },
    methods: {
      focus(){
        this.$refs.pwd.focus();
      },
      submit(){
        if(this.msg.length === 6){
          let that=this;
          this.show=true;
          this.axios.post('validatePassword',{
            token:localStorage.getItem("token"),
            pay_password:this.msg
          }).then(({data}) => {
            if(data.msg ==="交易密码不匹配"){
              this.msg =""
              return this.$bus.$emit('alert', '输入错误')

            }else{
              this.$bus.$emit('alertCer', '设置成功')
              setTimeout(function () {
          that.$router.push('setting')
              },1000)
            }
          })

        }

      }
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
