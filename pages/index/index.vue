<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-08-05 10:58:11
 * @LastEditors: chenpn chenpn699@gmail.com
 * @LastEditTime: 2024-09-05 16:56:27
 * @FilePath: \1\web_business\pages\index\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<mescroll-body ref="mescrollRef" :refresher-enabled="false" @down="downCallback" :down="downOption" @up="upCallback"
		:up="{ use: false }">
		<view class="index">
			<view class="index-wrap">
				<!-- Header -->
				<view class="index-header flex row-between">
					<view class="md" style="font-weight: 400;display: flex;align-items: center;justify-content: center;"
						v-if="pagesData">
						<image @click="pickShow" style="width: 20px;height: 20px;margin-right: 5px;"
							src="../../bundle/static/images/earth.png"></image>
						{{ pagesData.shop_name || '-' }}
					</view>
					<view class="xs">{{ time }}</view>
				</view>

				<!-- Section -->
				<view class="index-section">
					<!-- Section today Data -->
					<view class="today-data flex row-between">
						<view class="todayItem" v-for="(item, index) in totallData" :key="index">
							<view class="todayView">
								<view style="width: 30%;display: flex;justify-content: right;padding-right: 10px;">
									<image class="todayImg1" :src="item.img"></image>
								</view>
								<view class="item-data text-center" style="width: 70%;text-align: left;">
									<view class="num">{{currency}}{{ item.val }}</view>
									<view class="itenMame">{{ item.name }}</view>
								</view>
							</view>
						</view>
					</view>

					<view class="today-data1">
						<view class="todayNum">{{ $t('bus_hm.hm_a37') }}</view>
						<view class="flex todayAll">
							<view class="todayItem" style="background: #f6f6f6;" v-for="(item, index) in todayData"
								:key="index">
								<view class="todayView">
									<view class="item-data text-center"
										style="width: 50%;text-align: left;padding-left: 10px;">
										<view class="text1">{{ item.val }}</view>
										<view class="text2">{{ item.name }}</view>
									</view>
									<view style="width: 50%;display: flex;justify-content: right;padding-right: 10px;">
										<image class="todayImg" :src="item.img"></image>
									</view>
								</view>
							</view>
						</view>

					</view>

					<view class="today-data1 flex row-between p20">
						<view class="flex">
							<image class="todayImg1" src="../../static/images/storeAttention.png"></image>
							<text style="margin-left: 10px;">{{ $t('bus_hm.hm_a35') }}</text>
						</view>
						<view>
							{{ pagesData.shop_num }}
						</view>
					</view>

					<view class="today-data1 flex row-between p20">
						<view class="flex">
							<image class="todayImg1" src="../../static/images/storeOrder.png"></image>
							<text style="margin-left: 10px;">{{ $t('bus_hm.hm_a36') }}</text>
						</view>
						<view>
							{{ pagesData.shop_order_num }}
						</view>
					</view>
					<view class="today-data2">
						<view class="flex todayAll1">
							<view class="todayItem1" v-for="(item, index) in orderToday" :key="index">
								<view class="todayView">
									<view class="item-data text-center"
										style="width: 100%;height: 100%;background: url(../../static/images/backgroundList.png);"
										:style="{backgroundColor:index==0?'rgb(92, 157, 255)':index==1?'rgb(255, 128, 73)':index==2?'rgb(63, 188, 143)':index==3?'rgb(93, 106, 126)':'rgb(102, 94, 189)'}">
										<view class="text3">{{ item.name }}</view>
										<view class="text4">{{ item.val }}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view style="margin-top: 900px;">
					<u-subsection mode="button" :list="blist" :current="curNow" @change="subChange"></u-subsection>
				</view>
				<view class="e-content m-t-20" v-if="curNow==0">
					<charts ids="canvasColumn" width="100%" height="544rpx" :chartData="turnoverData"></charts>
				</view>
				<view class="e-content m-t-20" v-else-if="curNow==1">
					<charts ids="canvasColumn1" width="100%" height="544rpx" :chartData="orderNumData"></charts>
				</view>
				<view class="e-content m-t-20" v-else>
					<charts ids="canvasColumn2" width="100%" height="544rpx" :chartData="visitData"></charts>
				</view>
			</view>
		</view>
	</mescroll-body>
