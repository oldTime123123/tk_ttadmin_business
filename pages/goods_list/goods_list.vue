<template>

	<view class="">
		<!-- Header -->
		<!-- <view class="header bg-white">
			<u-search placeholder="输入商品名称" @change="change(current)" :show-action="false" v-model="keyword"></u-search>
		</view> -->

		<!-- Nav -->
		<view class="nav bg-white">
			<u-tabs name="name" :show-bar="false" :list="list" :is-scroll="true" :current="current" @change="change"
				active-color="#40AFFA" />
		</view>
		<view class="nav bg-white restNav">
			<u-radio-group style="margin-left: 40rpx;">
				<u-radio shape="square" label="全选">全选</u-radio>
			</u-radio-group>
			<view class="down">
				添加到商店
			</view>
			<view class="down">
				种类
			</view>
		</view>

		<!-- Section -->
		<view class="section" :style="{'height': height}">
			<swiper :duration="400" style="height: 100%; overflow: hidden;" @change="change" :current="current">
				<swiper-item v-for="(items, index) in list" :key="index">
					<view v-show="index == current">
						<mescroll-uni ref="mescrollRef" bottom="220rpx" height="100%" @init="mescrollInit"
							@up="upCallback" :up="upOption" :down="downOption" @down="downCallback">

							<view class="title muted sm">
								{{$t('共')}}{{ count }}{{$t('件商品')}}
							</view>

							<view class="" style="display: flex;flex-wrap: wrap;justify-content: space-around;">
								<block v-for="(item2, index2) in items.lists" :key="index2">
									<goods-card :data="item2" Gotype="2">


										<!-- <template v-if="btns.recycle_btn">
											<button class="btn hollow br60 flex row-center normal"
												@click="openFunc(item2, 'recycle')">{{$t('移至回收站')}}</button>
										</template>
										<template v-if="btns.edit_btn">
											<router-link :to="'/bundle/pages/spec_edit/spec_edit?id='+item2.id">
												<button class="btn hollow br60 flex row-center normal">{{$t('编辑')}}</button>
											</router-link>
										</template>
										<template v-if="btns.delete_btn">
											<button class="btn hollow br60 flex row-center normal"
												@click.stop="openFunc(item2, 'del')">{{$t('共')}}</button>
										</template>
										<template v-if="current==0">
											<button class="btn solid br60 flex row-center normal"
												@click.stop="openFunc(item2, 'off_shelf')">{{$t('下架')}}</button>
										</template>
										<template v-if="current==1">
											<button class="btn solid br60 flex row-center normal"
												@click.stop="openFunc(item2, 'on_shelf')"
												style="background: #40AFFA;">{{$t('上架')}}</button>
										</template>
										<template v-if="btns.warehouse_btn">
											<button class="btn solid br60 flex row-center normal"
												@click.stop="openFunc(item2, 'warehouse')"
												style="background: #40AFFA;">{{$t('放入仓库')}}</button>
										</template> -->
									</goods-card>
								</block>
							</view>



						</mescroll-uni>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<modal height="200rpx" v-model="off_shelf" @confirm="goodsSetting">
			<view class="black nr" style="height: 200rpx;">
				{{$t('确认下架')}}：<text style="color:#FF4141;">{{curData.name}}</text>
			</view>
		</modal>

		<modal height="200rpx" v-model="on_shelf" @confirm="goodsSetting">
			<view class="black nr" style="height: 200rpx;">
				{{$t('确认上架')}}：<text style="color:#FF4141;">{{curData.name}}</text>
			</view>
		</modal>

		<modal height="200rpx" v-model="del" @confirm="goodsSetting">
			<view class="black nr" style="height: 200rpx;">
				{{$t('确认删除')}}：<text style="color:#FF4141;">{{curData.name}}</text>
			</view>
		</modal>

		<modal height="200rpx" v-model="recycle" @confirm="goodsSetting">
			<view class="black nr" style="height: 200rpx;">
				{{$t('确认移至回收站')}}：<text style="color:#FF4141;">{{curData.name}}</text>
			</view>
		</modal>

		<modal height="200rpx" v-model="warehouse" @confirm="goodsSetting">
			<view class="black nr" style="height: 200rpx;">
				{{$t('确认放入仓库')}}：<text style="color:#FF4141;">{{curData.name}}</text>
			</view>
		</modal>
		<u-toast ref="uToast" />
	</view>
</template>


