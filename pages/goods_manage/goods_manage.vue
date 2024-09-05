<template>

	<view>
		<!-- Header -->
		<!-- <view class="header bg-white">
			<u-search placeholder="输入商品名称" @change="change(current)" :show-action="false" v-model="keyword"></u-search>
		</view> -->
		<Settled v-if="Certification_Status!=3"></Settled>

		<!-- Nav -->
		<view class="nav bg-white">
			<u-tabs name="name" :show-bar="false" :list="commodityList" :is-scroll="true" :current="commodityLCurrent" @change="commodityLChange"
				active-color="#40AFFA" />
		</view>
		<view class="nav bg-white" v-if="commodityLCurrent==2">
			<u-tabs name="name" :show-bar="false" :list="list" :is-scroll="true" :current="current" @change="change"
				active-color="#40AFFA" />
		</view>
		<view class="nav bg-white restNav" v-if="commodityLCurrent!=0&&recordsList.length>0">
			<u-checkbox-group style="margin-left: 40rpx;"  @change="checkboxGroupChange">
				<u-checkbox 
					@change="checkboxChange" 
					v-model="radioValue" 
				></u-checkbox>
			</u-checkbox-group>
			<text style="display: flex;align-items: center;margin-right: 10px;" @click="checkedAll">{{ $t('bus_goodManage.e21') }}</text>
			<view class="down" @click="allShelves" v-if="commodityLCurrent==1">
				{{ $t('bus_goodManage.e9') }}
			</view>
			<view class="down" @click="allAddWindow" v-else>
				{{ $t('bus_goodManage.e18') }}
			</view>
		</view>

		<view class="section" :style="{'height': height}">
			<mescroll-uni ref="mescrollRef" bottom="220rpx" height="100%"
				@up="upScroll" :up="upOption" :down="downOption" @down="downCallback"
				>
				<view style="display: flex;flex-wrap: wrap;margin-top: 10px;justify-content: space-between;">
					<block v-for="(item2, index2) in recordsList" :key="index2">
						<goods-card :content="item2" :Certification_Status="Certification_Status" :Gotype="commodityLCurrent" @unpdateList="unpdateList">
						</goods-card>
					</block>
				</view>
			</mescroll-uni>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>


