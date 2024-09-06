<template>
	<view>
		<view class="orderM">
			<Settled v-if="Certification_Status!=3"></Settled>
			<view class="uTans" :style="{top: Certification_Status==3?'0':'180px'}">

				<view class="menu flex mt14">
					<view class="menu_tab" @click="tabsChange(0)">
						<!-- :value="numList[0]"  -->
						<nut-badge top='8' right="20" :max="99" :value="numTotal">
							<view class="text" :class="{'color-r': myListIndex == 0}">
								{{ $t('bus_ord.od_a21') }}
							</view>
						</nut-badge>

						<view v-if="0 == myListIndex" class="bor_btn"></view>
					</view>
					<view class="menu_tab" @click="tabsChange(1)">
						<nut-badge top='8' right="20" :max="99" :value="numList.pay">
							<view class="text" :class="{'color-r': myListIndex == 1}">
								{{ $t('bus_ord.od_a22') }}
							</view>
						</nut-badge>
						<view v-if="1 == myListIndex" class="bor_btn"></view>
					</view>
					<view class="menu_tab" @click="tabsChange(2)">
						<nut-badge top='8' right="20" :max="99" :value="numList.delivery">
							<view class="text" :class="{'color-r': myListIndex == 2}">
								{{ $t('bus_ord.od_a23') }}
							</view>
						</nut-badge>

						<view v-if="2 == myListIndex" class="bor_btn"></view>
					</view>
					<view class="menu_tab" @click="tabsChange(3)">
						<nut-badge top='8' right="20" :max="99" :value="numList.receiving">
							<view class="text" :class="{'color-r': myListIndex == 3}">
								{{ $t('bus_ord.od_a24') }}
							</view>
						</nut-badge>

						<view v-if="3 == myListIndex" class="bor_btn"></view>
					</view>
					<view class="menu_tab" @click="tabsChange(4)">
						<nut-badge top='8' right="20" :max="99" :value="numList.finish">
							<view class="text" :class="{'color-r': myListIndex == 4}">
								{{ $t('bus_ord.od_a25') }}
							</view>
						</nut-badge>

						<view v-if="4 == myListIndex" class="bor_btn"></view>
					</view>
					<view class="menu_tab" @click="tabsChange(5)">
						<nut-badge top='8' right="20" :max="99" :value="numList.close">
							<view class="text" :class="{'color-r': myListIndex == 5}">
								{{ $t('bus_ord.od_a26') }}
							</view>
						</nut-badge>
						<view v-if="5 == myListIndex" class="bor_btn"></view>
					</view>
				</view>

			</view>
			<view class="uFixed" :style="{top: Certification_Status==3?'45px':'245px'}">
				<z-paging class="mt54 " ref="paging" v-model="recordsList" @query="getData" width="100%" :fixed="false"
					:refresher-enabled="false" :auto='false' :to-bottom-loading-more-enabled="true"
					:auto-full-height="true" :auto-show-back-to-top="true" 
					:empty-view-text="$t('tk_re.r_r1')" :loading-more-default-text="$t('tk_re.r_r2')"
					:loading-more-no-more-text="$t('tk_re.r_r1')" :empty-view-reload-text="$t('tk_re.r_r2')"
					:loading-more-loading-text="$t('tk_re.r_r4')" :loading-more-fail-text="$t('tk_re.r_r3')"
					style="margin: 0rpx 0rpx 0rpx 0rpx;width: 100%;height:100%;  "
					:style="myListIndex == 1 ? 'margin: 0rpx 0rpx 120rpx 0rpx' : ''">
					<view class="title muted sm" v-if="count">
						{{$t('bus_ord.od_39')}} {{count}} {{$t('bus_ord.od_40')}}
					</view>
					<view class="mt20 main" v-for="item of recordsList">
						<view class="pdlr32">
							<view class="commodity flex">
								<view class="flex">
									<nut-checkbox v-if="myListIndex == 1" @change="selected"
										v-model="item.change"></nut-checkbox>
									<view class="" style="font-size: 24rpx;font-weight: 600;">
										{{ $t('bus_ord.od_a2') }}({{ item.order_sn }})
									</view>
								</view>
								<view class="" style="color: #959595;">
									<!-- {{ $t(`bus_ord.od_a${item.order_status+3}`) }} -->
									{{ item.order_status_text }}
								</view>
							</view>
							<!--  v-if='item.delivery && item.order_status == 2' @click="delivery(item.delivery)"-->
							<view class="info_box" v-if='item.order_status == 2'
								@click="delivery(item)">
								<view class="info" style="border: none;"></view>
								<view class="info">
									{{ $t('bus_ord.od_a9') }}
								</view>
							</view>
							<view class="flex box" v-for="dele of item.order_goods">
								<view class="img">
									<image style="width: 100%;height: 100%;" :src="dele.image" mode=""></image>
								</view>
								<view class="introduce">
									<view class="introduce_box">
										<view class="text_content">
											{{ dele.goods_name }}
										</view>
										<view class="flex sp_info">
											<view class="text">
												{{ $t('bus_ord.od_a10') }} {{ currency }}{{ dele.cost_price }}
											</view>
											<view class="text">
												{{ $t('bus_ord.od_a11') }} {{ currency }}{{ dele.goods_price }}
											</view>
											<view class="text">
												X {{ dele.goods_num }}
											</view>
										</view>
										<!-- <view style="text-align: right;" v-if="dele.goods.stock">
											{{ $t('tk_show.sh_a3') }}: 9999+
										</view> -->
									</view>
								</view>
							</view>
							<view class="illustrate mt20 flex">
								<view class="flex col_center" style="width: 100%;">
									<view class="flex flex-col flex1">
										<view class="num">
											{{ currency }}{{ item.cost_price }}
										</view>
										<view class="">
											{{ $t('bus_ord.od_a12') }}
										</view>
									</view>
									<view class="flex flex-col flex1">
										<view class="num">
											{{ currency }}{{ item.profit }}
										</view>
										<view class="">
											{{ $t('bus_ord.od_a13') }}
										</view>
									</view>
									<view class="flex flex-col flex1">
										<view class="num">
											{{ currency }}{{ item.order_amount }}
										</view>
										<view class="">
											{{ $t('bus_ord.od_a14') }}
										</view>
									</view>
								</view>
							</view>
							<view class="createTime mt16">
								{{ item.create_time }}
							</view>
						</view>
						<view class="geli"></view>
					</view>
				</z-paging>
			</view>


			<view class="add" v-if="myListIndex == 1&&recordsList.length>0">
				<view class="flex" style="width: 100%;justify-content: space-between;">
					<nut-checkbox @change='selectAll' v-model="allChange" class="allSelect">{{ $t('bus_ord.od_a15') }}</nut-checkbox>
					<view class="add_box" @click="add">
						{{ $t('bus_ord.od_a16') }}{{ currency }}{{ numberTotle }}
					</view>
				</view>

			</view>
			<view class="withdraw" v-if='passwordShow'>
				<view class="box  animate__animated animate__bounceInUp" style="height: 50%;">
					<view class="flex head pdlr32">
						<view class="">

						</view>
						<view class="head_title">
							{{ $t('bus_ord.od_a18') }}
						</view>
						<image @click="passwordShow = false" style="width: 32rpx;height: 32rpx;"
							src="../../bundle/static/images/x.png" mode=""></image>
					</view>


					<view class="pdlr64 mt40">
						<view class=" shuru">
							<view class="" style="margin-bottom: 20rpx;">
								{{ $t('bus_ord.od_a19') }}
							</view>
							<input v-model="password" type="password" style="border: 1px solid rgb(151 143 153);height: 35px;" />

							<view class="" style="width: 100%;">

							</view>
						</view>

					</view>
					<view class="btn" @click="submit">
						{{ $t('bus_zc.zc_a15') }}
					</view>
				</view>
			</view>
			<view class="withdraw" v-if='withdraw'>
				<view class="box animate__animated animate__bounceInUp">
					<view class="flex head pdlr32">
						<view class="">

						</view>
						<view class="head_title">
							{{ $t('bus_ord.od_a17') }}
						</view>
						<image @click="withdraw = false" style="width: 32rpx;height: 32rpx;" src="../../bundle/static/images/x.png"
							mode=""></image>
					</view>

					<view class="pdlr32 mt50 bxo">
						<nut-steps status="process" :current="stepCurrent" style="margin-top: 10px;">
							<nut-step :key="index" v-for="(item,index) in deliveryData" :title="item.desc" :content="item.exec_timestamp"></nut-step>
						</nut-steps>

					</view>

				</view>

			</view>
			
			<!--详情-->
			<!-- <Details ref="sonRef" @itemDetails="itemDetails" :detailsData="detailsData"></Details> -->
		</view>

		<!-- <Menu :bottom="300"></Menu> -->
	</view>
