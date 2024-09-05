<template>
	<view class="pages main">
		<view class="flex">
			<view class="">

			</view>
			<view class="">

			</view>
			<view class="" @click="pickerShow">
				<image style="width: 48rpx;height: 48rpx;margin: 15px 15px 0 0;" src="../../static/images/earth.jpg">
				</image>
			</view>
		</view>
		<view class="login">
			<view class="flex mb20 tans">
				<view class="btns" @click="changeType(1)" :class="type==1?'changeTy':''">
					{{this.$t('register.rg30')}}
				</view>
				<view class="btns" @click="changeType(2)" :class="type==2?'changeTy':''">
					{{this.$t('register.rg31')}}
				</view>
				<view class="btns" @click="changeType(3)" :class="type==3?'changeTy':''">
					{{this.$t('register.rg32')}}
				</view>
			</view>
			<view class="logo">
				<view class="bold">{{appConfig.platform_name||$t('signin.platform')}}</view>
				<view class="m-t-14 bold">{{$t('signin.title')}}</view>
			</view>
			<view class="acount-login" style="">
				<view class="input input_box" v-if="type==1">
					<u-field label-width="0" clear-size="38" icon="account" v-model="account"
						:placeholder="$t('signin.Prompts1')" placeholder-style="color: rgb(192, 196, 204);"
						:input-border="false" />
				</view>
				<view v-if="type==2" style="box-sizing: border-box;padding: 16rpx 25rpx;"
					class="input-item flex u-skeleton-circle input_box">
					<view @click="show = true" style="margin-right: 20rpx;">
						{{country_code}}
						<u-icon style="margin-left: 10rpx;" name="arrow-down"></u-icon>
					</view>
					<!-- <u-field label-width="0" clear-size="38" v-model="mobile"
						:placeholder="$t('register.rg6')" :input-border="false" /> -->
					<u-input v-model="mobile" class="input" placeholder-style="color: rgb(192, 196, 204);"
						:placeholder="this.$t('register.rg6')" />
				</view>
				<view class="input input_box" v-if="type==3">
					<u-field label-width="0" clear-size="38" icon="email" v-model="email"
						:placeholder="$t('register.rg7')" placeholder-style="color: rgb(192, 196, 204);"
						:input-border="false" />
				</view>
				<view class="input input_box">
					<u-field label-width="0" icon="lock-open" placeholder-style="color: rgb(192, 196, 204);"
						@right-icon-click="showPassword" :right-icon="isPassword?'eye':'eye-fill'"
						:password="isPassword" v-model="password" :placeholder="$t('signin.Prompts2')"
						:input-border="false" />
				</view>
				<view class="flex">
					<view class=" " style="display: flex;align-items: center;justify-content: center;">
						<u-checkbox activeColor="#40AFFA" v-model="checked" shape="circle"><text
								class="sm">{{$t('signin.article')}}</text></u-checkbox>
						<router-link to="/bundle/pages/server_explan/server_explan?type=2">
							<view class="agreement primary">《{{$t('signin.Agreement')}}》</view>
						</router-link>
					</view>
				</view>

				<button class="login-btn white" size="lg" @tap="loginFun">{{$t('signin.buttenText')}}</button>
				<view class="" style="display: flex;justify-content: center;align-items: center; margin-top: 32rpx;">
					<text class="Go_to_register" @click="juplink">
						{{this.$t('register.rg1')}}
					</text>
					<image src="../../static/images/go.png" style="width: 36rpx;height: 36rpx;" mode=""></image>
				</view>
			</view>

		</view>
		<u-popup v-model="show" width="250">
			<image :src="appConfig.shop_login_logo" style="width: 90%;height: 60rpx;margin-top: 40rpx;margin-left: 5%;"
				mode=""></image>
			<view class="country_code" v-for="item of CountryList" @click="changeCountry(item)">
				<text style="margin-right: 10rpx;">{{item.code}}</text>
				<text>{{item.countryName}}</text>
			</view>
		</u-popup>
		<!-- <nut-picker :is-visible="show" :list-data="columns" :title="$t('bus_login.chooseLange')" @confirm="confirm" @close="show = false"></nut-picker> -->
	</view>
