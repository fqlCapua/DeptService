<template>
  <div class="details">
    <!--头部-->
    <div class="head">


      <div class="state">
        <div>债务登记审核状态</div>
        <div>{{status_name}}</div>
      </div>

    </div>
    <div class="creditor">
      <div class="cred_list">
        <div class="title">债权人信息</div>
        <ul>
          <li>
             <div>债权人姓名</div>
             <div>{{creditor.name}}</div>
          </li>
          <li>
            <div>手机号</div>
            <div>{{creditor.phone}}</div>
          </li>
          <li>
            <div>地区</div>
            <div>{{creditor.creditor_address}}</div>
          </li>
        </ul>
      </div>
      <!--债务人信息-->
      <ul class="debtor">
        <div class="title">债务人信息</div>
        <li v-for="(item,index) in debtor">
          <div>{{item.title}}</div>
          <div>{{item.name}}</div>
        </li>
      </ul>
      <!--证件-->
      <div class="papers clearfloat">
        <div class="title">证件照片</div>
        <div v-for="(img,index) in papers" :class="img.float"><img :src="img.img" alt="" width="100%" height="100%"></div>
      </div>
      <!--&lt;!&ndash;欠条照片&ndash;&gt;-->
      <div class="iou clearfloat">
        <div class="title">欠条照片</div>
        <div class="photo"><img :src="iou" alt="" width="100%" height="100%"></div>
      </div>
      <!--&lt;!&ndash;备案信息&ndash;&gt;-->
      <!--<ul class="filing">-->
        <!--<div class="title">备案信息</div>-->
        <!--<li v-for="(items,index) in  filing">-->
          <!--<div>{{items.title}}</div>-->
          <!--<div>{{items.name}}</div>-->
        <!--</li>-->
      <!--</ul>-->
    </div>
  </div>
  </div>
