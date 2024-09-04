<template>
    <view style="background: #fff;">
        <view class="topbg">
            <view class="flex topnav">
                <view><image @click="back()" class="back" src="../../../static/images/back.png" alt=""></image></view>
                <view class="toptitle">{{ $t('loan.lo_i1') }}</view>
                <view></view>
            </view>
            <view class="topcard">
                <view class="flex cardContent">
                    <view class="text1 flex">
                        <image src="../../../static/images/$.png" alt=""></image>
                        <input type="text" v-model="maxLoan" style="font-size: 40px;">
                    </view>
                    <view @click="allLoan()" style="width: 120rpx;">{{ $t('loan.lo_i2') }}</view>
                </view>
                <view class="topcardtost">
                    {{ $t('loan.lo_i3') }}
                </view>
            </view>
        </view>
        <view class="loanContent">
            <view class="flex loanContentTopText">
                <view class="content1">{{ $t('loan.lo_i4') }}</view>
                <view class="content2">{{ $t('loan.lo_i5') }}</view>
            </view>
            <view class="months flex" v-if="loanconfig">
                <view v-for="item in loanconfig.way_info.borrow_time"
                    :style="chooseM == item ? 'border: 2rpx solid #034FB8;color:#034FB8;margin-left: 32rpx;' : 'margin-left: 32rpx;'"
                    @click="chooseMonth(item)">
                    {{ item }}{{ loanconfig.way_info.unit }}
                </view>
                <view style="width: 34rpx;height: 72rpx;background: white;border: none;"></view>
            </view>
            <view @click="showBottom = true">
                <view class="loanText1">
                    {{ $t('loan.lo_i6') }}
                </view>
                <view class="loanText2 flex" v-if=" Interest">
                    {{ $t('loan.lo_i7') }} {{ Interest[0].end_time }} {{ $t('loan.lo_i8') }} ${{ firstRepayment }}
                    <image style="width: 24rpx;height: 24rpx;" src="../../../static/images/right.png" alt=""></image>
                </view>
            </view>
            <view class="ml32 loanText1">{{ $t('loan.lo_i9') }}</view>
            <view class="ml32 loanText2">{{ $t('loan.lo_i10') }}</view>
        </view>

        <view class="useLoan">
            <view class="ml32 loanText1 flex mt38"
                @click="showAgreement ? showAgreement = false : showAgreement = true">
                {{ $t('loan.lo_i11') }}
                <image class="imgsize" :style="showAgreement ? 'transform: rotate(270deg);' : ''"
                    src="../../../static/images/right.png" alt=""></image>
            </view>
            <view v-if="showAgreement">
                <view class="flex pl32 pr32 hcenter AgreementText mt24">
                    <view class="AgreementText1">{{ $t('loan.lo_i12') }}</view>
                    <view class="AgreementText2">$ {{ maxLoan }}</view>
                </view>
                <view class="flex pl32 pr32 hcenter AgreementText mt24">
                    <view class="AgreementText1">{{ $t('loan.lo_i13') }}</view>
                    <view class="AgreementText2">{{ $t('loan.lo_i14') }}</view>
                </view>
                <view class="flex pl32 pr32 hcenter AgreementText mt24">
                    <view class="AgreementText1">{{ $t('loan.lo_i15') }}</view>
                    <view class="AgreementText2" v-if="loanconfig">{{ loanconfig.way_info.rate }}%</view>
                </view>
                <view class="flex pl32 pr32 hcenter AgreementText mt24">
                    <view class="AgreementText1">{{ $t('loan.lo_i32') }}</view>
                    <view class="AgreementText2" v-if="loanconfig">{{ loanconfig.way_info.name }}</view>
                </view>
                <view class="flex pl32 pr32 hcenter AgreementText mt24">
                    <view class="AgreementText1">{{ $t('loan.lo_i16') }}</view>
                    <view class="AgreementText2" v-if="Interest">{{ Interest[0].end_time }}</view>
                </view>
                <view class="flex pl32 pr32 hcenter AgreementText mt24">
                    <view class="AgreementText1">{{ $t('loan.lo_i17') }}</view>
                    <view class="AgreementText2" v-if="loanconfig">{{ $t('loan.lo_i18') }} {{ chooseM }} {{ loanconfig.way_info.unit }},{{ $t('loan.lo_i19') }}
                        ${{
                            ((maxLoan * loanconfig.way_info.rate) / 100).toFixed(2) }}</view>
                </view>
                <view class="flex pl32 pr32 hcenter AgreementText mt24">
                    <view class="AgreementText1">{{ $t('loan.lo_i20') }}</view>
                    <view class="AgreementText2" :style="isAgree ? 'color: #2BD195;' : 'color: #1678FF;'"
                        @click="showProtocol = true">{{
                            isAgree ? "Agree" : "Check" }}</view>
                </view>
                <view class="flex pl32 pr32 hcenter AgreementText mt24">
                    <view class="AgreementText1">{{ $t('loan.lo_i21') }}</view>
                    <view class="AgreementText2" v-if="user">{{ user.real_name }}</view>
                </view>
                <view class="flex pl32 pr32 hcenter AgreementText mt24">
                    <view class="AgreementText1">{{ $t('loan.lo_i22') }}</view>
                    <view class="AgreementText2" v-if="user">{{ user.id_number }}</view>
                </view>
            </view>
        </view>
        <view class="btnbg " @click="showpassword = true">
            <view class="btn">{{ $t('loan.lo_i23') }}</view>
        </view>
        <nut-popup position="bottom" closeable round :style="{ height: '862rpx' }" v-model="showBottom">
            <view style="text-align: center;margin-top: 40rpx; color: #171418;font-weight: 600;font-size: 36rpx;">
                {{ $t('loan.lo_i24') }}
            </view>
            <view class="flex Repayment" v-for="item in Interest">
                <view class="flex hcenter RepaymentTop mt46">
                    <view class="flex hcenter">
                        <view class="poit"></view>
                        <view class="ml16"> {{ item.borrow_number }}- {{ $t('loan.lo_i25') }}</view>
                    </view>
                    <view class="mr32">$ {{ Number(item.rate_amount) + Number(item.amount) }}</view>
                </view>
                <view class="flex hcenter RepaymentTop mt4">
                    <view class="flex hcenter">
                        <view class="poit" style="background-color: white;"></view>
                        <view class="ml16 RepaymentButtonText">{{ item.end_time }}</view>
                    </view>
                    <view class="mr32 RepaymentButtonText">{{ $t('loan.lo_i26') }} </view>
                </view>
            </view>
		</nut-popup>
        <nut-popup position="bottom" closeable round :style="{ height: '862rpx' }" v-model="showProtocol">
            <view style="text-align: center;margin-top: 40rpx; color: #171418;font-weight: 600;font-size: 36rpx;">
                {{ $t('loan.lo_i27') }}
            </view>
            <view v-if="loanconfig">
                <view v-html="loanconfig.borrow_info"></view>
            </view>
            <view class="btnbg " @click="Agree(true)">
                <view class="btn">{{ $t('loan.lo_i128') }}</view>
            </view>
		</nut-popup>
        <nut-popup position="bottom" closeable round :style="{ height: '862rpx' }" v-model="showpassword">
            <view class="title">{{ $t('loan.lo_i29') }}</view>
            <view class="flex pdlr30">
                {{ $t('loan.lo_i30') }}<input type="password" v-model="password" :placeholder="$t('signin.Prompts2')" class="ml20">
            </view>
            <view class="btnbg " style="position: fixed; bottom: 20rpx;" @click="submit()">
                <view class="btn">{{ $t('loan.lo_i28') }}</view>
            </view>
		</nut-popup>
    </view>

