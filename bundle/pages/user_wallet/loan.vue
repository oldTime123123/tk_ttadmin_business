<template>
    <view class="main">
        <view class="topbg">
            <view class="flex topnav">
                <view><image @click="back()" style="width: 44rpx;height: 44rpx;" class="back"
                        src="../../../static/images/back.png" alt=""></image>
                </view>
                <view class="toptitle">{{ $t('loan.lo_i1') }}</view>
                <view></view>
            </view>
        </view>
        <view class="topCard">
            <view class="cardTitle ">{{ $t('loan.lo_l1') }}</view>
            <view class="mt24" v-if="config">$ {{ config.use_amount }}</view>
            <view class="cardContenText">
                {{ $t('loan.lo_l2') }}
            </view>
            <view class="flex cardreps">
                <view class="cardrep">
                    <view class="cardreptext1">{{ $t('loan.lo_l3') }}</view>
                    <view class="flex cardreptext2" @click="goPages('./pepayment')" v-if="config">$ {{ config.borrow_amount }} <image
                            src="../../../static/images/right.png" alt=""></image></view>
                </view>
                <view class="cardrep">
                    <view class="cardreptext1">{{ $t('loan.lo_l4') }}</view>
                    <view class="flex cardreptext2" @click="goPages('./pepayment')" v-if="config">$ {{ config.repayment_amount }}
                        <image src="../../../static/images/right.png" alt=""></image>
                    </view>
                </view>
            </view>
            <view class="cardBtn" @click="goPages">
                {{ $t('loan.lo_l5') }}
            </view>
        </view>
        <view class="recordCard" v-for="item of loanList" :key="item.id">
            <view class="flex record mt40">
                <view class="recordtext1">{{ $t('loan.lo_l6') }}</view>
                <view class="recordtext2">$ {{ item.amount }}</view>
            </view>
            <view class="flex record mt16">
                <view class="recordtext1">{{ $t('loan.lo_l7') }}</view>
                <view class="recordtext2">{{ item.createTime.slice(0, 10) }}</view>
            </view>
            <view class="flex record mt16">
                <view class="recordtext1">{{ $t('loan.lo_l8') }}</view>
                <view class="recordtext2 yellow" v-if="item.status == 0">{{ $t('loan.lo_l9') }}</view>
                <view class="red recordtext2" v-if="item.status == 2">{{ $t('loan.lo_l10') }}</view>
                <view class="green recordtext2" v-if="item.status == 1">{{ $t('loan.lo_l11') }}</view>
            </view>
        </view>
    </view>
</template>

<script>
    import {toast} from '@/utils/tools'
	import request from '@/utils/request'
    export default {
        data() {
            return {
                config:'',
                loanList:'',
                loanconfig:'',

            }
        },
        onLoad(){
            this.getData();
        },
        methods: {
            goPages(){
                uni.navigateTo({
                    url: '/bundle/pages/user_wallet/verified',
                })
            },
            back()  {
                history.back()
            },
            getData(){
                request({
                    methods: 'get',
                    url: 'user/loan/repaymentInfo',
                }).then(res => {
                    toast({title: res.msg});
                    this.config = res.data
                })
                request({
                    methods: 'get',
                    url: 'user/loan/list',
                }).then(res => {
                    toast({title: res.msg});
                    this.loanList = res.data
                })

                request({
                    methods: 'get',
                    url: 'user/loan/config'
                }).then(res => {
                    toast({title: res.msg});
                    this.loanconfig = res.data
                })
            }
        }
        
    }
</script>

<style scoped>
/* page {
    background-color: #F3F5F7;
} */

.main {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
}

.topbg {
    width: 750rpx;
    height: 700rpx;
    background: linear-gradient(180deg, #316DF3 0%, rgba(49, 109, 243, 0) 100%);
    overflow: hidden;
}
    .topbg .topnav {
        width: 100%;
        justify-content: space-between;
        align-items: center;
        color: white;
        margin-top: 110rpx;
        padding: 0 32rpx;
    }
        .topbg .topnav .toptitle {
            font-weight: 600;
            font-size: 36rpx;
            color: #FFFFFF;
            line-height: 42rpx;
            text-align: center;
            margin-right: 32rpx;

        }

        .topbg .topnav view {
            width: 30%;
        }


.topCard {
    width: 686rpx;

    margin: -500rpx auto 0;
    background: #FFFFFF;
    border-radius: 24rpx 24rpx 24rpx 24rpx;
    text-align: center;
    padding-bottom: 64rpx;
}
    .topCard .cardTitle {
        margin-top: 108rpx;
        height: 38rpx;
        font-weight: 400;
        font-size: 32rpx;
        color: #000000;
        line-height: 38rpx;
    }

    .topCard .cardContenText {
        width: 590rpx;
        height: 88rpx;
        /* background: #F5F5F5; */
        border-radius: 18rpx 18rpx 18rpx 18rpx;
        margin: 32rpx auto 0;
        font-weight: 400;
        font-size: 28rpx;
        color: #959595;
        line-height: 33rpx;
        text-align: center;
    }

    .topCard .cardreps {
        justify-content: space-between;
        margin: 24rpx 0;
    }
        .topCard .cardreps .cardrep {
            width: 50%;
            text-align: center;
        }
            .topCard .cardreps .cardrep .cardreptext1 {

                font-weight: 400;
                font-size: 26rpx;
                color: #959595;
                line-height: 30rpx;
                text-align: center;
            }

            .topCard .cardreps .cardrep .cardreptext2 {
                margin-top: 16rpx;
                justify-content: center;
            }

    .cardBtn {
        margin: 64rpx auto 0;
        color: white;
        width: 494rpx;
        height: 88rpx;
        background: linear-gradient(90deg, #75B5F0 0%, #6584F3 100%);
        border-radius: 44rpx 44rpx 44rpx 44rpx;
        line-height: 88rpx;
    }

.recordCard {
    width: 686rpx;
    height: 214rpx;
    background: #FFFFFF;
    border-radius: 24rpx 24rpx 24rpx 24rpx;
    margin: 24rpx auto;
}
    .record {
        justify-content: space-between;
        padding: 0 32rpx;
    }
        .recordtext1 {
            font-weight: 400;
            font-size: 28rpx;
            color: #959595;
            line-height: 33rpx;
            text-align: left;
        }

        .yellow {
            color: #FFB21E;
        }

.red {
    color: #FF4444;
}

.green {
    color: #2BD195;
}
</style>
