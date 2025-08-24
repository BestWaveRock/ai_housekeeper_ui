import type { BaseEntity } from '@/api/model/resultModel';

/**
 * 宠物信息档案查询对象
 */
export interface PetInformationQuery extends BaseEntity {
  /** 状态:0=正常,1=停用 */
  status?: number;
  /** 宠物昵称 */
  name?: string;
  /** 性别:0=未填写,1=弟弟,2=妹妹,3=保密 */
  sex?: number;
  /** 宠物种类:sys_dict_type(pet_species) */
  species?: number;
  /** 宠物品种:sys_dict_type(species_code) */
  breeds?: number;
  /** 生日 */
  birthday?: any;
  /** 头像 */
  petAvatar?: string;
  /** 排序 */
  petSort?: number;
  /** 所属省份 */
  proviceCode?: string;
  /** 所属城市 */
  cityCode?: string;
  /** 所属区县 */
  districtCode?: string;
  /** 宠物证件号 */
  petIdcard?: string;
  /** 联系人类型:0=主人,1=救助人 */
  contactType?: number;
  /** 联系人id */
  contactUserId?: number;
  /** 联系人昵称 */
  contactName?: string;
  /** 联系方式 */
  contactInformation?: string;
  /** 联系人地址 */
  contactAddress?: string;
  /** 上次接种日期 */
  lastVaccination?: any;
  /** 上次美容日期 */
  lastCosmetic?: any;
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
 * 宠物信息档案业务对象
 */
export interface PetInformationForm {
  /**  */
  petId?: number;
  /** 状态:0=正常,1=停用 */
  status?: number;
  /** 宠物昵称 */
  name?: string;
  /** 性别:0=未填写,1=弟弟,2=妹妹,3=保密 */
  sex?: number;
  /** 宠物种类:sys_dict_type(pet_species) */
  species?: number;
  /** 宠物品种:sys_dict_type(species_code) */
  breeds?: number;
  /** 生日 */
  birthday?: any;
  /** 头像 */
  petAvatar?: string;
  /** 排序 */
  petSort?: number;
  /** 所属省份 */
  proviceCode?: string;
  /** 所属城市 */
  cityCode?: string;
  /** 所属区县 */
  districtCode?: string;
  /** 备注 */
  remark?: string;
  /** 宠物证件号 */
  petIdcard?: string;
  /** 联系人类型:0=主人,1=救助人 */
  contactType?: number;
  /** 联系人id */
  contactUserId?: number;
  /** 联系人昵称 */
  contactName?: string;
  /** 联系方式 */
  contactInformation?: string;
  /** 联系人地址 */
  contactAddress?: string;
  /** 上次接种日期 */
  lastVaccination?: any;
  /** 上次美容日期 */
  lastCosmetic?: any;
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
 * 宠物信息档案视图对象
 */
export interface PetInformationVo {
  /**  */
  petId?: number;
  /** 创建时间 */
  createTime?: any;
  /** 更新时间 */
  updateTime?: any;
  /** 状态:0=正常,1=停用 */
  status?: number;
  /** 宠物昵称 */
  name?: string;
  /** 性别:0=未填写,1=弟弟,2=妹妹,3=保密 */
  sex?: number;
  /** 宠物种类:sys_dict_type(pet_species) */
  species?: number;
  /** 宠物品种:sys_dict_type(species_code) */
  breeds?: number;
  /** 生日 */
  birthday?: any;
  /** 头像 */
  petAvatar?: string;
  /** 排序 */
  petSort?: number;
  /** 所属省份 */
  proviceCode?: string;
  /** 所属城市 */
  cityCode?: string;
  /** 所属区县 */
  districtCode?: string;
  /** 备注 */
  remark?: string;
  /** 宠物证件号 */
  petIdcard?: string;
  /** 联系人类型:0=主人,1=救助人 */
  contactType?: number;
  /** 联系人id */
  contactUserId?: number;
  /** 联系人昵称 */
  contactName?: string;
  /** 联系方式 */
  contactInformation?: string;
  /** 联系人地址 */
  contactAddress?: string;
  /** 上次接种日期 */
  lastVaccination?: any;
  /** 上次美容日期 */
  lastCosmetic?: any;
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
