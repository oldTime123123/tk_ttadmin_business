<template>
	<view class="register u-skeleton main">
		<!-- #ifndef  H5 -->

		<u-sticky offset-top="0" h5-nav-height="0" bg-color="transparent">
			<u-navbar :is-back="true" :title="$t('register.rg2')" :title-bold="true" :is-fixed="false"
				:border-bottom="false" :background="{ background: 'rgba(256,256, 256,0)' }"></u-navbar>
		</u-sticky>
		<!-- #endif -->
		<view class=" m-b-50 text u-skeleton-circle" style="text-align: center;margin-top: 100rpx;">
			{{this.$t('register.rg3')}}
		</view>


		<view class="flex mb20">
			<view class="btns" @click="changeType(1)" :class="type==1?'changeTy':''">
				{{this.$t('register.rg4')}}
			</view>
			<view class="btns" @click="changeType(2)" :class="type==2?'changeTy':''">
				{{this.$t('register.rg5')}}
			</view>

		</view>

		<view class="input-container ">
			<view v-if="type==1" class="input-item flex u-skeleton-circle input_box">
				<view class="" @click="show = true" style="margin-right: 20rpx; margin-right: 20rpx;">
					{{country_code}}
					<u-icon style="margin-left: 10rpx;" name="arrow-down"></u-icon>
				</view>
				<u-input v-model="mobile" class="input" :placeholder="this.$t('register.rg6')" />
			</view>
			<view v-else class="input-item flex u-skeleton-circle input_box">
				<image src="../../static/images/em.png" style="width: 40rpx;height: 40rpx;margin-right: 20rpx" mode="">
				</image>
				<u-input v-model="email" class="input" :placeholder="this.$t('register.rg7')" />

			</view>


			<view v-if="type==1&&isShowMsg==1" class="input-item flex u-skeleton-circle input_box">
				<image src="../../static/images/yan.png" style="width: 40rpx;height: 40rpx;margin-right: 20rpx" mode="">
				</image>

				<u-input v-model="code" style="width: 300rpx" :placeholder="this.$t('register.rg8')"
					placeholder-style="font-size: 24rpx;color: rgb(192, 196, 204);" />
				<button style="line-height: normal;" class="bd-primary xs primary br60 flex row-center"
					:class="{ disable: mobile.length != 11 }" hover-class="none" @click="sendSmsFun">
					<!-- 获取手机验证码 -->
					<u-verification-code :end-text="this.$t('settled.set_59')" change-text='Xs'
						:startText="this.$t('settled.set_59')" unique-key="register" ref="uCode" @change="codeChange">
					</u-verification-code>
					<view class="xs">{{ codeTips }}</view>
				</button>
			</view>

			<view v-if="type==2" class="input-item flex u-skeleton-circle input_box">
				<image src="../../static/images/yan.png" style="width: 40rpx;height: 40rpx;margin-right: 20rpx;"
					mode=""></image>

				<u-input v-model="code" style="width: 300rpx" :placeholder="this.$t('register.rg9')"
					placeholder-style="font-size: 24rpx;color: rgb(192, 196, 204);" />
				<button style="line-height: normal;" class="bd-primary xs primary br60 flex row-center"
					:class="{ disable: mobile.length != 11 }" hover-class="none" @click="sendSmsFun2">
					<!-- 获取邮箱验证码 -->
					<u-verification-code :end-text="this.$t('settled.set_59')" change-text='Xs'
						:startText="this.$t('settled.set_59')" unique-key="register" ref="uCode" @change="codeChange">
					</u-verification-code>
					<view class="xs">{{ codeTips }}</view>
				</button>
			</view>
			<view class="input-item flex u-skeleton-circle input_box">
				<image src="../../static/images/suo.png" style="width: 40rpx;height: 40rpx;margin-right: 20rpx;"
					mode=""></image>

				<u-input type="password" v-model="password" :placeholder="this.$t('register.rg10')" />
			</view>
			<view class="input-item flex u-skeleton-circle input_box">
				<image src="../../static/images/suo.png" style="width: 40rpx;height: 40rpx; margin-right: 20rpx;"
					mode=""></image>

				<u-input type="password" v-model="passwordConfirm" :placeholder="this.$t('register.rg11')" />
			</view>
			<view class="input-item flex input_box">
				<image src="../../static/images/yao.png" style="width: 40rpx;height: 40rpx; margin-right: 20rpx;"
					mode=""></image>
				<u-input type="text" v-model="invite_code" :placeholder="this.$t('register.rg12')" />
			</view>

			<view class="m-t-40 sm flex  u-skeleton-circle">
				<u-checkbox v-model="isAgreement" shape="circle">
					<div class="flex" style="flex-wrap: wrap;">
						{{this.$t("register.rg13")}}
						<!-- <router-link to="/bundle/pages/server_explan/server_explan?type=0">
							<view class="primary">《{{this.$t('register.rg14')}}》</view>
						</router-link>
						{{this.$t('register.rg20')}} -->
						<router-link to="/bundle/pages/server_explan/server_explan?type=1">
							<view class="primary" style="color:#40AFFA ;">《{{this.$t('register.rg15')}}》</view>
						</router-link>
					</div>
				</u-checkbox>
			</view>
			<view class="btn white bg-primary br60 flex row-center u-skeleton-circle" @click="registerFun">
				{{this.$t('register.rg2')}}
			</view>


			<view style="margin-top: 20rpx;color: #40AFFA;" class=" white  br60 flex row-center u-skeleton-circle"
				@click="loginfn">
				<text class="" style="border-bottom: 1px solid #40AFFA;">
					{{this.$t('register.rg16')}}
				</text>
				<image src="../../static/images/go.png" style="width: 36rpx;height: 36rpx;" mode=""></image>

			</view>
		</view>

		<!-- 阅读协议弹框 -->
		<u-modal :value="showModel" :confirm-text='this.$t("register.rg17")' :cancel-text='this.$t("register.rg18")'
			show-cancel-button :show-title="false" @confirm="(isAgreement = true), (showModel = false)"
			@cancel="showModel = false" confirm-color="#FF2C3C">
			<view class="comfirm-box ">
				<view> {{this.$t('register.rg19')}} </view>
				<view class="flex row-center" style="flex-wrap: wrap;wrap;font-size: 28rpx;margin-top: 20rpx;">
					<router-link data-theme="" to="/bundle/pages/server_explan/server_explan?type=0">
						<view class="agreement">《{{this.$t('register.rg14')}}》</view>
					</router-link>
					{{this.$t('register.rg20')}}
					<router-link to="/bundle/pages/server_explan/server_explan?type=1">
						<view class="agreement">《{{this.$t('register.rg15')}}》</view>
					</router-link>
				</view>
			</view>
		</u-modal>
		<u-popup v-model="show" width="250">
			<image :src="appConfig.shop_login_logo" style="width: 90%;height: 60rpx;margin-top: 40rpx;margin-left: 5%;"
				mode=""></image>
			<view class="country_code" v-for="item of CountryList" @click="changeCountry(item)">
				<text style="margin-right: 10rpx;">{{item.code}}</text>
				<text>{{item.countryName}}</text>
			</view>
		</u-popup>
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>

	</view>
