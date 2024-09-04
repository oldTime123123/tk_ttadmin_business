<template>
    <view class="goods-detail">
        <view class="nav flex">
			<view @click="back">
				<image style="width: 44rpx;height: 44rpx;" src="../../static/images/Frame.png" mode=""></image>
			</view>
			<!-- <view class="text"></view> -->
			<view></view>
		</view>
        <!-- 轮播图 -->
        <goods-swiper :images="goodsInfo.goods_image" :video="goodsInfo.video" :video-cover="goodsInfo.video_cover" />

        <!-- 商品基础信息 -->
        <view class="goods-info">
            <view class="flex row-between">
                <view class="flex primary">
                    <view style="font-size: 36rpx;">¥{{goodsInfo.min_price}}</view>
                    <text v-if="goodsInfo.spec_type == 2">~</text>
                    <view style="font-size: 36rpx;" v-if="goodsInfo.spec_type == 2">{{goodsInfo.max_price}}</view>

                    <view class="btn" v-if="goodsInfo.type">{{ $t('bus_shop.sp6') }}</view>
                </view>
                <view class="muted xs">{{ $t('bus_shop.sp1') }}：{{goodsInfo.code}}</view>
            </view>
            <view class="goods-name lg">{{ goodsInfo.name }}</view>
            <view class="flex row-between muted xs">
                <view>{{ $t('bus_shop.sp2') }}: {{ goodsInfo.goods_item.price }}</view>
                <!-- <view>{{ $t('bus_shop.sp3') }}: {{ goodsInfo.stock }}</view> -->
                <view>{{ $t('bus_shop.sp4') }}: {{ goodsInfo.sales_actual }}</view>
            </view>
        </view>


        <!-- S 规格 -->
        <!-- <view class="nr specification" @click="onGoodsOptions">
            <text class="muted">{{ $t('查看商品规格') }}</text>
            <text class="m-l-20">{{ specValueStr }}</text>
            <u-icon name="arrow-right" class="muted" style="margin-left: auto;" />
        </view> -->

        <!-- 规格选择Popup -->
        <goods-spec :show="showGoodsSpec" :goods="goodsInfo" @close="showGoodsSpec = false"></goods-spec>

        <!-- E 规格 -->


        <!-- 商品介绍 -->
        <view class="detail">
            <view class="detail-title nr">{{ $t('bus_shop.sp5') }}</view>
            <u-parse :html="goodsInfo.content" :show-with-animation="true"></u-parse>
        </view>
    </view>
</template>

<script>
    import {
        apiGoodsDetail
    } from '@/api/goods'
    import {
        baseURL,
        basePath
    } from '@/config/app'
    import {
        PageStatusEnum,
        OrderTypeEnum
    } from '@/utils/enum'
    import {
        mapGetters
    } from 'vuex'
    import {
        strToParams
    } from '@/utils/tools'

    export default {
        name: 'GoodsDetail',

        data() {
            return {
                // 页面状态
                pageStatus: PageStatusEnum['LOADING'],
                pagesData: [],
                pageErrorMsg: '', // 页面异常信息

                showShare: false,
                goodsInfo: {}, // 商品信息

                showGoodsSpec: false, // 商品规格: 显示 | 隐藏

                goodsSpecOptions: {}, // 已选商品规格
                specButtonsList: [], // 规格按钮
            }
        },

        computed: {
            ...mapGetters(['isLogin']),

            // 已选商品规格
            specValueStr() {
                return this.goodsSpecOptions?.spec?.spec_value_str ?? ''
            },

        },

        methods: {
            // 更改规格
            changeGoodsSpec(options) {
                this.goodsSpecOptions = options
                console.log(options)
            },


            // 点击已选规格
            onGoodsOptions() {
                this.showGoodsSpec = true
                this.specButtonsList = [{
                        ...this.specButtonsGroups.cart,
                        style: {
                            border: `solid 1px #40AFFA`,
                            color: this.themeColor,
                            backgroundColor: '#FFFFFF',
                        }
                    },
                    this.specButtonsGroups.buy
                ]
            },

            // 初始化商品详情数据
            initGoodsDetail() {
                return new Promise((resolve, reject) => {
                    apiGoodsDetail({
                        id: this.goods_id,
                        visit: 1,
                    }).then(res => {
                        this.goodsInfo = res.data
                        const hasComment = JSON.stringify(res.data.goods_comment) !== '[]'
                        this.goodsComment = hasComment ? res.data.goods_comment : {}
                        this.isGoodsCollect = !!res.data.is_collect
                    }).then(res1 => {
                        // #ifdef H5
                        // 设置分享
                        this.$store.dispatch('setWxShare', {
                            shareImage: res1.data?.image,
                            shareDesc: res1.data?.name
                        })
                        // #endif
                        resolve(res1.data)
                    }).catch(err => {
                        reject(err)
                    })
                })
            },
            back(){
                uni.redirectTo({
					url: '/bundle/pages/shop_data/shop_data'
				})
            }
        },

        async onLoad(e) {
            const options = this.$Route.query
            // 商品ID赋值：点击 | 扫码
            options['scene'] ?
                this.goods_id = strToParams(options['scene'])['id'] :
                this.goods_id = options.id

            try {
                if (!this.goods_id) throw new Error(this.$t('该商品不存在'))

                // 商品详情数据
                await this.initGoodsDetail()
                // 促销
                this.pageStatus = PageStatusEnum['NORMAL']
            } catch (err) {
                console.log(err)
                this.pageErrorMsg = err.message
                this.pageStatus = PageStatusEnum['ERROR']
            }
        },

        onShareAppMessage() {
            const {
                name,
                image
            } = this.goodsInfo
            return {
                title: name,
                path: `/pages/goods_detail/goods_detail?id=${this.goods_id}&invite_code=${this.userInfo.code}`,
                imageUrl: image
            }
        }
    }
</script>

<style lang="scss" scoped>
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
    .goods-detail {
        padding-bottom: calc(100rpx + 20rpx + constant(safe-area-inset-bottom));
        padding-bottom: calc(100rpx + 20rpx + env(safe-area-inset-bottom));
    }

    .goods-info {
        padding: 20rpx 24rpx;
        background-color: #FFFFFF;

        .primary {
            color: #FF4141;
        }

        .share {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 134rpx;
            height: 60rpx;
            margin-right: -24rpx;
            border-radius: 30px 0 0 30px;
            background-color: #F6f6f6;
        }

        .goods-name {
            padding: 20rpx 0 10rpx 0;
            font-weight: 500;
        }

        .btn {
            margin-left: 10px;
            font-size: 24rpx;
            padding: 6rpx 20rpx;
            border-radius: 8rpx;
            color: $-color-primary;
            background: rgba($color: $-color-primary, $alpha: .1);
        }
    }

    .specification {
        display: flex;
        padding: 24rpx;
        margin-top: 20rpx;
        background-color: #FFFFFF;
    }

    .detail {
        padding: 24rpx;
        margin-top: 20rpx;
        background-color: #FFFFFF;

        &-title {
            text-align: center;
            font-weight: 500;
            padding-bottom: 24rpx;
        }
    }
</style>
