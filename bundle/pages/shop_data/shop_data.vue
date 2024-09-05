<template>
    <view>
        <view class="nav flex" @click="back">
			<view class="">
				<image style="width: 44rpx;height: 44rpx;" src="../../../static/images/Frame.png" mode=""></image>
			</view>
			<view class="text">
				{{ $t('bus_my.y10') }}
			</view>
			<view class=""></view>
		</view>
        <u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>

        <view class="m-t-20" style="padding: 0 20rpx;background-color: #e7e5e5;">

            <!-- 交易数据 -->
            <template v-if="current == 0">
                <!--{{ $t('bus_Statistics.sta4') }}  -->
                <view class="normal m-t-20 m-b-20 sm pt15"></view>
                <view class="flex row-between">
                    <view class="card">
                        <view class="xs lighter">{{ $t('bus_Statistics.sta5') }}</view>
                        <view class="normal pt15">{{tradingInfo.order_num}}</view>
                    </view>
                    <view class="card">
                        <view class="xs lighter">{{ $t('bus_Statistics.sta6') }}</view>
                        <view class="primary pt15">{{ currency }}{{tradingInfo.order_amount}}</view>
                    </view>
                </view>
                <view class="menu flex m-t-32">
                    <view class="menu_tab" :class="{ 'bor_btn1': myListIndex1 == 0 }" @click="cycle1(0)">
                        {{ $t('bus_hm.hm_a13') }}
                    </view>
                    <view class="menu_tab" :class="{ 'bor_btn1': myListIndex1 == 1 }" @click="cycle1(1)">
                        {{ $t('bus_hm.hm_a6') }}
                    </view>
                    <view class="menu_tab" :class="{ 'bor_btn1': myListIndex1 == 2 }" @click="cycle1(2)">
                        {{ $t('bus_hm.hm_a7') }}
                    </view>
                    <view class="menu_tab" :class="{ 'bor_btn1': myListIndex1 == 3 }" @click="cycle1(3)">
                        {{ $t('bus_hm.hm_a8') }}
                    </view>
                </view>
                <view class="today-data flex m-t-32">
                    <block v-for="(item, index) in numberList" :key="index">
                        <view class="item-data text-center">
                            <view>{{ item.name }}</view>
                            <view class="pt15">{{ currency }}{{ item.val }}</view>
                        </view>
                    </block>
                </view>
                <view class="e-data m-t-30">
                    <view class="sm normal">{{ $t('bus_hm.hm_a23') }}</view>

                    <view class="e-content m-t-20">
                        <charts ids="canvasColumn" width="100%" height="544rpx" :chartData="dealData"></charts>
                    </view>
                </view>
                <view class="e-data m-t-30 m-b-50">
                    <view class="e-title sm">{{ $t('bus_Statistics.sta7') }}</view>

                    <view class="e-content m-t-20">
                        <charts ids="canvasColumn2" width="100%" height="544rpx" :chartData="turnoverData"></charts>
                    </view>
                </view>
            </template>

            <!-- 商品数据 -->
            <template v-if="current == 1">
                <view style="padding: 20px 0;display: flex;">
                    <SelectDown class="selectDown" ref="select" :placeholder="$t('bus_Statistics.sta13')" @propChange="dropChange" @propChangeIndex="propChangeIndex" :list="options">
                    </SelectDown>
                    <view class="sortList">
                        <u-icon :color="isSort==0||isSort==undefined?'#000':'gray'" class="selectImg" @click="sortImg" name="arrow-up" v-if="selectModel"></u-icon>
                        <u-icon :color="isSort==1||isSort==undefined?'#000':'gray'" class="selectImg" @click="sortImg1" name="arrow-down" v-if="selectModel"></u-icon>
                    </view>

                </view>
                <block v-for="(item, index) in goodsInfo">
                    <view class="goods flex m-b-20" @click="toDetail(item.id)">
                        <u-image :src="item.image" width="160rpx" height="160rpx"></u-image>
                        <view class="m-l-16 line-2" style="width: 100%;">
                            <!-- 订单名称 -->
                            <view class="m-b-10 flex row-between">
                                <view class="nr black line-2">
                                    {{item.goods_name}}
                                </view>
                            </view>
                            <!-- 商品规格 -->
                            <view class="m-t-20 flex row-between">
                                <view class="muted">{{ $t('bus_Statistics.sta10') }} {{item.sales_volume}}</view>
                                <view class="muted">{{ $t('bus_hm.hm_a27') }}: <text class="black">{{currency}}{{item.sales_price}}</text></view>
                            </view>
                        </view>
                    </view>
                </block>
            </template>

            <!-- 人数数据 -->
            <template v-if="current == 2">
                <view class="flex row-between pt15">
                    <view class="card" style="width: 100%;">
                        <view class="xs lighter">{{ $t('bus_Statistics.sta12') }}</view>
                        <view class="normal pt15">{{visitInfo.user_count}}</view>
                    </view>
                </view>

                <view class="e-data m-t-30">
                    <view class="sm normal"> {{ $t('bus_hm.hm_a24') }}</view>

                    <view class="e-content m-t-20">
                        <charts ids="canvasColumn" width="100%" height="544rpx" :chartData="visitData"></charts>
                    </view>
                </view>
            </template>
        </view>

        <u-toast ref="uToast" />
    </view>
