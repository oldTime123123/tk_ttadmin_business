<template>
	<view style="height: 100vh;overflow: hidden;background-color: #fff;padding-top: 44px;">
		<view class="nav flex" @click="back">
			<view class="">
				<image style="width: 44rpx;height: 44rpx;" src="../../../../static/images/Frame.png" mode=""></image>
			</view>
			<view class="text">
				{{ $t('me_nu.t_5') }}
			</view>
			<view class="">

			</view>
		</view>
		<view class="pdlr35 pt32">

			<view class="">
				<view class="pl14">
					Txid
				</view>
				<view class="form-input">
					<input :placeholder="$t('tk_in.i_s3')" placeholder-class="colorC" v-model="formData.tx_id">
				</view>


				<view class="pl14 mt59">
					{{ $t('tk_zc.l_l62') }}
				</view>
				<view class="mt34 flex">
					<!-- @preview="preview" -->
					<nut-uploader
						name="cert"
						:url="uploadHost + 'api/uploads'"
						:isPreview="true"
						:acceptType = "['image/jpeg', 'image/png', 'image/gif', 'image/bmp']"
						@success="successHandle"
						
					>
						<!-- <nut-button small>上传</nut-button> -->
						<u-icon name="camera"></u-icon>
					</nut-uploader>
					<!-- <nut-uploader :url="uploadHost + 'api/uploads'" name="cert" type="image/jpeg"
						@success="successHandle" style="border-radius: 20rpx;" v-model:file-list="defaultFileList"
						maximum="1"></nut-uploader> -->
				</view>
			</view>

			<!-- 按钮 -->
			<view class="abs_bot pdlr32">
				<view class="sub_btn" @click="saveHandle">
					{{ $t('tk_in.i_s1') }}
				</view>
			</view>
			
			
			
		</view>
		<Loading ref="showLoading"></Loading>
		<view class="bten" v-if="messBoxmUsdt.length>0">
			<view class="" v-for="item of messBoxmUsdt" :key="item.id">
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
                recType:null,
				messBoxmUsdt:[],
				time:undefined,
				socket:undefined,
				qcdsq:undefined,
				uploadHost:"",
				defaultFileList:[],
				formData:{
					tx_id: '',
					order_no: "",
					cert: ""
				}

            }
        },
        onLoad(e){
			this.recType = e.type;
            this.getData();
        },
        methods: {
            back()  {
                clearInterval(this.qcdsq)
                clearInterval(this.time)
                history.back()

            },
			saveHandle() {
				if (!this.formData.cert) {
					return false
				}
				this.showLoading.loading = true
				request({
					url: `/finance/${this.recType}/recharge/cert`,
					method: "POST",
					data: {
						...this.formData
					}
				}).then(res => {
					this.showLoading.loading = false;
					this.$toast({title: res.msg});
					if(res.code==1){
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/tabbar/wallet'
							})
						}, 500)
					}
				}).catch(err => {
					this.showLoading.loading = false
					this.$toast({title: err})
				})
			},
			getData(){
				request({
					url: `finance/${this.recType}/recharge/index`,
					methods: 'get'
				}).then(res => {
					this.$toast({title: res.msg});
					if(res.code==1){
						if (!res.data.order) {
							uni.switchTab({
								url: '/pages/tabbar/index'
							})
							return false
						}
						this.uploadHost = res.data.upload_host
					}

					try {
						this.formData.tx_id = res.data.order.tx_id
						this.formData.order_no = res.data.order.order_no
						this.formData.cert = res.data.order.cert
						if (res.data.order.cert) {
							let temp = {
								name: '1238109381231.png',
								url: this.uploadHost + res.data.order.cert,
								status: 'success',
								message: 'success',
								type: 'image'
							}
							this.defaultFileList[0] = temp
						}
					} catch (e) {
						//TODO handle the exception
					}
				})
			},
			successHandle(responseText, option, fileItem){
				this.formData.cert = JSON.parse(responseText.responseText).data
			},
			preview(file) {
				this.previewImg = file;
			},
        }
        
    }
</script>


<style scoped>
	.nav {
		width: 100%;
		height: 88rpx;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 0rpx 32rpx;
	}
	.nav .text {
		font-size: 36rpx;
		color: #171418;

	}
	.pdlr35 {
		padding-left: 1.09375rem;
		padding-right: 1.093751rem;
		background-color: #fff;
	}
	.pt32 {
		padding-top: 1rem;
	}
	.pl14 {
		padding-left: 0.4375rem;
	}
	.form-input {
		height: 3.25rem;
		/* background-color: #EDEDED; */
		border-radius: 0.5rem;
		display: flex;
		align-items: center;
		padding: 0 0.5rem;
		margin-top: 0.75rem;
	}
	.form-input > uni-input {
		width: 100%;
	}
	.uni-input-wrapper, .uni-input-form {
		display: flex;
		position: relative;
		width: 100%;
		height: 100%;
		flex-direction: column;
		justify-content: center;
	}
	.mt59 {
		margin-top: 1.84375rem;
	}
	.pl14 {
		padding-left: 0.4375rem;
	}
	.flex {
		display: flex;
	}
	.mt34 {
		margin-top: 1.0625rem;
	}
	.abs_bot {
		height: 2.5rem;
		width: 100%;
		position: absolute;
		bottom: 2.5rem;
		left: 0;
		font-weight: bold;
	}
	.pdlr32 {
		padding-left: 1rem;
		padding-right: 1rem;
	}
	.sub_btn {
		width: 100%;
		height: 2.5rem;
		color: #fff;
		line-height: 2.5rem;
		margin-top: 6.0625rem;
		border-radius: 1.375rem;
		background-color: #DD2755;
		text-align: center;
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



	.colorC {
		color: #AFAFAF !important;
	}


	.btns {
		width: 100%;
		height: 2.5rem;
		border-radius: 0.25rem;
		color: #fff !important;
		line-height: 2.5rem;
		text-align: center;
		margin-top: 76rpx;
	}

</style>
