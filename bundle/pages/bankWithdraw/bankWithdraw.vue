<template>
	<view>
		<view class="between navStyle" style="height: 88rpx; padding: 0 31rpx;" @click="back">
			<view style="width: 48rpx;height: 48rpx;">
				<image src="../../../static/themeNum1/icon/back.png" style="width: 100%;height: 100%;"></image>
				<!-- 				<IconFont name="rect-right" color="#fff"></IconFont> -->
			</view>
			<view class="f36  text_white textHiddenOne center" style="font-weight: 600;width: 70%;height: 100%; ">
				{{ $t('tk_wa.wa_a7') }}
			</view>
			<view style="width: 32rpx;height: 34rpx;margin-right: 32rpx;">

			</view>
		</view>


		<view class="pdlr50 pt33 pb50 ">


			<!-- 	<view class="flex between">
				<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="f50 mt60 text_bold" :style="{color:store.$state.thirdColor}">{{t('wr.w_a1')}}</view> -->
			<view class="mt55">
				<view class="topBox center flex-col">
					<view class="topItem f26">{{ $t('tk_wr.w_a2') }}</view>

					<view class="mt35 f55"> {{userInfo.balance}} {{currency}}</view>


				</view>


				<view class="mt40 inputItem">
					<view class="f40 text_bold">
						{{currency}}
					</view>
					<view class="pl15">
						<input type="text" :focus="true" :placeholder="$t('tk_wa.wa_a44')" placeholder-class="f30 plo"
							v-model="inputNum">
					</view>
				</view>
				<view class="f20 mt30 text_center" v-if="min">
					<!-- 					* {{ $t('bus_wallet.bw25') }} : {{min+currency}} - {{max+currency}} -->
				</view>

				<view class="mt38 info">
					<view class="between" v-if="!pageData.bank.bank_num" @click="changePage('../setting/set1')">
						<view style="width: 80%;">
							{{ $t('tk_wa.wa_a43') }}
						</view>
						<image src="../../../static/images/left.png" mode="widthFix"
							style="width: 23rpx;height: 39rpx;">
						</image>
					</view>
					<view v-else>
						<view>
							{{ $t('tk_wa.wa_a43') }}
						</view>
						<view class="mt20 f26 flex col_center">{{ $t('tk_wa.wa_a45') }}: <text class="f34 pl15"
								v-if="pageData.bank.bank_name">{{pageData.bank.bank_name}}
							</text>
						</view>
						<view class="mt20 f26 flex col_center">{{ $t('tk_wa.wa_a46') }}: <text class="f34 pl15"
								v-if="pageData.bank.account_holder">{{pageData.bank.account_holder}} </text>
						</view>
						<view class="mt20 f26 flex col_center">{{ $t('tk_wa.wa_a47')}}: <text class="f34 pl15"
								v-if="pageData.bank.bank_num">{{pageData.bank.bank_num}}
							</text>
						</view>
						<!-- <view class="mt20 f26 flex col_center">Phone: <text class="f34 pl15">{{pageData.bankcard.phone}}
							</text> </view> -->
					</view>
				</view>
				<view class="mt38">
					<view class="f34  text_bold f30">{{ $t('tk_wa.wa_a48')}}</view>
					<view class="mt34  passwordInp" v-if="pageData.bank">
						<input class="inp " type="safe-password" password="true" v-model="fundPwd"
							:placeholder="$t('tk_wa.wa_a48')" v-if="showNewPwd1">
						<input class="inp " type="safe-password" v-model="fundPwd" :placeholder="$t('tk_wa.wa_a48')"
							v-else>
						<image v-if="showNewPwd1" src="../../static/images/eyeopen.png" class="pwdEye"
							style="width: 40rpx;height: 40rpx;" @click="openPwdHandle"></image>

						<image v-else src="../../static/images/eyeclose.png" class="pwdEye"
							style="width: 40rpx;height: 40rpx;" @click="openPwdHandle"></image>
					</view>

					<view class="mt34  passwordInp otpEl" v-else>

						<input class="inp " placeholder-class="plo" type="safe-password" password="true"
							:disabled="true" :placeholder="$t('tk_wa.wa_a48')" v-if="showNewPwd1">
						<view class="otp" @click="changePage()">
							<!-- 							{{t('mine.m_m14')}} -->
						</view>
					</view>
				</view>


				<view class="btns" :style="choStyle" @click="submitHandle">
					{{ $t('bus_wallet.bw27') }}
				</view>


			</view>
			<view class="mt70" v-html="pageData.description" style="color: #000;"></view>
		</view>
	</view>
</template>

