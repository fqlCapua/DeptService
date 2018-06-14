<template>
  <div class="dec-result-wrap">
    <div class="dec-result">
      <div class="successfully">
        <div class="successfully-pic"><img :src="list.img"/></div>
        <div class="text">{{list.text}}</div>
      </div>
      <div class="submit" @click="submit()" v-show="show"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'certificationTrue',
    data () {
      return {
        show:false,
        list:{
          img:require("../assets/images/bd.png"),
          text:'您已通过实名认证'
        }
      }
    },
    mounted () {
      this.$bus.$emit('pageHead', '实名认证');

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
  .dec-result-wrap{
    padding:100px 20px 0;
  .dec-result{
    margin-top:10px;
  .successfully{
    height:485px;
    background: #fff;
    border-radius: 10px;
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
  }
  .submit{
    width:590px;
    height:87px;
    line-height:87px;
    background: #2d8afd;
    text-align: center;
    margin:100px auto 0;
    border-radius: 10px;
    color: #fff;
    font-size: 34px;
  }
  }
  }
</style>
