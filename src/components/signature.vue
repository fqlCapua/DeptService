<template>
  <div class="canvas_box" v-show="show">
    <canvas id="canvas" width="300" height="400"></canvas>
    <div class="btn_box">
    	<div class="btn" @click="clear">清 除</div>
      <div class="btn" @click="save">确 定</div>
    </div>
    
    <div class="close iconfont icon-2guanbi" @click="close"></div>
    	
  </div>
 
</template>

<script>
var draw;
var isSigna = false;
var preHandler = function(e){e.preventDefault();}
class Draw {
    constructor(el) {
        this.el = el
        this.canvas = document.getElementById(this.el)
        this.cxt = this.canvas.getContext('2d')
        this.stage_info = canvas.getBoundingClientRect()
        this.path = {
            beginX: 0,
            beginY: 0,
            endX: 0,
            endY: 0
        }
    }
    init(btn) {
        var that = this; 
        
          var w   = document.body.clientWidth
          var h   = document.body.clientHeight
          
          this.canvas.setAttribute("height",h-400)
          this.canvas.setAttribute("width",w)
          
          
        
        this.canvas.addEventListener('touchstart', function(event) {
            document.addEventListener('touchstart', preHandler, false); 
            that.drawBegin(event)
        })
        this.canvas.addEventListener('touchend', function(event) { 
            document.addEventListener('touchend', preHandler, false); 
            that.drawEnd()
        })
        this.clear(btn)
    }
    drawBegin(e) {
        var that = this;
        window.getSelection() ? window.getSelection().removeAllRanges() : document.selection.empty()
        this.cxt.strokeStyle = "#000"
        this.cxt.beginPath()
        this.cxt.moveTo(
            e.changedTouches[0].clientX - this.stage_info.left,
            e.changedTouches[0].clientY - this.stage_info.top
        )
        this.path.beginX = e.changedTouches[0].clientX - this.stage_info.left
        this.path.beginY = e.changedTouches[0].clientY - this.stage_info.top
        canvas.addEventListener("touchmove",function(){
            that.drawing(event)
            isSigna  = true;
        })
    }
    drawing(e) {
        this.cxt.lineTo(
            e.changedTouches[0].clientX - this.stage_info.left,
            e.changedTouches[0].clientY - this.stage_info.top
        )
        this.path.endX = e.changedTouches[0].clientX - this.stage_info.left
        this.path.endY = e.changedTouches[0].clientY - this.stage_info.top
        this.cxt.stroke()
    }
    drawEnd() {
        document.removeEventListener('touchstart', preHandler, false); 
        document.removeEventListener('touchend', preHandler, false);
        document.removeEventListener('touchmove', preHandler, false);
        //canvas.ontouchmove = canvas.ontouchend = null
    }
    clear(btn) {
    	   
    	    var canvasH =  this.canvas.getAttribute("height")
          var canvasW =  this.canvas.getAttribute("width")
    	   
        this.cxt.clearRect(0, 0, canvasW, canvasH)
        isSigna  = false;
    }
    save(){
       return canvas.toDataURL("image/png")
    }
}

export default {
	name:'signature',
  data () {
    return {
      val:true,
      url:"",
      show: false,
      btn: ''
    }
  },
  mounted() {
  	  this.$bus.$on('signature',this.openAlert)
      draw=new Draw('canvas');
      draw.init();
      
  },
  methods:{
  	openAlert (data) {
      if (typeof data === 'string') data = {msg: data};
      this.show = true;
    },
    clear () {
        draw.clear();
//      console.log(isSigna)
    },
    save () {
        var data=draw.save();
        this.url = data;
        if(isSigna)  return this.Upload(data)
        
    },
    close () {
      this.show = false;
      draw.clear(); 
      document.documentElement.style.overflow='auto';
      document.body.style.overflow='auto';
    },
    Upload(imgage){
      this.axios.post('userUpload', {
        token:localStorage.getItem("token"),
        img:imgage
      }).then(({data}) => {
          this.show = false;
          document.documentElement.style.overflow='auto';
          document.body.style.overflow='auto';
          this.content.signature = data.data.server_url
          
          let dataObjS =  JSON.parse(localStorage.getItem("dataObj"));
            dataObjS.signature =  data.data.server_url   //上传签名
     	    localStorage.setItem("dataObj",JSON.stringify(dataObjS));
      })
    }
  },
   props: {
    content: {
      signature:""
    }
  }
}
</script> 
	
<!-- Add "scoped" attribute to limit CSS to this component only --> 
<style lang="scss" scoped>
	@import '../assets/scss/style.scss';
.canvas_box{
	  position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    z-index: 20;
		#canvas {
		margin: 0 auto;
		background: #fff;
		cursor: default;
	}
	.btn_box{
		width: 57%;
		display: flex;
		justify-content: space-between;
		margin:0 auto;
		margin-top:20px;
		 .btn{
		 	  width:40%;
		 	  color:#fff;
		 	  text-align: center;
		 	  font-size:32px;
		 	  height:66px;
		 	  line-height: 66px;
		 	  background:#2d8afd;
		 	  border-radius:10px;
		 	  &:first-child{
		 	  	background:#ce8130;
		 	  }
		 }
	}
	.close{
		height: 80px;
		text-align: center;
		margin-top:180px;
		font-size: 70px;
		color: #d1d6db;
	}
}



</style>