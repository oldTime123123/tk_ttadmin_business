/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-08-05 10:58:10
 * @LastEditors: chenpn chenpn699@gmail.com
 * @LastEditTime: 2024-08-16 10:08:36
 * @FilePath: \1\web_business\api\store.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request'

// 商城首页
export const apiIndex = () => request.get('Statistics/workbench')

// 设置店铺信息
export const apiSetShopInfo = (params) => request.post('shop/shopSet', params)

// 商品交易分析
export const apiStatisticsGoodslist = (params) => request.get('Statistics/goodslist', {params})

// 交易分析
export const apiStatisticsTrading = (params) => request.get('Statistics/trading', {params})

// 商品交易分析
export const apiStatisticsVisit = () => request.get('Statistics/visit')

