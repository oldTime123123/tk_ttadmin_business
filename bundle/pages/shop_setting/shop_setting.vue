<template>
	<view>
		<!-- <u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs> -->
		<view class="nav flex">
			<view @click="back">
				<image style="width: 44rpx;height: 44rpx;" src="../../static/images/Frame.png" mode=""></image>
			</view>
			<view class="text">{{ $t('bus_my.y11') }}</view>
			<view></view>
		</view>
		<view class="m-t-20">
			<!--v-if="current == 0"  -->
			<template>
				<view class="item bb">
					<view>{{ $t('bus_shopSetting.ss3') }}</view>
					<image v-if="defalteImg" :src="shopInfo.data.logo" style="width: 80px;height: 80px;"></image>
					<image v-if="defalteImg" src="../../../static/images/x2.png"
						style="width: 15px;height: 15px;position: absolute;right: 0;top: 64px;"
						@click="defalteImgCahange"></image>
					<u-upload v-else :file-list="fileList" :action="action" :header="header" max-count="1" width="160"
						height="160" :show-progress="false" @on-success="onSuccess"
						:upload-text="$t('tk_wr.r_r18')"></u-upload>
				</view>
				<view class="item bb">
					<view>{{ $t('bus_shopSetting.ss4') }}</view>
					<view>{{info.name}}</view>
				</view>
				<!-- <view class="item bb">
                    <view>{{ $t('bus_shopSetting.ss5') }}</view>
                    <view>{{info.name}}</view>
                </view>
                <view class="item bb">
                    <view>{{ $t('bus_shopSetting.ss6') }}</view>
                    <view>{{ info.cate_name }}</view>
                </view> -->
				<view class="item bb">
					<view>{{ $t('bus_shopSetting.ss7') }}</view>
					<view>
						<u-rate disabled active-color="#F6B125" :count="5" v-model="info.store_star"></u-rate>
					</view>
				</view>
				<router-link to="/bundle/pages/shop_setting_edit/shop_setting_edit?type=1">
					<view class="item bb">
						<view>{{ $t('bus_shopSetting.ss8') }}</view>
						<view class="flex row-right">
							<view class="m-r-10">{{info.nickname}}</view>
							<u-icon name="arrow-right"></u-icon>
						</view>
					</view>
				</router-link>
				<router-link to="/bundle/pages/shop_setting_edit/shop_setting_edit?type=2">
					<view class="item bb">
						<view>{{ $t('bus_shopSetting.ss9') }}</view>
						<view class="flex row-right">
							<view class="m-r-10">{{info.mobile}}</view>
							<u-icon name="arrow-right"></u-icon>
						</view>
					</view>
				</router-link>
				<router-link to="/bundle/pages/shop_setting_edit/shop_setting_edit?type=66">
					<view class="item bb">
						<view>{{ $t('settled.set_43') }}</view>
						<view class="flex row-right">
							<view class="m-r-10">{{info.account}}</view>
							<u-icon name="arrow-right"></u-icon>
						</view>
					</view>
				</router-link>
				<router-link to="/bundle/pages/shop_setting_edit/shop_setting_edit?type=99">
					<view class="item bb">
						<view>{{ $t('settled.set_44') }}</view>
						<view class="flex row-right">
							<view class="m-r-10">{{info.email}}</view>
							<u-icon name="arrow-right"></u-icon>
						</view>
					</view>
				</router-link>
				<router-link to="/bundle/pages/shop_setting_edit/shop_setting_edit?type=3">
					<view class="item line-2">
						<view>{{ $t('bus_shopSetting.ss10') }}</view>
						<view class="flex row-right">
							<view class="m-r-10 line-2">{{info.intro}}</view>
							<u-icon name="arrow-right"></u-icon>
						</view>
					</view>
				</router-link>
			</template>
			<!-- 
            <template v-if="current == 1">
                <view class="item bb">
                    <view>{{ $t('bus_shopSetting.ss11') }}</view>
                    <view class="flex row-right">
                        <view class="m-r-20">{{info.is_run?$t('bus_shopSetting.ss12'):$t('bus_shopSetting.ss13')}}</view>
                        <u-switch @change="isRunFunc" size="36" v-model="info.is_run"></u-switch>
                    </view>
                </view>
                <router-link to="/bundle/pages/run_time/run_time">
                    <view class="item">
                        <view>{{ $t('bus_shopSetting.ss14') }}</view>
                        <view class="flex row-right">
                            <view class="m-r-10 line-2">{{shopInfo.run_start_time||'-'}}-{{shopInfo.run_end_time||'-'}}
                            </view>
                            <u-icon name="arrow-right"></u-icon>
                        </view>
                    </view>
                </router-link>
               <router-link to="/pages/address_edit/address_edit?type=1">
                    <view class="item">
                        <view>{{ $t('bus_shopSetting.ss15') }}</view>
                        <view class="flex row-right line-1">
                            <view class="m-r-10 line-1">{{shopAddress}}</view>
                            <u-icon name="arrow-right"></u-icon>
                        </view>
                    </view>
                </router-link>
            </template> -->
		</view>

		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import request from '@/utils/request'
	import {
		baseURL
	} from "@/config/app.js";
	import store from '@/store'
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	import {
		apiSetShopInfo
	} from '@/api/store'
	export default {
		data() {
			return {
				list: [{
					name: this.$t('bus_shopSetting.ss1')
				}, {
					name: this.$t('bus_shopSetting.ss2')
				}],

				current: 0,

				info: {
					is_run: 1,
					open_invoice: 1,
					spec_invoice: 1
				},
				action: baseURL + "/shopapi/file/formimage",
				fileList: [],
				header: {
					token: store.getters.token
				},
				defalteImg: true
			}
		},

		computed: {
			shopAddress() {
				return this.shopInfo.province_name + " " + this.shopInfo.city_name + " " + this.shopInfo.district_name +
					" " + this.shopInfo.address;
			},
			refundAddress() {
				return this.shopInfo.refund_address?.province_name + " " + this.shopInfo.refund_address?.city_name + " " +
					this.shopInfo.refund_address?.district_name +
					" " + (this.shopInfo.refund_address?.address ?? '')
			}
		},

        onShow() {
            this.getUser().then(res => {
                // 深度克隆防止vux的数据地址保存连接
                res.data?this.info = JSON.parse(JSON.stringify(res.data)):'';
            })
        },

		methods: {
			...mapActions(['getUser']),

			change(index) {
				this.current = index;
			},
			defalteImgCahange() {
				this.defalteImg = false;
			},
			async isRunFunc(event) {
				try {
					await apiSetShopInfo({
						is_run: event ? 1 : 0
					})
					this.$refs.uToast.show({
						title: '设置成功',
						type: 'success'
					})
				} catch (err) {
					this.$refs.uToast.show({
						title: err,
						type: 'error'
					})
				}
			},

			async openInvoiceFunc(event) {
				try {
					await apiSetShopInfo({
						open_invoice: event ? 1 : 0
					})
					this.$refs.uToast.show({
						title: '设置成功',
						type: 'success'
					})
				} catch (err) {
					this.$refs.uToast.show({
						title: err,
						type: 'error'
					})
				}
			},

			async specInvoiceFunc(event) {
				try {
					await apiSetShopInfo({
						spec_invoice: event ? 1 : 0
					})
					this.$refs.uToast.show({
						title: '设置成功',
						type: 'success'
					})
				} catch (err) {
					this.$refs.uToast.show({
						title: err,
						type: 'error'
					})
				}
			},

			onSuccess(e) {
				request({
					url: "shop/shopSet",
					method: "POST",
					data: {
						logo: e.data.uri
					}
				}).then(res => {
					this.$toast({
						title: res.msg
					})
				}).catch(err => {
					this.$toast({
						title: err
					})
				})

			},
			onRemove(index) {
				this.fileList.splice(index, 1)
			},
			back() {
				uni.redirectTo({
					url: '/pages/user/user'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav {
		width: 100%;
		height: 88rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 32rpx 32rpx 0 32rpx;
		background-color: #fff;
	}

	.nav .text {
		font-size: 36rpx;
		color: #000;
	}

	.item {
		padding: 30rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		background-color: $-color-white;
		justify-content: space-between;

		>view:first-child {
			width: 180rpx;
			color: $-color-black;
			font-size: $-font-size-nr;
			font-weight: 500;
		}

		>view:last-child {
			flex: 1;
			text-align: right;
		}
	}

	.bb {
		border-bottom: 1px solid #F8F8F8;
	}
	.item:first-child {
		flex: 1 !important;
	}
	.item:last-child {
		flex: none;
	}
	.u-upload {
		justify-content: flex-end;
	}
</style>