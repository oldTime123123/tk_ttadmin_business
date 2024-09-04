<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-08-05 10:58:10
 * @LastEditors: chenpn chenpn699@gmail.com
 * @LastEditTime: 2024-09-04 19:42:10
 * @FilePath: \1\web_business\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script>
	import {
		mapActions,
		mapGetters,
		mapMutations
	} from 'vuex'
	import Cache from '@/utils/cache'
	import {
		getLangJson,
		getLangVersion
	} from '@/api/user.js';
	export default {
		async onLaunch(options) {
			// 获取配置
			this.getConfig();
			// 获取个人信息
			this.getUser();
			// getLangVersion().then((res) => {
			// 	let value = res[0].language
			// 	localStorage.setItem('locale', value)
			// 	localStorage.setItem('lang', value)

			// 	getLangJson().then(res => {
			// 		this.$i18n.setLocaleMessage(value, res);					
			// 		uni.setStorageSync('localeJson', res);
			// 	})

			// });
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			...mapActions([
				'getUser',
				'getConfig',
				'isLogin'
			]),
			...mapMutations(['logout']),
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import 'styles/common.scss';
	@import "components/uview-ui/index.scss";

	.u-delete-icon {
		top: -2px !important;
		right: -2px !important;
	}
	
</style>