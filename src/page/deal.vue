<template>
  <div class="newsList">
    <div class="title">欢迎阅读债事链商APP（下称债事链商）</div>
    <div class="title2">隐私保护规则。</div>
    <ul class="cont-list">
      <li> 债事链商注重保护用户的个人信息及个人隐私。本隐私权保护声明解释了用户个人信息收集和使用的有关情况，本隐私保护权声明适用于债事链商的所有相关服务。如您开始使用债事链商,即视为您同意接受本隐私声明。</li>
      <li> 一旦您完成债事链商的注册动作，您的注册信息即受到本隐私声明保护。债事链商不会向任何无关第三方提供、出售、出租、分享或交易您的个人信息，除非事先得到您的许可。同时，您应当遵守法律法规应当谨慎合理地使用和妥善保管债事链商账号及密码,并对本人专属之账号和密码项下所有行为和事件负责，当用户发现债事链商账号被未经其授权的第三方使用或存在其他账号安全问题时应立即有效毫不迟疑地通知龙凤科技有限公司，要求暂停该账号的服务，并向公安机关报案。龙凤科技有限公司有权在合理时间内对用户的该类请求采取行动，但对采取行动前用户已经遭受的损失不承担任何责任。</li>
       <li>隐私保护的适用范围：</li>
      <li>1. 在您注册债事链商账户时，您根据债事链商要求提供的个人注册信息；</li>
      <li>2. 在您使用债事链商服务时，债事链商自动接收并记录您的手机软硬件信息，包括但不限于您的手机软件版本号、机型信息、系统版本号、访问日期和时间等数据；</li>
      <li>解债用户进行债务登记时，需要提供债权信息、债务信息、地址、身份证、手机号码。欠条等，以便为用户提供服务。</li>
      <li>3. 基于履单需求，债事链商获取到您的相关信息，包括但不限于债务信息、债权信息、用户手机号、身份证号码、欠条、住址等数据</li>
      <li>4. 债事链商通过合法途径从商业伙伴处取得的用户个人数据；</li>
      <li>5. 您了解并同意，以下信息不适用本隐私权政策：</li>
      <li>5.1 您在使用债事链商提供的搜索服务时输入的关键字信息；</li>
      <li>5.2 债事链商收集到您在本应用进行交易的有关数据，包括但不限于成交信息及评价详情；</li>
      <li>5.3 信用评价、违反法律规定或违反债事链商规则行为及债事链商已对您采取的措施；</li>
      <li>债事链商以此声明对本应用用户隐私保护的许诺。债事链商的隐私声明正在不断改进中，并会随时更新隐私声明。我们欢迎您随时查看隐私声明。</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'deal',
    data () {
      return {
      }
    },
    mounted () {
      this.$bus.$emit('pageHead','用户协议')
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
