import type { BaseEntity } from '@/api/model/resultModel';

/**
 * 宠物服务消费记录查询对象
 */
export interface PetServiceConsumerRecordQuery extends BaseEntity {
  /** 状态:0=点击,1=填写,2=发起,3=等待派单,4=进行中,5=完成待评价,6=完成,7=服务取消,8=服务售后发起,9=售后等待分配,10=售后处理中,11=售后完成待评价,12=售后完成,13=售后取消,14=标记异常单,15=标记正常单 */
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
  /** 是否预约单:0=否,1=是 */
  reserve?: number;
  /** 预约开始时间 */
  reserveStartTime?: any;
  /** 预约结束时间 */
  reserveEndTime?: any;
  /** 预约要求 */
  reserveInformation?: string;
  /** 服务id */
  serviceId?: number;
  /** 服务类型 */
  serviceType?: number;
  /** 服务内容 */
  serviceName?: string;
  /** 服务证明 */
  serviceCertificate?: string;
  /** 服务信息 */
  serviceInformation?: string;
  /** 预约时间 */
  appointmentTime?: any;
  /** 服务时间 */
  serviceTime?: any;
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
 * 宠物服务消费记录业务对象
 */
export interface PetServiceConsumerRecordForm {
  /**  */
  consumerId?: number;
  /** 状态:0=点击,1=填写,2=发起,3=等待派单,4=进行中,5=完成待评价,6=完成,7=服务取消,8=服务售后发起,9=售后等待分配,10=售后处理中,11=售后完成待评价,12=售后完成,13=售后取消,14=标记异常单,15=标记正常单 */
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
  /** 是否预约单:0=否,1=是 */
  reserve?: number;
  /** 预约开始时间 */
  reserveStartTime?: any;
  /** 预约结束时间 */
  reserveEndTime?: any;
  /** 预约要求 */
  reserveInformation?: string;
  /** 服务id */
  serviceId?: number;
  /** 服务类型 */
  serviceType?: number;
  /** 服务内容 */
  serviceName?: string;
  /** 服务证明 */
  serviceCertificate?: string;
  /** 服务信息 */
  serviceInformation?: string;
  /** 预约时间 */
  appointmentTime?: any;
  /** 服务时间 */
  serviceTime?: any;
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
 * 宠物服务消费记录视图对象
 */
export interface PetServiceConsumerRecordVo {
  /**  */
  consumerId?: number;
  /** 创建时间 */
  createTime?: any;
  /** 更新时间 */
  updateTime?: any;
  /** 状态:0=点击,1=填写,2=发起,3=等待派单,4=进行中,5=完成待评价,6=完成,7=服务取消,8=服务售后发起,9=售后等待分配,10=售后处理中,11=售后完成待评价,12=售后完成,13=售后取消,14=标记异常单,15=标记正常单 */
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
  /** 是否预约单:0=否,1=是 */
  reserve?: number;
  /** 预约开始时间 */
  reserveStartTime?: any;
  /** 预约结束时间 */
  reserveEndTime?: any;
  /** 预约要求 */
  reserveInformation?: string;
  /** 服务id */
  serviceId?: number;
  /** 服务类型 */
  serviceType?: number;
  /** 服务内容 */
  serviceName?: string;
  /** 服务证明 */
  serviceCertificate?: string;
  /** 服务信息 */
  serviceInformation?: string;
  /** 预约时间 */
  appointmentTime?: any;
  /** 服务时间 */
  serviceTime?: any;
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