</template>

<script>
	import {
		register,
		sendSms,
		emailSendSms,
		emailRegister
	} from "@/api/app.js";
	import {
		ACCESS_TOKEN
	} from "@/config/app.js";
	// import {
	// 	SMSType
	// } from "@/utils/type.js";
	import {
		mapMutations,
		mapGetters
	} from "vuex";
	import {
		getCountryList
	} from '@/api/user'
	import Cache from '@/utils/cache'
	import {
		BACK_URL,
		INVITE_CODE
	} from '@/config/cachekey'
	import {
		isWeixinClient,
		currentPage,
		client,
		trottle,
		toast
	} from '@/utils/tools'

	export default {
		name: "register",
		created() {},
		data() {
			return {
				isShowMsg: 0,
				isAgreement: false,
				mobile: "",
				code: "",
				password: "",
				passwordConfirm: "",
				canSendSms: true,
				codeTips: "",
				showModel: false,
				show: false,
				CountryList: [],
				country_code: "",
				invite_code: "",
				loading: true,
				type: 1,
				email: ''
			};
		},
		onLoad() {
			// console.log(this.appConfig)
			this.getCountryListfn()
			setTimeout(() => {
				this.loading = false

			}, 1500)

		},
		methods: {
			...mapMutations(['login']),
			codeChange(tip) {
				this.codeTips = tip;
			},
			changeType(type) {
				this.type = type;
				if (type == 1) {
					this.email = ''
				} else {
					this.mobile = ''
				}
				this.code = '';
				this.password = '';
				this.passwordConfirm = '';
				this.invite_code = '';
			},
			loginfn() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			changeCountry(item) {
				this.mobile = '';
				this.country_code = item.code
				this.isShowMsg = item.is_sms;
				this.show = false
			},
			async getCountryListfn() {
				let res = await getCountryList()
				if (res.code == 1) {
					this.CountryList = res.data;
					this.isShowMsg = res.data[0].is_sms;
					this.country_code = res.data[0].code
				}

			},


			registerFun() {
				uni.showLoading();
				let {
					isAgreement,
					mobile,
					password,
					code,
					passwordConfirm,
					country_code,
					email,
					invite_code
				} = this;

				if (this.type == 1) {
					if (!mobile) {
						toast({
							title: this.$t('register.rg21')
						});
						return;
					}
					if (this.isShowMsg == 1 && mobile && !code) {
						toast({
							title: this.$t('register.rg22')
						});
						return;
					}
				} else {
					let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
					if (!reg.test(email) && !email) {
						toast({
							title: this.$t('register.rg23')
						})
						return
					}
					if (email && !code) {
						toast({
							title: this.$t('register.rg24')
						});
						return;
					}
				}
				if (!password) {
					toast({
						title: this.$t('register.rg25')
					});
					return;
				}
				if (password != passwordConfirm) {
					toast({
						title: this.$t('register.rg26')
					});
					return;
				}
				if (!invite_code) {
					toast({
						title: this.$t('register.rg27')
					});
					return;
				}
				if (!isAgreement)
					// return toast({
					//   title: '请先勾选"已阅读并同意《服务协议》和《隐私协议》"',
					// });

					return (this.showModel = true);
				let data = {
					mobile: mobile,
					password: password,
					code: code,
					// client: 2,
					country_code: country_code,
					invite_code: invite_code
				};
				let emailData = {
					email: email,
					password: password,
					code: code,
					invite_code: invite_code
					// client: 2,
					// 	country_code: country_code,
				}
				if (this.type == 1) {
					register(data).then((res) => {
						if (res.code == 1) {
							this.loginHandle(res.data.user)
							toast({
								title: res.msg
							});
							// this.login(data)
							//  跳转到登录页


						}
						uni.hideLoading();
					}).catch(() => {
						uni.hideLoading();
					});
				} else {

					emailRegister(emailData).then((res) => {
						if (res.code == 1) {

							this.loginHandle(res.data.user)
							toast({
								title: res.msg
							});
							// this.login(data)
							//  跳转到登录页


						}
						uni.hideLoading();
					}).catch((err) => {
						uni.hideLoading();
					});
				}



			},
			async loginHandle(data) {
				this.login(data)
				this.$Router.pushTab('/pages/index/index')
				return
				uni.hideLoading()

				// 绑定邀请码
				const inviteCode = Cache.get(INVITE_CODE)
				if (inviteCode) {
					bindSuperior({
						code: inviteCode
					})
					Cache.remove(INVITE_CODE)
				}

				if (getCurrentPages().length > 1) {
					console.log(222)

					uni.navigateBack({
						success() {
							const {
								onLoad,
								options
							} = currentPage()
							onLoad && onLoad(options)
						}
					})
				} else if (Cache.get(BACK_URL)) {
					console.log(111)
					this.$Router.replace(Cache.get(BACK_URL))
				} else {
					this.$Router.pushTab('/pages/index/index')
				}
				Cache.remove(BACK_URL)
			},
			countDownFinish() {
				this.canSendSms = true;
			},
			oaAutoLogin() {
				// H5微信登录
				const {
					code
				} = this.$Route.query
				this.isWeixin = isWeixinClient()
				if (this.isLogin) {
					// 已经登录 => 首页
					uni.switchTab({
						url: '/pages/index/index'
					})
					return
				}
				if (code) {
					// 带有code => 登录
					return this.oaLogin(code)
				}
				// if (this.isWeixin && this.isOaWxAutoLogin) {
				//     // 开启自动授权登录
				//     this.getCodeUrl()
				// }
			},

			sendSmsFun2() {
				if (!this.$refs.uCode.canGetCode) return;
				if (!this.email) {
					toast({
						title: this.$t("register.rg28")
					});
					return;
				}
				emailSendSms({
					email: this.email,
					// key: SMSType.REGISTER,
				}).then((res) => {
					if (res.code == 1) {
						toast({
							title: res.msg
						});
						this.$refs.uCode.start();
					}
				});
			},
			sendSmsFun() {
				if (!this.$refs.uCode.canGetCode) return;
				if (!this.mobile) {
					toast({
						title: this.$t("register.rg29")
					});
					return;
				}
				sendSms({
					mobile: this.mobile,
					// key: SMSType.REGISTER,
					country_code: this.country_code
				}).then((res) => {
					if (res.code == 1) {
						toast({
							title: res.msg
						});
						this.$refs.uCode.start();
					}
				});
			},
		},
		computed: {
			...mapGetters(["appConfig"]),
			disable() {
				if (
					this.mobile.length == 11 &&
					this.password &&
					this.passwordConfirm &&
					this.code &&
					this.appConfig.register_setting
				) {
					return false;
				} else if (
					this.mobile.length == 11 &&
					this.password &&
					this.passwordConfirm &&
					!this.appConfig.register_setting
				) {
					return false;
				} else {
					return true;
				}
			},
		},
	};
