import Vue from 'vue'
import Router from 'vue-router'
import register from '@/page/register'
import login from '@/page/login'
import changeLanguage from '@/page/change_language'
import index from '@/page/index'
import detailsCot from '@/page/details_cot'
import userCenter from '@/page/user-center'
import precept from '@/page/precept'
import submitOrder from '@/page/submit_order'
import myCode from '@/page/my_code'
import checkIn from '@/page/checkIn'
import waitOpen from '@/page/wait_open'
import setting from '@/page/setting'
import setLoginPsd from '@/page/setLoginPsd'
import setDealPsd from '@/page/setDealPsd'
import realName from '@/page/realName'
import shareReward from '@/page/share_reward'
import message from '@/page/message'
import rollOut from '@/page/roll_out'
import registration from '@/page/registration'
import forget from '@/page/forget'
import personal from '@/page/personal-data'
import debt_records from '@/page/debt_records'
import registerFirst from '@/page/register_first'
import declaration from '@/page/declaration'
import declarationResult from '@/page/declaration-result'
import nearBank from '@/page/nearBank'
import newsList from '@/page/news-list'
import nearDebt from '@/page/nearDebt'
import registerSecond from '@/page/register_second'
import registerThird from '@/page/register_third'
import registerFourth from '@/page/register_fourth'
import registerFifth from '@/page/register_fifth'
import subscribe from '@/page/subscribe'
import codeLogin from '@/page/codeLogin'
import reset from '@/page/reset'
import pwdpush from '@/page/pwdpush'
import intoDetails from '@/page/into_details'
import intoPurse from '@/page/into_purse'
import C2C from '@/page/C2C'
import asset from '@/page/asset'
import assetDetails from '@/page/asset_details'
import change from '@/page/change'
import account from '@/page/account'
import certification from '@/page/certification'
import certificationResults from '@/page/certification_results'
import intoAccount from '@/page/into-account'
import debtDetails from '@/page/debt_details'
import setPayPsd from '@/page/setPayPsd'
import retrieve from '@/page/retrieve'
import newPsd from '@/page/newPsd'
import retypePsd from '@/page/retypePsd'
import chooseSolution from '@/page/choose_solution'
import pay from '@/page/pay'
import blockchain from '@/page/blockchain'
import solveDebt from '@/page/solve_debt'
import realPresent from '@/page/realPresent'
import certificationTrue from '@/page/certification-true'
import messageDetails from '@/page/message_details'
import beianSucceed from '@/page/beian_succeed'
import deal from '@/page/deal'
import solveDebtSuccess from '@/page/solve_debtSuccess'
import transfer from '@/page/transfer'

