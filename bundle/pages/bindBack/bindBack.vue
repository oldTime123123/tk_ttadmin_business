<template>
	<view class="">
		<view class="between navStyle" style="height: 88rpx; padding: 0 31rpx;" @click="back">
			<view style="width: 48rpx;height: 48rpx;">
				<image src="/static/themeNum1/icon/back.png" style="width: 100%;height: 100%;"></image>
				<!-- <IconFont name="rect-right" color="#fff"></IconFont> -->
			</view>
			<view class="f36  text_white textHiddenOne center" style="font-weight: 600;width: 70%;height: 100%; ">
				{{ $t('bus_wallet.bw39') }}
			</view>
			<view style="width: 32rpx;height: 34rpx;margin-right: 32rpx;">

			</view>
		</view>

		<view class="pdlr32">

			<view class="form_all">
				<view class="f_row">
					<view class="f32 title mt40">{{ $t('bus_wallet.bw16') }}</view>
					<view class="mt24">
						<view class="between input pdlr36">
							<view class="inp between" style="width:100%">
								<input :placeholder="$t('bus_wallet.bw34')" style="color:#333"
									v-model="dataForm.bank_name">
							</view>
						</view>
					</view>
				</view>
				<view class="f_row">
					<view class="f32 title mt40">{{ $t('bus_wallet.bw35') }}</view>
					<view class="mt24">
						<view class="between input pdlr36">
							<view class="inp between" style="width:100%">
								<input :placeholder="$t('bus_wallet.bw36')" style="color:#333"
									v-model="dataForm.bank_num">
							</view>
						</view>
					</view>
				</view>
				<view class="f_row">
					<view class="f32 title mt40">{{ $t('bus_wallet.bw37') }}</view>
					<view class="mt24">
						<view class="between input pdlr36">
							<view class="inp between" style="width:100%">
								<input :placeholder="$t('bus_wallet.bw38')" style="color:#333"
									v-model="dataForm.account_holder">
							</view>
						</view>
					</view>
				</view>
				<!-- <view class="f_row">
					<view class="f32 title mt40">Phone number</view>
					<view class="mt24">
						<view class="between input pdlr36">
							<view class="inp between" style="width:100%">
								<input :placeholder="'Please enter phone number'" style="color:#333"
									v-model="dataForm.phone">
							</view>
						</view>
					</view>
				</view> -->
				<view class="save_btn center bold mt60 f32" @click="save">
					{{ $t('bus_zc.zc_a17') }}
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import {toast} from '@/utils/tools'
	import request from '@/utils/request'
	import {
		setBankcard
	} from '@/api/app.js';

	import {
		Toast
	} from '@nutui/nutui';
	export default {
		data() {
			return {
				dataForm: {
					bank_name: '',
					account_holder: "",
					bank_num: ""
				}
			}
		},
		methods: {
			back() {
				history.back()
			},
			getData() {
				uni.showLoading()
				request({
					url: 'shop/bankcard',
					methods: 'get',

				}).then((res) => {
					toast({title: res.msg});
					if(res.code==1&&res.data){
						this.dataForm.bank_name = res.data.bank.bank_name
						this.dataForm.account_holder = res.data.bank.account_holder
						this.dataForm.bank_num = res.data.bank.bank_num
					}
					uni.hideLoading()
					
				});
			},
			async save() {
				const data = await setBankcard({
					...this.dataForm
				})
				history.back()
			}
		},
		onShow() {
			this.getData()
		}
	}
</script>

<style lang="scss" scoped>
	.save_btn {
		height: 110rpx;
		border-radius: 16rpx;
		background-color: #3FAFF9;
		color: #ffffff;
	}

	.input {
		height: 104rpx;
		border-radius: 20rpx;
		border: 2rpx solid #B0B0B0;
	}
</style>