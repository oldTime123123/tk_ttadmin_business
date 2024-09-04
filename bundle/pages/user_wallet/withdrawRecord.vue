<template>
	<view style="height: 100vh;">
		<view>
			<z-paging ref="paging" v-model="recordsList" @query="getData" :refresher-enabled="false"
				:to-bottom-loading-more-enabled="true" :auto-full-height="true" :auto-show-back-to-top="true"
				:empty-view-text="$t('tk_re.r_r1')" :loading-more-no-more-text="$t('tk_re.r_r1')"
				:empty-view-reload-text="$t('tk_re.r_r2')" :loading-more-loading-text="$t('tk_re.r_r4')"
				:loading-more-fail-text="$t('tk_re.r_r3')" :loading-more-default-text="$t('tk_re.r_r2')"
				style="margin: 200rpx auto 0;width: 100%;padding: 0 32rpx;">
				<view class="listItem" v-for="(item, index) in recordsList" :key="index">
					<view class="vvItem">
						<view class="f26">{{ $t('tk_wr.r_r6') }}</view>
						<view class=""> {{currency}}{{ item.amount }}</view>
					</view>
					<view class="vvItem">
						<view class="f26">{{ $t('tk_wr.r_r5') }}</view>
						<view class="">
							{{ item.order_no }}
						</view>
					</view>
					<view class="vvItem">
						<view class="f26">{{ $t('tk_re.r_w2') }}</view>
						<view class="">{{currency}}{{ item.fee }}</view>
					</view>
					<view class="vvItem">
						<view class="f26">{{ $t('tk_re.r_w3') }}</view>
						<view class="">{{currency}}{{ item.actual_amount }}</view>
					</view>
					<view class="vvItem">
						<view class="f26">{{ $t('tk_re.r_w4') }}</view>
						<view class="">
							<text class="pass">{{ item.type_txt }}</text>
						</view>
					</view>
					<view class="vvItem" v-if="item.remark">
						<view class="f26">Remarks</view>
						<view class="">{{ item.remark }}</view>
					</view>
					<view class="vvItem">
						<!-- 1-待审核 2-审核成功 3-驳回 4-已取消 -->
						<view class="f26">{{ $t('tk_re.r_w9') }}</view>
						<view class="">
							<text v-if="item.status == 1" class="pass">{{ $t('tk_re.r_w10') }}</text>
							<text v-if="item.status == 2" class="pass">{{ $t('tk_re.r_w11') }}</text>
							<text v-if="item.status == 3" class="error">{{ $t('tk_re.r_w12') }}</text>
							<text v-if="item.status == 4" class="cancle">{{ $t('tk_re.r_w13') }}</text>
						</view>
					</view>
					<view class="vvItem">
						<view class="f26">{{ $t('tk_re.r_w5') }}</view>
						<view class="">
							<text v-if="item.pay_status == 1" class="cancle">{{ $t('tk_re.r_w6') }}</text>
							<text v-if="item.pay_status == 2" class="pass">{{ $t('tk_re.r_w7') }}</text>
							<text v-if="item.pay_status == 3" class="error">{{ $t('tk_re.r_w8') }}</text>
						</view>
					</view>
				</view>
			</z-paging>
		</view>
	</view>
</template>

<script>
	import request from '@/utils/request'
    export default {
        data() {
            return {
				recordsList:[],
				paging:null,
				pages:{
					type: 'withdraw',
					page: 1,
					limit: 10
				},
				currency: ''
            }
        },
		props:['changeIndex'],
		watch:{
			changeIndex:function(newValue, oldValue){
				if(newValue==1){
					this.$refs.paging.clean() //清空数组
				}else{
					this.pages.page = 1;
					this.getData();
				}
			}
		},
		mounted() {
			this.currency = uni.getStorageSync('currency');
            // this.getData();
		},
        methods: {
			getData(){
				request({
					url: 'shop/getRAWLog',
					method: "POST",
					data: this.pages
				}).then(res => {
					if(res.data.lists){
						this.$refs.paging.complete(res.data.lists);
						this.pages.page += 1
					}
					
				})
			}
        }
        
    }
</script>

<style scoped>
	.bten {
		position: absolute;
		top: 32rpx;
		left: 50%;
		z-index: 9990;
		margin-left: -165px;
	}
	.box {
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

	.listItem {
		background: #FFFFFF;
		box-shadow: 0px 1px 8px 0px rgba(76, 3, 3, 0.08);
		border-radius: 10px 10px 10px 10px;
		color: #000;
		border-radius: 20rpx;
		padding: 32rpx;
		font-size: 28rpx;
		width: 100%;
	}
	.listItem:not(:first-child){
		background: #FFFFFF;
		box-shadow: 0px 1px 8px 0px rgba(76, 3, 3, 0.08);
		border-radius: 10px 10px 10px 10px;
		color: #000;
		border-radius: 20rpx;
		padding: 32rpx;
		margin-top: 30rpx;
		font-size: 28rpx;
		width: 100%;
	}
	.vvItem {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.vvItem:not(:first-child){
		margin-top: 29rpx;
	}

	.pass {
		color: #5db760;
	}

	.error {
		color: #f5564b;
	}

	.cancle {
		color: #AFAFAF;
	}
	::v-deep .z-paging-content-fixed, .zp-loading-fixed{
		top: 20px !important;
	}
</style>
