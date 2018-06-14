<template>
  <div class="roll-out">
    <div class="form">
      <label class="label" :for="index" v-for="(item, index) in form" :key="index">
        <span class="name">{{ item.name }}</span>
        <input class="input" :id="index" :type="item.type || 'text'" v-if="index !== 'newsCode'" :placeholder="item.placeholder"  v-model="item.num" :readonly="item.readOnly">
        <button class="input_button" v-if="index === 'newsCode'" @click="getCode">{{ codeTime === 61 ? '獲取验证码' : codeTime + 's后重試' }}</button>
        <input class="input_code" :id="index" type="text" v-if="index === 'newsCode'" v-model="item.num" :placeholder="item.placeholder">
      </label>
    </div>
    <button class="submit" @click="submit">确定</button>
  </div>
</template>

<script>
  export default {
    name: 'rollOut',
    data () {
      return {
         form:{
           roll: {
             name: '擁有DCC',
             num:"123456.00",
             readOnly: true
           },
           roll_num:{
             name:"转出数量",
             placeholder: '輸入轉出數量',
             coin:'DCC'
           },
           roll_ip:{
             name:'錢包地址',
             placeholder: '請輸入錢包地址'
           },
           phone: {
             name: '手機號碼',
             placeholder: '我的手機號',
             num: '183****8542',
             readOnly: true
           },
           newsCode:{
             name: '短信驗證碼',
             placeholder: '請輸入驗證碼',
             num: ''
           },
         },
        codeTime: 61
      }
    },
    mounted () {

    },
    methods: {
      getCode () {
        if (this.codeTime !== 61) return false
        if (this.form.phone.num === '') return this.$bus.$emit('alert', '請輸入手機號碼')
        this.codeTime = 60
        let timer = setInterval(() => {
          if (--this.codeTime === 0) {
            clearInterval(timer)
            this.codeTime = 61
          }
        }, 1000)
        this.axios.post('Sms/send', {
          type: 3,
          phone: '18337131078'
          //      phone: "this.form.phone.num"
        }).then(({data}) => {
          if (data.status !== 200) this.$bus.$emit('alert', data.message)
        })
      },
    }
  }
</script>

<style lang="scss">
  @import '../assets/scss/style.scss';
  .roll-out{
    .head {
      @include headBlack;
    }
    padding-top:100px;
    .form {
      padding: 0 45px;
      .label {
        height: 128px;
        display: block;
        border-bottom: 1px solid #424652;
        padding-top: 50px;
        .name {
          float: left;
          color: #d1cece;
          font-size: 28px;
          margin-top: 5px;
          width:180px;
        }
        .input, .input_code {
          float:left;
          background: none;
          color: #fff;
          padding-right: 10px;
          height: 50px;
          font-size:28px;
        }
        .input_button {
          float: right;
          padding: 0 10px;
          background: none;
          color: #d7a72e;
          font-size: 28px;
          height: 50px;
        }
      }
    }
    .submit {
      @include submitButton;
      width: 80%;
      color:#000;
    }
  }
</style>
