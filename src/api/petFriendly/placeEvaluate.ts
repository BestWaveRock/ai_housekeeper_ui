import type { R, TableDataInfo } from '@/api/model/resultModel';
import type { PetPlaceEvaluateForm, PetPlaceEvaluateQuery, PetPlaceEvaluateVo } from '@/api/petFriendly/model/placeEvaluateModel';
import { request } from '@/utils/request';

/**
 * 查询宠物场所评价记录列表
 * @param query 查询参数
 */
export function listPlaceEvaluate(query?: PetPlaceEvaluateQuery) {
  return request.get<TableDataInfo<PetPlaceEvaluateVo>>({
    url: '/petFriendly/placeEvaluate/list',
    params: query,
  });
}

/**
 * 查询宠物场所评价记录详细
 * @param evaluateId 主键
 */
export function getPlaceEvaluate(evaluateId: number) {
  return request.get<R<PetPlaceEvaluateVo>>({
    url: `/petFriendly/placeEvaluate/${evaluateId}`,
  });
}

/**
 * 新增宠物场所评价记录
 * @param data 表单数据
 */
export function addPlaceEvaluate(data: PetPlaceEvaluateForm) {
  return request.post<R<void>>({
    url: '/petFriendly/placeEvaluate',
    data,
  });
}

/**
 * 修改宠物场所评价记录
 * @param data
 */
export function updatePlaceEvaluate(data: PetPlaceEvaluateForm) {
  return request.put<R<void>>({
    url: '/petFriendly/placeEvaluate',
    data,
  });
}

/**
 * 删除宠物场所评价记录
 * @param evaluateIds 主键串
 */
export function delPlaceEvaluate(evaluateIds: number | Array<number>) {
  return request.delete<R<void>>({
    url: `/petFriendly/placeEvaluate/${evaluateIds}`,
  });
}