</template>

<script>
	// import Menu from '@/components/menu.vue'
	// import Details from '@/components/product/details.vue'
	import Settled from "@/components/Settled/Settled";
	import request from '@/utils/request'
	import store from '@/store'
	import { timestampToTime } from "@/utils/tools.js";
	// import { t } from '@lang/zh.js'
	// const {
	// 	t,
	// 	locale
	// } = useI18n();
	// const store = userStore();
	// import io from 'socket.io-client'
	export default {
		data() {
			return {
				time:undefined,
				socket:undefined,
				qcdsq:undefined,
				withdraw:false,
				paging:null,
				recordsList:[],
				count:0,
				pages:{
					status: 0,
					page: 1,
					size: 10
				},
				numberTotle:0,
				shangpId:[],
				sonRef:undefined,
				detailsData:"",
				menuStyle:{
					backgroundColor: "#4999BC",
					color: '#fff',
					border: 'none'
				},
				listStyle:{
					color: "#383439"
				},
				myListIndex:0,
				myList:[{
					name: this.$t('bus_ord.od_a21'),
					value: 0,
					type: 'all',
				},
				{
					name: this.$t('bus_ord.od_a22'),
					value: 1,
					type: 'pay',
				},
				{
					name: this.$t('bus_ord.od_a23'),
					value: 2,
					type: 'delivery',
				},
				{
					name: this.$t('bus_ord.od_a24'),
					value: 3,
					type: 'receiving',
				},
				{
					name: this.$t('bus_ord.od_a25'),
					value: 4,
					type: 'finish',
				},
				{
					name: this.$t('bus_ord.od_a26'),
					value: 5,
					type: 'close',
				}],
				num_sum:null,
				passwordShow:false,
				password:undefined,
				yhj_list: [],
				selectIds:[],
				range:{
					"value": 2,
					"text": ""
				},
				deliveryData:[],
				stepCurrent: 0,
				allChange:false,
				numList:{},
				numTotal: 0,
				currency:'',
				Certification_Status: ""
			}
		},
		onShow(){
			this.Certification_Status = uni.getStorageSync('Certification_Status');
			this.pages.page = 1;
			this.pages.status = 0;
			this.myListIndex = 0;
			this.currency = uni.getStorageSync('currency');
			if (store.getters.token) {
				this.setTabBar();
				this.getData();
				this.orderNum()
			} else if (e.data) {
				this.login(e.data)
			} else {
				uni.navigateTo({
					url: './index'
				})
			}
		},
		methods: {
			setTabBar(){
				uni.setTabBarItem({
					index: 0,
					text: this.$t('tabbar.home')
				})
				uni.setTabBarItem({
					index: 1,
					text: this.$t('tabbar.manage')
				})
				uni.setTabBarItem({
					index: 2,
					text: this.$t('tabbar.order')
				})
				uni.setTabBarItem({
					index: 3,
					text: this.$t('tabbar.my')
				})
			},
			Jumplink(url){
				uni.navigateTo({
					url: url
				})
			},
			tabsChange(ind){
				if(this.Certification_Status!=3){
					this.$toast({
						title: this.$t('bus_my.y28'),
					});
					return
				}
				this.allChange = false
				this.numberTotle = 0
				this.myListIndex = ind
				this.pages.page = 1
				this.pages.status = ind
				this.$refs.paging.clean() //清空数组
				this.getData()
				this.orderNum()
			},
			back(){
				history.back()
			},
			selected(){
				this.numberTotle = 0
				this.shangpId = []
				this.recordsList.forEach(item => {
					if (item.change) {
						this.numberTotle = (Number(this.numberTotle) + Number(item.cost_price)).toFixed(2)
						this.allChange = true
						this.shangpId.push(item.id)

					} else {
						this.allChange = false
					}

				})
			},
			selectAll(){
				this.numberTotle = 0
				this.shangpId = []
				if (this.allChange) {					
					this.recordsList.forEach(item => {
						item.change = true
						this.numberTotle = (Number(this.numberTotle) + Number(item.cost_price)).toFixed(2)
						this.shangpId.push(item.id)
					})
				} else {
					this.recordsList.forEach(item => {
						item.change = false
					})
					this.numberTotle = 0
					this.shangpId = []

				}
			},
			// 詳情顯示
			itemFun(item){
				if (!item.goods.content) return
				this.detailsData = item.goods.content
				this.itemDetails(true)
			},
			citemDetails(bool){
				this.sonRef.itemDetails(bool)
			},
			add ()  {
				if (this.shangpId.length == 0) {
					this.$toast({title: this.$t('bus_ord.od_a28')})
					return false
				}
				this.num_sum = this.numberTotle;
				this.password = '';
				this.passwordShow = true;
				// this.yhjListFun()

			},
			// 获取优惠卷列表
			yhjListFun() {
				request({
					url: 'ad/couponLog',
					methods: 'get',
					data: {
						size: 1000
					}
				}).then(res => {
					this.yhj_list = res.data.data || []
				}).catch(err => {
					uni.showToast({
						title: err.message,
						icon: "none",
						duration: 30000
					})
				})
			},
			submit () {
				uni.showLoading()
				if (!this.password) {
					this.$toast({title: this.$t('bus_ord.od_a29')})
					uni.hideLoading()
					return false
				}

				request({
					url: 'order/pay',
					method: "POST",
					data: {
						ids: this.shangpId,
						password: this.password
					}
				}).then(res => {
					if(res.code==1){
						this.passwordShow = false
						this.password = ''
						this.pages.status = 1
						this.pages.page = 1
						this.shangpId = []
						this.getData()
					}else{
						this.$toast({title: res.msg});
					}
					uni.hideLoading()
				}).catch(err => {
					uni.hideLoading()
					this.$toast({title: err})
				})
			},
			delivery(item)  {
				if(this.Certification_Status!=3){
					this.$toast({
						title: this.$t('bus_my.y28'),
					});
					return
				}
				request({
					url: 'order/deliveryLists',
					methods: 'get',
					data: {
						oid: item.id,
					}
				}).then((res)=>{
					if(res.code==1&&res.data){
						this.deliveryData = res.data;
						this.stepCurrent = res.data.length;
						this.withdraw = true
					}
					uni.hideLoading()
				}).catch((err) => {
					uni.hideLoading()
					this.$toast({title: err.message})
				})
			},
			passwordClickFun(){
				this.passwordShow = false
				this.yhj_list = []
				this.selectIds = []
			},
			getData(){
				uni.showLoading()
				request({
					url: 'order/lists',
					methods: 'get',
					data: {
						type: this.myList.filter((m)=>m.value==this.pages.status)[0].type,
						page_no: this.pages.page,
						page_size: this.pages.size,
					}
				}).then((res)=>{
					if(res.code==1){
						if(res.data.list){
							res.data.list.forEach(item => {
								item.change = false
							})			
							this.count = res.data.count;
							this.$refs.paging.complete(res.data.list);
							this.pages.page += 1
						}
					}
					uni.hideLoading()
				}).catch((err) => {
					uni.hideLoading()
					this.$toast({title: err.message})
				})
			},
			orderNum() {
				uni.showLoading()
				request({
					url: 'order/getOrderStatusNumber',
					methods: 'get',

				}).then(res => {
					if(res.code==1&&res.data){
						this.numTotal = res.data.pay+res.data.delivery+res.data.receiving+res.data.finish+res.data.close;
						this.numList = res.data
					}
					uni.hideLoading()
				}).catch(err => {
					uni.hideLoading()
					this.$toast({title: err.message})
				})
			},
			login(data){
				uni.showLoading()
				request({
					url: 'join/login',
					method: "POST",
					data: {
						data: data
					}
				}).then(res => {
					if(res.code==1&&res.data){
						uni.setStorageSync('token', res.data.accessToken)
						uni.setStorageSync('userInfo', res.data.userInfo)
						window.location.reload()
					}else{
						this.$toast({title: res.msg});
					}
					uni.hideLoading()
				}).catch(err => {
					uni.hideLoading()
					uni.showToast({
						title: err,
						icon: 'none'
					})

				})
			},
		}
	}
