<template>
	<view class="pdlr32 mystyle" style="background: #fff;padding: 12px 15px;height: 100vh;">
		<view class="nav flex" @click="back">
			<view class="">
				<image style="width: 44rpx;height: 44rpx;" src="../../../static/images/Frame.png" mode=""></image>
			</view>
			<view class="text">
				{{ $t('tk_zc.l_l60') }}
			</view>
			<view class="">

			</view>
		</view>

		<view class="" style="flex: 1;margin-top: 40px;overflow-y: hidden;">
			<nut-tab @tab-switch="tabSwitch" :def-index="0" :is-show-line="false">
				<nut-tab-panel :tab-title="$t('tk_wa.wa_a7')">
					<WithdrawRecord :changeIndex="changeIndex"></WithdrawRecord>
				</nut-tab-panel>
				<nut-tab-panel :tab-title="$t('me_nu.t_5')">
					<RechargeRecord :changeIndex="changeIndex"></RechargeRecord>
				</nut-tab-panel>
			</nut-tab>
		</view>
	</view>
</template>

<script>
	import RechargeRecord from './rechargeRecord.vue'
	import WithdrawRecord from './withdrawRecord.vue'
	export default {
		data() {
			return {
				changeIndex: 0
			}
		},
		components: {
			RechargeRecord,
			WithdrawRecord
		},
		methods: {
			back() {
				history.back()
			},
			tabSwitch(index, event) {
				this.changeIndex = index;
			},
		}

	}
</script>

<style scoped>
	.mystyle {
		display: flex;
		flex-direction: column;
	}

	.nav {
		width: 100%;
		height: 88rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 0rpx 32rpx;
		background-color: #fff;
		position: fixed;
		top: 0;
	}

	.nav .text {
		font-size: 36rpx;
		color: #000;
	}

	.nav {
		background-color: #fff !important;
	}

	.head {
		width: 100%;
		height: 90rpx;
		padding: 8rpx;
		border-radius: 42px;
		background: #EDEDED;
		display: flex;
		align-items: center;
	}

	.service {
		width: 50%;
		height: 66rpx;
		border-radius: 34rpx;
		color: #959595;
	}

	.active {
		background-color: #40affa;
		color: #ffffff
	}

	page {
		font-family: PingFangSC;
	}

	::v-deep .nut-tab-active a {
		color: #fff;
		background: #40affa;
		border-radius: 20px;
	}

	::v-deep .nut-tab-link {
		font-size: 32rpx;
	}

	::v-deep .nut-tab {
		background: #fff;
		border: none;
	}

	::v-deep .nut-tab-title {
		height: 40px;

	}

	::v-deep .nut-tab-item {
		height: 100%;
	}
</style>