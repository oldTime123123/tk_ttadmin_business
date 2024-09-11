/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-08-09 10:34:33
 * @LastEditors: chenpn chenpn699@gmail.com
 * @LastEditTime: 2024-08-29 18:41:12
 * @FilePath: \1\web_business\lang\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'

import langEn from './en';
import langTw from './tw';
import langAr from './ar';
import langRu from './ru';
import langEs from './es';
// import langPt from './pt';
// import langIn from './in';


// import langAz from './az';
// import langBd from './bd';
import langDe from './de';
import langFr from './fr';
// import langHe from './he';
// import langIt from './it';
import langJa from './ja';
import langKo from './ko';
// import langPl from './pl';
// import langTh from './th';
// import langTr from './tr';
// import langKz from './kz';
// import langMn from './mn';
// import langVi from './vi';
import langZh from './zh';
// import langMS from './ms';
import langId from './id';

Vue.use(VueI18n)

const messages = {
	'zh-TW': langTw,
	'en': langEn,
	'ru': langRu,
	'ar': langAr,
	'es': langEs,
	// 'pt': langPt,
	// 'in': langIn,
	// 'az': langAz,
	'id': langId,
	// 'bd': langBd,
	'de': langDe,
	'fr': langFr,
	// 'he': langHe,
	// 'it': langIt,
	'ja': langJa,
	'ko': langKo,
	// 'pl': langPl,
	// 'th': langTh,
	// 'tr': langTr,
	// 'kz': langKz,
	// 'mn': langMn,
	// 'vi': langVi,
	"zh-CN": langZh,
	// langMS
}
// const lang = localStorage.getItem('locale')
// if (!lang) {
// 	localStorage.setItem('locale', 'en')
// }

const i18n = new VueI18n({
	globalInjection: true, //全局$t 生效
	locale: localStorage.getItem('locale') || "en",
	messages,
	legacy: false,
	silentTranslationWarn: true, // 去除国际化警告
})


export default i18n