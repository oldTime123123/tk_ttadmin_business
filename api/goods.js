/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-08-05 10:58:10
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-08-13 15:18:38
 * @FilePath: \1\web_business\api\goods.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request'

/** S 商品 **/

// 商品搜索记录
export const apiGoodsLists = (params) => request.get('goods/lists', {params})

// 清空商品搜索记录
export const apiGoodsOperation = (params) => request.post('goods/operation', params)

// 商品详情
export const apiGoodsDetail = (params) => request.get('goods/detail', {params})

// 商品编辑
export const apiGoodsEdit = (params) => request.post('goods/edit', params)

// 商品管理tab
export const apiGoodsCate = (params) => request.get('goods/cateList')

// 商品管理列表
export const apiGoodsCateList = (params) => request.get('goods/lists', {params})
/** E 商品 **/