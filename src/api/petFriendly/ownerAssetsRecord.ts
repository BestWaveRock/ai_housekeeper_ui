import type { R, TableDataInfo } from '@/api/model/resultModel';
import type { PetOwnerAssetsRecordForm, PetOwnerAssetsRecordQuery, PetOwnerAssetsRecordVo } from '@/api/petFriendly/model/ownerAssetsRecordModel';
import { request } from '@/utils/request';

/**
 * 查询宠物主人资产变动记录列表
 * @param query 查询参数
 */
export function listOwnerAssetsRecord(query?: PetOwnerAssetsRecordQuery) {
  return request.get<TableDataInfo<PetOwnerAssetsRecordVo>>({
    url: '/petFriendly/ownerAssetsRecord/list',
    params: query,
  });
}

/**
 * 查询宠物主人资产变动记录详细
 * @param ownerAssetsRecordId 主键
 */
export function getOwnerAssetsRecord(ownerAssetsRecordId: string | number) {
  return request.get<R<PetOwnerAssetsRecordVo>>({
    url: `/petFriendly/ownerAssetsRecord/${ownerAssetsRecordId}`,
  });
}

/**
 * 新增宠物主人资产变动记录
 * @param data 表单数据
 */
export function addOwnerAssetsRecord(data: PetOwnerAssetsRecordForm) {
  return request.post<R<void>>({
    url: '/petFriendly/ownerAssetsRecord',
    data,
  });
}

/**
 * 修改宠物主人资产变动记录
 * @param data
 */
export function updateOwnerAssetsRecord(data: PetOwnerAssetsRecordForm) {
  return request.put<R<void>>({
    url: '/petFriendly/ownerAssetsRecord',
    data,
  });
}

/**
 * 删除宠物主人资产变动记录
 * @param ownerAssetsRecordIds 主键串
 */
export function delOwnerAssetsRecord(ownerAssetsRecordIds: number | Array<number>) {
  return request.delete<R<void>>({
    url: `/petFriendly/ownerAssetsRecord/${ownerAssetsRecordIds}`,
  });
}
