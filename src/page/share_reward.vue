<template>
  <div id="shareReward" class="pad_top">
    <rewardTop :money="allMoney"></rewardTop>
    <picker></picker>
    <div class="select" :class="[selectTab === 0 ? 'changeLeft': 'changeRight']">
      <p class="option" @click="selectTabFun(0)">直接分享</p>
      <p class="option" @click="selectTabFun(1)">間接分享</p>
    </div>
    <div class="info">
      <p class="month_reward">本月獎勵：{{ info.moneyReward }}</p>
      <p class="calendar">{{ info.calendar }}<span class="iconfont icon-kongtiaoguankong-"></span></p>
    </div>
  </div>
</template>
<script>
  import rewardTop from '../components/reward_top.vue'
  import picker from '../components/picker.vue'
  export default {
    name: 'shareReward',
    data () {
      return {
        allMoney: '10000.0000',
        selectTab: 0,
        info: {
          moneyReward: '8,000.00',
          calendar: '2018-05-07'
        }
      }
    },
    mounted () {
      this.$bus.$emit('pageHead', '分享獎勵')
    },
    methods: {
      selectTabFun (id) {
        this.selectTab = id
      }
    },
    components: {
      rewardTop,
      picker
    }
  }
</script>
<style lang="scss">
  @import '../assets/scss/style.scss';
  #shareReward {
    .select {
      color: $mainColor;
      width: 465px;
      margin: 28px auto;
      background: $bgColorLow;
      line-height: 62px;
      height: 62px;
      border-radius: 31px;
      text-align: center;
      position: relative;
      &:after {
        content: '';
        position: absolute;
        width: 4em;
        height: 4px;
        background: $mainColor;
        bottom: 0;
        left: 25%;
        margin-left: -2em;
        border-radius: 2px;
        transition: all 0.5s;
      }
      &.changeLeft:after{
        animation: goLeft 1s linear forwards;
      }
      &.changeRight:after{
        animation: goRight 1s linear forwards;
      }
      .option {
        float: left;
        width: 50%;
      }
    }
    .info {
      .month_reward {
        color: $mainColor;
      }
      .calendar {
        color: #fff;
      }
    }
    @keyframes goRight {
      0% {
        left: 25%;
        transform-origin: right top;
        transform: scaleX(1)
      }
      30% {
        left: 25%;
        transform-origin: right top;
        transform: scaleX(0)
      }
      70% {
        left: 75%;
        transform-origin: left top;
        transform: scaleX(0)
      }
      100% {
        left: 75%;
        transform-origin: left top;
        transform: scaleX(1)
      }
    }
    @keyframes goLeft {
      0% {
        left: 75%;
        transform-origin: left top;
        transform: scaleX(1)
      }
      30% {
        left: 75%;
        transform-origin: left top;
        transform: scaleX(0)
      }
      70% {
        left: 25%;
        transform-origin: right top;
        transform: scaleX(0)
      }
      100% {
        left: 25%;
        transform-origin: right top;
        transform: scaleX(1)
      }
    }
  }
</style>