</script>

<style lang="scss">
	.input_box {
		background: #EDF0F1;

		border-radius: 32rpx;
		box-sizing: border-box;
		padding: 16rpx 0rpx;
		margin-bottom: 48rpx;
	}

	.changeTy {
		background: url('../../static/images/resr.png') no-repeat;
		background-size: 82rpx 24rpx;
		color: #003D85 !important;
		background-position: 112rpx 48rpx;
	}

	.main {
		background: url('../../static/images/loginbk.png') no-repeat;
		background-size: 100% 100%;
		height: 100vh;
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

	.country_code {
		box-sizing: border-box;
		padding: 30rpx 20rpx;
		display: flex;
		border-bottom: 1px solid #E5E5E5;
		margin-top: 15rpx;
	}

	page {
		height: 100vh;
		// background-image: url(../../static/images/login_bg.png);
	}

	.register {
		padding: 80rpx 40rpx 0;

		.input-container {

			background: #FFFFFF;
			box-shadow: 0px 4rpx 14rpx 0px rgba(0, 0, 0, 0.08);
			border-radius: 32rpx;
			box-sizing: border-box;
			padding: 56rpx 40rpx 64rpx 40rpx;

			.input-item {
				height: 100%;
				padding: 0 20rpx;
				height: 88rpx;
				margin-bottom: 30rpx;
				border-radius: 10rpx;



				.input-label {
					width: 180rpx;
					flex: none;
				}

				.bd-primary {
					height: 56rpx;
					width: 196rpx;
					flex: none;
					border: 1px solid $-color-primary;

					.seconds {
						color: $-color-primary;
					}
				}
			}
		}

		.btn {
			width: 100%;
			height: 100rpx;
			background-color: $-color-primary;
			margin: 50rpx auto 0rpx;
			border-radius: 10rpx;
		}

		.text {
			font-weight: 500;
			font-size: 28px;
			text-align: left;
		}

		.comfirm-box {
			text-align: center;
			padding: 60rpx 0 70rpx 0;
		}

		.agreement {
			color: $-color-primary;
		}

		.disable {
			opacity: 0.5;
		}
	}
</style>