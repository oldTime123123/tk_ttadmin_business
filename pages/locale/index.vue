<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-08-13 11:10:45
 * @LastEditors: chenpn chenpn699@gmail.com
 * @LastEditTime: 2024-09-03 15:33:35
 * @FilePath: \1\web_business\pages\locale\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="container">
        <view class="nav flex">
            <view @click="back">
                <image style="width: 44rpx;height: 44rpx;" src="../../static/images/Frame.png" mode=""></image>
            </view>
			<view class="text">{{ $t('bus_my.y23') }}</view>
            <view></view>
        </view>
		<view class="lang-item flex ai" v-for="(item, index) in langDatas" :key="index" @click="handleChangeLang(item.language)">
			<image :src="item.logo" class="img"></image>
			<view class="flex-1">{{ item.language_name }}</view>
		</view>
	</view>
</template>

<script>
	import { getLangVersion } from '@/api/user.js';
	export default {
		data() {
			return {
				langDatas:[]
			}
		},
        mounted() {
            this.fetchLangDatas()
        },
		methods: {
            fetchLangDatas(){
                getLangVersion().then((res) => {
                    this.langDatas = res.data
			    });
            },
            handleChangeLang(lang){
                this.$i18n.locale = lang;
                localStorage.setItem('locale', lang);
                // localStorage.setItem('lang', lang)
                // uni.setStorageSync('lang', lang);
                this.setTabBar()
            },
            setTabBar(){
                uni.setTabBarItem({
                    index: 0,
                    text: this.$t('tabbar.home')
                })
                uni.setTabBarItem({
                    index: 1,
                    text: this.$t('tabbar.manage')
                })
                uni.setTabBarItem({
                    index: 2,
                    text: this.$t('tabbar.order')
                })
                uni.setTabBarItem({
                    index: 3,
                    text: this.$t('tabbar.my')
                })
                this.back()
            },
            back(){
                let hasQuery = this.$route.query.hasOwnProperty('origin');
                if(hasQuery){
                    uni.switchTab({
                        url: "/pages/index/index",
                    });
                }else{
                    uni.switchTab({
                        url: "/pages/login/login",
                    });
                }
			},
		}
	}
</script>

<style scoped>
        .container {
            padding-bottom: 2px;
        }
		.container .lang-item {
			height: 46px;
			margin: 0 15px;
			border-top: 0.5px solid rgba(182, 203, 211, .1);
			margin-top: 2px;
        }
        .img {
            width: 30px;
            height: 30px;
            margin-right: 12px;
        }
        .nav {
            width: 100%;
            height: 88rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            padding: 32rpx;
            /* background-color: #fff; */
        }
        .nav .text {
            font-size: 36rpx;
            color: #000;
        }
</style>