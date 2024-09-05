<template>
	<view class="store-settled">
		<view class="nav flex">
			<view @click="back">
				<image style="width: 44rpx;height: 44rpx;" src="../../static/images/Frame.png" mode=""></image>
			</view>
			<!-- <view class="text">{{ $t('tk_zc.l_l71') }}</view> -->
			<view></view>
		</view>
		<view class="content">
			<view class="apply-form bg-white">
				<!-- 商家名称 -->
				<view class="apply-form-item" v-if="approveConfigData.verify_store_name==1">
					<u-field :label="this.$t('settled.set_4')" v-model="form.store_name" label-width="160"
						:placeholder="this.$t('settled.set_5')" required />
				</view>

				<!-- 主营行业 -->
				<!-- <view class="apply-form-item" @tap="showPop=true">
					<u-field label="主营类目" v-model="form.clabel" label-width="160" style="flex: 1;" placeholder="请选择行业类目"
						required disabled>
						<u-icon name="arrow-right" slot="right" size="28" />
					</u-field>
				</view> -->
				<!-- 商家地址 -->
				<view class="apply-form-item" v-if="approveConfigData.verify_address==1">
					<u-field :label="this.$t('settled.set_6')" v-model="form.address" label-width="160"
						:placeholder="this.$t('settled.set_7')" required />
				</view>

				<!-- 手机号码 -->
				<view class="apply-form-item" v-if="approveConfigData.verify_phone==1">
					<u-field :label="this.$t('settled.set_8')" v-model="form.phone" label-width="160"
						:placeholder="this.$t('settled.set_9')" required />
				</view>

				<!-- 联系人姓名 -->
				<view class="apply-form-item" v-if="approveConfigData.verify_real_name==1">
					<u-field :label="this.$t('settled.set_10')" v-model="form.real_name" label-width="160"
						:placeholder="this.$t('settled.set_11')" required />
				</view>



				<!-- 验证码 -->
				<!-- <view class="apply-form-item">
					<u-field label="验证码" label-width="160" placeholder="请输入验证码" required v-model="form.code">
						<view slot="right" class="primary send-code-btn br60 flex row-center" @tap="sendSmsFun">
							<u-verification-code unique-key="store-settled" ref="uCode" @change="codeChange">
							</u-verification-code>
							<view class="xs">{{codeTips}}</view>
						</view>
					</u-field>
				</view> -->

				<!-- 验证码 -->
				<view class="apply-form-item" v-if="approveConfigData.verify_account==1">
					<u-field :label="this.$t('settled.set_12')" v-model="form.account" label-width="160"
						:placeholder="this.$t('settled.set_13')" required />
				</view>

				<!-- 设置密码 -->
				<view class="apply-form-item" v-if="approveConfigData.verify_password==1">
					<u-field :label="this.$t('settled.set_14')" :password="true" v-model="form.password"
						label-width="160" :placeholder="this.$t('settled.set_15')" required />
				</view>

				<!-- 上传图片 -->
				<view class="apply-form-item" v-if="approveConfigData.verify_store_logo==1">
					<u-field :label="this.$t('settled.set_16')" label-width="160" :placeholder="this.$t('settled.set_57')"
						:border-bottom="false" required disabled />
					<view>
						<u-upload ref="uUpload" @on-choose-fail="fail" :show-progress="false"
							:header="{token: $store.getters.token}" :max-count="1" width="150" height="150"
							:action="action" :upload-text="this.$t('settled.set_17')" @on-success="onSuccess2"
							@on-remove="onRemove2" />
					</view>
					<view class="muted m-t-20 m-b-30">{{this.$t('settled.set_18')}}</view>
				</view>

				<view class="apply-form-item" v-if="approveConfigData.verify_IdCard==1">
					<u-field :label="this.$t('settled.set_19')" label-width="160"
						:placeholder="this.$t('settled.set_20')" :border-bottom="false" required disabled />
					<view>
						<view class="flex">

							<u-upload ref="uUpload" :show-progress="false" :header="{token: $store.getters.token}"
								:max-count="1" width="230" height="150" :action="action"
								:upload-text="this.$t('settled.set_21')" @on-success="onSuccess"
								@on-remove="onRemove" />
							<u-upload ref="uUpload" :show-progress="false" :header="{token: $store.getters.token}"
								:max-count="1" width="230" height="150" :action="action"
								:upload-text="this.$t('settled.set_21')" @on-success="onSuccess3"
								@on-remove="onRemove3" />
						</view>
						<view class="mt20">
							{{this.$t('settled.set_22')}}
						</view>
						<view class="mt20">
							<image src="../../static/images/img1.png"
								style="width: 129px;height: 78px;margin-right: 20rpx;" mode="">
							</image>
							<image src="../../static/images/img2.png" style="width: 129px;height: 78px;" mode="">
							</image>
						</view>

					</view>
					<view class="muted m-t-20 m-b-30">{{this.$t('settled.set_23')}}</view>
				</view>

				<!-- 绑定证件号 -->
				<view class="apply-form-item" v-if="approveConfigData.verify_code==1">
					<u-field :label="this.$t('settled.set_24')" v-model="form.code" label-width="160"
						:placeholder="this.$t('settled.set_25')" required />
				</view>

				<!-- 绑定国家 -->
				<view class="apply-form-item" v-if="approveConfigData.verify_country==1">
					<u-field :label="this.$t('settled.set_26')" v-model="form.country" label-width="160"
						:placeholder="this.$t('settled.set_27')" required />
				</view>
				<!-- 绑定whatsapp -->
				<view class="apply-form-item" v-if="approveConfigData.verify_whatsapp==1">
					<u-field :label="this.$t('settled.set_28')" v-model="form.whatsapp" label-width="160"
						:placeholder="this.$t('settled.set_29')" required />
				</view>
				<!-- 用户月收入-->
				<view class="apply-form-item" v-if="approveConfigData.verify_monthly_income==1">
					<u-field :label="this.$t('settled.set_30')" v-model="form.monthly_income" label-width="160"
						:placeholder="this.$t('settled.set_31')" required />
				</view>
				<!-- 用户月收入-->
				<view class="apply-form-item" v-if="approveConfigData.invite_code==1">
					<u-field :label="this.$t('settled.set_32')" v-model="form.invite_code" label-width="160"
						:placeholder="this.$t('settled.set_33')" required />
				</view>


				<!-- 同意协议 -->
				<view class="apply-form-item flex">
					<u-checkbox shape="circle" active-color="#74C2FF" v-model="isAgree">
						<text class="sm">{{this.$t("settled.set_34")}}</text>
					</u-checkbox>
					<router-link :to="{path: '/bundle/pages/server_explan/server_explan', query: {type: 3}}">
						<text class="primary sm blue">《{{this.$t('settled.set_35')}}》</text>
					</router-link>
				</view>

				<!-- 提交申请 -->
				<view style="padding: 30rpx 20rpx 30rpx 0;">
					<button type="primary" size="lg" class="br60" @tap="onSubmit">{{this.$t('settled.set_36')}}</button>
				</view>

				<!-- 查阅记录 -->
				<!-- <router-link to="/bundle/pages/settled_recode/settled_recode">
					<view class="flex row-center muted">
						<u-icon name="order" size="32" />
						<view class="m-l-10">{{this.$t('查看提交记录')}}</view>
					</view>
				</router-link> -->
			</view>
		</view>
		<u-select v-model="showPop" mode="single-column" value-name="id" label-name="name" :list="shopCategory"
			@confirm="confirmSelect"></u-select>
	</view>
