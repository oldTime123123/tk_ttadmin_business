<template>
	<view style="background-color: #EDEFF2;">

		<view class="between navStyle" style="height: 88rpx; padding: 0 31rpx;" @click="bakc">
			<view style="width: 48rpx;height: 48rpx;">
				<image src="../../../static/themeNum1/icon/back.png" style="width: 100%;height: 100%;"></image>
				<!-- 				<IconFont name="rect-right" color="#fff"></IconFont> -->
			</view>
			<view class="f36  text_white textHiddenOne center" style="font-weight: 600;width: 70%;height: 100%; ">
				{{ $t('bus_wallet.bw7') }}
			</view>
			<view style="width: 32rpx;height: 34rpx;margin-right: 32rpx;">

			</view>
		</view>
		<view class="pdlr32">
			<view class="mt32">
				<!-- top4 -->
				<view class="top_box text_center">

					<view class=" ">

						<view class="iTitle" style="margin-left: 15px;margin-bottom: 12rpx;"
							@click="copyText(bankInfo.bank_user)">
							{{ $t('bus_wallet.bw15') }}
						</view>
						<view class="items  " style="justify-content:space-between;">
							<view>{{ bankInfo.bank_user }}
							</view>
							<view class="copyBtn flex-center " @click="copyText(bankInfo.bank_user)">
								<image src="../../static/images/copy.png" style="width: 28rpx;height: 28rpx;"></image>
							</view>
						</view>


						<view class="iTitle" style="margin-left: 15px;margin-bottom: 12rpx;">
							{{ $t('bus_wallet.bw16') }}
						</view>

						<view class="items" style="justify-content:space-between">
							<view>{{ bankInfo.bank_name }}</view>
							<view class="copyBtn flex-center ">
								<image src="../../static/images/copy.png" style="width: 28rpx;height: 28rpx;"></image>
							</view>
						</view>


						<view class="iTitle " style="margin-left: 15px;margin-bottom: 12rpx;">{{ $t('bus_wallet.bw17') }}</view>

						<view class="items" style="justify-content:space-between">
							<view>{{ bankInfo.bank_code }}</view>
							<view class="copyBtn flex-center ">
								<image src="../../static/images/copy.png" style="width: 28rpx;height: 28rpx;"></image>
							</view>
						</view>

					</view>
				</view>
			</view>
			<view class=" mt40">


				<view class="title2 mt40">
					{{ $t('bus_wallet.bw12') }}
				</view>
				<view class="list-item between mt20">
					<input type="text" class="inp" style="margin-left: 0rpx;" v-model="rechargeNumber"
						:placeholder="$t('bus_wallet.bw12')">
				</view>

				<view class="mt20">
					{{ $t('tk_wr.r_r17') }} {{currency}}{{bankInfo.min}} ~ {{currency}}{{bankInfo.max}}
				</view>


				<view class="title2 mt50">
					{{ $t('bus_wallet.bw18') }}
				</view>

				<view class="mt34 flex uploader" style="position: relative;">

					<image v-if="!two_submit" :src="`${url}/${qiLimg}`" style="width: 80px;height: 80px;"></image>
					<image v-if="!two_submit" src="../../../static/images/x2.png"
						style="width: 15px;height: 15px;position: absolute;left: 72px;top:-8px;"
						@click="defalteImgCahange"></image>
					<u-upload v-else :file-list="fileList" :action="action" :header="header" max-count="1" width="160" :upload-text="$t('tk_wr.r_r18')"
						height="160" :show-progress="false" @on-success="onSuccess"></u-upload>
					<!-- <view class="" v-if="showImg" style="position: absolute; left: 0;">
						<image :src="bankInfo.upload_host+ formData.cert"
							style="width: 100%;height: 290rpx;border-radius: 20rpx;">
						</image>
					</view> -->

					<!-- 	<nut-icon name="close-little" v-if="showImg" size="15"
						style="position: absolute; top: -10rpx;left: 180rpx;" color="#fff" @click="clearImg"></nut-icon> -->
				</view>

				<view class="btn" @click="rechargeSubmit">
					{{ $t('bus_zc.zc_a17') }}
				</view>

			</view>

		</view>

		<view style="height: 100rpx;"></view>



	</view>


