<template>
	<view class="" style="background-color: #EDEFF2;height: 100vh;">
		<view class="between navStyle" style="height: 88rpx; padding: 0 31rpx;" @click="back">
			<view style="width: 48rpx;height: 48rpx;">
				<image src="../../static/themeNum1/icon/back.png" style="width: 100%;height: 100%;"></image>
				<!-- 				<IconFont name="rect-right" color="#fff"></IconFont> -->
			</view>
			<view class="f36  text_white textHiddenOne center" style="font-weight: 600;width: 70%;height: 100%; ">
				{{ $t('bus_wallet.bw32') }}
			</view>
			<view style="width: 32rpx;height: 34rpx;margin-right: 32rpx;">

			</view>
		</view>
		<view class="pdlr36 mt32">
			<view class="">{{ $t('bus_wallet.bw8') }}</view>
			<view class="list-item between mt20" style="background-color: #fff;">
				<SelectDown ref="select" :placeholder="$t('bus_wallet.bw8')" @propChange="propChange" :list="codeList">
				</SelectDown>
			</view>
			<view class="mt30">{{ $t('bus_wallet.bw9') }}</view>
			<view class="list-item between mt20">
				<SelectDown ref="select2" :placeholder="$t('bus_wallet.bw9')" @propChange="propChange2" :list="codeList2">
				</SelectDown>
			</view>

			<view class="mt30">{{ $t('tk_w.w3') }}</view>
			<view class="list-item between mt20">
				<input type="text" v-model="addressInput" class="inp" :placeholder="$t('bus_wallet.bw33')"
					style="margin-left: 0rpx;box-sizing: border-box;padding: 0rpx 30rpx;">
			</view>
			<!-- <view class="mt30">Remarks</view>
			<view class="list-item between mt20">
				<input type="text" v-model="tagInput" class="inp" placeholder="Remarks"
					style="margin-left: 0rpx;box-sizing: border-box;padding: 0rpx 30rpx;">
			</view> -->

			<view class="btn" @click="submit">{{ $t('bus_zc.zc_a17') }}</view>

		</view>

	</view>



</template>

<script>
	import SelectDown from '@/components/SelectDown.vue'
	import request from '@/utils/request'

	export default {
		components: {
			SelectDown
		},
		data() {
			return {
				codeList: [],
				codeList2: [],
				addressInput: '',
				tableList: [],
				selectList: '',
				codeList: [],
				type: ''
			}
		},

		methods: {
			back() {
				history.back()
			},
			submit() { //提交
				uni.showLoading()
				request({
					url: 'shop/setWallet',
					method: 'POST',
					data: {
						type: this.type,
						address: this.addressInput,
						tag: 'null'
					}
				}).then(res => {
					uni.hideLoading()
					history.back()
				}).catch(err => {
					uni.hideLoading()
					Toast.text(err.message)
				})
			},
			propChange(data) {
				this.$refs.select2.text = "";
				this.type = "";
				this.addressInput = '';
				this.codeList2 = this.selectList[data].map(m => m.name);
			},
			propChange2(data) {
				this.addressInput = ''
				this.type = this.selectList[this.$refs.select.text][this.$refs.select2.index].type
				console.log(`c222===`, data.type)
				this.tableList.forEach(item => {
					if (item.type == this.type) {
						this.addressInput = item.address
						this.tagInput = 'nul'
					}
				})
			},
			getWalletList() {
				uni.showLoading()
				request({
					url: 'shop/wallet',
					methods: 'get',
				}).then((res) => {
					uni.hideLoading()
					this.tableList = res.data.lists || [];
					if (res.data.select) {
						this.selectList = res.data.select
						for (const key in res.data.select) {
							this.codeList.push(key)
						}
					}
				})
			}
		},
		onLoad() {
			this.getWalletList()
		}
	}
</script>



<style lang="scss" scoped>
	.mt20 {
		margin-top: 20rpx;
	}

	.mt30 {
		margin-top: 30rpx;
	}

	.mt32 {
		margin-top: 32rpx;
	}

	.pdlr36 {
		box-sizing: border-box;
		padding: 0rpx 36rpx;
	}

	.center {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.between {
		display: flex;
		justify-content: space-between !important;
		align-items: center !important;
	}

	.btn {
		width: 100%;
		height: 120rpx;
		line-height: 120rpx;
		text-align: center;
		background: #3FAFF9;
		color: #fff;
		border-radius: 2.13333vw;
		margin: 8vw auto;
		font-size: 40rpx;
		font-weight: 186.66667vw;
	}

	.step-btn {
		height: 110rpx;
		color: #fff;
		border-radius: 10rpx;
		text-align: center;
		line-height: 110upx;
		margin-top: 100upx;
	}

	.list-item {
		height: 112rpx;
		// padding: 0 2.66667vw;
		display: flex;
		align-items: center;
		border-radius: 1.6vw;
		background-color: #fff;

		// border: 1px solid $data-bg19;
		// background: $data-bg-main;
		.left {
			width: 80%;

			.flex-col {
				.top {
					color: #6491e9
				}
			}

		}
	}
</style>