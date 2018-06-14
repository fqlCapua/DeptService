<template>
	<div class="account-wrap">
		<ul class="list-box">
          	<li class="clearfloat select" @click="open()">
              	<div class="name">国家/地区</div>
              	<div class="region"><span class="area">{{area}}</span>&nbsp;<span class="num">{{count}}</span></div>
              	<div class="iconfont icon-jiantou"></div>
              	<input type="hidden" value="中国大陆" class="areaInput">
              	<input type="hidden" value="+86" class="numInput">
          	</li>
          	<li class="clearfloat">
              	<div class="name">新手机号</div>
              	<div class="phone"><input type="number" id="phone_num" maxlength="11" placeholder="请输入手机号" v-model="phone"></div>
          	</li>
          	<li class="clearfloat">
             	<div class="name">验证码</div>
             	<div class="code"><input type="number" id="code_num" placeholder="请输入验证码" v-model="code"></div>
              	<div class="getCode"  @click="getCode">{{ codeTime === 61 ? '获取验证码' : `${codeTime}s后重试`}}</div>
          	</li>
      	</ul>
	    <div class="submit" @click="submit">确定</div>
	    <div class="select-box" v-show="show">
	  		<ul>
	  			<li v-for="(district,index) in districtList">
	  				<p>{{district.sort}}</p>
	  				<div class="clearfloat" v-for="(item,num) in districtList[index].list" @click="select(index,num)">
	  					<span>{{item.country}}</span>
		            </div>
	  			</li>
	  		</ul>
	  	</div>
    <div class="mutie" v-show="loding">
      <div>登录密码重置成功</div>
    </div>
	</div>
</template>

<script>
	import districtJson from '../assets/area/district.json'
export default {
  name: 'setting',
  data () {
    return {
    	show:false,
    	area:'中国大陆',
	  	count:'+86',
	  	phone:'',
	  	code:'',
	  	codeTime:61,
	  	districtList:districtJson,
      loding:false
    }
  },
  mounted () {
    this.$bus.$emit('pageHead', ' 账号')
  },
  destroyed () {
    this.$bus.$emit('pageHead')
  },
  methods: {
  	open(){
 		this.show=true;
 	},
    select(index,num){
		var that=this;
		that.area=that.districtList[index].list[num].country;
		that.count=that.districtList[index].list[num].number;
		this.show=false;
	},
	getCode () {
        if (this.codeTime !== 61) return false;
        if (this.phone === '' || !(/^1[34578]\d{9}$/.test(this.phone))) return this.$bus.$emit('alert', '手机号格式不正确或为空');
        this.codeTime = 60
        let timer = setInterval(() => {
          if (--this.codeTime === 0) {
            this.codeTime = 61
            clearInterval(timer)
          }
        }, 1000)
        this.axios.post('sms', {
          phoneNo: this.phone,
        }).then(({data}) => {
        })
      },
    submit(){

      this.axios.post('saveNewPhone', {
        token:localStorage.getItem("token"),
        phone:this.phone,
        code:this.code
      }).then(({data}) => {
        if (data.ret !== 0){
        	 if(data.data["sn"] !== undefined) return this.$bus.$emit('alert',"短信验证码不正确");
        	 if(data.data["phone"]) return this.$bus.$emit('alert',"不能为同一手机号");
        } 
        if (data.ret === 0) {
          let that=this;
          this.loding=true;
          window.localStorage.setItem('phone',data.data.phone);
          setTimeout(function () {
            that.loding=false;
//          that.$router.go(-1)
          },1000)
        }
        if(data.ret === 401) this.$router.push('login')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.account-wrap{
	padding-top:100px;
	.list-box{
		margin-top:17px;
		li{
			padding:0 20px;
			background: #FFFFFF;
			height: 104px;
			line-height: 104px;
			display: flex;
			justify-content: space-between;
			font-size: 32px;
			margin-bottom: 1px;
			color: #333333;
			.name{
				width:230px;
				color: #333333;
				font-size: 32px;
			}
			.region{
				width:60%;
			}
			.phone{
				width:65%;
			}
			.code{
				width:40%;
			}
			.getCode{
				width:20%;
				color:#f9b640;
				font-size: 26px;
			}
			input{
				font-size: 32px;
			}
		}
	}
	.submit{
		width:590px;
		height:87px;
		line-height:87px;
		background: #2d8afd;
		text-align: center;
		margin:0 auto;
		margin-top:214px;
		border-radius: 10px;
		color: #fff;
		font-size: 34px;
	}
	.select-box{
	    position: absolute;
	    top: 0;
	    left: 0;
	    height: 100%;
	    width: 100%;
	    z-index:100;
	    background:rgba(0,0,0,.5);
	    overflow: hidden;
	    ul{
	    	position: absolute;
		    bottom:0;
		    height:600px;
		    overflow:scroll;
		    width: 100%;
		    background: #fff;
		    z-index: 9999;
		    li{
		    	p{
		    		background: #f1f1f1;
				    height:40px;
				    line-height: 40px;
				    color: #4c4c4c;
				    padding-left: 20px;
				    box-sizing: border-box;
		    	}
		    	div{
		    		font-size:28px;
		    		height:70px;
		    		line-height: 70px;
		    		border-bottom:1px solid #f1f1f1;
		    		padding-left: 20px;
		    		padding-right: 20px;
		    		box-sizing: border-box;
		    		display: flex;
		    		justify-content: space-between;
		    	}
		    }
	    }
	}
.mutie{
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  background:rgba(0,0,0,.3);
  z-index: 99999;
div{
  width: 520px;
  height:280px;
  position: absolute;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
  -o-transform: translate(-50%,-50%);
  -moz-transform: translate(-50%,-50%);
  -webkit-transform: translate(-50%,-50%);
  background: #fff;
  text-align: center;
  line-height:280px;
  font-size: 28px;
  border-radius:10px 10px ;
  color: #666;

}
}
}
</style>