</template>

<script>
	import request from '@/utils/request'
	import {
		baseURL
	} from "@/config/app.js";
	import store from '@/store'

	export default {
		data() {
			return {
				messBoxmBa: [],
				time: undefined,
				socket: undefined,
				qcdsq: undefined,

				nameInd: -1,
				numInd: -1,
				wayInd: -1,
				bankNameList: [],
				user: {},
				pageData: {},
				inpVal: "",
				currency: '',
				locale: '',
				bankInfo: "",
				fileList: [],
				action: baseURL + "/shopapi/file/formimage",
				header: {
					token: store.getters.token
				},
				cert: "",
				two_submit: true,
				qiLimg: '',
				url: baseURL,
				typeId: '',
				rechargeNumber: ''
			}
		},
		onLoad() {
			this.currency = uni.getStorageSync('currency')
			this.getData();
		},

		methods: {
			rechargeSubmit() {
				request({
					url: "shop/offlineRecharge",
					method: "POST",
					data: {
						bank_id: this.typeId,
						amount: this.rechargeNumber,
						cert: this.cert
					}
				}).then(res => {
					this.$toast({title: res.msg})
					if(res.code==1){
						setTimeout(() => {
							history.back()
						}, 1000);
					}
				}).catch(err => {
					this.$toast({
						title: err
					})
				})
			},

			onSuccess(e) {
				console.log(e)
				this.cert = e.data.base_uri


			},
			onRemove(index) {
				this.fileList.splice(index, 1)
				console.log(index)
			},
			defalteImgCahange() {
				this.two_submit = true;
			},
			bakc() {
				history.back()
			},
			doun() {
				this.qcdsq = setInterval(() => {
					this.messBoxmRo.shift()
				}, 4000)
			},
			back() {
				clearInterval(this.qcdsq);
				clearInterval(this.time);
				uni.redirectTo({
					url: '/bundle/pages/user_wallet/addRecharge'
				})
			},
			inpHandle(e) {

				if (this.nameInd == -1) {
					return false
				} else {
					this.bankNameList[this.nameInd].buttons.forEach((item, index) => {
						if (item !== e.detail.value) {
							this.numInd = -1
						}
					})
				}
			},
			changeInpVal(index, item) {
				this.numInd = index
				this.inpVal = item
			},
			getData() {
				request({
					url: 'shop/offlineRechargeInfo',
					methods: 'get',
				}).then(res => {
					this.$toast({title: res.msg});
					if(res.code==1){
						if(res.data){
							this.rechargeNumber = res.data.order.amount;
							this.qiLimg = res.data.order.cert;
							this.two_submit = false;
							this.cert = res.data.order.cert;
							this.bankInfo = res.data.way.way;
							this.bankNameList = res.data.channels;
							this.user = res.data.user;
							this.typeId = res.data.way.way.id;
						}
					}
				})
			},

			submitHandle() {
				if (!this.inpVal) {
					this.$toast({
						title: this.$t('tk_ad.b_b3')
					})
					return false
				}
				if (this.nameInd == -1) {
					this.$toast({
						title: this.$t('tk_ad.b_b1')
					})
					return false
				}
				if (this.bankNameList[this.nameInd].way.length > 0 && this.wayInd == -1) {
					this.$toast({
						title: this.$t('tk_ad.b_b2')
					})
					return false
				}
				const formData = {
					amount: this.inpVal,
					channelId: this.bankNameList[this.nameInd].id,
					way: this.bankNameList[this.nameInd].way.length > 0 ? this.bankNameList[this.nameInd].way[this
						.wayInd].id : 0
				}
				request({
					url: '/finance/bank/recharge/submit',
					method: "POST",
					data: formData
				}).then(res => {
					this.$toast({title: res.msg});
					if(res.code==1){
						let data = res.data;
						if (data.is_post == 0) {
							window.location.href = data.native_url;
						} else if (data.is_post == 1) {
							const div = document.createElement('div');
							let inputHtml = "";
							let params = data.params;
							for (let key in data.params) {
								inputHtml += `<input name="${key}" value="${params[key]}" type="hidden" />`;
							}
							let myHtml = `<form method="post" action='${native_url}'>
															${inputHtml}
														</form>`;
							div.innerHTML = myHtml;
							document.body.appendChild(div);
							document.forms[0].submit();
						} else if (data.is_post == 2) {
							uni.navigateTo({
								url: "/pages/clabe/clabe?clabe=" + data.native_url + "&amount=" + data
									.verify_money
							})
						}
					}
				}).catch(err => {
					this.$toast({
						title: err
					})
				})
			},

		}

	}
