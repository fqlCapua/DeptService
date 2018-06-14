
<template>

</template>

<script>
  import Vue from 'vue'
  export default {

    name: '',
    data: function(){
      return {
        maskStatus: true,
        areaStatus: 1,
        checkProvince: 0,
        checkCity: 0,
        checkRegion: 0,
        CheckArea: {
          province: '请选择',
          city: '请选择',
          region: '请选择'
        }
      }
    },
    mounted () {

    },
    destroyed () {

    },
    methods: {
      select: function () { // 关闭选择器 广播事件
        this.$emit('areashow', this.CheckArea) // 广播关闭选择器
        var data = this.CheckArea.province + this.CheckArea.city + this.CheckArea.region;
        this.$emit('update:area', data) // 更新选择的地址

      },
      selectArea: function (it) { // 高亮 省 市 区 其中一个
        this.areaStatus = it;
      },
      checkProvOne: function (it,name) { // 选择省份
        this.checkProvince = it;
        this.CheckArea.province = name;
        this.CheckArea.city = this.data[it].child[0].name;
        this.CheckArea.region = this.data[it].child[0].child
        &&this.data[it].child[0].child.length !=0
          ? this.data[it].child[0].child[0].name:'无';
        this.checkCity = 0;
        this.checkRegion = 0,
          this.areaStatus =2 ;
      },
      checkCityOne: function (it,name,its) { // 选择市区
        this.checkCity = it;
        this.CheckArea.province = this.data[its].name;
        this.CheckArea.city = name;
        this.CheckArea.region = this.data[its].child[it].child
        &&this.data[its].child[it].child.length!=0
          ? this.data[its].child[it].child[0].name:'无';
        this.checkRegion = 0,
          this.areaStatus =3 ;

      },
      checkRegionOne: function (it,name) { // 选择区
        this.CheckArea.province = this.data[this.checkProvince].name;
        this.CheckArea.city = this.data[this.checkProvince].child[this.checkCity].name;
        this.checkRegion = it
        this.CheckArea.region = name;
      }
    },
    computed: {

    },
    created: function () {
      this.$on('area-select', function (id) {
        // ...
      })
    },
  }
</script>

<style lang="scss" scoped>
  @import '../assets/scss/style.scss';
  .area-mask{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: #000;
    opacity: .7;
    display: none;
  }
  .mask_active{
    z-index: 99;
    display: block;
  }
  .area-contain{
    display: none;
    background-color: #fff;
  }
  .area_contain_active{
    z-index: 100;
    display: block;
    height: 5rem;
    width: 100%;
    position: fixed;
    top: auto;
    left: 0px;
    bottom: 0px;
  }
  .area-header{
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    font-size: 0.35rem;
  }
  .area-close{
    position: absolute;
    right: 0.3rem;
  }
  .area-top{
    height: 0.8rem;
    line-height: 0.8rem;

  }
  .area-top-item{
    display: inline-block;
    font-size: 0.33rem;
    padding: 0rem 0.1rem;
    max-width: 2.45rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .area_top_active{
    color: #26a2ff;
    border-bottom: 1px solid #26a2ff;
  }
  .area-data{
    height: 3.4rem;
    overflow: auto;
  }
  .area-data-item{
    height: 0.7rem;
    line-height: 0.7rem;
    padding: 0rem 0.2rem;
    font-size: 0.3rem;
  }
  .red{
    color: #26a2ff;
  }
  .fade-enter-active, .fade-leave-active {
    transition: height .2s
  }
  .fade-enter, .fade-leave-active {
    height: 0
  }
</style>