</template>

<script>
	import request from '@/utils/request'
    export default {
        data() {
            return {
                chooseM:0,
                show:0,
                showBottom:false,
                showAgreement:true,
                isAgree:false,
                showpassword:false,
                firstRepayment:'',
                password:'',
                Interest:[{
                    end_time: 0,
                    rate_amount: 0,
                }],
                maxLoan:'',
                loanconfig:'',
                user:'',
                showProtocol:false,
            }
        },
        onLoad(){
            this.getData();
        },
        methods: {
           //利息计算
            preInfo(){
                // request({
                //     method: "POST",
                //     url: 'user/loan/preInfo',
                //     data: {
                //         repayment_way: this.loanconfig.repayment_way,
                //         borrow_time: this.chooseM + '',
                //         amount: this.maxLoan
                //     }
                // }).then(res => {
                //     console.log(res, 'lixi');
                //     this.Interest = res
                //     this.firstRepayment = Number(res[0].rate_amount) + Number(res[0].amount)
                // })

                //测试
                let res=[
                    {
                        "repayment_way": "any",
                        "borrow_number": 1,
                        "rate": "9",
                        "unit": "天",
                        "amount": "1000.00",
                        "rate_amount": "90.00",
                        "borrow_status": 1,
                        "start_time": "2024-08-08",
                        "end_time": "2024-09-07",
                        "borrow_time": "30"
                    }
                ]
                this.Interest = resdata.
                this.firstRepayment = Number(res[0].rate_amount) + Number(res[0].amount)
            },
            //期数
            chooseMonth(num) {
                this.chooseM = num;
                this.preInfo()
            },
            allLoan(){
                this.maxLoan = this.loanconfig.use_amount
            },
            //提交贷款申请
            submit() {
                if (this.password.length < 6) {
                    this.$toast({title: this.$t('loan.lo_vt5')})
                    return false
                }
                if (!this.isAgree) {
                    this.$toast({title: this.$t('loan.lo_i28')})
                    return false
                }
                if (this.maxLoan < this.loanconfig.min_amount) {
                    this.$toast({title: this.$t('loan.lo_vt7') + this.loanconfig.min_amount})
                    return false
                }
                if (this.maxLoan > this.loanconfig.use_amount) {
                    this.$toast({title: this.$t('loan.lo_vt8')})
                    return false
                }
                request({
                    method: "POST",
                    url: 'user/loan/submit',
                    data: {
                        repayment_way: this.loanconfig.repayment_way,
                        borrow_time: this.chooseM + '',
                        amount: this.maxLoan,
                        password: this.password,
                    }
                }).then(res => {
                    this.$toast({title: 'Loan submission successful'})
                })
            },
            Agree(num){
                this.showProtocol = false;
                this.isAgree = num
            },
            back() {
                history.back();
            },
            getData(){
                // request({
                //     methods: 'get',
                //     url: 'user/loan/config'
                // }).then(res => {
                //     this.maxLoan = res.use_amount
                //     this.loanconfig = res
                //     this.chooseM = res.way_info.borrow_time[0]
                //     this.preInfo()
                // })
                // request({
                //     methods: 'get',
                //     url: 'user/loan/certificationInfo'
                // }).then(res => {
                //     this.user = res
                // })

                //测试
                let res={
                    "is_open": 1,
                    "max_amount": 1000,
                    "min_amount": 0,
                    "repayment_day_times": 0,
                    "repayment_min_amount": 0,
                    "repayment_source": [
                        1,
                        2
                    ],
                    "borrow_use_way": [],
                    "borrow_info": "",
                    "repayment_way": "any",
                    "way_info": {
                        "name": "隨時還款",
                        "type": "any",
                        "rate": "9",
                        "unit": "天",
                        "borrow_time": [
                            "30",
                            "180",
                            "1"
                        ]
                    },
                    "use_amount": "1000.00"
                }
                this.maxLoan = res.use_amount
                this.loanconfig = res
                this.chooseM = res.way_info.borrow_time[0]
                this.preInfo()
            }
        }
        
    }
