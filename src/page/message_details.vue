<template>
  <div class="msg_body">
  	<div class="msg-time">{{list.created}}</div>
  	<div class="msg-content">{{list.content}}</div>

  </div>
</template>

<script>
export default {
  name: 'messageDetails',
  data () {
    return {
    	list:{
    		time:'2018年1月26日   15.32',
    		content:'你的短信提醒已送达，请注意查收...'
    	}

    }
  },
  mounted () {
    this.$bus.$emit('pageHead', ' 短信通知');
    this.message();
  },
  destroyed () {
    this.$bus.$emit('pageHead')
  },
  methods: {
    message(){
    	let $that=this;
    	$that.id=$that.$route.query.id;
	      $that.axios.post('newMsgList', {
	        token:localStorage.getItem('token'),
	        id:$that.id
	      }).then(({data}) => {
	     		$that.list=data.data;
	      })
  		},
  }
}
</script>

<style lang="scss" scoped>
.msg_body{
	padding: 100px 20px 0;
	.msg-time{
		padding:30px 0;
		text-align: center;
		font-size: 24px;
		color:#B2B2B2;
		letter-spacing: 1px;
	}
	.msg-content{
		padding:20px;
		background: #FFFFFF;
		border-radius: 10px;
		min-height: 300px;
		font-size: 28px;
		color:#333;
		letter-spacing: 1px;
	}
}
</style>
