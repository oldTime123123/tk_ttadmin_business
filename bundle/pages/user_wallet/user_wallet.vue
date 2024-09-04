<template>
	<view style="height: 100vh;background: #fff;">
		<view class="nav flex pdlr32" @click="back">
			<view class="">
				<image style="width: 44rpx;height: 44rpx;" src="../../../static/images/Frame.png" mode=""></image>
			</view>
			<view class="text">
				{{ $t('tk_wa.wa_a1') }}
			</view>
			<view class="">

			</view>
		</view>
		<view class="background">
		</view>
		<view class="main pdlr32">
			<view class="carPlay">
				<view class="money tCenter">
					{{ currency }} {{ walletInfo.totel_balance }}
				</view>
				<view class="Total tCenter mt15">
					<view style="width: 25px;height: 25px;margin-right: 2px;">
						<image style="width: 100%;height: 100%;" src="../../../static/images/totalWallet.png"></image>
					</view>
					<text>{{ $t('tk_wa.wa_a2') }}</text>
				</view>
				<view class="flex mt24">
					<view class="user_info">
						<view class="num">{{ currency }} {{ walletInfo.balance }} </view>
						<view class="Total" style="line-height: 44rpx;">{{ $t('tk_wa.wa_a3') }}</view>
					</view>
					<!-- <view class="c_line mt30"></view> -->
					<view class="user_info">
						<view class="num">{{ currency }} {{ walletInfo.pendding }} </view>
						<view class="Total">{{ $t('tk_wa.wa_a5') }}<br></view>
					</view>
				</view>
			</view>
			<view class="flex mt44 pdlr32" style="justify-content: space-between;">
				<view style="margin-left: 5px;">
					<view class="Recharge flex-center" @click="goRechangeFun">
						<image style="width: 68rpx;height: 68rpx;margin-right: 8rpx;"
							src="../../../static/images/recharge.png" mode=""></image>
						{{ $t('bus_wallet.bw7') }}
					</view>
				</view>
				<view style="margin-right: 40px">
					<view class="Withdraw flex-center" @click="inputnull">
						<image style="width: 68rpx;height: 68rpx;margin-right: 8rpx;"
							src="../../../static/images/withDraw.png" mode=""></image>
						{{ $t('tk_wa.wa_a7') }}
					</view>
				</view>
			</view>

			<view class="user_js mt40 pdlr32">
				<view class="flex qianb" @click="showBankPop">
					<view class="flex">
						<image style="width: 46rpx;height: 46rpx; margin-right: 8rpx;"
							src="../../../static/images/qianbao.png" mode=""></image>
						<view>
							{{ $t('tk_wa.wa_a8') }}
						</view>
					</view>
					<nut-icon type="right" size="14px"></nut-icon>
				</view>

				<view class="flex qianb" @click="passwordShowfn">
					<view class="flex">
						<image style="width: 46rpx;height: 46rpx; margin-right: 8rpx;"
							src="../../../static/images/yanj.png" mode=""></image>
						<view class="">
							{{ $t('tk_wa.wa_a9') }}
						</view>
					</view>
					<nut-icon type="right" size="14px"></nut-icon>
				</view>

				<!-- <view class="flex qianb" @click="emailBtnShow">
                    <view class="flex">
                        <image style="width: 46rpx;height: 46rpx; margin-right: 8rpx;" src="../../../static/images/email.png"
                            mode=""></image>
                        <view>
                            {{ $t('tk_zc.l_l52') }}
                        </view>
                    </view>
                    <nut-icon type="right" size="14px"></nut-icon>
                </view> -->
				<!-- <view class="flex qianb" @click="gopage">
                    <view class="flex">
                        <image style="width: 46rpx;height: 46rpx; margin-right: 8rpx;"
                            src="../../../static/images/loan1.png" mode=""></image>
                        <view class="">
                            {{ $t('loan.lo_vt11') }}
                        </view>
                    </view>
                    <nut-icon type="right" size="14px"></nut-icon>
                </view> -->
				<view class="flex qianb" @click="RecordBtn">
					<view class="flex">
						<image style="width: 46rpx;height: 46rpx; margin-right: 8rpx;"
							src="../../../static/images/cunk.png" mode=""></image>
						<view>
							{{ $t('tk_zc.l_l60') }}
						</view>
					</view>
					<nut-icon type="right" size="14px"></nut-icon>
				</view>
				<view class="flex qianb" @click="incomeOrExpenditureBtn">
					<view class="flex">
						<image style="width: 46rpx;height: 46rpx; margin-right: 8rpx;"
							src="../../../static/images/srzc.png" mode=""></image>
						<view>
							{{ $t('tk_wa.wa_a10') }}
						</view>
					</view>
					<nut-icon type="right" size="14px"></nut-icon>
				</view>

			</view>
		</view>

		<view v-if="account">
			<nut-popup position="bottom" :style="{ width: '100%', height: '500px',background:'transparent' }"
				v-model:visible="account">
				<view class="pdlr40">
					<view class="box">
						<view class="between">
							<view class="recent">
								<view class="">
									{{ $t('bus_wallet.bw1') }}
								</view>
								<view class="follow">
									{{ accountType=='Recharge'?$t('bus_wallet.bw2'):accountType=='Withdraw'?$t('bus_wallet.bw40'):$t('bus_wallet.bw41') }}
								</view>
							</view>
							<!-- <image @click="depositShow = false" style="width: 58rpx;height: 58rpx;"
								src="./../../static/images/show.png" mode=""></image> -->
						</view>

						<view class="" style="margin-top: 40rpx;">
							<view class="choItem mt38" @click="changeChoosed('usdt')" :style="cType =='usdt'?choStyle:''"
								v-if="showUsdt">
								<view class="flex">
									<image src="../../../static/images/usdt.png" mode="widthFix"
										style="width: 55rpx;height: 55rpx;"></image>
									<view class="mglr49 f28 center">{{ $t('bus_wallet.bw3') }}</view>
								</view>

								<view class="noCho">
									<image src="../../../static/images/choose.png" mode="widthFix"
										style="width: 35rpx;height: 35rpx;" v-if="cType =='usdt'"></image>
								</view>
							</view>

							<!-- <view class="choItem" @click="changeChoosed('bank')" :style="cType =='bank'?choStyle:''"
								v-if="showBank">
								<view class="flex">
									<image src="../../../static/images/bank.png" mode="widthFix"
										style="width: 55rpx;height: 55rpx;"></image>
									<view class="mglr49 f28 center">Bank Card</view>
								</view>
								<view class="noCho">
									<image src="../../../static/images/choosed.png" mode="widthFix"
										style="width: 35rpx;height: 35rpx;" v-if="cType =='bank'"></image>
								</view>
							</view> -->
							<view class="choItem" @click="changeChoosed('offine')" :style="cType =='offine'?choStyle:''"
								v-if="offineBank">
								<view class="flex">
									<image src="../../../static/images/other1.png" mode="widthFix"
										style="width: 55rpx;height: 55rpx;"></image>
									<view class="mglr49 f28 center">{{ $t('bus_wallet.bw4') }}</view>
								</view>
								<view class="noCho">
									<image src="../../../static/images/choose.png" mode="widthFix"
										style="width: 35rpx;height: 35rpx;" v-if="cType =='offine'"></image>
								</view>
							</view>

						</view>

						<view class="between mt60">
							<view class="Withdraws" @click="account = false">
								{{ $t('bus_wallet.bw5') }}
							</view>
							<view class="Deposit" @click="chooseHandle">
								{{ $t('bus_wallet.bw6') }}
							</view>
						</view>

					</view>

				</view>
			</nut-popup>
		</view>
	</view>
