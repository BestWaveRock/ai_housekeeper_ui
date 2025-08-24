import type { BaseEntity } from '@/api/model/resultModel';

/**
 * 宠物健康档案记录查询对象
 */
export interface PetHelathRecordQuery extends BaseEntity {
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
  /** 档案类型:0=体检,1=门诊,2=住院,3=绝育,4=美容,5=驱虫(内驱),6=驱虫(外驱),7=洗护护理,8=疫苗,9=狂犬 */
  type?: number;
  /** 档案简介 */
  comments?: string;
  /** 档案证明 */
  certificate?: string;
  /** 档案信息 */
  information?: string;
  /** 完成时间 */
  downTime?: any;
  /** 消费金额 */
  consumptionAmount?: number;
  /** 退回金额 */
  refundAmount?: number;
  /** 实际交易金额 */
  actualAmount?: number;
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
 * 宠物健康档案记录业务对象
 */
export interface PetHelathRecordForm {
  /**  */
  healthId?: number;
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
  /** 档案类型:0=体检,1=门诊,2=住院,3=绝育,4=美容,5=驱虫(内驱),6=驱虫(外驱),7=洗护护理,8=疫苗,9=狂犬 */
  type?: number;
  /** 档案简介 */
  comments?: string;
  /** 档案证明 */
  certificate?: string;
  /** 档案信息 */
  information?: string;
  /** 完成时间 */
  downTime?: any;
  /** 消费金额 */
  consumptionAmount?: number;
  /** 退回金额 */
  refundAmount?: number;
  /** 实际交易金额 */
  actualAmount?: number;
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
 * 宠物健康档案记录视图对象
 */
export interface PetHelathRecordVo {
  /**  */
  healthId?: number;
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
  /** 档案类型:0=体检,1=门诊,2=住院,3=绝育,4=美容,5=驱虫(内驱),6=驱虫(外驱),7=洗护护理,8=疫苗,9=狂犬 */
  type?: number;
  /** 档案简介 */
  comments?: string;
  /** 档案证明 */
  certificate?: string;
  /** 档案信息 */
  information?: string;
  /** 完成时间 */
  downTime?: any;
  /** 消费金额 */
  consumptionAmount?: number;
  /** 退回金额 */
  refundAmount?: number;
  /** 实际交易金额 */
  actualAmount?: number;
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
