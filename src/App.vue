<template>
  <div id="app">
    <pageHead></pageHead>
    <router-view/>
    <alertPage></alertPage>
    <!--<signature></signature>-->
    <alertInt></alertInt>
    <alertCer></alertCer>
    <footerNav></footerNav>
  </div>
</template>

<script>
import alertPage from './components/alert'
import alertInt from './components/alert_int'
import footerNav from './components/footer'
import pageHead from './components/page_head'
//import signature from './components/signature'
import alertCer from './components/alert-cer'
export default {
  name: 'App',
  components: {
    alertInt,
    alertPage,
    footerNav,
    pageHead,
//  signature
    alertCer
  }
}
</script>

<style lang="scss">
  @import url('//at.alicdn.com/t/font_656226_qj9mz9w9xz8v9529.css');
  @import './assets/scss/reset.scss';
  @import './assets/scss/style.scss';
  #app {
    min-height: 100vh;
    min-width: 100vw;
    background: #f5f4f7;

  }
  body{
    display:flex;
    flex-direction:column;
    　min-height:100vh;
  }
</style>
