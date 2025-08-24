import type { BaseEntity } from '@/api/model/resultModel';

/**
 * 成就徽章系统查询对象
 */
export interface PetAchievementBadgeQuery extends BaseEntity {
  /** 状态:0=正常,1=停用,2=草稿 */
  status?: number;
  /** 成就标题 */
  achievementTitle?: string;
  /** 成就副标题 */
  achievementSubtitle?: string;
  /** 成就描述 */
  achievementDescribe?: string;
  /** 成就达成条件 */
  achievementRules?: string;
  /** 成就奖励积分值 */
  achievementRewardPoints?: number;
  /** 成就奖励爱心值 */
  achievementRewardLove?: number;
  /** 保留字端 */
  ext?: string;
  /** 保留字端1 */
  ext1?: string;
  /** 保留字端2 */
  ext2?: string;
  /** 保留字端3 */
  ext3?: string;
}
/**
 * 成就徽章系统业务对象
 */
export interface PetAchievementBadgeForm {
  /**  */
  achievementBadgeId?: number;
  /** 状态:0=正常,1=停用,2=草稿 */
  status?: number;
  /** 成就标题 */
  achievementTitle?: string;
  /** 成就副标题 */
  achievementSubtitle?: string;
  /** 成就描述 */
  achievementDescribe?: string;
  /** 成就达成条件 */
  achievementRules?: string;
  /** 成就奖励积分值 */
  achievementRewardPoints?: number;
  /** 成就奖励爱心值 */
  achievementRewardLove?: number;
  /** 备注 */
  remark?: string;
  /** 保留字端 */
  ext?: string;
  /** 保留字端1 */
  ext1?: string;
  /** 保留字端2 */
  ext2?: string;
  /** 保留字端3 */
  ext3?: string;
}
/**
 * 成就徽章系统视图对象
 */
export interface PetAchievementBadgeVo {
  /**  */
  achievementBadgeId?: number;
  /** 创建时间 */
  createTime?: any;
  /** 更新时间 */
  updateTime?: any;
  /** 状态:0=正常,1=停用,2=草稿 */
  status?: number;
  /** 成就标题 */
  achievementTitle?: string;
  /** 成就副标题 */
  achievementSubtitle?: string;
  /** 成就描述 */
  achievementDescribe?: string;
  /** 成就达成条件 */
  achievementRules?: string;
  /** 成就奖励积分值 */
  achievementRewardPoints?: number;
  /** 成就奖励爱心值 */
  achievementRewardLove?: number;
  /** 备注 */
  remark?: string;
  /** 保留字端 */
  ext?: string;
  /** 保留字端1 */
  ext1?: string;
  /** 保留字端2 */
  ext2?: string;
  /** 保留字端3 */
  ext3?: string;
}
