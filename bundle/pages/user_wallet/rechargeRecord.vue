<template>
	<view>
		<view>
			<z-paging ref="paging" v-model="recordsList" @query="getData" :refresher-enabled="false"
				:to-bottom-loading-more-enabled="true" :auto-full-height="true" :auto-show-back-to-top="true"
				:empty-view-text="$t('tk_re.r_r1')" :loading-more-no-more-text="$t('tk_re.r_r1')"
				:empty-view-reload-text="$t('tk_re.r_r2')" :loading-more-loading-text="$t('tk_re.r_r4')"
				:loading-more-fail-text="$t('tk_re.r_r3')" :loading-more-default-text="$t('tk_re.r_r2')"
				style="margin: 200rpx auto 0;width: 100%;padding: 0 32rpx;  ">
				<view class="listItem" v-for="(item, index) in recordsList" :key="index">
					<view class="vvItem">
						<view class="f26">{{ $t('tk_wr.r_r6') }}</view>
						<view class="" v-if="item.amount"> {{currency}}{{ item.amount }}</view>
					</view>
					<view class="vvItem">
						<view class="f26">{{ $t('tk_wr.r_r19') }}</view>
						<view class="">{{currency}}{{ item.arrive_amount }}</view>
					</view>
					<view class="vvItem">
						<view class="f26">{{ $t('tk_re.r_a3') }}</view>
						<view class="">
							{{ item.order_no }}
						</view>
					</view>
					<view class="vvItem">
						<view class="f26">{{ $t('tk_re.r_a4') }}</view>
						<view class="">{{ item.createTime }}</view>
					</view>

					<view class="vvItem">
						<view class="f26">{{ $t('tk_al.a_d2') }}</view>
						<view class="">
							<text v-if="item.status == 0" class="cancle">{{ $t('tk_re.r_a5') }}</text>
							<text v-if="item.status == 1" class="pass">{{ $t('tk_re.r_a6') }}</text>
							<text v-if="item.status == 2" class="error">{{ $t('tk_re.r_a7') }}</text>
							<text v-if="item.status == 3" class="cancle">{{ $t('tk_re.r_a8') }}</text>
							<text v-if="item.status == 4" class="error">{{ $t('tk_re.r_a9') }}</text>
						</view>
					</view>
					<view class="vvItem">
						<view class="f26">{{ $t('tk_re.r_w14') }}</view>
						<view class="">
							<text class="pass">{{ item.type_txt }}</text>
						</view>
					</view>
				</view>
			</z-paging>
		</view>
	</view>
</template>

<script>
	import request from '@/utils/request'
	export default {
		data() {
			return {
				recordsList: [],
				paging: null,
				pages: {
					type: 'recharge',
					page: 1,
					limit: 10
				},
				currency: ''
			}
		},
		props: ['changeIndex'],
		watch: {
			changeIndex: function(newValue, oldValue) {
				if (newValue == 1) {
					this.pages.page = 1;
					this.getData();
				} else {
					this.$refs.paging.clean() //清空数组
				}
			}
		},
		mounted() {
			this.currency = uni.getStorageSync('currency');
		},
		methods: {
			getData() {
				uni.showLoading()
				request({
					url: 'shop/getRAWLog',
					method: "POST",
					data: this.pages
				}).then(res => {
					if (res.data.lists) {
						this.$refs.paging.complete(res.data.lists);
						this.pages.page += 1
					}
					uni.hideLoading()
				}).catch((err) => {
					uni.hideLoading()
				})
			}
		}

	}
</script>


<style scoped>
	.bten {
		position: absolute;
		top: 32rpx;
		left: 50%;
		z-index: 9990;
		margin-left: -165px;
	}

	.box {
		margin-top: 20rpx;
		width: 330px;
		padding: 14px 26px 14px 13px;
		border-radius: 8px;
		box-sizing: border-box;
		border: 1px solid #ebeef5;
		background-color: #fff;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
		transition: opacity .3s, transform .3s, left .3s, right .3s, top .4s, bottom .3s;
		overflow: hidden;
	}

	.nav {
		width: 100%;
		height: 88rpx;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 0rpx 32rpx;
	}

	.text {
		font-size: 36rpx;
		color: #171418;

	}

	.listItem {
		background: #FFFFFF;
		box-shadow: 0px 1px 8px 0px rgba(76, 3, 3, 0.08);
		border-radius: 10px 10px 10px 10px;
		color: #000;
		border-radius: 20rpx;
		padding: 32rpx;
		font-size: 28rpx;
		width: 100%;
	}

	.listItem:not(:first-child) {
		background: #FFFFFF;
		box-shadow: 0px 1px 8px 0px rgba(76, 3, 3, 0.08);
		border-radius: 10px 10px 10px 10px;
		color: #000;
		border-radius: 20rpx;
		padding: 32rpx;
		margin-top: 30rpx;
		font-size: 28rpx;
		width: 100%;
	}

	.vvItem {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.vvItem:not(:first-child) {
		margin-top: 29rpx;
	}

	.pass {
		color: #5db760;
	}

	.error {
		color: #f5564b;
	}

	.cancle {
		color: #AFAFAF;
	}

	::v-deep .z-paging-content-fixed,
	.zp-loading-fixed {
		top: 20px !important;
	}
</style>