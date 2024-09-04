<template>
	<view class="main">
		<view class="topbg">
			<view class="flex topnav">
				<view><image @click="back()" style="width: 44rpx;height: 44rpx;" class="back"
						src="../../../static/images/back.png" alt=""></image>
				</view>
				<view class="toptitle">{{ $t('loan.lo_v1') }}</view>
				<view></view>
			</view>
			<view class="bannertext">{{ $t('loan.lo_v1') }}</view>
		</view>
		<view class="verifiedlist">
			<view class="listtitle flex">{{ $t('loan.lo_v2') }}</view>
			<view class="inputtitle prl32 mt40" v-show="showPhone">{{ $t('loan.lo_v3') }}</view>
			<view class="inputcontent flex" v-show="showPhone">
				<view class="inputtext flex">
					<view>{{ SMS }}</view>
					<image style="width: 48rpx;height: 48rpx;" src="../../../static/images/phonedwon.png" alt=""
						@click="showLeft = true"></image>
				</view>
				<input type="text" placeholder="Please enter phone number" v-model="loan_phone">
			</view>

			<view class="inputtitle prl32 mt40" v-show="showID">{{ $t('loan.lo_v4') }}</view>
			<view class="inputcontent flex" v-show="showName">
				<view class="inputtext flex">
				</view>
				<input type="text" placeholder="Please enter the borrower's name" v-model="real_name">
			</view>

			<view class="inputtitle prl32 mt40" v-show="showID">{{ $t('loan.lo_v5') }}</view>
			<view class="inputcontent flex" v-show="showID">
				<view class="inputtext flex">
				</view>
				<input type="text" placeholder="Please enter ID number" v-model="real_IDnum">
			</view>

			<view class="inputtitle prl32 mt40" v-show="showID">{{ $t('loan.lo_v6') }}</view>
			<view class="mt16" style="display: flex;justify-content: space-between;" v-show="showID">
				<view style="position: relative;flex:1">
					<nut-uploader v-if="!showImg1" :url="uploadHost + 'api/uploads'" name="cert" type="image/jpeg"
						@success="successHandle" style="border-radius: 20rpx;margin: 0 auto;display: flex;align-items: center;justify-content: center;height: 155px;">
						<u-icon name="camera" size="25px"></u-icon>
					</nut-uploader>

					<view class="" v-if="showImg1" style="position: absolute;margin-left: 20px;">
						<image :src="uploadHost + img1" style="width: 156px;height: 154px;border-radius: 15rpx;">
						</image>
					</view>
					<view @click="img1Close">
						<nut-icon type="cross" v-if="showImg1" size="15"
						style="position: absolute; top: -10rpx;left: 275rpx;" ></nut-icon>
					</view>
					<view style="position: absolute;top: 180px;left: 55px;width: 100%;">{{ $t('loan.lo_v7') }}</view>

				</view>

				<view style="position: relative;flex:1">
					<nut-uploader v-if="!showImg2" :url="uploadHost + 'api/uploads'" name="cert" type="image/jpeg"
						@success="successHandle1" style="border-radius: 20rpx;margin: 0 auto;display: flex;align-items: center;justify-content: center;height: 155px;">
						<u-icon name="camera" size="25px"></u-icon>
					</nut-uploader>
					<view class="" v-if="showImg2" style="position: absolute;margin-left: 20px;">
						<image :src="uploadHost + img2" style="width: 156px;height: 154px;border-radius: 15rpx;">
						</image>
					</view>
					<view @click="img2Close">
						<nut-icon type="cross" v-if="showImg2" size="15"
						style="position: absolute; top: -10rpx;left: 275rpx;"></nut-icon>
					</view>
					<view style="position: absolute;top: 180px;left: 55px;width: 100%;">{{ $t('loan.lo_v8') }}</view>

				</view>
			</view>

			<view class="submit" @click="submit()" :style="{top:!showImg1?'60px':'210px'}">{{ $t('loan.lo_v9') }}</view>
		</view>
		<!-- <view style="height: 110rpx;background: #fff;">
		</view> -->
		<!-- <nut-popup v-model:visible="showLeft" position="left" :style="{ width: '322rpx', height: '100%' }">
			<view class="inpSearch">
				<input type="text" v-model="inpSeach" @tap.stop="searchHandle" @input="searchHandle" style="">
				<nut-icon name="search" style="margin-right: 40rpx;" size="20">
				</nut-icon>
			</view>
			<view class="mt30 ">
				<view class="listItem2" v-for="(item, index) in searchCode" :style="showblue == index ? blue : ''"
					@click="confirm(item, index)">
					{{ item.text }} {{ item.name }}
				</view>
			</view>
		</nut-popup> -->
		<nut-popup position="left" v-model="showLeft" :style="{ width: '322rpx', height: '100%' }">
			<view class="inpSearch">
				<input type="text" v-model="inpSeach" @tap.stop="searchHandle" @input="searchHandle" style="">
				<nut-icon name="search" style="margin-right: 40rpx;" size="20">
				</nut-icon>
			</view>
			<view class="mt30 ">
				<view class="listItem2" v-for="(item, index) in searchCode" :style="showblue == index ? blue : ''"
					@click="confirm(item, index)">
					{{ item.text }} {{ item.name }}
				</view>
			</view>
		</nut-popup>
	</view>
