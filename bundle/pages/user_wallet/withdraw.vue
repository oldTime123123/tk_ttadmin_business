<template>
	<view class="all">
		<view class="" style="position: relative;">
			<view class="nav flex" @click="back">
				<view class="">
					<image style="width: 44rpx;height: 44rpx;" src="../../../static/images/Frame.png" mode=""></image>
				</view>
				<view class="text">
					{{ $t('tk_wa.wa_a7') }}
				</view>
				<view class=""></view>
			</view>
		</view>
		<view class="withdraw" style="background:transparent">
			<view class="box">
				<view>
					<view>
						<view class="flex flex-col from-item">
							<view class="title text_bold ">
								{{ $t('tk_wa.wa_a14') }}
							</view>
							<view class="form-input form-select">
								<input :disabled="true" v-model="bankcardText" :placeholder="$t('tk_wa.wa_a15')" />
								<image @click="showBank = true" style="width: 48rpx;height: 48rpx;"
									src="../../../static/images/Frame2.png" mode=""></image>
							</view>
						</view>
						<view class="flex flex-col from-item">
							<view class="title text_bold ">
								{{ $t('tk_wa.wa_a16') }}
							</view>
							<view class="form-input">
								<input v-model="withdrawData.amount" :placeholder="$t('tk_wa.wa_a17')" />
							</view>
						</view>
					</view>
					<view class="flex flex-col from-item">
						<view class="title text_bold ">
							{{ $t('tk_wa.wa_a18') }}
						</view>
						<view class="form-input">
							<input v-model="withdrawData.password" :placeholder="$t('tk_wa.wa_a19')" />
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="abs_bot pdlr32">
			<view class="sub_btn" @click="withdrawAdd" style="margin-top: 0;">
				{{ $t('tk_wa.wa_a32') }}
			</view>
		</view>


		<nut-picker :is-visible="showBank" :list-data="Bankcolumns" :title="$t('tk_wa.wa_a14')" @confirm="confirmTwo" @close="showBank = false"></nut-picker>
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
				withdraw:false,
				showBank:false,
				show:false,
				bankcardText:undefined,
				withdrawData:{
					bankcardId: null,
					amount: null,
					password: null
				},
				Bankcolumns:[],
				locale:undefined
            }
        },
        onLoad(){
			this.walletListFn()
        },
        methods: {
            changeRacord (ind){
                this.cTypechange = ind
            },
            back()  {
				history.back()
            },
			/**
			 * 提交
			 */
			withdrawAdd(){
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
					this.$toast({title: res.msg})
					if(res.code==1){
						uni.$emit('onBack');
						uni.navigateBack()
					}
					uni.hideLoading()
				}).catch(err => {
					uni.hideLoading()
					this.$toast({title: err})
				})
			},
			/**
			 * 获取银行卡下拉列表
			 */
			walletListFn(){
				// uni.showLoading()
				// request({
				// 	url: "user/attribute/wallet/list",
				// 	methods: 'get',
				// }).then(res => {
				// 	uni.hideLoading()
				// 	const newArr = []
				// 	const obj = {
				// 		1: "银行卡",
				// 		2: 'USDT',
				// 		3: 'BTC	',
				// 		4: "线下银行",
				// 		5: 'ETH	'
				// 	}
				// 	res.list.forEach(item => {
				// 		newArr.push({
				// 			label: item.id,
				// 			value: obj[item.type] + ': ' + item.bank_num
				// 		})
				// 	})
				// 	this.Bankcolumns = [newArr]
					
				// }).catch(err => {
				// 	uni.hideLoading();
				//	this.$toast({title: err.message})
				// })

				//测试
				let res={
					"list": [
						{
							"id": 139,
							"bankId": 0,
							"bank_num": "TFwk8dqeXw89dFfsYsvJRG5p1Ktc1yGRwH",
							"account_holder": "冬枣",
							"bank_code": "",
							"bank_name": "",
							"other_param_3": "",
							"type": 7
						},
						{
							"id": 58,
							"bankId": 0,
							"bank_num": "dasdsasdasdassdasd",
							"account_holder": "12312312",
							"bank_code": "",
							"bank_name": "",
							"other_param_3": "",
							"type": 5
						},
						{
							"id": 57,
							"bankId": 0,
							"bank_num": "eqaeqweqeqewqeqeqqweq",
							"account_holder": "12312312",
							"bank_code": "",
							"bank_name": "",
							"other_param_3": "",
							"type": 3
						},
						{
							"id": 54,
							"bankId": 0,
							"bank_num": "kasdkaksdkadkakdkasdkakdak",
							"account_holder": "Jacs",
							"bank_code": "",
							"bank_name": "",
							"other_param_3": "",
							"type": 2
						},
						{
							"id": 53,
							"bankId": 0,
							"bank_num": "55446678545",
							"account_holder": "Jac",
							"bank_code": "258854474",
							"bank_name": "Jasd",
							"other_param_3": "",
							"type": 1
						}
					]
				}
				let newArr = [];
				const obj = {
					1: this.$t('tk_wa.wa_a23'),
					2: 'USDT',
					3: 'BTC	',
					4: this.$t('tk_zc.l_l59'),
					5: 'ETH	'
				}
				res.list.forEach(item => {
					newArr.push({
						label: item.id,
						value: obj[item.type] + ': ' + item.bank_num
					})
				})
				this.Bankcolumns = [newArr]
			},
			confirmTwo(chooseData){
				this.bankcardText = chooseData[0].value;
				this.withdrawData.bankcardId = chooseData[0].label
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
	.form-select {
		display: flex;
		justify-content: space-between;
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

	/* // 单选中颜色 */
	::v-deep .nut-radio__icon {
		color: #DD2755
	}

	.withdraw {
		width: 100%;
		background: rgba(0, 0, 0, 0.7);
	}
	.withdraw .box {
		width: 100%;
		background-color: #fff;
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

	.all {
		height: 100vh;
		background: #ffffff;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 24rpx 30rpx;
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
</style>