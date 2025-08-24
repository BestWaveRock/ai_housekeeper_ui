import type { BaseEntity } from '@/api/model/resultModel';

/**
 * 宠物主人行为记录查询对象
 */
export interface PetOwnerBeheviorQuery extends BaseEntity {
  /** 状态:0=正常,1=停用 */
  status?: number;
  /** 主人id */
  ownerId?: number;
  /** 用户id */
  userId?: number;
  /** 行为类型:1=浏览,2=点击 */
  type?: number;
  /** 页面 */
  page?: string;
  /** 标题 */
  title?: string;
  /** 行为发生时间 */
  behaviorTime?: any;
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
 * 宠物主人行为记录业务对象
 */
export interface PetOwnerBeheviorForm {
  /**  */
  beheviorId?: number;
  /** 状态:0=正常,1=停用 */
  status?: number;
  /** 主人id */
  ownerId?: number;
  /** 用户id */
  userId?: number;
  /** 行为类型:1=浏览,2=点击 */
  type?: number;
  /** 页面 */
  page?: string;
  /** 标题 */
  title?: string;
  /** 行为发生时间 */
  behaviorTime?: any;
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
 * 宠物主人行为记录视图对象
 */
export interface PetOwnerBeheviorVo {
  /**  */
  beheviorId?: number;
  /**  */
  createTime?: any;
  /**  */
  updateTime?: any;
  /** 状态:0=正常,1=停用 */
  status?: number;
  /** 主人id */
  ownerId?: number;
  /** 用户id */
  userId?: number;
  /** 行为类型:1=浏览,2=点击 */
  type?: number;
  /** 页面 */
  page?: string;
  /** 标题 */
  title?: string;
  /** 行为发生时间 */
  behaviorTime?: any;
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
