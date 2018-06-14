<template>
  <div class="company_type" v-if="content.show === true">
  	   <div class="close_box" @click="close" ></div>
      <div class="company_box">
      	 <div class="title">请选择</div>
      	 <ul class="company_list">
      	 	   <li class="list" v-for="(item,index) in content.list" :key="index" @click="company (item,index)">
      	 	   	   <div v-if="item.name" class="left_name">{{item.name}}</div>
      	 	   	   <div v-else class="left_name">{{item.user_nickname}}</div>
      	 	   	   <div class="garden" :class="{'active':addActive === index }"></div>
      	 	   </li>
      	 	   <li class="listW" v-if="content.isLoading" style="text-align: center;">
      	 	   	  <img src="../assets/images/loading1.gif"/>
      	 	   </li>
      	 	   <li class="listW" v-if="content.notJieZai" style="text-align: center;">
      	 	   	   暂无解债师
      	 	   </li>
      	 </ul>
      </div>
  </div>
</template>

<script>
export default {
  name: 'companyType',
  data () {
    return {
    	addActive:"",
    }
  },
  methods: {
    close () {
      this.content.show = false
    },
    company (item,index) {
    	    let vm = this
    	   this.addActive = index 
    	   this.content.val = item.name || item.user_nickname
    	   this.content.id = item.id
    	   this.content.uid = item.uid
    	   setTimeout(function(){
    	   	   vm.close()
    	   },500)
    	   
    }
  },
  props: {
    content: {
      show:false,
	   	val:"",
	   	id:'',
	   	uid:"",
	   	list:[],
	   	isLoading:false,
	   	notJieZai:false
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/style.scss';
  .company_type {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 12;
    background: rgba(0, 0, 0, 0.4);
    .close_box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.4);
      z-index: -1;
    }
     .company_box{
     	  width:60%;
     	  background:#fff;
     	  border-radius:10px;
     	  overflow: hidden;
        position: absolute;
		    top: 50%;
		    left:50%;
        transform: translate(-50%,-70%);
        .title{
        	height: 80px;
        	line-height: 80px;
        	padding-left:30px;
        	font-size: 25px;
        	color: #808080;
        	border-bottom: 1px solid #eee;
        	box-sizing: border-box;
        }
        .company_list{
        	height: 500px;
        	overflow-y: scroll;
        	.listW{
        		 height: 100px;
        		 text-align: center;
        		 line-height: 100px;
        		 color: #808080;
        		font-size: 25px; 
        		img{
        			width: 100px;
        			display: block;
        			margin: 0 auto;
        		}
        	}
        	.list{
        		height: 100px;
        		display: flex;
        		padding: 0 30px;
        		box-sizing: border-box;
        		justify-content: space-between;
        		.left_name{
        			line-height: 100px;
        			color: #808080;
        			font-size: 25px;
        		}
        		.garden{
        			width: 36px;
        			height: 36px;
        			border-radius: 50%;
        			border: 1px solid #eee;
        			padding: 6px;
        			box-sizing: border-box;
        			margin-top: 32px;
        			&.active:before{
        				  content: "";
        				  width: 100%;
							    height: 100%;
							    display: block;
							    border-radius: 50%;
							    background-color: #3975e2;
        				
        			}
        		}
        	}
        }
     }
  }
</style>
