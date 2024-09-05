<template>
	<view style="height: 100vh;background: #fff;">
		<view class="nav flex">
			<view @click="back">
				<image style="width: 44rpx;height: 44rpx;" src="../../static/images/Frame.png" mode=""></image>
			</view>
			<view class="text">{{ $t('tk_zc.l_l71') }}</view>
			<view></view>
		</view>

		<view class="tab_list">
			<nut-tab  @tab-switch="tabSwitch" v-model="tabValue">
				<nut-tab-panel :tab-title="$t('tk_zc.l_l71')">
					<view class="mt16" style="flex:1;overflow-y: scroll;" v-if="recordsList.length>0">
						<view class="" v-for="(item,index) in recordsList" :key="index">
							<view class="box">
								<view class="between" style="align-items: center;">
									<view class="flex">
										<image style="width: 34rpx;height: 34rpx;" src="../../static/images/bGro2.png"
											mode=""></image>
										<view class="name text_bold">
											{{item.title}}
										</view>
									</view>
									<view class="" @click="xq(item)">
										<image src="../../static/images/bhelp.png" alt="" style="width: 40rpx;height: 40rpx;"></image>
									</view>

								</view>
								<view class="between mt11">
									<view class="pro">
										{{ currency }}{{item.price}}
									</view>
									<view class="buy" @click="tradeShow(item)">
										{{$t('tk_zc.l_l74')}}
									</view>
								</view>
							</view>
						</view>
					</view>
					<view style="margin-top: 40px;" v-if="nullShow">
						<image src="../../../static/images/empty/order.png"></image>
					</view>
				</nut-tab-panel>
				<nut-tab-panel :tab-title="$t('tk_zc.l_l80')">
					<TraRecords :currentKey="tabValue"></TraRecords>
				</nut-tab-panel>
			</nut-tab>
		</view>
		
		<view class="bten" v-if="messBoxmRo.length>0">
			<view v-for="item of messBoxmRo" :key="item.id">
				<view class="box animate__animated animate__bounceInRight">
					{{item.title}}
				</view>
			</view>
		</view>
		
		<nut-popup position="center" style="border-radius:32rpx;padding-bottom: 40rpx;" v-model="show1"
			:style="{ width:'94%',zIndex:100 }">
			<view class="pdlr32">
				<view class="between head">
					<view class="">

					</view>
					<view class="">
						{{$t('tk_zc.l_l75')}}
					</view>
					<image @click="passwordClickFun" style="width: 32rpx;height: 32rpx;" src="../../static/images/x.png"
						mode=""></image>
				</view>

				<view class="num_sum">{{currency}}{{num_sum<0?'0.00':num_sum}}</view>
				<view v-if="showYhj">
					<view class="yhj_title flex">
						<view class="t_l">{{ $t('bus_zc.l_l86') }}</view>
						<view class="t_r" v-if="yhj_list.length">{{ $t('bus_zc.l_l87') }}</view>
						<view class="t_r" v-else>{{$t('tk_zc.l_l88')}}</view>
					</view>
					<view class="yhj_list" v-if="yhj_list.length">
						<view class="tr" v-for="item in yhj_list" :key="item.id">
							<view class="y_l">{{ currency }}<text style="margin-left: 8rpx;font-size: 48rpx;">{{item.price}}</text>
							</view>
							<view class="y_c">{{$t('tk_zc.l_l86')}}</view>
							<view class="y_r">
								<uni-data-checkbox v-model="item.select" :localdata="range" multiple="true"
									selectedColor="red" @change="checkboxChange" selectedTextColor="red">
								</uni-data-checkbox>
							</view>
						</view>
					</view>
				</view>
				<view class="password">
					<view class="" style="margin-right: 30rpx;font-weight: bold; width: 30%;">
						{{$t('tk_zc.l_l76')}}
					</view>
					<input type="text" v-model="usePassword" :placeholder="$t('bus_zc.l_l78')">
				</view>
				<view class="submit" @click="Buy">
					{{$t('tk_zc.l_l77')}}
				</view>
			</view>
		</nut-popup>

		<nut-popup position="center" style="border-radius:32rpx;padding-bottom: 40rpx;" v-model="show2"
			:style="{ width:'94%',zIndex:100 }">
			<view class="pdlr32">
				<view class="between head">
					<view class="">

					</view>
					<view class="">
						{{$t('me_nu.t_6')}}
					</view>
					<image @click="show2=false" style="width: 32rpx;height: 32rpx;" src="../../static/images/x.png" mode="">
					</image>
				</view>
				<view class="text_center mt30" style="white-space: pre-line;">
					{{title}}
				</view>

			</view>
		</nut-popup>
	</view>

