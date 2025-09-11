import type { R, TableDataInfo } from '@/api/model/resultModel';
import type { PetFriendlyServiceInfoForm, PetFriendlyServiceInfoQuery, PetFriendlyServiceInfoVo } from '@/api/petFriendly/model/friendlyServiceInfoModel';
import { request } from '@/utils/request';

/**
 * 查询宠物友好服务信息列表
 * @param query 查询参数
 */
export function listFriendlyServiceInfo(query?: PetFriendlyServiceInfoQuery) {
  return request.get<TableDataInfo<PetFriendlyServiceInfoVo>>({
    url: '/petFriendly/friendlyServiceInfo/list',
    params: query,
  });
}

/**
 * 查询宠物友好服务信息详细
 * @param serviceId 主键
 */
export function getFriendlyServiceInfo(serviceId: string | number) {
  return request.get<R<PetFriendlyServiceInfoVo>>({
    url: `/petFriendly/friendlyServiceInfo/${serviceId}`,
  });
}

/**
 * 新增宠物友好服务信息
 * @param data 表单数据
 */
export function addFriendlyServiceInfo(data: PetFriendlyServiceInfoForm) {
  return request.post<R<void>>({
    url: '/petFriendly/friendlyServiceInfo',
    data,
  });
}

/**
 * 修改宠物友好服务信息
 * @param data
 */
export function updateFriendlyServiceInfo(data: PetFriendlyServiceInfoForm) {
  return request.put<R<void>>({
    url: '/petFriendly/friendlyServiceInfo',
    data,
  });
}

/**
 * 删除宠物友好服务信息
 * @param serviceIds 主键串
 */
export function delFriendlyServiceInfo(serviceIds: number | Array<number>) {
  return request.delete<R<void>>({
    url: `/petFriendly/friendlyServiceInfo/${serviceIds}`,
  });
}