</template>

<script>
	import request from '@/utils/request'
	export default {
		data() {
			return {
				time: undefined,
				socket: undefined,
				qcdsq: undefined,
				record: false,
				withdraw: false,
				rachange: false,
				account: false,
				accountType: '',
				accountBox: false,
				accountInfo: false,
				radioVal: false,
				passwordShow: false,
				showBanks: false,
				showBTC: false,
				offline: false,
				showETH: false,
				walletInfo: {},
				walletList: {},
				showBank: false,
				cTypechange: 1,
				show: false,
				showList: false,
				bankcardText: undefined,
				choStyle: {
					background: '#F6F7FC',
					animation: '.2s linear all',
					color: '#000',
					border: '4rpx solid #3FAFF9'
				},
				cType: 'usdt',
				formData: {
					old_password: null,
					password: null,

				},
				BankNamecolumns: [],
				emailValue: '',
				Bankcolumns: [],
				currency: '',
				showUsdt: false,
				showBank: true,
				offineBank: false,
				changeType: false,
				bindType: false,
				WithdrawType: false,
				rechangeType: '',
				withdrawType: "",
			}
		},
		onShow(){
			this.changeType = false;
			this.account = false;
			this.bindType = false;
			this.WithdrawType = false;
			this.currency = uni.getStorageSync('currency');
			uni.showLoading();
			this.getData();
			this.rechargeWithdrawType()
		},
		methods: {
			rechargeWithdrawType() {
				request({
					url: "shop/rechargeWithdrawType",
					methods: 'get',
				}).then(res => {
					// this.walletData = res
					this.rechangeType = res.data.recharge_type
					this.withdrawType = res.data.withdraw_type
					// this.emailValue = res.email
				}).catch(err => {
					this.$toast({
						title: err.message
					})
				})
			},


			chooseHandle() {
				let value = this.cType
				if (this.changeType) {
					if (value == 'usdt') {
						this.navigateToPage('/bundle/pages/recharge/components/setNumber')
					} else if (value == 'bank') {
						this.navigateToPage('/bundle/pages/recharge/bankRecharge')
					} else if (value == 'offine') {
						// this.navigateToPage('/bundle/pages/recharge/bankRecharge')
						this.navigateToPage('/bundle/pages/mine/customerService')
					}
				} else if (this.bindType) {
					if (value == 'usdt') {
						this.navigateToPage('/pages/BindUSDT/BindUSDT')
					} else if (value == 'bank') {
						this.navigateToPage('/bundle/pages/bindBack/bindBack')
					} else if (value == 'offine') {
						this.navigateToPage('/bundle/pages/bindBack/bindBack')
					}
				} else if (this.WithdrawType) {
					if (value == 'usdt') {
						this.navigateToPage('/bundle/pages/usdtWithdraw/usdtWithdraw')
					} else if (value == 'bank') {
						this.navigateToPage('/bundle/pages/bankWithdraw/bankWithdraw')
					} else if (value == 'offine') {
						uni.showLoading()
						request({
							url: "index/bankConfig",
							methods: 'get',
						}).then(res => {
							if(res.data&&res.data.config.withdrawal_way == 'kefu'){
								uni.hideLoading()
								window.location.href = res.data.config.kefu_url
							}else{
								uni.hideLoading()
								this.navigateToPage('/bundle/pages/bankWithdraw/bankWithdraw')
							}
						}).catch(err => {
							uni.hideLoading()
							this.$toast({
								title: err.message
							})
						})

					}
				}





			},
			navigateToPage(url) {
				uni.navigateTo({
					url
				})
			},
			gopage() {
				uni.navigateTo({
					url: '/bundle/pages/user_wallet/loan',
				})
			},
			changeRacord(ind) {
				this.cTypechange = ind
			},
			back() {
				clearInterval(this.qcdsq)
				clearInterval(this.time)
				uni.redirectTo({
					url: '/pages/user/user'
				})
			},
			// 添加银行卡
			goAddAccount() {
				uni.navigateTo({
					url: '/bundle/pages/user_wallet/addAccount',
				})

			},
			// 存取款记录
			RecordBtn() {
				uni.navigateTo({
					url: '/bundle/pages/user_wallet/dwRecords'
				})
			},
			// 收入和支出记录
			incomeOrExpenditureBtn() {
				uni.navigateTo({
					url: '/bundle/pages/user_wallet/incomeOrExpenditure'
				})
			},
			// 去充值页
			goRechangeFun() {
				// uni.navigateTo({
				// 	url: './addRecharge',
				// })
				this.changeType = true;
				this.accountType = 'Recharge';
				this.account = true;
				this.bindType = false;
				this.WithdrawType = false;
				if (this.rechangeType.includes(1)) {
					this.showUsdt = true
				} else {
					this.showUsdt = false

				}
				if (this.rechangeType.includes(2)) {
					this.offineBank = true
				} else {
					this.offineBank = false

				}

			},
			changeChoosed(type) {
				this.cType = type;
			},
			// 設定交易密碼
			passwordShowfn() {
				uni.navigateTo({
					url: `/bundle/pages/user_wallet/updataPassword?payWd=${this.walletInfo.pay_pwd}`
				})


			},
			// 邮件信箱
			emailBtnShow() {
				uni.navigateTo({
					url: `/bundle/pages/user_wallet/updataEmail?emailValue=${this.emailValue}`
				})
			},
			/**
			 * 显示绑定的银行卡
			 */
			showBankPop() {
				this.bindType = true;
				this.changeType = false;
				this.accountType = 'bank';
				this.account = true;
				this.WithdrawType = false;
				if (this.rechangeType.includes(1) || this.withdrawType.includes(1)) {
					this.showUsdt = true
				} else {
					this.showUsdt = false

				}
				if (this.rechangeType.includes(1) || this.withdrawType.includes(1)) {
					this.offineBank = true
				} else {
					this.offineBank = false

				}

			},
			// 提现
			inputnull() {
				// uni.navigateTo({
				// 	url: '/bundle/pages/user_wallet/withdraw'
				// });
				this.accountType = 'Withdraw';
				this.account = true;
				this.WithdrawType = true;
				this.bindType = false;
				this.changeType = false;
				if (this.withdrawType.includes(1)) {
					this.showUsdt = true
				} else {
					this.showUsdt = false

				}
				if (this.withdrawType.includes(2)) {
					this.offineBank = true
				} else {
					this.offineBank = false

				}

			},

			// 删除已绑定银行卡列表
			deleteWallet(item) {
				uni.showLoading()
				request({
					url: "user/attribute/wallet/del",
					method: "POST",
					data: {
						id: item.id
					}
				}).then(res => {
					this.$toast({
						title: this.$t('tk_show.sh_a12')
					})
					uni.hideLoading();

				}).catch(err => {
					uni.hideLoading();

				}).catch(err => {
					uni.hideLoading();
					this.$toast({
						title: err.message
					})
				})

			},
			//头部收益信息
			getData() {
				request({
					url: "shop/getwalletInfo",
					methods: 'get',
				}).then(res => {
					this.walletInfo = res.data;
					uni.hideLoading()
					// this.emailValue = res.email
				}).catch(err => {
					this.$toast({
						title: err.message
					})
					uni.hideLoading()
				})
			},
		}

	}
