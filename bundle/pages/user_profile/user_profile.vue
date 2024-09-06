<template>
    <view class="m-t-20">
        <view class="nav flex" @click="back">
			<view class="">
				<image style="width: 44rpx;height: 44rpx;" src="../../../static/images/Frame.png" mode=""></image>
			</view>
			<view class="text">
				{{ $t('bus_my.y12') }}
			</view>
			<view class=""></view>
		</view>
        <view class="muted nr p-l-30 p-t-20 p-b-28">{{ $t('bus_userProfile.up1') }}</view>

        <view class="item bb">
            <view>{{ $t('bus_userProfile.up2') }}</view>
            <view class="flex row-left">
                <input type="text" :placeholder="$t('bus_userProfile.up3') " v-model="old_password" />
            </view>
        </view>

        <view class="item bb">
            <view>{{ $t('bus_userProfile.up4') }}</view>
            <view class="flex row-left">
                <input type="text" :placeholder="$t('bus_userProfile.up5')" v-model="password" />
            </view>
        </view>

        <view class="item bb">
            <view>{{ $t('bus_userProfile.up6') }}</view>
            <view class="flex row-left">
                <input type="text" :placeholder="$t('bus_userProfile.up7') " v-model="password_confirm" />
            </view>
        </view>

        <view class="br60 btn flex row-center white md" @click="onSubmit(type)">
            {{ $t('bus_userProfile.up8') }}
        </view>

        <u-toast ref="uToast" />
    </view>
</template>

<script>
    import {toast} from '@/utils/tools'
    import {
        apiLogout,
        apiSetPassword
    } from '@/api/user'
    export default {
        data() {
            return {
                old_password: '',
                password: '',
                password_confirm: ''
            }
        },

        methods: {
               //后退
            back()  {
                uni.redirectTo({
					url: '/pages/user/user'
				})
            },
            async onSubmit() {
                await apiSetPassword({
                    old_password: this.old_password,
                    password: this.password,
                    password_confirm: this.password_confirm
                })

                this.$refs.uToast.show({
                    title: this.$t('bus_my.y21'),
                    type: 'success'
                })
                this.logout()
            },
            
            logout() {
                //  退出登录
                apiLogout().then(res => {
                    if(res.code==1){
                        this.$store.commit("logout");
                        setTimeout(() => {
                            uni.reLaunch({
                                url: "/pages/login/login"
                            })
                        }, 1000)
                    }else{
                        toast({title: res.msg});
                    }
                })
            }
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
        font-size: 1.125rem;
        color: #171418;
    }
    .item {
        padding: 30rpx;
        /* #ifndef APP-NVUE */
        display: flex;
        /* #endif */
        flex-direction: row;
        align-items: center;
        background-color: $-color-white;
        justify-content: space-between;

        >view:first-child {
            width: 180rpx;
            color: $-color-black;
            font-size: $-font-size-nr;
            font-weight: 500;
        }

        >view:last-child {
            flex: 1;
            text-align: left;

            textarea {
                width: 560rpx;
                height: 300rpx;
            }
        }
    }
    
    .bb {
        border-bottom: 1px solid #F8F8F8;
    }

    .btn {
        width: 690rpx;
        height: 88rpx;
        margin: 0 auto;
        margin-top: 40rpx;
        background-color: $-color-primary;
    }
</style>
