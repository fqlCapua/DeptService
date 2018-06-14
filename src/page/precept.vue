<template>
  <div class="precept">
    <div class="head-top"></div>
    <ul class="list-box">
      <li v-for="(item,index) in list" :key="index">
        <router-link :to="{path:'solveDebt',query:{id:item.id}}">
          <div class="hot floatLeft">
            <div>

              <img  :src="imageList[index]" alt="icon" width="100%" height="100%">
            
            </div>
          </div>
          <div class="floatLeft title">{{item.name}}</div>
          <div class="floatRight _btn">我要解债
          <!--   <span class="iconfont icon-xiayiji"></span> -->
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'precept',
  data() {
    return {
 
      imageList:[
         require('../assets/images/w50.png'),
         require('../assets/images/w60.png'),
         require('../assets/images/w70.png'),
         require('../assets/images/w80.png')
      ],
  
      list: [],
 
    }
  },
  mounted() {

    this.$bus.$emit('footer', {
      button: [],
      navShow: true
    })
    this.show()
  },
  destroyed() {},
  beforeDestroy() {
    this.$bus.$emit('footer')
  },
  methods: {
    show() {

      let $that = this;
      $that.token = localStorage.getItem('token');
      this.axios.post('debtSolutions', {
        token: $that.token
      }).then(({ data }) => {
          console.log(data.data)
        $that.list = data.data;
      })
    }
  }
}

</script>
<style lang="scss" scoped>
@import '../assets/scss/style.scss';

.precept {
  height: 100vh;
  background: #3891fd;
  padding-bottom: 16px;
  .head-top {
    margin-top: 50px;
    background-image: url("../assets/images/precept-banner.png");
    background-size: 100%;
    width: 359px;
    height: 312px;
    margin: 0 auto;
  }
  .list-box {
    width: 710px;
    margin: 0 auto;
    li {
      height: 172px;
      background: #fff;
      border-radius: 10px 10px;
      padding-left: 39px;
      padding-right: 39px;
      box-sizing: border-box;
      margin-top: 16px;
      position: relative;
      a {
        color: #000
      }
      .hot {
        padding-left: 39px;
        width: 109px;
      }
      .floatLeft {
        float: left;
        height: 100%;
        div {
          position: absolute;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          -ms-transform: translate(-50%, -50%);
          -moz-transform: translate(-50%, -50%);
          -webkit-transform: translate(-50%, -50%);
          -o-transform: translate(-50%, -50%);
        }
      }
      .floatRight {
        float: right;
      }
      .title {
        height: 100%;
        line-height: 172px;
        font-size: 32px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 350px;
      }
      ._btn {
        width: 220px;
        height:63px;
        background: #ff9800;
        border-radius: 5px 5px;
        text-align: center;
        color: #fff;
        font-size: 25px;
        line-height: 62px;
        position: absolute;
        top: 50%;
        right: -82px;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        span {
          display: inline-block;
          font-size: 10px;
        }
      }
    }
  }
}

</style>