</template>

<script>
   	import {toast} from '@/utils/tools'
	import request from '@/utils/request'
	import store from '@/store'
	// import {
	// 	useI18n
	// } from 'vue-i18n';
	import TraRecords from './traRecords.vue'
	// const {
	// 	t,
	// 	locale
	// } = useI18n();
	// const store = userStore();
	// import io from 'socket.io-client'
	export default {
		data() {
			return {
				tabValue: 0,
				change:2,
				messBoxmRo:[],
				time:undefined,
				socket:undefined,
				show2:false,
				title: undefined,
				num_sum:null,
				selectIds:[],
				range:[{
					"value": 2,
					"text": ""
				}],
				qcdsq:undefined,
				infoText:undefined,
				changeIndex:1,
				backcolor:{
					backgroundColor: "#DD2755",
					color: '#fff'
				},
				recordsList:[],
				show1:false,
				commodityId:'',
				showYhj:false,
				yhj_list:[],
				usePassword:undefined,
				nullShow: false,
				currency: ''
			}
		},
		components:{
			TraRecords
		},
		onLoad() {
			this.currency = uni.getStorageSync('currency');
			this.getData()
		},
		methods: {
			xq (item){
				this.show2 = true
				this.title = item.info
			},
			// 优惠卷选择
			checkboxChange(e){
				this.yhj_list.forEach((item, index) => {
					if (item.select?.length > 0) {
						if (!this.selectIds.includes(item.id)) {
							this.selectIds.push(item.id)
							this.num_sum = (Number(this.num_sum) - Number(item.price)).toFixed(2)
						}

					} else {
						if (this.selectIds.includes(item.id)) {
							const index = this.selectIds.indexOf(item.id)
							this.selectIds.splice(index)
							this.num_sum = (Number(this.num_sum) + Number(item.price)).toFixed(2)
						}
					}
				})
			},
			back(){
				clearInterval(this.qcdsq)
				clearInterval(this.time)
				uni.redirectTo({
					url: '/pages/user/user'
				})
			},
			getData(){
				uni.showLoading()
				request({
					url: 'statistics/adList',
					method: "POST"
				})
				.then(res => {
					if(res.data&&res.data.list){
						this.recordsList = res.data.list || []
					}else{
						this.nullShow = true;
					}
					uni.hideLoading()
					
				}).catch(err => {
					uni.showToast({
						title: err,
						icon: "none",
						duration: 3000,
					})
					uni.hideLoading()
				})
			},
			traRecords(url){
				uni.navigateTo({
					url
				})
			},
			changeTab(ind){
				this.change = ind
				this.getData()
			},
			tradeShow(item){
				this.usePassword = '';
				this.yhj_list = []
				this.show1 = true
				this.commodityId = item.id
				this.num_sum = item.price
				this.showYhj = item.can_use_cup
				if (item.can_use_cup) this.yhjListFun()
			},
			// 获取优惠卷列表
			yhjListFun(){
				request({
					url: 'ad/couponLog',
					methods: 'get',
					data: {
						size: 1000
					}
				})
				.then(res => {
					this.yhj_list = res.data.data || []
				}).catch(err => {
					uni.showToast({
						title: err,
						icon: "none",
						duration: 30000
					})
				})
			},
			// 關閉彈窗
			passwordClickFun(){
				this.show1 = false
				this.yhj_list = []
				this.selectIds = []
			},
			Buy(){ // 输入支付密码提交
				if (!this.usePassword) {
                    this.$toast({title: this.$t('tk_zc.l_l78')})
					return false
				}
				uni.showLoading()
				request({
					url: 'Statistics/buyAd',
					method: "POST",
					data: {
						ad_id: this.commodityId,
						password: this.usePassword,
						coupon: this.selectIds || []
					}
				})
				.then(res => {
					toast({title: res.msg});
					if(res.code==1){
						this.show1 = false
						this.usePassword = ''
						this.getData()
						uni.hideLoading()
						this.yhj_list = []
						this.selectIds = []
						this.num_sum = 0
					}
				}).catch(err => {
					uni.showToast({
						title: err,
						icon: "none",
						duration: 3000
					})
					uni.hideLoading()
				})
			},
			tabSwitch: function(index, event) {
				this.tabValue = index;
			}
		}
	}
</script>

