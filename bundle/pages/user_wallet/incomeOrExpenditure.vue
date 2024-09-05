<!--收入和支出记录-->
<template>
	<view class="pdlr32" style="height: 100vh;padding: 12px 15px;">
		<view class="nav flex" @click="back">
			<view class="">
				<image style="width: 44rpx;height: 44rpx;" src="../../../static/images/Frame.png" mode=""></image>
			</view>
			<view class="text">
				{{ $t('tk_wa.wa_a10') }}
			</view>
			<view class=""></view>
		</view>
		<view class="pdlr30">
			<view class="text_select mt27 between pdlr16" @click="showBtn = true">
				<view class="s_l textHiddenOne">{{ columnsTxt || 'All' }}</view>
				<view class="s_icon">
					<image src="../../../static/images/select1.png" style="width: 100%;height: 100%;"></image>
				</view>
			</view>
			<view class="table_list">
				<z-paging class="mt54 " ref="paging" v-model="recordsList" @query="balance" :fixed="true"
					:refresher-enabled="false" :to-bottom-loading-more-enabled="true" :auto-full-height="true"
					:auto-show-back-to-top="true" :empty-view-text="$t('tk_re.r_r1')" :loading-more-default-text="$t('tk_re.r_r2')"
					:loading-more-no-more-text="$t('tk_re.r_r1')" :empty-view-reload-text="$t('tk_re.r_r2')"
					:loading-more-loading-text="$t('tk_re.r_r4')" :loading-more-fail-text="$t('tk_re.r_r3')"
					style="margin: 200rpx  0rpx 0rpx 0rpx;padding: 0 16rpx;  ">
					<view class="xinx " v-for="(item,index) in recordsList" :key="index">
						<view class="flex" style="justify-content: space-between;">
							<view class="" style="margin-left: 30rpx;">
								{{ item.remark }}
							</view>
							<view class="flex" style="align-items: center;margin-right: 20rpx; ">
								<view class="title">
									{{currency}}{{ item.change_amount }}
								</view>
							</view>
						</view>
					</view>
			
				</z-paging>
			</view>
		</view>
		<u-picker mode="selector" v-model="showBtn"  :range="columns" :title="$t('tk_wa.wa_a33')" :confirm-text="$t('bus_zc.zc_a15')" :cancel-text="$t('tk_al.a_c2')" range-key="cateName" @confirm="confirm" @close="showBtn = false"></u-picker>
	</view>
</template>

<script>
	import {toast} from '@/utils/tools'
	import request from '@/utils/request'
    export default {
        data() {
            return {
				recordsList:[],
				pages:{
					type: undefined,
					page: 1,
					limit: 10
				},
				paging:null,
				showBtn:false,
				columns:[],
				columnsTxt:"",
				currency: ''

            }
        },
        onLoad(){
			this.currency = uni.getStorageSync('currency');
			this.getData();
        },
        methods: {
			//后退
            back()  {
                history.back()
            },
			//获取收入与支出列表数据
			balance(){
				if(this.pages.type!=undefined){
					request({
						url: `shop/getwalletLog?type=${this.pages.type}`,
						method: "POST",
						data: {
							page: this.pages.page,
							limit: this.pages.limit
						}
					}).then(res => {
						toast({title: res.msg});
						if(res.code==1&&res.data.list){
							this.$refs.paging.complete(res.data.list);
							this.pages.page += 1
						}
						
					}).catch(err => {
						toast({title: err});
					})
				}
				
			},
			//弹窗确认
            confirm(event) {
				this.tabsChange(this.columns[event].id);
				this.columnsTxt = this.columns[event].cateName;
				this.showBtn = false;
			},
			//获取下拉筛选列表
			getData() {
				uni.showLoading()
				request({
					url: "shop/getwalletLogType",
					methods: 'get',
				}).then(res => {
					if(res.code==1){
						let newArr = []
						res.data.forEach(item => {
							newArr.push({
								id: item.value,
								cateName: item.lable
							})
						})
						newArr.unshift({
							id: '',
							cateName: this.$t('bus_ord.od_a15')
						})
						this.columnsTxt = newArr[0].cateName;
						this.pages.type = newArr[0].id;
						this.columns = newArr;
						this.balance();
					}
					uni.hideLoading()
				}).catch(err => {
					uni.hideLoading()
					this.$toast({title: err.message})
				})
			},

			// 清空
			tabsChange(status){
				this.pages.page = 1
				this.pages.type = status
				this.$refs.paging.clean() //清空数组
				this.balance()
			}
        }
        
    }
</script>

<style scoped>
	page{
		background-color: #ffffff;
	}
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

	.text_select{
		width: 316rpx;
		height: 70rpx;
		background: #EDEDED;
		border-radius: 40rpx;
		color: #959595;
	}
	.between {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.mt27 {
		margin-top: 0.84375rem;
	}
	.pdlr16 {
		padding-left: 0.5rem;
		padding-right: 0.5rem;
	}
	.s_l{
		width: 80%;
	}
	.s_icon{
		width: 30rpx;
		height: 30rpx;
		border-radius: 50%;
	}
	.xinx {
		box-sizing: border-box;
		padding: 30rpx 0rpx;
		border-bottom: 2rpx solid #E8E4E9;
	}
	.title {
		color: #918D92;
	}
	::v-deep .z-paging-content-fixed,.zp-loading-fixed {
		top: 10px !important;
	}
</style>
