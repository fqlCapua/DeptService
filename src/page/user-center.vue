<template>
  <div class="user_wrap">
    <div class="top">
      <div class="cont-top clearfix">
        <div class="floatLeft">
          <i><img :src="img" alt="" width="100%" height="100%"></i>
          <span>{{phone.replace(/(\d{3})(\d{4})(\d{3})/,'$1****$3')}}</span>
        </div>
        <div class="floatRight">
          <router-link to="message">
            <span class="iconfont icon-youxiang">
              <i :class="new_msg ? 'new_msg':''"></i>
               <!-- <i class="new_msg"></i> -->
            </span>
          </router-link>
        </div>
      </div>
      <div class="mid_banner">
        <!--数量-->
        <div class="num-dcc">
          <router-link to="#">
            <div class="title"> 总资产 </div>
            <div class="num">{{num}}<span>&nbsp;DCC</span></div>
          </router-link>
        </div>
        <!--单价，市价-->
        <div class="price">
          <div class="simple">
            <p>{{price}}</p>
            <div>单价(￥)</div>
          </div>
          <div class="city">
            <p>{{marketValue}}</p>
            <div>市值(￥)</div>
          </div>
          <div class="city">
            <p>{{score}}</p>
            <div>积分(个)</div>
          </div>
        </div>
        <ul class="option-tab">
          <li v-for="(item,index) in tabList">
            <router-link :to="item.router">
              <!--    <i :class="item.icon"></i> -->{{item.name}}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <!---->
    <div style='background: #fff;'>
      <ul class="cont-list">
        <li v-for="(item,index) in list" :key="index" class="clearfix">
          <router-link :to="item.router">
            <div class="floatLeft">
              <span :class="item.icon"></span>
              <span>{{item.name}}</span>
            </div>
            <div class="floatRight" :class="item.arrows"></div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Clipboard from 'clipboard'
export default {
  name: 'userCenter',
  data() {
    return {
      num: '',
      phone: '',
      img: "",
      msg: '',
      price: '',
      score: '',
      marketValue: '',
      freeze_score: '',
      new_msg:'',
      tabList: [
        { name: '转入钱包', icon: 'iconfont icon-qianbao3', router: 'intoPurse' },
        { name: '会员转账', icon: 'iconfont icon-jiaoyi', router: 'C2C' }
      ],
      list: [
        { "name": "登记记录", "icon": "iconfont icon-dengjixinxi","arrows": "iconfont icon-jiantou", 'router': 'registration' },
        { "name": "解债记录", "icon": "iconfont icon-qianbao","arrows": "iconfont icon-jiantou", 'router': 'debt_records' },
        { "name": "资产记录", "icon": "iconfont icon-xingzhuang","arrows": "iconfont icon-jiantou", 'router': 'asset'},
        { "name": "设置", "icon": "iconfont icon-shezhi", "arrows": "iconfont icon-jiantou", 'router': 'setting' }
      ]
    }
  },
  beforeMount() {
    this.home();
    this.loko();
  },
  mounted() {
    this.$bus.$emit('pageHead', "我的")
    this.$bus.$emit('footer', {
      navShow: true
    })
  },
  beforeDestroy() {
    this.$bus.$emit("pageHead", false);
    this.$bus.$emit('footer', false)
  },
  computed: {

  },
  methods: {
    home() {
      this.axios.post('userHomePage', {
        token: localStorage.getItem("token"),
      }).then(({ data }) => {
        this.num = data.data.DCC_total;
        this.phone = data.data.phone;
        localStorage.setItem('phone', this.phone);
        localStorage.setItem('imgUrl', data.data.head);
        this.img = data.data.head;
        window.localStorage.setItem('has', data.data.has_payment_password);
        this.price = data.data.DCC_price;
        this.marketValue = data.data.DCC_marketValue;
        this.score = data.data.debt_score;
        if (data.ret === 401) this.$router.push('login');
        this.new_msg = data.data.new_msg
      })
    },
    //   获取token
    loko() {
      if (!localStorage.getItem("token")) {
        this.$router.push('login')
      }
    },
  },
}

