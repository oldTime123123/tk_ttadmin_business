/*
 * @Author: chenpn chenpn699@gmail.com
 * @Date: 2024-08-16 22:17:23
 * @LastEditors: chenpn chenpn699@gmail.com
 * @LastEditTime: 2024-09-05 15:15:40
 * @FilePath: \web_business\api\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request'

// 个人中心
export const apiUserCentre = () => request.get('shop/getShopInfo')


// S 个人设置
// 获取用户信息
export const apiGetUserInfo = () => request.get('user/info')

// 退出u登录
export const apiLogout = () => request.post('account/logout')

// 设置用户登录登录密码
export const apiSetPassword = params => request.post('shop/changePwd', params)
//  E 个人设置

// 账户明细
export const userBill = (params) => request.get('account_log/lists', {
	params
})
// E 转账


// S  地址
// 获取地址列表
export const apiAddressLists = () => request.get('user_address/lists')

// 获取地址详情
export const apiAddressDetail = params => request.get('user_address/detail', {
	params
})

// 添加收货地址
export const apiAddressAdd = params => request.post('user_address/add', params)

// 编辑收货地址
export const apiAddressEdit = params => request.post('user_address/edit', params)

// 设置默认收货地址
export const apiAddressEditDefault = params => request.post('user_address/setDefault', params)

// 删除收货地址
export const apiAddressDel = params => request.post('user_address/del', params)

// 微信导入收货地址转ID
export const apiAddresshandleRegion = params => request.get('user_address/handleRegion', {
	params
})
// E 地址


// S 提现

// 提现记录列表
export const apiWithdrawLog = () => request.get('shop/withdrawLog')

// 提现数据
export const apiGetWithdrawInfo = () => request.get('shop/getWithdrawInfo')

// 添加银行卡
export const apiAddBank = (params) => request.post('shop/addBank', params)

// 删除银行卡
export const apiDelBank = (params) => request.post('shop/delBank', params)

// 编辑银行卡
export const apiEditBank = (params) => request.post('shop/editBank', params)

// 银行卡详情
export const apigetBankDetail = (params) => request.get('shop/getBank', {
	params
})

// 提现申请
export const apiWithdrawApply = (params) => request.post('shop/withdraw', params)

// E 提现

//语言列表
export const getLangVersion = (params) => request.get('Account/langList')

//设置语言
export const getLangJson = (params) => request.get('Account/setLang')

//国家区号
export const getCountryList = (params) => request.get('Account/getCountryList')

//注册方式
export const getRegisterType = (params) => request.post('Account/registerType', params)

