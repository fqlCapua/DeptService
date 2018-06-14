<template>
  <div class="transfer">
    <div class="dec-result">
      <div class="successfully">
        <div class="successfully-pic"><img src="../assets/images/bd.png"/></div>
        <div class="text">转账成功</div>
        <div class="hint">恭喜您，您的DCC已经转入对方账户</div>
        <div class="link"></div>
      </div>
      <ul class="list-tab">
        <!--<li v-for="(item,index) in list" :key="index" class="clearfloat">-->
          <!--<div class="floatLeft">{{item.trans_amount}}</div>-->
          <!--<div class="floatRight">{{item.cont}}</div>-->
        <!--</li>-->
        <li>
          <div class="floatLeft">转入账户</div>
          <div class="floatRight">{{phone}}</div>
        </li>
        <li>
          <div class="floatLeft">转入数量</div>
          <div class="floatRight">{{amout}} DCC</div>
        </li>
      </ul>
      <div class="submit" @click="submit()">返回首页</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'transfer',
    data () {
      return {
        amout:'',
        phone:'',
        list:[
        ]
      }
    },
    mounted () {
      this.$bus.$emit('pageHead', { titleClass:""});
      this.amout = this.$route.query.trans_amount;
      this.phone = this.$route.query.phone;
      console.log(this.list)
    },
    destroyed () {
      this.$bus.$emit('pageHead');
    },
    methods: {
      submit(){
        this.$router.push({path:'index' })
      }
    },
    components: {
    }
  }
</script>

<style lang="scss" scoped>
  .transfer{
    padding:100px 20px 0;
    .dec-result{
      margin-top:10px;
      .successfully{
        height:569px;
        background: #fff;
        border-radius: 10px;
        border-bottom: 1px dashed #ebebeb;
        text-align: center;
        padding-top:102px;
        position: relative;
        .successfully-pic{
          width:181px;
          height:200px;
          margin:0 auto 48px;
          img{
            max-width: 100%;
          }
        }
        .text{
          font-size: 34px;
          color: #57a1fd;
          margin-bottom: 30px;
        }
        .hint{
          font-size: 24px;
          color: #b2b2b2;
        }
        .link{
          position:absolute;
          left:0;
          bottom:-18px;
          width:100%;
          display: flex;
          justify-content:space-between;
          &:before{
            display: block;
            content: "";
            width: 0;
            height: 0;
            border-top: 18px solid transparent;
            border-left: 18px solid #f5f4f7;
            border-bottom: 18px solid transparent;
          }
          &:after{
            display: block;
            content: "";
            width: 0;
            height: 0;
            border-top: 18px solid transparent;
            border-right: 18px solid #f5f4f7;
            border-bottom: 18px solid transparent;
          }
        }
      }
      .list-tab{
        height:auto;
        background: #fff;
        border-radius: 10px;
        padding:38px 72px 24px 76px;
        margin-bottom: 139px;
        li{
          display: flex;
          background: #fff;
          margin-bottom: 28px;
          .floatLeft{
            color:#808080;
            font-size:26px;
            width:160px;
            margin-right: 90px;
          }
          .floatRight{
            float: left;
            width: 100%;
            word-break:break-all;
            font-size:24px;
            color:#ff9800;
          }
        }
      }
      .submit{
        width:590px;
        height:87px;
        line-height:87px;
        background: #2d8afd;
        color: #fff;
        font-size: 34px;
        text-align: center;
        margin:0 auto;
        border-radius: 10px;
      }
    }
  }
</style>
