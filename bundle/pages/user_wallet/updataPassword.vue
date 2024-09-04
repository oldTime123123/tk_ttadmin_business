<template>
	<view class="all">
		<view class="" style="position: relative;">
			<view class="nav flex" @click="back">
				<view class="">
					<image style="width: 44rpx;height: 44rpx;" src="../../../static/images/Frame.png" mode=""></image>
				</view>
				<view class="text">
					{{ $t('tk_wa.wa_a29') }}
				</view>
				<view class=""></view>
			</view>
		</view>
		<view class="withdraw" style="background:transparent">
			<view class="box">
				<view>
					<view  class="flex flex-col from-item" v-if="showOriginalPassword==1">
						<view class="title text_bold ">
							{{ $t('tk_wa.wa_a30') }}						
						</view>
						<view class="form-input">
							<input v-model="formData.old_password" :placeholder="$t('tk_wa.wa_a30')" type="password" />
						</view>
					</view>
					<view  class="flex flex-col from-item">
						<view class="title text_bold ">
							{{ $t('tk_wa.wa_a31') }}
						</view>
						<view class="form-input">
							<input v-model="formData.password" :placeholder="$t('tk_wa.wa_a31')" type="password"  />
						</view>
					</view>
					<view  class="flex flex-col from-item">
						<view class="title text_bold ">
							{{ $t('tk_wa.wa_a42') }}
						</view>
						<view class="form-input">
							<input v-model="newPassWord" :placeholder="$t('tk_wa.wa_a42')" type="password"  />
						</view>
					</view>
				</view>



				
				
			</view>
		</view>
		<view class="abs_bot pdlr32">
			<view class="sub_btn" @click="withdrawPassword" style="margin-top: 0;">
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
				newPassWord: null,
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
                currency:'$',
				showOriginalPassword: 0,//是否显示‘请输入原密码’
            }
        },
		
        onLoad(){
			this.showOriginalPassword = this.$route.query.payWd;	
        },
        methods: {
            back()  {
				history.back()
            },

			passwordShowfn(){
				this.passwordShow = true
				this.formData.password = ''
				this.formData.old_password = ''
			},
			withdrawPassword () {
				uni.showLoading()
				//没有绑定密码不需要输入原密码
				if (this.showOriginalPassword==1) {
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
				if (!this.newPassWord) {
					this.$toast({title: this.$t('tk_wa.wa_a42')})
					uni.hideLoading()
					return false
				}
				if(this.newPassWord!=this.formData.password){
					this.$toast({title: this.$t('tk_wa.wa_a42')})
					uni.hideLoading()
					return false
				}
				request({
					url: 'shop/changePayPwd',
					method: "POST",
					data: {
						...this.formData
					}
				}).then(res => {
					uni.hideLoading()
					this.$toast({title: this.$t('tk_show.sh_a12')})
					uni.navigateBack()
				}).catch(err => {
					uni.hideLoading()
					this.$toast({title: err.message})
				})
			},
			emailBtnShow() {
				this.emailShow = true
			},
			recordBtnShow  ()  {
				this.record = true
			},
			inputnull(){
				this.withdraw = true
				this.withdrawData.bankcardId = ''
				this.withdrawData.amount = ''
				this.withdrawData.password = ''
			}
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



 .all {
	height: 100vh; 
	background: #ffffff;
}


.all {
	justify-content: space-between;
	box-sizing: border-box;
	padding: 24rpx 30rpx;
}

.pdlr32 {
		padding-left: 1rem;
		padding-right: 1rem;
	}
	.abs_bot {
		height: 2.5rem;
		width: 100%;
		position: absolute;
		bottom: 2.5rem;
		left: 0;
		font-weight: bold;
	}
	.sub_btn {
		width: 100%;
		height: 2.5rem;
		color: #fff;
		line-height: 2.5rem;
		margin-top: 6.0625rem;
		border-radius: 1.375rem;
		background-color: #40affa;
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
		border: 1px solid #c1b9b9;
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
	::v-deep uni-input{
		width: 100%;
	}

</style>