</template>
<script>
	import request from '@/utils/request'
	import {
		getLangVersion
	} from '@/api/user.js';
	import {
		apiIndex
	} from '@/api/store'
	import {
		apiVisit
	} from '@/api/app'
	// import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins";
	export default {
		// mixins: [MescrollMixin,],
		data() {
			return {
				pagesData: [],
				loading: true,
				myListIndex: 0,
				myListIndex1: 0,
				time: '',
				orderObj: [{
						name: this.$t('bus_hm.hm_a4'),
						val: '0.00'
					},
					{
						name: this.$t('bus_hm.hm_a5'),
						val: '0'
					},
				],
				numberList: [{
						name: this.$t('bus_hm.hm_a10'),
						val: '0.00'
					},
					{
						name: this.$t('bus_hm.hm_a11'),
						val: '0'
					},
					{
						name: this.$t('bus_hm.hm_a12'),
						val: '0'
					},
				],
				todayData: [{
						name: this.$t('bus_hm.hm_a31'),
						val: '0',
						img: '../../static/images/todayImg.png'
					},
					{
						name: this.$t('bus_hm.hm_a32'),
						val: '0',
						img: '../../static/images/todayConcern.png'
					},
					{
						name: this.$t('bus_hm.hm_a33'),
						val: '0',
						img: '../../static/images/todayOrder.png'
					},
					{
						name: this.$t('bus_hm.hm_a34'),
						val: '0',
						img: '../../static/images/toadyMoney.png'
					},
				],
				blist: [{
						name: this.$t('bus_hm.hm_a23')
					},
					{
						name: this.$t('bus_hm.hm_a25')
					},
					{
						name: this.$t('bus_hm.hm_a24')

					},
					// {
					//     name: this.$t('bus_hm.hm_a26')
					// }
				],
				curNow: 0,
				orderToday: [{
						name: this.$t('bus_ord.od_41'),
						val: 0
					},
					{
						name: this.$t('bus_ord.od_42'),
						val: 0
					},
					{
						name: this.$t('bus_ord.od_43'),
						val: 0
					},
					{
						name: this.$t('bus_ord.od_44'),
						val: 0
					},
					{
						name: this.$t('bus_ord.od_45'),
						val: 0
					}
				],
				totallData: [{
						name: this.$t('bus_hm.hm_a27'),
						val: '0',
						img: '../../static/images/moneys1.png'
					},
					{
						name: this.$t('bus_hm.hm_a28'),
						val: '0',
						img: '../../static/images/moneys2.png'
					},
					{
						name: this.$t('bus_hm.hm_a29'),
						val: '0',
						img: '../../static/images/moneys1.png'
					},
					{
						name: this.$t('bus_hm.hm_a30'),
						val: '0',
						img: '../../static/images/moneys2.png'
					}
				],
				turnoverData: {},

				visitData: {},

				orderNumData: {},
				firstPlayFlag: true, // 第一次播放标记
				currency: '',
				downOption: {
					use: false
				}
			}
		},
		methods: {
			async downCallback() {
				await this.getPageInfo()
				// this.mescroll.endSuccess(0, false)
			},
			/**
			 * 日期切换
			 * @param {Number} num
			 */
			cycle(num) {
				this.myListIndex = num
				// 刷新数据
				// methods.report()
			},
			cycle1(num) {
				this.myListIndex1 = num
				// 刷新数据
				// methods.report()
			},
			//图标tabs切换
			subChange(e) {
				this.curNow = e
			},
			/**
			 * 获取图表信息
			 */
			async getPageInfo() {
				uni.showLoading();
				const res = await apiIndex();
				this.$toast({title: res.msg});
				if(res.code==1){
					//头部总列表数据
					this.totallData[0].val = res.data.order_amount;
					this.totallData[1].val = res.data.shop_wallet;
					this.totallData[2].val = res.data.all_order_profit;
					this.totallData[3].val = res.data.pre_order_profit;
					//今日数据
					this.todayData[0].val = res.data.shop_user;
					this.todayData[1].val = res.data.day_follow;
					this.todayData[2].val = res.data.day_order_num;
					this.todayData[3].val = res.data.day_order_profit;
					//总订单数量
					this.orderToday[0].val = res.data.order_all_num;
					this.orderToday[1].val = res.data.order_doing_num;
					this.orderToday[2].val = res.data.order_finish_num;
					this.orderToday[3].val = res.data.order_cancel_num;
					this.orderToday[4].val = res.data.order_refund_num;
					const turnover = {
						categories: res.data.dates,
						series: [{
							"name": this.$t('bus_Statistics.sta6'),
							data: res.data.echarts_order_amount
						}]
					}
					const orderNum = {
						categories: res.data.dates,
						series: [{
							"name": this.$t('bus_Statistics.sta5'),
							data: res.data.echarts_order_count
						}]
					}
					const visit = {
						categories: res.data.dates,
						series: [{
							"name": this.$t('bus_Statistics.sta12'),
							data: res.data.echarts_user_visit
						}]
					}
					this.turnoverData = turnover
					this.visitData = visit
					this.orderNumData = orderNum
					this.pagesData = res.data;
				}
				uni.hideLoading()
			},
			showTime() {
				var d = new Date();
				var localTime = d.getTime();
				var localOffset = d.getTimezoneOffset() * 60000; //获得当地时间偏移的毫秒数,这里可能是负数
				var utc = localTime + localOffset; //utc即GMT时间
				var offset = -5; //时区，北京市+8  美国华盛顿为 -5
				var localSecondTime = utc + (3600000 * offset); //本地对应的毫秒数
				var d = new Date(localSecondTime)
				// var d = new Date();
				var year = d.getFullYear();
				var month = d.getMonth() + 1; //0~11
				var date = d.getDate();

				var hour = Number(d.getHours()) <= 9 ? '0' + Number(d.getHours()) : Number(d.getHours());
				var min = Number(d.getMinutes()) <= 9 ? '0' + Number(d.getMinutes()) : Number(d.getMinutes());
				var sec = Number(d.getSeconds()) <= 9 ? '0' + Number(d.getSeconds()) : Number(d.getSeconds());

				var str = year + '-' + month + '-' + date + "  " + hour + ":" + min + ":" + sec;
				this.time = str
			},
			pickShow() {
				uni.reLaunch({
					url: '/pages/locale/index?origin=home'
				})
			}
		},
		onShow() {
			// !uni.getStorageSync('currency')
			if (true) {
				request({
					url: 'index/symbol',
					methods: 'get',

				}).then(res => {
					this.$toast({title: res.msg});
					if(res.code==1){
						this.currency = res.data.currency;
						uni.setStorageSync('currency', res.data.currency)
					}
				})
			}
			this.downCallback();
			uni.setTabBarItem({
				index: 0,
				text: this.$t('tabbar.home')
			})
			uni.setTabBarItem({
				index: 1,
				text: this.$t('tabbar.manage')
			})
			uni.setTabBarItem({
				index: 2,
				text: this.$t('tabbar.order')
			})
			uni.setTabBarItem({
				index: 3,
				text: this.$t('tabbar.my')
			})
			setInterval(this.showTime, 1000)
		}
	}
