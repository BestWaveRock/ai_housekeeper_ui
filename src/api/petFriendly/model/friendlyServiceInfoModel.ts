import type { BaseEntity } from '@/api/model/resultModel';

/**
 * 宠物友好服务信息查询对象
 */
export interface PetFriendlyServiceInfoQuery extends BaseEntity {
  /** 状态:0=正常,1=停用 */
  status?: number;
  /** 是否预约单:0=否,1=是 */
  reserve?: number;
  /** 服务类型: 0=门诊,1=接种,2=专车,3=护理/美容(到店),4=护理/美容(上门),5=急救,6=流浪救助,7=寄养 */
  type?: number;
  /** 服务名称 */
  title?: string;
  /** 服务副标题 */
  subTitle?: string;
  /** 服务图标 */
  icon?: string;
  /** 服务主图 */
  serviceMainPicture?: string;
  /** 跳转页面类型:0=app页面,1=外部链接 */
  jumpPageType?: string;
  /** 服务页面url */
  jumpPageUrl?: string;
  /** 服务等级: 1=优秀,2=友好,3=一般,4=较差,5=未知 */
  serviceLevel?: number;
  /** 综合评分 */
  rate?: number;
  /** 所属省份 */
  proviceCode?: string;
  /** 所属城市 */
  cityCode?: string;
  /** 所属区县 */
  districtCode?: string;
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
 * 宠物友好服务信息业务对象
 */
export interface PetFriendlyServiceInfoForm {
  /**  */
  serviceId?: number;
  /** 状态:0=正常,1=停用 */
  status?: number;
  /** 是否预约单:0=否,1=是 */
  reserve?: number;
  /** 服务类型: 0=门诊,1=接种,2=专车,3=护理/美容(到店),4=护理/美容(上门),5=急救,6=流浪救助,7=寄养 */
  type?: number;
  /** 服务名称 */
  title?: string;
  /** 服务副标题 */
  subTitle?: string;
  /** 服务图标 */
  icon?: string;
  /** 服务主图 */
  serviceMainPicture?: string;
  /** 跳转页面类型:0=app页面,1=外部链接 */
  jumpPageType?: string;
  /** 服务页面url */
  jumpPageUrl?: string;
  /** 服务等级: 1=优秀,2=友好,3=一般,4=较差,5=未知 */
  serviceLevel?: number;
  /** 综合评分 */
  rate?: number;
  /** 所属省份 */
  proviceCode?: string;
  /** 所属城市 */
  cityCode?: string;
  /** 所属区县 */
  districtCode?: string;
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
 * 宠物友好服务信息视图对象
 */
export interface PetFriendlyServiceInfoVo {
  /**  */
  serviceId?: number;
  /**  */
  createTime?: any;
  /**  */
  updateTime?: any;
  /** 状态:0=正常,1=停用 */
  status?: number;
  /** 是否预约单:0=否,1=是 */
  reserve?: number;
  /** 服务类型: 0=门诊,1=接种,2=专车,3=护理/美容(到店),4=护理/美容(上门),5=急救,6=流浪救助,7=寄养 */
  type?: number;
  /** 服务名称 */
  title?: string;
  /** 服务副标题 */
  subTitle?: string;
  /** 服务图标 */
  icon?: string;
  /** 服务主图 */
  serviceMainPicture?: string;
  /** 跳转页面类型:0=app页面,1=外部链接 */
  jumpPageType?: string;
  /** 服务页面url */
  jumpPageUrl?: string;
  /** 服务等级: 1=优秀,2=友好,3=一般,4=较差,5=未知 */
  serviceLevel?: number;
  /** 综合评分 */
  rate?: number;
  /** 所属省份 */
  proviceCode?: string;
  /** 所属城市 */
  cityCode?: string;
  /** 所属区县 */
  districtCode?: string;
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
