<template>
<div class="list-box">
	<div class="upload-box">
		<div class="top">
			<div class="left"></div>
			<div class="title">请拍摄并上传您的身份证照片</div>
			<div class="right"></div>
		</div>
		<div class="cert-list">
			<div class="cert">
			   <!--實名認證-->
			     <div class="identity">
			         <img  alt="" :src="image1" id="z_file">
			       	<input type="file" class="file" id="z_file" @change="onFileChange_z">
			     </div>
			  	<p>拍摄正面</p>
			</div>
			<div class="cert">
			   <!--實名認證-->
			     <div class="identity">
			         <img  alt="" :src="image2" id="f_file">
			       	<input type="file" class="file" id="f_file" @change="onFileChange_f">
			     </div>
			  	<p>拍摄反面</p>
			</div>
		</div>
	</div>
    <label class="label" v-for="(item, index) in form" :key="index">
      <span class="name">{{item.name}}</span>
      <input class="input" type="text"  v-model="item.value">
    </label>
    <div class="submit" @click="submit">提交</div>
</div>
</template>
<script>
  export default {
    name:'',
    data () {
      return {
      		image1:'',
      		image2:'',
          idfront:'',
          idback:'',
        list:[],
        	form: [
		        {name: '真实姓名', value: ""},
		        {name: "身份证", value: ""},
            ]
        }
    },
    mounted (){
      	this.$bus.$emit('pageHead', ' 实名认证')
    },
    destroyed () {
      	this.$bus.$emit('pageHead')
    },
    methods: {
   		onFileChange_z(e){
			var files = e.target.files || e.dataTransfer.files;
		   	if (!files.length)
		      return;
		      this.createImage_z(files[0]);
		},
		createImage_z(file) {
   		   console.log(this)
		    var image1 = new Image();
		    var reader = new FileReader();
		    var vm = this;
		    console.log(vm)
		    reader.onload = (e) => {
		        vm.image1 = e.target.result;
            vm.userUpload(vm.image1)
		    };
		    reader.readAsDataURL(file);
		},
		onFileChange_f(e){
			var files = e.target.files || e.dataTransfer.files;
		   	if (!files.length)
		      return;
		      this.createImage_f(files[0]);
		},
		createImage_f(file) {
		    var image2 = new Image();
		    var reader = new FileReader();
		    var vm = this;

		    reader.onload = (e) => {
		        vm.image2 = e.target.result;
            vm.userUpload(vm.image2)
		    };
		    reader.readAsDataURL(file);
		},
		submit(){
		  if(this.form[1].value ==="") return this.$bus.$emit('alert', '姓名或身份证号不能为空');
      this.axios.post('idNameCert',{
        token:localStorage.getItem("token"),
        idfront:this.list[0],
        idback:this.list[1],
        idcard:this.form[1].value,
        name:this.form[0].value
      }).then(({data}) => {
        this.userUpload ()
   if(data.ret === 0){
     this.$router.push({path:'realPresent'})
   }
      })
		},
      userUpload (img){
        let vm =this
        this.axios.post('userUpload', {
          token:localStorage.getItem("token"),
          img:img,
        }).then(({data}) => {
          if(data.ret === 401) this.$router.push('login')
          vm.list.push(data.data.server_url)
        })
      }
      }



  }
</script>

<style lang="scss" scoped>
.list-box{
    padding-top:100px;
    .upload-box{
    	margin-top:16px;
    	margin-bottom: 30px;
    	background:#fff;
    	border-radius: 10px;
    	padding:50px 10px 78px;
    	.top{
    		font-size: 26px;
    		color:#333333;
    		width:507px;
    		margin:0 auto 54px;
    		height:26px;
    		line-height:26px;
    		text-align: center;
    		display: flex;
    		justify-content: center;
    		.title{
    			margin:0 22px;
    		}
    		.left,.right{
    			position: relative;
    			&:before{
    				content: '';
    				display: block;
    				height: 1px;
    				width:60px;
    				background: #E6E6E6;
    				position: absolute;
    				left:0;
    				top:50%;
    				margin-top:-0.5px;
    			}
    			&:after{
    				content: '';
    				display: block;
    				width:6px;
	    			height:6px;
	    			margin:10px 0;
	    			background: #e5e5e5;
	    			transform:rotate(45deg);
					-ms-transform:rotate(45deg); 	/* IE 9 */
					-moz-transform:rotate(45deg); 	/* Firefox */
					-webkit-transform:rotate(45deg); /* Safari 和 Chrome */
					-o-transform:rotate(45deg); 	/* Opera */
    			}
    		}
    		.left{
    			transform:rotate(180deg);

    		}
    	}
    	.cert-list{
    		margin:0 25px;
    		display: flex;
    		justify-content: space-between;
    		.cert{
    			width:320px;
    			height:276px;
    			background: #f6f8fc;
    			position: relative;
    			.identity{
    				position: absolute;
    				left:50%;
    				top:38px;
    				width:199px;
    				height:147px;
    				margin-left:-99.5px;
    				position: relative;
    				overflow: hidden;
    				.file{
    					width: 100%;
						height: 100%;
						position: absolute;
						top: 0;
						left: 0;
			       		display: block;
			       		outline: none;
			       		opacity: 0;
    				}
    				img{
    					width: 100%;
    					height:100%;
    				}
    			}
    			p{
    				position: absolute;
    				left:0;
    				bottom:0;
    				width: 100%;
    				line-height:54px;
    				text-align: center;
    				background: #2d8afd;
    				color:#FFFFFF;
    				font-size: 24px;
    				letter-spacing: 1px;
    				border-bottom-left-radius: 10px;
    				border-bottom-right-radius: 10px;
    			}
    		}
    	}
    }
	.label{
		height:102px;
		line-height: 102px;
		background: #FFFFFF;
		display: flex;
		padding:0 25px;
		margin:0 10px 1px;
		border-top-left-radius: 10px;
    	border-top-right-radius: 10px;
    	&:last-child{
    		border-top-left-radius: 0;
    		border-top-right-radius: 0;
    		border-bottom-left-radius: 10px;
    		border-bottom-right-radius: 10px;
    	}
    	span{
    		font-size: 28px;
    		color:#333333;
    		width:168px;
    		margin-left: 14px;
    		display: block;
    	}
    	input{
    		font-size: 26px;
    	}
	}
	.submit{
		width:590px;
		height:87px;
		line-height:87px;
		background: #2d8afd;
		text-align: center;
		margin:100px auto 0;
		border-radius: 10px;
		color: #fff;
		font-size: 34px;
	}
}
</style>
