<template>
  <div class="footer_wrap" v-if="isShow">
    <!-- 底部导航 -->
    <div v-if="navShow" class="footer_tab" >
      <div class="tab_list animated" v-for="(item,index) in nav" @click="toggle(index)" :class="{ 'active_nav' : item.router === activeRouter}" :key="index">
      	<span class="award"><img :src="item.router === activeRouter?item.img2:item.img1" /></span>
        <span class="nav_title">{{item.title}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'footerBox',
  data () {
    return {
      type: null,
      isShow: false,
      navShow: false,
      activeRouter: '',
      button: [
        {
          inner: '',
          class: '',
          isShow: true,
          state: true,
          callback: () => {}
        }
      ],
      nav: [
        {
          title: '首页',
          router: 'index',
          img1:require("./../assets/images/shouye1.png"),
          img2:require("./../assets/images/shouye.png")

        },
        {
          title: '债务登记',
          router: 'checkIn',
          img1:require("./../assets/images/zwdj1.png"),
          img2:require("./../assets/images/zwdj.png")
        },
        {
          title: '解债方案',
          router: 'precept',
          img1:require("./../assets/images/jzfa1.png"),
          img2:require("./../assets/images/jzfa.png")
        },
        {
          title: '我的',
          router: 'userCenter',
          img1:require("./../assets/images/wd1.png"),
          img2:require("./../assets/images/wd.png")
        }
      ]
    }
  },
  beforeMount () {
    this.getEvent()
    this.getRoute()
  },
  watch: {
    $route (to, from) {
      if (to.name === 'index1') {
        this.activeRouter = 'index'
        this.$router.push('/')
      } else {
        this.activeRouter = to.name
      }
    }
  },
  methods: {
    // 监听事件函数
    getEvent () {
      this.$bus.$on('footer', (data) => {
        if (!data) {
          this.isShow = false
        } else {
          this.isShow = true
          this.navShow = data.navShow
          this.button = data.button
          this.type = data.type
          this.price = data.price
        }
      })
    },
    getRoute () {
      this.activeRouter = (this.$route.name === 'index1' ? 'index' : this.$route.name)
    },
    toggle (index) {
      this.$router.push({path: this.nav[index].router})
    }
  }
}
</script>
<style lang="scss">
.footer_wrap{
  position: fixed;
  bottom: 0;
  width: 100%;
  // 底部导航
  .footer_tab{
    background-color:#fff;
    height:100px;
    display:flex;
    text-align:center;
    border-top:1px solid #f5f4f7;
    .tab_list{
      height:99px;
      flex-grow:1;
      color:#666;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      animation-duration: .7s;
      color: #b2b2b2;
      .nav_title{
        font-size:26px;
      }
      .iconfont{
        font-size: 44px;
        /*line-height: 44px;*/
        display: flex;
        align-items: center;
        justify-content: center;
        color: #b2b2b2;
      }
      .award{
        width:41px;
        height:42px;
        display: block;
        img{
        	max-width: 100%;
        	max-height: 100%;
        }
      }
      &.active_nav{
        color: #2d8afd;
      }

    }
  }
}
</style>
