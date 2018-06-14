<template>
  <div class="alertInt" v-show="show" @click="close">
    <div class="showBox">
      <h4 class="title">{{ title }}</h4>
      <p class="msg" :class="{'center': msg.length < 18}">{{ msg }}</p>
     <div class="clearfloat btn">
       <button class="ok" @click="forget">{{ btn }}</button>
       <button class="no">{{ btn2 }}</button>
     </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'alertInt',
    data () {
      return {
        show: false,
        msg: '',
        btn: '',
        btn2:'',
        title:'',
        callback: ''
      }
    },
    mounted () {
      this.$bus.$on('alertInt', this.openAlert)
    },
    methods: {
      openAlert (data) {
        if (typeof data === 'string') data = {msg: data};
        this.show = true;
        this.msg = data.msg;
        this.btn = data.btn || '忘记密码？';
        this.btn2 = data.btn2 || '确定';
        this.callback = data.cb || ''
      },
      close () {
        this.show = false;
        if (this.callback) this.callback()
      },
      forget(){
        this.$router.push('retrieve')
      }
    }
  }
</script>

<style lang="scss" sconed>
  @import '../assets/scss/style.scss';
  .alertInt {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    z-index: 20;
  .showBox {
    padding-top: 40px;
    padding-bottom: 30px;
    background: #fff;
    box-sizing: border-box;
    width: 520px;
    border-radius: 30px;
    margin: 350px auto;
    overflow: hidden;
  .title {
    text-align: center;
    font-size: 30px;
    font-weight: normal;
    line-height: 50px;
    padding-bottom: 30px;

  }
  .msg {
    font-size: 30px;
    text-align: justify;
    line-height: 42px;
    margin-top:50px;
  &.center {
     text-align: center;
   }
  }
  .btn{
  padding-top:20px;
  margin-top:80px;
  border-top:1px solid #d3d3d3;

  .ok {
    width:50%;
    color:#f9b640;
    float: left;
    font-size: 30px;
    background:none;
  }
  .no{
    width:50%;
    color: #2d8afd;
    float:right;
    font-size: 30px;
    background:none;
  }
  }
  }
  }
  .clearfloat:after{
     content: '';
    display: block;
    clear: both;
  }
</style>
