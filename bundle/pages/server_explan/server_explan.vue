<template>
	<view class="p-24">
		<view class="nav flex">
			<view @click="back">
				<image style="width: 44rpx;height: 44rpx;" src="../../static/images/Frame.png" mode=""></image>
			</view>
			<!-- <view class="text">{{ $t('tk_zc.l_l71') }}</view> -->
			<view></view>
		</view>
		<u-parse class="mt20" :html="content" :selectable="true" :show-with-animation="true"></u-parse>
	</view>
</template>

<script>
	import {
		apiPolicyAgreement,
	} from "@/api/app"
	export default {
		data() {
			return {
				content: ''
			}
		},

		methods: {
			// 获取服务协议
			getPolicyAgreement() {
				apiPolicyAgreement({
					type: this.type
				}).then(res => {
					this.content = res.data[this.type];
				})
			},
			back(){
				uni.navigateBack()
				// uni.switchTab({
				// 	url: "/pages/login/login",
				// });
			}
		},

		onLoad() {
			this.type = this.$Route.query.type;
			this.getPolicyAgreement()
			this.type == 1 ? uni.setNavigationBarTitle({
				title: '服务协议'
			}) : uni.setNavigationBarTitle({
				title: '隐私政策'
			})

		}
	}
</script>

<style scoped>
	.nav {
		width: 100%;
		height: 88rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 32rpx 32rpx 32rpx 0;
		/* background-color: #fff; */
	}
	.nav .text {
		font-size: 36rpx;
		color: #000;
	}
	.mt20{
		margin-top: 20rpx;
	}
</style>
