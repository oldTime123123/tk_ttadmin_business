<template>
	<view class="settled-result">
		<view class="result-box">
			<!-- Header -->
			<view class="result-header bg-white flex-col col-center">
				<u-image width="165rpx" height="165rpx" class="m-t-42" :src="getStatus.img" />
				<view class="m-t-32 lg bold">{{getStatus.text}}</view>
				<view>
					<!-- 地址、账号 -->
					<view v-if="applyDetail.audit_status == 2">
						<view class="m-t-40 flex flex-wrap">
							<view class="m-r-20">PC{{this.$t('settled.set_52')}}：<text
									class="lighter">{{applyDetail.admin_address}}</text>
							</view>
							<view class="btn-copy br60 text-center" @tap="onCopy(applyDetail.admin_address)">
								{{this.$t('tk_al.a_d1')}}
							</view>
						</view>
						<view class="m-t-30 flex flex-wrap">
							<view class="m-r-20">{{this.$t('settled.set_53')}}：<text
									class="lighter">{{applyDetail.account}}</text></view>
							<view class="btn-copy br60 text-center" @tap="onCopy(applyDetail.account)">{{this.$t('tk_al.a_d1')}}
							</view>
						</view>
					</view>
					<view class="m-t-20 muted sm text-center">{{getStatus.desc}}</view>
					<view class="flex" v-if="applyDetail.audit_status !=2">
						<router-link v-if="applyDetail.audit_status == 3" class="flex-1 m-r-20"
							to="/bundle/pages/store_settled/store_settled">
							<view class="br60 flex row-center primary back-btn m-t-60 md">{{this.$t('settled.set_54')}}</view>
						</router-link>
						<router-link class="flex-1" to="/pages/index/index" navType="pushTab">
							<view class="br60 flex row-center back-btn m-t-60 md">{{this.$t('settled.set_51')}}</view>
						</router-link>
					</view>
				</view>
			</view>

			<!-- Content -->
			<view class="result-content bg-white m-t-20 p-20">
				<view v-if="approveConfigData.verify_store_name==1" class="apply-form-item flex row-between">
					<view><text class="primary m-r-10">*</text>{{this.$t('settled.set_4')}}</view>
					<view>{{applyDetail.name}}</view>
				</view>

				<!-- 主营行业 -->
				<!-- <view class="apply-form-item flex row-between">
					<view><text class="primary m-r-10">*</text>{{this.$t('主营类目')}}</view>
					<view>{{applyDetail.cid_desc}}</view>
				</view> -->

				<!-- 联系人姓名 -->
				<view v-if="approveConfigData.verify_real_name==1" class="apply-form-item flex row-between">
					<view><text class="primary m-r-10">*</text>{{this.$t('settled.set_10')}}</view>
					<view>{{applyDetail.nickname}}</view>
				</view>

				<!-- 手机号码 -->
				<view v-if="approveConfigData.verify_phone==1" class="apply-form-item flex row-between">
					<view><text class="primary m-r-10">*</text>{{this.$t('settled.set_8')}}</view>
					<view>{{applyDetail.mobile}}</view>
				</view>
				<!-- 商家账号 -->
				<view v-if="approveConfigData.verify_account==1" class="apply-form-item flex row-between">
					<view><text class="primary m-r-10">*</text>{{this.$t('settled.set_53')}}</view>
					<view>{{applyDetail.account}}</view>
				</view>
				<!-- 绑定国家 -->
				<view v-if="approveConfigData.verify_country==1" class="apply-form-item flex row-between">
					<view><text class="primary m-r-10">*</text>{{this.$t('settled.set_55')}}</view>
					<view>{{applyDetail.country}}</view>
				</view>
				<!-- 设置密码 -->
				<view v-if="approveConfigData.verify_password==1" class="apply-form-item flex row-between">
					<view><text class="primary m-r-10">*</text>{{this.$t('tk_in.i_s6')}}</view>
					<view>{{applyDetail.password}}</view>
				</view>

				<view v-if="approveConfigData.verify_whatsapp==1" class="apply-form-item flex row-between">
					<view><text class="primary m-r-10">*</text>{{this.$t('whatsapp')}}</view>
					<view>{{applyDetail.whatsapp}}</view>
				</view>
				<view v-if="approveConfigData.verify_monthly_income==1" class="apply-form-item flex row-between">
					<view><text class="primary m-r-10">*</text>{{this.$t('settled.set_56')}}</view>
					<view>{{applyDetail.monthly_income}}</view>
				</view>


				<!-- 图片 -->
				<view class="apply-form-item" v-if="approveConfigData.verify_IdCard==1">
					<view><text class="primary m-r-10">*</text>{{this.$t("loan.lo_v6")}}</view>
					<view class="license-list flex m-t-10 flex-wrap">
						<view v-for="(item,index) in license" class="m-r-14 m-t-20" @tap="previewImage(index)"
							:key="index">
							<u-image width="152rpx" height="152rpx" :src="item" />
						</view>
					</view>
				</view>
				<view class="apply-form-item" v-if="approveConfigData.verify_store_logo==1">
					<view><text class="primary m-r-10">*</text>{{this.$t("settled.set_16")}}</view>
					<view class="license-list flex m-t-10 flex-wrap">
						<view class="m-r-14 m-t-20" @tap="previewImage2(applyDetail.logo)">
							<u-image width="152rpx" height="152rpx" :src="applyDetail.logo" />
						</view>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		shopApplyDetail,
		approveConfig,
	} from '@/api/app'
	import {
		copy
	} from '@/utils/tools'
	export default {
		data() {
			return {
				applyDetail: {},
				license: [],
				approveConfigData: {}
			}
		},

		methods: {
			async approveConfigD() {
				try {
					await approveConfig().then(res => {
						this.approveConfigData = res.data
					})
				} catch (e) {
					console.log(e)
					//TODO handle the exception
				}

			},
			async getShopApplyDetail() {
				uni.showLoading()

				try {
					await shopApplyDetail(this.id).then(res => {
						this.applyDetail = res.data;
						this.license = res.data.license
						uni.hideLoading()

					})

				} catch (e) {
					//TODO handle the exception
				}



			},
			previewImage(current) {
				uni.previewImage({
					current,
					urls: this.license
				})
			},
			previewImage2(img) {
				uni.previewImage({
					urls: img
				})
			},
			onCopy(text) {
				copy(text)
			}
		},

		onLoad(options) {
			this.id = this.$Route.query.id;
			this.approveConfigD();
			this.getShopApplyDetail()
		},
		computed: {
			getStatus() {
				const {
					applyDetail: {
						audit_status
					}
				} = this
				switch (audit_status) {
					case 1:
						return {
							img: '/static/images/img_store_submit1.png',
								text: this.$t('settled.set_45'),
								desc: this.$t('settled.set_46')
						}
					case 2:
						return {
							img: '/static/images/img_store_submit1.png',
								text: this.$t('settled.set_47'),
								desc: this.$t('settled.set_48')
						}
					case 3:
						return {
							img: '/static/images/img_store_fail.png',
								text: this.$t('settled.set_49'),
								desc: this.$t('settled.set_50')
						}
					default:
						return {}
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	.settled-result {
		padding: 20rpx;

		.result-box {
			.result-header {
				padding: 0 75rpx 50rpx;
				border-radius: 10rpx;

				.btn-copy {
					width: 96rpx;
					height: 42rpx;
					line-height: 42rpx;
					border: $-solid-border;
				}
			}

			.back-btn {
				height: 88rpx;
				border: 1px solid #CCC;

				&.primary {
					border-color: $-color-primary;
					color: $-color-primary;
				}
			}

			.result-content {
				border-radius: 10rpx;

				.apply-form-item {
					padding: 30rpx 0;

					&:not(:last-of-type) {
						border-bottom: $-solid-border;
					}
				}
			}
		}
	}
</style>