</script>

<style scoped>
    page {
        background-color: #F3F5F7;
    }

    .AgreementText {
        justify-content: space-between;
    }

    .AgreementText2 {
        font-weight: 400;
        font-size: 26rpx;
        color: #2D2D2D;
    }

    .AgreementText1 {
        font-weight: 400;
        font-size: 26rpx;
        color: #959595;
    }

    .RepaymentButtonText {
        height: 28rpx;
        font-weight: 400;
        font-size: 24rpx;
        color: #959595;
        line-height: 28rpx;
        text-align: left;

    }

    .RepaymentTop {
        padding: 0 32rpx;
        width: 100%;
        justify-content: space-between;
    }

    .Repayment {
        flex-direction: column;
    }

    .hcenter {
        align-items: center;
    }

    .poit {
        width: 16rpx;
        height: 16rpx;
        background: #316DF3;
        border-radius: 50%;
    }

    .imgsize {
        width: 24rpx;
        height: 24rpx;
    }

    .topbg {
        width: 750rpx;
        height: 700rpx;
        background: linear-gradient(180deg, #316DF3 0%, rgba(49, 109, 243, 0) 100%);
        overflow: hidden;
        margin: 0 auto;
    }
    .topnav {
        width: 100%;
        justify-content: space-between;
        align-items: center;
        color: white;
        margin-top: 110rpx;
    }
    .toptitle {
        font-weight: 600;
        font-size: 36rpx;
        color: #FFFFFF;
        line-height: 42rpx;
        text-align: center;

    }

    /* view {
        width: 30%;
    } */

    .back {
        width: 44rpx;
        height: 44rpx;
        padding-left: 32rpx;
    }

    .topcard {
        width: 686rpx;
        height: 340rpx;
        margin: 46rpx auto 0;
        background: #FFFFFF;
        border-radius: 24rpx 24rpx 24rpx 24rpx;
        overflow: hidden;
        font-weight: 500;
        font-size: 32rpx;
        color: #1678FF;
        line-height: 38rpx;
        text-align: center;
    }
    .topcard image {
        width: 36rpx;
        height: 66rpx;
    }

    .cardContent {
        align-items: center;
        margin: 106rpx 32rpx 48rpx 32rpx;
        justify-content: space-between;
    }
    .cardContent .text1 {
        height: 86rpx;
        font-weight: 600;
        font-size: 72rpx;
        color: #000000;
        line-height: 84rpx;
        text-align: left;
        align-items: center;

    }

    .topcardtost {
        width: 618rpx;
        height: 68rpx;
        font-weight: 400;
        font-size: 28rpx;
        color: #959595;
        line-height: 33rpx;
        margin: 0 auto;
        text-align: left;
    }

    .loanContent {
        width: 686rpx;
        height: 478rpx;
        background: #FFFFFF;
        border-radius: 24rpx 24rpx 24rpx 24rpx;
        margin: -140rpx auto 0;
        overflow: hidden;
    }
    .loanContentTopText {
        align-items: center;
        justify-content: space-between;
        margin: 40rpx 32rpx 24rpx;
    }
    .content1 {
        height: 38rpx;
        font-weight: 500;
        font-size: 32rpx;
        color: #000000;
        line-height: 38rpx;
        text-align: left;
    }

    .content2 {
        height: 32rpx;
        font-weight: 400;
        font-size: 26rpx;
        color: #959595;
        line-height: 30rpx;
        text-align: right;
    }

    .loanText1 {
        height: 38rpx;
        font-weight: 500;
        font-size: 32rpx;
        color: #000000;
        line-height: 38rpx;
        margin: 40rpx 32rpx 0;
        justify-content: space-between;
    }

    .loanText2 {
        height: 34rpx;
        font-weight: 400;
        font-size: 28rpx;
        color: #2D2D2D;
        line-height: 33rpx;
        margin: 16rpx 32rpx;
        align-items: center;
        justify-content: space-between;

    }

    .months {
        justify-content: space-between;
        margin: 0 auto;
        overflow-y: scroll;
    }
    .months view {
        width: 180rpx;
        height: 72rpx;
        background: #E8F1FF;
        border-radius: 8rpx 8rpx 8rpx 8rpx;
        font-weight: 400;
        font-size: 28rpx;
        color: #717171;
        line-height: 72rpx;
        border: 2rpx solid #E8F1FF;
        text-align: center;
        box-sizing: border-box;
    }

    .useLoan {
        width: 686rpx;
        background: #FFFFFF;
        margin: 24rpx auto;
        overflow: hidden;
        padding: 0 0 40rpx;
        border-radius: 24rpx 24rpx 24rpx 24rpx;
    }

    .ml32 {
        margin-left: 32rpx;
    }

    .btn {
        width: 638rpx;
        height: 88rpx;
        background: linear-gradient(90deg, #75B5F0 0%, #6584F3 100%);
        border-radius: 44rpx 44rpx 44rpx 44rpx;
        margin: 26rpx auto;
        text-align: center;
        line-height: 88rpx;
        color: white;
        font-size: 32rpx;
    }

    .btnbg {
        width: 750rpx;
        height: 204rpx;
        background: #FFFFFF;
        overflow: hidden;
        margin-top: 108rpx;
    }

    .title {
        margin: 30rpx auto;
        text-align: center;
    }
    .topcard .cardContent {
        align-items: center;
        margin: 3.3125rem 1rem 1.5rem 1rem;
        justify-content: space-between;
    }
    .flex {
        display: flex;
    }
    .topcard .cardContent .text1 {
        height: 2.6875rem;
        font-weight: 600;
        font-size: 2.25rem;
        color: #000000;
        line-height: 2.625rem;
        text-align: left;
        align-items: center;
    }

    .topcard image {
        width: 1.125rem;
        height: 2.0625rem;
    }
    ::v-deep .uni-input-input {
        font-size: 2.25rem;
    }
    .pr32 {
        padding-right: 1rem;
    }
    .pl32 {
        padding-left: 1rem;
    }
    .mt24 {
        margin-top: 0.75rem;
    }
    .Repayment {
        flex-direction: column;
    }
    .hcenter {
        align-items: center;
    }
    .RepaymentTop {
        padding: 0 1rem;
        justify-content: space-between;
    }
    .hcenter {
        align-items: center;
    }
    .poit {
        width: 0.5rem;
        height: 0.5rem;
        background: #316DF3;
        border-radius: 50%;
    }
    .ml16 {
        margin-left: 0.5rem;
    }
    .mr32 {
        margin-right: 1rem;
    }
</style>