<script>
	import request from '@/utils/request'
	import Settled from "@/components/Settled/Settled";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import {
		apiGoodsLists,
		apiGoodsOperation,
		apiGoodsCate,
		apiGoodsCateList
	} from '@/api/goods'
	import {
		debounce
	} from "@/utils/tools.js"
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				height: '100%',

				keyword: '',
				list: [],

				current: 0,

				commodityList: [
					{
						name: this.$t('bus_goodManage.e19')
					},{
						name: this.$t('bus_goodManage.e22')
					}, {
						name: this.$t('bus_goodManage.e20'),
					}
				],
				commodityLCurrent: 0,
				count: 0,

				action: '',
				curData: {},

				btns: {},

				off_shelf: false, //下架
				on_shelf: false, // 上架
				del: false, //删除
				recycle: false, //回收站
				warehouse: false, //放入仓库

				upOption: {
					empty: {
						icon: '/static/images/empty/shop.png',
						tip: this.$t('bus_goodManage.e17') + '！', // 提示
						fixed: true,
						top: "200rpx",
					},
					textLoading: this.$t('signin.loading'),
					textNoMore: this.$t('signin.textNoMore')
				},
				downOption: {
					use: false,
					textLoading: this.$t('signin.loading'),
					textInOffset: this.$t('signin.textInOffset'),
					textOutOffset: this.$t('signin.textOutOffset'),
					textSuccess: this.$t('signin.textSuccess'),
					textErr: this.$t('signin.textErr')
				},
				pages:{
					page: 1,
					size: 10
				},
				paging:null,
				recordsList:[],
				radioValue: undefined,
				Certification_Status: ''
			}
		},
		onShow(){
			this.Certification_Status = uni.getStorageSync('Certification_Status');
			this.setTabBar();
			uni.getSystemInfo({
				success: (res) => {
					this.height = res.windowHeight - 57 + 'px';
				}
			});
		},
		onTabItemTap() {
			this.$refs.mescrollRef.mescroll.scrollTo( 0, 0 );
			this.radioValue = false;
			this.pages.page = 1;
			this.commodityLCurrent = 0;
			this.recordsList = [];
			this.beenAddList();
		},
		methods: {
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
			},
			//除已上架外的物品tabs列表
			getCatList(){
				uni.showLoading()
				request({
					url: 'goods/cateList',
					methods: 'get'
				}).then((res)=>{
					this.list = res.data;
					this.upCallback();
				}).catch((err) => {
					uni.hideLoading()
					this.$toast({title: err.message})
				})
			},
			//上划加载更多
			upScroll(){
				if(this.commodityLCurrent==0||this.commodityLCurrent==1){
					this.beenAddList()
				}else{
					this.upCallback();
				}
			},
			stopTouchMove(){

			},
			//下拉刷新
			downCallback() {
				this.pages.page = 1;
				if(this.commodityLCurrent==0||this.commodityLCurrent==1){
					this.beenAddList()
				}else{
					this.upCallback();
				}
			},
			//子组件传递事件
			unpdateList(e){
				this.commodityLCurrent==0;
				this.pages.page = 1;
				if(e==0||e==1){
					this.beenAddList()
				}else{
					this.upCallback();
				}
			},
			//物品tabs切换事件
			change(event) {				
				let index;
				event.detail ? index = event.detail.current : index = event;
				this.current = Number(index);
				this.$refs.mescrollRef.mescroll.scrollTo( 0, 0 );
				this.radioValue = false;
				this.pages.page = 1;
				this.recordsList = [];
				this.upCallback();
			},
			//头部tabs（已上架、已下架、待添加）切换事件
			commodityLChange(e){
				if(this.Certification_Status!=3){
					this.$toast({
						title: this.$t('bus_my.y28'),
					});
					return
				}
				this.$refs.mescrollRef.mescroll.scrollTo( 0, 0 );
				this.commodityLCurrent = e;
				this.current = 0;
				this.pages.page = 1;
				this.radioValue = false;
				this.recordsList = [];
				if(e==0||e==1){
					//已添加列表
					this.beenAddList()
				}else{
					//待添加列表
					this.getCatList();
				}
			},
			//已上架或已下架列表数据
			beenAddList(){
				uni.showLoading()
				request({
					url: 'goods/showcaseLists',
					methods: 'get',
					data: {
						status: this.commodityLCurrent+1,
						page_no: this.pages.page,
						page_size: this.pages.size,
					}
				}).then((res) => {
					const hasNext = !!res.data.more;
					if(res.data.lists.length>0){
						res.data.lists.forEach(item => {
							this.radioValue?item.change = true:item.change = false
						})
						this.recordsList = this.pages.page==1 ? res.data.lists : this.recordsList.concat(res.data.lists);	
						this.pages.page += 1
						this.$refs.mescrollRef.mescroll.endSuccess(res.data.lists.length, hasNext);
					}else{
						this.recordsList = [];
						this.$refs.mescrollRef.mescroll.endSuccess(0,true);
					}
					uni.hideLoading()
				}).catch((err) => {										
					this.$refs.mescrollRef.mescroll.endErr();
					uni.hideLoading();
				})
			},
			//待添加列表事件
			upCallback() {
				uni.showLoading()
				const index = this.current;
				apiGoodsCateList({
					// name: this.keyword,
					cate_id: this.list[index].id,
					page_no: this.pages.page,
					page_size: this.pages.size,
				}).then((res) => {		
					const hasNext = !!res.data.more;
					if(res.data.lists.length>0){
						res.data.lists.forEach(item => {
							this.radioValue?item.change = true:item.change = false
						})
						this.recordsList = this.pages.page==1 ? res.data.lists : this.recordsList.concat(res.data.lists);
						this.pages.page += 1;
						this.$refs.mescrollRef.mescroll.endSuccess(res.data.lists.length, hasNext);
					}else{
						this.recordsList = [];
						this.$refs.mescrollRef.mescroll.endSuccess(0,true);
					}
					uni.hideLoading()
				}).catch((err) => {
					this.$refs.mescrollRef.mescroll.endErr();
					uni.hideLoading()

				})
			},
			// 选中某个复选框时，由checkbox时触发
			checkboxChange(e) {
				if(e.value==false){
					this.recordsList.map(val => {
						val.change = false;
					})
				}else{
					this.recordsList.map(val => {
						val.change = true;
					})
				}
			},
			// 选中任一checkbox时，由checkbox-group触发
			checkboxGroupChange(e) {
			},
			// 全选
			checkedAll() {
				this.radioValue = true;
				this.recordsList.map(val => {
					val.change = true;
				})
			},
			//全部上架
			allShelves(){
				uni.showLoading()
				let arrList = [];
				this.recordsList.forEach(item => {
					if (item.change) {
						arrList.push(item.id)
					}
				})
				if(arrList.length>0){
					request({
						url: 'goods/upDownShowcase',
						method: "POST",
						data: {
							id: arrList.toString()
						}
					}).then((res)=>{
						uni.hideLoading();
						this.pages.page = 1;
						this.beenAddList();
					}).catch((err) => {
						uni.hideLoading()
						this.$toast({title: err.message})
					})
				}else{
					this.$toast({title: this.$t('bus_goodManage.e24')})
				}	
				
			},
			//全部添加到橱窗
			allAddWindow(){
				uni.showLoading()
				let arrList = [];
				this.recordsList.forEach(item => {
					if (item.change) {
						arrList.push(item.id)
					}
				})
				if(arrList.length>0){
					request({
						url: 'goods/addShowcase',
						method: "POST",
						data: {
							goodsId: arrList.toString()
						}
					}).then((res)=>{
						uni.hideLoading();
						this.pages.page = 1;
						this.upCallback();
					}).catch((err) => {
						uni.hideLoading()
						this.$toast({title: err.message})
					})
				}else{
					this.$toast({title: this.$t('bus_goodManage.e24')})
				}
				
			}
		}
	}