</script>
<style lang="scss" scoped>
@import '../assets/scss/style.scss';
.user_wrap {
  .top {
    width: 100%;
    background-color: #FFFFFF;
    margin-bottom: 25px;
    padding-bottom: 30px;
    .cont-top {
      width: 100%;
      margin: 0 auto;
      padding: 100px 20px 15px 20px;

      .floatLeft {
        float: left;
        i {
          border: 1px solid #fff;
          border-radius: 50%;
          width: 93px;
          display: inline-block;
          height: 93px;
          float: left;
          background: url("../assets/images/morenT.png")no-repeat;
          background-size: 100%;
          overflow: hidden
        }
        span {
          height: 93px;
          display: inline-block;
          float: left;
          line-height: 93px;
          font-size: 32px;
          color: #222222;
          margin-left: 18px
        }
      }
      .floatRight {

        float: right;
        width: 70px;
        span {
          position: relative;
          display: inline-block;
          font-size: 2.5em;
          color: #000;
        }
         .new_msg {
         position:absolute;
          top: 9px;
          right: -3px;
          background: #f25749;
          display: inline-block;
          width:13px;
          height:13px;
          border: 1px solid #f25749;
          border-radius: 50%;
        }
        /* span {
          font-size: 50px;
          display: inline-block;
          color: #000;
        }
        .new_msg {
          
        }*/
      }
    }
    .num-dcc {
      text-align: center;
      padding-top: 20px;
      .title {
        padding-left: 30px;
        font-size: 35px;
        color: #fff;
        line-height: 50px;
      }
      .num {
        font-size: 48px;
        font-weight: 800;
        color: #fff;
        margin-top: 10px;
        padding-bottom: 40px;
        span {
          font-size: 30px;
          font-weight: 500;
        }
      }
    }
    .price {
      width: 100%;
      height: 144px;
      display: flex;
      border-bottom: 1px solid #7EB7FF;
      &>div:nth-child(1) {
        flex:3;
        width: 49%;
      }
      &>div:nth-child(2) {
flex:4;
        width: 49%;
      }
      &>div:nth-child(3) {
flex:3;
        width: 90%;
      }
      &>div {
        padding-top: 20px;

        text-align: center;
        &>div {
          padding: 0 20px;
        }
        div {
          width: 100%;
          font-size: 28px;
          color: #B1CDF1;
          text-align: center;
        }
        p {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: wrap;
          font-size: 1.1em;
          color: #FFFFFF;
          span {
            margin-right: 5px;
          }
        }
      }
    }
  }
  .option-tab {
    display: flex;
    height: 90px;
    li:nth-child(1) {
      border-right: 1px solid #58A1FF;
    }
    li {
      width: 50%;
      font-size: 30px;
      color: #fff;
      text-align: center;
      line-height: 90px;
      a {
        color: #fff;
      }
      i {
        display: inline-block;
        font-size: 50px;
        vertical-align: middle;
        margin-right: 20px
      }
    }
  }
  .cont-list {
    /* width: 676px;*/
    margin: 0 auto;
    padding: 0 37px;
    background: #fff;
    li {
      border-bottom: 1px solid #f7f7f7;
      height: 99px;
      line-height: 99px;
      box-sizing: border-box;
      font-size: 28px;

      a {
        display: block;
        color: #000;
        width: 100%;
        height: 99px;
        .floatLeft {
          float: left;
          height: 100%;
          span:first-child {
            color: #1c81fd;
            display: inline-block;
            font-size: 45px;
            vertical-align: middle;
            margin-right: 20px;
          }
        }
        .floatRight {
          float: right;
          height: 100%;
        }
      }
    }
  }

  .clearfix:after {
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
}

.mid_banner {

  width: 90%;
  border-radius: 13px;
  background-color: #2F89FF;
  margin: 0 auto;
  padding: 20px 5% 0 5%;
  .num-dcc {
    border-bottom: 1px solid #4897FF;
  }
}

</style>