</template>
<script>
  export default {
    name: 'setting',
    data () {
      return {
        status_name:'',
        list: [
          {
            head:require('../assets/images/portrait.png'),
            name:'安娜',
            value:'45万',
            bebt:'债事量级',
            status:'已通过',
            cor:'龙凤债事有限公司',
            jzs:'解债师安娜'
          },
          {
            head:require('../assets/images/portrait.png'),
            name:'安娜',
            value:'45万',
            bebt:'债事量级',
            status:'待审核',
            cor:'龙凤债事有限公司',
            jzs:'解债师安娜'
          },
          {
            head:require('../assets/images/portrait.png'),
            name:'安娜',
            value:'45万',
            bebt:'债事量级',
            status:'未通过',
            cor:'龙凤债事有限公司',
            jzs:'解债师安娜'
          }
        ],
        creditor:{
          name:'',
          phone:'',
          creditor_address:''
        },
        debtor:[
          {title:"债务人姓名",name:''},
          {title:"债事量级",name:'',},
          {title:"资产总量级",name:''},
          {title:"债务性质",name:''},
          {title:"地区",name:''},
          {title:"详细地址",name:''},
          {title:"备注",name:''}
        ],
        papers:[
          {img:'',float:'floatLeft'},
          {img:'',float:'floatRight'}
        ],
        iou:'',
        filing:[
          {title:"债事量级",name:'26万'},
          {title:"资产总量级",name:'89万'},
          {title:"债务性质",name:'政府'},
          {title:"地区",name:'河南郑州金水区'},
          {title:"详细地址",name:'金水小区9号楼3单元'},
          {title:"备注",name:'bjsasd'}
        ]
      }
    },
    mounted () {
        this.$bus.$emit('pageHead','登记详情')
      this.show()
    },
    destroyed () {
        this.$bus.$emit('pageHead')
    },
    methods: {
      goBackPage(){
        this.$router.go(-1)
      },
      show(){
        let $that=this;
        $that.token=localStorage.getItem('token');
        $that.id=$that.$route.query.id;
        this.axios.post('beiAnView', {
          token: $that.token,
          id:$that.id
        }).then(({data}) => {
          $that.creditor.name =  data.data.creditor_uid_data.name; //姓名
          $that.creditor.phone =  data.data.creditor_uid_data.phone; //电话
          $that.creditor.creditor_address = data.data.creditor_address;  //地区
          $that.debtor[0].name = data.data.debtor_uid_data.name;
          $that.debtor[1].name = data.data.amount;
          $that.debtor[2].name = data.data.grade_name;
          $that.debtor[4].name = data.data.debtor_address;  //债务人地区
          $that.debtor[3].name = data.data.debtor_type_name;
          $that.debtor[5].name = data.data.debtor_address;
          $that.debtor[6].name = data.data.comment;
          $that.debtor.creditor_address = data.data.creditor_uid_data.debtor_address;  //地区
         $that.status_name =data.data.status_name;

//          身份证正反面
          $that.papers[0].img=data.data.debtor_uid_data.idcard1;
          $that.papers[1].img=data.data.debtor_uid_data.idcard2;
          $that.iou  = data.data.attached_files;

//
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/scss/style.scss';
.details{
  background:#f5f4f7;
  padding-bottom: 10px;
  .head{
     width: 100%;
     height:380px;
     background: url("../assets/images/list_banner.png") no-repeat;
     background-size:cover;
     color:#fff;
    .back{
      position: absolute;
      top: 0;
      left: 0;
      float: left;
      width: 14%;
      height: 100px;
      line-height: 100px;
      font-size: 40px;
      padding-left: 20px;
    }
    .title{
      text-align: center;
      font-size: 34px;
      font-weight: 400;
      line-height: 100px;
    }
  .state{
    width: 588px;
    margin: 50px auto;
    padding-top:150px;
  div:nth-child(1){
    float: left;
    font-size:27px;
  }
  div:nth-child(2){
    float: right;
    font-size:30px;
    color:#fde03f;
  }
  }
  }
  .creditor{
    position:relative;
    width: 684px;
    left:50%;
    top:-170px;
    transform:translate(-50%);
    -ms-transform:translate(-50%);
    -moz-transform:translate(-50%);
    -webkit-transform:translate(-50%);
    -o-transform:translate(-50%);
  .cred_list{
    padding-top:38px;
    background:#fff;
    border-radius:10px 10px;
  margin-bottom:20px;
    padding-bottom:40px;

  .title{
      width: 202px;
      margin: 0 auto;
      border-left:7px solid #2d8afd;
      text-align: center;
      font-size: 32px;
      box-sizing: border-box;
      margin-bottom:38px;
    }
  ul{
  width:550px;
  margin:0 auto;
  padding-top:20px;
  li{
     height:57px;
     line-height:57px;
  div:nth-child(1){
    float: left;
    font-size:28px;
    color: #666666;
  }
  div:nth-child(2){
    float: right;
    font-size:28px;
    color: #b2b2b2;
  }
  }
  }
  }
  .debtor{
    padding-top:38px;
    margin-bottom:20px;
    background:#fff;
    width: 684px;
    border-radius:10px 10px;
     padding-bottom:40px;
  .title{
    width: 202px;
    margin: 0 auto;
    border-left:7px solid #fa6c83;
    text-align: center;
    font-size: 32px;
    margin-bottom:38px;
    box-sizing: border-box;
  }
  li {
    width: 550px;
    margin: 0 auto;
    height: 57px;
    line-height: 57px;
  div:nth-child(1){
    float: left;
    font-size:28px;
    color: #666666;
  }
  div:nth-child(2){
    float: right;
    font-size:28px;
    color: #b2b2b2;
  }
  }
  }
.papers{
  padding-top:38px;
  margin-bottom:20px;
   width: 684px;
  background: #fff;
  border-radius:10px 10px;
  padding-bottom:30px;
  .floatLeft{
    float:left;
    width:295px;
    padding-left: 36px;
  }
  .floatRight{
    float:right;
    width:295px;
    padding-right: 36px;
  }
  .title{
    width: 202px;
    margin: 0 auto;
    border-left:7px solid #ffa026;
    text-align: center;
    font-size: 32px;
    margin-bottom:38px;
    box-sizing: border-box;
  }
}





  .iou{
    padding-top:38px;
    margin-bottom:20px;
    width: 684px;
    background: #fff;
    border-radius:10px 10px;
    padding-bottom:30px;
  .title{
    width: 202px;
    margin: 0 auto;
    border-left:7px solid #ffa026;
    text-align: center;
    font-size: 32px;
    margin-bottom:38px;
    box-sizing: border-box;
  }
  .photo{
    width:527px;
    margin:0 auto;
  }
  }

  .filing{
    padding-top:38px;
    margin-bottom:20px;
    background:#fff;
    width: 684px;
    border-radius:10px 10px;
    padding-bottom:40px;
  .title{
    width: 202px;
    margin: 0 auto;
    border-left:7px solid #2daf93;
    text-align: center;
    font-size: 32px;
    margin-bottom:38px;
    box-sizing: border-box;
  }
  li {
    width: 550px;
    margin: 0 auto;
    height: 57px;
    line-height: 57px;
  div:nth-child(1){
    float: left;
    font-size:28px;
    color: #666666;
  }
  div:nth-child(2){
    float: right;
    font-size:28px;
    color: #b2b2b2;
  }
  }
  }
  }
  .clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
  }
</style>