</script>

<style scoped>
	.qrcode {
		background-color: #FFFF;
		width: 350rpx;
		height: 350rpx;
		border-radius: 25rpx;
	}

	.title {
		font-weight: 700;
		font-size: 30rpx;
		color: #00a609;
		margin-bottom: 12rpx;
		text-align: center;
	}

	.title1 {
		font-size: 28rpx;
		margin-bottom: 30rpx;
		text-align: center;
	}

	.title2 {
		font-size: 28rpx;
		margin-bottom: 20rpx;
	}

	.inp {
		background-color: #fff;
		width: 100%;
		height: 100%;
		border-radius: 16rpx;
		border: 4rpx solid #F5F6FE;
		box-sizing: border-box;
		padding: 0rpx 30rpx;
	}

	.list-item {
		height: 112rpx;
		display: flex;
		align-items: center;
		border-radius: 1.6vw;


		.left {
			width: 80%;

			.flex-col {
				.top {
					color: #6491e9
				}
			}

		}
	}

	.btn {
		width: 100%;
		height: 13.33333vw;
		line-height: 13.33333vw;
		text-align: center;
		background: #3FAFF9;
		color: #fff;
		border-radius: 2.13333vw;
		margin: 8vw auto;
		font-size: 4vw;
		font-weight: 186.66667vw;
	}

	.bten {
		position: absolute;
		top: 32rpx;
		left: 50%;
		z-index: 9990;
		margin-left: -165px;

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


	}


	.iTitle {
		width: 250rpx;
		text-align: left;
		font-size: 24rpx;
	}

	.copyBtn {
		padding: 10rpx 30rpx;
		background-color: #3FAFF9;
		border-radius: 10rpx;
		color: #fff;

	}

	.btns {
		width: 100%;
		height: 2.5rem;
		border-radius: 0.25rem;
		color: #fff;
		line-height: 2.5rem;
		text-align: center;
	}

	.top_box {
		padding: 32rpx;
		background-color: #fff;
		border-radius: 30rpx;

		.items {
			display: flex;
			align-items: center;
			font-size: 24rpx;
			background-color: #F7F3FF;
			margin-bottom: 24rpx;
			border-radius: 20rpx;
			padding: 30rpx;



			view {
				word-break: break-all;
			}
		}

		.flex-wrap {
			flex-wrap: wrap;
		}
	}

	.addressBox {
		margin-top: 40rpx;
		display: flex;
		align-items: center;
		flex-direction: column;
		padding: 27rpx 71rpx 48rpx 71rpx;
		border-radius: 30rpx;
		background-color: #fff;

		.typeItem {
			padding: 14rpx 32rpx;
			border-radius: 10rpx;
			border: 1rpx solid #eee;
		}

		.addEl {
			color: #FFA115;
			height: 60rpx;
			background: #FFF8EB;
			border-radius: 10rpx;
			text-align: center;
			line-height: 60rpx;
			width: 100%;
		}
	}

	.wrapper {
		display: flex;
		height: 100%;
		justify-content: center;
		padding: 0 50rpx;

		.content {
			margin-top: 400rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
			height: 350rpx;
			background: #fff;
			border-radius: 30rpx;
			padding-top: 50rpx;
			position: relative;
			overflow: hidden;

			.between {
				position: absolute;
				bottom: 0;
				width: calc(100% - 80rpx);
				padding: 0 30rpx 40rpx;

				view {
					width: 48%;
					height: 100rpx;
					color: #fff;
					text-align: center;
					line-height: 100rpx;
					font-size: 30rpx;
					border-radius: 20rpx
				}
			}
		}
	}
</style>