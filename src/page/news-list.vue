<template>
  <div class="newsList">
     <div class="title">韩国财富管理公司：加密货币将成为一种安全的避险资产</div>
    <div class="title2">DCC新闻  2018-05-08  15:00</div>
    <div class="btb"><img src="../assets/images/btb.png" alt="" width="100%" height="100%"></div>
    <ul class="cont-list">
       <li>加密社区正在为真正的革命而奋斗 - 领先的加密货币可能会放弃“工作证明”（PoW）算法。原因在于矿业巨头比特大陆的影响深远，它正在通过冲销顶级硬币的新ASIC来加强其在市场上的垄断地位。这不仅涉及喜欢传统GPU农场的用户，还涉及开发人员本身，因为生态系统日益集中并容易受到攻击。</li>
       <li>似乎在短时间内，为新硬币生产的短线产品已经演变为一场激烈的军备竞赛。每个人都想咬掉PoW算法中的最后一块，承诺快速回报，不让传统的GPU农场有机会。第一批蚂蚁矿机在销售开始前就已售罄，用户似乎收到了承诺的利润。如果不是这样，ASICs很快就会变得不能盈利，而且不断增长的哈希率会导致区块链集中化。</li>
       <li>ASIC的抵抗者</li>
       <li>在社区中，比特大陆在其自己的蚂蚁矿池（Antpool.com）上使用巨大的算率来阻止比特币网络中的重要投票后，赢得了“贪婪群体”的声誉。抵抗始于年初，Bitma突然宣布推出用于SiaCoin采矿的Antminer A3生产，摧毁了其老竞争对手Obelisk的4个月的生产。</li>
       <li>我们很高兴地宣布，我们将推出Antminer A3，这是一款新的Antminer模型，使用哈希算法Blake（2b）来挖掘加密货币。实际价格和购买选项将在下午2:30（1月17日，格林威治标准时间+8）后在https://t.co/mrymOaMy4i提供。<br>pic.twitter.com/Ye0cxNn95M<br>——比特大陆（@Bitmaintech）2018年1月17日</li>
       <li>当时，SiaCoin的创始人和 Obelisk所有人David Warrick没有履行他的“软分叉”承诺，并给了比特大陆一个解决问题的机会。在经过多方考虑和讨论之后，我们决定不通过软分叉使A3矿机失效，除非比特大陆直接采取行动损害Sia项目。我们对2018年感到非常兴奋，并将向前迈进。完整回复：https：//t.co/I96X8Y6VMi——Sia Tech（@SiaTechHQ）2018年1月25日</li>
       <li>事实上，情况本身也得到改变了。 在销售开始时，比特大陆承诺每日盈利460美元，仅在10天内就下降了2倍，迄今为止只有10美元。</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'newsList',
    data () {
      return {
       }
    },
    mounted () {
      this.$bus.$emit('pageHead','新闻详情')
    },
    destroyed () {
      this.$bus.$emit('pageHead')
    },
    beforeDestroy (){
      this.$bus.$emit('footer')
    },
    methods: {
    }
  }
</script>

<style lang="scss"  scoped>
  @import '../assets/scss/style.scss';
  .newsList{
    border-top:16px solid #f5f4f7;
    margin-top:100px;
    background:#fff;
    padding-left:20px;
    padding-right:20px;
  .title{
     padding-top: 38px;
     padding-bottom:22px;
     font-size:32px;
     color:#4c4c4c;
    }
  .title2{color:#b2b2b2;padding-bottom:40px;}
  .btb{padding-bottom:40px;}
  .cont-list{
    color:#666666;
    font-size:24px;
    line-height:42px;
    li{margin-bottom: 60px;}
  }
  }
</style>