</template>

<script>
	import {
		getCountryList
	} from '@/api/user'
	import {
		mapMutations,
		mapActions,
		mapGetters
	} from 'vuex'
	import {
		apiAuthLogin,
		apiAccountLogin,
		apiLoginCaptcha,
		tokenApi
	} from '@/api/app';
	import wechath5 from '@/utils/wechath5'
	import {
		isWeixinClient,
		currentPage,
		client,
		trottle
	} from '@/utils/tools'
	import Cache from "@/utils/cache"
	import {
		BACK_URL,
		INVITE_CODE
	} from '@/config/cachekey'
	import {
		getWxCode,
		getUserProfile
	} from '@/utils/login'
	import {
		baseURL,
		version
	} from '@/config/app'
	import store from 'store'
	export default {
		data() {
			return {
				password: '',
				account: '',
				checked: false,
				isPassword: true,
				client: store.getters.client, //1-微信小程序 2-微信公众号 3-安卓app 4-苹果app 5-pc端 6-h5
				// show: false,
				// columns: [
				// [
				// 	{
				// 		label: 1,
				// 		value: this.$t('bus_login.chineseLang'),
				// 	},
				// 	{
				// 		label: '',
				// 		value: this.$t('bus_login.englishLang'),
				// 	}
				// 	],
				// ],
				type: 1,
				show: false,
				mobile: '',
				country_code: '',
				CountryList: []
			};
		},

		methods: {
			...mapMutations(['login']),
			...mapActions(['getUser']),

			juplink() {
				uni.navigateTo({
					url: '../register/register'
				})
			},
			async appjudge(data) {

				if (data.includes('lang')) {
					const langData = data
					let lang = langData.split('?')[2].split('#/')[0].split('=')[1]
					this.$i18n.locale = lang;
					localStorage.setItem('locale', lang);
				}
				if (data.includes('token')) {
					const tokenData = data
					const token = tokenData.split('?')[1].split('#/')[0].split('=')[1]
					try {
						const response = await uni.request({
							url: baseURL + '/shopapi/' + 'account/loginByToken', // 你的API接口地址
							method: 'POST',
							data: {
								// 在这里放置你的请求数据
							},
							header: {
								'content-type': 'application/json', // 设置请求的 content-type
								'token': token
							}
						});

						// 请求成功，处理返回的数据
						console.log(response[1].data.data, 'sss');
						this.tokenApifn(response[1].data.data)
					} catch (error) {
						// 请求失败，处理错误
						console.error(error);
					}

				}

			},
			async getCountryListfn() {
				let res = await getCountryList()
				if (res.code == 1) {
					this.CountryList = res.data;
					this.isShowMsg = res.data[0].is_sms;
					this.country_code = res.data[0].code
				}

			},
			changeCountry(item) {
				this.mobile = '';
				this.account = '';
				this.country_code = item.code
				this.show = false
			},
			changeType(type) {
				this.type = type;
				if (type == 1) {
					this.mobile = '';
					this.country_code = '';
					this.email = '';
					this.getCountryListfn()
				} else if (type == 2) {
					this.account = '';
					this.email = '';
					this.getCountryListfn()
				} else {
					this.account = '';
					this.mobile = '';
				}
				this.password = ''
			},
			async tokenApifn(data) {
				// let data = await tokenApi()
				this.loginHandle(data)
			},

			// 账号登录
			async loginFun() {
				uni.showLoading();
				const {
					type,
					account,
					mobile,
					email,
					password,
					checked
				} = this
				if (type == 1) {
					if (!account) return this.$toast({
						title: this.$t('signin.Prompts1')
					})
				} else if (type == 2) {
					if (!mobile) return this.$toast({
						title: this.$t('settled.set_9')
					})
				} else {
					if (!email) return this.$toast({
						title: this.$t('register.rg7')
					})
				}
				if (!checked) return this.$toast({
					title: this.$t('signin.loginYS')
				})
				if (!password) return this.$toast({
					title: this.$t('signin.Prompts2')
				})
				let dats = {
					type: type == 1 ? 'account' : type == 2 ? 'mobile' : 'email',
					mobile: type == 2 ? this.mobile : undefined,
					country_code: type != 3 ? this.country_code : undefined,
					account: type == 1 ? this.account : undefined,
					email: type == 3 ? this.email : undefined,
					password: this.password
				}
				apiAccountLogin(dats).then(res => {
					if (res.code == 1) {
						this.loginHandle(res.data)
					} else {
						this.$toast({
							title: res.msg
						})
					}
					uni.hideLoading();
				}).catch(() => {
					uni.hideLoading();
				})
			},
			// 登录结果处理
			async loginHandle(data) {
				this.login(data)
				this.getUser()
				uni.hideLoading()
				uni.reLaunch({
					url: '/pages/index/index'
				})
			},

			showPassword() {
				this.isPassword = !this.isPassword
			},
			pickerShow() {
				uni.reLaunch({
					url: '/pages/locale/index'
				})
				// this.show = true
			},
			// 回调参数为包含columnIndex、value、values
			// confirm(e) {
			//     console.log('confirm', e)
			// 	localStorage.setItem('lang', value);
			// 	uni.setStorageSync('localeJson', res);
			//     // this.show = false
			// }
		},

		onLoad() {
			this.getCountryListfn();

			this.appjudge(window.location.href)

			const account = Cache.get('account')

			if (account) this.account = account

			this.getCodeUrl = trottle(this.getCodeUrl)
			// #ifdef H5
			// this.oaAutoLogin()
			// #endif
		},
		onUnload() {

		},
	};
