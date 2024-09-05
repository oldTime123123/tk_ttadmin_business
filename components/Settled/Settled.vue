<!--
 * @Author: chenpn chenpn699@gmail.com
 * @Date: 2024-09-03 17:37:20
 * @LastEditors: chenpn chenpn699@gmail.com
 * @LastEditTime: 2024-09-05 13:36:30
 * @FilePath: \web_business\components\Settled\Settled.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<view class="setted" v-if="status">
		<view class="text">
			{{this.$t('settled.set_1')}}
		</view>
		<view class="btn" @click="juplink()">
			{{statusText==2?this.$t('settled.set_2'):this.$t('settled.set_3')}}
		</view>
	</view>
</template>

<script>
	import {
		applyStatus
	} from '@/api/app'
	export default {
		data() {
			return {
				status: false,
				statusText: '',
				statusId: null,
				statusNumber: ""
			}
		},
		mounted() {
			this.applyStatusfn()
		},
		activated() {
			this.applyStatusfn()
		},
		methods: {
			async applyStatusfn() {
				await applyStatus().then(res => {
					this.statusText = res.data.status
					uni.setStorageSync('Certification_Status', this.statusText)
					if (res.data.status == 3) {
						this.status = false
					} else if (res.data.status == 2) {
						this.statusId = res.data.applyId;
						this.status = true
					}else{
						this.status = true
					}
				})
			
			},
			juplink(url) {
				if (this.statusText == 2) {
					console.log(this.statusId)
					this.$Router.push({
						path: "/bundle/pages/settled_result/settled_result",
						query: {
							id: this.statusId
						},
					});
					// uni.navigateTo({
					// 	url: '/bundle/pages/settled_result/settled_result?id' + 
					// })
				} else if (this.statusText == 1) {
					uni.navigateTo({
						url: '/bundle/pages/store_settled/store_settled'
					})
				}

			}
		}
	}
</script>

<style scoped lang="scss">
	.setted {
		background: url('../../static/images/settled.jpg') no-repeat;
		width: 100%;
		height: 189px;
		background-size: 100% 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.text {
			margin-top: 90rpx;
			text-align: center;

		}

		.btn {
			margin-top: 20rpx;
			background-color: #40AFFA;
			width: 350rpx;
			height: 100rpx;
			border-radius: 40rpx;
			text-align: center;
			line-height: 100rpx;
			color: #fff;
		}
	}
</style>