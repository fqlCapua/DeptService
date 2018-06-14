<template>
	<div class="dec-result-wrap">
		<div class="dec-result">
			<div class="successfully">
				<div class="successfully-pic"><img src="../assets/images/bd.png"/></div>
				<div class="text">提交成功</div>
				<div class="hint">您的实名认证已提交平台审核，请耐心等待1—2个工作日</div>
			</div>			
		    <div class="submit" @click="submit()">返回首页</div>
		</div>
	</div>
</template>

<script>
  export default {
    name: 'personal',
    data () {
      return {
          
      }
    },
    mounted () {
    	this.$bus.$emit('pageHead',{titleClass:''});
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
				height:569px;
				background: #fff;
				border-radius: 10px;
				border-bottom: 1px dashed #ebebeb;
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
				.hint{
					font-size: 24px;
					color: #b2b2b2;					
				}
			}			
			.submit{			
				width:590px;
				height:87px;
				line-height:87px;
				background: #2d8afd;
				color: #fff;
				font-size: 34px;
				text-align: center;
				margin:413px auto 0;
				border-radius: 10px;
			}
		}
	}
</style>