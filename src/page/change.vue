<template>
	<div class="account-wrap">
		<div class="account">
            <div class="name">手机号</div>
            <div class="phone">{{phone}}</div>
	    </div>
	    <div class="submit"><router-link to="/account">更换手机号</router-link></div>
	    <div class="hint">一个手机号只能作为一个账号的登录名</div>
	</div>
</template>

<script>
export default {
  name: 'setting',
  data () {
    return {
    	phone:localStorage.getItem("phone"),
    }
  },
  mounted () {
    this.$bus.$emit('pageHead', ' 账号')
  },
  destroyed () {
    this.$bus.$emit('pageHead')
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.account-wrap{
	padding-top:100px;
	.account{
		padding:0 20px;
		margin:17px 0 142px;
		background: #FFFFFF;
		height: 104px;
		line-height: 104px;
		display: flex;
		justify-content: space-between;
		font-size: 32px;
		.name{
			color:#000000;
		}
		.phone{
			color:#999999;
		}
	}
	.submit{
		width:590px;
		height:87px;
		line-height:87px;
		background: #2d8afd;
		text-align: center;
		margin:0 auto;
		border-radius: 10px;
		a{
			display: block;
			color: #fff;
			font-size: 34px;
		}
	}
	.hint{
		text-align: center;
		margin-top: 35px;
		color: #b2b2b2;
		font-size: 26px;

	}
}
</style>