</script>
<style lang="scss">
	.input_box {
		background: #EDF0F1;
		border-radius: 15rpx;
		box-sizing: border-box;
		padding: 8rpx 0rpx;
		margin-bottom: 48rpx;
	}

	.changeTy {
		background: url('../../static/images/resr.png') no-repeat;
		background-size: 82rpx 24rpx;
		color: #003D85 !important;
		background-position: 52rpx 48rpx;
	}

	.Go_to_register {
		color: #40AFFA;
		border-bottom: 1px solid #40AFFA;
	}

	.flex {
		display: flex;
		justify-content: space-between;
	}

	page {
		background-color: #fff;

		padding: 0;
	}

	.main {
		background: url('../../static/images/loginbk.png') no-repeat;
		background-size: 100% 100%;
	}

	.login {
		height: 100vh;
		padding-top: 80rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;

		.logo {
			height: 126rpx;
			text-align: center;
			margin-top: 30rpx;

			view:first-child {
				font-size: 52rpx;
			}

			view:last-child {
				font-size: 36rpx;
			}
		}

		.acount-login {
			position: relative;
			top: 70px;
			background: #FFFFFF;
			box-shadow: 0px 4rpx 14rpx 0px rgba(0, 0, 0, 0.08);
			border-radius: 32rpx;
			box-sizing: border-box;
			padding: 56rpx 40rpx 64rpx 40rpx;
		}

		.acount-login,
		.other-login {
			margin-top: 63rpx;
			width: calc(100% - 80rpx);

			.input {
				// padding-top: 20rpx;

			}

			.login-btn {
				margin: 30rpx 0 20rpx;
				background-color: $-color-primary;
				border-radius: 32rpx;
				margin-top: 104rpx;
			}
		}

		.agreement {
			color: $-color-primary;
		}
	}

	.mb20 {
		margin-bottom: 20rpx;
	}

	.btns {
		box-sizing: border-box;
		padding: 15rpx 20rpx;
		border-radius: 15rpx;
		margin-right: 15rpx;
		width: 320rpx;
		height: 48px;
		display: flex;
		color: #67788C;
		align-items: center;
		justify-content: center;
		font-weight: bold;


	}

	.tans {
		position: relative;
		top: 165px;
		width: 90%;
	}

	.comfirm-box {
		text-align: center;
		padding: 60rpx 0 70rpx 0;
	}

	.country_code {
		box-sizing: border-box;
		padding: 15px 10px;
		display: flex;
		border-bottom: 1px solid #E5E5E5;
		margin-top: 7px;
	}

	::v-deep input .u-input__input {
		color: #000 !important;
	}
</style>