<template>
  <div class="msg_body">
  	<ul class="msg_list">
  		<li  v-for="(item,index) in list" @click="msg(index)">
    			<div class="iconfont icon-xiaoxi" ></div>
    	  	<div class="msg_list_title">
    	  	 	<p>{{item.title}}</p>
    	  	 	<div class="time">{{item.created}}</div>
    	  	</div>
      </li>
      <div v-if="list.length == 0" style="text-align: center;font-size: 14px;line-height: 40px;color: #999;">暂无公告</div>
  	</ul>

  </div>
</template>

<script>
export default {
  name: 'setting',
  data () {
    return {
    	icon:"icon-xiaoxi",
      list: []
    }
  },
  mounted () {
    this.$bus.$emit('pageHead','公告通知');
    this.message();
  },
  destroyed () {
    this.$bus.$emit('pageHead')
  },
  methods: {
    message(){
      this.axios.post('newMsgList', {
        token:localStorage.getItem('token'),
      }).then(({data}) => {
     		this.list=data.data;
      })
		},
		msg(index){
			this.$router.push({
    		path: 'messageDetails',
    		query: {
    			id: this.list[index].id,

    		}
    	})
		}
  }
}
</script>

<style lang="scss" scoped>
.msg_body{
	padding-top: 100px;
	.msg_list{
		margin-top:13px;
		li{
			background: #FFFFFF;
			padding:0 20px;
			margin-bottom: 1px;
			display: flex;
			justify-content: space-between;
			line-height: 120px;
			.iconfont{
				font-size: 40px;
				color: #1c81fd;
				position: relative;
				&:after{
					content: '';
					display: block;
					width:12px;
					height:12px;
					background: #e02f2f;
					border-radius: 50%;
					position: absolute;
					right:0;
					top:32%;
				}
			}
			.msg_list_title{
				display: inline-flex;
				width:85%;
				justify-content: space-between;
				p{
					font-size: 28px;
					color:#333333;
					width: 75%;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
				.time{
					font-size: 24px;
					color:#787777;
				}
			}
		}
	}
}
</style>