</script>

<style lang="scss" scoped>
	.index {
		overflow: hidden;

		&-wrap {

			// 头部
			.index-header {
				color: $-color-white;
				padding: 30rpx 24rpx;
				background-repeat: no-repeat;
				background-size: 100% 100rpx;
				background-color: #40AFFA;
				padding-bottom: 200rpx;
			}

			.index-section {
				padding: 0 24rpx;
				width: 100%;
				position: absolute;
				top: 100rpx;

				// 今日数据卡片
				.today-data {
					padding: 21px 20px 0 20px;
					border-radius: 14rpx;
					background-color: $-color-white;
					margin-top: 10px;
					display: flex;
					flex-wrap: wrap;

					.item-data {
						width: 220rpx;
						display: flex;
						flex-direction: column;

						// view:first-child {
						//     color: $-color-muted;
						//     font-size: 24rpx;
						// }

						// view:last-child {
						//     color: $-color-normal;
						//     font-size: 44rpx;
						//     font-weight: 500;
						//     margin-top: 6rpx;
						//     height: 50px;
						//     word-wrap: break-word;
						//     word-break: break-all;
						// }
					}

					.item-data:first-child {
						// width: 260rpx !important;
					}
				}

				.item-data1 {
					width: 48%;
					margin-bottom: 20px;
					margin-right: 7px;
					background: #efefef;
					border-radius: 8px;
				}

				.today-data1 {
					border-radius: 14rpx;
					background-color: $-color-white;
					// margin-top: 10px;
				}

				.todayImg {
					width: 40px;
					height: 40px;
				}

				.todayImg1 {
					width: 30px;
					height: 30px;
				}

				.numFlex {
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.numImg {
					width: 20px;
					height: 20px;
				}

				.todayView {
					display: flex;
					height: 95px;
					align-items: center;
					border-radius: 4px;
					overflow: hidden;
					position: relative;
				}

				.num {
					color: $-color-normal;
					font-size: 30rpx;
					font-weight: bold;
					margin-top: 6rpx;
					height: 30px;
					word-wrap: break-word;
					word-break: break-all;
					color: #40AFFA;
				}

				.itenMame {
					font-size: 24rpx;
				}

				.todayNum {
					padding: 15px 20px;
					font-size: 30rpx;
					font-weight: 500;
				}

				.todayAll {
					margin: 0 5px;
					width: 100%;
					display: flex;
					flex-wrap: wrap;
				}

				.todayItem {
					width: 45%;
					margin-bottom: 20px;
					margin-left: 3%;
					border-radius: 8px;
				}

				.text1 {
					font-size: 28rpx;
					color: #000;
					font-weight: bold
				}

				.text2 {
					font-size: 12px;
					margin-top: 10px;
				}

				.p20 {
					height: 40px;
					padding: 10px;
				}

				// .tnum .img{
				//     width: 20px;
				//     height: 20px;
				// }
				.today-data2 {
					border-radius: 14rpx;
					// background-color: $-color-white;
					margin-top: 15px;
				}

				.todayAll1 {
					// margin: 5px;
					width: 100%;
					display: flex;
					flex-wrap: wrap;
				}

				.todayItem1 {
					width: 48%;
					margin-bottom: 20px;
					margin-right: 7px;
					background: #efefef;
					border-radius: 8px;
				}

				.text3 {
					width: 100%;
					height: 50%;
					display: flex;
					align-items: center;
					text-align: left;
					padding-left: 5px;
					color: #fff;
					font-size: 16px;
				}

				.text4 {
					width: 100%;
					height: 50%;
					text-align: right;
					padding-right: 10px;
					color: #fff;
					font-size: 16px;

				}

				.btn {
					margin: 30rpx 0;
					margin-top: 20rpx;
					height: 88rpx;
					color: $-color-white;
					font-size: $-font-size-lg;
					background-color: $-color-primary;
				}

				// 数据图
				.e-data {
					.e-title {
						font-size: 30rpx;
						font-weight: 500;
					}

					.e-content {
						padding: 20rpx 0;
						border-radius: 14rpx;
						background-color: $-color-white;
					}
				}
			}
		}

		.menu {
			width: 100%;
			justify-content: space-between;
			color: #817C81;
			font-size: 30rpx;
			font-weight: 400;
			overflow-x: auto;

			background-color: white;

			.menu_tab {
				width: 25%;
				text-align: center;

				padding: 12rpx 32rpx;
				//background-color: $-color-border;
				// border-radius: 32rpx;
				white-space: nowrap;

				&:not(:first-child) {
					margin-left: 16rpx;
				}
			}

			.bor_btn {
				color: #ffffff;
				background-color: $-color-primary;


			}

			.bor_btn1 {
				background-repeat: no-repeat;
				background-image: linear-gradient(90deg, #83c04a 0%, #86bb55 100%);
				background-size: 50% 3px;
				background-position: 50% 100%;
			}
		}
	}

	.menu_num {
		text-align: center;
		color: #86bb55;
		font-size: 32px;
		font-weight: 600;
		line-height: 32px;
	}

	.menu_title {
		text-align: center;
		line-height: 32px;

	}

	.u-subsection ::v-deep .u-item-text {
		overflow-x: auto;
	}
</style>