<style scoped>
	.nav {
		width: 100%;
		height: 88rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 32rpx 32rpx 0 32rpx;
		background-color: #fff;
	}
	.nav .text {
		font-size: 36rpx;
		color: #000;
	}
	::v-deep .nut-tabs__titles {
		background: transparent;
	}
	.popup-box{
		position: absolute;
		z-index: 11119 !important;
	}
	.nut-tabs__titles .active {
		/* color: $uni-color-error; */
	}
	.nut-tabs__titles .nut-tabs__titles-item__line {
		border-radius: 4rpx;
		/* // background: $uni-color-error; */
	}
	::v-deep .nut-tabpane {
		background-color: transparent;
		padding-top: 0px;
	}

	.head {
		box-sizing: border-box;
		padding: 30rpx 0rpx;
	}

	.num_sum {
		padding: 28rpx 0rpx;
		text-align: center;
		font-weight: 600;
		font-size: 48rpx;
		color: #40affa;
		border-bottom: 1px solid #E8E4E9;
	}
	.yhj_title {
		height: 80rpx;
		line-height: 80rpx;
		display: flex;
		justify-content: space-between;
		padding: 0 10rpx;
	}
	.yhj_title .t_l {
		font-weight: 600;
	}

	.yhj_title .t_r {
		color: #40affa;
	}
	.yhj_list {
		width: 100%;
		max-height: 260rpx;
		overflow-y: auto;
	}
	.yhj_list .tr {
		height: 90rpx;
		display: flex;
		align-items: center;
		margin-top: 12rpx;
		/* background: url('../../static/yhj_bj.png') no-repeat; */
		background-size: 100% 100%;
		padding: 0 32rpx;
		position: relative;
	}
	.yhj_list .tr .y_l {
		color: #40affa;
		font-weight: bold;
		display: flex;
		align-items: center;
	}

	.yhj_list .tr .y_c {
		font-size: 28rpx;
		margin-left: 120rpx;
	}

	.yhj_list .tr .y_r {
		width: 44rpx;
		position: absolute;
		right: 32rpx;
		top: 50%;
		transform: translateY(-50%);

	}
	.password {
		box-sizing: border-box;
		padding: 20rpx 32rpx;
		border-bottom: 1px solid #D9D9D9;
		display: flex;
		/* background: #EDEDED; */
		margin-top: 40rpx;
		border-radius: 16rpx;
		align-items: center;
	}

	.submit {
		width: 80%;
		height: 2.5rem;
		border-radius: 0.25rem;
		color: #fff;
		line-height: 2.5rem;
		text-align: center;
		/* margin-top: 80rpx; */
		background: #40affa;
		margin: 80rpx 12% 0 12%;
		/* display: flex;
		justify-content: center;
		align-items: center; */

	}
	.traBox {
		width: 50%;
		height: 100%;
		text-align: center;
		margin-top: 32rpx;
		color: #000;
	}
	.traBox .text {
		font-weight: 400;
		font-size: 36rpx;
		line-height: 42rpx;
	}

	.traBox .chang_xia {
		width: 82rpx;
		height: 6px;
		background: #40affa;
		border-radius: 4rpx;
		margin: 10rpx auto;

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
	.between{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.text_center{
		text-align: center;
	}
	.box {
		box-sizing: border-box;
		padding: 34rpx 24rpx 26rpx 32rpx;
		/* // background-color: $uni-bg-color; */
		margin-bottom: 24rpx;
		border-radius: 16rpx;
		box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.08);
	}
	.box .name {
		font-size: 32rpx;
		/* // color: $uni-text-color; */
		line-height: 38rpx;
		margin-left: 6rpx;
	}

	.box .pro {
		font-weight: 400;
		font-size: 28rpx;
		/* // color: $uni-color-error; */
		line-height: 32rpx;
	}

	.box .buy {
		font-size: 28rpx;
		color: #FFFFFF;
		box-sizing: border-box;
		padding: 8rpx 40rpx 8rpx 42rpx;
		background: #40affa;
		border-radius: 26rpx;
	}
	::v-deep .nut-tab{
		background: #fff;
		border: none;
	}
	::v-deep .nut-tab-link{
		font-size: 16px;
	}
	.box .name {
		font-size: 1rem;
		color: #171418;
		line-height: 1.1875rem;
		margin-left: 0.1875rem;
	}

	.text_bold {
		font-weight: bold;
	}
	.box .pro {
		font-weight: bold;
		font-size: 18px;
		color: #40affa;
		line-height: 1rem;
	}
	.mt11 {
		margin-top: 0.34375rem;
	}
	::v-deep .nut-tab-active a{
		color: #40affa;
	}
	::v-deep .nav-bar{
		background: #40affa;
	}
</style>