</template>

<script>
	import request from '@/utils/request'
    import {
        mapGetters,
        mapActions
    } from 'vuex'
    import {
        apiStatisticsGoodslist, //商品
        apiStatisticsTrading, //交易
        apiStatisticsVisit //访问
    } from '@/api/store'
	import SelectDown from '@/components/SelectDown.vue'
    export default {
        components: {
			SelectDown
		},
        data() {
            return {
                sales: undefined,//排序类型
                //头部筛选列表
                options: [this.$t('bus_Statistics.sta10'),this.$t('bus_Statistics.sta11')],
                list: [{
                    name: this.$t('bus_Statistics.sta1')
                }, {
                    name: this.$t('bus_Statistics.sta2')
                }
                // , {
                //     name: this.$t('bus_Statistics.sta3')
                // }
                ],

                current: 0,

                // 交易
                tradingInfo: {},
                dealData: {}, //成交趋势
                turnoverData: {}, //营业额

                goodsInfo: [],

                // 进店
                visitInfo: {},
                visitData: {},
                myListIndex1: 1,
                numberList: [{
                        name: this.$t('bus_hm.hm_a10'),
                        val: '0.00'
                    },
                    {
                        name: this.$t('bus_hm.hm_a11'),
                        val: '0'
                    },
                    {
                        name: this.$t('bus_hm.hm_a12'),
                        val: '0'
                    },
                ],
                currency:'',
                selectModel: '',
                isSort: 1,
            }
        },

        onLoad() {
            this.myListIndex1 = 1;
			this.currency = uni.getStorageSync('currency');
            this.getDataFunc(this.current,1)
        },

        methods: {
            //后退
            back()  {
                uni.redirectTo({
					url: '/pages/user/user'
				})
            },
            change(index) {
                this.current = index;
                this.myListIndex1=1;
                this.selectModel ='';
                this.getDataFunc(index,index==0?'1':'');
            },
            
            toDetail(id) {
                this.$Router.push({
                    path: '/pages/goods_detail/goods_detail',
                    query: {
                        id
                    }
                })
            },
            async getDataFunc(index,choose) {
                if (index == 0) {
                    const res = await apiStatisticsTrading({
                        type: choose?this.myListIndex1==0?'last_day':this.myListIndex1==1?'day':this.myListIndex1==2?'week':'month':undefined
                    })
                    this.tradingInfo = res.data;
                    const turnover = {
                        categories: res.data.days,
                        series: [{
                            "name": this.$t('bus_Statistics.sta14'),
                            data: res.data.echarts_order_num_add
                        }]
                    }
                    const deal = {
                        categories: res.data.days,
                        series: [{
                            "name": this.$t('bus_Statistics.sta14'),
                            data: res.data.echarts_order_amount_add
                        }]
                    }
                    this.turnoverData = turnover;
                    this.dealData = deal;
                    //佣金之类
                    this.numberList[0].val = res.data.commission;
                    this.numberList[1].val = res.data.pay_amount;
                    this.numberList[2].val = res.data.profit_amount;

                } else if (index == 1) {
                    const res = await apiStatisticsGoodslist()
                    this.goodsInfo = res.data.lists;
                } else if (index == 2) {
                    const res = await apiStatisticsVisit()
                    this.visitInfo = res.data;
                    const visit = {
                        categories: res.data.days,
                        series: [{
                            "name": this.$t('bus_Statistics.sta14'),
                            data: res.data.echarts_add
                        }]
                    }
                    this.visitData = visit
                }
            },
            //attr：根据该属性排序；rev：升序1或降序-1，不填则默认为1
            sortBy(attr,rev){
                if( rev==undefined ){ rev=1 }else{ (rev)?1:-1; }
                return function (a,b){
                    a=a[attr];
                    b=b[attr];
                    if(a<b){ return rev*-1}
                    if(a>b){ return rev* 1 }
                    return 0;
                }
            },
            //状态切换
            async dropChange(val){
                this.selectModel = val;   
                this.isSort = undefined;
            },
            propChangeIndex(index){
                this.selectIndex = index
            },
            async sortImg(){
                this.isSort = !this.isSort;
                if(this.selectIndex==0){
                    const res = await apiStatisticsGoodslist({
                        order: 'sell_num asc'
                    })
                    this.goodsInfo = res.data.lists;   
                }else{
                    const res = await apiStatisticsGoodslist({
                        order: 'goods_clicks asc'
                    })
                    this.goodsInfo = res.data.lists;   
                }     
            },
            async sortImg1(){
                this.isSort = !this.isSort;
                if(this.selectIndex==0){
                    const res = await apiStatisticsGoodslist({
                        order: 'sell_num desc'
                    })
                    this.goodsInfo = res.data.lists;   
                }else{
                    const res = await apiStatisticsGoodslist({
                        order: 'goods_clicks desc'
                    })
                    this.goodsInfo = res.data.lists;   
                }     
            },
            cycle1(num) {
                this.myListIndex1 = num
                // 刷新数据
                // methods.report()
                this.getDataFunc(0,1)
            },
        }
    }
