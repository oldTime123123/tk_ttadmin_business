<template>
	<view class="" style="background-color: #EDEFF2;min-height: 100vh;">
		<view class="between navStyle" style="height: 88rpx; padding: 0 31rpx;" @click="back">
			<view style="width: 48rpx;height: 48rpx;">
				<image src="../../static/themeNum1/icon/back.png" style="width: 100%;height: 100%;"></image>

				<!-- 				<IconFont v-else name="rect-right" color="#fff" @click="back"></IconFont> -->
			</view>
			<view class="f36  text_white textHiddenOne center" style="font-weight: 600;width: 70%;height: 100%; ">
				{{ $t('bus_wallet.bw30') }}
			</view>
			<view class="">

			</view>

		</view>

		<view class="pdlr36">
			<view class="list-item between" style="background-color: #e5eef3;" v-for="(item,index) in tableList"
				:key="index">
				<view class="left flex">
					<view>
					</view>
					<view class="flex-col ml16 line-1">
						<view class="top" style="color: #737373;">{{ item.channels.name}}
							{{'('+item.channels.pact+')'}}
						</view>

						<view style="color: #B1B1B1;" class="mt8 f24 line-1">{{item.address}} </view>

					</view>
				</view>
			</view>
			<view class="btn" @click="add">
				{{ $t('bus_wallet.bw31') }}
			</view>
			<view class="" style="height: 100rpx;">

			</view>
		</view>
	</view>




</template>

<script>
	import request from '@/utils/request'

	export default {
		data() {
			return {
				tableList: []
			}
		},
		methods: {
			add() {
				uni.navigateTo({
					url: '/pages/addBindUsdt/addBindUsdt'
				})
			},
			back() {
				history.back()
			},
			goAddFun() {

			},
			getWalletList() {
				uni.showLoading()
				request({
					url: 'shop/wallet',
					methods: 'get',
				}).then((res) => {
					this.tableList = res.data.lists || [];
					uni.hideLoading()
				});
			}
		},
		onShow() {
			this.getWalletList()
		}
	}
</script>

<style lang="scss" scoped>
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

	.pdlr36 {
		box-sizing: border-box;
		padding: 0rpx 36rpx;
	}

	.btn {
		width: 100%;
		height: 120rpx;
		line-height: 120rpx;
		// padding: 0 9.33333vw;
		text-align: center;
		background: #3FAFF9;
		color: #fff;
		border-radius: 16rpx;
		margin: 8vw auto;
		font-size: 40rpx;
		font-weight: 186.66667vw;
	}

	.list-item {
		width: 100%;
		height: 144rpx;
		border-radius: 24rpx;
		border: 2rpx solid #D6D6D6;
		margin-top: 30rpx;
		background-color: #ffff;

		.left {
			width: 80%;

			.flex-col {
				.top {
					color: #000000
				}
			}

		}
	}
</style>