</script>

<style scoped>
	.mglr49 {
		margin-left: 49rpx;
	}

	.between {
		display: flex;
		justify-content: space-between !important;
		align-items: center !important;
	}

	.Deposit {
		width: 47%;
		height: 96rpx;
		background: #3FAFF9;
		border-radius: 16rpx;

		font-family: SF Pro Display, SF Pro Display;
		font-weight: 500;
		font-size: 32rpx;
		color: #FFFFFF;
		line-height: 96rpx;
		text-align: center;

	}

	.Withdraws {
		width: 47%;
		height: 96rpx;
		border-radius: 16rpx;
		border: 2rpx solid #E5E5E5;
		font-family: SF Pro Display, SF Pro Display;
		font-weight: 500;
		font-size: 32rpx;
		color: #000000;
		line-height: 96rpx;
		text-align: center;
	}

	.text3 {

		font-family: SF Pro Display, SF Pro Display;
		font-weight: 400;
		font-size: 28rpx;
		color: #A9A9A9;
		line-height: 33rpx;
		text-align: left;
		font-style: normal;
		text-transform: none;
	}

	.choItem {
		padding: 37rpx 50rpx;
		background-color: #F6F7FC;
		border-radius: 15rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 30rpx;
		border: 4rpx solid #F6F7FC;


		.noCho {
			width: 35rpx;
			height: 35rpx;
			border-radius: 10rpx;
		}
	}

	.follow {

		font-family: SF Pro Display, SF Pro Display;
		font-weight: 400;
		font-size: 28rpx;
		color: #A9A9A9;
		line-height: 33rpx;
		text-align: left;
		flex: 1;
		margin-top: 10px;
	}

	.recent {
		width: 85%;
		font-family: SF Pro Display, SF Pro Display;
		font-weight: 600;
		font-size: 40rpx;
		color: #000000;
		line-height: 47rpx;
		text-align: left;

	}

	.box {
		width: 100%;
		height: 480px;
		background-color: #fff;
		border-radius: 32rpx;
		box-sizing: border-box;
		padding: 52rpx 48rpx 0rpx 48rpx;
	}

	.pdlr32 {
		padding-left: 1rem;
		padding-right: 1rem;
	}

	.nav {
		width: 100%;
		height: 2.75rem;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		font-weight: bold;
		background-color: #3FAFF9;
		/* border-bottom: 1px solid #F4F4F4; */
		padding: 16px 16px 0 16px;
	}

	.nav .text {
		font-size: 1.125rem;
		color: #171418;
	}

	.mt40 {
		margin-top: 1.25rem;
	}

	.bten {
		position: absolute;
		top: 32rpx;
		left: 50%;
		z-index: 9990;
		margin-left: -165px;
	}

	.bten .box {
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

	.change {
		display: flex;
		justify-content: center;
		width: 100%;
		font-size: 40rpx;
	}

	.accList {
		justify-content: space-between;
		align-items: center;
		height: 100rpx;
	}

	.accList .after_img {
		width: 56rpx;
		height: 56rpx;
		margin-right: 24rpx;
	}

	.after_img>img {
		width: 100%;
		height: 100%;
	}

	.Rechange {
		position: absolute;
		height: 100vh;
		bottom: 0rpx;
		width: 100%;
		background: rgba(0, 0, 0, 0.7);
	}

	.Rechange .box {
		position: absolute;
		width: 100%;
		height: 60%;
		background-color: #fff;
		bottom: 0rpx;
		border-radius: 32rpx 32rpx 0rpx 0rpx;
	}

	.box .head {
		justify-content: space-between;
		align-items: center;
		margin-top: 24rpx;
	}

	.head .head_title {
		color: #171418;
		font-weight: 600;
		font-size: 36rpx;

	}

	.box .img {
		width: 260rpx;
		height: 184rpx;
		margin: 0 auto;
		margin-top: 68rpx;
		margin-bottom: 32rpx;
	}



	.withdraw {
		position: absolute;
		height: 100vh;
		bottom: 0rpx;
		width: 100%;
		background: rgba(0, 0, 0, 0.7);
		z-index: 11111;
	}

	.withdraw .box {
		position: absolute;
		width: 100%;
		height: 80%;
		background-color: #fff;
		bottom: 0rpx;
		border-radius: 32rpx 32rpx 0rpx 0rpx;
	}

	.withdraw .box .head {
		justify-content: space-between;
		align-items: center;
		margin-top: 24rpx;
	}

	.head .head_title {
		color: #171418;
		font-weight: 600;
		font-size: 36rpx;

	}

	.withdraw .box .user_inp {
		margin-top: 56rpx;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2rpx solid #E8E4E9;
		box-sizing: border-box;
		padding: 28rpx 0rpx;
	}

	.user_inp .inps {
		color: #C6C2C7;
		font-size: 28rpx;
	}

	.xinx {
		box-sizing: border-box;
		padding: 30rpx 0rpx;
		border-bottom: 2rpx solid #E8E4E9;
	}

	.xinx .title {
		color: #918D92;
	}


	.all {
		justify-content: space-between;
		box-sizing: border-box;
		padding: 24rpx 30rpx;
	}

	.main {
		margin-top: 14rpx;
		position: relative;
		z-index: 13;
		top: 25px;
		width: 100%;
	}

	.main .carPlay {
		height: 326rpx;
		background: #fff;
		/* background: url('../../../static/images/wallet_bg.png') no-repeat; */
		background-size: 100% 100%;
		padding-top: 58rpx;
		border-top-left-radius: 12px;
		border-top-right-radius: 12px;
	}

	.main .money {
		color: #000;
		font-weight: 600;
		font-size: 52rpx;

	}

	.tCenter {
		text-align: center;
	}

	.main .Total {
		font-weight: 400;
		font-size: 32rpx;
		color: #797979;
	}
	.mt15{
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 15px;
	}
	.mt8 {
		margin-top: 0.25rem;
	}

	.main .geli2 {
		width: 100%;
		border: 2rpx solid #E8E4E9;
	}

	.main .user_info {
		flex: 1;
	}

	.flex {
		display: flex;
	}

	.mt44 {
		margin: 2.875rem 0 1.675rem 0;
	}

	.main .user_info .num {
		text-align: center;
		font-weight: 600;
		font-size: 32rpx;
		color: #000;
	}

	.main .user_info .Total {
		text-align: center;
		margin: 14rpx 0rpx;
	}

	.main .user_info .Recharge {
		box-sizing: border-box;
		padding: 22rpx 0;
		/* border: 2rpx solid #E6E2E7; */
		border-radius: 44rpx;
		color: #000;
		/* background-color: #96bbff; */
	}

	.flex-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.main .user_info .Withdraw {
		box-sizing: border-box;
		padding: 22rpx 0;
		color: #000;
		/* background-color: #2979ff;; */
		border-radius: 44rpx;
	}


	.main .c_line {
		width: 2rpx;
		height: 32rpx;
		background-color: #000000;
	}

	.main .geli {
		width: 100%;
		border: 2rpx solid #E8E4E9;
	}

	.main .user_js .qianb {
		width: 100%;
		box-sizing: border-box;
		padding: 28rpx 0rpx;
		justify-content: space-between;
		align-items: center;
	}

	.geli2 {
		width: 100%;
		height: 22rpx;
		background: #F6F2F7;
	}

	.abs_bot {
		height: 2.5rem;
		width: 100%;
		position: absolute;
		bottom: 2.5rem;
		left: 0;
		font-weight: bold;
	}

	.pdlr32 {
		padding-left: 1rem;
		padding-right: 1rem;
	}

	.sub_btn {
		width: 100%;
		height: 2.5rem;
		color: #fff;
		line-height: 2.5rem;
		margin-top: 6.0625rem;
		border-radius: 1.375rem;
		background-color: #2979ff;
		text-align: center;
	}

	.background {
		height: 160px;
		position: absolute;
		z-index: 11;
		width: 100%;
		background: #3FAFF9;
	}

	.mt24 {
		margin-top: 24px;
	}
</style>