<template>
  <div class="list-box">
    <div class="hed-top">
          <div class="heads"></div>
    </div>

  <!--解债方案-->
    <div class="scheme">
       <div class="title">解债方案通知函</div>
      <div class="motie">

      </div>
         <div class="list">
              <div class="name">{{telname.tel}}用户 您好：</div>
              <div class="read">龙凤债行解债师安琪为您定制的解债方案，请您
                务必审核阅读：</div>
    <ul class="list-tab">
       <li v-for="(item,index) in list" :key="index" class="clearfloat">
         <div class="floatLeft">{{item.name}}</div>
         <div class="floatRight">{{item.cont}}</div>
       </li>
    </ul>
        <div class="read">若您同意此方案，请点击确认按钮，提交总平台
          进行审核，客服审核通过方案正式生效。</div>
           <div class="submit" @click="submit">确认</div>
         </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'personal',
    data () {
      return {
          telname:{tel:'18612158960'},
          list:[
            {name:'方案名称',cont:'油卡积分解债'},
            {name:'解债内容',cont:'50%USDT+50%债权=100%DCC价值转让'},
            {name:'解债周期',cont:'6个月'},
          ]
      }
    },
    beforeDestroy () {
//      this.$bus.$off('areaBoxSelect')
				this.$bus.$emit('pageHead');
    },
    mounted () {
      this.$bus.$emit('pageHead', {
        title:'解债记录',
      })

    },
    methods: {
      submit () {
      	 this.$router.push({path:'declaration' })
//      this.axios.post('auth/register', {
//        phone: this.phone,
//        code: this.code
//      }).then(({data}) => {
//        if (data.status === 200) {
//          this.$bus.$emit('alert', {
//            msg: '恭喜您登录成功',
//            cb: () => {
//              this.$router.push('index')
//            }
//          })
//        } else {
//          this.$bus.$emit('alert', data.message)
//        }
//      })
      }
    },
    components: {
    }
  }
</script>
<style lang="scss" scoped>
  @import '../assets/scss/style.scss';
  .list-box{
    position: absolute;
  top:0;
  width:100%;
  height:100%;
  background:#4298ef;
    .hed-top{
      background:url("../assets/images/rotate.png")no-repeat;
      width: 100%;
      height:350px;
      background-size: 100%;
      position: relative;
      .heads{
        position: absolute;
         width: 187px;
         height: 187px;
         border-radius: 50%;
         border:4px solid #fde3ad;
         bottom:-60px;
         left:50%;
         background: #fff;
         transform:translate(-50%);
         -ms-transform:translate(-50%); 	/* IE 9 */
         -moz-transform:translate(-50%); 	/* Firefox */
         -webkit-transform:translate(-50%); /* Safari 和 Chrome */
         -o-transform:translate(-50%); 	/* Opera */
         background: url("../assets/images/tacitly.png")no-repeat;
         background-size:100%;
      }
    }
  .scheme{
    .title{
       font-size: 40px;
      width: 100%;
      text-align: center;
      color:#fff;
      margin-top:80px;

    }
    .list{
      position: absolute;
      left:50%;
      transform:translate(-50%);
      background:#fff;
      width:660px;
      /*margin: 0 auto;*/
      border-radius:10px 10px;
      margin-top:50px;
      padding-bottom:57px;
    z-index:9999;
      .name{
        color:#444444;
        font-size: 26px;
        text-align: center;
        padding-top: 49px;
        padding-bottom:43px;
      }
      .read{
        width:546px;
        margin: 0 auto;
        font-size:26px;
        color: #999999;
      }

    }
  .list-tab{
   padding-bottom:50px;
    li{
      width:546px;
      margin: 0 auto;
      margin-top:25px;
      .floatLeft{
        float:left;
        color:#666666;
        font-size:26px;
      }
      .floatRight{
        word-break:break-all;
        float:right;
        width:240px;
        text-align: right;
        font-size:24px;
        color:#da9f3b;
      }
    }

  }
  .submit{
    height: 72px;
    width:266px;
    background: #2d8afd;
    font-size:28px;
    color: #fff;
    text-align: center;
    line-height:72px;
    margin: 0 auto;
    border-radius: 10px 10px;
    margin-top:72px;
  }
  .motie{
    position: absolute;
    width:620px;
    bottom:50px;
    left:50%;
    height: 300px;
    border-radius: 20px 20px;
    transform:translate(-50%);
    background:rgba(255,255,255,0.5);
  }
  }

  }
  .clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
</style>
