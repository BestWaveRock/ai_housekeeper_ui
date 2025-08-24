import type { BaseEntity } from '@/api/model/resultModel';

/**
 * 宠物友好场所查询对象
 */
export interface PetFriendlyPlaceQuery extends BaseEntity {
  /** 状态:0=正常,1=停用,2=建设中,3=试运行 */
  status?: number;
  /** 场所名称 */
  name?: string;
  /** 场所类型: 0=宠物公园,1=宠物医院,2=宠物友好餐厅,3=饮水点,4=小草坪,5=公开广场,6=派出所,7=宠物摄影,8=宠物美容,9=寄养 */
  type?: number;
  /** 综合评分 */
  rate?: number;
  /** 友好度: 1=很友好,2=友好,3=一般,4=不友好,5=未知 */
  placeLevel?: number;
  /** 所属省份 */
  proviceCode?: string;
  /** 所属城市 */
  cityCode?: string;
  /** 所属区县 */
  districtCode?: string;
  /** 经度 */
  longitude?: number;
  /** 纬度 */
  latitude?: number;
  /** 联系人 */
  contactName?: string;
  /** 联系方式 */
  contactInformation?: string;
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
 * 宠物友好场所业务对象
 */
export interface PetFriendlyPlaceForm {
  /**  */
  placeId?: number;
  /** 状态:0=正常,1=停用,2=建设中,3=试运行 */
  status?: number;
  /** 场所名称 */
  name?: string;
  /** 场所类型: 0=宠物公园,1=宠物医院,2=宠物友好餐厅,3=饮水点,4=小草坪,5=公开广场,6=派出所,7=宠物摄影,8=宠物美容,9=寄养 */
  type?: number;
  /** 综合评分 */
  rate?: number;
  /** 友好度: 1=很友好,2=友好,3=一般,4=不友好,5=未知 */
  placeLevel?: number;
  /** 所属省份 */
  proviceCode?: string;
  /** 所属城市 */
  cityCode?: string;
  /** 所属区县 */
  districtCode?: string;
  /** 经度 */
  longitude?: number;
  /** 纬度 */
  latitude?: number;
  /** 备注 */
  remark?: string;
  /** 联系人 */
  contactName?: string;
  /** 联系方式 */
  contactInformation?: string;
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
 * 宠物友好场所视图对象
 */
export interface PetFriendlyPlaceVo {
  /**  */
  placeId?: number;
  /**  */
  createTime?: any;
  /**  */
  updateTime?: any;
  /** 状态:0=正常,1=停用,2=建设中,3=试运行 */
  status?: number;
  /** 场所名称 */
  name?: string;
  /** 场所类型: 0=宠物公园,1=宠物医院,2=宠物友好餐厅,3=饮水点,4=小草坪,5=公开广场,6=派出所,7=宠物摄影,8=宠物美容,9=寄养 */
  type?: number;
  /** 综合评分 */
  rate?: number;
  /** 友好度: 1=很友好,2=友好,3=一般,4=不友好,5=未知 */
  placeLevel?: number;
  /** 所属省份 */
  proviceCode?: string;
  /** 所属城市 */
  cityCode?: string;
  /** 所属区县 */
  districtCode?: string;
  /** 经度 */
  longitude?: number;
  /** 纬度 */
  latitude?: number;
  /** 备注 */
  remark?: string;
  /** 联系人 */
  contactName?: string;
  /** 联系方式 */
  contactInformation?: string;
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
