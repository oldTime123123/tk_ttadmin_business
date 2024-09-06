<template>
	<view class="m-t-20">
		<view class="nav flex">
			<view @click="back">
				<image style="width: 44rpx;height: 44rpx;" src="../../static/images/Frame.png" mode=""></image>
			</view>
			<!-- <view class="text">{{ $t('bus_my.y11') }}</view> -->
			<view></view>
		</view>
		<template v-if="type == 1">
			<view class="input-item flex u-skeleton-circle input_box mt20">
				<!-- <view>{{ $t('bus_shopSetting.ss8') }}</view>
				<view class="flex row-right">
					<input type="text" :placeholder="$t('bus_shopSetting.ss25')" v-model="nickname" />
				</view> -->
				<u-field label-width="0" clear-size="38" icon="account" v-model="nickname"
						:placeholder="$t('bus_shopSetting.ss25')" placeholder-style="color: rgb(192, 196, 204);"
						:input-border="false" />
			</view>
		</template>
		<template v-if="type == 66">
			<view class="input-item flex u-skeleton-circle input_box mt20">
				<!-- <view>{{ $t('settled.set_43') }}</view>
				<view class="flex row-right">
					<input type="text" :placeholder="$t('settled.set_53')" v-model="account" />
				</view> -->
				<u-field label-width="0" clear-size="38" icon="account" v-model="account"
						:placeholder="$t('settled.set_53')" placeholder-style="color: rgb(192, 196, 204);"
						:input-border="false" />
			</view>
		</template>
		<template v-if="type == 99">
			<view class="input-item flex u-skeleton-circle input_box mt20">
				<image src="../../../static/images/em.png" style="width: 40rpx;height: 40rpx;margin-right: 20rpx" mode="">
				</image>
				<u-input v-model="email" class="input" :placeholder="this.$t('register.rg7')" />

			</view>

			<view class="input-item flex u-skeleton-circle input_box">
				<image src="../../../static/images/yan.png" style="width: 40rpx;height: 40rpx;margin-right: 20rpx;"
					mode=""></image>

				<u-input v-model="code" style="width: 300rpx" :placeholder="this.$t('register.rg24')"
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
		</template>

		<template v-if="type == 2">
			<view class="input-item flex u-skeleton-circle input_box mt20">
				<!-- <view>{{ $t('bus_shopSetting.ss9') }}</view> -->
				<view style="display: flex;align-items: center;">
					<view @click="show = true" style="margin:0 20rpx;">
						{{country_code}}
						<u-icon @click="show = true" style="margin-left: 10rpx;" name="arrow-down"></u-icon>
					</view>
					<input style="width: 220rpx;text-align: left;" type="text" :placeholder="$t('bus_shopSetting.ss26')"
						v-model="mobile" />
				</view>
			</view>
			<view v-if="isShowMsg==1" class="input-item flex u-skeleton-circle input_box">
				<image src="../../../static/images/yan.png" style="width: 40rpx;height: 40rpx;margin-right: 20rpx" mode="">
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
			
		</template>

		<template v-if="type == 3">
			<view class="item bb mt20" style="align-items:flex-start">
				<view style="margin-top: 10rpx;">{{ $t('bus_shopSetting.ss10') }}</view>
				<view class="m-t-4">
					<textarea style="width: 500rpx;" v-model="intro" :placeholder="$t('bus_shopSetting.ss27')" />
				</view>
			</view>
		</template>

		<view class="br60 btn flex row-center white md" @click="onSubmit(type)">
			{{ $t('tk_in.i_s1') }}
		</view>
		<u-popup v-model="show" width="250">
			<image :src="appConfig.shop_login_logo" style="width: 90%;height: 60rpx;margin-top: 40rpx;margin-left: 5%;"
				mode=""></image>
			<view class="country_code" v-for="item of CountryList" @click="changeCountry(item)">
				<text style="margin-right: 10rpx;">{{item.code}}</text>
				<text>{{item.countryName}}</text>
			</view>
		</u-popup>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		emailSendSms,
		sendSms,
	} from "@/api/app.js";
	import {
		getCountryList
	} from '@/api/user'
	import {
		apiSetShopInfo
	} from '@/api/store'
	import {
		toast
	} from '@/utils/tools'
	export default {
		data() {
			return {
				type: 1, //1=联系人 2=联系电话 3=简介

				nickname: '',
				mobile: '',
				intro: '',
				account: "",
				email: '',
				isShowMsg: 0,
				country_code: '',
				code: '',
				CountryList: [],
				show: false,
				codeTips: "",

			}
		},

		onShow() {
			console.log(this.shopInfo.data, 'ssss')
			try {
				const type = this.$Route.query.type;
				if (type) {
					
					this.type = type;
					this.nickname = this.shopInfo.data.nickname;
					this.mobile = this.shopInfo.data.mobile;
					this.intro = this.shopInfo.data.intro;
					this.account = this.shopInfo.data.account;
					this.isShowMsg = this.shopInfo.data.is_sms;
					this.country_code = this.shopInfo.data.country_code;
					this.email = this.shopInfo.data.email;
					if(type ==2 ){
						this.getCountryListfn();
					}
				}

			} catch (e) {
				//TODO handle the exception
			}
		},

		methods: {
			codeChange(tip) {
				this.codeTips = tip;
			},
			async getCountryListfn() {
				let res = await getCountryList();
				if(res.code == 1){
					this.CountryList = res.data;
				}

			},
			changeCountry(item) {
				this.mobile = '';
				this.country_code = item.code;
				this.isShowMsg = item.is_sms;
				this.show = false
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
					country_code: this.country_code,
					type: 2,
				}).then((res) => {
					if (res.code == 1) {
						this.$refs.uCode.start();
					}else{
						toast({title: res.msg});
					}
				});
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
					type: 2,
					// key: SMSType.REGISTER,
				}).then((res) => {
					if (res.code == 1) {
						this.$refs.uCode.start();
					}else{
						toast({title: res.msg});
					}
				});
			},
			async onSubmit(type) {
				if (type == 1) {
					const res = await apiSetShopInfo({
						nickname: this.nickname
					})
					this.getResult(res);
				} else if (type == 2) {
					const res = await apiSetShopInfo({
						mobile: this.mobile,
						code: this.code,
						country_code: this.country_code
					})
					this.getResult(res);
				} else if (type == 3) {
					const res = await apiSetShopInfo({
						intro: this.intro
					})
					this.getResult(res);
				} else if (type == 66) {
					const res = await apiSetShopInfo({
						account: this.account
					})
					this.getResult(res);
				} else if (type == 99) {
					const res = await apiSetShopInfo({
						email: this.email,
						code: this.code
					})
					this.getResult(res);
				}
				
			},
			getResult(res){
				if(res.code==1){
					setTimeout(() => {
						this.$Router.back()
					}, 1000)
				}else{
					toast({title: res.msg});
				}
			},
			back() {
				uni.navigateTo({
					url: '/bundle/pages/shop_setting/shop_setting'
				})
			}
		}
	}