</template>

<script>
	import request from '@/utils/request'
    export default {
        data() {
            return {
                uploadHost:'',
				showImg:false,
				SMS:"+84",
				img1:'',
				img2:"",
				loan_phone:"",
				real_name:"",
				real_IDnum:"",
				showPhone:false,
				showName:false,
				showID:false,
				showImg2:false,
				showImg1:false,
				certification:'',
				showblue:0,
				blue : 'background: #316DF3; color: white;',
				inpSeach:'',
				searchCode:[{
						text: '+84',
						name: 'VN'

					},
					{
						text: '+60',
						name: 'MY'

					},
					{
						text: '+81',
						name: 'JP'

					},
					{
						text: '+82',
						name: 'KR'

					},
					{
						text: '+971',
						name: 'AE'

					},
					{
						text: '+44',
						name: 'GB'

					},
					{
						text: '+61',
						name: 'AU'

					},
					{
						text: '+31',
						name: 'NL'

					},
					{
						text: '+1',
						name: 'CA'

					},
					{
						text: '+55',
						name: 'BR'

					},
					{
						text: '+62',
						name: 'ID'

					},
					{
						text: '+65',
						name: 'SG'

					},
					{
						text: '+66',
						name: 'TH'

					},
				],
				searchCode1:[{
						text: '+84',
						name: 'VN'

					},
					{
						text: '+60',
						name: 'MY'

					},
					{
						text: '+81',
						name: 'JP'

					},
					{
						text: '+82',
						name: 'KR'

					},
					{
						text: '+971',
						name: 'AE'

					},
					{
						text: '+44',
						name: 'GB'

					},
					{
						text: '+61',
						name: 'AU'

					},
					{
						text: '+31',
						name: 'NL'

					},
					{
						text: '+1',
						name: 'CA'

					},
					{
						text: '+55',
						name: 'BR'

					},
					{
						text: '+62',
						name: 'ID'

					},
					{
						text: '+65',
						name: 'SG'

					},
					{
						text: '+66',
						name: 'TH'

					},
				],
				showLeft:false,

            }
        },
        onLoad(){
            this.getData();
        },
		watch:{
			inpSeach:function(newValue, oldValue){
				if (newValue == '') {
					this.searchCode = this.searchCode1
				}
			}
		},
        methods: {
			successHandle(responseText, option, fileItem) {
				this.showImg = false
				const img = JSON.parse(responseText.responseText).data
				this.img1 = img
			},
			successHandle1 (responseText, option, fileItem) {
				this.showImg = false
				const img = JSON.parse(responseText.responseText).data
				this.img2 = img
			},
			searchHandle (e) {
				if (!this.searchCode) {
					return false
				}
				let temArr = []
				this.searchCode.forEach(item => {
					if (item.name.includes(this.inpSeach.toLowerCase()) || item.text
						.toLowerCase().includes(this.inpSeach.toLowerCase())) {
						temArr.push(item)
					} else {
						return false
					}
				})
				this.searchCode = temArr
			},
		
			confirm(item, index) {
				this.showblue = index
				console.log(item, index);
				this.SMS = item.text
			},

            goPages(urls){
                uni.navigateTo({
                    url: urls,
                })
            },
            back()  {
                history.back()
            },
			getData(){
				//测试
				let res={
					"id": 26,
					"img": "storage\/cert\/20240517\/rhPulQw98V8zbhCQMJsL7Zdb2kQR58hViyWaicoy.png",
					"img2": "storage\/cert\/20240517\/RU9SYiYYMHJeX0v2IVO9fcuxnKYDZkEY7Hd0UvKd.png",
					"contract": "https:\/\/v1.imgstoragebobo.com\/storage\/cert\/20240626\/zi650x6BDmkYhWSPqLqQxv0UYuGkR1UyAbF0s5ND.jpg",
					"uid": 319,
					"createTime": "1715916589",
					"updateTime": "1719888148",
					"type": 1,
					"email": "999@qq.com",
					"verify_phone": "",
					"verify_address": "",
					"verify_store_name": "",
					"verify_name": "",
					"verify_code": "",
					"verify_code_type": 1,
					"verify_country": "",
					"verify_whatsapp": "",
					"verify_monthly_income": "0.00",
					"contract_time": "2024-07-02",
					"phone": "66364866321",
					"upload_host": "https:\/\/v1.imgstoragebobo.com\/",
					"time": "2024-08-08",
					"verify_status": 2,
					"config": {
						"verify_card": 1,
						"verify_phone": 1,
						"verify_email": 1,
						"verify_store_name": 1,
						"verify_address": 1,
						"verify_monthly_income": 1,
						"verify_name": 1,
						"verify_code": 1,
						"verify_whatsapp": 1,
						"verify_country": 1,
						"verify_contract": 1
					}
				}
				this.uploadHost = res.upload_host
				if (res.img == '') {
					this.showImg1 = false
				} else {
					this.showImg1 = true
					this.img1 = res.img
				}
				if (res.img2 == '') {
					this.showImg2 = false
				} else {
					this.showImg2 = true
					this.img2 = res.img2
				}
				// request({
				// 	methods: 'get',
				// 	url: 'user/attribute/verify',
				// }).then(res => {
				// 	console.log(res.upload_host);
				// 	this.uploadHost = res.upload_host
				// 	if (res.img == '') {
				// 		this.showImg1 = false
				// 	} else {
				// 		this.showImg1 = true
				// 		this.img1 = res.img
				// 	}
				// 	if (res.img2 == '') {
				// 		this.showImg2 = false
				// 	} else {
				// 		this.showImg2 = true
				// 		this.img2 = res.img2
				// 	}
				// })

				//测试
				let res1={
					"is_open": 1,
					"verify_phone": 1,
					"verify_realname": 1,
					"verify_card": 1,
					"verify_email": 0
				}
				if (res1.is_open == 0) {
					uni.navigateTo({
						url: '/bundle/pages/user_wallet/interest'
					})
				}
				if (res1.verify_phone == 1) {
					this.showPhone = true
				}
				if (res1.verify_realname == 1) {
					this.showName = true
				}
				if (res1.verify_card == 1) {
					this.showID = true
				}
				// request({
				// 	methods: 'get',
				// 	url: 'user/loan/verify',
				// }).then(res => {
				// 	console.log(res);
				// 	if (res.is_open == 0) {
				// 		// uni.navigateTo({
				// 		// 	url: '/bundle/pages/user_wallet/interest'
				// 		// })
				// 	}
				// 	if (res.verify_phone == 1) {
				// 		this.showPhone = true
				// 	}
				// 	if (res.verify_realname == 1) {
				// 		this.showName = true
				// 	}
				// 	if (res.verify_card == 1) {
				// 		this.showID = true
				// 	}

				// })

				request({
					methods: 'get',
					url: 'user/loan/certificationInfo',
				}).then(res => {
					console.log(res);
					this.certification = res.data
					if (res.status == 0) {
						this.$toast({title: this.$t('loan.lo_vt9')})

					}
					// if (res.status == 1) {
					// 	this.goPages('/bundle/pages/user_wallet/interest')
					// }
					if (res.status == 2) {
						this.$toast({title: this.$t('loan.lo_vt10')})
					}
					this.loan_phone = res.data.loan_phone
					this.real_IDnum = res.data.id_number
					console.log(this.real_IDnum);
					this.real_name = res.data.real_name
				})
			},
			//提交
			submit() {
				if (this.img1 == '') {
					this.$toast({title: this.$t('loan.lo_vt1')})
					return false
				}
				if (this.loan_phone.length < 6) {
					this.$toast({title: this.$t('loan.lo_vt2')})
					return false
				}
				if (this.real_name == '') {
					this.$toast({title: this.$t('loan.lo_vt3')})
					return false
				}
				if (this.real_IDnum == '') {
					this.$toast({title: this.$t('loan.lo_vt4')})
					return false
				}
				request({
					method: "POST",
					url: 'user/loan/certification',
					data: {
						img: this.img1,
						img2: this.img2,
						loan_phone: this.loan_phone,
						real_name: this.real_name,
						id_number: this.real_IDnum
					}
				}).then(res => {
					this.$toast({title: this.$t('loan.lo_vt9')})

				})
			},
			img1Close(){
				this.showImg1 = false
			},
			img2Close(){
				this.showImg2 = false
			}
        }
        
    }
