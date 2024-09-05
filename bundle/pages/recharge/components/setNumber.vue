<template>
	<view style="background-color: #EDEFF2;min-height: 100vh">
		<view class="between navStyle" style="height: 88rpx; padding: 0 31rpx;" @click="back">
			<view style="width: 48rpx;height: 48rpx;">
				<image src="/static/themeNum1/icon/back.png" style="width: 100%;height: 100%;"></image>
				<!-- 				<IconFont name="rect-right" color="#fff"></IconFont> -->
			</view>
			<view class="f36  text_white textHiddenOne center" style="font-weight: 600;width: 70%;height: 100%; ">
				{{ $t('bus_wallet.bw7') }}
			</view>
			<view style="width: 32rpx;height: 34rpx;margin-right: 32rpx;">

			</view>
		</view>
		<view class="pdlr32 mt40">
			<view class="">{{ $t('bus_wallet.bw8') }}</view>
			<view class="list-item between mt20" style="background-color: #fff;">
				<SelectDown ref="select" :placeholder="$t('bus_wallet.bw8')" @propChange="propChange" :list="codeList">
				</SelectDown>
			</view>

			<view class="mt30">{{ $t('bus_wallet.bw9') }}</view>
			<view class="list-item between mt20" style="background-color: #fff;">
				<SelectDown ref="select2" :placeholder="$t('bus_wallet.bw9')" @propChange="propChange2" :list="codeList2">
				</SelectDown>
			</view>



			<view class=" mt40" v-show="changeInfo">
				<view class="mt30">{{ $t('bus_wallet.bw10') }}</view>


				<view class="list-item flex mt20" style="background-color: #fff;justify-content: space-evenly;">
					<input :disabled="true" :value="pageData.address" type="text" class="inp" :placeholder="$t('bus_wallet.bw10')"
						style="margin-left: 0rpx;width: 75%;">
					<view class=""
						style="background-color: #3FAFF9;box-sizing: border-box;padding: 5px;border-radius: 5px;"
						@click="copy(pageData.address)">
						<view class="copyBtn flex-center ">
							<image src="../../../static/images/copy.png" style="width: 28rpx;height: 28rpx;"></image>
						</view>
					</view>
				</view>
				<view class="center mt40">
					<view class="qrcode center">
						<vue-qr :size="182" :text="pageData.address|| ''"></vue-qr>
					</view>
				</view>
				<view class=" title mt10">
					{{ $t('bus_wallet.bw11') }}
				</view>


				<view class="title2 mt40">
					{{ $t('bus_wallet.bw12') }}
				</view>
				<view class="list-item between mt20">
					<input type="text" class="inp" v-model="rechargeNumber" :placeholder="$t('bus_wallet.bw12')"
						style="margin-left: 0rpx;box-sizing: border-box;padding: 0rpx 30rpx;">
				</view>
				<view class="mt20">
					{{ $t('bus_wallet.bw13') }} {{pageData.min}} ~ {{pageData.max}}
				</view>
				<view class="mt20">
					≈{{(rate*rechargeNumber).toFixed(6)}} {{propChange_one}}
				</view>

				<view class="title2 mt50">
					{{ $t('bus_wallet.bw14') }}
				</view>

				<view class="mt34 flex uploader" style="position: relative;width: 104px;height: 104px;">

					<image v-if="!two_submit" :src="`${url}/${qiLimg}`" style="width: 80px;height: 80px;"></image>
					<image v-if="!two_submit" src="../../../../static/images/x2.png"
						style="width: 15px;height: 15px;position: absolute;right: 13px;top:3px;"
						@click="defalteImgCahange"></image>
					<u-upload v-else :file-list="fileList" :action="action" :header="header" max-count="1" width="160" :upload-text="$t('tk_wr.r_r18')"
						height="160" :show-progress="false" @on-success="onSuccess" @on-remove="onRemove"></u-upload>

				</view>


				<view class="btn" @click="rechargeSubmit" :style="{background: this.cert?'#3FAFF9':'#9c9898'}">
					{{ $t('bus_zc.zc_a17') }}
				</view>

			</view>

			<view style="height: 100rpx;"></view>

		</view>


	<!-- </view> -->


	</view>




</template>

