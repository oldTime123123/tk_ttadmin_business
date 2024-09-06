<template>
	<view class="user">
		<u-sticky offset-top="0" h5-nav-height="0" bg-color="transparent">
			<u-navbar :is-back="false" :title="$t('bus_my.y1')" :title-bold="true" :is-fixed="false"
				:border-bottom="false" :background="{ background: 'rgba(256,256, 256,' + 1 + ')' }"
				:title-color="1 > 0.5 ? '#000' : '#fff'">
			</u-navbar>
		</u-sticky>
		<Settled></Settled>

		<mescroll-body ref="mescrollRef" height="90vh" @down="downCallback" :down="downOption" @up="upCallback"
			:up="{ use: false }">
			<view class="user-info">

				<!-- Header -->
				<view class="header">
					<!-- <router-link to="/bundle/pages/shop_setting/shop_setting"> -->
					<view class="info flex">
						<image class="logo m-r-20 flex-none"
							:src="isLogin ? info.logo : '/static/images/icon_portrait'" />
						<template v-if="isLogin">
							<view class="name">
								<view class="lg white bold line-2">{{ info.name }} <text
										style="font-size: 24rpx;margin-left: 20rpx;">{{info.vipInfo.name}}</text></view>
								<view class="flex">
									<view class="IDlist">
										<view class="orange line-2">ID: {{ info.id }}</view>
									</view>
									<view class="copyBtn flex-center " @click="copy(info.id)">
										<image src="../../static/images/copy.png" style="width: 28rpx;height: 28rpx;">
										</image>
									</view>
								</view>

								<!-- switch -->
								<!-- <view class="m-t-14">
									<b-switch @change="isRunFunc" size="36" v-model="info.is_run"></b-switch>
								</view> -->
							</view>
						</template>
						<template v-if="!isLogin">
							<view class="xl" @click="goLogin">{{$t('bus_my.y2')}}</view>
						</template>
					</view>
					<!-- </router-link> -->
				</view>

				<!-- Section  -->
				<view class="section">
					<!-- Wallet -->
					<!-- <router-link to="/bundle/pages/user_wallet/user_wallet"> -->
						<view class="wallet bg-white flex row-between" @click="goPage('/bundle/pages/user_wallet/user_wallet')">
							<view class="normal">
								<view class="xs">{{$t('bus_my.y5')}}</view>
								<view class="wallet-price m-t-20">{{currency}}{{ info.wallet || 0 }}</view>
							</view>
							<view class="">
								<view class="wallet-btn br60 flex row-center white sm">
									{{$t('bus_my.y22')}}
								</view>
								<!-- <view style="margin-top: 20rpx;" class="wallet-btn br60 flex row-center white sm">
									{{ $t('bus_my.y7') }}
								</view> -->
							</view>

						</view>
					<!-- </router-link> -->

					<!-- Nav -->
					<view class="nav bg-white m-t-20">
						<view class="md bold normal m-l-30">{{$t('bus_my.y8')}}</view>

						<view class="nav-item flexWeb flex-wrap">
							<button v-for="(item, index) in menuList" :key="index"
								:open-type="item.link_type == 2 ? 'contact' : ''"
								class="item flex-col col-center m-b-20" style="width: 25%" @tap="menuJump(item)">
								<image class="nav-icon" :src="item.image"></image>
								<view v-if="item.name==$t('bus_my.y25')&&numTotal>0" class="numTotal">{{ numTotal }}
								</view>
								<view class="sm nav-name" :style="{height: lang=='en'?'30px':''}">{{ item.name }}</view>
							</button>
						</view>
					</view>
					<!-- Logout -->
					<view class="logout-btn m-t-40 nd bold lighter bg-white flex row-center" @click="logout">
						{{$t('bus_my.y19')}}
					</view>

					<!-- Edition -->
					<!-- <view class="m-t-20 muted xs flex row-center">{{$t('bus_my.y20')}} v3.12</view> -->
				</view>
			</view>

			<u-toast ref="uToast" />
		</mescroll-body>
		<!-- <Menu :bottom="300"></Menu> -->
	</view>
</template>

