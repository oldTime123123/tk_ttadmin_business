<template>
	<view class="all">
		<view class="" style="position: relative;">
			<view class="nav flex" @click="back">
				<view class="">
					<image style="width: 44rpx;height: 44rpx;" src="../../../static/images/Frame.png" mode=""></image>
				</view>
				<view class="text">
					{{ $t('tk_wa.wa_a22') }}
				</view>
				<view class=""></view>
			</view>
		</view>
		<view class="withdraw" style="background:transparent">
			<view class="box">
				<view class="change mt40" v-show='withdraw_type.length > 1'>
					<nut-radiogroup v-model="radioVal" direction="horizontal" style="display: flex;flex-wrap: wrap;">
						<!-- <view class="banlist text_bold "> -->
							<!-- <view class="" v-show='withdraw_type.includes(1)' style='width: 50%;'> -->
								<nut-radio label="1" style='width: 50%;'>{{ $t('tk_wa.wa_a23') }}</nut-radio>
							<!-- </view> -->
							<!-- <view class="" v-show='withdraw_type.includes(2)' style='width: 50%;'> -->
								<nut-radio label="2">USDT</nut-radio>
							<!-- </view> -->
							<!-- <view class="" v-show='withdraw_type.includes(3)' style='width: 50%;'> -->
								<nut-radio label="3" style='width: 50%;'>BTC</nut-radio>
							<!-- </view> -->
							<!-- <view class="" v-show='withdraw_type.includes(4)' style='width: 50%;'> -->
								<nut-radio label="4">{{ $t('tk_zc.l_l59') }}</nut-radio>
							<!-- </view> -->
							<!-- <view class="" v-show='withdraw_type.includes(5)' style='width: 50%;'> -->
								<nut-radio label="5" style='width: 50%;'>ETH</nut-radio>
							<!-- </view> -->
						<!-- </view> -->
					</nut-radiogroup>
				</view>

				<view>
					<view v-show='radioVal == 1 || radioVal == 4'>
						<view class="flex flex-col from-item">
							<view class="title text_bold ">
								{{ $t('tk_wa.wa_a24') }}
							</view>
							<view class="form-input form-select">
								<!-- 								<input :disabled="true" v-model="editInfo.bank_name" :placeholder="t('tk_wa.wa_a15')" /> -->
								<input v-model="editInfo.bank_name" :placeholder="$t('tk_wa.wa_a15')" />

								<!-- 	<image @click="showList = true" style="width: 48rpx;height: 48rpx;"
									src="@/static/tiktok/Frame2.png" mode=""></image> -->

							</view>
						</view>
						<view class="flex flex-col from-item">
							<view class="title text_bold ">
								{{ $t('tk_wa.wa_a25') }}
							</view>
							<view class="form-input">
								<input v-model="editInfo.bank_code" :placeholder="$t('tk_wa.wa_a35')" />
							</view>
						</view>
					</view>
					<view class="flex flex-col from-item">
						<view class="title text_bold ">
							{{ $t('tk_wa.wa_a26') }}
						</view>
						<view class="form-input">
							<input v-model="editInfo.account_holder" :placeholder="$t('tk_wa.wa_a34')" />
						</view>
					</view>
					<view class="flex flex-col from-item">
						<view class="title text_bold ">
							{{ radioVal == 1 || radioVal == 4 ? $t('tk_wa.wa_a27') : $t('tk_wa.wa_a28')}}
						</view>
						<view class="form-input">
							<input v-model="editInfo.bank_num"
								:placeholder="radioVal == 1 || radioVal == 4 ? $t('tk_wa.wa_a36') : $t('tk_wa.wa_a37')" />
						</view>
					</view>
				</view>





			</view>
		</view>
		<view class="abs_bot pdlr32">
			<view class="sub_btn" @click="addEdit" style="margin-top: 0;">
				{{ $t('tk_wa.wa_a32') }}
			</view>
		</view>
		<view class="bten" v-if="messBoxmt.length>0">
			<view class="" v-for="item of messBoxmt" :key="item.id">
				<view class="box animate__animated animate__bounceInRight">
					{{ item.title }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '@/utils/request'
    export default {
        data() {
            return {
                messBoxmt:[],
                time:undefined,
                socket:undefined,
                qcdsq:undefined,
                record:false,
                withdraw:false,
                rachange:false,
                account:false,
                accountBox:false,
                accountInfo:false,
                radioVal:false,
                passwordShow:false,

                showUsdt:false,
                showBanks:false,
                showBTC:false,
                offline:false,
                showETH:false,

				emailShow:false,
				walletInfo:{},
				walletList:{},
				showBank:false,

                cTypechange:1,

                show:false,
                showList:false,
				editInfo:{
					account_holder: null,
					bank_code: null,
					bank_name: null,
					bank_num: null
				},

                bankcardText:undefined,
				withdrawData:{
					bankcardId: null,
					amount: null,
					password: null
				},

                choStyle:{
                    background: '#DD2755',
                    animation: '.2s linear all',
                    color: '#fff'
                },
                cType:'usdt',
                formData:{
                    old_password: null,
                    password: null,

                },
                columnsTxt:undefined,
                BankNamecolumns:[],

                emailValue:undefined,

				recharge_type:[],
				withdraw_type:[],

                Bankcolumns:[],

				pages:{
					type: 1,
					page: 1,
					size: 10
				},
				paging:null,
				recordsList:[],
				changeID:false,

                columns:[],
				locale:undefined,
                currency:'$'
            }
        },
        onLoad(){
			this.walletListFn()
			this.topupChange()
        },
        methods: {
            changeRacord (ind){
                this.cTypechange = ind
            },
            back()  {
				history.back()
            },
			RecordBtn() {
				if (this.cTypechange == 1) {
					// uni.navigateTo({
					// 	url: '../record/withdrawRecord'

					// })

				} else {
					// uni.navigateTo({
					// 	url: '../record/rechargeRecord'
					// })
				}
			},
			changeChoosed(type){
                this.cType = type;
            },

			passwordShowfn(){
				this.passwordShow = true
				this.formData.password = ''
				this.formData.old_password = ''
			},
			withdrawPassword () {
				uni.showLoading()

				if (this.walletInfo.payment_password) {
					if (!this.formData.old_password) {
						this.$toast({title: this.$t('tk_zc.l_l51')})
						uni.hideLoading()

						return false
					}
				}

				if (!this.formData.password) {
					this.$toast({title: this.$t('tk_zc.l_l50')})
					uni.hideLoading()

					return false
				}
				request({
					method: "POST",
					url: 'user/attribute/password',
					data: {
						...this.formData,
						password2: this.formData.password
					}
				}).then(res => {
					this.$toast({title: res.msg})
					if(res.code==1){
						this.passwordShow = false
					}
					uni.hideLoading()
				}).catch(err => {
					uni.hideLoading()
					this.$toast({title: err})
				})
			},
			emailBtnShow() {
				this.emailShow = true
				// getEmailFn()
			},
			recordBtnShow  ()  {
				this.record = true
			},
			getEmailFn () {
				uni.showLoading()

				if (!this.emailValue) {
					this.$toast({title: this.$t('tk_zc.l_l55')})
					uni.hideLoading()

					return false
				}
				request({
					url: "user/attribute/email",
					method: "POST",
					data: {
						email: this.emailValue
					}
				}).then(res => {
					this.$toast({title: res.msg})
					if(res.code==1){
						this.emailShow = false
					}
					uni.hideLoading()
				}).catch(err => {
					this.$toast({title: err})
					uni.hideLoading()

				})
			},

			withdrawAdd  () {
				uni.showLoading()

				if (!this.withdrawData.bankcardId) {
					this.$toast({title: this.$t('tk_zc.l_l47')})
					uni.hideLoading()

					return false
				}
				if (!this.withdrawData.amount) {
					this.$toast({title: this.$t('tk_zc.l_l48')})
					uni.hideLoading()

					return false
				}
				if (!this.withdrawData.password) {
					this.$toast({title: this.$t('tk_zc.l_l49')})
					uni.hideLoading()

					return false
				}
				request({
					url: "finance/withdraw/submit",
					method: "POST",
					data: this.withdrawData
				}).then(res => {
					this.$toast({title: res.msg});
					if(res.code==1){
						this.withdraw = false
						this.bankcardText = ''
						balance(1)
					}
					uni.hideLoading()
				}).catch(err => {
					uni.hideLoading()
					this.$toast({title: err})
				})
			},
			addEdit () {
				uni.showLoading()
				request({
					url: "user/attribute/wallet/edit",
					method: "POST",
					data: {
						...this.editInfo,
						type: this.radioVal
					}
				}).then(res => {
					this.$toast({title: res.msg})
					if(res.code==1){
						walletListFn();
						this.accountInfo = false
						this.editInfo.account_holder = null
						this.editInfo.bank_code = null
						this.editInfo.bank_name = null
						this.editInfo.bank_num = null
						uni.$emit('onBack');
						uni.navigateBack()
					}
					uni.hideLoading()
				}).catch(err => {
					uni.hideLoading()
					this.$toast({title: err})
				})
			},
			topupChange() {
				
				// uni.showLoading()

				// request({
				// 	url: 'setting/financeWay',
				// 	methods: 'get'
				// }).then((res) => {
				// 	// console.log(res,'sss')
				// 	// return
				// 	uni.hideLoading()
				// 	this.radioVal = res.withdraw_type[0]
				// 	this.recharge_type = res.recharge_type
				// 	this.withdraw_type = res.withdraw_type
				// 	if (this.recharge_type.includes(1)) {
				// 		this.showBanks = true;
				// 	}
				// 	if (this.recharge_type.includes(2)) {
				// 		this.showUsdt = true;
				// 	}
				// 	if (this.recharge_type.includes(3)) {
				// 		this.showBTC = true;
				// 	}
				// 	if (this.recharge_type.includes(4)) {
				// 		this.offline = true;
				// 	}
				// 	if (this.recharge_type.includes(5)) {
				// 		this.showETH = true;
				// 	}
			// });
					//测试
					let res={
						"recharge_type": [
							4,
							2,
							3,
							5,
							1,
							7,
							6
						],
						"withdraw_type": [
							2,
							5,
							4,
							3,
							1,
							6,
							7,
							8
						],
						"u_recharge_module": 2,
						"btc_recharge_module": 1,
						"u_percent": 0,
						"recharge_fee": {
							"1": 0,
							"2": 0,
							"3": 0,
							"4": 0
						}
					}
					this.radioVal = res.withdraw_type[0]
					this.recharge_type = res.recharge_type
					this.withdraw_type = res.withdraw_type
					if (this.recharge_type.includes(1)) {
						this.showBanks = true;
					}
					if (this.recharge_type.includes(2)) {
						this.showUsdt = true;
					}
					if (this.recharge_type.includes(3)) {
						this.showBTC = true;
					}
					if (this.recharge_type.includes(4)) {
						this.offline = true;
					}
					if (this.recharge_type.includes(5)) {
						this.showETH = true;
					}
				
			},
			chooseHandle () {
				// if (needRedirct.value && showSignTemplate.value) {
				//    showDialog.value = true;
				//    return false;
				// }
				let value = this.cType;
				if (value == 'usdt') {
					uni.navigateTo({
						url: '../recharge/usdtRecharge'
					});
				} else if (value == 'bank') {
					uni.navigateTo({
						url: '../recharge/bankRecharge'
					});
				} else if (value == 'btc') {
					uni.navigateTo({
						url: '../recharge/btcRecharge'
					});
				} else if (value == 'offline') {
					uni.navigateTo({
						url: '../recharge/offLineBank'
					});
				} else if (value == 'ETH') {
					uni.navigateTo({
						url: '../recharge/ethRecharge'
					});
				}
			},
			deleteWallet (item) {
				uni.showLoading()

				request({
					url: "user/attribute/wallet/del",
					method: "POST",
					data: {
						id: item.id
					}
				}).then(res => {
					this.$toast({title: res.msg});
					if(res.code==1){
						this.walletListFn()
					}
					uni.hideLoading()

				}).catch(err => {
					this.$toast({title: err})
				})

			},
			 /**
             * 获取已绑定银行卡列表弹窗
             */
			 walletListFn(){
                uni.showLoading()
                request({
                    url: "user/attribute/wallet/list",
                    methods: 'get',
                }).then(res => {
					this.$toast({title: res.msg});
					if(res.code==1&&res.data){
						this.walletList = res.data.list
						const newArr = []
						const newArrTwo = []
						res.data.bank_list.forEach(item => {
							newArrTwo.push({
								text: item.name,
								value: item.id
							})
						})
						this.BankNamecolumns = newArrTwo
						res.data.list.forEach(item => {
							newArr.push({
								text: item.bank_num,
								value: item.id
							})
						})
						this.Bankcolumns = newArr
					}
                    uni.hideLoading()
                }).catch(err => {
					uni.hideLoading();
					this.$toast({title: err})
				})
            },
			confirmThree({
				selectedValue,
				selectedOptions
			}) {
				// desc.value = selectedValue.join(',');
				this.editInfo.bank_name = selectedOptions[0].text
			},
			confirm({
				selectedValue,
				selectedOptions
			}){
				// desc.value = selectedValue.join(',');
				this.tabsChange(selectedOptions[0].value)
				this.columnsTxt = selectedOptions[0].text
			},


			confirmTwo({
				selectedValue,
				selectedOptions
			}) {
				this.bankcardText = selectedOptions[0].text
				this.withdrawDat.bankcardId = selectedOptions[0].value
			},
			tabsChange(status){
				this.pages.page = 1
				this.pages.type = status
				this.paging.clean() //清空数组
				this.balance(1)
			},
			balance(ind) {
				this.pages.page = ind
				request({
					url: "user/record/balance",
					methods: 'get',
					data: this.pages
				}).then(res => {
					this.$toast({title: res.msg});
					if(res.code==1&&res.data){
						this.paging.complete(res.data.data);
						this.pages.page += 1
					}
				}).catch(err => {
					this.$toast({title: err});
				})
			},

        }
        
    }
</script>


<style scoped>
	.pdlr32{
        padding-left: 1rem;
        padding-right: 1rem;
    }
    .nav{
        width: 100%;
        height: 2.75rem;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        font-weight: bold;
        background-color: #ffffff;
        border-bottom: 1px solid #F4F4F4;
    }
    .nav .text{
        font-size: 1.125rem;
        color: #171418;
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

	.banlist {
		display: flex;
		flex-wrap: wrap;
	}

	.choItem {
		padding: 37rpx 30rpx;
		background-color: #fff;
		border-radius: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 30rpx;
	}

	.btns {
		margin-top: 173rpx;
		text-align: center;
		line-height: 120rpx;
		color: #000;
		height: 120rpx;
		background: #f5b04c;
		box-shadow: 0px 11rpx 47rpx 4rpx rgba(247, 175, 64, 0.35);
		border-radius: 35rpx;
		font-size: 36rpx;
	}

	.wrapper {
		display: flex;
		height: 100%;
		justify-content: center;
		padding: 0 50rpx;
	}
	.wrapper .content {
		margin-top: 400rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 350rpx;
		background: #1d1d1d;
		color: #fff;
		border-radius: 30rpx;
		padding-top: 50rpx;
		position: relative;
		overflow: hidden;
	}
	.wrapper .content .between {
		position: absolute;
		bottom: 0;
		width: calc(100% - 80rpx);
		padding: 0 30rpx 40rpx;
	}
	.wrapper .content .between view {
		width: 48%;
		height: 100rpx;
		color: #fff;
		text-align: center;
		line-height: 100rpx;
		font-size: 30rpx;
		border-radius: 50rpx;
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


	.btn {
		width: calc(100% - 64rpx);
		height: 80rpx;
		border-radius: 8rpx;
		color: #fff;
		line-height: 80rpx;
		text-align: center;
		position: absolute;
		bottom: 74rpx;
		margin-left: 32rpx;
	}

	.all {
		height: 100vh;
		background: #ffffff;
	}

	/* // 单选中颜色 */
	::v-deep .nut-radio__icon {
		color: #DD2755
	}

	.withdraw {
		/* // height: 100vh; */
		width: 100%;
		background: rgba(0, 0, 0, 0.7);
	}
	.withdraw .box {
		/* // position: absolute; */
		width: 100%;
		/* // height: 80%; */
		background-color: #fff;
		/* // bottom: 0rpx; */
		border-radius: 32rpx 32rpx 0rpx 0rpx;
	}
	.withdraw .box .head {
		justify-content: space-between;
		align-items: center;
		margin-top: 24rpx;
	}
	.withdraw .box .head .head_title {
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
	.withdraw .box .user_inp .inps {
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
	}
	.main .carPlay {
		height: 326rpx;
		background: url('../../../static/images/wallet_bg.png') no-repeat;
		background-size: 100% 100%;
		padding-top: 58rpx;
	}

	.main .money {
		color: #FFFFFF;
		font-weight: 600;
		font-size: 52rpx;

	}

	.main .Total {
		font-weight: 400;
		font-size: 32rpx;
		color: #FFFFFF;
	}

	.main .geli2 {
		width: 100%;
		border: 2rpx solid #E8E4E9;
	}

	.main .user_info {
		flex: 1;
	}
	.main .user_info .num {
		text-align: center;
		font-weight: 600;
		font-size: 32rpx;
		color: #FFFFFF;
	}

	.main .user_info .Total {
		text-align: center;
		margin: 14rpx 0rpx;
	}

	.main .user_info .Recharge {
		box-sizing: border-box;
		padding: 22rpx 0;
		border: 2rpx solid #E6E2E7;
		border-radius: 44rpx;
		color: #fff;
		background-color: #FF96A3;
	}

	.main .user_info .Withdraw {
		box-sizing: border-box;
		padding: 22rpx 0;
		color: #fff;
		background-color: #DD2755;
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
	.bten{
		position: absolute;
		top: 1rem;
		left: 50%;
		z-index: 9990;
		margin-left: -165px;
	}
	.sub_btn {
		width: 100%;
		height: 2.5rem;
		color: #fff;
		line-height: 2.5rem;
		margin-top: 6.0625rem;
		border-radius: 1.375rem;
		background-color: #DD2755;
		text-align: center;
	}
	.from-item {
		margin-top: 1.25rem;
	}

	.flex-col {
		flex-direction: column;
	}
	.flex {
		display: flex;
	
	}
	.title{
		width: 100%;
		text-align: left;
	}
	.text_bold {
		font-weight: bold;
	}
	.form-input {
		width: 100%;
		height: 3.25rem;
		/* background-color: #EDEDED; */
		border-radius: 0.5rem;
		display: flex;
		align-items: center;
		padding: 0 0.5rem;
		margin-top: 0.75rem;
	}
	.change[data-v-08136f6e] {
		display: flex;
		justify-content: center;
		width: 100%;
		font-size: 1.25rem;
	}

	.mt40 {
		margin-top: 1.25rem;
	}
</style>