import type { BaseEntity } from '@/api/model/resultModel';

/**
 * 宠物服务商信息查询对象
 */
export interface PetServiceProviderQuery extends BaseEntity {
  /** 状态:0=正常,1=停用,2=草稿,3=审批中 */
  status?: number;
  /** 单位称呼 */
  unitNick?: string;
  /** 单位名称 */
  unitName?: string;
  /** 单位工商识别号 */
  unitIdcard?: string;
  /** 单位工商证件信息 */
  unitIdImg?: string;
  /** 单位地址 */
  unitAddress?: string;
  /** 真实创建时间 */
  unitCreateTime?: any;
  /** 单位联系人id */
  contactUserId?: number;
  /** 单位联系人称呼 */
  contactNick?: string;
  /** 单位联系人名字 */
  contactName?: string;
  /** 单位联系人识别号 */
  contactIdcard?: string;
  /** 单位联系人真实证件信息 */
  contactIdImg?: string;
  /** 单位联系人联系方式 */
  contactInformation?: string;
  /** 单位联系人地址 */
  contactAddress?: string;
  /** 头像 */
  unitAvatar?: string;
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
  /** 单位等级 */
  unitLevel?: number;
  /** 服务等级: 1=优秀,2=友好,3=一般,4=较差,5=未知 */
  serviceLevel?: number;
  /** 综合评分 */
  rate?: number;
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
 * 宠物服务商信息业务对象
 */
export interface PetServiceProviderForm {
  /**  */
  providerId?: number;
  /** 状态:0=正常,1=停用,2=草稿,3=审批中 */
  status?: number;
  /** 单位称呼 */
  unitNick?: string;
  /** 单位名称 */
  unitName?: string;
  /** 单位工商识别号 */
  unitIdcard?: string;
  /** 单位工商证件信息 */
  unitIdImg?: string;
  /** 单位地址 */
  unitAddress?: string;
  /** 真实创建时间 */
  unitCreateTime?: any;
  /** 单位联系人id */
  contactUserId?: number;
  /** 单位联系人称呼 */
  contactNick?: string;
  /** 单位联系人名字 */
  contactName?: string;
  /** 单位联系人识别号 */
  contactIdcard?: string;
  /** 单位联系人真实证件信息 */
  contactIdImg?: string;
  /** 单位联系人联系方式 */
  contactInformation?: string;
  /** 单位联系人地址 */
  contactAddress?: string;
  /** 头像 */
  unitAvatar?: string;
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
  /** 单位等级 */
  unitLevel?: number;
  /** 服务等级: 1=优秀,2=友好,3=一般,4=较差,5=未知 */
  serviceLevel?: number;
  /** 综合评分 */
  rate?: number;
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
 * 宠物服务商信息视图对象
 */
export interface PetServiceProviderVo {
  /**  */
  providerId?: number;
  /**  */
  createTime?: any;
  /**  */
  updateTime?: any;
  /** 状态:0=正常,1=停用,2=草稿,3=审批中 */
  status?: number;
  /** 单位称呼 */
  unitNick?: string;
  /** 单位名称 */
  unitName?: string;
  /** 单位工商识别号 */
  unitIdcard?: string;
  /** 单位工商证件信息 */
  unitIdImg?: string;
  /** 单位地址 */
  unitAddress?: string;
  /** 真实创建时间 */
  unitCreateTime?: any;
  /** 单位联系人id */
  contactUserId?: number;
  /** 单位联系人称呼 */
  contactNick?: string;
  /** 单位联系人名字 */
  contactName?: string;
  /** 单位联系人识别号 */
  contactIdcard?: string;
  /** 单位联系人真实证件信息 */
  contactIdImg?: string;
  /** 单位联系人联系方式 */
  contactInformation?: string;
  /** 单位联系人地址 */
  contactAddress?: string;
  /** 头像 */
  unitAvatar?: string;
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
  /** 单位等级 */
  unitLevel?: number;
  /** 服务等级: 1=优秀,2=友好,3=一般,4=较差,5=未知 */
  serviceLevel?: number;
  /** 综合评分 */
  rate?: number;
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
