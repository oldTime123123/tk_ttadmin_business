<template>
	<view>


		<view class="between navStyle" style="height: 88rpx; padding: 0 31rpx;" @click="back">
			<view style="width: 48rpx;height: 48rpx;">
				<image src="../../../static/themeNum1/icon/back.png" style="width: 100%;height: 100%;"></image>
				<!-- 				<IconFont name="rect-right" color="#fff"></IconFont> -->
			</view>
			<view class="f36  text_white textHiddenOne center" style="font-weight: 600;width: 70%;height: 100%; ">
				{{ $t('tk_wa.wa_a7') }}
			</view>
			<view style="width: 32rpx;height: 34rpx;margin-right: 32rpx;">

			</view>
		</view>
		<view class="pdlr50 pt33 pb50 ">


			<view class="mt55">
				<view class="topBox center flex-col">
					<view class="topItem f26">{{ $t('bus_wallet.bw19') }}</view>


					<view class="mt35 f45"> {{pageData.balance}} {{currency}}</view>

					<!-- <view class="mt28 f26 withdrawAll" :style="{color:store.$state.contentColor}"
						@click="inputNum = pageData.balance_max">{{t('wr.w_a3')}}</view> -->
				</view>

				<view class=" mt32">
					<view class="">{{ $t('bus_wallet.bw8') }}</view>


					<view class="list-item between mt20">
						<SelectDown ref="select" :placeholder="$t('bus_wallet.bw8')" @propChange="propChange" :list="codeList">
						</SelectDown>
					</view>
					<view class="f24 mt12" style="color: #adadad;" v-show="withdrawAll.max">
						{{withdrawAll.max}} {{textDw}}
					</view>
					<view class="mt30"> {{ $t('bus_wallet.bw9') }}</view>
					<view class="list-item between mt20">
						<SelectDown :placeholder="$t('bus_wallet.bw9')" ref="select2" @propChange="propChange2"
							:list="codeList2"></SelectDown>
					</view>
					<view class="mt30">
						<view class="">{{ $t('bus_wallet.bw22') }}</view>
						<view class="list-item between mt20">
							<SelectDown v-if="!isShowGoAddress" :placeholder="$t('bus_wallet.bw22')"
								ref="select3" @propChange="propChange3" :list="codeList3"></SelectDown> 
							<view v-else class="isShowGoAddress" @click.stop="goAddress">
								{{ $t('bus_wallet.bw28') }}
							</view>
						</view>

					</view>

				</view>



				<view class="" v-if="codeList3Show">
					<view class="notice " dir="ltr">
						<view class="notic">
							{{ $t('bus_wallet.bw24') }}:{{topNotice||0}}
						</view>

					</view>
					<view class="mainBox">
						<view class="withTitle" :style="choStyle">{{ $t('bus_wallet.bw29') }}</view>
						<view class="flex mt70">
							<view class="short">{{currency}}</view>
							<input type="text" placeholder-class="plo" v-model="inputNum" focus
								:placeholder="'Please enter the num'">
							<!-- <view class="embody">
								<view class="all_embody" @click="allEmbody">
									{{t('add2.t_t9')}}
								</view>
							</view> -->
						</view>


						<view style="margin-top: 0px;" class="flex mt30">
							<view class="short">USDT</view>
							<input type="text" :disabled="true" :value="(inputNum * u_rate).toFixed(2)"
								style="color: #3FAFF9;">
						</view>

						<view class="mt44">
							<view class="tips">
								{{ $t('bus_wallet.bw25') }} : {{min+currency}} -
								{{max+currency}}
							</view>
						</view>
					</view>
					<!-- 
					<view class="mt34 otpEl" style="background-color: #fff;">
						<input :disabled="true" v-model="currencyName" placeholder="Please select currency" type="text"
							class="inp">
						<image @click="showList=true" v-if="pageData.user_link?.length"
							src="../../static/bedAnd/dropdown.png" mode="aspectFit" class="otpImg"
							style="width: 28upx; height: 28upx;">
						</image>
						<view class="otp" v-else @click="changePage('../mine/BindUSDT')">
							{{t('wr.w_u5')}}
						</view>
					
					</view> -->



					<!-- <view class="mt38">
						<view class="f30 between">
							<view class="">
								{{t('wr.w_u3')}}
							</view>
					
						</view>
						<view class="mt34 otpEl">
							<input class="inp" placeholder-class="plo" :placeholder="t('wr.w_u4')" :disabled="true"
								:value="userAddress">
							<view class="otp" v-if="!userAddress" @click="changePage('../mine/BindUSDT')">
								{{t('wr.w_u5')}}
							</view>
						</view>
					</view> -->

					<view class="mt38">
						<view class="f30">{{ $t('bus_wallet.bw26') }}</view>
						<view class="mt34  passwordInp" v-if="!showInp">
							<input class="inp " type="safe-password" placeholder-class="plo" password="true"
								v-model="fundPwd" :placeholder="$t('bus_wallet.bw26')" v-if="showNewPwd1">
							<input class="inp " placeholder-class="plo" type="safe-password" v-model="fundPwd"
								:placeholder="$t('bus_wallet.bw26')" v-else>
							<image v-if="showNewPwd1" src="../../static/images/eyeclose.png" class="pwdEye"
								style="width: 40rpx;height: 40rpx;" @click="openPwdHandle('showNewPwd1')">
							</image>
							<image v-else src="../../static/images/eyeclose.png" class="pwdEye openEye"
								style="width: 40rpx;height: 40rpx;" @click="openPwdHandle('showNewPwd1')">
							</image>
						</view>
						<view class="mt34  passwordInp otpEl" v-else>
							<input class="inp " placeholder-class="plo" type="safe-password" password="true"
								:disabled="true" placeholder="fsdfsd">
							<view class="otp">
							</view>
						</view>


						<view class="btns" :style="choStyle" @click.top="submitHandle">
							{{ $t('bus_wallet.bw27') }}
						</view>

						<view class="mt70 " v-html="pageData.description" style="color: #000;"></view>
					</view>
				</view>

			</view>
		</view>
		<nut-picker v-model:visible="showList" :columns="BankNamecolumns" @change="change" @confirm="confirmAddress">
		</nut-picker>
	</view>
