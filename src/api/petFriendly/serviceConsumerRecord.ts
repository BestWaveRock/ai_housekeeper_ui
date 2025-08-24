import type { R, TableDataInfo } from '@/api/model/resultModel';
import type { PetServiceConsumerRecordForm, PetServiceConsumerRecordQuery, PetServiceConsumerRecordVo } from '@/api/petFriendly/model/serviceConsumerRecordModel';
import { request } from '@/utils/request';

/**
 * 查询宠物服务消费记录列表
 * @param query 查询参数
 */
export function listServiceConsumerRecord(query?: PetServiceConsumerRecordQuery) {
  return request.get<TableDataInfo<PetServiceConsumerRecordVo>>({
    url: '/petFriendly/serviceConsumerRecord/list',
    params: query,
  });
}

/**
 * 查询宠物服务消费记录详细
 * @param consumerId 主键
 */
export function getServiceConsumerRecord(consumerId: number) {
  return request.get<R<PetServiceConsumerRecordVo>>({
    url: `/petFriendly/serviceConsumerRecord/${consumerId}`,
  });
}

/**
 * 新增宠物服务消费记录
 * @param data 表单数据
 */
export function addServiceConsumerRecord(data: PetServiceConsumerRecordForm) {
  return request.post<R<void>>({
    url: '/petFriendly/serviceConsumerRecord',
    data,
  });
}

/**
 * 修改宠物服务消费记录
 * @param data
 */
export function updateServiceConsumerRecord(data: PetServiceConsumerRecordForm) {
  return request.put<R<void>>({
    url: '/petFriendly/serviceConsumerRecord',
    data,
  });
}

/**
 * 删除宠物服务消费记录
 * @param consumerIds 主键串
 */
export function delServiceConsumerRecord(consumerIds: number | Array<number>) {
  return request.delete<R<void>>({
    url: `/petFriendly/serviceConsumerRecord/${consumerIds}`,
  });
}
