<!--
 * @Author: chenpn chenpn699@gmail.com
 * @Date: 2024-09-02 16:42:27
 * @LastEditors: chenpn chenpn699@gmail.com
 * @LastEditTime: 2024-09-04 16:07:37
 * @FilePath: \web_business\components\charts\charts.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="charts-box">
          <qiun-data-charts
            type="area"
            :chartData="chartData"
            background="rgba(243, 243, 244, 1)"
            :ontouch="true"
          />
    </view>
</template>

<script>
    export default {
        props: {
            ids: {
                type: String,
            },
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '300rpx'
            },
            chartData: {
                type: Object
            }
        },

        data() {
            return {
                
            }
        },
    }
</script>

<style class="scss">
    .charts-box {
        /* width: 676rpx; */
        height: 544rpx;
    }
</style>
