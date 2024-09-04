<template>
    <view class="pages">
        <view class="today-data flex m-t-100">
            <veiw class="menu">
                <view class="menu_num">
                    0
                </view>
                <view class="menu_title">
                    团队规模
                </view>
            </veiw>
            <veiw class="menu">
                <view class="menu_num">
                    0.00
                </view>
                <view class="menu_title">
                    团队奖金
                </view>
            </veiw>
        </view>
        <view class="today-data flex m-t-32" style="padding: 20px">
            <view>
                推荐人id：23123jb
            </view>
            <view>
                复制
            </view>
        </view>
        <view class="today-data flex m-t-32" style="padding: 20px">
            <view>
                默认链接：http://*************23123jb
            </view>
            <view>
                复制
            </view>
        </view>
        <view class="today-data flex m-t-32 gradebg" style="padding: 20px">
            <view class="grade" :class="{ 'bor_btn': myListIndex == 0 }" @click="cycle(0)">
                等级1
            </view>
            <view class="grade" :class="{ 'bor_btn': myListIndex == 1 }" @click="cycle(1)">
                等级2
            </view>
            <view class="grade" :class="{ 'bor_btn': myListIndex == 2 }" @click="cycle(2)">
                等级3
            </view>
        </view>
        <view class="today-data flex m-t-32" style="padding: 20px">
            <view>
                用户名
            </view>
            <view>
                利润金额
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            myListIndex: 0,

        };
    },

    methods: {
        cycle(num) {
            this.myListIndex = num
            // 刷新数据
            // methods.report()
        },
    },

    onLoad() {

    },
    onUnload() {

    },
};
</script>
<style lang="scss">
page {
    background-color: $-color-border;

    padding: 0 24rpx;
}

.today-data {
    padding: 60rpx 30rpx 40rpx 30rpx;
    border-radius: 14rpx;
    background-color: $-color-white;
    justify-content: space-between;

    .item-data {
        width: 220rpx;

        view:first-child {
            color: $-color-muted;
            font-size: 24rpx;
        }

        view:last-child {
            color: $-color-normal;
            font-size: 44rpx;
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

.menu {
    width: 50%;
}

.menu_num {
    text-align: center;
    color: #86bb55;
    font-size: 32px;
    font-weight: 600;
    line-height: 32px;
}

.menu_title {
    text-align: center;
    line-height: 32px;

}

.gradebg {
    background-color: #86bb55;
    color: white;
}
.bor_btn{
    color: #000;
}
.grade{
    width: 33%;
    text-align: center;
}
</style>