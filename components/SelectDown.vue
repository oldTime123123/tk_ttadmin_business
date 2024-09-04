<template>
	<view class="dropdonw-wrap">
		<!-- 		<view class="drop-title" v-if="title">{{title}}</view> -->
		<view class="abs">
			<view class="drop-content" @click="downpopShow = !downpopShow">
				<text v-if="text">{{text}}</text>
				<text style="color: #BBBBBB;" v-else>{{placeholder}}</text>
				<image src="../static/images/bdropdown.png" mode="aspectFit" style="width: 28upx; height: 28upx;"
					v-if="downpopShow == false"></image>
				<image src="../static/images/bdropup.png" mode="aspectFit" style="width: 28upx; height: 28upx;"
					v-else-if="downpopShow == true"></image>
			</view>
			<view class="down-pop" v-show="downpopShow">
				<view class="pop-item" :class="{'active-item':index==itemindex}" v-for="(item,itemindex) in list"
					@click="clickdropItem(item,itemindex)">{{item}}</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: 'SelectDown',
		props: {
			placeholder: {
				type: String,
				default: false

			},
			list: {
				type: Array,
				default: false
			}
		},
		data() {
			return {
				downpopShow: false,
				title: "",
				text: "",
				index: ''
			}
		},
		methods: {
			clickdropItem(item, itemindex) {
				this.text = item
				this.index = itemindex
				this.downpopShow = false
				this.$emit('propChange', item)
				this.$emit('propChangeIndex', itemindex)
			},
			closeSelect() {
				this.downpopShow = false
			}
		}
	}
	// let downpopShow = ref(false)
	// let text = ref('')
	// let index = ref(null)
	// defineExpose({
	// 	text,
	// 	index,
	// 	closeSelect
	// })

	// defineProps({
	// 	title: String,
	// 	list: [Array, Object],
	// 	placeholder: String
	// })

	// const emits = defineEmits(['change', 'propChange'])

	// function clickdropItem(item, itemindex) {
	// 	text.value = item
	// 	index.value = itemindex
	// 	downpopShow.value = false
	// 	emits('propChange')
	// }
</script>

<style lang="scss">
	.drop-title {
		margin-bottom: 28upx;
	}

	.dropdonw-wrap {
		width: 100%;
		height: 100%;
	}

	.drop-content {
		width: 100%;
		height: 100%;
		border-radius: 16rpx;
		border: 4rpx solid #F5F6FE;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 44upx;
		background-color: #fff;
	}

	.abs {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.down-pop {
		box-shadow: 0rpx 14rpx 29rpx 2rpx rgba(160, 164, 164, 0.15);
		width: 100%;
		position: absolute;
		z-index: 800;
		max-height: 800rpx;
		overflow-y: auto;
		border-top: 1px solid #696565;

		.pop-item {
			height: 100%;
			line-height: 100upx;
			padding-left: 60upx;
			background-color: #fff;
		}

		.active-item {
			background-color: #3FAFF9;
			color: #fff;
		}
	}
</style>