Vue.use(Router)
export default new Router({
//mode: 'history',
  routes: [
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/transfer',
      name: 'transfer',
      component: transfer
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/changeLanguage',
      name: 'changeLanguage',
      component: changeLanguage
    },
    {

      path: '/deal',
  name: 'deal',
  component: deal
    },
    {
      path: '/codeLogin',
      name: 'codeLogin',
      component: codeLogin
    },
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/newsList',
      name: 'newsList',
      component: newsList
    },
    {
      path: '/blockchain',
      name: 'blockchain',
      component: blockchain
    },
    {
      path: '/newPsd',
      name: 'newPsd',
      component: newPsd

    },
    {
      path: '/retypePsd',
      name: 'retypePsd',
      component: retypePsd
    },
    {
      path: '/forget',
      name: 'forget',
      component: forget
    },
    {
      path: '/retrieve',
      name: 'retrieve',
      component: retrieve

    },
    {
      path: '/index',
      name: 'index1',
      component: index
    },
    {
      path: '/detailsCot',
      name: 'detailsCot',
      component: detailsCot
    },
    {
      path: '/userCenter',
      name: 'userCenter',
      component: userCenter
    },
    {
      path: '/precept',
      name: 'precept',
      component: precept
    },
    {
      path: '/submitOrder',
      name: 'submitOrder',
      component: submitOrder
    },
    {
      path: '/myCode',
      name: 'myCode',
      component: myCode
    },
    {
      path: '/checkIn',
      name: 'checkIn',
      component: checkIn
    },
    {
      path: '/waitOpen',
      name: 'waitOpen',
      component: waitOpen
    },
    {
      path: '/setting',
      name: 'setting',
      component: setting
    },
    {
      path: '/reset',
      name: 'reset',
      component: reset
    },
    {
      path: '/pwdpush',
      name: 'pwdpush',
      component: pwdpush

    },
    {
      path: '/setPayPsd',
      name: 'setPayPsd',
      component: setPayPsd

    },


    {
      path: '/setLoginPsd',
      name: 'setLoginPsd',
      component: setLoginPsd
    },
    {
      path: '/setDealPsd',
      name: 'setDealPsd',
      component: setDealPsd
    },
    {
      path: '/realName',
      name: 'realName',
      component: realName
    },
    {
      path: '/shareReward',
      name: 'shareReward',
      component: shareReward
    },
    {
      path: '/message',
      name: 'message',
      component: message
    },
    {
      path: '/rollOut',
      name: 'rollOut',
      component: rollOut
    },
    {
    	path: '/registration',
      name: 'registration',
      component: registration
    },
    {
      path: '/personal',
      name: 'personal',
      component: personal
    },
    {
    	path: '/debt_records',
      name: 'debt_records',
      component: debt_records
    },
    {
    	path: '/registerFirst',
      name: 'registerFirst',
      component: registerFirst
    },
    {
    	path: '/declaration',
      name: 'declaration',
      component: declaration
    },
    {
    	path: '/declarationResult',
      name: 'declarationResult',
      component: declarationResult
    },
    {
    	path: '/nearBank',
      name: 'nearBank',
      component: nearBank
    },
    {
    	path: '/nearDebt',
      name: 'nearDebt',
      component: nearDebt
    },
    {
    	path: '/registerSecond',
      name: 'registerSecond',
      component: registerSecond
    },
    {
    	path: '/registerThird',
      name: 'registerThird',
      component: registerThird
    },
    {
    	path: '/registerFourth',
      name: 'registerFourth',
      component: registerFourth
    },
    {
    	path: '/registerFifth',
      name: 'registerFifth',
      component: registerFifth
    },
    {
    	path: '/intoDetails',
      name: 'intoDetails',
      component: intoDetails
    },
    {
    	path: '/intoPurse',
      name: 'intoPurse',
      component: intoPurse
    },
    {
    	path: '/C2C',
      name: 'C2C',
      component: C2C
    },
    {
    	path: '/asset',
      name: 'asset',
      component: asset
    },
    {
    	path: '/assetDetails',
      name: 'assetDetails',
      component: assetDetails
    },
    {
    	path: '/change',
      name: 'change',
      component: change
    },
    {
    	path: '/account',
      name: 'account',
      component: account
    },
    {
    	path: '/certification',
      name: 'certification',
      component: certification
    },
    {
    	path: '/certificationResults',
      name: 'certificationResults',
      component: certificationResults
    },
    {
    	path: '/intoAccount',
      name: 'intoAccount',
      component: intoAccount
    },
    {
    	path: '/subscribe',
      name: 'subscribe',
      component: subscribe
    },
    {
      path: '/certificationTrue',
      name: 'certificationTrue',
      component: certificationTrue

    },
    {
    	path: '/debtDetails',
      name: 'debtDetails',
      component: debtDetails
    },
    {
    	path: '/chooseSolution',
      name: 'chooseSolution',
      component: chooseSolution
    },
    {
    	path: '/pay',
      name: 'pay',
      component: pay
    },
    {
    	path: '/solveDebt',
      name: 'solveDebt',
      component: solveDebt
    },
    {
    	path: '/realPresent',
      name: 'realPresent',
      component: realPresent
    },
    {
    	path: '/messageDetails',
      name: 'messageDetails',
      component: messageDetails
    },
    {
    	path: '/beianSucceed',
      name: 'beianSucceed',
      component: beianSucceed
    },
      {
    	path: '/solveDebtSuccess',
      name: 'solveDebtSuccess',
      component: solveDebtSuccess
    },

  ]
})
