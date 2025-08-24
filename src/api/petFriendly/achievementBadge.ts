import type { R, TableDataInfo } from '@/api/model/resultModel';
import type { PetAchievementBadgeForm, PetAchievementBadgeQuery, PetAchievementBadgeVo } from '@/api/petFriendly/model/achievementBadgeModel';
import { request } from '@/utils/request';

/**
 * 查询成就徽章系统列表
 * @param query 查询参数
 */
export function listAchievementBadge(query?: PetAchievementBadgeQuery) {
  return request.get<TableDataInfo<PetAchievementBadgeVo>>({
    url: '/petFriendly/achievementBadge/list',
    params: query,
  });
}

/**
 * 查询成就徽章系统详细
 * @param achievementBadgeId 主键
 */
export function getAchievementBadge(achievementBadgeId: number) {
  return request.get<R<PetAchievementBadgeVo>>({
    url: `/petFriendly/achievementBadge/${achievementBadgeId}`,
  });
}

/**
 * 新增成就徽章系统
 * @param data 表单数据
 */
export function addAchievementBadge(data: PetAchievementBadgeForm) {
  return request.post<R<void>>({
    url: '/petFriendly/achievementBadge',
    data,
  });
}

/**
 * 修改成就徽章系统
 * @param data
 */
export function updateAchievementBadge(data: PetAchievementBadgeForm) {
  return request.put<R<void>>({
    url: '/petFriendly/achievementBadge',
    data,
  });
}

/**
 * 删除成就徽章系统
 * @param achievementBadgeIds 主键串
 */
export function delAchievementBadge(achievementBadgeIds: number | Array<number>) {
  return request.delete<R<void>>({
    url: `/petFriendly/achievementBadge/${achievementBadgeIds}`,
  });
}
