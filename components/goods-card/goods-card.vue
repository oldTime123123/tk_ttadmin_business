<template>
	<view class="goods bg-white">
		<view class="goods-wrap " >
			<view class="image" style="position: relative;">
				<u-image v-if="Gotype==2" :src="content.image" width="100%" height="460"></u-image>
				<u-image v-else :src="content.goods.image" width="100%" height="400"></u-image>
				<nut-checkbox v-if="Gotype!=0" style="position: absolute;top: 5px;" v-model="content.change" size="large"></nut-checkbox>
			</view>
			
			<view class=" line-1">
				
				<!-- 商品名称 -->
				<view v-if="Gotype==2" class="goods-name line-1 m-t-10">{{content.name}}</view>
				<view v-else class="goods-name line-1 m-t-10">{{content.goods.name}}</view>
				<!-- 商品价格 -->
				<view v-if="Gotype==2" class="goods-price primary m-t-10" >{{ $t('bus_ord.od_a11') }}:  
					{{ currency }} <text v-if="content.GoodsItem">{{ content.GoodsItem.price }}</text>
				</view>
				<view v-else class="goods-price primary m-t-10" >{{ $t('bus_ord.od_a11') }}：
					{{ currency }} <text v-if="content.goods">{{ content.goods.GoodsItem.price }}</text>
				</view>
				<!----商品成本---->
				<view v-if="Gotype==2" class="goods-price primary m-t-10">{{ $t('bus_ord.od_a12') }}：
					{{ currency }} <text v-if="content.GoodsItem">{{ content.GoodsItem.cost_price }}</text>
				</view>
				<view v-else class="goods-price primary m-t-10">{{ $t('bus_ord.od_a12') }}：
					{{ currency }} <text v-if="content.goods">{{ content.goods.GoodsItem.cost_price }}</text>
				</view>
				<!----商品利润---->
				<view v-if="Gotype==2" class="goods-price primary m-t-10">{{ $t('bus_ord.od_a13') }}：
					{{ currency }} <text v-if="content.GoodsItem">{{ content.GoodsItem.profit }}</text>
				</view>
				<view v-else class="goods-price primary m-t-10">{{ $t('bus_ord.od_a13') }}：
					{{ currency }} <text v-if="content.goods">{{ content.goods.GoodsItem.profit }}</text>
				</view>
				<!------商品库存--------->
				<view v-if="Gotype==2" class="goods-price primary m-t-10">{{ $t('bus_ord.od_a46') }}：
					<text v-if="content.GoodsItem">{{ content.GoodsItem.stock }}</text>
				</view>
				<view v-else class="goods-price primary m-t-10">{{ $t('bus_ord.od_a46') }}：
					<text v-if="content.goods">{{ content.goods.GoodsItem.stock }}</text>
				</view>
				
				<!-- 操作按钮---上架---下架--添加到橱窗 -->
				<view  class="muted flex row-between xs m-t-10">
					<view v-if="Gotype==0" class='down' @click="Shelves">{{ $t('bus_ord.od_a48') }}</view>
					<view v-else-if="Gotype==1" class='down' @click="Shelves">{{ $t('bus_ord.od_a47') }}</view>
					<view v-else class='down' @click="addWindow">{{ $t('bus_ord.od_a49') }}</view>
				</view>
			</view>
		</view>

		<!-- Footer -->
		<view class="goods-footer flex row-right">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	import request from '@/utils/request'
	/**
	 * @description 商品管理卡片
	 * 
	 * @example <goods-card :data="goods" />
	 */

	export default {
		name: 'GoodsCard',

		props: {
			Certification_Status: {
				type: Number,
				default: 0,
			},
			content: {
				type: Object,
				default: () => {},
			},
			Gotype:{
				type: Number,
				default: () => {},
			}
		},
		data() {
			return {
				currency: ''
			}
		},
		mounted(){
			this.currency = uni.getStorageSync('currency')
			
		},
		methods: {
			//单个上下架操作
			Shelves(){
				if(this.Certification_Status!=3){
					this.$toast({
						title: this.$t('bus_my.y28'),
					});
					return
				}
				uni.showLoading()
				request({
					url: 'goods/upDownShowcase',
					method: "POST",
					data: {
						id: this.content.id
					}
				}).then((res)=>{
					if(res.code==1){
						this.$emit('unpdateList',this.Gotype);
					}else{
						this.$toast({title: res.msg})
					}
					uni.hideLoading()
				}).catch((err) => {
					uni.hideLoading()
					this.$toast({title: err})
				})
			},
			//单个添加到橱窗
			addWindow(){
				uni.showLoading()
				request({
					url: 'goods/addShowcase',
					method: "POST",
					data: {
						goodsId: this.content.id
					}
				}).then((res)=>{
					if(res.code==1){
						this.$emit('unpdateList',this.Gotype);
					}else{
						this.$toast({title: res.msg})
					}
					uni.hideLoading()
				}).catch((err) => {
					uni.hideLoading()
					this.$toast({title: err})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.down {
		background-color: rgb(64, 175, 250);
		box-sizing: border-box;
		padding: 15rpx;
		border-radius: 10rpx;
		color: #fff;
	}
	.goods {
		width: 47%;
		padding: 20rpx;
		margin-bottom: 20rpx;

		&-wrap {
			width: 100%;

			.goods-name {
				color: #101010;
				font-size: $-font-size-nr;
			}

			.goods-price {
				color: #000;
				font-size: $-font-size-nr;
			}

			>view {
				width: 100%;
			}

			.image {
				width: 100%;
			}
		}

		&-footer {}
	}
	.checkBox{
		position: absolute;
    	top: 15px;
	}
	::v-deep .nut-checkbox-ani{
		width: 20px !important;
		height: 20px !important;
	}
</style>