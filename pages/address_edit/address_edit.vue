<template>
    <view>
        <view class="address-edit">

            <!-- 联系方式 -->
            <template v-if="type == 2 || type == 3">
                <view class="form-item bb flex">
                    <view class="label">{{ $t('bus_shopSetting.ss16') }}</view>
                    <input class="m-l-10" v-model="refund_address.nickname" name="nickname" type="text"
                        :placeholder="t('bus_shopSetting.ss17')" />
                </view>
                <view class="form-item bb flex">
                    <view class="label">{{ $t('bus_shopSetting.ss18') }}</view>
                    <input class="m-l-10" name="mobile" v-model="refund_address.mobile" type="number"
                        :placeholder="$t('bus_shopSetting.ss19')"></input>
                </view>
            </template>

            <!-- 地区选择 -->
            <view @click="showRegion = true">
                <view class="form-item bb flex">
                    <view class="label">{{ $t('bus_shopSetting.ss20') }}</view>
                    <view class="flex flex-1 row-between m-l-10" style="width: 100%;">
                        <input name="region" class="m-r-10" v-model="region" disabled type="text"
                            :value="$t('bus_shopSetting.ss21')"></input>
                        <u-icon color="#707070" name="arrow-down"></u-icon>
                    </view>
                </view>
            </view>

            <!-- 详细地址填写 -->
            <view class="form-item flex col-top bb">
                <view class="label">{{ $t('bus_shopSetting.ss22') }}</view>
                <input name="address" v-model="refund_address.address" :placeholder="$t('bus_shopSetting.ss23')" />
            </view>
        </view>

        <button class="my-btn md white flex br60 row-center" @click="onSubmit">{{ $t('bus_shopSetting.ss24') }}</button>

        <!-- 地址选择 -->
        <u-select v-model="showRegion" confirm-color="#101010" cancel-color="#999" mode="mutil-column-auto"
            @confirm="regionChange" :list="lists"></u-select>

        <u-toast ref="uToast" />
    </view>
</template>

<script>
    import {
        apiSetShopInfo
    } from '@/api/store'
    import {
        apiOrderGetAddress,
        apiOrderEditAddress
    } from '@/api/order'

    import area from '@/utils/area'
    export default {
        data() {
            return {
                id: 0,
                type: 1,

                refund_address: {
                    nickname: '', //联系方式
                    mobile: '', //手机号码
                    province_id: '', //省
                    city_id: '', //市
                    district_id: '', //区
                    address: '', //详细地址
                },
                region: this.$t('bus_shopSetting.ss21'), //省市区显示

                defaultRegion: [this.$t('广东省'), this.$t('广州市'), this.$t('番禺区')],
                showRegion: false, //显示地区选择的flag
                lists: [] //省市区的数据
            };
        },

        onLoad: function(options) {
            this.lists = area; //省市区数据

            try {
                const type = this.$Route.query.type;
                const id = this.$Route.query.id;
                if (type) {
                    this.type = type;
                    const shopInfo = this.shopInfo;

                    if (type == 1) {
                        this.region = shopInfo.province_name + " " + shopInfo.province_name + " " + shopInfo
                            .district_name
                        for (const key in shopInfo) {
                            this.$set(this.refund_address, key, shopInfo[key])
                        }
                        uni.setNavigationBarTitle({
                            title: this.$t('编辑商家地址')
                        });
                    } else if (type == 2) {
                        this.region = shopInfo.refund_address.province_name + " " + shopInfo.refund_address
                            .province_name + " " + shopInfo.refund_address.district_name
                        for (const key in shopInfo.refund_address) {
                            this.$set(this.refund_address, key, shopInfo.refund_address[key])
                        }
                        uni.setNavigationBarTitle({
                            title: this.$t('编辑退货地址')
                        });
                    }
                }
                if (id) {
                    this.type = 3;
                    this.id = id;
                    this.getAddressFunc(id)
                }
            } catch (e) {
                console.log(e)
            }
        },
        methods: {
            // 提交地址信息
            async onSubmit() {
                let refund_address = {
                    nickname: this.type == 2 ? this.refund_address.nickname : '',
                    id: this.type == 3 ? this.id : '',
                    mobile: this.type != 1 ? this.refund_address.mobile : '',
                    consignee: this.type == 3 ? this.refund_address.nickname : '',
                    province: this.type == 3 ? this.refund_address.province_id : '',
                    city: this.type == 3 ? this.refund_address.city_id : '',
                    district: this.type == 3 ? this.refund_address.district_id : '',
                    province_id: this.type != 3 ? this.refund_address.province_id : '',
                    city_id: this.type != 3 ? this.refund_address.city_id : '',
                    district_id: this.type != 3 ? this.refund_address.district_id : '',
                    address: this.refund_address.address
                }
                if (this.type == 2 || this.type == 3) {
                    if (!this.refund_address.nickname) return this.$toast({
                        title: this.$t('请填写收货人姓名')
                    });
                    if (!this.refund_address.nickname.length >= 20) return this.$toast({
                        title: this.$t('输入的收货人长度不得大于20位')
                    })
                    if (!this.refund_address.mobile) return this.$toast({
                        title: this.$t('请填写手机号码')
                    });
                }
                if (!this.region) return this.$toast({
                    title: this.$t('请选择地区')
                });
                if (!this.refund_address.address) return this.$toast({
                    title: this.$t('请填写小区、街道、门牌号等信息')
                });

                if (this.type == 2) {
                    let res = await apiSetShopInfo({
                        refund_address
                    })
                    this.getResult(res)
                } else if (this.type == 1) {
                    let res = await apiSetShopInfo({
                        ...refund_address
                    })
                    this.getResult(res)
                } else if (this.type == 3) {
                    let res = await apiOrderEditAddress({
                        ...refund_address
                    })
                    this.getResult(res)
                }
            },
            getResult(res){
                if(res.code==1){
                    setTimeout(() => {
                        this.$Router.back()
                    }, 1000)
                }else{
                    this.$toast({title: res.msg});
                }
            },
            async getAddressFunc(id) {
                const res = await apiOrderGetAddress({id})
                if(res.code==1){
                    this.refund_address.nickname =  res.data.consignee;
                    this.refund_address.mobile = res.data.mobile
                    this.refund_address.province_id = res.data.province
                    this.refund_address.city_id = res.data.city
                    this.refund_address.district_id = res.data.district
                    this.refund_address.address = res.data.address
                    this.region = res.data.region[0] + " " + res.data.region[1] + " " + res.data.region[2]
                }
            },

            // 地区选择，选择当前省市区的ID
            regionChange(region) {
                this.refund_address.province_id = region[0].value;
                this.refund_address.city_id = region[1].value;
                this.refund_address.district_id = region[2].value;
                this.region = region[0].label + " " + region[1].label + " " + region[2].label
            }
        }
    };
</script>
<style lang="scss">
    .address-edit {
        padding-top: 20rpx;

        .bb {
            border-bottom: 1px solid #F8F8F8;
        }

        .form-item {
            padding: 30rpx;
            background-color: $-color-white;

            .label {
                width: 150rpx;
                color: $-color-black;
                font-size: $-font-size-nr;
                font-weight: 500;
            }

            input {
                text-align: right;
                height: 100%;
                flex: 1;
            }
        }
    }

    .my-btn {
        height: 88rpx;
        margin: 30rpx 26rpx;
        margin-top: 40rpx;
        text-align: center;
        background-color: $-color-primary;
    }
</style>
