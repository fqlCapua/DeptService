<template>
	<div class="credit-line-wrap">
		<div class="banner"></div>
		<div class="header">
			<div class="back iconfont icon-fanhui" @click="$router.back(-1);"></div>
    		<h2 class="title">附近解债师</h2>
		</div>
		<div class="credit-line">
			<ul class="credit-line-list">
				<li v-for="(item,index) in list">
					<div class="portrait"><img :src="item.img"/></div>
					<div class="info">
						<div class="username">{{item.username}}</div>
						<div class="tag"><span>{{item.tag1}}</span><span>{{item.tag2}}</span></div>
						<div class="name">{{item.name}}</div>
					</div>
					
				</li>
			</ul>		
		</div>
	</div>
</template>

<script>
  export default {
    name: 'personal',
    data () {
      return {
         list:[
         	{username:'江小白',name:'龙凤科技债行',tag1:'光速解债',tag2:'经验丰富',img:require('../assets/images/jiang.png')},
         	{username:'江小白',name:'龙凤科技债行',tag1:'光速解债',tag2:'经验丰富',img:require('../assets/images/fd1.png')},
         	{username:'江小白',name:'龙凤科技债行',tag1:'光速解债',tag2:'经验丰富',img:require('../assets/images/a1.png')},
         	{username:'江小白',name:'龙凤科技债行',tag1:'光速解债',tag2:'经验丰富',img:require('../assets/images/a2.png')},
         ]
      }
    },
    mounted () {
    	//this.$bus.$emit('pageHead', '债行');
  	},
  	destroyed () {
    	//this.$bus.$emit('pageHead');
  	},
    methods: {   	
 		
    },
    components: {
    }
  }	
</script>

<style lang="scss" scoped>
.credit-line-wrap{	
	width: 100%;
	height:100%;
	position: relative;
	.banner{
		position: fixed;
	    top: 0;
	    left: 0;
	  	width:100%;
	  	height: 380px;
	  	background:url(../assets/images/1.png) no-repeat left top;
	    background-size: 100% 100%;
	}
  	.header{
	    position: fixed;
	    top: 0;
	    left: 0;
	    width: 100%;
	    height: 300px;
	   	background:transparent;
	    text-align: center;
	    z-index: 10;
	    .back {
	      position: absolute;
	      top: 0;
	      left: 0;
	      width: 14%;
	      height: 100px;
	      line-height: 100px;
	      font-size: 40px;
	      color: #fff;
	    }
	    .title {
	      font-size: 34px;
	      font-weight: 400;
	      line-height: 100px;
	      color: #FFFFFF;
	    }   
	}
  	.credit-line{
	  	width:100%;
		.credit-line-list{
			position: absolute;
			top:150px;
			left: 0;
			width: 100%;
			li{
				display: flex;
				background: #fff;
				padding:42px 36px;
				margin:0 20px 19px;
				border-radius: 10px;
				.portrait{
					height:157px;
					width:223px;
					margin-right:46px;
					img{
						max-width: 100%;
					}
				}
				.username{
					color:#4c4c4c;
					font-size: 36px;
				}
				.tag{
					display: inline-flex;
					margin:22px 0;
					span{
						display: block;
						width:120px;
						height:40px;
						line-height: 40px;
						border:1px solid #4199f1;
						border-radius: 40px;
						font-size: 18px;
						color:#318cfc;
						text-align: center;
						margin-right: 12px;
					}
				}
				.name{
					color:#808080;
					font-size: 26px;					
				}
			}
		}	
	}
  
}

</style>