<script>
	import request from '@/utils/request'

	export default {
		data() {
			return {
				pageData: {},
				currency: "USDT",
				inputNum: "",
				showPwd: false,
				showNewPwd1: true,
				fundPwd: '',
				choStyle: {
					// background: store.$state.contentColor,
					color: '#fff'
				},
				userInfo: "",
				min: '',
				max: ''
			}
		},
		methods: {
			submitHandle() {
				if (!this.inputNum) {
					this.$toast({
						title: this.$t('tk_wa.wa_a44')
					})
					return
				}
				if (!this.fundPwd) {
					this.$toast({
						title: this.$t('tk_wa.wa_a48')
					})
					return
				}
				request({
					url: "shop/offlineWithdraw",
					method: 'POST',
					data: {
						amount: this.inputNum
					}
				}).then(res => {
					if(res.code==1){
						history.back()
					}else{
						this.$toast({title: res.msg})
					}
				}).catch(err => {
					this.$toast({
						title: err
					})
				})
			},
			back() {
				history.back()
			},
			changePage() {
				uni.navigateTo({
					url: '/bundle/pages/bindBack/bindBack'
				})
			},
			getData() {
				request({
					url: "shop/getwalletInfo",
					methods: 'get',
				}).then(res => {
					this.userInfo = res.data
				}).catch(err => {
					this.$toast({
						title: err
					})
				})

				request({
					url: 'shop/bankcard',
					methods: 'get',

				}).then((res) => {
					this.pageData = res.data

				});
			},
			openPwdHandle() {
				this.showNewPwd1 = !this.showNewPwd1
			},
			getWithRange() {
				request({
					url: "index/bankConfig",
					methods: 'get',
				}).then(res => {
					if (res.data&&res.data.config) {
						this.min = res.data.config.withdrawal_bank_min;
						this.max = res.data.config.withdrawal_bank_max;
					}

				}).catch(err => {
					uni.hideLoading()
					this.$toast({
						title: err
					})
				})
			}
		},
		onShow() {
			this.inputNum = undefined;
			this.fundPwd = undefined;
			this.getData();
			this.getWithRange();
		}
	}
</script>

<style lang="scss" scoped>
	.topBox {
		width: 100%;
		height: 328rpx;
		color: #fff;
		background: url('../../static/images/breBox.png') no-repeat;
		background-size: 100% 100%;
	}





	.inputItem {
		height: 115rpx;
		background: #F6F7FC;

		border-radius: 20rpx;
		display: flex;
		align-items: center;
		// justify-content: center;
		font-size: 50rpx;
		padding-left: 40rpx;
	}

	.info {
		background-color: #F6F7FC;
		border-radius: 15rpx;
		padding: 30rpx 28rpx;
	}

	.btns {
		margin-top: 100rpx;
		height: 120rpx;
		line-height: 120rpx;
		text-align: center;
		border-radius: 15rpx;
		background-color: #3FAFF9 !important;
	}



	.passwordInp {
		position: relative;

		.pwdEye {
			position: absolute;
			// left: 20rpx;
			right: 40rpx;
			top: 34%;
		}
	}

	// .mainBox {
	// 	display: grid;
	// 	grid-template-columns: repeat(3, 1fr);
	// 	// grid-template-rows: repeat(3, 1fr);
	// 	grid-column-gap: 0px;
	// 	grid-row-gap: 0px;

	// 	.chooseItem {
	// 		width: 90%;
	// 		background-color: #fff;
	// 		height: 100rpx;
	// 		border-radius: 20rpx;
	// 		margin-bottom: 20rpx;
	// 		text-align: center;
	// 		line-height: 100rpx;
	// 	}
	// }


	.otpEl {
		position: relative;

		.otp {
			position: absolute;
			// left: 20rpx;
			right: 40rpx;
			top: 50%;
			font-size: 20rpx;
			transform: translateY(-50%);
			// width: 60rpx;
			padding: 0 10rpx;
			height: 60rpx;
			background: #C0FF26;
			border-radius: 10rpx;
			color: #000;
			text-align: center;
			line-height: 60rpx;
		}
	}

	.inp {
		padding: 32rpx 36rpx;
		background: #fff;
		box-shadow: 0px 1rpx 51rpx 0px rgba(64, 46, 197, 0.05);
		border-radius: 20rpx;
		// color: #E81947;
		font-size: 28rpx;
		// border: 1px solid #00D2FF;
		box-shadow: 0px 1px 51px 0px rgba(64, 46, 197, 0.05);
		border: 2rpx solid #B0B0B0;

		input {
			width: 100%;
			line-height: 100%;
		}
	}
</style>