</script>

<style lang="scss">
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
        font-size: 32rpx;
        color: #171418;
    }
    .card {
        width: 346rpx;
        padding: 30rpx 36rpx;
        border-radius: 14rpx;
        background-color: $-color-white;

        view:last-child {
            font-size: 32rpx;
            font-weight: 500;
        }

        .primary {
            color: $-color-primary;
        }
    }

    // 数据图
    .e-data {
        .e-content {
            padding: 20rpx 0;
            border-radius: 14rpx;
            background-color: $-color-white;
        }
    }

    .goods {
        padding: 20rpx;
        border-radius: 14rpx;
            background-color: $-color-white;
    }
    .menu {
        width: 100%;
        justify-content: space-between;
        color: #817C81;
        font-size: 32rpx;
        font-weight: 400;
        overflow-x: auto;

        background-color: white;

        .menu_tab {
            width: 25%;
            text-align: center;

            padding: 12rpx 32rpx;
            //background-color: $-color-border;
            // border-radius: 32rpx;
            white-space: nowrap;

            &:not(:first-child) {
                margin-left: 16rpx;
            }
        }

        .bor_btn {
            color: #ffffff;
            background-color: $-color-primary;


        }

        .bor_btn1 {
            background-repeat: no-repeat;
            background-image: linear-gradient(90deg, #83c04a 0%, #86bb55 100%);
            background-size: 50% 3px;
            background-position: 50% 100%;
        }
    }

    .menu_num {
        text-align: center;
        color: #2979ff;
        font-size: 32rpx;
        font-weight: 600;
        line-height: 32px;
    }

    .menu_title {
        text-align: center;
        line-height: 32px;

    }

 // 今日数据卡片
    .today-data {
        padding: 60rpx 30rpx 40rpx 30rpx;
        border-radius: 14rpx;
        background-color: $-color-white;

        .item-data {
            width: 220rpx;

            view:first-child {
                color: $-color-muted;
                font-size: 32rpx;
            }

            view:last-child {
                color: $-color-normal;
                font-size: 32rpx;
                font-weight: 500;
                margin-top: 6rpx;
                height: 50px;
                word-wrap: break-word;
                word-break: break-all;
            }
        }

        .item-data:first-child {
            // width: 260rpx !important;
        }
    }
    ::v-deep .menu .bor_btn1{
        background-image: linear-gradient(90deg, #2979ff 0%, #2979ff 100%);
    }
    .pt15{
        padding-top: 15px;
    }
    .selectDown{
        width: 50%;
        height: 40px;
    }
    ::v-deep .selectDown .drop-content uni-image{
        display: none !important;
    }
    .sortList{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .selectImg{
        margin: 0 0 0 5px;
    }
</style>
