import type { R, TableDataInfo } from '@/api/model/resultModel';
import type { PetOwnerAchievementBadgeRecordForm, PetOwnerAchievementBadgeRecordQuery, PetOwnerAchievementBadgeRecordVo } from '@/api/petFriendly/model/ownerAchievementBadgeRecordModel';
import { request } from '@/utils/request';

/**
 * 查询宠物主人成就徽章记录列表
 * @param query 查询参数
 */
export function listOwnerAchievementBadgeRecord(query?: PetOwnerAchievementBadgeRecordQuery) {
  return request.get<TableDataInfo<PetOwnerAchievementBadgeRecordVo>>({
    url: '/petFriendly/ownerAchievementBadgeRecord/list',
    params: query,
  });
}

/**
 * 查询宠物主人成就徽章记录详细
 * @param achievementBadgeRecordId 主键
 */
export function getOwnerAchievementBadgeRecord(achievementBadgeRecordId: number) {
  return request.get<R<PetOwnerAchievementBadgeRecordVo>>({
    url: `/petFriendly/ownerAchievementBadgeRecord/${achievementBadgeRecordId}`,
  });
}

/**
 * 新增宠物主人成就徽章记录
 * @param data 表单数据
 */
export function addOwnerAchievementBadgeRecord(data: PetOwnerAchievementBadgeRecordForm) {
  return request.post<R<void>>({
    url: '/petFriendly/ownerAchievementBadgeRecord',
    data,
  });
}

/**
 * 修改宠物主人成就徽章记录
 * @param data
 */
export function updateOwnerAchievementBadgeRecord(data: PetOwnerAchievementBadgeRecordForm) {
  return request.put<R<void>>({
    url: '/petFriendly/ownerAchievementBadgeRecord',
    data,
  });
}

/**
 * 删除宠物主人成就徽章记录
 * @param achievementBadgeRecordIds 主键串
 */
export function delOwnerAchievementBadgeRecord(achievementBadgeRecordIds: number | Array<number>) {
  return request.delete<R<void>>({
    url: `/petFriendly/ownerAchievementBadgeRecord/${achievementBadgeRecordIds}`,
  });
}
