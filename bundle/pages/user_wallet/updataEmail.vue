<template>
	<view class="all">
		<view class="" style="position: relative;">
			<view class="nav flex" @click="back">
				<view class="">
					<image style="width: 44rpx;height: 44rpx;" src="../../../static/images/Frame.png" mode=""></image>
				</view>
				<view class="text">
					{{ $t('tk_zc.l_l52') }}
				</view>
				<view class=""></view>
			</view>
		</view>
		<view class="withdraw" style="background:transparent">
			<view class="box">
				<view>
					<view  class="flex flex-col from-item">
						<view class="title text_bold ">
							{{ $t('tk_zc.l_l53') }}
						</view>
						<view class="form-input">
							<input v-model="emailValue" :placeholder="$t('tk_wa.wa_a38')" type="text" />
						</view>
					</view>
					
				</view>
			</view>
		</view>
		<view class="abs_bot pdlr32">
			<view class="sub_btn" @click="getEmailFn" style="margin-top: 0;">
				{{ $t('tk_wa.wa_a32') }}
			</view>
		</view>


		
		<view class="bten" v-if="messBoxmt.length>0">
			<view class="" v-for="item of messBoxmt" :key="item.id">
				<view class="box animate__animated animate__bounceInRight">
					{{ item.title }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '@/utils/request'
    export default {
        data() {
            return {
                messBoxmt:[],
                time:undefined,
                socket:undefined,
                qcdsq:undefined,

                emailValue:'',
            }
        },
        onLoad(e){
			this.emailValue = e.emailValue || ''
        },
        methods: {
            back()  {
				history.back()
            },
			getEmailFn(){
				uni.showLoading()
				if (!this.emailValue) {
					this.$toast({title: this.$t('tk_zc.l_l55')})
					uni.hideLoading()

					return false
				}
				request({
					url: "user/attribute/email",
					method: "POST",
					data: {
						email: this.emailValue
					}
				}).then(res => {
					this.$toast({title: res.msg})
					if(res.code==1){
						uni.$emit('onBack');
						uni.navigateBack()
					}
					uni.hideLoading()
				}).catch(err => {
					this.$toast({title: err})
					uni.hideLoading()
				})
			}
        }
        
    }
</script>

<style scoped>
.pdlr32{
        padding-left: 1rem;
        padding-right: 1rem;
    }
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
.bten {
	position: absolute;
	top: 32rpx;
	left: 50%;
	z-index: 9990;
	margin-left: -165px;
}
.bten .box {
		margin-top: 20rpx;
		width: 330px;
		padding: 14px 26px 14px 13px;
		border-radius: 8px;
		box-sizing: border-box;
		border: 1px solid #ebeef5;
		background-color: #fff;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
		transition: opacity .3s, transform .3s, left .3s, right .3s, top .4s, bottom .3s;
		overflow: hidden;
	}




.all {
	height: 100vh; 
	background: #ffffff;
	justify-content: space-between;
	box-sizing: border-box;
	padding: 24rpx 30rpx;
}
.pdlr32 {
		padding-left: 1rem;
		padding-right: 1rem;
	}
	.abs_bot {
		height: 2.5rem;
		width: 100%;
		position: absolute;
		bottom: 2.5rem;
		left: 0;
		font-weight: bold;
	}
	.sub_btn {
		width: 100%;
		height: 2.5rem;
		color: #fff;
		line-height: 2.5rem;
		margin-top: 6.0625rem;
		border-radius: 1.375rem;
		background-color: #2979ff;
		text-align: center;
	}
	.from-item {
		margin-top: 1.25rem;
	}

	.flex-col {
		flex-direction: column;
	}
	.flex {
		display: flex;
	
	}
	.title{
		width: 100%;
		text-align: left;
	}
	.text_bold {
		font-weight: bold;
	}
	.form-input {
		width: 100%;
		height: 3.25rem;
		/* background-color: #EDEDED; */
		border-radius: 0.5rem;
		display: flex;
		align-items: center;
		padding: 0 0.5rem;
		margin-top: 0.75rem;
		border: 1px solid #c1b9b9;
	}
	.change[data-v-08136f6e] {
		display: flex;
		justify-content: center;
		width: 100%;
		font-size: 1.25rem;
	}

	.mt40 {
		margin-top: 1.25rem;
	}

</style>