<script>
	import VueQr from 'vue-qr';
	import request from '@/utils/request'
	import SelectDown from '@/components/SelectDown.vue'
	import {
		baseURL
	} from "@/config/app.js";
	import store from '@/store'
	import { copy } from "@/utils/tools.js";
	export default {
		components: {
			VueQr,
			SelectDown
		},

		data() {
			return {
				isVisible: false,
				tableList: [],
				showList_two: false,
				BankNamecolumns_one: [],
				BankNamecolumns_two: [],
				showList_one: true,
				currencyName: "",
				showList_two: "",
				currencyPact: "",
				changeInfo: false,
				pageData: {},
				address: 'fsdfsdf',
				formData: {},
				rechargeNumber: '',

				codeList: [],
				codeList2: [],
				typeId: "",
				defalteImg: true,
				fileList: [],
				action: baseURL + "/shopapi/file/formimage",
				header: {
					token: store.getters.token
				},
				cert: "",
				two_submit: false,
				qiLimg: '',
				url: baseURL,
				propChange_one:'',
				rate: 0




			}
		},
		methods: {
			onSuccess(e) {
				console.log(e)
				this.cert = e.data.base_uri


			},
			onRemove(index) {
				this.fileList.splice(index, 1);
				this.cert = '';
				console.log(index)
			},
			defalteImgCahange() {
				this.cert = '';
				this.two_submit = true;
			},
			propChange(data) {
				this.codeList2 = [];
				this.fileList = [];
				this.cert = '';
				this.$refs.select2.$data.text = '';
				this.changeInfo = false;
				this.productWayList.forEach(item => {
					if (item.currency == data) {
						this.codeList2.push(item.pact)
						this.propChange_one = item.currency
					}
				})

			},
			propChange2(data) {
				this.changeInfo = false;
				this.fileList = [];
				this.cert = '';
				this.productWayList.forEach(item => {
					if (item.pact == data && item.currency == this.propChange_one) {
						this.typeId = item.type
						this.productRechargeIndex(this.typeId)
					}
				})
			},
			productRechargeIndex(id) {
				uni.showLoading()
				request({
					url: 'shop/productRechargeIndex',
					methods: 'get',
					data: {
						type: id
					}
				}).then(res => {
					if(res.code==1){
						this.pageData = res.data
						if (res.data.order) {
							this.two_submit = false
							this.rechargeNumber = res.data.order.amount
							this.qiLimg = res.data.order.cert
							this.cert = res.data.order.cert
							uni.hideLoading()


						} else {
							this.two_submit = true;
							this.rechargeNumber = "";
							this.rate = res.data.rate;
							uni.hideLoading()

						}
						this.changeInfo = true
					}
					uni.hideLoading()
				}).catch(err => {

				})
			},

			closeSwitch(param) {
				this[`${param}`] = false;
			},
			confirmOne() {

			},
			change() {

			},
			rechargeSubmit() {
				if(!this.rechargeNumber){
					this.$toast({
						title: this.$t('bus_wallet.bw12')
					})
					return
				}
				if(!this.cert){
					this.$toast({
						title: this.$t('bus_zc.l_l56')
					})
					return
				}
				
				request({
					url: "shop/productRecharge",
					method: "POST",
					data: {
						type: this.typeId,
						amount: this.rechargeNumber,
						cert: this.cert
					}
				}).then(res => {
					this.$toast({title: res.msg});
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
			copy(content) {
				copy(content);
				uni.showToast({
                    title: this.$t('tk_ck.a_c4')
                })
			},
			back() {
				history.back()
			},
			productWayAPi() {
				request({
					url: 'shop/productWay',
					methods: 'get',
				}).then(res => {
					if(res.code==1&&res.data){
						const currencyList = [];
						res.data.recharge_type.forEach((item, index) => {
							if (!currencyList.includes(item.currency)) {
								currencyList.push(item.currency)
							}
						})
						this.codeList = currencyList
						this.productWayList = res.data.recharge_type
					}
				}).catch(err => {

				})
			},
			getData() {
				this.productWayAPi()
			}
		},
		onLoad() {
			this.getData()
		}
	}
</script>

<style lang="scss">
	.btn {
		width: 100%;
		height: 13.33333vw;
		line-height: 13.33333vw;
		// padding: 0 9.33333vw;
		text-align: center;
		color: #fff;
		border-radius: 2.13333vw;
		margin: 8vw auto;
		font-size: 4vw;
		font-weight: 186.66667vw;
	}


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

	.address {
		background-color: #13141d;
		box-sizing: border-box;
		padding: 40rpx 32rpx;
		border-radius: 2.13333vw;
		margin-bottom: 20rpx;

		.addrss {
			flex: none;
			max-width: 72vw;
			word-wrap: break-word;
			padding-right: 2.66667vw;
			color: #fff;
			margin-right: auto;
			display: flex;
			flex-direction: column;
			font-size: 3.2vw;
		}

		.copy {
			color: #00a609;
			font-size: 28rpx;
		}
	}

	.number {
		box-sizing: border-box;
		padding: 0rpx 30rpx;
		background-color: #0a0a0f;
		height: 82rpx;
		margin-bottom: 32rpx;

		.inputSytle {
			height: 82rpx;

		}
	}

	.amount-convert {
		color: #888;
		margin: 0 auto;
		text-align: center;
		margin-bottom: 30rpx;
	}

	.inp {
		background-color: #fff;
		width: 100%;
		height: 100%;
		border-radius: 16rpx;
		// border: 4rpx solid #F5F6FE;
		box-sizing: border-box;
		// 	padding: 0rpx 150rpx;
	}

	.list-item {
		height: 112rpx;
		// padding: 0 2.66667vw;
		display: flex;
		align-items: center;
		border-radius: 15rpx;

		// border: 1px solid $data-bg19;
		// background: $data-bg-main;
		.left {
			width: 80%;

			.flex-col {
				.top {
					color: #6491e9
				}
			}

		}
	}
</style>