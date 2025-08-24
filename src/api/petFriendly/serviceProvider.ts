import type { R, TableDataInfo } from '@/api/model/resultModel';
import type { PetServiceProviderForm, PetServiceProviderQuery, PetServiceProviderVo } from '@/api/petFriendly/model/serviceProviderModel';
import { request } from '@/utils/request';

/**
 * 查询宠物服务商信息列表
 * @param query 查询参数
 */
export function listServiceProvider(query?: PetServiceProviderQuery) {
  return request.get<TableDataInfo<PetServiceProviderVo>>({
    url: '/petFriendly/serviceProvider/list',
    params: query,
  });
}

/**
 * 查询宠物服务商信息详细
 * @param providerId 主键
 */
export function getServiceProvider(providerId: number) {
  return request.get<R<PetServiceProviderVo>>({
    url: `/petFriendly/serviceProvider/${providerId}`,
  });
}

/**
 * 新增宠物服务商信息
 * @param data 表单数据
 */
export function addServiceProvider(data: PetServiceProviderForm) {
  return request.post<R<void>>({
    url: '/petFriendly/serviceProvider',
    data,
  });
}

/**
 * 修改宠物服务商信息
 * @param data
 */
export function updateServiceProvider(data: PetServiceProviderForm) {
  return request.put<R<void>>({
    url: '/petFriendly/serviceProvider',
    data,
  });
}

/**
 * 删除宠物服务商信息
 * @param providerIds 主键串
 */
export function delServiceProvider(providerIds: number | Array<number>) {
  return request.delete<R<void>>({
    url: `/petFriendly/serviceProvider/${providerIds}`,
  });
}
