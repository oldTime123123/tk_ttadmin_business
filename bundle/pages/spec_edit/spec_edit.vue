<template>
	<view class="goods-detail">
		
        <view class="m-t-20">
            <goods-card :data="goodsInfo">
            </goods-card>
        </view>

        <view class="muted xs p-l-20 p-b-20 p-t-20 flex row-between">
            {{goodsInfo.spec_type==1?'规格型号（统一规格）':'规格型号（多规格）'}}
            <view v-if="goodsInfo.spec_type==2" class="p-r-20" @click="spec_type=!spec_type">{{spec_type?'取消批量':'批量设置'}}</view>
        </view>
        
        <view class="primary flex p-b-20" v-show="spec_type">
            <view class="m-l-20" @click="openSpecEditFunc('price')">价格</view>
            <view class="m-l-20" @click="openSpecEditFunc('market_price')">市场价</view>
            <view class="m-l-20" @click="openSpecEditFunc('chengben_price')">成本价</view>
            <view class="m-l-20" @click="openSpecEditFunc('stock')">库存</view>
        </view>
        
        <block v-for="(item, index) in goodsInfo.goods_item" :key="index">
            <view class="m-b-20 p-t-20 bg-white">
                <view class="m-b-10 primary nr title">{{item.spec_value_str}}</view>
                <view class="item bb">
                    <view>价格: </view>
                    <view class="flex row-between">
                        <input type="text" placeholder="请输入价格" v-model="item.price" />
                        元
                    </view>
                </view>
                <view class="item bb">
                    <view>市场价:</view>
                    <view class="flex row-between">
                        <input type="text" placeholder="请输入市场价" v-model="item.market_price" />
                        元
                    </view>
                </view>
                <view class="item bb">
                    <view>成本价:</view>
                    <view class="flex row-between">
                        <input type="text" placeholder="请输入成本价" v-model="item.chengben_price" />
                        元
                    </view>
                </view>
                <view class="item bb">
                    <view>库存:</view>
                    <view class="flex row-between">
                        <input type="text" placeholder="请输入库存" v-model="item.stock" />
                    </view>
                </view>
            </view>
        </block>
        
        <view class="footer bg-white flex row-between fixed">
        	<button class="btn br60 md white" size="md" hover-class="none" @click="onSubmit">
        		确认
        	</button>
        </view>
        
        <modal title="批量设置" height="200rpx" v-model="flag" @confirm="specEditFunc(action)">
            <template v-if="action == 'price'">
                <view class="black nr flex" style="height: 200rpx;">
                    价格： <input type="text" class="input" v-model="price" />元
                </view>
            </template>
            <template v-if="action == 'market_price'">
                <view class="black nr flex" style="height: 200rpx;">
                    市场价： <input type="text" class="input" v-model="market_price" />元
                </view>
            </template>
            <template v-if="action == 'chengben_price'">
                <view class="black nr flex" style="height: 200rpx;">
                    成本价： <input type="text" class="input" v-model="chengben_price" />元
                </view>
            </template>
            <template v-if="action == 'stock'">
                <view class="black nr flex" style="height: 200rpx;">
                    库存： <input type="text" class="input" v-model="stock" />
                </view>
            </template>
        </modal>
        
        <u-toast ref="uToast" />
	</view>
</template>

<script>
	import { apiGoodsDetail,apiGoodsEdit } from '@/api/goods'
	import { strToParams } from '@/utils/tools'
	
	export default {
		name: 'GoodsDetail',

		data() {
			return {
				goodsInfo: {}, 			// 商品信息
                
                action: '',
                spec_type: false,   //多规格设置 设置或取消批量多规格
                flag: false,     //多规格设置 设置弹窗
                price: '',//多规格设置  价格
                market_price: '',   //多规格设置 市场价
                chengben_price: '',//多规格设置 成本价
                stock: '' ,//多规格设置  库存
			}
		},

		methods: {
			// 初始化商品详情数据
			initGoodsDetail() {
				return new Promise((resolve, reject) => {
					apiGoodsDetail({
						id: this.goods_id,
						visit: 1,
					}).then(data => {
						this.goodsInfo = data
					}).catch(err => {
						reject(err)
					})
				})
			},
            
            openSpecEditFunc(action) {
                this.action = action;
                this.flag = true
            },
            
            specEditFunc(action) {
                this.goodsInfo.goods_item.forEach(item => {
                    item[action] = this[action] 
                })
                this.goodsInfo.goods_item = [...this.goodsInfo.goods_item]
            },
            
            async onSubmit() {
                let items = [];
                items = this.goodsInfo.goods_item.map(({id,market_price,price,stock,chengben_price}) => ({id,market_price,price,stock,chengben_price}))
                let res = await apiGoodsEdit({items})
                if(res.code == 1){
                    setTimeout(() => {
                        this.$Router.back()
                    }, 1000)
                }else{
                    this.$toast({title: res.msg})
                }
            }
		},

		async onLoad() {
			const options = this.$Route.query

			this.goods_id = options.id
		
			try {
				if (!this.goods_id) throw new Error('该商品不存在')
				// 商品详情数据
				await this.initGoodsDetail()
			} catch (err) {
				console.log(err)
			}
		}
	}
</script>

<style lang="scss" scoped>
    .goods-detail {
        padding-bottom: 200rpx;
        
        .primary {
            color: $-color-primary;
        }
        
        .input {
            width: 300rpx;
            padding: 10rpx;
            margin: 0 20rpx;
            border-radius: 4rpx;
            border: 1px solid rgba(219, 219, 219, 100);
        }
        
        .item {
            padding: 30rpx;
            /* #ifndef APP-NVUE */
            display: flex;
            /* #endif */
            flex-direction: row;
            align-items: center;
            background-color: $-color-white;
            justify-content: flex-start;
        
            >view:first-child {
                width: 180rpx;
                color: $-color-black;
                font-size: $-font-size-nr;
                font-weight: 500;
            }
        
            >view:last-child {
                width: 400rpx;
                text-align: left;
                height: 76rpx;
                padding: 0 12rpx;
                border-radius: 6rpx;
                border: 1px solid rgba(219, 219, 219, 100);
            }
        }
        
        .title {
            color: $-color-white;
            display: inline-block;
            margin: 0 20rpx;
            padding: 6rpx 16rpx;
            border-radius: 8rpx;
            background-color: $-color-primary;
        }
        
        .footer {
        	position: fixed;
        	bottom: 0;
        	left: 0;
        	right: 0;
            z-index: 100;
        	height: 110rpx;
        	padding: 0 30rpx;
        	box-sizing: content-box;
        	padding-bottom: env(safe-area-inset-bottom);
            
            .btn {
                width: 100%;
                height: 88rpx;
                line-height: 88rpx;
                background-color: $-color-primary;
            }
        }
    }
	
</style>
