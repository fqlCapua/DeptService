<template>
  <div class="newsList">
    <div class="title">“协同共振丶协作共生”——DCC区块链+商业业应用创新招募开启</div>
    <div class="title2">DCC新闻  2018-05-08  15:00</div>
    <div class="btb"><img src="../assets/images/dcc.png" alt="" width="100%" height="100%"></div>
    <ul class="cont-list">
      <li>5月19日，DCC区块链+商业创新应用全网招募开启。活动旨在为实体企业赋能，帮助接入DCC的商家实现“去库存”、“盘活固定闲置资产”、“企业转型”、“消减企业债务”。</li>
      <li>福链DCC作为应用型区块链，由全球债务清算联盟发起，基于Ethereum以太坊公链的智能合约为底层技术，发行的一款数字资产。应用于全球债权登记、转让、流通、交易的去中心化数字货币。</li>
      <li>DCC是区块链+债务链的结合，极大的发挥了区块链去中心化、去信任的技术优势；降低整个商业生态发展的信任成本，同时DCC 能有效增加整个商业环境的流动性，使资源得到更充分的利用；也能增加商业生态的外延性，使得更多的资源能够基于 DCC 得到聚合。</li>
      <li>任何形式的经济发展，都离不开债务。DCC以债务清算的层面，开放性接入任何商业体系，为接入DCC生态的企业、商家提供更多的资源以及窗口，实现价值流通，让企业商家能享受到“区块链+”的时代红利。</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'blockchain',
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
