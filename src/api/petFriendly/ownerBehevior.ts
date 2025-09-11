import type { R, TableDataInfo } from '@/api/model/resultModel';
import type { PetOwnerBeheviorForm, PetOwnerBeheviorQuery, PetOwnerBeheviorVo } from '@/api/petFriendly/model/ownerBeheviorModel';
import { request } from '@/utils/request';

/**
 * 查询宠物主人行为记录列表
 * @param query 查询参数
 */
export function listOwnerBehevior(query?: PetOwnerBeheviorQuery) {
  return request.get<TableDataInfo<PetOwnerBeheviorVo>>({
    url: '/petFriendly/ownerBehevior/list',
    params: query,
  });
}

/**
 * 查询宠物主人行为记录详细
 * @param beheviorId 主键
 */
export function getOwnerBehevior(beheviorId: string | number) {
  return request.get<R<PetOwnerBeheviorVo>>({
    url: `/petFriendly/ownerBehevior/${beheviorId}`,
  });
}

/**
 * 新增宠物主人行为记录
 * @param data 表单数据
 */
export function addOwnerBehevior(data: PetOwnerBeheviorForm) {
  return request.post<R<void>>({
    url: '/petFriendly/ownerBehevior',
    data,
  });
}

/**
 * 修改宠物主人行为记录
 * @param data
 */
export function updateOwnerBehevior(data: PetOwnerBeheviorForm) {
  return request.put<R<void>>({
    url: '/petFriendly/ownerBehevior',
    data,
  });
}

/**
 * 删除宠物主人行为记录
 * @param beheviorIds 主键串
 */
export function delOwnerBehevior(beheviorIds: number | Array<number>) {
  return request.delete<R<void>>({
    url: `/petFriendly/ownerBehevior/${beheviorIds}`,
  });
}
