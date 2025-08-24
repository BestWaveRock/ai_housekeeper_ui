import type { R, TableDataInfo } from '@/api/model/resultModel';
import type { PetHelathRecordForm, PetHelathRecordQuery, PetHelathRecordVo } from '@/api/petFriendly/model/helathRecordModel';
import { request } from '@/utils/request';

/**
 * 查询宠物健康档案记录列表
 * @param query 查询参数
 */
export function listHelathRecord(query?: PetHelathRecordQuery) {
  return request.get<TableDataInfo<PetHelathRecordVo>>({
    url: '/petFriendly/helathRecord/list',
    params: query,
  });
}

/**
 * 查询宠物健康档案记录详细
 * @param healthId 主键
 */
export function getHelathRecord(healthId: number) {
  return request.get<R<PetHelathRecordVo>>({
    url: `/petFriendly/helathRecord/${healthId}`,
  });
}

/**
 * 新增宠物健康档案记录
 * @param data 表单数据
 */
export function addHelathRecord(data: PetHelathRecordForm) {
  return request.post<R<void>>({
    url: '/petFriendly/helathRecord',
    data,
  });
}

/**
 * 修改宠物健康档案记录
 * @param data
 */
export function updateHelathRecord(data: PetHelathRecordForm) {
  return request.put<R<void>>({
    url: '/petFriendly/helathRecord',
    data,
  });
}

/**
 * 删除宠物健康档案记录
 * @param healthIds 主键串
 */
export function delHelathRecord(healthIds: number | Array<number>) {
  return request.delete<R<void>>({
    url: `/petFriendly/helathRecord/${healthIds}`,
  });
}