</script>


<style lang="scss" scoped>
	.orderM{
		position: relative;
		height: 100vh; 
		display:flex;
		flex-direction: column;
	}
	.mask{
		position: static;
		width:100%;
		height:100vh;
		background:rgba(0,0,0,0.4)
	}
	.pdlr32{
		padding-left: 1rem;
		padding-right: 1rem;
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



	.bxo {
		height: 90%;
		overflow-y: scroll;
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
		background: #2095E9;
	}


	.add .add_box {
		width: 500rpx !important;
		height: 62rpx;
		color: #fff;
		text-align: center;
		line-height: 62rpx;
		border-radius: 15rpx;
		font-size: 24rpx;
		background: #2095E9;
	}

	.withdraw {
		position: absolute;
		height: 100vh;
		bottom: 0rpx;
		width: 100%;
		z-index: 999;
		background: rgba(0, 0, 0, 0.7);
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
	.withdraw .box .head .head_title {
		color: #171418;
		font-weight: 600;
		font-size: 36rpx;

	}

	.withdraw .user_inp {
		margin-top: 56rpx;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2rpx solid #E8E4E9;
		box-sizing: border-box;
		padding: 28rpx 0rpx;
	}
	.withdraw .user_inp .inps {
		color: #C6C2C7;
		font-size: 28rpx;
	}

	.add {
		position: fixed;
		bottom: 55px;
		width: 100%;
		height: 82rpx;
		z-index: 999;
		background-color: #fff;
		box-sizing: border-box;
		padding: 10rpx 30rpx 0rpx 30rpx;
		display: flex;
		justify-content: flex-end;
		border: none;
	}
	.add .add_box {
		width: 164rpx;
		height: 62rpx;
		color: #fff;
		text-align: center;
		line-height: 62rpx;
		border-radius: 15rpx;
		font-size: 24rpx;
	}
	.sm{
		margin: 20px 25px 15px 25px;
	}
	
	.main .commodity {
		color: #000;
		font-size: 26rpx;
		justify-content: space-between;
		font-weight: 700;
		margin: 20rpx;

	}

	.main .info_box {
		display: flex;
		justify-content: space-between;
	}
	.info_box .info {
		font-size: 24rpx;
		color: #2095E9;
		box-sizing: border-box;
		padding: 2rpx;
		border: 1px solid #2095E9;
		border-radius: 8rpx;
	}

	.main .box {
		margin-top: 20rpx;
	}
	.main .box .img {
		width: 142rpx;
		height: 156rpx;
	}

	.main .box .introduce {
		flex: 1;
		margin-left: 20rpx;
	}
	.introduce .introduce_box {
		font-size: 24rpx;
		height: 100%;
		flex-direction: column;
		display: flex;
		color: #6E6D6E;
	}
	.introduce_box .text_content {
		word-break: break-all;
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.introduce_box .sp_info {
		margin-top: 20rpx;
		color: #000;
		font-weight: 600;
	}
	.sp_info .text {
		margin-right: 20rpx;
	}

	.illustrate {
		height: 115rpx;
		background-color: #EDEDED;
		box-sizing: border-box;
		font-size: 24rpx;
		border-radius: 8px;
		color: #5C5C5C;
		font-size: 24rpx;
	}
	.illustrate .flex1 {
		flex: 1;
		text-align: center;
	}
	.flex1 .num {
		color: #2095E9;
		font-weight: 600;
		font-size: 26rpx;
	}

	.createTime {
		text-align: right;
		color: #959595;
		font-size: 24rpx;
	}
	.mt16{
		margin-top: 0.5rem;
	}
	.change {
		justify-content: space-between;
		align-items: center;
	}
	.change .tuig {
		width: 160rpx;
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 20rpx;
		color: #fff;
		text-align: center;
		font-size: 24rpx;
	}

	.geli {
		width: 100%;
		height: 22rpx;
		background-color: #EDEDED;
		margin-top: 20rpx;
	}

	::v-deep .nut-badge {
		.sup {
			background: #2095E9;
		}
	}

	::v-deep .nut-checkbox__icon {
		color: rgb(64, 175, 250);
	}

	.menu {
		width: 100%;
		justify-content: flex-start;
		color: #817C81;
		font-size: 32rpx;
		font-weight: 600;
		display: flex; 
		border-bottom: 0; 
		border: 0; 
		overflow-x: scroll; 
		overflow-y: hidden;
	}
	.menu .menu_tab {

		white-space: nowrap;
		/* // width: 250rpx; */
	}
	.menu_tab .text {
		/* // width: 350rpx; */
		box-sizing: border-box;
		padding: 0rpx 20rpx;
		text-align: center;
		margin-top: 20rpx;

	}

	.menu_tab .color-r {
		color: #2095E9;

	}

	.menu_tab .bor_btn {
		width: 66rpx;
		height: 4rpx;
		background-color: #2095E9;
		border-radius: 4rpx;
		margin: 20rpx auto 0rpx;
	}
	.pdlr64{
		padding-left: 2rem;
		padding-right: 2rem;
	}
	.mt40 {
		margin-top: 1.25rem;
	}
	.allSelect{
		display: flex;
		align-items: center;
	}
	::v-deep .allSelect .nut-checkbox-label{
		margin-left: 5px;
	}
	::v-deep .nut-badge sup{
		background: #2095E9;
		color: #fff;
		border: 1px solid #2095E9;
		right: 13px;
		top: 12px;
	}
	.uTans{
		position: fixed;
		top: 180px;width: 100%;
	}
	.uFixed{
		position: fixed;
		top: 245px;
		width: 100%;
		height: calc(100% - 43px);
		overflow-y: auto;
	}
</style>