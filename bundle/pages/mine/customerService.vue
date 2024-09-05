<template>
    <view>
        <view class="nav flex" @click="back">
			<view class="">
				<image style="width: 44rpx;height: 44rpx;" src="../../../static/images/Frame.png" mode=""></image>
			</view>
			<view class="text">
				<view class="text">{{ $t('bus_my.y24') }}</view>
			</view>
			<view class="">

			</view>
		</view>
        <view style="overflow-y: scroll;">
            <u-cell-group v-for="item in serveList" :key="item.shop_id">
                <u-cell-item :title="item.nickname" :arrow="false">
                    <image class="serImg" slot="icon" src="../../../static/images/customerAvatar.png"></image>
                    <view slot="right-icon" class="lianxi" @click="goPage(item)">
                        <text>{{ $t('bus_my.y26') }}</text>
                    </view>
                </u-cell-item>
            </u-cell-group>
        </view>
    </view>
</template>

<script>
    import {toast} from '@/utils/tools'
    import { baseURL } from "@/config/app.js";
	import request from '@/utils/request'
	export default {
		data() {
			return {
				serveList: []
			};
		},
		methods: {
            getServe(){
                uni.showLoading();
                request({
                    url: 'shop/getCustomer',
                    method: "get",
                }).then((res) => {
                    toast({title: res.msg});
                    if (res.data&&res.data.list.length > 0) {
                        res.data.list.forEach((item)=>{
                            item.logo = baseURL+item.logo
                        })
                        this.serveList = res.data.list
                    }
                    uni.hideLoading()
                }).catch((err) => {
                    uni.hideLoading()
                    this.$toast({
                        title: err
                    })
                })
            },
            back(){
                uni.redirectTo({
					url: '/pages/user/user'
				})
            },
            goPage(item){
                window.location.href = item.link
            }
		},
		onShow() {
            this.serveList = [];
			this.getServe()
		},
	};
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
    .serImg{
        width: 40px;
        height: 40px;
    }
    .lianxi{
        background: #333333;
        color: #fff;
        border-radius: 8px;
        font-size: 12px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px 10px;
    }
    ::v-deep .u-cell_title{
        margin-left: 10px;
    }
</style>