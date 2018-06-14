<template>
	<div class="registration-wrap">
		<ul class="registration">
			<li class="registration-list" v-for="(item,index) in list">
				<router-link  tag="div" :to="{path: 'detailsCot', query: {id: item.id}}">
					<div class="registration-info">
						<div class="head-box">
							<span class="portrait"><img :src="item.creditor_uid_data.head" width="100%" height="100%"/></span>
							<span class="name">{{item.manager_name}}</span>
						</div>
						<div class="zhaishi">
							<span>{{item.amount}}</span>
							<span>{{item.grade_name}}</span>
						</div>
						<div class="status" :class="'state'+item.state">{{item.status_name}}</div>
					</div>
					<div class="corporation"><span>{{item.com_name}}</span><span>{{item.creditor_uid_data.name}}</span></div>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
  name: 'registration',
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.$bus.$emit('pageHead', '登记记录');
    this.list2()
  },
  destroyed () {
    this.$bus.$emit('pageHead');
  },
  methods:{
     list2 (){
       let $that =this
       this.axios.post('beiAnList', {
         token:localStorage.getItem("token")
       }).then(({data}) =>{
      $that.list=data.data.creditor
       })
     }
  }
}
</script>
<style lang="scss" scoped>
  @import '../assets/scss/style.scss';
  .registration-wrap{
  	width:100%;
  	height:100%;
  	background: #f5f4f7;
  }
  .registration{
  	padding:0 20px;
  	padding-top:100px;
  	.registration-list{
  		height:228px;
  		background:#fff;
  		padding:0 60px;
  		margin-bottom: 14px;
  		border-radius: 10px;
  		text-align: center;
  		&:first-child{
  			padding-top:36px;
  			height:264px;
  			margin-top:14px;
  		}
  		.registration-info{
  			display: flex;
  			justify-content: space-between;
  			height:156px;
  			padding:28px 0;
  			border-bottom: 1px dashed #f5f5f5;
  			.head-box{
  				display: inline-flex;
  				.portrait{
            border-radius:50%;
  					width:96px;
  					height:96px;
  					overflow: hidden;
  					img{
  						max-width: 100%;
  					}
  				}
  				.name{
  					font-size: 30px;
  					color: #4c4c4c;
  					line-height: 100px;
  					margin-left: 20px;
  				}
  			}
  			.zhaishi{
  				span{
  					font-size: 26px;
  					color: #999999;
  					display: block;
  					&:first-child{
  						color: #fa4461;
  						font-size: 40px;
  						margin-bottom: 24px;
  					}
  				}
  			}
  			.status{
  				font-size: 28px;
  			}
  			.state1{
  				color:#2d8afd;
  			}
  			.state2{
  				color:#ff9800;
  			}
  			.state3{
  				color: #fa4461;
  			}
  		}
  		.corporation{
  			display: flex;
  			justify-content: space-between;
  			height:72px;
  			color:#999999;
  			font-size: 24px;
  			line-height: 72px;
  		}
  	}
  }
</style>
