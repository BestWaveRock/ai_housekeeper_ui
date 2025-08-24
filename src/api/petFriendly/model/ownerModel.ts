import type { BaseEntity } from '@/api/model/resultModel';

/**
 * 宠物主人档案查询对象
 */
export interface PetOwnerQuery extends BaseEntity {
  /** 状态:0=正常,1=停用 */
  status?: number;
  /** 类型:0=主人,1=救助人,2=服务商服务人员 */
  ownerType?: number;
  /** 主人昵称 */
  name?: string;
  /** 性别:0=未填写,1=男,2=女,3=保密 */
  sex?: number;
  /** 生日 */
  birthday?: any;
  /** 头像 */
  petAvatar?: string;
  /** 所属省份 */
  proviceCode?: string;
  /** 所属城市 */
  cityCode?: string;
  /** 所属区县 */
  districtCode?: string;
  /** 证件号 */
  idcard?: string;
  /** 联系人id */
  contactUserId?: number;
  /** 联系人昵称 */
  contactName?: string;
  /** 联系方式 */
  contactInformation?: string;
  /** 联系人地址 */
  contactAddress?: string;
  /** 爱心等级 */
  loveLevel?: number;
  /** 爱心值 */
  loveValue?: number;
  /** 积分金币值 */
  integralValue?: number;
  /** 成就总数 */
  achievementNum?: number;
  /** 宠物总数 */
  petNum?: number;
  /** 收藏数 */
  favoritesNum?: number;
  /** 浏览数 */
  viewsNum?: number;
  /** 服务数 */
  serviceNum?: number;
  /** 手机信息 */
  phoneInformation?: string;
  /** 所属服务商id */
  providerId?: number;
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
 * 宠物主人档案业务对象
 */
export interface PetOwnerForm {
  /**  */
  ownerId?: number;
  /** 状态:0=正常,1=停用 */
  status?: number;
  /** 类型:0=主人,1=救助人,2=服务商服务人员 */
  ownerType?: number;
  /** 主人昵称 */
  name?: string;
  /** 性别:0=未填写,1=男,2=女,3=保密 */
  sex?: number;
  /** 生日 */
  birthday?: any;
  /** 头像 */
  petAvatar?: string;
  /** 所属省份 */
  proviceCode?: string;
  /** 所属城市 */
  cityCode?: string;
  /** 所属区县 */
  districtCode?: string;
  /** 备注 */
  remark?: string;
  /** 证件号 */
  idcard?: string;
  /** 联系人id */
  contactUserId?: number;
  /** 联系人昵称 */
  contactName?: string;
  /** 联系方式 */
  contactInformation?: string;
  /** 联系人地址 */
  contactAddress?: string;
  /** 爱心等级 */
  loveLevel?: number;
  /** 爱心值 */
  loveValue?: number;
  /** 积分金币值 */
  integralValue?: number;
  /** 成就总数 */
  achievementNum?: number;
  /** 宠物总数 */
  petNum?: number;
  /** 收藏数 */
  favoritesNum?: number;
  /** 浏览数 */
  viewsNum?: number;
  /** 服务数 */
  serviceNum?: number;
  /** 手机信息 */
  phoneInformation?: string;
  /** 所属服务商id */
  providerId?: number;
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
 * 宠物主人档案视图对象
 */
export interface PetOwnerVo {
  /**  */
  ownerId?: number;
  /**  */
  createTime?: any;
  /**  */
  updateTime?: any;
  /** 状态:0=正常,1=停用 */
  status?: number;
  /** 类型:0=主人,1=救助人,2=服务商服务人员 */
  ownerType?: number;
  /** 主人昵称 */
  name?: string;
  /** 性别:0=未填写,1=男,2=女,3=保密 */
  sex?: number;
  /** 生日 */
  birthday?: any;
  /** 头像 */
  petAvatar?: string;
  /** 所属省份 */
  proviceCode?: string;
  /** 所属城市 */
  cityCode?: string;
  /** 所属区县 */
  districtCode?: string;
  /** 备注 */
  remark?: string;
  /** 证件号 */
  idcard?: string;
  /** 联系人id */
  contactUserId?: number;
  /** 联系人昵称 */
  contactName?: string;
  /** 联系方式 */
  contactInformation?: string;
  /** 联系人地址 */
  contactAddress?: string;
  /** 爱心等级 */
  loveLevel?: number;
  /** 爱心值 */
  loveValue?: number;
  /** 积分金币值 */
  integralValue?: number;
  /** 成就总数 */
  achievementNum?: number;
  /** 宠物总数 */
  petNum?: number;
  /** 收藏数 */
  favoritesNum?: number;
  /** 浏览数 */
  viewsNum?: number;
  /** 服务数 */
  serviceNum?: number;
  /** 手机信息 */
  phoneInformation?: string;
  /** 所属服务商id */
  providerId?: number;
  /** 保留字端 */
  ext?: string;
  /** 保留字端1 */
  ext1?: string;
  /** 保留字端2 */
  ext2?: string;
  /** 保留字端3 */
  ext3?: string;
}
