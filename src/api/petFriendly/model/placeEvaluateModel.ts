import type { BaseEntity } from '@/api/model/resultModel';

/**
 * 宠物场所评价记录查询对象
 */
export interface PetPlaceEvaluateQuery extends BaseEntity {
  /** 状态:0=正常,1=停用,2=草稿 */
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
  /** 服务id */
  serviceId?: number;
  /** 实际消费金额 */
  consumptionAmount?: number;
  /** 评分 */
  rate?: number;
  /** 评语 */
  comments?: string;
  /** 评价附图 */
  pictures?: string;
  /** 评价时距离 */
  distance?: number;
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
 * 宠物场所评价记录业务对象
 */
export interface PetPlaceEvaluateForm {
  /**  */
  evaluateId?: number;
  /** 状态:0=正常,1=停用,2=草稿 */
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
  /** 服务id */
  serviceId?: number;
  /** 实际消费金额 */
  consumptionAmount?: number;
  /** 评分 */
  rate?: number;
  /** 评语 */
  comments?: string;
  /** 评价附图 */
  pictures?: string;
  /** 评价时距离 */
  distance?: number;
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
 * 宠物场所评价记录视图对象
 */
export interface PetPlaceEvaluateVo {
  /**  */
  evaluateId?: number;
  /**  */
  createTime?: any;
  /**  */
  updateTime?: any;
  /** 状态:0=正常,1=停用,2=草稿 */
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
  /** 服务id */
  serviceId?: number;
  /** 实际消费金额 */
  consumptionAmount?: number;
  /** 评分 */
  rate?: number;
  /** 评语 */
  comments?: string;
  /** 评价附图 */
  pictures?: string;
  /** 评价时距离 */
  distance?: number;
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
