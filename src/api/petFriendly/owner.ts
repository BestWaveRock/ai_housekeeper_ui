import type { R, TableDataInfo } from '@/api/model/resultModel';
import type { PetOwnerForm, PetOwnerQuery, PetOwnerVo } from '@/api/petFriendly/model/ownerModel';
import { request } from '@/utils/request';

/**
 * 查询宠物主人档案列表
 * @param query 查询参数
 */
export function listOwner(query?: PetOwnerQuery) {
  return request.get<TableDataInfo<PetOwnerVo>>({
    url: '/petFriendly/owner/list',
    params: query,
  });
}

/**
 * 查询宠物主人档案详细
 * @param ownerId 主键
 */
export function getOwner(ownerId: number) {
  return request.get<R<PetOwnerVo>>({
    url: `/petFriendly/owner/${ownerId}`,
  });
}

/**
 * 新增宠物主人档案
 * @param data 表单数据
 */
export function addOwner(data: PetOwnerForm) {
  return request.post<R<void>>({
    url: '/petFriendly/owner',
    data,
  });
}

/**
 * 修改宠物主人档案
 * @param data
 */
export function updateOwner(data: PetOwnerForm) {
  return request.put<R<void>>({
    url: '/petFriendly/owner',
    data,
  });
}

/**
 * 删除宠物主人档案
 * @param ownerIds 主键串
 */
export function delOwner(ownerIds: number | Array<number>) {
  return request.delete<R<void>>({
    url: `/petFriendly/owner/${ownerIds}`,
  });
}