</script>

<style scoped>
	page {
		background-color: #F3F5F7;
	}

	.prl32 {
		padding: 0 32rpx;
	}

	.topbg {
		width: 750rpx;
		height: 700rpx;
		background: url('../../../static/images/verifiedbg.png');
		background-size: 100%;
		overflow: hidden;
		margin: 0 auto;
	}
		.topnav {
			width: 100%;
			justify-content: space-between;
			align-items: center;
			color: white;
			margin-top: 110rpx;
			padding: 0 32rpx;
		}
			.toptitle {
				font-weight: 600;
				font-size: 36rpx;
				color: #FFFFFF;
				line-height: 42rpx;
				text-align: center;
				margin-right: 32rpx;

			}

	.bannertext {
		width: 244rpx;
		height: 86rpx;
		font-weight: 600;
		font-size: 72rpx;
		color: #FFFFFF;
		line-height: 84rpx;
		margin: 82rpx 64rpx 0;

	}

	.verifiedlist {
		width: 686rpx;
		height: 1468rpx;
		background: #FFFFFF;
		border-radius: 24rpx 24rpx 24rpx 24rpx;
		margin: -300rpx auto 0;
	}

	.verifiedlist .listtitle {
			width: 100%;
			/* background-color: #EEF1FB; */
			border-radius: 24rpx 24rpx 0rpx 0rpx;
			font-weight: 600;
			font-size: 32rpx;
			color: #000000;
			line-height: 38rpx;
			text-align: left;
			padding: 0 32rpx;
			height: 136rpx;
			align-items: center;
		}
