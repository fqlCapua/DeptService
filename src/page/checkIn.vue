<template>
    <div class="check_in">
    	<div class="box_50" v-for="(item,index) in list" :key="index">
    		<div class="type_box">
    			<img :src="item.img" alt="" />
    		</div>
    		<div class="_btn" @click="selectType(item.type)">{{item.name}}</div>
    		<div class="_click">
    			<span>{{item.btn}}</span>
    			<span class="iconfont" :class="item.icon"></span>
    		</div>
    	</div>
    </div>
</template>

<script>

export default {

  name: 'checkIn',
  data () {
    return {
         list:[
           {
           	name:"债权人",
           	img:require('../assets/images/b1.png'),
           	type:1,
           	btn:"点击选择",
           	icon:"icon-up-copy-copy"
           },{
           	name:"债务人",
           	img:require('../assets/images/b2.png'),
           	type:2,
           	btn:"点击选择",
           	icon:"icon-up-copy-copy"
           }
         ]
    }
  },
  beforeMount () {

  },
  mounted (){
    this.$bus.$emit('footer', {
      button: [],
      navShow: true
    })
  },
  destroyed () {
    this.$bus.$emit('footer')
  },
  methods: {
     selectType (type){
     	 this.$router.push({path: 'registerFirst', query: {type:type}})
       window.localStorage.setItem('type',type)
     }
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/style.scss';

  .check_in {
     display: flex;
     justify-content: space-around;
     height:100vh;
     .box_50{
     	width:50%;
     	background:#a0a6f1;
     	padding-top:260px;
     	box-sizing:border-box;
     	&:nth-last-child(1){
     		background:#a0b1f1;
     	}
     	.type_box{
     		margin: 0 auto;
     		width: 312px;
     		height: 312px;
     		border-radius: 50%;
     		/*border:3px solid #fff;*/
     		overflow: hidden;
     		img{
     			width: 100%;
     		}
     	}
     	._btn ,._click{
     		color: #fff;
     		text-align: center;
     		font-size: 28px;
     		.iconfont{
     			font-size: 32px;
     		}
     	}
     	._btn{
     		margin: 158px auto 52px auto;
     		width:60%;
     		height:72px;
     		border:1px solid #fff;
     		line-height: 72px;
     		border-radius: 4px;
     		font-size: 30px;
     	}
     }

  }
</style>
