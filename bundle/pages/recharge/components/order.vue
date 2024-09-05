<template>
	<view style="background-color: #fff;padding-top: 44px">
		<view class="nav flex" @click="back" >
			<view class="">
				<image style="width: 44rpx;height: 44rpx;" src="../../../../static/images/Frame.png" mode=""></image>
			</view>
			<view class="text">
				{{ $t('me_nu.t_5') }}
			</view>
			<view class="">

			</view>
		</view>
		<view class="pdlr35 pdtb24">
			<view class="">
				<!-- top4 -->
				<view class=" top_box">
					<view class="f26 flex  col_center" style='color: #000;'>
						{{ $t('tk_wr.r_r4') }}: <text class="pl10 f34" style="color: #DD2755">{{
							showTime }}</text>
					</view>
					<view class="mt34  flex flex-col">
						<view class="items between">
							<view class="iTitle" style="color: #000;">{{ $t('tk_wr.r_r5') }}</view>
							<view :style="topItemStyle">{{ pageData.order_no }}</view>
						</view>
						<view class="items  between">
							<view class="iTitle" style="color: #000;">{{ $t('tk_wr.r_r6') }}</view>
							<view :style="topItemStyle">{{ pageData.amount }}</view>
						</view>
						<view class="items topLine  between">
							<view class="iTitle" style="color: #000;">{{ $t('tk_wr.r_r10') }}</view>
							<view :style="topItemStyle">
								{{ $t('tk_wr.r_r7') }}
							</view>
						</view>
						<view class="items topLine between" v-if="recType && recType == 'usdt'">
							<view class="iTitle" style="color: #000;">USDT</view>
							<view :style="topItemStyle">{{ pageData.amount ? ((pageData.amount) * rate).toFixed(2) : 0
								}} 
							</view>
						</view>
					</view>
				</view>

				<view class="addressBox">
					<view class="typeList center mb30">
						<view class="mglr20 typeItem" v-if="recType == 'usdt'">TRC20</view>
						<!-- <view class="mglr20 typeItem" v-for="(item, index) in typeList"
							:style="typeInd == index ? choStyle : ''" @click="changeCode(index)">{{ item.name }}</view> -->
					</view>
					<image :src="pageData.qrcode" mode="widthFix" v-if="pageData.qrcode"
						style="width: 264rpx;height:264rpx">
					</image>
					<view v-if="addresData">
						<!-- <qrcode-vue :value="addresData" :size="132" level="H" /> -->
						<vue-qr :size="132" :text="addresData"></vue-qr>
					</view>
					
					<view class="mt35 f26" style="color: #000;">
						{{ $t('tk_wr.r_r8') }}
					</view>
					<view class="mt23 f22 addCopyEl " @click="copyHandle(addresData)">
						<view class="addEl">
							{{ addresData }}

						</view>
						<view class="copy flex-center" @click="copyHandle(addresData)">
							<image src="../../../../static/images/copy.png" style="width: 28rpx;height: 28rpx;"></image>
						</view>
					</view>

					<view class="copyBtn tCenter">
						<view v-html="text"></view>
						<view class="choStyled" v-if='length > 0 ? true : false' @click="goService">
							<view>
								{{ server[0] ? server[0].service_name : '' }}
								({{ server[0] ? server[0].start_working_time : '' }} ~{{ server[0] ? server[0].end_working_time
									: '' }})
							</view>
						</view>
					</view>
				</view>
				<view class="sub_btn" style="margin-top: 40rpx;" @click="back1">
					{{ $t('me_nu.t_5') }}
				</view>
				<view class="sub_btn not_sub" style="margin-top: 20rpx;margin-bottom: 32rpx;" @click="cancleOrder">
					{{ $t('tk_wr.r_r9') }} 
				</view>



			</view>
		</view>
		<nut-dialog :visible="cancleHandlemMask" @ok-btn-click="confirmHandle" @cancel-btn-click="cancleHandlemMask=false" @close="cancleHandlemMask=false" 
		:cancelBtnTxt="$t('tk_al.a_c2')" :okBtnTxt="$t('tk_al.a_c1')">
			<div class="wrapper">
				<div class="content ">
					<view class="f40">{{ $t('tk_wr.r_r12') }}</view>
					<view class="f30 mt40">
						{{ $t('tk_wr.r_r11') }}
					</view>
				</div>
			</div>
		</nut-dialog>
		<view class="bten" v-if="messBoxmUsdOd.length>0">
			<view class="" v-for="item of messBoxmUsdOd" :key="item.id">
				<view class="box animate__animated animate__bounceInRight">
					{{ item.title }}
				</view>
			</view>
		</view>
	</view>
	
