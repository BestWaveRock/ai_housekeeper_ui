import type { BaseEntity } from '@/api/model/resultModel';

/**
 * 宠物场所收藏记录查询对象
 */
export interface PetPlaceFavoritesQuery extends BaseEntity {
  /** 状态:0=正常,1=停用 */
  status?: number;
  /** 主人id */
  ownerId?: number;
  /** 用户id */
  userId?: number;
  /** 场所id */
  placeId?: number;
  /** 服务商id */
  providerId?: number;
  /** 宠物id */
  petId?: number;
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
 * 宠物场所收藏记录业务对象
 */
export interface PetPlaceFavoritesForm {
  /**  */
  favoritesId?: number;
  /** 状态:0=正常,1=停用 */
  status?: number;
  /** 主人id */
  ownerId?: number;
  /** 用户id */
  userId?: number;
  /** 场所id */
  placeId?: number;
  /** 服务商id */
  providerId?: number;
  /** 宠物id */
  petId?: number;
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
 * 宠物场所收藏记录视图对象
 */
export interface PetPlaceFavoritesVo {
  /**  */
  favoritesId?: number;
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
  /** 场所id */
  placeId?: number;
  /** 服务商id */
  providerId?: number;
  /** 宠物id */
  petId?: number;
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
