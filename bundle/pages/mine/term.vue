<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-08-09 09:23:59
 * @LastEditors: chenpn chenpn699@gmail.com
 * @LastEditTime: 2024-09-05 20:23:34
 * @FilePath: \1\web_business\bundle\pages\mine\term.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="term">
        <view class="nav flex">
			<view @click="back">
				<image style="width: 44rpx;height: 44rpx;" src="../../static/images/Frame.png" mode=""></image>
			</view>
            <view class="text">
				{{ $t('bus_my.y18') }}
			</view>
			<view></view>
		</view>
        <view class="box pdlr32">
            <view class="header">
                <view class="list">
                    <text class="green fs20">{{ termInfo.team_count }}</text>
                    <text class="mt32">{{ $t('bus_term.bt1') }}</text>
                </view>
                <view class="list">
                    <text class="green fs20">{{ currency }}{{ termInfo.team_profit }}</text>
                    <text class="mt32">{{ $t('bus_term.bt2') }}</text>
                </view>
            </view>
            <view class="mode1">
                <text>
                    {{ $t('bus_term.bt3') }}: {{ termInfo.invite_code }}
                </text>
                <text @click="copy(termInfo.invite_code)">
                    {{ $t('bus_term.bt4') }}
                </text>
            </view>
            <view class="links">
                <view @click="goRegist" class="column">
                    {{ $t('bus_term.bt5') }}: 
                    <text class="blue">{{ goRegAddress }}</text>
                </view>
            </view>
            <view class="tabs">
                <u-row class="tabs-row">
                    <u-col class="tabs-col">
                        <view class="demo-layout bg-purple" @click="tabClick(1)" :class="{'active':tabId==1}">
                            {{ $t('bus_term.bt8') }}1
                        </view>
                        <view class="demo-layout bg-purple" @click="tabClick(2)" :class="{'active':tabId==2}">
                            {{ $t('bus_term.bt8') }}2
                        </view>
                        <view class="demo-layout bg-purple" @click="tabClick(3)" :class="{'active':tabId==3}">
                            {{ $t('bus_term.bt8') }}3
                        </view>
                    </u-col>
                </u-row>
            </view>
            <view class="mode2">
                <text>
                    {{ $t('bus_term.bt6') }}
                </text>
                <text>
                    {{ $t('bus_term.bt7') }}
                </text>
            </view>
            <view class="modeContent">
                <view class="modelItem">
                    <view class="mt40" v-for="(reb,index1) in rebateList" :key="index1">
                        <view class="flex">
                            <text class="model">
                                {{ reb.shop_name ||'' }}
                            </text>
                            <text class="model">
                                {{ reb.rebate || '' }}
                            </text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>

</template>

<script>
    import {toast} from '@/utils/tools'
	import request from '@/utils/request'
    import { copy } from "@/utils/tools.js";
    export default{
        data(){
            return{
                termInfo: {},
                rebateList: [],
                tabId:0,
                currency: '',
                goRegAddress: ''
            }
        },
        mounted() {
            this.tabId = 1;
			this.currency = uni.getStorageSync('currency');
            this.getShopTeamInfo();
            this.getShopRebate()
        },
        methods: {
            goRegist(){
                this.copy(this.goRegAddress)
            },
            back(){
                uni.redirectTo({
					url: '/pages/user/user'
				})
            },
            //团队信息
            getShopTeamInfo(){
                uni.showLoading()
                request({
                    url: 'shop/getShopTeamInfo',
                    method: "get",
                }).then((res)=>{
                    if(res.data){
                        this.termInfo = res.data;
                        let link = this.termInfo.invite_code ? window.location.href.split('#')[0] + `#/pages/register/register?invite_code=${this.termInfo.invite_code}`:window.location.href.split('#')[0] + '#/pages/register/register'
                        this.goRegAddress =  link
                    }
                }).catch((err) => {
                    uni.hideLoading()
                    this.$toast({title: err})
                })
            },
            //返佣列表
            getShopRebate(lv){
                uni.showLoading()
                let url = lv?`shop/getShopRebate?lv=${lv}`:'shop/getShopRebate'
                request({
                    url: url,
                    method: "get",
                }).then((res)=>{
                    if(res.data&&res.data.list.length>0){
                        this.rebateList = res.data.list
                    }else{
                        this.rebateList = []
                    }
                    uni.hideLoading()
                }).catch((err) => {
                    uni.hideLoading()
                    this.$toast({title: err})
                })
            },
            tabClick(index){
                this.tabId = index
                this.getShopRebate(index)
            },
            copy(content) {
                copy(content);
                uni.showToast({
                    title: this.$t('tk_ck.a_c4')
                })
            },
        },
    }
</script>

<style scoped>
    .pdlr32{
        padding-left: 1rem;
        padding-right: 1rem;
    }
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
    .term{
        /* padding: 50rpx; */
        background-color: #fff;
        height: 100vh;
        font-size: 18px;
    }
    .header{
        height: 120px;
        background: #fff;
        border-radius: 15px;
        display: flex;
        justify-content: space-between;
        padding: 0 25px;
    }
    .list{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .mt32{
        margin-top: 1.3rem;
    }
    .fs20{
        font-size: 28px;
    }
    .green{
        color: #40AFFA;
        font-weight: bold;
    }
    .mode1{
        margin-top: 15px;
        height: 50px;
        padding: 0 15px;
        border-radius: 15px;
        background: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .links{
        margin-top: 25px;
        padding: 0 15px;
        border-radius: 15px;
        background: #fff;
        display: flex;
        align-items: center;
        overflow: hidden;
    }
    .column{
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .blue{
        width: 100%;
        padding: 20rpx 0;
        color: #40AFFA;
        overflow-wrap: break-word;
    }
    .tabs{
        margin-top: 30px;
        height: 60px;
        padding: 0 10px;
        border-radius: 15px;
        background: #40AFFA;
        color: #fff;
        line-height: 60px;
        font-size: 20px;
    }
    .tabs-col{
        text-align: center !important;
        display: flex;
    }
    .demo-layout{
        flex: 1;
    }
    .mode2{
        margin-top: 15px;
        /* height: 70px; */
        padding: 0 15px;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        background: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .active{
        color: #000;
        font-weight: bold;
    }
    .modeContent{
        /* height: 70px; */
        padding: 0 15px;
        background: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .modelItem{
        display: flex;
        justify-content: space-between;
        width: 100%;
        flex-direction: column;
        /* margin-top: 40rpx; */
    }
    .flex{
        display: flex;
        justify-content: space-between;
    }
</style>