.flex{
	display: flex;
}
	.inputtitle {
		font-weight: 500;
		font-size: 32rpx;
		color: #262626;
		line-height: 38rpx;
	}

	.inputcontent {
		width: 622rpx;
		height: 104rpx;
		background: #F4F4F4;
		border-radius: 16rpx 16rpx 16rpx 16rpx;
		margin: 16rpx auto 0;
		align-items: center;
	}
		.inputtext {
			height: 48rpx;
			line-height: 48rpx;
		}

	.submit {
		width: 494rpx;
		height: 88rpx;
		background: linear-gradient(90deg, #75B5F0 0%, #6584F3 100%);
		border-radius: 44rpx 44rpx 44rpx 44rpx;
		font-weight: 500;
		font-size: 32rpx;
		color: #FFFFFF;
		line-height: 38rpx;
		text-align: center;
		line-height: 88rpx;
		margin: 72rpx auto 0;
		position: relative;
	}

	.inpSearch {
		width: 266rpx;
		height: 72rpx;
		background: #F4F4F4;
		border-radius: 36rpx 36rpx 36rpx 36rpx;
		margin: 96rpx auto 40rpx;
		display: flex;
		align-items: center;
	}
		input {
			margin-left: 20rpx;
		}

	.listItem2 {
		width: 322rpx;
		height: 88rpx;
		border-radius: 0rpx 0rpx 0rpx 0rpx;
		border-bottom: 2rpx solid #E0E0E0;
		line-height: 88rpx;
		padding-left: 38rpx;
	}
	.prl32 {
		padding: 0 1rem;
	}

	.mt40 {
		margin-top: 1.25rem;
	}
	.mt16{
		margin-top: 0.5rem;
	}
</style>