</template>

<script>
	// import {
	// 	getShopCategory,
	// 	shopApply
	// } from "@/api/shop"

	import {
		baseURL
	} from '@/config/app'
	import {
		sendSms,
		approveConfig,
		shopApply
	} from '@/api/app'
	import {
		toast
	} from '@/utils/tools'
	// import {
	// 	SMSType
	// } from '@/utils/type'
	export default {
		data() {
			return {
				isAgree: false,
				// 表单数据
				form: {
					store_name: "",
					address: "",
					phone: "",
					real_name: "",
					account: "",
					password: "",
					code: "",
					country: "",
					whatsapp: "",
					monthly_income: "",
					invite_code: ''
				},
				codeTips: '',
				shopCategory: [],
				showPop: false,
				action: baseURL + "/shopapi/file/formimage",
				fileList: [],
				approveConfigData: '',
				logo: []
			}
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('settled.set_37')
			});
		},
		onLoad() {
			// this.getShopCategoryFun()
			this.approveConfigfn()

		},
		methods: {
			back(){
				uni.redirectTo({
					url: '/pages/user/user'
				})
			},
			fail(err) {},
			async getShopCategoryFun() {
				const {
					code,
					data
				} = await getShopCategory()
				if (code == 1) {
					this.shopCategory = data
				}
			},
			async approveConfigfn() {
				console.log('sssss')

				try {
					await approveConfig().then(res => {
						this.approveConfigData = res.data
					})
				} catch (e) {
					console.log(e)
					//TODO handle the exception
				}

			},
			sendSmsFun() {
				if (!this.$refs.uCode.canGetCode) return
				if (!this.form.mobile) {
					toast({
						title: this.$t('settled.set_38')
					})
					return;
				}
				sendSms({
					mobile: this.form.mobile,
					key: SMSType.SJSQYZ
				}).then(res => {
					if (res.code == 1) {
						toast({
							title: res.msg
						});
						this.$refs.uCode.start();
					}
				})
			},
			codeChange(tip) {
				this.codeTips = tip
			},
			// 提交表单
			async onSubmit() {
				uni.showLoading();
				const {
					form,
					isAgree,
					fileList,
					logo
				} = this
				if (fileList.length < 2) {
					console.log(fileList.length, 'eeeeee')
					return toast({
						title: this.$t('settled.set_39')
					})
				} else {
					form.img1 = fileList[0]
					form.img2 = fileList[1]
					// form.img3 = fileList[2]
				}
				if (logo.length > 1) {

					return toast({
						title: this.$t('settled.set_40')
					})
				} else {
					form.logo = logo[0]
				}
				// delete submitObj.clabel
				if (!isAgree) return toast({
					title: this.$t('settled.set_41')
				})
				const submitObj = {
					...form,
					// 	license: fileList
				}
				await shopApply(submitObj).then(res => {
					if(res.code == 1){
						setTimeout(() => {
							this.$Router.replace({
								path: '/bundle/pages/settled_result/settled_result',
								query: {
									id: res.data.id
								}
							})
						}, 1000)
					}else{
						toast({
							title: res.msg
						})
					}
					uni.hideLoading()
				}).catch((err)=>{
					uni.hideLoading()
				})
			},
			confirmSelect(e) {
				const {
					value,
					label
				} = e[0]
				this.form.cid = value
				this.form.clabel = label
			},
			onSuccess(data) {
				if(data.code!=1){
					toast({
						title: data.msg
					})
					return
				}
				this.fileList.push(data.data.base_uri)
			},
			onRemove(index) {
				this.fileList.splice(index, 1)
			},
			onSuccess3(data) {
				if(data.code!=1){
					toast({
						title: data.msg
					})
					return
				}
				this.fileList.push(data.data.base_uri)
			},
			onRemove3(index) {
				this.fileList.splice(index, 1)
			},
			onSuccess2(data) {				
				if(data.code!=1){
					toast({
						title: data.msg
					})
					return
				}
				this.logo.push(data.data.base_uri)
			},
			onRemove2(index, lists, name) {
				this.logo.splice(index, 1)

			},
			beforeUpload(list, file) {
				// 允许上传的图片格式
				const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
				const isAllowed = allowedTypes.includes(file[0].file.type);
				if (!isAllowed) {
					this.logo = [];
					uni.showToast({
						title: this.$t('settled.set_42'),
						icon: 'none',
					});
					return true; // 不允许上传
				}
				return false; // 允许上传
			}
		},

	}
</script>

<style lang="scss">
	.nav {
		width: 100%;
		height: 88rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 32rpx 32rpx 0 32rpx;
		// background-color: #74C2FF;
	}
	.nav .text {
		font-size: 36rpx;
		color: #000;
	}
	.store-settled {
		background-color: #74C2FF;
		min-height: 100vh;
		background-image: url('../../static/images/store_recruitment_bg.png');
		background-repeat: no-repeat;
		background-size: 100% auto;
		overflow: hidden;

		.content {
			margin-top: 320rpx;
			padding: 0 20rpx 31rpx;

			.apply-form {
				border-radius: 8px;
				padding: 20rpx 0 30rpx 26rpx;

				.apply-form-item {
					.send-code-btn {
						height: 56rpx;
						width: 188rpx;
						border: 1rpx solid $-color-primary;
					}
				}

				.primary-btn {
					width: 100%;
					height: 88rpx;
					background-color: $-color-primary;
				}
			}
		}

		// .pop-categories {
		// 	.reason-item {
		// 		padding: 24rpx 20rpx;

		// 		.reason-desc {
		// 			line-height: 46rpx;
		// 		}
		// 	}
		// }
		.blue{
			color: #007aff;
		}
	}
</style>