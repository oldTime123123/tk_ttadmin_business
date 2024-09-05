/*
 * @Author: chenpn chenpn699@gmail.com
 * @Date: 2024-08-28 09:19:20
 * @LastEditors: chenpn chenpn699@gmail.com
 * @LastEditTime: 2024-09-04 21:52:25
 * @FilePath: \web_business\config\app.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 开发者环境：开|关	【注：方便微信小程序发行测试】
const SWITCH_DEVELOPMENT = false

/** S 是否H5端 **/
// #ifdef H5
const IS_H5 = true
// #endif

// #ifndef H5
const IS_H5 = false
// #endif
/** E 是否H5端 **/

/** S API BaseURL **/
const baseURLMap = {
	// 开发环境
	// development: 'https://api.tksmalladmin.com',
	development: 'https://likeshop.task678.com',

	// 生产环境https://likeshopb2b2c.yixiangonline.com
	production: IS_H5 ? location.origin : ''
}

// const baseURL = SWITCH_DEVELOPMENT ? baseURLMap['development'] : baseURLMap[process.env.NODE_ENV]
// const baseURL = 'https://api.tksmalladmin.com'
const baseURL = 'https://likeshop.task678.com'


/** E API BaseURL **/

module.exports = {
	version: '2.5.0 20240403', // 版本号
	baseURL, // API Base URL
	basePath: '/mobile'
}