import request from '@/utils/request'
import wechath5 from '@/utils/wechath5'
import store from 'store'

// 账号登录
export const apiAccountLogin = data =>
	request.post("account/login", {
		...data
	})

// 重置登录密码
export const apiResetPassword = data =>
	request.post("user/resetPassword", data)

// 获取服务协议
export const apiPolicyAgreement = (params) => request.get('config/getPolicyAgreement', {
	params
})

// 获取公共配置
export const apiConfig = () => request.get('index/config')

export const tokenApi = (params) => request.post('account/loginByToken', params)
export const setBankcard = (params) => request.post('shop/setBankcard', params)

export const approveConfig = (params) => {
	return request.get("ShopApply/approveConfig")
}

export const shopApply = (data) => {
	return request.post('ShopApply/apply', data)
}

// 申请记录详情
export function shopApplyDetail(id) {
	return request.get('ShopApply/detail', {
		params: {
			id
		}
	})
}


export function applyStatus() {
	return request.get("ShopApply/applyStatus")
}
//手机验证码
export const sendSms = (params) => request.post('send/sendsms', params)

//邮箱验证码
export const emailSendSms = (params) => request.post('send/sendEmail', params)

//手机注册
export const register = (params) => request.post('/Account/register', params)

//邮箱注册
export const emailRegister = (params) => request.post('/Account/registerByEmail', params)
