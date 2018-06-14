<template>
    <div class="register_third">
    	<div class="progress">
    		<div class="progress_bar">
    			<div class=""></div>
    		</div>
    		<div class="num">45%</div>
    	</div>
    	<div class="title_hint">请拍摄并上传身份证</div>
    	<div class="identity_box">
    		<div class="top">
    			<div class="front_box">
    			  <img :src="front"/>
    			  <input type="file" id="front_inp" @change="onFileChange"/>
    		    </div>
    		    <div class="_title">点击上传带头像一面</div>
    		</div>
    		<div class="bottom">
    			<div class="reverse_box">
    			  <img :src="reverse"/>
    			  <input type="file" id="reverse_inp" @change="onFileChange"/>
     		    </div>
     		    <div class="_title">点击上传带国徽一面</div>
    		</div>
    		
    	</div>
    	<div class="next_btn" @click="goNext">下一步</div>
    	<div class="loading" v-show="isLoad">
    		<img src="../assets/images/loading1.gif" alt="" />
    		<div class="load_title">图片上传中...</div>
    	</div>
    </div>
</template>
  
<script>
    
   
export default {
	
  name: 'registerThird',
  data () {
    return {
       dataObj:"",
       isLoad:false,
       front: require('../assets/images/zheng.png'),
       reverse: require('../assets/images/fan.png'),
       zheng:"",
       fan:"",
       status:""
    }
  },
  beforeMount () {
   
  },
  mounted () {
    this.$bus.$emit('pageHead','债务登记')
    this.dataObj =  JSON.parse(localStorage.getItem("dataObj")) ;
  },
  destroyed () {
    this.$bus.$emit('pageHead')
  },
  methods: {
  	
  	onFileChange(e){
  		let vm = this;
  		if(e.target.getAttribute("id") == "front_inp"){
  			 this.status = 0
  		}else{
  			 this.status = 1
  		}
		let files = e.target.files || e.dataTransfer.files;
	   	if (!files.length) return;
	      
//	      this.createImage(files[0]);
	      this.photoCompress(files[0], {
            quality:.6,
        }, function(base64Codes){
        	 if(!vm.status){
		
    		vm.UploadImg(base64Codes,"zheng") 
	    		
	    	}else{
	    		
                vm.UploadImg(base64Codes,"fan")
	    	}
        })
	},
//	createImage(file) {
//	    let image = new Image();
//	    let reader = new FileReader();
//	    let vm = this;
//	    reader.onload = (e) => {
//	    	if(!vm.status){
//	    		
//	    		vm.UploadImg(e.target.result,"zheng") 
//	    		
//	    	}else{
//	    		
//              vm.UploadImg(e.target.result,"fan")
//	    	}
//	        
//	    };
//	    reader.readAsDataURL(file);
//
//	},
	photoCompress(file,w,objDiv){
		let $that = this;
        var ready=new FileReader();
        /*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
        ready.readAsDataURL(file);
        ready.onload=function(){
            var re=this.result;
            $that.canvasDataURL(re,w,objDiv)
        }
    },
     // 图片压缩
	canvasDataURL(path, obj, callback){
            var img = new Image();
            img.src = path;
            img.onload = function(){
                var that = this;
                // 默认按比例压缩
                var w = that.width,
                    h = that.height,
                    scale = w / h;
                w = obj.width || w;
                h = obj.height || (w / scale);
                var quality = 0.7;  // 默认图片质量为0.7
                //生成canvas
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                // 创建属性节点
                var anw = document.createAttribute("width");
                anw.nodeValue = w;
                var anh = document.createAttribute("height");
                anh.nodeValue = h;
                canvas.setAttributeNode(anw);
                canvas.setAttributeNode(anh);
                ctx.drawImage(that, 0, 0, w, h);
                // 图像质量
                if(obj.quality && obj.quality <= 1 && obj.quality > 0){
                    quality = obj.quality;
                }
                // quality值越小，所绘制出的图像越模糊
                var base64 = canvas.toDataURL('image/jpeg', quality);
                // 回调函数返回base64的值
                callback(base64);
            }

	   },
  	
     goNext (){
     	  
     	if (this.zheng === '') return this.$bus.$emit('alert', '请上传带头像一面')
     	if (this.fan === '') return this.$bus.$emit('alert', '请上传带国徽一面')
     	
     	this.dataObj.zhengCard =  this.zheng   //身份证正面
     	this.dataObj.fanCard =    this.fan   //身份证反面
     	  
     	localStorage.setItem("dataObj",JSON.stringify(this.dataObj));
     	
     	this.$router.push("registerFourth")
     	
     },
      UploadImg(imgage,val){
      	this.isLoad = true
      this.axios.post('userUpload', {
        token:localStorage.getItem("token"),
        img:imgage
      }).then(({data}) => {
      	this.isLoad = false
      	  if(val == "zheng"){
      	  	this.zheng =  data.data.server_url;
      	  	this.front = data.data.server_url;
      	  }else if(val == "fan"){
      	  	this.fan =  data.data.server_url;
      	  	this.reverse = data.data.server_url;
      	  }
         
      })
    }
    
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/style.scss';
  .register_third {
  	   padding-top:100px;
       .progress{
       	height:84px;
       	display:flex;
       	justify-content:space-between;
       	background:#fff;
       	margin-top:1px;
       	padding:26px 27px 26px 85px;
       	box-sizing:border-box;
       	.progress_bar{
       		width: 88%;
       		background:#ededed;
       		border-radius: 32px;
       		div{
       			width:45%;
       			background: #2f89ff;
       			border-radius: 32px;
       		    height:100%;
       		}
       	}
       	.num{
       		width: 8%;
       		color:#2f89ff;
       		font-size:24px;
       	}
       }
       .title_hint{
       	height:56px;
       	color:#808080;
       	font-size: 20px;
       	line-height: 56px;
       	padding-left:20px;
       }
       .identity_box{
       	    .top ,.bottom{
       	    	margin-bottom: 100px;
       	    	margin-top: 30px;
	       	    .front_box ,.reverse_box{
	       	    	position: relative;
	       	    	width: 345px;
	       	    	height:200px;
	       	    	border-radius: 12px;
	       	    	background: #fff;
	       	    	margin: 0 auto;
	       	    	padding:20px;
	       	    	box-shadow: border-box;
	       	    	img{
	       	    		display: block;
	       	    		width: 100%;
	       	    		height: 100%;
	       	    	}
	       	    	input{
	       	    		width: 100%;
					    height: 100%;
					    position: absolute;
					    top: 0;
					    left: 0;
					    z-index: 10;
					    display: block;
					    outline: none;
					    opacity: 0;
	       	    	}
	       	    	
	       	    } 
       	    }
       	    ._title{
       	    		text-align: center;
       	    		font-size: 24px;
       	    		color:#4c4c4c;
       	    		line-height: 60px;
       	    	}
       }
     .next_btn{
     	width: 70%;
     	height:86px;
     	line-height: 86px;
     	color: #fff;
     	font-size: 34px;
     	text-align: center;
     	margin: 0 auto;
     	background: #2d8afd;
     	border-radius: 10px;
     }
     .loading{
     	position: absolute;
        width: 100vw;
        height: 100vh;
        background-color:rgba(0, 0, 0, 0.65);
        top: 0;
        left: 0;
        z-index: 999;
        padding-top: 260px;
        img{
        	width: 120px;
        	margin: 0 auto;
        	display: block;
        	margin-bottom: 30px;
        }
        .load_title{
        	font-size: 30px;
        	text-align: center;
        	color: #fff;
        }
     }
  }
</style>