</template>

<script>
	import SelectDown from '@/components/SelectDown.vue'
	import request from '@/utils/request'

	export default {
		components: {
			SelectDown
		},
		data() {
			return {
				showImg: false,
				pageData: {
					user: {
						balance: ""
					}
				},
				currency: "",
				codeList: [],
				withdrawAll: "",
				codeList2: [],
				choStyle: {
					background: "#3FAFF9",
					color: '#fff'
				},
				showNewPwd1: true,
				showNewPwd2: true,
				fundPwd: "",
				showInp: false,
				BankNamecolumns: [],
				addressType: '',
				address: "",
				mainBox: false,
				u_rate: "",
				showList: false,
				userAddress: '',
				currencyName: "",
				inputNum: "",
				topNotice: "",
				bankcardId: "",
				min: "",
				max: '',
				codeList3Show: '',
				isShowGoAddress: false,
				textDw: "",
				typeIndex: "",
				select: "",
				select3: "",
				select2: "",
				tagInput: "",
				codeList: [],
				codeList2: [],
				codeList3: [],
				selectList: [],
				tableList: [],
				productWayList: [],
				currency: 'USDT',
				watchList: "",
				newId: "",
				propChange_one:''

			}
		},
		methods: {
			openPwdHandle(type) {
				if (type == 'showOld') {
					this.showOld = !this.showOld
				} else if (type == 'showNewPwd1') {
					this.showNewPwd1 = !this.showNewPwd1
				} else if (type == 'showNewPwd2') {
					this.showNewPwd2 = !this.showNewPwd2
				}
			},
			submitHandle() {
				request({
					url: "shop/productWithdraw",
					method: 'POST',
					data: {
						bankcardId: this.newId,
						amount: this.inputNum
					}
				}).then(res => {
					this.$toast({title: this.$t('bus_ord.od_a30')})
					setTimeout(() => {
						history.back()
					}, 1000);
					// this.emailValue = res.email
				}).catch(err => {
					this.$toast({
						title: err.message
					})
				})
			},
			goAddress() {
				uni.navigateTo({
					url: "/pages/BindUSDT/BindUSDT",
				})
			},
			getData() {
				request({
					url: "shop/getwalletInfo",
					methods: 'get',
				}).then(res => {
					this.pageData = res.data
					// this.emailValue = res.email
				}).catch(err => {
					this.$toast({
						title: err.message
					})
				})
			},
			propChange(data) {
				this.codeList2 = [];
				this.$refs.select2.$data.text = '';
				this.codeList3 = [];
				this.isShowGoAddress = false;
				this.$refs.select3?this.$refs.select3.$data.text = '':'';
				this.codeList3Show = false;
				this.productWayList.forEach(item => {
					if (item.currency == data) {
						this.codeList2.push(item.pact)
						this.propChange_one = item.currency
					}
				})

			},
			propChange2(data) {
				this.codeList3 = [];
				this.isShowGoAddress = false;
				this.$refs.select3?this.$refs.select3.$data.text = '':'';
				this.codeList3Show = false;
				this.productWayList.forEach(item => {
					if (item.pact == data && item.currency == this.propChange_one) {
						this.typeId = item.type
						this.productRechargeIndex(this.typeId)
					}
				})
			},
			propChange3(data) {
				this.codeList3Show = true
				if(this.watchList.user_link.length>0){
					this.watchList.user_link.forEach(item => {
						if (item.address == data) {
							this.newId = item.id
							this.watchList.select.forEach(index => {
								if (index.type == item.type) {
									this.min = index.min
									this.max = index.max
									this.topNotice = index.percent_fee || 0
									this.u_rate = index.exchange_rate

								}
							})
						}
					})
				}

			},
			productRechargeIndex(id) {
				uni.showLoading()
				request({
					url: 'shop/productWithdrawInfo',
					methods: 'get',
					data: {
						type: id
					}
				}).then(res => {
					this.watchList = res.data
					if (res.data.user_link && res.data.user_link.length > 0) {
						res.data.user_link.forEach(m => {
							this.codeList3.push(m.address)
						})
					} 
					if(this.codeList3.length>0){
						this.isShowGoAddress = false
					}else{
						this.isShowGoAddress = true;
					}
					uni.hideLoading()
				}).catch(err => {
					uni.hideLoading()
				})
			},
			productWayAPi() {
				request({
					url: 'shop/productWay',
					methods: 'get',
				}).then(res => {
					const currencyList = []
					res.data.withdraw_list.forEach((item, index) => {
						if (!currencyList.includes(item.currency)) {
							currencyList.push(item.currency)
						}
					})
					this.codeList = currencyList
					this.productWayList = res.data.withdraw_list
				}).catch(err => {

				})
			},
			back() {
				history.back()
			}
		},
		onShow() {
			this.getData();
			this.productWayAPi();
			if(this.typeId){
				this.productRechargeIndex(this.typeId)
			}
			
		}
	}
