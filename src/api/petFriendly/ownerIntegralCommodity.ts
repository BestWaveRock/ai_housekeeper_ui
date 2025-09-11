import type { R, TableDataInfo } from '@/api/model/resultModel';
import type { PetOwnerIntegralCommodityForm, PetOwnerIntegralCommodityQuery, PetOwnerIntegralCommodityVo } from '@/api/petFriendly/model/ownerIntegralCommodityModel';
import { request } from '@/utils/request';

/**
 * 查询宠物主人积分兑换商品列表
 * @param query 查询参数
 */
export function listOwnerIntegralCommodity(query?: PetOwnerIntegralCommodityQuery) {
  return request.get<TableDataInfo<PetOwnerIntegralCommodityVo>>({
    url: '/petFriendly/ownerIntegralCommodity/list',
    params: query,
  });
}

/**
 * 查询宠物主人积分兑换商品详细
 * @param integralCommodityId 主键
 */
export function getOwnerIntegralCommodity(integralCommodityId: string | number) {
  return request.get<R<PetOwnerIntegralCommodityVo>>({
    url: `/petFriendly/ownerIntegralCommodity/${integralCommodityId}`,
  });
}

/**
 * 新增宠物主人积分兑换商品
 * @param data 表单数据
 */
export function addOwnerIntegralCommodity(data: PetOwnerIntegralCommodityForm) {
  return request.post<R<void>>({
    url: '/petFriendly/ownerIntegralCommodity',
    data,
  });
}

/**
 * 修改宠物主人积分兑换商品
 * @param data
 */
export function updateOwnerIntegralCommodity(data: PetOwnerIntegralCommodityForm) {
  return request.put<R<void>>({
    url: '/petFriendly/ownerIntegralCommodity',
    data,
  });
}

/**
 * 删除宠物主人积分兑换商品
 * @param integralCommodityIds 主键串
 */
export function delOwnerIntegralCommodity(integralCommodityIds: number | Array<number>) {
  return request.delete<R<void>>({
    url: `/petFriendly/ownerIntegralCommodity/${integralCommodityIds}`,
  });
}
