import type { R, TableDataInfo } from '@/api/model/resultModel';
import type { PetPlaceFavoritesForm, PetPlaceFavoritesQuery, PetPlaceFavoritesVo } from '@/api/petFriendly/model/placeFavoritesModel';
import { request } from '@/utils/request';

/**
 * 查询宠物场所收藏记录列表
 * @param query 查询参数
 */
export function listPlaceFavorites(query?: PetPlaceFavoritesQuery) {
  return request.get<TableDataInfo<PetPlaceFavoritesVo>>({
    url: '/petFriendly/placeFavorites/list',
    params: query,
  });
}

/**
 * 查询宠物场所收藏记录详细
 * @param favoritesId 主键
 */
export function getPlaceFavorites(favoritesId: string | number) {
  return request.get<R<PetPlaceFavoritesVo>>({
    url: `/petFriendly/placeFavorites/${favoritesId}`,
  });
}

/**
 * 新增宠物场所收藏记录
 * @param data 表单数据
 */
export function addPlaceFavorites(data: PetPlaceFavoritesForm) {
  return request.post<R<void>>({
    url: '/petFriendly/placeFavorites',
    data,
  });
}

/**
 * 修改宠物场所收藏记录
 * @param data
 */
export function updatePlaceFavorites(data: PetPlaceFavoritesForm) {
  return request.put<R<void>>({
    url: '/petFriendly/placeFavorites',
    data,
  });
}

/**
 * 删除宠物场所收藏记录
 * @param favoritesIds 主键串
 */
export function delPlaceFavorites(favoritesIds: number | Array<number>) {
  return request.delete<R<void>>({
    url: `/petFriendly/placeFavorites/${favoritesIds}`,
  });
}