</template>
<script>
	import VueQr from 'vue-qr';
	import request from '@/utils/request'
    export default {
		components: {
			VueQr,
		},
        data() {
            return {
                recType:null,
				messBoxmUsdOd:[],
				time:undefined,
				socket:undefined,
				qcdsq:undefined,
				typeList:{
					name: 'TRC20'
				},
				typeInd:0,
				choStyled:{
					background: "#F36708",
					color: '#fff',
					border: 'none'
				},
				noStyle:{
					color: "#DD2755",
				},
				topItemStyle:{
					color: "#DD2755",
					marginTop: '10rpx'
				},
				pageData:{},
				addresData:"",
				length:undefined,
				timer:undefined,
				showTime:0,
				rate:0,
				times:0,
				choStyle:{
					background: "#DD2755",
					color: '#fff',
					border: 'none'
				},
				uploadTxid:null,
				server:[],
				text:undefined,
				cancleHandlemMask:false,

            }
        },
		onHide(){
			if (this.timer) {
				clearInterval(this.timer)
			}
		},
        onLoad(e){
			this.recType = e.type;
            this.getData();
        },
        methods: {
            back()  {
                clearInterval(this.qcdsq)
                clearInterval(this.time)
                history.back()

            },
			back1() {
				//测试
				uni.navigateTo({
					url: `/bundle/pages/recharge/components/txid?type=${this.recType}`
				})
				return
				if (!this.uploadTxid) {
					uni.showModal({
						title: 'Tips',
						content: 'Please transfer money from the trc20 wallet to the receiving address as soon as possible!',
						confirmText: 'Confirm',
						cancelText: 'Cancel',
						success: e => {
							if (e.confirm) {
								uni.navigateTo({
									url: '/bundle/pages/user_wallet/user_wallet'
								})
							} else {

							}
						}
					});
				} else {
					uni.navigateTo({
						url: `/pages/recharge/components/txid?type=${this.recType}`
					})
				}
			},
			service(){
				uni.switchTab({
					url: '../tabbar/service'
				})
			},
			changeCode(ind){
				this.typeInd = ind
			},
			goService(){
				if (this.server.length > 0) {
					var userAgent = navigator.userAgent; //获取userAgent信息
					if (userAgent.includes('iPhone')) {
						window.location.href = this.server[0].contact_link
					} else {
						try {
							window.anecine_log.open_customer(this.server[0].contact_link);
							// window.open(item.contact_link)
						} catch (e) {
							window.open(this.server[0].contact_link)
							//TODO handle the exception
						}
						// window.open(item.contact_link)
						// window.location.href = item.contact_link


					}

				}
			},
			getData(){
				// request({
				// 	url: `finance/${this.recType}/recharge/index`,
				// 	methods: 'get'
				// }).then(res => {
				// 	if (!res.order) {
				// 		uni.navigateTo({
				// 			url: '/bundle/pages/user_wallet/user_wallet'
				// 		})
				// 		return false
				// 	}
				// 	this.text = res.u_text
				// 	this.addresData = res.address
				// 	this.pageData = res.order
				// 	this.server = res.service
				// 	this.length = res.service.length

				// 	try {
				// 		if (res.type) {

				// 			res.type == 1 ? this.uploadTxid = false : uploadTxid.value = true
				// 		}
				// 	} catch (e) {
				// 	}

				// 	this.rate = res.rate
				// 	if (this.timer) {
				// 		clearInterval(this.timer)
				// 	}
				// 	this.times = res.order.expire_time
				// 	this.startTimer()
				// })

				//测试
				let res= {
					"address": "TFhwTjF1oioYyCHLNhhF7xEa8jV6SCk8TJ",
					"address_type": "trc",
					"address_TRC20": "TFhwTjF1oioYyCHLNhhF7xEa8jV6SCk8TJ",
					"address_ERC20": "",
					"max": "100000",
					"min": "10",
					"rate": "1",
					"type": 2,
					"buttons": [],
					"hint": "",
					"upload_host": "https:\/\/v1.imgstoragebobo.com\/",
					"u_text": "<p>sdfasdafdsafsdfdsfasd13132<\/p>",
					"other_txt": "<p>三方充值文案<\/p>",
					"balance": "5000012.62",
					"order": {
						"id": 1190,
						"order_no": "CZ2408071559331381",
						"createTime": "2024-08-07 09:59:33",
						"amount": 10,
						"status": 0,
						"expire_time": 1799,
						"usdt_address": "TFhwTjF1oioYyCHLNhhF7xEa8jV6SCk8TJ",
						"tx_id": "",
						"cert": "",
						"balance_type": 1,
						"updateTime": 1723017574
					},
					"service": [
						{
							"id": 8,
							"avatar": "https:\/\/tk.task678.com\/upload\/image\/20240527\/069e9a058fe5f4e9204dfba0744c5899.jpg",
							"service_name": "TIKTOK系统",
							"contact_link": "https:\/\/t.me\/btceth96",
							"start_working_time": "00:00",
							"end_working_time": "08:00"
						}
					]
				}
				if (!res.order) {
						uni.navigateTo({
							url: '/bundle/pages/user_wallet/user_wallet'
						})
						return false
					}
					this.text = res.u_text
					this.addresData = res.address
					this.pageData = res.order
					this.server = res.service
					this.length = res.service.length

					try {
						if (res.type) {

							res.type == 1 ? this.uploadTxid = false : uploadTxid.value = true
						}
					} catch (e) {
						//TODO handle the exception
					}

					this.rate = res.rate
					if (this.timer) {
						clearInterval(this.timer)
					}
					this.times = res.order.expire_time
					this.startTimer()
			},
			goBack(){
				history.back()
			},
			async copyHandle(data){
				try {
					await this.toClipboard(data)
					this.$toast({title: this.$t('tk_al.a_d1') + " " + this.$t('tk_al.a_c9')})
				} catch (e) {
					console.error(e)
				}
			},
			cancleOrder(){
				this.cancleHandlemMask = true
			},
			confirmHandle(){
				request({
					url: `finance/${this.recType}/recharge/cancel`,
					method: "POST",
					data: {
						order_no: this.pageData.order_no
					}
				}).then(res => {
					this.$toast({title: res.msg})
					if(res.code==1){
						uni.navigateTo({
							url: '/bundle/pages/user_wallet/user_wallet'
						})
					}
				}).catch(err => {
					this.$toast({title: err})
				})
			},
			changeTime(num){
				let minute = parseInt(num / 60)
				let second = num % 60
				this.showTime = (minute < 10 ? '0' + minute : minute) + ":" + (second < 10 ? '0' + second : second)
			},
			// 开始时间减减

			startTimer() {
				const that = this
				this.timer = setInterval(() => {
					if (this.times == 0) {
						clearTimeout(this.timer)
						this.back1()
					} else {
						this.times--;
						this.changeTime(this.times)
					}
				}, 1000)
			}

        }
        
    }
