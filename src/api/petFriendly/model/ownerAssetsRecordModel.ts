import type { BaseEntity } from '@/api/model/resultModel';

/**
 * 宠物主人资产变动记录查询对象
 */
export interface PetOwnerAssetsRecordQuery extends BaseEntity {
  /** 状态:0=正常,1=停用,2=待支付,3=待发货 */
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
  /** 资产类型:1=爱心值,2=积分金币 */
  assetsType?: number;
  /** 变动识别单号 */
  changeCode?: string;
  /** 变动类型:1=系统自动,2=积分商城购买,3=积分商城售后,4=系统标记操作 */
  changeType?: number;
  /** 变动时间 */
  changeTime?: any;
  /** 积分商品id */
  integralCommodityId?: number;
  /** 商品名称 */
  commodityTitle?: string;
  /** 商品编码 */
  commodityCode?: string;
  /** 商品信息 */
  commodityInformation?: string;
  /** 商品图 */
  commodityImg?: string;
  /** 商品价值:积分 */
  commodityValue?: number;
  /** 变动值 */
  changeValue?: number;
  /** 变动前值 */
  beforeValue?: number;
  /** 变动后值 */
  afterValue?: number;
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
 * 宠物主人资产变动记录业务对象
 */
export interface PetOwnerAssetsRecordForm {
  /**  */
  ownerAssetsRecordId?: number;
  /** 状态:0=正常,1=停用,2=待支付,3=待发货 */
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
  /** 资产类型:1=爱心值,2=积分金币 */
  assetsType?: number;
  /** 变动识别单号 */
  changeCode?: string;
  /** 变动类型:1=系统自动,2=积分商城购买,3=积分商城售后,4=系统标记操作 */
  changeType?: number;
  /** 变动时间 */
  changeTime?: any;
  /** 积分商品id */
  integralCommodityId?: number;
  /** 商品名称 */
  commodityTitle?: string;
  /** 商品编码 */
  commodityCode?: string;
  /** 商品信息 */
  commodityInformation?: string;
  /** 商品图 */
  commodityImg?: string;
  /** 商品价值:积分 */
  commodityValue?: number;
  /** 变动值 */
  changeValue?: number;
  /** 变动前值 */
  beforeValue?: number;
  /** 变动后值 */
  afterValue?: number;
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
 * 宠物主人资产变动记录视图对象
 */
export interface PetOwnerAssetsRecordVo {
  /**  */
  ownerAssetsRecordId?: number;
  /**  */
  createTime?: any;
  /**  */
  updateTime?: any;
  /** 状态:0=正常,1=停用,2=待支付,3=待发货 */
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
  /** 资产类型:1=爱心值,2=积分金币 */
  assetsType?: number;
  /** 变动识别单号 */
  changeCode?: string;
  /** 变动类型:1=系统自动,2=积分商城购买,3=积分商城售后,4=系统标记操作 */
  changeType?: number;
  /** 变动时间 */
  changeTime?: any;
  /** 积分商品id */
  integralCommodityId?: number;
  /** 商品名称 */
  commodityTitle?: string;
  /** 商品编码 */
  commodityCode?: string;
  /** 商品信息 */
  commodityInformation?: string;
  /** 商品图 */
  commodityImg?: string;
  /** 商品价值:积分 */
  commodityValue?: number;
  /** 变动值 */
  changeValue?: number;
  /** 变动前值 */
  beforeValue?: number;
  /** 变动后值 */
  afterValue?: number;
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
