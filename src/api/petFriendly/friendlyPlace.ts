import type { R, TableDataInfo } from '@/api/model/resultModel';
import type { PetFriendlyPlaceForm, PetFriendlyPlaceQuery, PetFriendlyPlaceVo } from '@/api/petFriendly/model/friendlyPlaceModel';
import { request } from '@/utils/request';

/**
 * 查询宠物友好场所列表
 * @param query 查询参数
 */
export function listFriendlyPlace(query?: PetFriendlyPlaceQuery) {
  return request.get<TableDataInfo<PetFriendlyPlaceVo>>({
    url: '/petFriendly/friendlyPlace/list',
    params: query,
  });
}

/**
 * 查询宠物友好场所详细
 * @param placeId 主键
 */
export function getFriendlyPlace(placeId: string | number) {
  return request.get<R<PetFriendlyPlaceVo>>({
    url: `/petFriendly/friendlyPlace/${placeId}`,
  });
}

/**
 * 新增宠物友好场所
 * @param data 表单数据
 */
export function addFriendlyPlace(data: PetFriendlyPlaceForm) {
  return request.post<R<void>>({
    url: '/petFriendly/friendlyPlace',
    data,
  });
}

/**
 * 修改宠物友好场所
 * @param data
 */
export function updateFriendlyPlace(data: PetFriendlyPlaceForm) {
  return request.put<R<void>>({
    url: '/petFriendly/friendlyPlace',
    data,
  });
}

/**
 * 删除宠物友好场所
 * @param placeIds 主键串
 */
export function delFriendlyPlace(placeIds: number | Array<number>) {
  return request.delete<R<void>>({
    url: `/petFriendly/friendlyPlace/${placeIds}`,
  });
}