</script>

<style scoped>
	.pdlr35 {
		padding-left: 1.09375rem;
		padding-right: 1.093751rem;
		background-color: #fff;
	}
	.pdtb24 {
		padding-top: 0.75rem;
		padding-bottom: 0.75rem;
	}
	.f26 {
		font-size: 0.8125rem;
	}
	.flex {
		display: flex;
	}
	.col_center {
		align-items: center !important;
	}
	.mt34 {
		margin-top: 1.0625rem;
	}
	.flex-col{
		flex-direction: column;
	}
	.between {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.f34{
		font-size: 1.0625rem;
	}
	.pl10{
		padding-left: 0.3125rem;
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
		/* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1); */
		transition: opacity .3s, transform .3s, left .3s, right .3s, top .4s, bottom .3s;
		overflow: hidden;
	}

	.nav {
		width: 100%;
		height: 88rpx;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 0rpx 32rpx;
	}
	.nav .text {
		font-size: 36rpx;
		color: #171418;

	}
	.text_bold{
		font-weight: bold;
	}

	.btns {
		width: 100%;
		height: 2.5rem;
		border-radius: 0.25rem;
		color: #fff;
		line-height: 2.5rem;
		text-align: center;
	}

	.copyBtn {
		font-size: 24rpx;
		margin-top: 20rpx;
		width: 100%;
		color: #000;
		.choStyled{
			color: #62e8ff;
		}
	}
	.tCenter{
		text-align: center;
	}
	.btns {
		width: 100%;
		height: 2.5rem;
		border-radius: 0.25rem;
		color: #fff !important;
		line-height: 2.5rem;
		text-align: center;
	}
	.top_box {
		padding: 21rpx 32rpx;
		background-color: #FFFFFF;
		border-radius: 30rpx;
		color: #fff;
		/* box-shadow: 0px 1px 8px 0px rgba(76,3,3,0.08); */
	}
	.top_box .items {
		width: 100%;
		padding: 28rpx 24rpx;
		font-size: 24rpx;
		/* background-color: #F4F4F4; */
		margin-bottom: 24rpx;
		border-radius: 20rpx;
	}

	.top_box .flex-wrap {
		flex-wrap: wrap;
	}

	.addressBox {
		margin-top: 16rpx;
		display: flex;
		align-items: center;
		flex-direction: column;
		padding: 21rpx 32rpx;
		border-radius: 30rpx;
		background-color: #FFFFFF;
		color: #fff;
		/* box-shadow: 0px 1px 8px 0px rgba(76,3,3,0.08); */
	}
	.addressBox .typeItem {
		padding: 14rpx 32rpx;
		border-radius: 10rpx;
		background: #DD2755;
		color: '#fff';
		border: 'none'
	}

	.addressBox .addCopyEl {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.addressBox .addEl {
		color: #000;
		height: 60rpx;
		background: #fff;
		border-radius: 10rpx;
		/* // padding: 0 30rpx; */
		text-align: center;
		line-height: 60rpx;
		padding: 0 20rpx;
		flex: 1;
		margin-right: 20rpx;
	}

	.addressBox .copy {
		padding: 0 20rpx;
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 10rpx;
		background-color: #DD2755;
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
	.not_sub {
		background-color: #ffffff;
		border: 1px solid #DD2755;
		color: #DD2755;
	}

	.nut-dialog-wrapper ::v-deep .nut-dialog{
		max-height: 40vh !important;
	}
	.nut-dialog .wrapper {
		display: flex;
		height: 100%;
		justify-content: center;
		padding: 0 50rpx;
	}
	.nut-dialog .wrapper .content {
		/* margin-top: 400rpx; */
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		/* height: 350rpx; */
		background: #fff;
		color: #000;
		border-radius: 30rpx;
		/* // justify-content: center; */
		/* padding-top: 50rpx; */
		position: relative;
		overflow: hidden;
	}
	.nut-dialog .wrapper .content .between {
		position: absolute;
		bottom: 0;
		width: calc(100% - 80rpx);
		padding: 0 30rpx 40rpx;
	}
	.nut-dialog .wrapper .content .between view {
		width: 48%;
		height: 100rpx;
		color: #fff;
		text-align: center;
		line-height: 100rpx;
		font-size: 30rpx;
		border-radius: 50rpx
	}
	.f40{
		font-size: 1.25rem;
	}
	.f30{
		font-size: 0.9375rem;
	}
	.mt40{
		margin-top: 1.25rem;
	}
</style>
