<!--
 * @Author: chenpn chenpn699@gmail.com
 * @Date: 2024-08-20 09:51:18
 * @LastEditors: chenpn chenpn699@gmail.com
 * @LastEditTime: 2024-09-05 16:48:13
 * @FilePath: \web_business\components\menu.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<view class="tabbar" :style="{'bottom':bottom+'rpx','right':right+'rpx'}">
		<view class="columns">
			<view class="open-or-close" @click="itemClick">
				<image style="width: 100%;height: 100%;"
					src="../static/images/Customer.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '@/utils/request'
	export default {
		data() {
			return {
			};
		},
		props:{
			bottom: {
				type: Number,
				default: 200
			},
			right: {
				type: Number,
				default: 32
			},
		},
		methods: {
			itemClick() {
				uni.showLoading()
				request({
					url: 'shop/getCustomer',
					method: "get",
				}).then((res)=>{
					this.$toast({title: res.msg})
					if(res.code==1){
						if(res.data.list.length>0){
							window.location.href = res.data.list[0].link
						}
					}
					uni.hideLoading()
				}).catch((err) => {
					uni.hideLoading()
					this.$toast({title: err})
				})
			}
		},
	};
</script>

<style lang="scss" scoped>
	.tabbar {
		position: fixed;
		// bottom: 200rpx;
		// right: 32rpx;
		background-color: #000000;
		z-index: 999;

		.columns {
			position: relative;
			width: 100rpx;

			.open-or-close {
				position: absolute;
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				left: 0;
				bottom: -3rpx;
				z-index: 2;
			}

			.c_items {
				width: 100rpx;
				// height: 277px;
				position: absolute;
				left: 0;
				bottom: 0;
				padding: 32rpx 0 90rpx;
				color: #8F9DA9;
				font-size: 20rpx;
				border-radius: 0 0 50% 50%;
				background: rgba(31, 31, 31, 0.9);
				box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.28);
				border-radius: 25px 25px 25px 25px;
				z-index: 1;
				transition: all 1s;

				.item {}
			}

			.c_close {
				height: 0;
				display: none;
				transition: all 1s;
			}
		}

	}
</style>