</script>

<style lang="scss">
	.nav {
		width: 100%;
		height: 88rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 32rpx 32rpx 0 32rpx;
		background-color: #fff;
	}

	.nav .text {
		font-size: 36rpx;
		color: #000;
	}
	.input_box {
		background: #EDF0F1;
		border-radius: 15rpx;
		box-sizing: border-box;
		padding: 8rpx 0rpx;
		margin-bottom: 48rpx;
	}
	.item {
		padding: 30rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		background-color: $-color-white;
		justify-content: space-between;
		border-radius: 10rpx;
		margin: 0 15px;
		text-align: left;

		>view:first-child {
			width: 197rpx;
			color: $-color-black;
			font-size: $-font-size-nr;
			font-weight: 500;
		}

		>view:last-child {
			// flex: 1;
			// text-align: right;

			textarea {
				width: 560rpx;
				height: 300rpx;
			}
		}
	}

	.btn {
		width: 690rpx;
		height: 88rpx;
		margin: 0 auto;
		margin-top: 40rpx;
		background-color: $-color-primary;
	}

	::v-deep uni-input {
		width: 100%;
	}
	.mb20 {
		margin-bottom: 20rpx;
	}
	.btns {
		box-sizing: border-box;
		padding: 15rpx 20rpx;
		border: 1px solid #d7d7d7;
		border-radius: 15rpx;
		margin-right: 15rpx;
		width: 320rpx;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;

	}
	.tans{
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
	::v-deep input .u-input__input{
		color: #303133 !important;
	}
	.input-item {
		height: 100%;
		margin: 0 20rpx;
		height: 88rpx;
		margin-bottom: 30rpx;
		// border: 1px solid #d7d7d7;
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
	.primary {
		border-color: $-color-primary;
		color: $-color-primary;
	}
	.xs {
		font-size: $-font-size-xs;
	}
	.input-item {
		background: #fff;
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
	.mt20{
		margin-top: 20rpx;
	}
	.uni-input-placeholder{
		font-size: 12px;
	}
</style>