<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import {
		apiGoodsLists,
		apiGoodsOperation
	} from '@/api/goods'
	import {
		debounce
	} from "@/utils/tools.js"
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				height: '100%',

				keyword: '',
				list: [{
						name: this.$t('销售中'),
						type: 1,
						lists: []
					},
					{
						name: this.$t('仓库中'),
						type: 2,
						lists: []
					},
					{
						name: this.$t('库存预警'),
						type: 3,
						lists: []
					},
					{
						name: this.$t('回收站'),
						type: 4,
						lists: []
					},
					{
						name: this.$t('待审核'),
						type: 5,
						lists: []
					},
					{
						name: this.$t('未通过'),
						type: 6,
						lists: []
					}
				],

				current: 0,
				count: 0,

				action: '',
				curData: {},

				btns: {},

				off_shelf: false, //下架
				on_shelf: false, // 上架
				del: false, //删除
				recycle: false, //回收站
				warehouse: false, //放入仓库

				upOption: {
					empty: {
						icon: '/static/images/empty/shop.png',
						tip: this.$t('bus_goodManage.e17') + '！', // 提示
						fixed: true,
						top: "200rpx",
					},
					textLoading: this.$t('signin.loading')
				},
				downOption: {
					textLoading: this.$t('signin.loading'),
					textInOffset: this.$t('signin.textInOffset'),
					textOutOffset: this.$t('signin.textOutOffset'),
					textSuccess: this.$t('signin.textSuccess'),
					textErr: this.$t('signin.textErr')
				},
			}
		},

		async onShow() {
			// 使用防抖是为了防止v-show的时候出发多条数据，所以使用防抖触发多次的时候可以只成为触发一次，优化性能请求
			this.upCallback = debounce(this.upCallback, 200, this)
			this.$nextTick(() => {
				this.$refs.mescrollRef[this.current].mescroll.resetUpScroll()
			})

			uni.getSystemInfo({
				success: (res) => {
					this.height = res.windowHeight - 107 + 'px';
				}
			});
		},

		methods: {

			change(event) {
				let index;
				event.detail ? index = event.detail.current : index = event
				this.current = Number(index)
				this.$refs.mescrollRef[this.current].mescroll.resetUpScroll()
			},

			async upCallback(page) {
				const index = this.current;
				const pageNum = page.num
				const pageSize = page.size

				apiGoodsLists({
					name: this.keyword,
					type: this.list[index].type,
					page_no: pageNum,
					page_size: pageSize,
				}).then(({
					lists,
					page_size,
					btns,
					more,
					count,
				}) => {
					// 如果是第一页需手动置空列表
					if (pageNum == 1 || this.keyword) this.list[index].lists = []
					// 重置列表数据
					this.btns = btns;
					this.count = count;
					const hasNext = !!more;
					this.list[index].lists = [...this.list[index].lists, ...lists]
					this.$refs.mescrollRef[index].mescroll.endSuccess(lists.length, hasNext);
				}).catch((err) => {
					console.log(err)
					this.mescroll.endErr()
				})
			},

			openFunc(item, action) {
				this.curData = item;
				this.action = action;
				this[action] = true;
			},

			// 操作商品
			async goodsSetting() {
				let id = this.curData.id,
					action = this.action == 'del' ? 'delete' : this.action
				let res = await apiGoodsOperation({
					action,
					id
				})
				this.$refs.mescrollRef[this.current].mescroll.resetUpScroll()
				if(res.code != 1){
					this.$toast({
                        title: res.msg
                    });
				}
			}
		}
	}
</script>


<style>
	.down {
		background-color: #86ba5a;
		box-sizing: border-box;
		padding: 15rpx;
		border-radius: 10rpx;
		color: #fff;
		margin-right: 40rpx;
	}

	.restNav {
		display: flex;
	}
	.flet{
		position: fixed;
		width: 80rpx;
		height: 80rpx;
		bottom: 10%;
		z-index: 999;
		background-color: #86ba5a;
		border-radius: 50%;
		right: 10%;
	}
</style>
<style lang="scss">
	/*根元素需要有固定的高度*/
	page {
		height: 100%;
		box-sizing: border-box;
	

		.header {
			padding: 16rpx 30rpx;
		}

		.nav {
			padding: 15rpx 0;
			margin-top: 20rpx;
		}

		.section {
			overflow: hidden;

			.title {
				padding: 20rpx;
			}

			.btn {
				margin-top: 20rpx;
				margin-left: 20rpx;
				width: 180rpx;
				height: 64rpx;
				// border-radius: 8rpx;
				font-size: $-font-size-sm;
			}

			.solid {
				color: $-color-white;
				background-color: #FF4141;
			}

			.hollow {
				color: $-color-lighter;
				border: 1px solid #DBDBDB;
			}
		}
	}
</style>