</script>

<style lang="scss">
	.notic {
		height: 3.5rem !important;
		background: #FFFFFF !important;
		box-shadow: 0 0 0.625rem 0px rgba(17, 24, 35, 0.15);
		border-radius: 1.875rem;
		line-height: 3.5rem;
		font-size: 16px;
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

		.isShowGoAddress {
			color: #ffffff;
			padding: 4px 6px;
			background-color: #3FAFF9;
			border-radius: 10rpx;
		}
	}

	.list-item {
		height: 112rpx;
		// padding: 0 2.66667vw;
		display: flex;
		align-items: center;
		border-radius: 1.6vw;
		background-color: #fff;


		.left {
			width: 80%;

			.flex-col {
				.top {
					color: rgb(127, 86, 217)
				}
			}

		}
	}

	.changer {
		width: 200rpx;
		border: 0.0625rem solid #B0B0B0;
		box-sizing: border-box;
		padding: 10rpx;
		border-radius: 10rpx;
		margin-left: 0.5rem;
	}

	.embody {
		width: 220rpx;
		height: 50rpx;
		text-align: right;
		line-height: 50rpx;
		color: #fff;

		.all_embody {
			display: inline-block;
			border-radius: 12rpx;
			background-color: #3FAFF9;
			font-size: 20rpx;
			padding: 0 20rpx;

		}
	}

	.topBox {
		width: 100%;
		height: 328rpx;
		color: #fff;
		background: url('../../static/images/breBox.png') no-repeat;
		background-size: 100% 100%;
	}

	.withdrawAll {
		padding: 27rpx 36rpx;
		border-radius: 38rpx;
		background: #fff;
	}

	.notice {
		padding: 20rpx 0;
		border-radius: 20rpx;
		margin-top: 34rpx;
		font-size: 28rpx;
	}

	.mainBox {
		margin-top: 36rpx;
		border-radius: 30rpx;
		padding: 32rpx 57rpx;
		font-size: 28rpx;
		background-color: #ffffff;
		position: relative;
		border: 2rpx solid #333333;

		.withTitle {
			position: absolute;
			left: 0;
			top: 0;
			border-radius: 30rpx 0 30rpx 0;
			padding: 33rpx 48rpx;
		}

		.flex {
			display: flex;
			align-items: center;
			border-bottom: 1rpx solid #D0D0D0;
			padding: 30rpx 0;

			.short {
				width: 100rpx;
				text-align: center;
				font-weight: bold;
			}

			input {
				margin-left: 30rpx;
				font-size: 30rpx;
				font-weight: bold;
			}
		}

		.tips {
			background-color: #F0F0F0;
			border-radius: 10rpx;
			padding: 20rpx;
			font-size: 20rpx;
			width: auto;
			color: #848484;
			display: inline-block;
		}
	}

	.btns {
		margin-top: 100rpx;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		border-radius: 15rpx;
		background-color: #3FAFF9 !important;
	}

	.otpEl {
		position: relative;

		.otp {
			position: absolute;
			right: 40rpx;
			top: 50%;
			font-size: 20rpx;
			transform: translateY(-50%);
			padding: 0 10rpx;
			height: 60rpx;
			background: #2A292C;

			border-radius: 10rpx;
			color: #fff;
			text-align: center;
			line-height: 60rpx;
		}

		.otpImg {
			position: absolute;
			right: 40rpx;
			top: 50%;
			transform: translateY(-50%);

		}
	}

	.passwordInp {
		position: relative;

		.pwdEye {
			position: absolute;
			right: 40rpx;
			top: 50%;
			transform: translateY(-50%);
		}

	}

	.inp {
		padding: 32rpx 36rpx;
		background: #fff;
		box-shadow: 0px 1rpx 51rpx 0px rgba(64, 46, 197, 0.05);
		border-radius: 20rpx;
		// color: #3FAFF9;
		font-size: 28rpx;
		box-shadow: 0px 1px 51px 0px rgba(64, 46, 197, 0.05);
		border: 2rpx solid #B0B0B0;

		input {
			width: 100%;
			line-height: 100%;
		}
	}
</style>