</script>


<style>
	.mask{
		position: static;
		width:100%;
		height:100vh;
		background:rgba(0,0,0,0.4)
	}
	.down {
		background-color: rgb(64, 175, 250);
		box-sizing: border-box;
		padding: 15rpx;
		border-radius: 10rpx;
		color: #fff;
		margin-right: 40rpx;
	}

	.restNav {
		display: flex;
	}
	.flet{
		position: fixed;
		width: 80rpx;
		height: 80rpx;
		bottom: 10%;
		z-index: 999;
		background-color: #86ba5a;
		border-radius: 50%;
		right: 10%;
	}
</style>
<style lang="scss">
	/*根元素需要有固定的高度*/
	page {
		height: 100%;
		box-sizing: border-box;
	

		.header {
			padding: 16rpx 30rpx;
		}

		.nav {
			padding: 15rpx 0;
			margin-top: 20rpx;
		}

		.section {
			overflow: hidden;

			.title {
				padding: 20rpx;
			}

			.btn {
				margin-top: 20rpx;
				margin-left: 20rpx;
				width: 180rpx;
				height: 64rpx;
				// border-radius: 8rpx;
				font-size: $-font-size-sm;
			}

			.solid {
				color: $-color-white;
				background-color: #FF4141;
			}

			.hollow {
				color: $-color-lighter;
				border: 1px solid #DBDBDB;
			}
		}
	}
	::v-deep .nut-checkbox-ani{
		width: 20px !important;
		height: 20px !important;
	}
</style>