<script>
	import {
		baseURL
	} from "@/config/app.js";
	import {
		mapGetters,
		mapActions
	} from "vuex";
	import {
		applyStatus
	} from '@/api/app'
	import {
		apiLogout
	} from "@/api/user";
	import {
		apiSetShopInfo
	} from "@/api/store";
	import request from '@/utils/request'
	import Settled from "@/components/Settled/Settled";
	import Menu from '../../components/menu.vue';
	import {
		copy
	} from "@/utils/tools.js";

	export default {
		// mixins: [MescrollMixin],
		components: {
			Menu,
			Settled
		},
		data() {
			return {
				info: {},
				lange: '',
				menuList: [
					// {
					// 	name: this.$t('订单核销'),
					// 	link: "/pages/verification_order/verification_order",
					// 	image: "/static/images/verification.png",
					// },
					{
						name: this.$t('tabbar.tb_dk'),
						link: "/pages/activities/index",
						image: "/static/images/lv.png",
					},
					{
						name: this.$t('bus_my.y10'),
						link: "/bundle/pages/shop_data/shop_data",
						image: "/static/images/icon_user_data.png",
					},
					{
						name: this.$t('bus_my.y11'),
						link: "/bundle/pages/shop_setting/shop_setting",
						image: "/static/images/icon_user_shop.png",
					},
					{
						name: this.$t('bus_my.y12'),
						link: "/bundle/pages/user_profile/user_profile",
						image: "/static/images/icon_user_set.png",
					},
					// {
					// 	name: this.$t('bus_my.y13'),
					// 	// link: "/bundle/pages/user_profile/user_profile",
					// 	image: "/static/images/yinhangka.png",
					// },
					// {
					// 	name: this.$t('bus_my.y14'),
					// 	// link: "/bundle/pages/user_profile/user_profile",
					// 	image: "/static/images/chongzhi.png",
					// },
					// {
					// 	name: this.$t('bus_my.y15'),
					// 	// link: "/bundle/pages/user_profile/user_profile",
					// 	image: "/static/images/tixian.png",
					// },
					// {
					// 	name: this.$t('bus_my.y16'),
					// 	// link: "/bundle/pages/user_profile/user_profile",
					// 	image: "/static/images/zhanghumingxi.png",
					// },
					{
						name: this.$t('bus_my.y17'),
						link: "/bundle/pages/mine/traffic",
						image: "/static/images/guanggaotoufang.png",
					},
					{
						name: this.$t('bus_my.y18'),
						link: "/bundle/pages/mine/term",
						image: "/static/images/tuandui 2.png",
					},
					{
						name: this.$t('bus_my.y24'),
						link: "/bundle/pages/mine/customerService",
						image: "/static/images/kefu.png",
					},
					{
						name: this.$t('bus_my.y25'),
						image: "/static/images/gongzuotai.png",
					},
				],
				currency: '',
				downOption: {
					use: false
				},
				lang: '',
				numTotal: 0,
			};
		},
		methods: {
			...mapActions(["getUser"]),
			async downCallback() {
				let res = await this.getUser();
				this.info = JSON.parse(JSON.stringify(res.data));
				this.mescroll.endSuccess(0, false);
			},

			menuJump(item) {
				// console.log(item.link,this.$t('bus_my.y9'));
				let status = uni.getStorageSync('Certification_Status');
				if(status==3){
					if (item.name == this.$t('bus_my.y9')) {
						// uni.reLaunch({
						// 	url: item.link,
						// });
						this.$Router.push('/pages/activities/index');
					} else {
						if (item.name == this.$t('bus_my.y25')) {
							// window.location.href = `http://localhost:8081/kefu?token=183e702e0cec538a21fb3858fb7d9e45&lang=en`
							uni.showLoading();
							request({
								url: 'account/kefuLogin',
								method: "POST"
							}).then(res => {
								if(res.code==1){
									if (res.data && res.data.token) {
										uni.hideLoading();
										window.location.href = baseURL +
											`/kefu?token=${res.data.token}&lang=${this.lang?this.lang:'en'}`
									}
								}
							})
						} else {
							this.$Router.push(item.link);
						}
					}
				}else{
					this.$toast({
						title: this.$t('bus_my.y28'),
					});
				}
				
			},
			//是否认证可以操作
			goPage(link){
				let status = uni.getStorageSync('Certification_Status');
				if(status==3){
					uni.reLaunch({
						url: link
					})
				}else{
					this.$toast({
						title: this.$t('bus_my.y28'),
					});
				}
				
			},
			logout() {
				//  退出登录
				apiLogout().then((res) => {
					if(res.code==1){
						uni.removeStorageSync('token')
						this.$store.commit("logout");
						setTimeout(() => {
							// uni.reLaunch({
							// 	url: "/pages/login/login",
							// });
							window.location.href = window.location.origin
						}, 500);
					}else{
						this.$toast({title: res.msg});
					}
				});
			},
			goLogin() {
				uni.switchTab({
					url: "/pages/login/login",
				});
			},
			async isRunFunc(event) {
				const res = await apiSetShopInfo({
					is_run: event.value ? 1 : 0,
				});
			},
			getweidu() {
				request({
					url: 'shop/unReadMsgCount',
					methods: 'get',
					data: {
						size: 1000
					}
				}).then(res => {
					this.numTotal = res.data ? res.data.count : undefined;
				}).catch(err => {
					uni.showToast({
						title: err,
						icon: "none",
						duration: 30000
					})
				})
			},
			setTabBar() {
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
			},
			copy(content) {
				copy(content);
				uni.showToast({
                    title: this.$t('tk_ck.a_c4')
                })
			},
		},
		onShow() {
			this.lang = localStorage.getItem('locale');
			this.currency = uni.getStorageSync('currency');
			this.setTabBar();
			uni.showLoading();
			this.getweidu();
			this.getUser().then((res) => {
				this.info = JSON.parse(JSON.stringify(res.data));
				uni.hideLoading()
			}).catch((err) => {
				uni.hideLoading()
			});
		},
	};
