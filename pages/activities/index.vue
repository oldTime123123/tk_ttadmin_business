<template>
	<view class="">
		<view class="between navStyle" style="height: 88rpx; padding: 0 31rpx;background-color: #fff;" @click="back">
			<view style="width: 48rpx;height: 48rpx;">
				<image src="../../static/themeNum1/icon/back.png" style="width: 100%;height: 100%;"></image>
				<!-- 				<IconFont name="rect-right" color="#fff"></IconFont> -->
			</view>
			<view class="f36  text_white textHiddenOne center" style="font-weight: 600;width: 70%;height: 100%; ">
				{{this.$t('tabbar.tb_dk')}}
			</view>
			<view style="width: 32rpx;height: 34rpx;margin-right: 32rpx;">

			</view>
		</view>
		<view class="items mt48 " style="box-sizing: border-box;padding: 0rpx 32rpx;">
			<view class="item" v-for="(item,index) in vipList"
				:style="item.is_activity==1?'border: 1px solid #40affa;':''">
				<view class="">
					<image style="width: 56px;height: 56px;border-radius: 10rpx;" :src="item.image" mode=""></image>
				</view>
				<view class="" style="margin-left: 20rpx;">
					<view class="">
						{{item.name}}
					</view>
					<view class="">
						{{item.remark}}
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import request from '@/utils/request'

	export default {
		data() {
			return {
				vipList: []

			};
		},

		methods: {
			back() {
				history.back()
			},
			getData() {
				uni.showLoading()
				request({
					url: 'shop/vipList',
					methods: 'get',
				}).then((res) => {
					uni.hideLoading()
					console.log(res)
					this.vipList = res.data
				})
			}

		},

		onLoad() {
			this.getData()

		},
		onUnload() {

		},
	};
</script>
<style lang="scss">
	page {
		background-color: $-color-border;


	}

	.between {
		display: flex;
		justify-content: space-between !important;
		align-items: center !important;
	}

	.items {
		box-shadow: 0px 0px 2px 1px #ccc;

		.item {
			margin-bottom: 20rpx;
			display: flex;
			align-items: center;
			width: 100%;
			height: 176rpx;
			background-color: #ffffff;
			border-radius: 16rpx;
			box-sizing: border-box;
			padding: 20rpx;



		}
	}
</style>