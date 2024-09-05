<template>
	<view style="display: flex;flex-direction: column;background: #fff;">
		<view class="mt16" style="flex:1;">
			<z-paging class="mt54 " ref="paging1" v-model="recordsList1" @query="getData" width="100%"
					:refresher-enabled="false" :auto='false' :to-bottom-loading-more-enabled="true"
					:auto-full-height="true" :auto-show-back-to-top="true" 
					:empty-view-text="$t('tk_re.r_r1')" :loading-more-default-text="$t('tk_re.r_r2')"
					:loading-more-no-more-text="$t('tk_re.r_r1')" :empty-view-reload-text="$t('tk_re.r_r2')"
					:loading-more-loading-text="$t('tk_re.r_r4')" :loading-more-fail-text="$t('tk_re.r_r3')"
					style="margin: 115px 0rpx 0rpx 0rpx;width: 100%; " >
				<view  class="" style="box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.08);padding: 0 10px;" v-for="(item,index) in recordsList1" :key="index">
					<view class="tra_box">
						<!-- <view class="tips" v-if='item.status==1' style="background-color: #2BD88F;">{{ $t('bus_zc.l_l84') }}</view>
						<view class="tips" v-else-if='item.status==2' style="background-color: #CCCCCC;color:#787878">{{ $t('bus_zc.l_l85') }}</view>
						<view class="tips" v-else style="background-color: #aa5056;color:#ffffff">{{ $t('bus_zc.l_l93') }}</view> -->
						<view class="box_top">
							<view class="name">{{item.ad.title}}</view>
							<view class="pro"> {{currency}}{{item.price}}</view>
							<view class="flex time" style="align-items: center;">
								<image style="width: 32rpx;height: 32rpx;" src="../../static/images/time.png" mode=""></image>
								<view class="ml4">
									{{ $t('bus_zc.l_l81') }} {{item.create_time}}
								</view>
							</view>
						</view>
						<view class="box_btn flex">
							<view class="box1">
								<view class="num">
									{{item.finish_click_num}}
								</view>
								<view class="name">
									{{ $t('bus_zc.l_l82') }}
								</view>
							</view>
							<view class=""></view>
							<view class="box1">
								<view class="num">
									{{item.finish_order_num}}
								</view>
								<view class="name">
									{{ $t('bus_zc.l_l83') }}
								</view>
							</view>
						</view>
					</view>
				</view>
				
			</z-paging>
			
			
		</view>
		<view style="margin-top: 40px;" v-if="nullShow">
			<image src="../../../static/images/empty/order.png"></image>
		</view>
	</view>
</template>

<script>
	import {toast} from '@/utils/tools'
	import request from '@/utils/request'
	export default {
		data() {
			return {
				messBoxmRo: [],
				time:undefined,
				socket:undefined,
				qcdsq:undefined,
				infoText:undefined,
				changeIndex:1,
				backcolor:{
					backgroundColor: "#DD2755",
					color: '#fff'
				},
				recordsList1:[],
				pages:{
					page: 1,
					size: 10,
				},
				paging1:null,
				nullShow: false,
				currency: ''
			}
		},
		props:['currentKey'],
		watch:{
			currentKey:function(newValue, oldValue){
				if(newValue==1){
					this.currency = uni.getStorageSync('currency');
					this.pages.page = 1;
					this.getData();
				}else{
					this.$refs.paging1.clean() //清空数组
				}
			}
		},
		
		methods: {
			doun() {
				this.qcdsq = setInterval(() => {
					this.messBoxmRo.shift()
				}, 4000)
			},
			back(){
				clearInterval(this.qcdsq)
				clearInterval(this.time)
				history.back()
			},
			getData(){
				uni.showLoading()
				request({
					url: 'Statistics/buyAdLog',
					methods: 'get',
					data: {
						page: this.pages.page,
						page_size: this.pages.size
					}
				}).then(res => {
					if(res.data&&res.data.list){
						this.$refs.paging1.complete(res.data.list);
						this.pages.page += 1
					}else{
						this.nullShow = true;
					}
					
					uni.hideLoading()
				}).catch(err=>{
					uni.showToast({
						title: err,
						icon: "none",
						duration: 3000
					})
					uni.hideLoading()
				})
			},
		}
	}
</script>

<style scoped>
	.tra_box{
		background: #fff;
		border-radius: 16rpx;
		position: relative;
		margin-bottom: 32rpx;
	}
	.tra_box .tips{
		position: absolute;
		top: 0;
		right: 0;
		box-sizing: border-box;
		padding: 12rpx 16rpx;
		font-weight: 400;
		font-size: 20rpx;
		color: #FFFFFF;
		line-height: 24rpx;
		border-radius: 0px 16rpx 0px 16rpx;;
		
		
	}
	.tra_box .box_top{
		box-sizing: border-box;
		color: #fff;
		padding: 42rpx 32rpx 16rpx 32rpx;
	}
	.tra_box .box_top .name{
		font-weight: 700;
		font-size: 36rpx;
		color: #171418;
		line-height: 42rpx;
	}
	.tra_box .box_top .pro{
		font-weight: 600;
		font-size: 28rpx;
		margin-top: 14rpx;
		color: #40affa;
		line-height: 32rpx;
	}
	.tra_box .box_top .time{
		font-weight: 400;
		font-size: 24rpx;
		margin-top: 28rpx;
		color: #959595;
		line-height: 24rpx;
	}
	.tra_box .box_btn{
		background-color: #eaf0ff !important;
		border-radius: 0rpx 0rpx 16rpx 16rpx;
	}
	.tra_box .box_btn .box1{
		width: 49%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		padding: 24rpx 0rpx 32rpx 0rpx;
		color: #171418;
	}
	.box1 .num{
		font-weight: 600;
		font-size: 32rpx;
		line-height: 38rpx;
	}
	.box1 .name{
		font-weight: 400;
		font-size: 26rpx;
		line-height: 30rpx;
		margin-top: 8rpx;
		text-align: center;
	}
	.nav{
		width: 100%;
		height: 88rpx;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 0rpx 32rpx;
		background: #fff;
	}
	.nav .text{
		font-size: 36rpx;
		color: #000;
		
	}
	.bten{
		position: absolute;
		top: 32rpx;
		left:50%;
		z-index: 9990;
		margin-left: -165px;
	}
	.bten .box{
		margin-top: 20rpx;
		width: 330px;
		padding: 14px 26px 14px 13px;
		border-radius: 8px;
		box-sizing: border-box;
		border: 1px solid #ebeef5;
		background-color: #fff;
		box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
		transition: opacity .3s, transform .3s, left .3s, right .3s, top .4s, bottom .3s;
		overflow: hidden;
	}

</style> 
