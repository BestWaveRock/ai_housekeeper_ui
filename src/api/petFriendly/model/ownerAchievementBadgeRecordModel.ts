import type { BaseEntity } from '@/api/model/resultModel';

/**
 * 宠物主人成就徽章记录查询对象
 */
export interface PetOwnerAchievementBadgeRecordQuery extends BaseEntity {
  /** 状态:0=正常,1=停用,2=未开始,3=进行中,4=已获得,5=标记作废,6=标记获得 */
  status?: number;
  /** 主人id */
  ownerId?: number;
  /** 用户id */
  userId?: number;
  /** 场所id */
  placeId?: number;
  /** 宠物id */
  petId?: number;
  /** 服务商id */
  providerId?: number;
  /** 服务商人员id */
  providerOwnerId?: number;
  /** 服务商人员用户id */
  providerUserId?: number;
  /** 成就徽章id */
  achievementBadgeId?: number;
  /** 完成时间 */
  downTime?: any;
  /** 记录IP */
  ip?: string;
  /** 手机信息 */
  phoneInformation?: string;
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
 * 宠物主人成就徽章记录业务对象
 */
export interface PetOwnerAchievementBadgeRecordForm {
  /**  */
  achievementBadgeRecordId?: number;
  /** 状态:0=正常,1=停用,2=未开始,3=进行中,4=已获得,5=标记作废,6=标记获得 */
  status?: number;
  /** 主人id */
  ownerId?: number;
  /** 用户id */
  userId?: number;
  /** 场所id */
  placeId?: number;
  /** 宠物id */
  petId?: number;
  /** 服务商id */
  providerId?: number;
  /** 服务商人员id */
  providerOwnerId?: number;
  /** 服务商人员用户id */
  providerUserId?: number;
  /** 成就徽章id */
  achievementBadgeId?: number;
  /** 完成时间 */
  downTime?: any;
  /** 记录IP */
  ip?: string;
  /** 手机信息 */
  phoneInformation?: string;
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
 * 宠物主人成就徽章记录视图对象
 */
export interface PetOwnerAchievementBadgeRecordVo {
  /**  */
  achievementBadgeRecordId?: number;
  /**  */
  createTime?: any;
  /**  */
  updateTime?: any;
  /** 状态:0=正常,1=停用,2=未开始,3=进行中,4=已获得,5=标记作废,6=标记获得 */
  status?: number;
  /** 主人id */
  ownerId?: number;
  /** 用户id */
  userId?: number;
  /** 场所id */
  placeId?: number;
  /** 宠物id */
  petId?: number;
  /** 服务商id */
  providerId?: number;
  /** 服务商人员id */
  providerOwnerId?: number;
  /** 服务商人员用户id */
  providerUserId?: number;
  /** 成就徽章id */
  achievementBadgeId?: number;
  /** 完成时间 */
  downTime?: any;
  /** 记录IP */
  ip?: string;
  /** 手机信息 */
  phoneInformation?: string;
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
