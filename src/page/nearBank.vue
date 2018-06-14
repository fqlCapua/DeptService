<template>
	<div class="credit-line-wrap">
		<div class="banner"></div>
		<div class="header">
			<div class="back iconfont icon-fanhui" @click="$router.back(-1);"></div>
    		<h2 class="title">债行</h2>
		</div>
		<div class="credit-line">
			<ul class="credit-line-list">
				<li v-for="(item,index) in list">
					<div class="company">
						<span class="name">{{item.name}}</span>
						<span class="tag">{{item.tag1}}</span>
						<span class="tag">{{item.tag2}}</span>
					</div>
					<div class="photo"><img :src="item.img"/></div>
					<div class="location"><i class="iconfont icon-dingwei"></i>{{item.loca}}</div>
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
         	{name:'龙凤科技债行',tag1:'光速解债',tag2:'经验丰富',img:require('../assets/images/a3.png'),loca:'管城回族区'},
         	{name:'龙凤科技债行',tag1:'光速解债',tag2:'经验丰富',img:require('../assets/images/a3.png'),loca:'管城回族区'}
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
	    height: 100px;
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
		top:154px;
		left: 0;
		width: 100%;		
		li{
			background: #fff;
			border-radius: 10px;
			padding:0 33px;
			margin:0 20px;
			margin-bottom: 33px;
			.company{
				padding:40px 0 32px;
				width:100%;
				display:flex;
				.name{
					font-size: 32px;
					color:#4c4c4c;
					margin-right:35px;
				}
				.tag{
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
			.photo{
				width:100%;
				height:263px;
				img{
					max-width: 100%;
				}
			}
			.location{
				padding:26px 0;
				height:82px;
				line-height:30px;
				color:#808080;
				font-size: 26px;
				i{
					color:#e1af02;
					margin-right: 18px;
				}
			}
		}
	}	
  }
  
}

</style>