</script>

<style lang="scss">
	.user {
		&-info {
			position: relative;

			.header {
				padding: 40rpx 20rpx 150rpx 20rpx;
				background-color: $-color-primary;

				// background-image: url(../../static/images/my_topbg.png);
				// background-size: 100% 300rpx;
				// background-repeat: no-repeat;
				.logo {
					height: 100rpx;
					width: 100rpx;
					border-radius: 50%;
					overflow: hidden;
				}

				.name {
					text-align: left;
					margin-bottom: 5rpx;

					.IDlist {
						display: flex;
						width: 100%;
						box-sizing: border-box;
						margin-top: 6px;
						font-size: 12px;
						border-radius: 10px;
						padding: 2px 5px;
						border: 1px solid #a1a1a1
					}

					.copyBtn {
						padding: 15rpx 30rpx 0 20rpx;
						border-radius: 10rpx;
						color: #fff;

					}
				}
			}

			.section {
				padding: 0 20rpx;
				width: 100%;
				position: absolute;
				top: 180rpx;

				.wallet {
					padding: 50rpx 40rpx;
					border-radius: 14rpx;

					&-price {
						font-size: 60rpx;
					}

					&-btn {
						width: 160rpx;
						height: 60rpx;
						background-color: $-color-primary;
					}
				}

				// 导航
				.nav {
					padding: 30rpx 0;
					border-radius: 14rpx;

					&-item {
						padding: 26rpx 0 0;

						.item {
							width: 25%;
							border-radius: 0;
						}

						.nav-icon {
							width: 82rpx;
							height: 82rpx;
							margin-top: 16rpx;
						}

						.nav-icon:last-child {
							width: 72rpx;
							height: 72rpx;
							margin-top: 16rpx;
						}

						.nav-name {
							width: 80%;
							margin: 0 24rpx;
							margin-bottom: 24rpx;
							text-align: center;
							line-height: 15px;
						}
					}
				}

				.logout-btn {
					height: 88rpx;
					border-radius: 14rpx;
					background: #40affa;
					color: #fff;
				}
			}

			.orange {
				color: #0150AB;
			}
		}

		.flexWeb {
			display: flex;
			display: -webkit-box;
			display: -moz-box;
			display: -ms-flexbox;
			display: -webkit-flex;
		}

		.numTotal {
			font-size: 10px;
			border-radius: 10px;
			background: rgb(32, 149, 233);
			color: rgb(255, 255, 255);
			border: 1px solid rgb(32, 149, 233);
			right: 16px;
			position: absolute;
			height: 18px;
			min-width: 8px;
			line-height: 18px;
			padding: 0 5px;
			text-align: center;
		}
	}
</style>